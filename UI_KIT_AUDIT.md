# UI-kit audit — подготовка к замене на `@sber-orm/ui-kit`

Дата: 2026-06-11. Аудит без правок UI/визуала. Контракт: `ALL_COMPONENTS.md`.
`npm run build` (`tsc --noEmit`): **OK**.

---

## 1. Импорты UI

### 1.1 Импорты из `@/shared/ui` (правильно)
- `src/App.tsx`
- `src/pages/Index.tsx`
- `src/components/counterparty/ProcessFilterDrawer.tsx`
- `src/components/counterparty/ResolutionCard.tsx`
- `src/components/counterparty/RiskDrawer.tsx`
- `src/components/counterparty/CounterpartyModal.tsx`
- `src/components/counterparty/ContractDrawer.tsx`
- `src/components/counterparty/AssistantSummaryCard.tsx`
- `src/components/counterparty/AssessmentHistoryDrawer.tsx`
- `src/components/counterparty/AssessmentModal.tsx`

### 1.2 Прямые импорты из `@/components/ui/*` вне `shared/ui`
Нет. Все продуктовые файлы ходят через `@/shared/ui`. Прямые ссылки на
`@/components/ui/*` остались только внутри `src/shared/ui/*` (адаптеры) и
внутри самих shadcn-файлов (`src/components/ui/*`, internal).

### 1.3 Прямые импорты `lucide-react` в продуктовом коде
17 файлов вне `shared/ui`. По контракту это должно быть только
`<Icon name="..."/>`. Это главный источник «утечки» иконок:

- `src/pages/Index.tsx`
- `src/lib/process-meta.ts`
- `src/lib/problem-indicators.ts`
- `src/components/counterparty/AssessmentHistoryDrawer.tsx`
- `src/components/counterparty/AssessmentModal.tsx`
- `src/components/counterparty/AssistantSummaryCard.tsx`
- `src/components/counterparty/ContractDrawer.tsx`
- `src/components/counterparty/CounterpartyModal.tsx`
- `src/components/counterparty/DebtProcessDrawer.tsx`
- `src/components/counterparty/DebtStepper.tsx`
- `src/components/counterparty/DebtSummaryCard.tsx`
- `src/components/counterparty/InModalDrawer.tsx`
- `src/components/counterparty/KeyAnomaliesWidget.tsx`
- `src/components/counterparty/NormAssistantIcon.tsx`
- `src/components/counterparty/ProcessFilterDrawer.tsx`
- `src/components/counterparty/ResolutionCard.tsx`
- `src/components/counterparty/TrustFactorsWidget.tsx`
- `src/components/counterparty/assessment-count-meta.ts`
- `src/components/counterparty/risk-meta.ts`

### 1.4 Прямая Radix/shadcn-композиция в продуктовом коде
- `Dialog/DialogContent` — `src/pages/Index.tsx` (через re-export из `@/shared/ui`,
  но используется legacy-композиция, а не `Modal`).
- `Dialog*` композиция — `src/components/counterparty/CounterpartyModal.tsx`,
  `src/components/counterparty/AssessmentModal.tsx` (фикс-вёрстка большой модалки).
- `Sheet/SheetContent` — `src/components/counterparty/ProcessFilterDrawer.tsx`.
- `InModalDrawer` — кастомный компонент, не из ui-kit
  (RegistrationInfoDrawer, RiskDrawer, AssessmentHistoryDrawer).
- `Select*` радикс-композиция в продуктовом коде — НЕ найдено
  (только новый адаптер `Select` и legacy re-exports `LegacySelect`).

### 1.5 Нативные `<button>/<input>/<select>/<textarea>`
42 вхождения в продуктовом коде. Большинство — обоснованные icon-only / link-style
кнопки внутри карточек (DebtSummaryCard, InModalDrawer, ProcessFilterDrawer и т.д.).
Один явный кандидат на `Button link`:
- `src/pages/Index.tsx:514` — `<button className="text-muted-foreground hover:text-foreground">`.

---

## 2. Соответствие `shared/ui` контракту

