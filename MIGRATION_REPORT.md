# Migration report: prototype → @sber-orm/ui-kit

## Summary

- Готовность к прямой подмене `export * from "@sber-orm/ui-kit"`: **~55–60%**.
- Сделано хорошо:
  - Существует единая точка входа `src/shared/ui` — почти все домены импортируют UI через неё.
  - `Button`, `Input`, `Text`, `Title`, `Link`, `Icon`, `Row`, `Col`, `Chips`, `RadioChips`, `CheckboxChips` приведены к контракту `ALL_COMPONENTS.md`.
  - Заведён `icon-registry.ts` и компонент `Icon` с `name + variant + size`.
  - `Modal` имеет адаптер с правильной структурой `Modal/ModalHeader/ModalBody/ModalFooter`.
- Главный риск: домены всё ещё импортируют `lucide-react` напрямую (≈17 файлов) и используют `Dialog/Sheet` композиции вместо `Modal/Drawer` ui-kit.
- Что блокирует прямую подмену:
  1. Прямые `lucide-react` иконки в продуктовых компонентах.
  2. `Dialog*` и `Sheet*` компоновки в `CounterpartyModal`, `Index`, `ProcessFilterDrawer`.
  3. Адаптеры `Checkbox`, `Textarea`, `Switch`, `Badge`, `Tooltip`, `Alert`, `RadioGroup`, `Label` — это passthrough shadcn API, не совпадающее с ui-kit.
  4. `Select` имеет только базовую реализацию (`tree`, `multiple`, `useChips` — заглушки).
  5. `Modal` не имеет пропсов `size`/`scrollable`.
- Следующие шаги: см. секцию "Recommended next iteration".

## UI import audit

| File | Current import / usage | Problem | Recommendation |
|---|---|---|---|
| `src/pages/Index.tsx` | `lucide-react` (множество иконок), `Dialog, DialogContent` из `@/shared/ui` | Прямые иконки и legacy Dialog | Перевести иконки на `<Icon name="…" />`, заменить Dialog на `Modal` |
| `src/components/counterparty/CounterpartyModal.tsx` | `Dialog, DialogContent` из `@/shared/ui`, `lucide-react` | Legacy Dialog API + прямые иконки | Заменить на `Modal*`, иконки через `Icon` |
| `src/components/counterparty/AssessmentModal.tsx` | `lucide-react` (X, ArrowLeft, CheckCircle2, Download, ChevronRight, Info, RefreshCw, Loader2, Flame, Zap, Send) | Прямые lucide-импорты | Заменить на `Icon name="…"`, добавить недостающие в `icon-registry` |
| `src/components/counterparty/AssessmentHistoryDrawer.tsx` | `lucide-react` (ChevronDown, Download, FileClock, GitCompare) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/AssistantSummaryCard.tsx` | `lucide-react` (Sparkles, ChevronRight, CheckCircle2, AlertTriangle, RotateCw) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/ContractDrawer.tsx` | `lucide-react` | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/DebtProcessDrawer.tsx` | `lucide-react` (ArrowRight, ArrowLeft, AlertTriangle, Check, Paperclip, FileText, Clock, HistoryIcon) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/DebtStepper.tsx` | `lucide-react` (Check, AlertTriangle) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/DebtSummaryCard.tsx` | `lucide-react` (AlertTriangle, Info) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/KeyAnomaliesWidget.tsx` | `lucide-react` (ChevronDown, Info) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/TrustFactorsWidget.tsx` | `lucide-react` (Info) | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/ResolutionCard.tsx` | `lucide-react` | Прямые иконки | Перевести на `Icon` |
| `src/components/counterparty/RiskDrawer.tsx` | использует `Checkbox/Input/Textarea/Button` из `@/shared/ui` — OK; косвенно зависит от legacy API checkbox | Адаптеры shadcn | После замены адаптеров — пересмотреть пропсы |
| `src/components/counterparty/ProcessFilterDrawer.tsx` | `Sheet, SheetContent` из `@/shared/ui`, `lucide-react X` | Legacy Sheet и прямая иконка | Перевести на `Drawer` ui-kit, `Icon` |
| `src/components/counterparty/InModalDrawer.tsx` | `lucide-react X` | Кастомный prototype-only drawer + прямая иконка | Оставить как product, иконку через `Icon` |
| `src/components/counterparty/NormAssistantIcon.tsx` | `lucide-react Sparkles` | Прямая иконка | Перевести на `Icon name="sparkles"` |
| `src/components/counterparty/assessment-count-meta.ts` | `lucide-react` иконки как значения | Используются как LucideIcon-значения | Хранить `IconName` строкой, рендерить через `Icon` |
| `src/components/counterparty/risk-meta.ts` | `lucide-react` (множество) | Иконки как значения мета-данных | Перевести на `IconName` |
| `src/lib/process-meta.ts` | `lucide-react LucideIcon` | Иконки как значения | Перевести на `IconName` |
| `src/lib/problem-indicators.ts` | `lucide-react LucideIcon` | Иконки как значения | Перевести на `IconName` |
| `src/components/ui/*` | shadcn primitives | Внутренности слоя совместимости; в домене не использовать | Не импортировать напрямую в домене |

