## Цель

Перевести продуктовый код прототипа на реальные компоненты из `@sber-orm/ui-kit` (prebuilt tgz уже подключён через alias), удалить локальные shadcn-адаптеры там, где есть прямой аналог в kit. Сохранить визуальное поведение прототипа: kit отрисовывается своими стилями (`@sber-orm/ui-kit/index.css`), Tailwind остаётся только для лэйаута и кастомных карточек.

## Что есть сейчас

- `src/shared/ui/sber.ts` — активный re-export всего kit + `index.css`.
- `src/shared/ui/local.tsx` + `index.tsx` + `Button.tsx` / `Input.tsx` / `Modal.tsx` — локальные адаптеры поверх shadcn с API «как у kit».
- 11 доменных файлов импортируют из `@/shared/ui`.
- 17 доменных файлов всё ещё импортируют напрямую `lucide-react` и/или `@/components/ui/*` (модалки/листы/иконки/мета).
- `src/components/ui/*` (shadcn) — 30+ файлов, используются только модалкой/листами/иконками.

## Стратегия миграции

Не «удалить всё разом», а свапнуть source of truth: `@/shared/ui` отдаёт компоненты из `@sber-orm/ui-kit` напрямую, локальные адаптеры остаются как тонкая прослойка совместимости только там, где API kit отличается от того, чем уже пользуется домен. Параллельно — снести `@/components/ui/*` зависимости из доменного кода.

## План

### 1. Переключить `@/shared/ui` на kit
- Сделать `src/shared/ui/index.ts` единственной точкой: `export * from "./sber"` (kit) плюс точечные re-exports локальных алиасов, которые нужны домену под другими именами (`Title`, `Text`, `Link`, обёртка `Icon` для строковых имён, `Chips`, `Modal*`).
- Удалить `Button.tsx`, `Input.tsx`, `Modal.tsx`, `local.tsx`, `legacy.ts`, `icon-registry.ts`, `sber-switch.ts` — заменить на компоненты kit.
- Иконки: в домене заменить `lucide-react` импорты на `<Icon name="..."/>` из kit (kit предоставляет `EIconName` + `Icon`). Там, где имени нет в `EIconName` — оставить inline SVG.

### 2. Свапнуть модалки/листы
- Kit предоставляет `Modal` + `ModalHeader`/`Body`/`Footer`. Перевести `CounterpartyModal`, `AssessmentModal`, `Index`-овский Dialog, `*Drawer` на `Modal` из kit. Где kit не покрывает (правый `Sheet`/drawer) — оставить тонкую обёртку поверх Radix Dialog с пометкой `legacy-adapter`, но импортировать только её, без `@/components/ui/sheet` в домене.
- `InModalDrawer` — оставить как `product-component-candidate` (нет аналога), но базовые элементы внутри (Button, Icon) — из kit.

### 3. Свапнуть базовые контролы
- `Button`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `Tooltip`, `Badge`, `Chips`, `Row`/`Col`, `Loader`, `Typography` — берутся напрямую из kit. Подправить пропсы в местах вызова (variant/size именования у kit: `'M'` вместо `'md'`, `variant="primary"` и т.п. — большинство уже выровнено в адаптерах).

### 4. Чистка лишнего
- Удалить из `src/components/ui/` всё, что больше не импортируется из доменного кода (после миграции). Оставить только то, что нужно `legacy-adapter` обёртке `Sheet` (если она потребуется).
- Удалить `UI_KIT_AUDIT.md` / `MIGRATION_REPORT.md` обновить с финальным статусом.

### 5. Проверка
- `tsc --noEmit` зелёный.
- Preview визуально открывается, модалка контрагента открывается, drawers работают, кнопки кликабельны.

## Технические детали

Файлы под удаление:
```
src/shared/ui/Button.tsx
src/shared/ui/Input.tsx
src/shared/ui/Modal.tsx
src/shared/ui/local.tsx
src/shared/ui/legacy.ts
src/shared/ui/icon-registry.ts
src/shared/ui/sber-switch.ts
src/shared/ui/index.tsx          (заменяется на index.ts)
```

Новый `src/shared/ui/index.ts`:
```ts
import "@sber-orm/ui-kit/index.css";
export * from "@sber-orm/ui-kit";
// + точечные алиасы Title/Text/Link и Sheet-обёртка, если нужно
```

Риски и митигации:
- Kit имеет собственные шрифты (SBSans) и сетку — визуально страница может «дернуться» при первом включении CSS. Решение: kit CSS уже подключён через `sber.ts` (сейчас), смотрим preview, если есть глобальные конфликты с Tailwind — изолируем `:where()`-обёрткой или скоупим импорт.
- Kit-овые пропсы Select/Input value-first onChange — уже в адаптерах, но в kit-native компонентах могут быть `(value, event) => void` либо event-first. После свапа точечно поправлю call sites.
- React 18.3.1 в `dependencies` kit-а: dist использует только бэндлованные React-хуки из app-овского React (extern `react`), поэтому duplicate не будет.

## Что НЕ делаю
- Не меняю продуктовый дизайн карточек/виджетов (`AssistantSummaryCard`, `RiskDrawer` контент и т.д.) — только подменяю базовые primitives.
- Не трогаю `src/components/ui/*`, который используется внутри shadcn-обёрток других shadcn-файлов и не доходит до домена (карусели, breadcrumb и т.п. — позже).
- Не пишу adapter поверх kit-овых компонентов: где API kit отличается, правлю call site.

## Ожидаемый итог
- 0 импортов `@/components/ui/*` и `lucide-react` в `src/components/counterparty/*` и `src/pages/*`.
- `@/shared/ui` ≈ тонкий re-export `@sber-orm/ui-kit`.
- Готовность к выкатыванию пакета из реального registry — близко к 100%.
