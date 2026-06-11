# ARCHITECTURE

## Структура папок (дерево src)

```
src/
├── @types/              # Типы TypeScript для специфичных модулей
│   └── vite-env.d.ts   # Объявления типов для Vite и SVG-модулей
│
├── components/          # Компоненты UI библиотеки
│   ├── Accordion/       # Компонент аккордеона
│   ├── Alert/           # Компонент предупреждений
│   ├── Badge/           # Компонент бейджа
│   ├── BarChart/        # График (столбчатая диаграмма)
│   ├── Button/          # Компонент кнопки
│   ├── Checkbox/        # Компонент чекбокса
│   ├── CheckboxChips/   # Чекбоксы в виде chips
│   ├── Chips/           # Компонент chips
│   ├── ComboBox/        # Комбинированный input (dropdown + search)
│   ├── DatePicker/      # Выбор даты
│   ├── DateRangePicker/ # Выбор диапазона дат
│   ├── Droplist/        # Выпадающий список
│   ├── FieldSearch/     # Поле поиска
│   ├── FieldSelect/     # Выпадающий список (field select)
│   ├── FileUploader/    # Загрузчик файлов
│   ├── Grid/            # Сетка (grid layout)
│   ├── Icon/            # Компонент иконки
│   ├── InfoDisplay/     # Отображение информации
│   ├── Input/           # Однострочный input
│   ├── InputMask/       # Input с маской
│   ├── InputNumber/     # Числовой input
│   ├── Level/           # Уровень элементов (flex layout)
│   ├── LinearProgress/  # Линейный прогресс-бар
│   ├── Loader/          # Спиннер/лоадер
│   ├── MarkdownViewer/  # Просмотр Markdown
│   ├── Modal/           # Модальное окно
│   ├── MoneyInput/      # Input для суммы (валюта)
│   ├── MoneyRangeInput/ # Диапазон для суммы
│   ├── Notice/          # Уведомление
│   ├── Notification/    # Системные уведомления
│   ├── OldComboBox/     # Устаревший ComboBox
│   ├── OldInput/        # Устаревший Input
│   ├── OldScrollBar/    # Устаревший скроллбар
│   ├── OldSelect/       # Устаревший Select
│   ├── Popover/         # Плавающая панель
│   ├── Popup/           # Всплывающее окно
│   ├── Radio/           # Радио-кнопка
│   ├── RadioChips/      # Радио-кнопки в виде chips
│   ├── ScrollBar/       # Кастомный скроллбар
│   ├── Select/          # Выпадающий список (select)
│   ├── Shimmer/         # Эффект shimmer (loading state)
│   ├── Switch/          # Переключатель (toggle)
│   ├── Textarea/        # Многострочный textarea
│   ├── Tooltip/         # Подсказка (tooltip)
│   └── Typography/      # Типографика (заголовки, абзацы)
│
├── hooks/               # React хуки (утилиты и кастомные хуки)
│   ├── index.ts         # Экспорт всех хуков
│   ├── useComponentDidMount.ts
│   ├── useComponentVisible.ts
│   ├── useCopyToClipboard.ts
│   ├── useDebounce.ts
│   ├── useEventCallback.ts
│   ├── useEventListener.ts
│   ├── useForkRef.ts
│   ├── useIsOverflowing.ts
│   ├── useKeeper.ts
│   ├── useLegacyEffect.ts
│   ├── useMoneyFormatter.ts
│   ├── useMutation.ts
│   ├── useResizeHook.ts
│   ├── useStorageData.ts
│   ├── useThrottle.ts
│   └── useThrottle.test.ts
│
├── i18n/                # Интернационализация
│   ├── locales/         # JSON файлы переводов
│   │   └── ru/          # Русский язык
│   │       └── common.json
│   ├── config.ts        # Конфигурация i18next
│   └── index.ts         # Экспорт конфигурации
│
├── icons/               # SVG иконки (分类 по группам)
│   ├── arrows/          # Стрелки и чевроны
│   ├── currency/        # Иконки валют
│   ├── fileType/        # Иконки типов файлов
│   ├── filter/          # Иконки фильтров
│   ├── interface/       # Иконки интерфейса (общие)
│   ├── loader/          # Иконки лоадеров
│   ├── menu/            # Иконки меню (sidebar)
│   ├── priority/        # Иконки приоритетов
│   ├── status/          # Иконки статусов
│   ├── unknown/         # Иконки неизвестных типов
│   └── index.ts         # Экспорт всех иконок и EIconName enum
│
├── stories/             # Storybook stories для каждого компонента
│   ├── *.stories.tsx    # 41 файл stories для всех компонентов
│   └── utils.tsx        # Утилиты для stories
│
├── styles/              # SCSS стили и утилиты
│   ├── mixins/          # SCSS миксины
│   │   ├── animations.module.scss
│   │   └── fields.module.scss
│   ├── animations.module.scss
│   ├── background.module.scss
│   ├── border.module.scss
│   ├── button.module.scss
│   ├── control.module.scss
│   ├── droplist.module.scss
│   ├── icon.module.scss
│   ├── scrollbar.module.scss
│   ├── surface.module.scss
│   ├── text.module.scss
│   └── tooltip.module.scss
│
├── types/               # TypeScript типы (общие для библиотеки)
│   ├── colors.ts        # Типы цветов (EComponentColors enum)
│   ├── variables.ts     # Типы переменных (TComponentSizes)
│   └── index.ts         # Экспорт типов
│
├── colors.scss          # SCSS переменные цветов (импорт из styles)
├── variables.scss       # SCSS переменные (импорт из types)
└── index.ts             # Основной entry point (экспорт всех компонентов)
```

