# CONFIGURATION

## Конфигурационные файлы проекта

### 1. vite.config.ts

Главный конфигурационный файл Vite для сборки библиотеки.

#### Основные настройки

```typescript
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    entry: path.resolve(__dirname, 'src/index.ts'),
    
    build: {
      copyPublicDir: false,
      
      rollupOptions: {
        external: [
          'react', 'react-dom', 'react/jsx-runtime',
          /^react(\/.*)?$/, /^react-dom(\/.*)?$/, ...
        ],
        
        input: {
          index: path.resolve(__dirname, 'src/index.ts'),
          ...Object.fromEntries(
            componentList.map((component) => [
              `components/${component}/index`,
              path.resolve(__dirname, `src/components/${component}/index.ts`),
            ])
          ),
          hooks: path.resolve(__dirname, 'src/hooks/index.ts'),
          icons: path.resolve(__dirname, 'src/icons/index.ts'),
          types: path.resolve(__dirname, 'src/types/index.ts'),
        },
        
        output: {
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'index.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) return null;
              if (id.includes('dayjs')) return 'vendor-dayjs';
              if (id.includes('classnames')) return 'vendor-utils';
              if (id.includes('react-imask')) return 'vendor-imask';
              if (id.includes('simplebar-react')) return 'vendor-scroll';
              return 'vendor-other';
            }
            if (id.includes('src/utils/')) return 'shared-utils';
            if (id.includes('src/constants/')) return 'shared-constants';
          },
        },
      },
      
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'ui-kit',
        formats: ['es'],
      },
      
      target: 'es2020',
      outDir: 'dist',
      sourcemap: isProduction,
      minify: isProduction ? 'esbuild' : false,
      reportCompressedSize: true,
      emptyOutDir: true,
    },
    
    css: {
      preprocessorOptions: {
        scss: { api: 'modern' },
        sass: { api: 'modern' },
      },
    },
    
    server: { port: 6006 },
    
    plugins: [
      react(),
      checker({ typescript: true }),
      svgr({
        exportAsDefault: true,
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            plugins: [{ name: 'removeViewBox', active: false }],
          },
        },
      }),
    ],
    
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('src', import.meta.url)) },
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    
    esbuild: {
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    
    test: {
      environment: 'happy-dom',
      coverage: {
        enabled: true,
        provider: 'istanbul',
        extension: ['.ts'],
      },
    },
  };
});
```

#### Ключевые особенности

| Настройка | Значение | Назначение |
|-----------|----------|------------|
| `external` | react, react-dom | Делает библиотеку lean (без бандла React) |
| `input` | Многомодульный | Позволяет импортировать отдельные компоненты |
| `manualChunks` | vendor-* | Оптимизация кэширования и size |
| `target` | es2020 | Современные браузеры |
| `svgr` | plugins | Импорт SVG как React-компонентов |
| `test` | happy-dom | Быстрое тестирование без браузера |

---

### 2. tsup.config.ts

Конфигурация tsup для сборки типов.

```typescript
import { sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: false,
  entry: ['src/index.ts'],
  dts: {
    resolve: true,
    only: true,
  },
  tsconfig: './tsconfig.json',
  outDir: './dist',
  format: 'esm',
  esbuildPlugins: [sassPlugin()],
});
```

#### Назначение

- `dts.only: true` — генерация только типов (.d.ts)
- `sassPlugin` — обработка SCSS в типах

---

### 3. tsconfig.json

