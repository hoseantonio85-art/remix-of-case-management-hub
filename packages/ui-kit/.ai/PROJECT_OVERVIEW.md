# PROJECT_OVERVIEW

## Название проекта

**@sber-orm/ui-kit** (Cloud UI Kit)

## Краткое описание

Библиотека компонентов на Platform V для Cloud UI. Основана на [UI Kit Platform V](http://kit.cmp.sbc.space/v-uik/1.4.0/?path=/story/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B-%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0--page). Используется Cloud дизайн система и система токенов.

## Технологический стек

### Основные зависимости

| Пакет | Версия | Описание |
|-------|--------|----------|
| **react** | 18.3.1 | Библиотека JavaScript для создания пользовательских интерфейсов |
| **react-dom** | 18.3.1 | Пакет для работы с DOM в React приложениях |
| **@v-uik/** (множество пакетов) | 1.13.0-1.18.0 | Базовые компоненты UI Kit Platform V |
| **dayjs** | ^1.11.13 | Библиотека для работы с датами |
| **i18next** | ^23.11.5 | Фреймворк для интернационализации |
| **react-i18next** | ^11.8.15 | React-адаптер для i18next |
| **react-imask** | 7.6.1 | Библиотека для маскирования input полей |
| **simplebar-react** | 3.3.2 | Кастомный скроллбар |
| **classnames** | ^2.3.1 | Утилита для условного объединения CSS-классов |
| **throttle-debounce** | ^5.0.2 | Утилиты для throttling и debouncing |

### Инструменты разработки и сборки

| Пакет | Версия | Описание |
|-------|--------|----------|
| **vite** | ^6.0.0-alpha.18 | Next-generation frontend tooling |
| **tsup** | ^8.0.2 | Бандлер для TypeScript библиотек |
| **typescript** | * | Типизированный JavaScript |
| **biome** | 2.3.11 | Сборник инструментов для форматирования и линтинга |
| **storybook** | ^8.2.6 | UI development environment |
| **vitest** | 3.0.5 | Fast unit test framework |
| **puppeteer** | ^23.2.1 | Инструмент для E2E тестирования |
| **pixelmatch** | ^6.0.0 | Библиотека для сравнения изображений |

### Конфигурация

| Файл | Описание |
|------|----------|
| **vite.config.ts** | Конфигурация Vite для библиотеки и Storybook |
| **tsup.config.ts** | Конфигурация сборки библиотеки (ESM) |
| **tsconfig.json** | Конфигурация TypeScript компилятора |
| **biome.json** | Конфигурация линтинга и форматирования |
| **.release-it.cjs** | Конфигурация автоматических релизов |

## Инструкции по запуску

### Установка зависимостей

```bash
npm install
# или
yarn install
```

### Запуск в режиме разработки (Storybook)

```bash
npm run start
# или
npm run storybook
```

Storybook будет доступен по адресу `http://localhost:6006`

### Сборка продакшн-версии

```bash
npm run build
```

Сборка создаст:
- Common JS и ESM версии в папке `dist/`
- Типы TypeScript в `dist/index.d.ts` и `types/dist/`

## Переменные окружения

**Переменные окружения отсутствуют** (файл `.env.example` не найден).

## Скрипты npm

| Команда | Описание |
|---------|----------|
| `npm run prepare` | Автоматически запускает `build` перед публикацией |
| `npm run build` | Сборка библиотеки через Vite и tsup |
| `npm run build:types` | Копирование типов в папку `types/dist` |
| `npm run clean` | Очистка `node_modules` и `.turbo` |
| `npm run lint` | Линтинг и автоисправление кода (Biome) |
| `npm run format` | Форматирование кода (Biome) |
| `npm run start` / `npm run storybook` | Запуск Storybook на localhost:6006 |
| `npm run storybook:build` | Сборка статической версии Storybook |
| `npm run test` | Запуск UI-тестов (сборка Storybook + скриншотное сравнение) |
| `npm run debug:release` | Отладка релиза (dry-run режим) |
| `npm run release` | Создание релиза и публикация |
| `npm run release:types` | Публикация типов |

## Архитектура сборки

Проект использует **многомодульную сборку**:
- **index** — основной entry point библиотеки
- **components/\_name\_/index** — отдельные entry points для каждого компонента
- **hooks** — отдельный entry point для хуков
- **icons** — отдельный entry point для иконок
- **types** — отдельный entry point для типов

Используется **ESM формат** с tree-shaking и manualChunks для оптимизации размера bundle.