## Component compatibility

| Component | Status | What matches | What does not match | Required action |
|---|---|---|---|---|
| Button | strict-compatible | variant/size/icon/iconAfter/iconOnly/loading/fullWidth | — | Финально проверить `ButtonVariant` после подмены |
| Input | strict-compatible | size/label/error/clearable/onChange(value, event) | — | — |
| Text | strict-compatible | size sm/md/lg/xlg + bold/medium/nowrap/mb/uppercase/white/link/tooltip | — | — |
| Title | strict-compatible | size H200…H900 + thin/uppercase/nowrap/white/mb | — | — |
| Link | strict-compatible | size/bold/uppercase/mb | — | — |
| Icon | strict-compatible | name/size/width/height/stroke/variant/title/inline/onClick | Нет всего набора имён в `iconMap` | Расширять `icon-registry` по мере появления новых имён |
| Row | strict-compatible | align/justify/direction/mb/wrap/noFlex/gutter | — | — |
| Col | strict-compatible | span 1–12 | offset/order не реализованы | Добавить при появлении кейсов |
| Chips | strict-compatible | item/selected/onChange/onRemove/variant/fullWidth/nowrap | — | — |
| RadioChips | strict-compatible | value/items/kind/onChange/color/wrap/label/helperText/required/readonly | — | — |
| CheckboxChips | strict-compatible | value[]/items/kind/wrap/onChange/label/helperText/inline | — | — |
| Modal | partial-compatible | open/onOpenChange/Header/Body/Footer/Title/Description | Нет `size`, `scrollable`, `closeOnOverlayClick` | Добавить пропсы |
| Select | partial-compatible | options/value/onChange(value, event, full, reason)/label/placeholder/readonly | `tree`, `multiple` (визуально), `useChips`, `showOptionSearch`, `showDroplistButtons`, `optionRenderLimit` — заглушки | Дождаться ui-kit или реализовать |
| Checkbox | legacy-adapter | onCheckedChange (radix) | ui-kit ждёт `checked/onChange(value,event)/label/error/disabled` | Завернуть в адаптер |
| Textarea | legacy-adapter | нативные HTML props | ui-kit ждёт `value/onChange(value,event)/label/error/rows/resize` | Завернуть в адаптер |
| Switch | legacy-adapter | onCheckedChange | ui-kit: `checked/onChange(value,event)/label` | Адаптер |
| Badge | legacy-adapter | variant default/destructive/outline | ui-kit: `color/size/variant fill\|outline` | Адаптер |
| Loader | legacy-adapter | alias `Skeleton` | ui-kit: spinner `size/color` | Заменить на спиннер |
| Tooltip | legacy-adapter | radix composition | ui-kit: `<Tooltip title=…>{children}</Tooltip>` | Адаптер |
| Alert | legacy-adapter | shadcn `Alert/AlertTitle/AlertDescription` | ui-kit (Notice/Notification): `type/title/description/closable` | Адаптер |
| RadioGroup | legacy-adapter | radix `RadioGroup/RadioGroupItem` | ui-kit: `Radio` c `value/onChange/items` | Адаптер |
| Label | legacy-adapter | shadcn label | В ui-kit нет — поглощается label-пропсами полей | Удалить из публичного API |
| Dialog/Sheet exports | legacy-adapter | оставлены для совместимости | Должны исчезнуть после миграции экранов | TODO в коде уже стоит |
| Drawer | missing | — | В ui-kit есть Drawer, в shared/ui нет адаптера | Добавить адаптер на базе `@/components/ui/drawer` или `sheet` |
| Radio (single) | missing | — | — | Добавить |
| Notice / Notification | missing | — | — | Добавить (сейчас только Alert) |

## No-ui-kit analogs

| Pattern | Used in | Why needed | Temporary solution | Migration decision |
|---|---|---|---|---|
| InModalDrawer | CounterpartyModal, AssessmentModal | Drawer внутри модалки (не на всё окно) | Локальный компонент `InModalDrawer.tsx` | product-component-candidate |
| ProcessStepper / DebtStepper | DebtProcessDrawer | Кастомный stepper исков | Локальный компонент | product-component-candidate |
| AssistantSummaryCard / Banner | Index, drawers | AI-summary блок | Локальный компонент | product-component-candidate |
| ResolutionCard | Counterparty модалка | Карточка решения по контрагенту | Локальный компонент | product-component-candidate |
| RiskDrawer / KeyAnomaliesWidget / TrustFactorsWidget | Counterparty модалка | Доменные виджеты | Локальные компоненты | product-component-candidate |
| DebtSummaryCard / DebtProcessDrawer | Counterparty модалка | Доменные виджеты | Локальные компоненты | product-component-candidate |
| CounterpartyStatusBadge | Index, modals | Брендированный бейдж | Локальный компонент поверх `span` | product-component-candidate (внутри использовать `Badge` из ui-kit после миграции) |
| Source popover / Evidence list | AssessmentModal | UX-паттерн объяснений | Локально | no-ui-kit-analog → product-kit |
| Custom timeline | AssessmentHistoryDrawer | История оценок | Локально | product-component-candidate |
| Donut/Charts | DebtSummaryCard | Визуализация | recharts | uikit-extension-candidate (или product-kit) |
| NormAssistantIcon | header | Брендовая иконка | Локально (Sparkles) | product-component-candidate |

