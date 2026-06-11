import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import puppeteer from 'puppeteer';

/**
 * Determine whether the Node.js process runs on macOS.
 *
 * @returns {Boolean}
 */
function isMacOs() {
  return os.platform() === 'darwin';
}

const app = express();
let server;
const PORT = 6006;
const __filename = fileURLToPath(import.meta.url);
// Получаем имя каталога
const __dirname = path.dirname(__filename);

const THREASHOLD = 0.07;

const currentPath = process.cwd();
const MENU_ITEM_SELECTOR = '.sidebar-item > a[tabindex]';

fs.rmSync(currentPath + '/.storybook/diff', { force: true, recursive: true });
fs.rmSync(currentPath + '/.storybook/current', {
  force: true,
  recursive: true,
});
fs.mkdirSync(currentPath + '/.storybook/diff');
fs.mkdirSync(currentPath + '/.storybook/current');

// Сервируем статические файлы фронтенда
app.use('/', express.static(path.join(__dirname, '../storybook-static')));
// Разрешаем CORS (если нужно)
app.use(cors());

server = app.listen(PORT, async () => {
  // biome-ignore lint/suspicious/noConsole: Console
  console.log(`Server is running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    // headless: false,
    executablePath: isMacOs()
      ? '/Applications/SberBrowser.app/Contents/MacOS/SberBrowser'
      : '/usr/bin/sberbrowser-browser',
    args: ['--no-first-run', `--user-data-dir=~/.config/sberbrowser/`],
  });
  // Перехватываем создание новых страниц
  browser.on('targetcreated', async (target) => {
    const page = await target.page();
    if (page && page.url().includes('sberbrowser.sigma.sbrf.ru/auth')) {
      console.log('Закрываем страницу авторизации:', page.url());
      await page.close();
    }
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const page = await browser.newPage();

  // Переходим на страницу Storybook
  await page.goto('http://localhost:6006/');

  // Установка размера экрана
  await page.setViewport({ height: 1920, width: 1920 });

  // Функция для сравнения двух изображений
  async function compareImages(previousImagePath, currentImagePath) {
    let img1, img2;

    try {
      img1 = PNG.sync.read(fs.readFileSync(previousImagePath));
      img2 = PNG.sync.read(fs.readFileSync(currentImagePath));
    } catch {
      // biome-ignore lint/suspicious/noConsole: Console
      console.log('Ошибка при чтении файла');

      return {
        isEqual: false,
        writeDiff: () => {},
      };
    }
    const { height, width } = img1;
    const diff = new PNG({ height, width });
    try {
      const differencePixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: THREASHOLD },
      );

      return {
        isEqual: (differencePixels * 100) / (width * height) < THREASHOLD,
        writeDiff: (name) => fs.writeFileSync(name, PNG.sync.write(diff)),
      };
    } catch {
      // biome-ignore lint/suspicious/noConsole: Console
      console.log('Ошибка при сравнении изображений', previousImagePath);

      return {
        isEqual: false,
        writeDiff: () => {},
      };
    }
  }
  // Получаем количество страниц в Storybook
  const getMenuItems = () => page.$$(MENU_ITEM_SELECTOR);
  const pagesCount = (await getMenuItems()).length;
  const failedPages = [];

  const elementFrameHandle = await page.$('iframe#storybook-preview-iframe');
  const frame = await elementFrameHandle.contentFrame();
  frame.addStyleTag({
    content: `
      *,
      *::after,
      *::before {
          transition-delay: 0s !important;
          transition-duration: 0s !important;
          animation-delay: -0.0001s !important;
          animation-duration: 0s !important;
          animation-play-state: paused !important;
          caret-color: transparent !important;
      }`,
  });

  // biome-ignore lint/suspicious/noConsole: Console
  console.log('Всего страниц в Storybook: ' + pagesCount);
  // Обходим все страницы и делаем скриншоты

  for (let index = 0; index < pagesCount; index++) {
    (await getMenuItems())[index].click();
    await frame.waitForSelector('#storybook-root', { visible: true });

    const name = await page.evaluate(
      async (element) => element.textContent,
      (await getMenuItems())[index],
    );

    await page.waitForSelector('.sidebar-item');
    const previousScreenshotName = `${currentPath}/.storybook/reference/${name}.png`;
    const currentScreenshotName = `${currentPath}/.storybook/current/${name}.png`;

    // Находим элемент, который хотим заскриншотить
    const elementHandle = await page.$('#storybook-preview-iframe');

    await new Promise((resolve) => setTimeout(resolve, 300));
    // Создаем текущий скриншот
    await page.screenshot({
      clip: await elementHandle.boundingBox(),
      path: currentScreenshotName,
    });

    if (fs.existsSync(previousScreenshotName)) {
      // Если есть, сравниваем с текущим
      const { isEqual, writeDiff } = await compareImages(
        previousScreenshotName,
        currentScreenshotName,
      );

      if (isEqual) {
        // biome-ignore lint/suspicious/noConsole: Console
        console.log('\u001B[32m%s\u001B[0m', `✔ ${name}`);
      } else {
        writeDiff(`${currentPath}/.storybook/diff/${name}.png`);
        // biome-ignore lint/suspicious/noConsole: Console
        console.log('\u001B[31m%s\u001B[0m', `✖ ${name}`);
        failedPages.push(name);
      }
    } else {
      fs.copyFileSync(currentScreenshotName, previousScreenshotName);
    }
  }

  await browser.close();
  server?.close();

  if (failedPages.length > 0) {
    // biome-ignore lint/suspicious/noConsole: Console
    console.log(
      '\u001B[31m%s\u001B[0m',
      `Failed pages:\n${failedPages.map((pageName) => `✖ ${pageName} ${currentPath}/.storybook/diff/${pageName}.png`).join('\n')}`,
    );
    process.exit(1);
  } else {
    // biome-ignore lint/suspicious/noConsole: Console
    console.log('\u001B[32m%s\u001B[0m', '__________________');
    // biome-ignore lint/suspicious/noConsole: Console
    console.log('\u001B[32m%s\u001B[0m', '✔ All tests passed');
    process.exit(0);
  }
});