| Компонент | Статус | Комментарий |
|---|---|---|
| Button | strict-compatible | variant/size/icon(name)/iconAfter/iconOnly/link — по контракту. |
| Input | strict-compatible | size S/M/L/XL, icon=name, onChange(value,event,reason), viewOnly/label*. |
| Text | strict-compatible | size sm/md/lg/xlg + bold/medium/nowrap/mb/uppercase/white/link/disabled. |
| Title | strict-compatible | size H200…H900 + thin/uppercase/nowrap/white/mb. |
| Link | strict-compatible | |
| Icon | strict-compatible | name + size/variant(fill/stroke)/onClick через локальный icon-registry. |
| Row / Col | strict-compatible | gutter [x,y], align/justify/direction/wrap, span 1–12. |
| Chips | strict-compatible | items {id,title,count} + kind/color/wrap/required/error/helperText. |
| RadioChips | strict-compatible | items + value + onChange(id). |
| CheckboxChips | strict-compatible | items + value[] + onChange(ids). |
| Modal | partial-compatible | Modal/ModalHeader/Body/Footer/Title есть; нет size, withoutCloseIcon, scrollable, onClose-отдельно (только onOpenChange). Параллельно ре-экспортит legacy Dialog*. |
| Select | partial-compatible | options/value/onChange по контракту; tree/multiple(visual)/useChips/showOptionSearch/showDroplistButtons — приняты в типах, не реализованы. |
| Tooltip | legacy-adapter | Re-export radix Tooltip/TooltipContent/TooltipTrigger/TooltipProvider. В ui-kit: `<Tooltip text=… placement=…>{child}</Tooltip>` — API не совпадает. |
| Badge | legacy-adapter | shadcn Badge с variant default/secondary/destructive/outline. В ui-kit Badge — color (EComponentColors), size, dot. |
| Loader | legacy-adapter | Сейчас это `Skeleton` под псевдонимом. В ui-kit `Loader` — spinner, не skeleton. |
| Switch | legacy-adapter | shadcn Switch (checked/onCheckedChange). В ui-kit — value/onChange(value,event), size, label, labelPosition. |
| RadioGroup/RadioGroupItem | legacy-adapter | Радикс-композиция. В ui-kit — `Radio` с options/value/onChange. |
| Checkbox | legacy-adapter | shadcn Checkbox (checked/onCheckedChange). В ui-kit — value/onChange, label, indeterminate. |
| Textarea | legacy-adapter | shadcn Textarea без label/helperText/error/autoResize/maxRows/size. |
| Alert / AlertTitle / AlertDescription | legacy-adapter | shadcn Alert. В ui-kit — `<Alert type=… title=… message=… onClose=…/>`. |
| Notice | missing | Нет адаптера. |
| Notification | missing | Нет адаптера (Toaster/Sonner ≠ Notification API). |
| Dialog* (re-export) | prototype-only | Оставлен для крупных модалок (Counterparty/Assessment) с фиксированной вёрсткой. |
| Sheet* (re-export) | prototype-only | Используется в ProcessFilterDrawer; нужен до миграции на ui-kit Drawer. |
| LegacySelect, SelectTrigger/Content/Item/... | prototype-only | Помечено TODO, в продуктовом коде не используется. |

Компоненты, которых в `shared/ui` нет совсем (missing для нового кода):
`InputNumber`, `MoneyInput`, `InputMask`, `ComboBox`, `FieldSelect`, `FieldSearch`,
`DatePicker`, `DateRangePicker`, `MoneyRangeInput`, `BarChart`, `LinearProgress`,
`InfoDisplay`, `Level`, `Shimmer`, `Notice`, `Notification`, `Accordion`,
`Popper/Popup`, `Popover`, `ScrollBar`, `MarkdownViewer`, `Droplist`, `FileUploader`.
На текущий прототип они не нужны, но при переходе на пакет станут доступны «бесплатно».

---

## 3. No-ui-kit паттерны (prototype-only)

| Паттерн | Где | Зачем | Можно ли из ui-kit primitives | Решение |
|---|---|---|---|---|
| `InModalDrawer` | RegistrationInfoDrawer, RiskDrawer, AssessmentHistoryDrawer | Правый sub-drawer внутри модалки | Нет (ui-kit Drawer оверлеит весь экран) | Оставить product-компонент. Кандидат на расширение ui-kit |
| `Sheet` (right drawer) | ProcessFilterDrawer | Полноэкранный правый drawer | Частично — кандидат на `Drawer` из ui-kit | Адаптировать после установки пакета |
| `DebtStepper` / `DebtSummaryCard` | DebtProcessDrawer, CounterpartyModal | Доменный stepper процесса взыскания | Нет, доменная логика | product component |
| `KeyAnomaliesWidget`, `TrustFactorsWidget`, `RegistrationInfoWidget`, `AssistantSummaryCard`, `ResolutionCard` | CounterpartyModal/Index | Доменные карточки | Можно собрать из Row/Col/Title/Text/Chips/Icon | product component, рефакторить иконки |
| `NormAssistantIcon` | везде в assistant-карточках | Брендированная иконка NORM AI | Нет | product component, lucide → ассет/SVG |
| `CounterpartyStatusBadge` | таблица контрагентов | Цветные tone-бэйджи | Частично, через `Badge` color | После миграции Badge — заменить |
| `ProcessFilterDrawer` UI | фильтр процесса | Список кастомных карточек выбора | Можно из RadioChips или Modal+Row/Col | product component |
| Run-dialog (Index 815) | Index.tsx | Прогресс-модалка запуска оценки | Можно из Modal + LinearProgress | После миграции Modal/LinearProgress |

