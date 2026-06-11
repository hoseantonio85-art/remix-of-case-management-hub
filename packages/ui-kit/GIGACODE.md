# GIGACODE.md

## Project Overview

**@sber-orm/ui-kit** is a React-based UI component library (version 0.266.0) for Cloud UI applications. It's built on top of [UI Kit Platform V](http://kit.cmp.sbc.space/v-uik/1.4.0/) and uses Sberbank's Cloud design system and token system.

### Key Technologies

| Category | Technology |
|----------|------------|
| **Core** | React 18.3.1 + TypeScript + Vite 6.0.0-alpha.18 |
| **Styling** | SCSS modules + CSS variables (CSS Custom Properties) |
| **Icons** | SVG-as-JS (via `vite-plugin-svgr`) |
| **Development** | Storybook 8.2.6 |
| **Testing** | Vitest + Puppeteer (UI tests) |
| **Code Quality** | Biome 2.3.11 (lint + format) |
| **Build** | tsup (ESM bundle) |

### Project Type

This is a **frontend UI library** - not a standalone application. It's designed to be imported by other projects rather than run directly.

---

## Directory Structure

```
packages/ui-kit/
├── .ai/                      # AI-orientated documentation (generated)
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── HOOKS_API.md
│   ├── CONFIGURATION.md
│   └── ALL_COMPONENTS.md    # Полная документация всех компонентов с пропсами и примерами
├── .storybook/               # Storybook configuration
├── dist/                     # Built ESM output
├── node_modules/
├── src/
│   ├── @types/              # TypeScript declarations
│   │   └── vite-env.d.ts
│   ├── components/          # 41 UI components
│   │   ├── Accordion/
│   │   ├── Alert/
│   │   ├── Button/          # Example: Button.tsx + styles.module.scss
│   │   ├── Checkbox/
│   │   ├── Modal/
│   │   ├── Select/
│   │   └── ...
│   ├── hooks/               # 14 custom React hooks
│   ├── i18n/                # Internationalization (ru locale)
│   ├── icons/               # 700+ SVG icons (categorized)
│   ├── stories/             # 41 Storybook stories
│   ├── styles/              # SCSS utilities
│   ├── types/               # Shared TypeScript types
│   ├── colors.scss          # Color SCSS imports
│   ├── variables.scss       # Variable SCSS imports
│   └── index.ts             # Main export
├── static/                   # Static assets
├── types/                    # Published type definitions
├── utils/                    # Utility scripts
│   └── uiTest.js            # UI screenshot testing
├── .gitignore
├── .lintstagedrc.json
├── .release-it.cjs
├── .swcrc
├── biome.json
├── CHANGELOG.md
├── package.json
├── README.md
├── tsconfig.json
├── tsup.config.ts
├── vite.config.ts
└── vite.env.d.ts
```

---

## Building and Running

### Prerequisites

- Node.js (compatible with React 18.3.1)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run start` or `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build` | Build ESM library to `dist/` |
| `npm run build:types` | Copy type definitions to `types/dist/` |
| `npm run storybook:build` | Build static Storybook (for deployment) |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Run Biome linter with auto-fix |
| `npm run format` | Run Biome formatter |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test` | Run UI tests (screenshot comparison) |
| `npm run test:ui` | Full UI test suite (build + screenshot diff) |

### Release Management

| Command | Description |
|---------|-------------|
| `npm run release` | Create release and publish to npm |
| `npm run debug:release` | Dry-run release (preview only) |
| `npm run release:types` | Publish type definitions |

---

## Development Conventions

### Coding Style

- **Language**: TypeScript with strict typing
- **Formatter**: Biome (configured via `biome.json` extending `@sber-orm/biome-config`)
- **JSX**: React 18 JSX transform (`react-jsx`)
- **Imports**: Absolute paths using `@` alias (resolves to `src/`)
- **Styling**: SCSS modules (`.module.scss`) for component isolation

### Component Architecture

All components follow a **wrapper pattern**:

```typescript
// src/components/Button/index.ts
export * from './Button';

// src/components/Button/Button.tsx
import { Button as VButton } from '@v-uik/button';

export type TButtonVariants = 'primary' | 'secondary' | ...;
export interface IButtonProperties extends Omit<VButtonProperties, 'color'> {
  variant?: TButtonVariants;
  loading?: boolean;
  icon?: keyof typeof EIconName;
  // ... custom props
}

export const Button = forwardRef((properties, ref) => (
  <VButton {...properties} />
));
```

This pattern:
- Wraps `@v-uik/*` base components
- Exposes only required props
- Adds custom styling via SCSS modules
- Supports TypeScript generics

### File Naming Conventions

| File Type | Pattern | Example |
|-----------|---------|---------|
| Component | `ComponentName.tsx` | `Button.tsx` |
| Story | `componentName.stories.tsx` | `button.stories.tsx` |
| Styles | `styles.module.scss` | `styles.module.scss` |
| Hook | `use*.ts` | `useDebounce.ts` |

### Type Definitions

- **Shared types**: `src/types/*.ts` (e.g., `colors.ts`, `variables.ts`)
- **Component types**: Defined inline in component files
- **Icons**: `src/icons/index.ts` exports `EIconName` enum + `iconMap`

### State Management Pattern

Custom hooks in `src/hooks/` provide reusable stateful logic:

