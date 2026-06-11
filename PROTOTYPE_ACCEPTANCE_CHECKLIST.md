# Prototype acceptance checklist for ui-kit migration

## Imports

- [x] All reusable UI components imported from `@/shared/ui` (domain layer)
- [ ] No direct imports from `@/components/ui/*` in domain components
  - OK в `src/components/counterparty/*` и `src/pages/Index.tsx` — прямых импортов нет.
  - Используются только внутри `src/shared/ui/*` (это допустимый слой совместимости).
- [ ] No direct imports from `lucide-react` in domain components
  - **Нарушают** ≈17 файлов в `src/components/counterparty/*`, `src/pages/Index.tsx`, `src/lib/{process-meta,problem-indicators}.ts`, `src/components/counterparty/{risk-meta,assessment-count-meta}.ts`.
- [ ] No Radix/shadcn primitives in domain components
  - **Нарушают**: `Dialog/DialogContent` в `Index.tsx`, `CounterpartyModal.tsx`; `Sheet/SheetContent` в `ProcessFilterDrawer.tsx` (через `@/shared/ui`-реэкспорт legacy).
- [x] No native `button`, `input`, `select`, `textarea` where ui-kit analog exists
  - В доменах не найдено.

## Components

- [x] Button API matches `ALL_COMPONENTS.md`
- [x] Input API matches `ALL_COMPONENTS.md`
- [~] Select API matches `ALL_COMPONENTS.md` — `multiple`, `useChips`, `onChipRemove` реализованы базово; `tree`, `showOptionSearch`, `showDroplistButtons` — TODO.
- [~] Modal API matches `ALL_COMPONENTS.md` — `onClose`, `ModalHeader.title`, `closeButtonProps`, `ModalFooter.noBorder` реализованы; `size`, `scrollable` — TODO.
- [x] Text API matches `ALL_COMPONENTS.md`
- [x] Title API matches `ALL_COMPONENTS.md`
- [x] Icon API matches `ALL_COMPONENTS.md` (расширять `icon-registry` по мере появления имён)
- [ ] Badge API matches `ALL_COMPONENTS.md` — passthrough shadcn (`variant`), нет `color/size/variant fill|outline`.
- [x] Chips API matches `ALL_COMPONENTS.md`
- [x] RadioChips / CheckboxChips API matches `ALL_COMPONENTS.md`
- [~] Radio (single) добавлен как partial-compatible adapter.
- [~] Notice / Notification экспортированы как alias `Alert` (TODO).

## Exceptions

- [ ] All `prototype-only` components are marked — частично (см. `UI_KIT_GAPS.md`); в коде ещё нет TSDoc-меток.
- [x] All `no-ui-kit-analog` components have migration notes (см. `UI_KIT_GAPS.md`)
- [x] All `legacy-adapter` components are listed in `MIGRATION_REPORT.md`
- [x] All product component candidates are listed in `UI_KIT_GAPS.md`

## Build

- [ ] `npm run build` passes — последний прогон `npx tsc --noEmit` зелёный; полный `npm run build` нужно подтвердить (билд-чек запускается автоматически окружением).
- [x] `MIGRATION_REPORT.md` is updated
- [x] `UI_KIT_GAPS.md` is updated
- [x] `PROTOTYPE_ACCEPTANCE_CHECKLIST.md` is updated
