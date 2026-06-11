# Вся документация компонентов UI-библиотеки @sber-orm/ui-kit

## Содержание

- [Базовые компоненты](#базовые-компоненты)
  - [Button](#button)
  - [Input](#input)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Text](#text)
  - [Title](#title)
  - [Link](#link)
  - [Icon](#icon)
  - [Grid (Row/Col)](#grid-rowcol)
  - [Tooltip](#tooltip)
  - [Badge](#badge)
  - [Loader](#loader)
- [Интерактивные компоненты](#интерактивные-компоненты)
  - [Modal](#modal)
  - [Switch](#switch)
  - [Radio](#radio)
  - [RadioChips](#radiochips)
  - [CheckboxChips](#checkboxchips)
  - [Chips](#chips)
  - [Toggle](#toggle)
- [Формы и поля ввода](#формы-и-поля-ввода)
  - [Textarea](#textarea)
  - [InputNumber](#inputnumber)
  - [MoneyInput](#moneyinput)
  - [InputMask](#inputmask)
  - [ComboBox](#combobox)
  - [FieldSelect](#fieldselect)
  - [FieldSearch](#fieldsearch)
- [Даты и время](#даты-и-время)
  - [DatePicker](#datepicker)
  - [DateRangePicker](#daterangepicker)
  - [MoneyRangeInput](#moneyrangeinput)
- [Отображение данных](#отображение-данных)
  - [BarChart](#barchart)
  - [LinearProgress](#linearprogress)
  - [InfoDisplay](#infodisplay)
  - [Level](#level)
  - [Shimmer](#shimmer)
- [Уведомления](#уведомления)
  - [Alert](#alert)
  - [Notice](#notice)
  - [Notification](#notification)
- [Навигация и списки](#навигация-и-списки)
  - [Accordion](#accordion)
  - [Popper/Popup](#popperpopup)
  - [Popover](#popover)
  - [ScrollBar](#scrollbar)
- [Работа с контентом](#работа-с-контентом)
  - [MarkdownViewer](#markdownviewer)
- [Вспомогательные компоненты](#вспомогательные-компоненты)
  - [Droplist](#droplist)
  - [FileUploader](#fileuploader)

---

## Базовые компоненты

### Button

Кнопка для выполнения действий.

**Импорт:**
```typescript
import { Button } from '@sber-orm/ui-kit';
```

**Пропсы:**
```typescript
interface IButtonProperties {
  // Вариант кнопки из дизайн системы
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'ghost' | 'ellipse' | 'function' | 'ai';
  
  // Показывает спиннер внутри кнопки поверх текста
  loading?: boolean;
  
  size?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL';
  iconOnly?: boolean;
  icon?: keyof typeof EIconName; // Иконка слева
  iconAfter?: keyof typeof EIconName; // Иконка справа
  children?: React.ReactNode;
  link?: boolean; // Визуально как ссылка
  
  // От v-uik/button (остаточные пропсы):
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  // ...другие пропсы от v-uik
}
```

**Примеры использования:**
```tsx
// Основная кнопка
<Button variant="primary" size="M">Нажмите</Button>

// Вторичная кнопка с иконкой
<Button variant="secondary" icon="search" size="S">
  Найти
</Button>

// Опасная кнопка
<Button variant="danger" loading>Удаление...</Button>

// Кнопка-ссылка
<Button variant="ghost" link onClick={handleClick}>Ссылка</Button>

// Иконка только
<Button variant="function" iconOnly icon="cross" />

// Кнопка для функциональной зоны
<Button variant="function" size="XXS">Действие</Button>
```

---

### Input

Однострочное текстовое поле ввода.

**Пропсы:**
```typescript
interface IInputProperties {
  label?: string; // Подпись сверху
  labelInside?: boolean; // Плейсхолдер внутри поля
  viewOnly?: boolean; // Режим только для просмотра
  readonly?: boolean; // Только для чтения
  size?: 'S' | 'M' | 'L' | 'XL';
  icon?: keyof typeof EIconName; // Иконка слева
  tooltip?: React.ReactNode; // Всплывающая подсказка
  isComplexPart?: boolean; // Для сложных полей
  noBorder?: boolean; // Без границы
  grayPrefix?: boolean; // Серый префикс
  
  // От v-uik/input:
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent, reason?: string) => void;
  placeholder?: string;
  error?: boolean; // Ошибка
  helperText?: string; // Текст помощи
  required?: boolean;
  disabled?: boolean;
}
```

**Примеры использования:**
```tsx
<Input
  label="Имя"
  placeholder="Введите имя"
  value={name}
  onChange={setName}
  error={!!error}
  helperText={error || 'Обязательное поле'}
/>

// С иконкой и подсказкой
<Input
  label="Email"
  icon="mail"
  tooltip="Введите корпоративный email"
  value={email}
  onChange={setEmail}
/>

// Режим только для просмотра
<Input
  label="ID"
  value="12345"
  viewOnly
  noBorder
/>
```

---

### Select

Выпадающий список для выбора одного или нескольких значений.

**Пропсы:**
```typescript
interface TSelectProperties extends Omit<ComboboxProps, 'size'> {
  labelInside?: boolean;
  tree?: boolean; // Использовать древовидную структуру
  treeProps?: Partial<TreeProps>;
  readonly?: boolean;
  size?: 'S' | 'M' | 'L' | 'XL';
  tooltip?: ReactNode;
  icon?: keyof typeof EIconName;
  isComplexPart?: boolean;
  showOptionValue?: boolean; // Показывать значение опции
  showOptionSearch?: boolean; // Показывать поиск внутри выпадающего списка
  showDroplistButtons?: boolean; // Кнопки внизу списка (Очистить/Применить)
  emptyOptionsText?: string;
  optionRenderLimit?: number; // Лимит отображаемых опций
  onListSubmit?: (value: Options<unknown>) => void;
  testId?: string;
  iconClassName?: string;
  hideChevron?: boolean; // Скрыть иконку выпадения
  showValueTooltip?: boolean;
  useCustomSearch?: boolean;
  useChips?: boolean; // Использовать chips для множественного выбора
  onChipRemove?: (value: string) => void;
  
  // Обязательные для работы:
  options?: Array<{ id?: string; key?: string; value?: string; label?: string; title?: string }>;
  value?: string | string[] | null;
  onChange?: (value: string | string[], event: ComboboxEvent, fullValue?: any, reason?: ComboboxChangeReason) => void;
}
```

**Примеры использования:**
```tsx
// Простой Select
<Select
  label="Выберите категорию"
  options={[
    { id: '1', label: 'Категория 1' },
    { id: '2', label: 'Категория 2' },
    { id: '3', label: 'Категория 3' },
  ]}
  value={selectedId}
  onChange={(value) => setSelectedId(value as string)}
/>

// Множественный выбор с chips
<Select
  label="Теги"
  options={tags}
  value={selectedTags}
  onChange={setSelectedTags}
  useChips
  multiple
  size="M"
/>

// С древовидной структурой
<Select
  label="Должность"
  tree
  options={departmentTree}
  value={selectedPosition}
  onChange={setSelectedPosition}
/>
```

---

### Checkbox

Флажок для выбора значения (вкл/выкл).

**Пропсы:**
```typescript
interface ICheckboxProperties extends VCheckboxProperties {
  error?: boolean;
  errorText?: string; // Текст ошибки
  readonly?: boolean;
  helperText?: string; // Текст помощи
  label?: string; // Подпись рядом с чекбоксом
  
  // От v-uik/checkbox:
  checked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent) => void;
  disabled?: boolean;
}
```

**Примеры использования:**
```tsx
<Checkbox
  label="Согласен с условиями"
  checked={agreed}
  onChange={(checked) => setAgreed(checked)}
  error={error}
  errorText={error ? 'Необходимо согласие' : ''}
  helperText="Прочитайте правила использования"
/>

// Режим readonly
<Checkbox
  label="Активный"
  checked={isActive}
  readonly
/>
```

---

### Text

Базовый компонент текста.

**Пропсы:**
```typescript
interface TTextProps {
  bold?: boolean; // Жирный текст
  className?: string;
  code?: boolean; // Моноширинный шрифт
  disabled?: boolean; // Серый текст
  link?: boolean; // Визуально как ссылка
  mb?: number; // Отступ снизу
  medium?: boolean; // Средняя жирность
  nowrap?: boolean; // Без переноса
  size?: 'sm' | 'md' | 'lg' | 'xlg'; // Размер текста
  tooltip?: boolean; // Показывать tooltip при переполнении
  uppercase?: boolean; // Верхний регистр
  wrap?: boolean; // Разрешить перенос
  white?: boolean; // Белый текст
  
  children: React.ReactNode;
}
```

**Примеры использования:**
```tsx
<Text size="sm">Мелкий текст</Text>
<Text size="md" bold>Жирный текст</Text>
<Text size="lg" code>Код: 123456</Text>
<Text size="md" disabled>Отключенный текст</Text>
<Text size="md" nowrap>Текст без переноса</Text>
```

---

### Title

Компонент заголовка.

**Пропсы:**
```typescript
interface TTitleProps {
  className?: string;
  mb?: number; // Отступ снизу
  size?: 'H200' | 'H300' | 'H400' | 'H500' | 'H600' | 'H700' | 'H800' | 'H900';
  thin?: boolean; // Тонкий шрифт
  uppercase?: boolean; // Верхний регистр
  nowrap?: boolean; // Без переноса
  white?: boolean; // Белый текст
  
  children: React.ReactNode;
}
```

**Примеры использования:**
```tsx
<Title size="H200">Очень большой заголовок</Title>
<Title size="H400">Заголовок статьи</Title>
<Title size="H600" thin>Мелкий заголовок</Title>
<Title size="H800" uppercase>Маркетинговый заголовок</Title>
```

---

### Link

Компонент ссылки.

**Пропсы:**
```typescript
interface TLinkProps {
  bold?: boolean;
  className?: string;
  mb?: number;
  size?: 'sm' | 'md' | 'lg' | 'xlg';
  uppercase?: boolean;
  
  children: React.ReactNode;
}
```

**Примеры использования:**
```tsx
<Link size="md" bold onClick={handleClick}>Перейти к разделу</Link>
<Link size="sm" href="https://example.com">Внешняя ссылка</Link>
```

---

### Icon

Иконка из набора EIconName.

**Пропсы:**
```typescript
interface TIconProperties {
  name: keyof typeof EIconName; // Имя иконки
  width?: number; // Ширина
  height?: number; // Высота
  stroke?: string; // Цвет обводки
  iconStyles?: React.CSSProperties;
  variant?: 'fill' | 'stroke'; // Заливка или обводка
  title?: string; // Текст внутри SVG
  inline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xlg';
  onClick?: (event: React.MouseEvent) => void;
  
  // Доп. пропсы HTMLDivElement
}
```

**Примеры использования:**
```tsx
<Icon name="search" width={24} height={24} />
<Icon name="check" variant="stroke" size="lg" />
<Icon name="errorRounded" width={16} height={16} />
<Icon name="close" width={20} height={20} onClick={handleClose} />
```

---

### Grid (Row/Col)

Сеточная система для верстки.

**Row пропсы:**
```typescript
interface TRowProps {
  align?: 'top' | 'middle' | 'bottom' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'around' | 'between' | 'stretch';
  direction?: 'row' | 'column';
  mb?: number; // Отступ снизу
  wrap?: boolean;
  noFlex?: boolean;
  gutter?: number | [number] | [number, number] | [number, number, number] | [number, number, number, number];
  
  // Доп. пропсы HTMLDivElement
}
```

**Col пропсы:**
```typescript
interface TColProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  // Доп. пропсы HTMLDivElement
}
```

**Примеры использования:**
```tsx
<Row gutter={16} align="middle" justify="between">
  <Col span={6}>
    <Input label="Имя" />
  </Col>
  <Col span={6}>
    <Input label="Email" />
  </Col>
</Row>

<Row direction="column" gutter={8}>
  <Title size="H400">Заголовок</Title>
  <Text>Описание</Text>
</Row>

<Row gutter={[16, 8]} wrap>
  {items.map(item => (
    <Col span={4} key={item.id}>
      <Card>{item.title}</Card>
    </Col>
  ))}
</Row>
```

---

### Tooltip

Всплывающая подсказка.

**Пропсы:**
```typescript
interface ITooltipProps extends Omit<VTooltipProps, 'content'> {
  canShow?: boolean; // Можно ли показать
  placement?: Placement; // Позиция: 'top' | 'bottom' | 'left' | 'right' и др.
  content?: ReactNode | ReactNode[]; // Контент подсказки
  fallbackPlacements?: Placement[]; // Альтернативные позиции
}
```

**Примеры использования:**
```tsx
<Tooltip content="Справка по полю">
  <Icon name="infoOutlined" width={16} height={16} />
</Tooltip>

<Tooltip 
  content="Это длинная подсказка" 
  placement="top-end"
  fallbackPlacements={['left-start']}
>
  <span>?</span>
</Tooltip>

// Условное отображение
<Tooltip canShow={showHelp} content={helpText}>
  <Icon name="info" />
</Tooltip>
```

---

### Badge

Маленькая цветная вставочка.

**Пропсы:**
```typescript
interface IBadgeProps {
  mb?: number;
  size?: 'xxs' | 'xxxs';
  variant?: keyof typeof EComponentColors;
  thin?: boolean;
  
  children: React.ReactNode;
}
```

**Примеры использования:**
```tsx
<Badge variant="gray">Новое</Badge>
<Badge variant="yellow">Важно</Badge>
<Badge size="xxs" thin={true}>123</Badge>
<Badge variant="blue">{count}</Badge>
```

---

### Loader

Спиннер загрузки.

**Пропсы:**
```typescript
interface ILoaderProps {
  color?: string; // Цвет спина
  size?: number; // Размер в пикселях
  absolute?: boolean; // Абсолютное позиционирование
  classes?: {
    container?: string;
    spinner?: string;
  };
}
```

**Примеры использования:**
```tsx
<Loader size={56} color="#1976d2" />
<Loader size={32} absolute />
<Loader className="custom-loader" />
```

---

## Интерактивные компоненты

### Modal

Модальное окно.

**Пропсы:**
```typescript
// Modal - базовые пропсы
interface VModalProperties {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  // ...другие пропсы от v-uik/modal
}

// ModalHeader
interface VModalHeaderProperties {
  title?: ReactNode;
  closeButtonProps?: object;
  // ...другие
}

// ModalBody
interface VModalBodyProperties {
  children?: React.ReactNode;
}

// ModalFooter
interface IModalFooterProperties extends VModalFooterProperties {
  noBorder?: boolean; // Без бордера сверху
}
```

**Примеры использования:**
```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@sber-orm/ui-kit';

<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader title="Подтверждение" />
  <ModalBody>
    <Text>Вы уверены, что хотите продолжить?</Text>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
    <Button variant="primary" onClick={handleConfirm}>Подтвердить</Button>
  </ModalFooter>
</Modal>
```

---

### Switch

Переключатель (вкл/выкл).

**Пропсы:**
```typescript
interface ISwitchProps extends VSwitchProps {
  label?: string; // Подпись
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  error?: boolean;
  readonly?: boolean;
  helperText?: string;
  required?: boolean;
  tooltip?: ReactNode | ReactNode[];
}
```

**Примеры использования:**
```tsx
<Switch
  label="Включить уведомления"
  checked={notificationsEnabled}
  onChange={(checked) => setNotificationsEnabled(checked)}
  error={error}
  helperText={error ? 'Ошибка' : 'Включить получение уведомлений'}
/>

// С размещением подписи
<Switch
  label="Активно"
  labelPlacement="start"
  checked={isActive}
  onChange={setActive}
/>
```

---

### Radio

Радио-кнопка для выбора одного значения из группы.

**Пропсы:**
```typescript
interface IRadioProps extends VRadioProps {
  label?: string; // Подпись
  helperText?: string;
  error?: boolean;
}

// RadioGroup
interface VRadioGroupProps {
  name?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent) => void;
  children?: React.ReactNode;
}
```

**Примеры использования:**
```tsx
<VRadioGroup value={selected} onChange={setSelected}>
  <Radio value="option1" label="Вариант 1" />
  <Radio value="option2" label="Вариант 2" />
  <Radio value="option3" label="Вариант 3" error={error} />
</VRadioGroup>

// С индивидуальными пропсами
<Radio
  value="custom"
  label="Другое"
  helperText="Выбрать другой вариант"
  checked={selected === 'custom'}
  onChange={(e) => setSelected('custom')}
/>
```

---

### RadioChips

Радио-кнопки в виде чипсов.

**Пропсы:**
```typescript
interface IRadioChipsProps {
  value?: string;
  items: {
    title: React.ReactNode;
    id: string;
    count?: number; // Количество в чипсе
  }[];
  kind?: 'primary' | 'secondary' | 'outline';
  onChange?: (id: string, event: FormEvent) => void;
  color?: TTagColor;
  wrap?: boolean;
  error?: boolean;
  required?: boolean;
  labelBold?: boolean;
  label?: string;
  helperText?: string;
  readonly?: boolean;
  testId?: string;
  fullWidth?: boolean;
}
```

**Примеры использования:**
```tsx
<RadioChips
  label="Выберите приоритет"
  value={priority}
  onChange={setPriority}
  items={[
    { id: 'low', title: 'Низкий' },
    { id: 'medium', title: 'Средний' },
    { id: 'high', title: 'Высокий' },
    { id: 'critical', title: 'Критичный' },
  ]}
  kind="primary"
  color="blue"
/>

// С тегами и счетчиками
<RadioChips
  label="Категории"
  value={category}
  onChange={setCategory}
  items={[
    { id: 'all', title: 'Все', count: 123 },
    { id: 'active', title: 'Активные', count: 45 },
    { id: 'archived', title: 'Архивные', count: 78 },
  ]}
  fullWidth
/>
```

---

### CheckboxChips

Чекбоксы в виде чипсов для множественного выбора.

**Пропсы:**
```typescript
interface ICheckboxChipsProps {
  disabled?: boolean;
  value: string[]; // Массив выбранных ID
  items: {
    title: React.ReactNode;
    counter?: number; // Количество
    color?: EComponentColors;
    id: string;
  }[];
  kind?: 'primary' | 'secondary' | 'outline';
  wrap?: boolean;
  onChange?: (value: string[], event: FormEvent) => void;
  error?: boolean;
  labelBold?: boolean;
  inline?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  readonly?: boolean;
  testId?: string;
}
```

**Примеры использования:**
```tsx
<CheckboxChips
  label="Фильтры"
  value={filters}
  onChange={setFilters}
  items={[
    { id: 'new', title: 'Новые', color: 'blue' },
    { id: 'updated', title: 'Обновленные', color: 'green' },
    { id: 'archived', title: 'Архивные', color: 'gray' },
  ]}
  kind="primary"
/>

// С счетчиками
<CheckboxChips
  label="Теги"
  value={selectedTags}
  onChange={setSelectedTags}
  items={[
    { id: 'urgent', title: 'Срочные', counter: 5 },
    { id: 'pending', title: 'Ожидающие', counter: 12 },
    { id: 'completed', title: 'Завершенные', counter: 89 },
  ]}
  wrap
/>
```

---

### Chips

Чипс для отображения выбранного значения.

**Пропсы:**
```typescript
interface IChipsProps {
  disabled?: boolean;
  item: {
    title: React.ReactNode;
    id: string;
    count?: number; // Количество внутри чипса
  };
  selected?: boolean;
  onChange?: (id: string, event: FormEvent) => void;
  onRemove?: (id: string, event: FormEvent) => void;
  variant?: 'fill' | 'outline';
  size?: 'XXS' | 'XS' | 'S';
  fullWidth?: boolean;
  testId?: string;
  nowrap?: boolean;
}
```

**Примеры использования:**
```tsx
<Chips
  item={{ id: 'tag1', title: 'Тег 1' }}
  variant="fill"
  size="XXS"
  onChange={handleChange}
  onRemove={handleRemove}
/>

// С количеством
<Chips
  item={{ id: 'category', title: 'Категория', count: 12 }}
  variant="outline"
  size="XS"
  onChange={handleChange}
/>

// Disabled
<Chips
  item={{ id: 'disabled', title: 'Нельзя изменить' }}
  disabled
  variant="fill"
/>
```

---

## Формы и поля ввода

### Textarea

Многострочное поле ввода.

**Пропсы:**
```typescript
interface ITextareaProperties {
  canClear?: boolean; // Кнопка очистки
  labelInside?: boolean;
  maxLength?: number; // Максимальная длина
  readonly?: boolean;
  tooltip?: ReactNode | ReactNode[];
  size?: 'S' | 'M' | 'L' | 'XL';
  resize?: 'none' | 'horizontal' | 'vertical';
  viewOnly?: boolean;
  
  // От v-uik/textarea:
  value?: string;
  onChange?: (value: string, event: ChangeEvent) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  fullWidth?: boolean;
}
```

**Примеры использования:**
```tsx
<Textarea
  label="Комментарий"
  placeholder="Введите комментарий..."
  value={comment}
  onChange={setComment}
  maxLength={500}
  resize="vertical"
  canClear
  helperText={`${comment.length}/500`}
/>

// Режим только для просмотра
<Textarea
  label="Описание"
  value={description}
  viewOnly
  rows={3}
  labelInside
/>
```

---

### InputNumber

Поле ввода для чисел с кнопками +/-.

**Пропсы:**
```typescript
interface IInputNumberProperties {
  label?: string;
  labelInside?: boolean;
  viewOnly?: boolean;
  readonly?: boolean;
  noArrows?: boolean; // Без стрелок изменения
  size?: 'S' | 'M' | 'L' | 'XL';
  icon?: keyof typeof EIconName;
  tooltip?: ReactNode | ReactNode[];
  value?: number | null;
  onChange?: (value: number | null, event: any, reason?: string) => void;
  
  // От v-uik/input-number:
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  // ...другие пропсы
}
```

**Примеры использования:**
```tsx
<InputNumber
  label="Количество"
  value={count}
  onChange={setCount}
  placeholder="0"
  size="M"
  noArrows={false}
/>

// С иконкой
<InputNumber
  label="Сумма"
  icon="ruble"
  value={amount}
  onChange={setAmount}
  tooltip="Введите сумму в рублях"
/>

// Режим только для просмотра
<InputNumber
  label="ID товара"
  value={12345}
  viewOnly
  noArrows
  labelInside
/>
```

---

### MoneyInput

Поле ввода для денежных значений.

**Пропсы:**
```typescript
interface TMoneyInputProperties {
  label?: string;
  labelInside?: boolean;
  labelBold?: boolean;
  value?: number | null;
  size?: TInputNumberSizes;
  onChange?: (value: number | null, event: any, reason?: string) => void;
  viewOnly?: boolean;
  readonly?: boolean;
  tooltip?: ReactNode | ReactNode[];
  
  // От v-uik/input-number:
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Примеры использования:**
```tsx
<MoneyInput
  label="Сумма заказа"
  value={amount}
  onChange={setAmount}
  labelBold
  tooltip="Укажите сумму в рублях"
/>

// Режим только для просмотра
<MoneyInput
  label="Итого"
  value={total}
  viewOnly
  labelInside
/>
```

---

### InputMask

Поле ввода с маской.

**Пропсы:**
```typescript
interface IMaskedInputProps extends IInputProps {
  maskOptions: FactoryOpts; // Настройки маски из imask
  clearIncomplete?: boolean; // Очищать неполные значения
}

interface IInputProps {
  onChange?: (value: any, unmaskedValue?: any) => void;
  
  // От Input
  value?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  // ...другие
}
```

**Примеры использования:**
```tsx
<InputMask
  label="Телефон"
  value={phone}
  onChange={setPhone}
  maskOptions={{
    mask: '+{7} (000) 000-00-00',
  }}
  placeholder="+7 (999) 000-00-00"
/>

// Дата
<InputMask
  label="Дата"
  value={date}
  onChange={setDate}
  maskOptions={{
    mask: Date,
    min: new Date(1900, 0, 1),
    max: new Date(),
  }}
  placeholder="дд.мм.гг"
  clearIncomplete
/>
```

---

### ComboBox

Поиск с автодополнением (alias для Select с isSearchable).

**Пропсы:**
```typescript
// Тот же TSelectProperties, но с isSearchable: true и clearInputOnBlur: true
interface TSelectProperties {
  // ...все пропсы Select
  isSearchable?: boolean; // Поиск
  clearInputOnBlur?: boolean; // Очистка при потере фокуса
}
```

**Примеры использования:**
```tsx
<ComboBox
  label="Поиск пользователя"
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  isSearchable
  showOptionSearch
  placeholder="Введите имя..."
  showValueTooltip
/>

// С кастомным поиском
<ComboBox
  label="Поиск"
  options={[]}
  value={searchValue}
  onChange={setSearchValue}
  isSearchable
  useCustomSearch
  onInputChange={handleSearch} // Кастомный обработчик
/>
```

---

### FieldSelect

Поле с инпутом и выпадающим списком.

**Пропсы:**
```typescript
interface IFieldSelectProperties extends IInputProperties {
  scopeProps: TSelectProperties; // Пропсы для выпадающего списка
  search?: {
    value?: string;
    scope?: unknown;
  };
  handleChange?: (value: string, scope: unknown) => void;
  grayIcon?: boolean;
  icon?: EIconName;
}
```

**Примеры использования:**
```tsx
<FieldSelect
  label="Поиск по полям"
  scopeProps={{
    options: [
      { id: 'name', label: 'Имя' },
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Телефон' },
    ],
    value: searchScope,
    onChange: setSearchScope,
  }}
  search={{
    value: searchValue,
    scope: searchScope,
  }}
  handleChange={handleSearch}
  grayIcon
  icon="search"
/>
```

---

### FieldSearch

Поле поиска с выпадающим списком областей поиска.

**Пропсы:**
```typescript
interface IFieldSearchProperties extends Omit<IFieldSelectProperties, 'icon' | 'scopeProps'> {
  scopeProps?: TSelectProperties;
}
```

**Примеры использования:**
```tsx
<FieldSearch
  label="Глобальный поиск"
  search={{
    value: query,
    scope: scope,
  }}
  handleChange={handleSearch}
  scopeProps={{
    options: [
      { id: 'all', label: 'Везде' },
      { id: 'users', label: 'Пользователи' },
      { id: 'orders', label: 'Заказы' },
    ],
    value: scope,
    onChange: setScope,
  }}
/>

// Без выпадающего списка
<FieldSearch
  label="Поиск"
  value={query}
  onChange={(value) => setSearch(value)}
  icon="search"
/>
```

---

## Даты и время

### DatePicker

Поле выбора даты.

**Пропсы:**
```typescript
export type TDatePickerSize = 'S' | 'M' | 'L' | 'XL';

interface IDatePickerProperties {
  value: dayjs.Dayjs | null; // Значение (dayjs)
  disabled?: boolean;
  viewOnly?: boolean; // Режим только для просмотра
  label?: string;
  fullWidth?: boolean;
  readonly?: boolean;
  labelInside?: boolean;
  withoutIcon?: boolean; // Без иконки календаря
  tooltip?: ReactNode | ReactNode[];
  size?: TDatePickerSize;
  showErrorIcon?: boolean;
  testId?: string;
  
  // От v-uik/date-picker:
  onChange?: (value: dayjs.Dayjs | null) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  open?: boolean; // Открыт ли календарь
}
```

**Примеры использования:**
```tsx
<DatePicker
  label="Дата рождения"
  value={dateOfBirth}
  onChange={setDateOfBirth}
  placeholder="дд.мм.гггг"
  size="M"
  labelInside
  error={error}
  helperText={error ? 'Неверная дата' : ''}
/>

// Режим только для просмотра
<DatePicker
  label="Дата создания"
  value={createdAt}
  viewOnly
  labelInside
  withoutIcon
/>

// С tooltips
<DatePicker
  label="Дата события"
  value={eventDate}
  onChange={setEventDate}
  tooltip="Укажите дату события"
  size="L"
/>
```

---

### DateRangePicker

Поле выбора диапазона дат.

**Пропсы:**
```typescript
interface IRangePickerProperties {
  value: [Date | dayjs.Dayjs | null, Date | dayjs.Dayjs | null];
  disabled?: boolean;
  startLabel?: string; // Подпись для начальной даты
  endLabel?: string; // Подпись для конечной даты
  loading?: boolean;
  viewOnly?: boolean;
  readonly?: boolean;
  size?: TDatePickerSize;
  labelInside?: boolean;
  withoutIcon?: boolean;
  tooltip?: ReactNode | ReactNode[];
  testId?: string;
  endRequired?: boolean; // Конечная дата обязательна
  
  // От v-uik/date-picker:
  onChange?: (value: [dayjs.Dayjs, dayjs.Dayjs]) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  open?: boolean;
}
```

**Примеры использования:**
```tsx
<DateRangePicker
  startLabel="С"
  endLabel="По"
  value={[startDate, endDate]}
  onChange={setDateRange}
  labelInside
  tooltip="Выберите диапазон дат"
  size="XL"
/>

// Режим только для просмотра
<DateRangePicker
  startLabel="Период"
  endLabel=""
  value={[startDate, endDate]}
  viewOnly
  labelInside
/>
```

---

### MoneyRangeInput

Поле ввода диапазона денежных значений.

**Пропсы:**
```typescript
interface TMoneyRangeInputProperties {
  label?: string;
  labelBold?: boolean;
  value?: [number | null | undefined, number | null | undefined];
  onChange?: (value: [number | null | undefined, number | null | undefined]) => void;
  readonly?: boolean;
  size?: TComponentSizes;
  
  // От v-uik/input-number:
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Примеры использования:**
```tsx
<MoneyRangeInput
  label="Диапазон сумм"
  value={[minAmount, maxAmount]}
  onChange={setAmountRange}
  labelBold
  size="M"
  placeholder="от" // для первого поля
  // Второе поле автоматически получает "до"
/>

// Режим только для просмотра
<MoneyRangeInput
  label="Зарплатная вилка"
  value={[50000, 80000]}
  viewOnly
  labelInside
  labelBold
/>
```

---

## Отображение данных

### BarChart

Круговая диаграмма прогресса.

**Пропсы:**
```typescript
interface IBarChartProperties {
  percents: number; // Проценты (0-100 или больше для >100%)
  withoutLimit?: boolean; // Без ограничения 100%
  size?: number; // Размер в пикселях
  withoutAnimation?: boolean; // Без анимации
}
```

**Примеры использования:**
```tsx
// Прогресс 50%
<BarChart percents={50} size={92} />

// Без ограничения (показывает большие значения)
<BarChart percents={150} withoutLimit size={120} />

// Без анимации
<BarChart percents={75} withoutAnimation size={64} />

// Стилизация
<BarChart 
  percents={95} 
  size={80} 
  className="custom-chart" 
/>
```

---

### LinearProgress

Линейный прогресс-бар.

**Пропсы:**
```typescript
export enum EProgressVariant {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  violet = 'violet',
}

interface ILinearProgressProps {
  variant?: keyof typeof EProgressVariant;
  filled?: boolean; // Заполненный стиль
  
  // От v-uik/progress:
  value?: number;
  determinate?: boolean;
  classes?: object;
}
```

**Примеры использования:**
```tsx
// Успешный прогресс
<LinearProgress variant="success" value={75} />

// Предупреждение
<LinearProgress variant="warning" value={50} />

// Ошибка
<LinearProgress variant="danger" value={100} />

// Фиолетовый
<LinearProgress variant="violet" value={30} />

// Заполненный стиль
<LinearProgress variant="success" value={90} filled />
```

---

### InfoDisplay

Отображение пары "значение-описание".

**Пропсы:**
```typescript
interface IInfoDisplayProperties {
  title: string | React.ReactElement; // Заголовок/значение
  prefix?: React.ReactElement; // Префикс (иконка/символ)
  suffix?: React.ReactElement; // Суффикс
  description?: string | React.ReactElement; // Описание
  inverse?: boolean; // Инвертированный стиль
}
```

**Примеры использования:**
```tsx
<InfoDisplay
  title="Статус заказа"
  description="Заказ отправлен"
  prefix={<Icon name="truck" />}
  suffix={<Badge variant="green">Активно</Badge>}
/>

// Инвертированный стиль
<InfoDisplay
  title="Сумма"
  description="123 456 руб."
  prefix={<Icon name="ruble" />}
  inverse
/>

// С сложным содержимым
<InfoDisplay
  title={<Title size="H400">Название</Title>}
  description={<Text code>Код: 123456</Text>}
/>
```

---

### Level

Оценка уровня значимости.

**Пропсы:**
```typescript
export enum ELevelState {
  default = 'default',
  low = 'low',
  medium = 'medium',
  high = 'high',
  critical = 'critical',
}

export type TLevelSize = 'sm' | 'md';

interface ILevelProps {
  withBadge?: boolean; // С бейджем
  iconRight?: boolean; // Иконка справа
  t?: (key: string) => string; // Функция перевода
  size?: TLevelSize;
  state?: keyof typeof ELevelState | string;
  icon?: keyof typeof EIconName;
  variant?: keyof typeof EComponentColors;
  text?: string; // Текст вместо перевода
  
  // Доп. пропсы HTMLDivElement
}
```

**Примеры использования:**
```tsx
<Level state="low" text="Низкий" />
<Level state="medium" withBadge />
<Level state="high" iconRight withBadge />
<Level state="critical" variant="red" withBadge size="md" />

// С кастомным текстом
<Level
  state="medium"
  text="Средний приоритет"
  withBadge
  variant="yellow"
/>
```

---

### Shimmer

Shimmer-заглушка для загрузки.

**Пропсы:**
```typescript
interface IShimmerProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  size?: 14 | 16 | 20 | 24 | 28 | 32 | 40;
  animation?: boolean; // Анимация
}
```

**Примеры использования:**
```tsx
// Линейная заглушка
<Shimmer width={200} height={20} />

// Квадратная
<Shimmer width={50} height={50} borderRadius={8} />

// Стандартный размер
<Shimmer size={24} />

// Без анимации
<Shimmer size={20} animation={false} />

// Текстовая заглушка
<div>
  <Shimmer width={150} height={16} mb={8} />
  <Shimmer width={200} height={12} mb={4} />
  <Shimmer width={180} height={12} />
</div>
```

---

## Уведомления

### Alert

Уведомление с различными статусами.

**Пропсы:**
```typescript
export enum EAlertStatus {
  success = 'success',
  danger = 'danger',
  error = 'error',
  info = 'info',
  warning = 'warning',
  discovery = 'discovery',
  ai = 'ai',
}

type TAlertAction = Omit<IButtonProperties, 'variant'> & {
  title?: string;
};

interface IAlertProperties {
  status: TAlertStatus;
  title?: string;
  actions?: TAlertAction[]; // Кнопки действия
  message?: string | JSX.Element;
  mb?: number; // Отступ снизу
  onClose?(event?: React.MouseEvent): void; // Обработчик закрытия
  id?: string;
  isOpen?: boolean;
}
```

**Примеры использования:**
```tsx
// Информационное
<Alert
  status="info"
  title="Информация"
  message="Новая информация доступна"
/>

// Успешное
<Alert
  status="success"
  title="Успешно"
  message="Действие выполнено"
/>

// Предупреждение
<Alert
  status="warning"
  title="Внимание"
  message="Внимание: действие может повлиять на систему"
  actions={[
    { title: 'Продолжить', onClick: handleConfirm },
    { title: 'Отмена', onClick: handleCancel },
  ]}
  onClose={handleClose}
/>

// Ошибка
<Alert
  status="error"
  title="Ошибка"
  message="Произошла ошибка при сохранении"
/>
```

---

### Notice

Разворачивающееся уведомление.

**Пропсы:**
```typescript
interface INoticeProps {
  title: React.ReactNode; // Заголовок
  description?: string; // Описание (скрыто по умолчанию)
  opened?: boolean; // Открыто по умолчанию
  iconName?: EIconName; // Иконка (по умолчанию: 'assistantGradient')
}
```

**Примеры использования:**
```tsx
<Notice
  title="Новое правило"
  description="Добавлено новое правило фильтрации. Вы можете изменить его в настройках."
  opened={false}
  iconName="infoRounded"
/>

// Кастомная иконка
<Notice
  title="Обновление"
  description="Доступно обновление системы"
  iconName="update"
/>

// С развернутым содержимым
<Notice
  title="Важное объявление"
  description={<Text code>Описание с кодом</Text>}
  opened
/>
```

---

### Notification

Системные уведомления (тосты).

**Пропсы:**
```typescript
export type TNotificationType =
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'discovery'
  | 'assistant';

interface INotificationOptions {
  type: TNotificationType;
  title?: string;
  actions?: ReactNode;
  id?: string;
}

// Использование:
notification(content?: string, options?: INotificationOptions)
```

**Примеры использования:**
```tsx
// Простое уведомление
notification('Действие выполнено успешно');

// С заголовком
notification('Данные сохранены', {
  title: 'Успех',
  type: 'success',
});

// С кнопками действий
notification('Вы уверены?', {
  title: 'Подтверждение',
  type: 'warning',
  actions: (
    <>
      <Button variant="function" onClick={handleConfirm}>Да</Button>
      <Button variant="function" onClick={handleCancel}>Нет</Button>
    </>
  ),
});

// Типы уведомлений
notification('Ошибка при загрузке', { type: 'error' });
notification('Новое сообщение', { type: 'assistant' });
notification('Обнаружена проблема', { type: 'discovery' });
```

---

## Навигация и списки

### Accordion

Аккордеон для группировки контента.

**Пропсы:**
```typescript
interface IAccordionProps extends VAccordionProps {
  fullWidth?: boolean; // На всю ширину
  variant?: 'view' | 'edit'; // Вид: view или edit
}

interface IAccordionItemProps {
  onChange?: (expanded: boolean) => void;
  
  // От v-uik/accordion:
  header?: ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}
```

**Примеры использования:**
```tsx
<Accordion fullWidth variant="view">
  <AccordionItem
    header="Общая информация"
    expanded
  >
    <Text>Общая информация о пользователе</Text>
  </AccordionItem>
  
  <AccordionItem
    header="Контакты"
    onChange={handleExpand}
  >
    <Text>Контактная информация</Text>
  </AccordionItem>
  
  <AccordionItem
    header="Настройки"
    disabled
  >
    <Text>Настройки доступны после активации</Text>
  </AccordionItem>
</Accordion>

// В режиме редактирования
<Accordion variant="edit">
  <AccordionItem header="Раздел 1">Контент 1</AccordionItem>
  <AccordionItem header="Раздел 2">Контент 2</AccordionItem>
</Accordion>
```

---

### Popper/Popup

Базовый компонент для попапов (обертка v-uik/popup).

**Пропсы:**
```typescript
// Exports from @v-uik/popup
// Пропсы аналогичны v-uik/popup
interface PopupProps {
  anchor?: HTMLElement | null;
  open?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  // ...другие
}
```

**Примеры использования:**
```tsx
// Используется внутри Popover и других компонентов
// Обычно не используется напрямую
```

---

### Popover

Поповер с заголовком и текстом.

**Пропсы:**
```typescript
interface IPopoverProps extends PopupProps {
  withArrow?: boolean; // Стрелка
  offset?: number;
  fallbackPlacements?: Placement[];
  title?: string;
  text?: string;
  onClose?: () => void;
}
```

**Примеры использования:**
```tsx
const [anchor, setAnchor] = useState<HTMLElement | null>(null);

<Button onClick={(e) => setAnchor(e.currentTarget)}>
  Показать поповер
</Button>

<Popover
  anchor={anchor}
  open={!!anchor}
  onClose={() => setAnchor(null)}
  title="Заголовок"
  text="Текст подсказки"
  withArrow
  placement="top"
  offset={10}
>

// С кастомным содержимым
<Popover
  anchor={anchor}
  open={!!anchor}
  onClose={() => setAnchor(null)}
  title="Действия"
>
  <Button variant="function" onClick={handleAction1}>Действие 1</Button>
  <Button variant="function" onClick={handleAction2}>Действие 2</Button>
</Popover>
```

---

### ScrollBar

Кастомный скроллбар на базе simplebar.

**Пропсы:**
```typescript
export type TScrollBarProps = SimpleBarProps;
// Пропсы от simplebar-react
```

**Примеры использования:**
```tsx
<ScrollBar autoHide>
  <div>
    <p>Контент с длинным списком...</p>
    {/* Много контента */}
  </div>
</ScrollBar>

// Всегда показывать скроллбар
<ScrollBar autoHide={false}>
  <List />
</ScrollBar>

// Кастомный класс
<ScrollBar className="custom-scrollbar">
  <Content />
</ScrollBar>
```

---

## Работа с контентом

### MarkdownViewer

Отображение Markdown-контента.

**Пропсы:**
```typescript
interface IMarkdownViewerProps {
  markdown?: string; // Markdown-строка
  customOptions?: MarkdownToJSX.Options; // Кастомные опции markdown-to-jsx
}
```

**Примеры использования:**
```tsx
<MarkdownViewer
  markdown="# Заголовок\n\n**Жирный текст** и *курсив*."
/>

// С кастомными опциями
<MarkdownViewer
  markdown={description}
  customOptions={{
    wrapper: ({ children }) => <div className="md-content">{children}</div>,
    overrides: {
      h1: { props: { className: 'md-h1' } },
      p: { props: { className: 'md-p' } },
    },
  }}
/>
```

---

## Вспомогательные компоненты

### Droplist

Внутренний компонент для отображения списка опций в Select/ComboBox.

**Пропсы:**
```typescript
export type TDropListProps = Partial<OptionListProps<unknown, 'ul', 'li'>> & {
  showOptionValue?: boolean;
  showOptionSearch?: boolean;
  showDroplistButtons?: boolean;
  useCustomSearch?: boolean;
  optionRenderLimit?: number;
  onSubmit?: (value: Options<unknown>) => void;
  onSearch?: (value: string) => void;
  tree?: boolean;
  treeProps?: Partial<TreeProps>;
  onFirstRender?: () => void;
  testId?: string;
};
```

**Примеры использования:**
```tsx
// Используется внутри Select
// Обычно не используется напрямую
```

---

### FileUploader

Загрузчик файлов.

**Примечание:** Этот компонент находится в отдельной директории `components/FileUploader/` и содержит вложенные компоненты:
- Dropzone (для Drag & Drop)
- FileItem (один файл)

**Пропсы:** Требуется изучение исходного кода в `FileUploader/`

**Примеры использования:**
```tsx
// Требует полного изучения компонента
```

---

## Общие типы

### TComponentSizes

Размеры компонентов:
```typescript
type TComponentSizes = 'S' | 'M' | 'L' | 'XL';
```

### EComponentColors

Цвета компонентов:
```typescript
enum EComponentColors {
  gray = 'gray',
  outlined = 'outlined',
  // ...другие цвета
}
```

### EIconName

Имена иконок (всего 700+ иконок):
```typescript
// Категории:
// - arrows/ - Стрелки
// - currency/ - Валюта
// - fileType/ - Типы файлов
// - filter/ - Фильтры
// - interface/ - Интерфейс
// - loader/ - Загрузка
// - menu/ - Меню
// - priority/ - Приоритеты
// - status/ - Статусы
```

---

## Источники документации

Для подробного описания пропсов, которые проксируются от `@v-uik/*` компонентов, обращайтесь к документации UI Kit Platform V:
http://kit.cmp.sbc.space/v-uik/

---

**Версия:** 0.266.0  
**Автор:** Dmitry Kozlov  
**Год создания:** 2026