| Hook | Purpose |
|------|---------|
| `useDebounce` | Delay value updates (search inputs) |
| `useThrottle` | Limit function call frequency |
| `useCopyToClipboard` | Copy text to clipboard |
| `useEventListener` | Bind event listeners safely |
| `useComponentVisible` | Detect clicks outside component |
| `useStorageData` | localStorage/sessionStorage binding |

### Icon Usage

Icons are imported as React components:

```typescript
import { Icon, EIconName } from '@sber-orm/ui-kit';

// Using Icon wrapper
<Icon name={EIconName.search} width={24} height={24} />

// Or direct import
import { search, user, settings } from '@sber-orm/ui-kit/icons';
```

Icon categories in `src/icons/`:
- `arrows/` - Navigation arrows
- `currency/` - Monetary symbols
- `fileType/` - File type indicators
- `filter/` - Filter-related icons
- `interface/` - General UI icons
- `loader/` - Loading animations
- `menu/` - Sidebar navigation
- `priority/` - Priority indicators
- `status/` - Status indicators

### Internationalization

- **Default language**: Russian (`ru`)
- **Configuration**: `src/i18n/config.ts`
- **Locales**: `src/i18n/locales/ru/common.json`
- **Usage**: `react-i18next` integration

### Styling Conventions

SCSS variables follow CSS Custom Properties pattern:

```scss
// Component styles use CSS variables
.primary {
  background: var(--buttonPrimaryDefault) !important;
  color: var(--textBaseInverse) !important;
}

&:hover {
  background: var(--buttonPrimaryHover) !important;
}
```

### Testing Strategy

1. **Unit tests**: Vitest with `happy-dom` environment
2. **UI tests**: Puppeteer + pixelmatch for visual regression
3. **Storybook**: Component documentation and manual testing

UI test flow in `utils/uiTest.js`:
```javascript
1. Build Storybook static
2. Start Express server
3. Open each story in Puppeteer
4. Take screenshot
5. Compare with reference (pixelmatch)
6. Report differences
```

---

## Build System Details

### Multi-Entry Bundle

The library supports **granular imports** for tree-shaking:

```typescript
// All components
import { Button, Input, Modal } from '@sber-orm/ui-kit';

// Individual components (optimized)
import { Button } from '@sber-orm/ui-kit/components/Button/index';
import { useDebounce } from '@sber-orm/ui-kit/hooks';
import { Icon, EIconName } from '@sber-orm/ui-kit/icons';
```

### Manual Chunks

Vite configuration creates optimized chunks:

| Chunk | Contents |
|-------|----------|
| `vendor-dayjs` | dayjs library |
| `vendor-utils` | classnames |
| `vendor-imask` | react-imask |
| `vendor-scroll` | simplebar-react |
| `vendor-other` | Other node_modules |
| `shared-utils` | src/utils/ code |

### Output Format

- **Format**: ESM only (`type: "module"` in package.json)
- **Target**: ES2020
- ** sourcemaps**: Enabled in production
- **CSS**: Single `dist/index.css`

### Type Publishing

```bash
# Builds create:
dist/
├── index.js               # ESM entry
├── index.d.ts             # Type definitions
└── components/            # Individual component bundles

types/dist/
└── index.d.ts             # Type definitions (publish-ready)
```

---

## Repository Information

- **Git URL**: `https://stash.sigma.sbrf.ru/scm/sberorm/sberorm-front-lib-core.git`
- **Package Directory**: `packages/ui-kit`
- **Author**: Dmitry Kozlov (DmAleKozlov@sberbank.ru)
- **License**: ISC

### Versioning

- Current version: **0.266.0**
- Version history in `CHANGELOG.md`
- Automated releases via `release-it`

---

## Key Dependencies

| Scope | Package | Version | Purpose |
|-------|---------|---------|---------|
| **Core** | react | 18.3.1 | UI library |
| **Core** | react-dom | 18.3.1 | DOM renderer |
| **Base** | @v-uik/* | 1.13.0-1.18.0 | UI Kit Platform V |
| **I18n** | i18next | ^23.11.5 | Internationalization |
| **Utils** | dayjs | ^1.11.13 | Date handling |
| **Utils** | react-imask | 7.6.1 | Input masking |
| **Utils** | classnames | ^2.3.1 | Class name joining |
| **Dev** | vite | ^6.0.0-alpha.18 | Build tool |
| **Dev** | storybook | ^8.2.6 | Component dev environment |
| **Dev** | vitest | 3.0.5 | Unit testing |
| **Dev** | biome | 2.3.11 | Linting/formatting |

---

## Quick Start for AI Assistants

When working with this codebase:

1. **Component modification**: Edit `src/components/ComponentName/` files
2. **Adding new component**: Follow existing component structure
3. **New hook**: Create in `src/hooks/` with `use*` naming
4. **New icon**: Add to appropriate `src/icons/*/` folder
5. **Testing**: Run `npm run test:ui` after visual changes
6. **Linting**: Run `npm run lint` before committing
7. **Type safety**: TypeScript is enforced; avoid `any` types
8. **SCSS**: Use CSS variables, follow existing patterns

For detailed component API, see `ALL_COMPONENTS.md`.
For hook documentation, see `HOOKS_API.md`.
For configuration details, see `CONFIGURATION.md`.
For complete component documentation with props and examples, see `.ai/ALL_COMPONENTS.md`.