## Распределение ролей

### Архитектурный стиль

Проект следует **слоистой архитектуре** с модульным подходом:

```
┌─────────────────────────────────────────────────────┐
│              Stories (Демонстрация)                 │
│         ┌────────────────────────────────────┐      │
│         │  *.stories.tsx (Storybook)         │      │
│         └────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────┐
│             Components (UI Layer)                   │
│   ┌───────────────────────────────────────────┐     │
│   │  *.tsx (React Components)                 │     │
│   │  - Презентационные компоненты             │     │
│   │  - Пропсы и типы                          │     │
│   │  - Стилизация (SCSS modules)              │     │
│   └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────┐
│              Hooks (Logic Layer)                    │
│   ┌───────────────────────────────────────────┐     │
│   │  use*.ts (Custom React Hooks)             │     │
│   │  - Логика состояния                       │     │
│   │  - Стораж (localStorage/sessionStorage)   │     │
│   │  - Утилиты (debounce/throttle)            │     │
│   └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────────────────────────────────┐
│            Types & Constants (Shared)               │
│   ┌───────────────────────────────────────────┐     │
│   │  types/*.ts, colors.scss, variables.scss  │     │
│   └───────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

### Роли папок

| Папка | Роль | Описание |
|-------|------|----------|
| **components/** | UI Layer | Презентационные React-компоненты, не содержат бизнес-логики |
| **hooks/** | Logic Layer | Кастомные хуки для повторного использования логики |
| **i18n/** | Shared | Конфигурация интернационализации и переводы |
| **icons/** | Shared | SVG-иконки как React-компоненты |
| **stories/** | DevOps | Storybook stories для разработки и тестирования |
| **styles/** | Styling | SCSS модули для стилизации компонентов |

## Конфигурация (Configs, Beans, Middlewares)

### Конфигурация сборки

#### vite.config.ts (Vite Configuration)
Ключевые настройки:
- **entry**: Многомодульный entry point для всех компонентов
- **build.lib**: ESM формат библиотеки
- **build.target**: ES2020
- **plugins**: 
  - `@vitejs/plugin-react-swc` — React с поддержкой SWC
  - `vite-plugin-svgr` — Импорт SVG как React-компонентов
  - `vite-plugin-checker` — Проверка TypeScript
- **test**: Vitest с coverage и happy-dom окружением

#### tsup.config.ts (ESM Bundler)
- Формат: ESM
- Source maps: отключены
- SCSS плагин: esbuild-sass-plugin

### Конфигурация TypeScript

#### tsconfig.json
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
  }
}
```

### Конфигурация линтинга

#### biome.json
- Использует `@sber-orm/biome-config` как базовую конфигурацию
- Правила применяются к папке `src`

### Конфигурация i18n

#### i18n/config.ts
- Языки: `ru` (русский)
- Неймспейс по умолчанию: `common`
- Ресурсы: JSON файлы из `locales/`

### Конфигурация релизов

#### .release-it.cjs
Конфигурация для автоматических релизов (использует release-it):
- Использует `@sber-orm/config-release-it`
- Автоматическое обновление версий и CHANGELOG

## Типы компонентов

Все компоненты используют **wrapper-паттерн** поверх `@v-uik/*`:

```typescript
// Пример: Button.tsx
import { Button as VButton } from '@v-uik/button';

export type TButtonVariants = 'primary' | 'secondary' | 'tertiary' | ...;

export interface IButtonProperties
  extends Omit<VButtonProperties, 'color' | 'kind' | 'size' | ...> {
  variant?: TButtonVariants;
  loading?: boolean;
  icon?: keyof typeof EIconName;
  // ... доп. пропсы
}

export const Button = forwardRef((properties, ref) => (
  <VButton {...properties} />
));
```

Это позволяет:
- Добавить кастомные пропсы
- Скрыть ненужные пропсы из базового компонента
- Изолировать от изменений в `@v-uik/*`
