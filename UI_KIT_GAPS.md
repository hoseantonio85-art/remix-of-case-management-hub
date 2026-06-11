# UI-kit gaps found in prototype

## Product component candidates

Смысловые продуктовые компоненты — не относятся к базовому ui-kit, должны жить в product-kit.

| Component | Зачем | Из чего собрать (ui-kit primitives) | Перенести в product-kit? |
|---|---|---|---|
| CounterpartyStatusBadge | Брендированный статус контрагента | `Badge` (color, size) | Да |
| RiskCard / RiskDrawer | Доменное представление рисков | `Modal`, `Row/Col`, `Title`, `Text`, `Chips`, `Button`, `Icon` | Да |
| ResolutionCard | Карточка резолюции | `Row/Col`, `Title`, `Text`, `Button`, `Icon` | Да |
| AssistantSummaryCard / AssistantBanner | AI-summary с источниками | `Row/Col`, `Title`, `Text`, `Icon`, `Button` | Да |
| EvidenceList / SourceQuote (AssessmentModal) | Раскрытие обоснования AI | `Row`, `Text`, `Link`, `Icon` | Да |
| DebtSummaryCard / DebtProcessDrawer / DebtStepper | Доменный stepper исков | `Row/Col`, `Title`, `Text`, `Icon`, `Chips`, `Modal` | Да |
| KeyAnomaliesWidget / TrustFactorsWidget | Виджеты доверия и аномалий | `Row/Col`, `Title`, `Text`, `Icon`, `Chips` | Да |
| RegistrationInfoWidget / Drawer | Реквизиты контрагента | `Row/Col`, `Text`, `Icon` | Да |
| AssessmentSummary / AssessmentHistoryDrawer | История оценок и timeline | `Row/Col`, `Text`, `Title`, `Icon`, `Button` | Да |
| NormAssistantIcon | Брендовая иконка ассистента | `Icon` + gradient wrapper | Да |

## Prototype-only components

| Component | Где используется | Почему prototype-only | Что делать при production-переносе |
|---|---|---|---|
| InModalDrawer | CounterpartyModal, AssessmentModal | Имитация drawer внутри модалки для демо UX; в проде вероятнее full-page drawer/router | Заменить на стандартный `Drawer` или вынести в product-kit |
| Index.tsx (демо-страница) | / | Демо-обёртка вокруг доменной модалки | Не переносить целиком, использовать как playground |
| Mock data в `src/lib/*` | повсеместно | Только для прототипа | Заменить на API-слой |
| ProcessFilterDrawer (в текущей реализации на `Sheet`) | Index | Текущая композиция через shadcn Sheet — временная | После миграции — `Drawer` из ui-kit |

## No-ui-kit analogs

| Pattern | Risk | Временное решение | Решение для переноса |
|---|---|---|---|
| InModalDrawer | medium | Локальный компонент | Product-kit |
| Donut/charts (`recharts`) | low | `recharts` | Отдельный chart-kit; ui-kit не покрывает |
| Custom timeline (история оценок) | medium | Локальная разметка | Product-kit |
| Source popover (AI-обоснование) | medium | Локально | Product-kit |
| Drawer (внутримодальный) | medium | InModalDrawer | Расширение ui-kit или product-kit |
| Notice/Notification (toast inline) | low | `Alert` shadcn | Дождаться `Notice` из ui-kit |
| Loader (spinner) | low | `Skeleton` | Заменить на спиннер из ui-kit |

## Components that should be added to ui-kit or product-kit

- **ui-kit candidates**: `Drawer` (полноразмерный и in-modal), `Radio` (single), `Notice`, `Notification`, `Loader` (spinner), `Tag` (как лёгкая альтернатива `Chips`), `Avatar` (если появится), `Stepper`.
- **product-kit candidates**: `CounterpartyStatusBadge`, `RiskCard`, `AssistantSummaryCard`, `EvidenceList`, `SourceQuote`, `DebtStepper`, `KeyAnomaliesWidget`, `TrustFactorsWidget`, `ResolutionCard`, `NormAssistantIcon`.

## Components that can stay as local composition

- Заголовки модалок (`ModalHeader` + `Title` + `Text`).
- Карточки секций внутри модалки — `Row/Col + Title + Text + Icon`.
- Inline-фильтры через `RadioChips`/`CheckboxChips`.
- Формы редактирования — `Input` + `Textarea` + `Button` + `Row/Col`.
- Header-блок контрагента — композиция `Title/Text/Badge/Icon`.