## Breakage risk if `export * from "@sber-orm/ui-kit"`

| Area | Risk level | What breaks | Fix |
|---|---|---|---|
| `lucide-react` импорты в доменах | high | Иконки останутся, но дублируют ui-kit `Icon` — стили/размеры разойдутся | Перевести всё на `<Icon name="…" />` |
| `Dialog/DialogContent` в `Index.tsx`, `CounterpartyModal.tsx` | high | `@sber-orm/ui-kit` не экспортирует `Dialog*` | Перевести на `Modal*` |
| `Sheet/SheetContent` в `ProcessFilterDrawer.tsx` | high | Аналогично — нет `Sheet*` в ui-kit | Перевести на `Drawer` |
| `Checkbox` из `@/shared/ui` | medium | radix `onCheckedChange` vs ui-kit `onChange(value,event)` | Адаптер |
| `Textarea` | medium | API `onChange(event)` vs `onChange(value,event)` | Адаптер |
| `Switch` | medium | `onCheckedChange` vs `onChange` | Адаптер |
| `Badge` | medium | shadcn `variant` vs ui-kit `color/size` | Адаптер |
| `Tooltip` (radix composition) | medium | ui-kit ждёт обёртку `Tooltip title=` | Адаптер |
| `Alert*` | medium | ui-kit использует Notice/Notification | Адаптер или замена |
| `Skeleton/Loader` | low | ui-kit `Loader` — спиннер, не скелет | Развести: `Skeleton` оставить локальным, `Loader` — из ui-kit |
| `RadioGroup/RadioGroupItem` | medium | ui-kit использует `Radio` c `items/value` | Адаптер |
| `Label` экспорт | low | В ui-kit нет | Убрать из публичного API |
| `Modal` без `size/scrollable` | low | Visual regressions | Добавить пропсы |
| `Select` без `tree/multiple/useChips` | medium | В прототипе не используется глубоко, но возможны regressions | Реализовать или подождать ui-kit |
| `LegacySelect` экспорт | low | Использования нет — можно убрать | Удалить после миграции |
| Прямые `<button>/<input>/<select>/<textarea>` | low | В домене не найдены | Контроль линтером |

## Files requiring manual migration

- `src/pages/Index.tsx` — иконки + `Dialog`.
- `src/components/counterparty/CounterpartyModal.tsx` — `Dialog` → `Modal`, иконки.
- `src/components/counterparty/AssessmentModal.tsx` — иконки, потенциально `Dialog`.
- `src/components/counterparty/ProcessFilterDrawer.tsx` — `Sheet` → `Drawer`, иконка `X`.
- `src/components/counterparty/InModalDrawer.tsx` — иконка `X`, оставить как product.
- `src/components/counterparty/{Assessment,Assistant,Contract,Debt,KeyAnomalies,Trust,Resolution,Risk,DebtStepper,DebtProcess,RegistrationInfo,NormAssistant,AssessmentHistory}*.tsx` — прямые `lucide-react`.
- `src/components/counterparty/{assessment-count-meta,risk-meta}.ts`, `src/lib/{process-meta,problem-indicators}.ts` — хранят `LucideIcon` как значения; перевести на `IconName`.
- `src/shared/ui/index.tsx` — после миграции вычистить legacy-экспорты (`Dialog*`, `Sheet*`, `LegacySelect`, `Label`, `Skeleton` как `Loader`).
- `src/shared/ui/Modal.tsx` — добавить `size`, `scrollable`.

## Recommended next iteration

1. Перевести все `lucide-react` импорты в `src/components/counterparty/*` и `src/pages/Index.tsx` на компонент `Icon`. Дополнить `icon-registry`.
2. Заменить `Dialog*` на `Modal*` в `Index.tsx` и `CounterpartyModal.tsx`.
3. Перевести `ProcessFilterDrawer` с `Sheet` на адаптер `Drawer` (добавить в `shared/ui`).
4. Завернуть `Checkbox`, `Textarea`, `Switch`, `Badge`, `Tooltip`, `Alert`, `RadioGroup` в адаптеры с контрактом ui-kit.
5. Добавить `size`/`scrollable` в `Modal`.
6. Удалить из публичного API `Label`, `LegacySelect`, `Sheet*`, `Dialog*` после миграции экранов.
7. Реализовать `Select` `multiple/useChips/tree` либо явно пометить как ожидание ui-kit.
8. После — провести dry-run подмены: создать `src/shared/ui/index.ts` с `export * from "@sber-orm/ui-kit"` и собрать билд под флагом.