Конфигурация TypeScript компилятора.

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "allowJs": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["./src/**/*"],
  "exclude": ["dist", "build", "node_modules", "utils", "./tsup.config.ts"],
  "extends": "@sber-orm/tsconfig-config/tsconfig.base.json"
}
```

#### Ключевые настройки

| Настройка | Значение | Назначение |
|-----------|----------|------------|
| `jsx` | react-jsx | Новый JSX transform (React 17+) |
| `esModuleInterop` | true | Улучшенная совместимость CommonJS |
| `paths.@` | ./src/* | Алиасы для импортов |
| `extends` | @sber-orm/... | Наследование базовой конфигурации |

Использование алиаса:
```typescript
import { SomeComponent } from '@components/SomeComponent';
// вместо import { SomeComponent } from '../components/SomeComponent';
```

---

### 4. biome.json

Конфигурация линтинга и форматирования (Biome).

```json
{
  "root": false,
  "extends": ["@sber-orm/biome-config"]
}
```

Использует расширенную конфигурацию `@sber-orm/biome-config`.

Команды:
```bash
npm run lint   # biome check --fix --unsafe src
npm run format # biome format --write .
```

---

### 5. .release-it.cjs

Конфигурация автоматических релизов.

```javascript
// Содержит настройки release-it для npm публикации
// Использует @sber-orm/config-release-it
```

Команды:
```bash
npm run release:         # release-it --ci -VV && npm run release:types
npm run debug:release:   # release-it --ci -VV --dry-run
npm run release:types:   # cd types && npm run release
```

---

### 6. package.json (скрипты)

```json
{
  "scripts": {
    "prepare": "npm run build",
    "build": "vite build && tsup && npm run build:types",
    "build:types": "mkdir -p types/dist && cp dist/index.d.ts types/dist",
    "clean": "rm -rf .turbo && rm -rf node_modules",
    "debug:release": "release-it --ci -VV --dry-run",
    "format": "biome format --write .",
    "release": "release-it --ci -VV && npm run release:types",
    "release:types": "cd types && npm run release",
    "lint": "biome check --fix --unsafe src",
    "start": "storybook dev -p 6006",
    "storybook": "storybook dev -p 6006",
    "storybook:Build": "storybook build",
    "test": "npm run test:ui",
    "test:ui": "npm run storybook:build && node utils/uiTest.js"
  }
}
```

---

## Утилиты и скрипты

### utils/uiTest.js

Скрипт для UI-тестирования (сравнение скриншотов):

```javascript
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// Основные функции:
// 1. Запуск Storybook
// 2. Проход по всем stories
// 3. Скриншотирование компонентов
// 4. Сравнение с эталонами (pixelmatch)
// 5. Генерация diff-изображений
```

Команда:
```bash
npm run test:ui
```

---

## Конфигурация Storybook

### .storybook/

Конфигурация Storybook (расположена в `.storybook/`):

#### Основные файлы
- `main.ts` / `main.cjs` — конфигурация Storybook
- `preview.tsx` / `preview.cjs` — глобальный preview
- `manager.tsx` — кастомизация sidebar (если есть)

#### Используемые аддоны
- `@storybook/addon-controls` — управление пропсами
- `@storybook/react` — React-адаптер
- `@storybook/react-vite` — Vite-адаптер

---

## Конфигурация тестирования

### vitest.config.ts

```typescript
{
  test: {
    environment: 'happy-dom',  // Быстрый DOM-симулятор
    coverage: {
      enabled: true,
      provider: 'istanbul',
      extension: ['.ts'],
    },
  },
}
```

Команда:
```bash
npm run test
```

---

## Типы и константы

### src/types/

#### colors.ts

```typescript
export enum EComponentColors {
  gray = 'gray',
  blue = 'blue',
  green = 'green',
  brand = 'brand',
  yellow = 'yellow',
  red = 'red',
  violet = 'violet',
  outlined = 'outlined',
}
```

#### variables.ts

```typescript
export type TComponentSizes = 'S' | 'M' | 'L' | 'XL';
```

---

## Импорт стилей

### SCSS модули

```typescript
// В компоненте
import styles from './styles.module.scss';

<div className={styles.button} />
```

### Глобальные стили

```scss
// В проекте-потребителе
@use "@sber-orm/ui-kit/src/colors.module.scss" as *;
@use "@sber-orm/ui-kit/style.css";
```

---

## Импорт иконок

```typescript
import { Icon, EIconName } from '@sber-orm/ui-kit';

<Icon name={EIconName.search} width={24} height={24} />
```

Или напрямую:
```typescript
import { search, user, settings } from '@sber-orm/ui-kit/icons';

<search width={24} height={24} />
<user width={24} height={24} />
<settings width={24} height={24} />
```