Кандидаты на расширение ui-kit: `Drawer right side`, `InModalDrawer` (sub-drawer),
`Stepper` (вертикальный, с состояниями previous/current/next).

---

## 4. Что сломается при `export * from "@sber-orm/ui-kit"`

### 4.1 Сломается компиляция — таких экспортов в пакете нет
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogTrigger`
  → `src/pages/Index.tsx`, `CounterpartyModal.tsx`, `AssessmentModal.tsx`.
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetFooter`, `SheetClose`, `SheetTrigger`, `SheetDescription`
  → `ProcessFilterDrawer.tsx`.
- `LegacySelect`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
  → в продуктовом коде не используются, но экспортируются.
- `RadioGroup`, `RadioGroupItem` → не используются (можно убрать сразу).
- `Skeleton` как отдельный экспорт (не `Loader`).
- `Toaster`, `Sonner` → используются в `src/App.tsx`.
- `Label`, `AlertTitle`, `AlertDescription`.

### 4.2 Сломается рантайм / типы из-за расхождения API
- **Tooltip**: композиция `<Tooltip><TooltipTrigger/><TooltipContent/></Tooltip>` ≠ ui-kit `<Tooltip text=...>`.
- **Switch**: `checked/onCheckedChange` ≠ `value/onChange`.
- **Checkbox**: `checked/onCheckedChange` ≠ `value/onChange`.
- **Badge**: `variant` (default/secondary/destructive/outline) ≠ `color` (EComponentColors).
- **Loader (=Skeleton)**: семантика skeleton vs spinner.
- **Alert**: shadcn-композиция vs `<Alert type title message onClose>`.
- **Textarea**: shadcn props vs ui-kit `value/onChange(value,event)`, `label`, `error`, `helperText`, `autoResize`.
- **Modal**: `Dialog*`-композиция в продуктовом коде ≠ `<Modal open onClose size>` + `ModalHeader/ModalBody/ModalFooter`.
- **Select**: tree/multiple/useChips/showOptionSearch — типы приняты, логика отсутствует; при подмене UI провалится для этих случаев.

### 4.3 Иконки
Все 17 файлов с прямым `lucide-react`-импортом → ui-kit ожидает `<Icon name="..."/>`.
После подмены lucide-компоненты продолжат рендериться как React-компоненты,
но визуально выпадут из дизайн-системы Сбера.

---

## 5. План действий до подмены пакета

Порядок (по риску → пользе):

1. **Иконки.** Перевести 17 файлов с `lucide-react` на `<Icon name="...">` через
   `@/shared/ui`. Дополнить `icon-registry.ts` недостающими именами из
   `EIconName` (поиск/калькулятор/документ/банкротство и т.д.).
2. **Адаптеры по контракту:** Tooltip, Switch, Checkbox, Badge, Alert, Textarea,
   Loader (spinner), Radio (вместо RadioGroup). Поведение остаётся то же, API
   меняется на `value/onChange(value,event)` и др.
3. **Modal.** Перевести `Dialog*` в `Index.tsx`, `CounterpartyModal.tsx`,
   `AssessmentModal.tsx` на `Modal/ModalHeader/ModalBody/ModalFooter` + size.
   `largeModalContentClass` оставить как override через className.
4. **Sheet → Drawer.** ProcessFilterDrawer переписать на ui-kit Drawer
   (после установки пакета). До этого — оставить как product component.
5. **InModalDrawer.** Оставить как product component. Возможно — предложить
   расширение в ui-kit.
6. **Select.** Дореализовать multiple/useChips/tree — взять реализацию из
   самого `@sber-orm/ui-kit` после установки.
7. **Notice/Notification.** Добавить адаптеры или дождаться пакета.
8. **Удалить** из `@/shared/ui` legacy re-exports: `Dialog*`, `Sheet*`,
   `LegacySelect`, `SelectTrigger/Content/...`, `RadioGroup*`, `Label`,
   `AlertTitle/Description`, `Skeleton` (оставить только `Loader`).

После этих шагов замена тела `src/shared/ui/index.tsx` на
`export * from "@sber-orm/ui-kit"` должна пройти без правок продуктового кода
(кроме нативных кнопок-крестиков, которые можно оставить как есть).

---

## 6. Подтверждение сборки

`npx tsc --noEmit` — exit 0, ошибок нет.
