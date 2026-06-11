/**
 * Единая точка входа UI. Импорт UI в продуктовом коде — ТОЛЬКО отсюда.
 * Контракт API строго соответствует @sber-orm/ui-kit (см. ALL_COMPONENTS.md).
 * Внутри пока — локальные адаптеры поверх shadcn/radix/lucide.
 *
 * После подключения внутреннего registry и установки @sber-orm/ui-kit
 * локальные адаптеры можно будет постепенно заменить на:
 *   export * from "@sber-orm/ui-kit";
 * (см. также `./sber-switch.ts`).
 */

// import * as SberUiKit from "@sber-orm/ui-kit"; // включить после установки пакета

import * as React from "react";
import { cn } from "@/lib/utils";
import { resolveIcon, type IconName } from "./icon-registry";

// ============================================================================
// Re-exports — компоненты, у которых API адаптирован в отдельных файлах
// ============================================================================
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./Button";
export { Input, type InputProps, type InputSize } from "./Input";
export {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
  type ModalProps,
  type ModalHeaderProps,
  type ModalFooterProps,
  // legacy: TODO мигрировать на Modal
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Modal";

// Passthrough с совместимым API (минимальные правки на стороне продукта)
export { Checkbox } from "@/components/ui/checkbox";
export { Textarea } from "@/components/ui/textarea";
// legacy-adapter
// migration-note: Sheet/Drawer is not part of ALL_COMPONENTS.md. Requires product decision.
export {
  // legacy: TODO мигрировать Sheet → Drawer/Modal из ui-kit
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export { Badge } from "@/components/ui/badge";
export { Switch } from "@/components/ui/switch";
export { Label } from "@/components/ui/label";
export { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// Loader — TODO: partial-compatible. В ui-kit это спиннер, временно — Skeleton.
export { Skeleton as Loader } from "@/components/ui/skeleton";
export { Skeleton } from "@/components/ui/skeleton";
export { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Notice/Notification — TODO: partial-compatible. Маппим на Alert до появления ui-kit.
// migration-note: ui-kit предоставит выделенные компоненты.
export { Alert as Notice, Alert as Notification } from "@/components/ui/alert";
export { Toaster as Sonner, Toaster } from "@/components/ui/sonner";

// legacy-adapter
// migration-note: Radix-style Select composition is not compatible with ALL_COMPONENTS.md.
// Prefer unified Select with options/value/onChange.
export {
  Select as LegacySelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type { IconName };

// ============================================================================
// Text — ALL_COMPONENTS.md
// ============================================================================
export interface TextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "title"> {
  bold?: boolean;
  code?: boolean;
  disabled?: boolean;
  link?: boolean;
  mb?: number;
  medium?: boolean;
  nowrap?: boolean;
  size?: "sm" | "md" | "lg" | "xlg";
  tooltip?: boolean;
  uppercase?: boolean;
  wrap?: boolean;
  white?: boolean;
  children: React.ReactNode;
}
const TEXT_SIZE: Record<NonNullable<TextProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xlg: "text-lg",
};
export const Text: React.FC<TextProps> = ({
  bold,
  code,
  disabled,
  link,
  mb,
  medium,
  nowrap,
  size = "md",
  tooltip,
  uppercase,
  wrap,
  white,
  className,
  style,
  children,
  ...rest
}) => (
  <span
    title={tooltip && typeof children === "string" ? children : undefined}
    className={cn(
      TEXT_SIZE[size],
      bold && "font-semibold",
      medium && "font-medium",
      code && "font-mono",
      disabled && "text-muted-foreground",
      link && "text-primary underline-offset-4 hover:underline cursor-pointer",
      nowrap && "whitespace-nowrap truncate",
      wrap && "whitespace-normal break-words",
      uppercase && "uppercase",
      white && "text-white",
      className,
    )}
    style={{ marginBottom: mb, ...style }}
    {...rest}
  >
    {children}
  </span>
);

// ============================================================================
// Title — ALL_COMPONENTS.md (size: H200…H900)
// ============================================================================
export type TitleSize = "H200" | "H300" | "H400" | "H500" | "H600" | "H700" | "H800" | "H900";
export interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "title"> {
  size?: TitleSize;
  mb?: number;
  thin?: boolean;
  uppercase?: boolean;
  nowrap?: boolean;
  white?: boolean;
  children: React.ReactNode;
}
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const TITLE_STYLE: Record<TitleSize, { cls: string; tag: HeadingTag }> = {
  H200: { cls: "text-xs font-semibold", tag: "h6" },
  H300: { cls: "text-sm font-semibold", tag: "h6" },
  H400: { cls: "text-base font-semibold", tag: "h5" },
  H500: { cls: "text-lg font-semibold", tag: "h4" },
  H600: { cls: "text-xl font-semibold", tag: "h3" },
  H700: { cls: "text-2xl font-semibold tracking-tight", tag: "h2" },
  H800: { cls: "text-3xl font-bold tracking-tight", tag: "h1" },
  H900: { cls: "text-4xl font-bold tracking-tight", tag: "h1" },
};
export const Title: React.FC<TitleProps> = ({
  size = "H400",
  mb,
  thin,
  uppercase,
  nowrap,
  white,
  className,
  style,
  children,
  ...rest
}) => {
  const { cls, tag } = TITLE_STYLE[size];
  return React.createElement(
    tag,
    {
      className: cn(
        cls,
        thin && "font-light",
        uppercase && "uppercase",
        nowrap && "whitespace-nowrap truncate",
        white && "text-white",
        className,
      ),
      style: { marginBottom: mb, ...style },
      ...rest,
    },
    children,
  );
};

// ============================================================================
// Link — ALL_COMPONENTS.md
// ============================================================================
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bold?: boolean;
  mb?: number;
  size?: "sm" | "md" | "lg" | "xlg";
  uppercase?: boolean;
  children: React.ReactNode;
}
export const Link: React.FC<LinkProps> = ({
  bold,
  mb,
  size = "md",
  uppercase,
  className,
  style,
  children,
  ...rest
}) => (
  <a
    className={cn(
      TEXT_SIZE[size],
      "text-primary underline-offset-4 hover:underline cursor-pointer",
      bold && "font-semibold",
      uppercase && "uppercase",
      className,
    )}
    style={{ marginBottom: mb, ...style }}
    {...rest}
  >
    {children}
  </a>
);

// ============================================================================
// Icon — ALL_COMPONENTS.md (name + iconMap → lucide)
// ============================================================================
const ICON_SIZE_PX: Record<"sm" | "md" | "lg" | "xlg", number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xlg: 24,
};
export interface IconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  name: IconName;
  width?: number;
  height?: number;
  stroke?: string;
  iconStyles?: React.CSSProperties;
  variant?: "fill" | "stroke";
  title?: string;
  inline?: boolean;
  size?: "sm" | "md" | "lg" | "xlg";
  onClick?: (event: React.MouseEvent) => void;
}
export const Icon: React.FC<IconProps> = ({
  name,
  width,
  height,
  stroke,
  iconStyles,
  variant = "stroke",
  title,
  inline = true,
  size = "md",
  onClick,
  className,
  ...rest
}) => {
  const Cmp = resolveIcon(name);
  const px = width ?? height ?? ICON_SIZE_PX[size];
  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(inline ? "inline-flex" : "flex", "items-center justify-center", className)}
      style={{ cursor: onClick ? "pointer" : undefined }}
      {...rest}
    >
      {Cmp ? (
        <Cmp
          width={width ?? px}
          height={height ?? px}
          stroke={variant === "stroke" ? stroke ?? "currentColor" : undefined}
          fill={variant === "fill" ? stroke ?? "currentColor" : "none"}
          style={iconStyles}
        >
          {title ? <title>{title}</title> : null}
        </Cmp>
      ) : (
        <span style={{ width: px, height: px, display: "inline-block" }} />
      )}
    </div>
  );
};

// ============================================================================
// Grid: Row / Col — ALL_COMPONENTS.md
// ============================================================================
export interface RowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "align"> {
  align?: "top" | "middle" | "bottom" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "around" | "between" | "stretch";
  direction?: "row" | "column";
  mb?: number;
  wrap?: boolean;
  noFlex?: boolean;
  gutter?: number | [number] | [number, number] | [number, number, number] | [number, number, number, number];
}
const ALIGN_MAP = {
  top: "items-start",
  middle: "items-center",
  bottom: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
} as const;
const JUSTIFY_MAP = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  around: "justify-around",
  between: "justify-between",
  stretch: "justify-stretch",
} as const;
function gutterToGap(g?: RowProps["gutter"]): React.CSSProperties {
  if (g == null) return {};
  if (typeof g === "number") return { gap: g };
  const [x, y] = g as number[];
  return { columnGap: x, rowGap: y ?? x };
}
export const Row: React.FC<RowProps> = ({
  align,
  justify,
  direction = "row",
  mb,
  wrap,
  noFlex,
  gutter,
  className,
  style,
  ...rest
}) => (
  <div
    className={cn(
      !noFlex && "flex",
      direction === "column" ? "flex-col" : "flex-row",
      wrap && "flex-wrap",
      align && ALIGN_MAP[align],
      justify && JUSTIFY_MAP[justify],
      className,
    )}
    style={{ marginBottom: mb, ...gutterToGap(gutter), ...style }}
    {...rest}
  />
);

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
export const Col: React.FC<ColProps> = ({ span, className, style, ...rest }) => (
  <div
    className={className}
    style={{
      flex: span ? `0 0 ${(span / 12) * 100}%` : undefined,
      maxWidth: span ? `${(span / 12) * 100}%` : undefined,
      ...style,
    }}
    {...rest}
  />
);

// ============================================================================
// Chips / RadioChips / CheckboxChips — ALL_COMPONENTS.md
// ============================================================================
export type TTagColor = "blue" | "green" | "red" | "yellow" | "gray" | "purple";
export type ChipsKind = "primary" | "secondary" | "outline";
const COLOR_CLS: Record<TTagColor, { sel: string; unsel: string }> = {
  blue:   { sel: "bg-blue-100 text-blue-700 border-blue-300",     unsel: "border-blue-200 text-blue-700" },
  green:  { sel: "bg-green-100 text-green-700 border-green-300",  unsel: "border-green-200 text-green-700" },
  red:    { sel: "bg-red-100 text-red-700 border-red-300",        unsel: "border-red-200 text-red-700" },
  yellow: { sel: "bg-yellow-100 text-yellow-700 border-yellow-300", unsel: "border-yellow-200 text-yellow-700" },
  gray:   { sel: "bg-muted text-foreground border-border",        unsel: "border-border text-muted-foreground" },
  purple: { sel: "bg-purple-100 text-purple-700 border-purple-300", unsel: "border-purple-200 text-purple-700" },
};
function chipBase(kind: ChipsKind, color: TTagColor | undefined, selected: boolean, disabled?: boolean) {
  const c = color ? COLOR_CLS[color] : COLOR_CLS.gray;
  return cn(
    "rounded-full border px-3 py-1 text-xs transition inline-flex items-center gap-1",
    kind === "outline" && "bg-transparent",
    kind === "secondary" && "bg-muted",
    selected ? c.sel : c.unsel,
    !selected && kind === "primary" && "bg-background",
    disabled && "opacity-50 pointer-events-none",
  );
}

export interface ChipsItem {
  title: React.ReactNode;
  id: string;
  count?: number;
}
export interface IChipsProps {
  disabled?: boolean;
  item: ChipsItem;
  selected?: boolean;
  onChange?: (id: string, event: React.SyntheticEvent) => void;
  onRemove?: (id: string, event: React.SyntheticEvent) => void;
  variant?: "fill" | "outline";
  size?: "XXS" | "XS" | "S";
  fullWidth?: boolean;
  testId?: string;
  nowrap?: boolean;
}
export const Chips: React.FC<IChipsProps> = ({
  disabled,
  item,
  selected,
  onChange,
  onRemove,
  variant = "fill",
  fullWidth,
  testId,
  nowrap,
}) => (
  <button
    type="button"
    data-testid={testId}
    disabled={disabled}
    onClick={(e) => onChange?.(item.id, e)}
    className={cn(
      chipBase(variant === "outline" ? "outline" : "primary", "gray", !!selected, disabled),
      fullWidth && "w-full justify-center",
      nowrap && "whitespace-nowrap",
    )}
  >
    <span>{item.title}</span>
    {typeof item.count === "number" && (
      <span className="ml-1 rounded-full bg-black/5 px-1.5 text-[10px]">{item.count}</span>
    )}
    {onRemove && (
      <span
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id, e);
        }}
        className="ml-1 cursor-pointer text-muted-foreground hover:text-foreground"
      >
        ×
      </span>
    )}
  </button>
);

interface ChipsGroupItem {
  title: React.ReactNode;
  id: string;
  count?: number;
  counter?: number;
  color?: TTagColor;
}
function ChipsGroupLabel({
  label, required, labelBold, helperText, error,
}: { label?: string; required?: boolean; labelBold?: boolean; helperText?: string; error?: boolean }) {
  if (!label && !helperText) return null;
  return (
    <>
      {label && (
        <div className={cn("mb-1 text-xs text-muted-foreground", labelBold && "font-semibold")}>
          {label}{required && <span className="text-destructive"> *</span>}
        </div>
      )}
      {helperText && (
        <div className={cn("mt-1 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {helperText}
        </div>
      )}
    </>
  );
}

export interface IRadioChipsProps {
  value?: string;
  items: ChipsGroupItem[];
  kind?: ChipsKind;
  onChange?: (id: string, event: React.SyntheticEvent) => void;
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
export const RadioChips: React.FC<IRadioChipsProps> = ({
  value, items, kind = "primary", onChange, color = "gray",
  wrap = true, error, required, labelBold, label, helperText, readonly, testId, fullWidth,
}) => (
  <div data-testid={testId}>
    <ChipsGroupLabel label={label} required={required} labelBold={labelBold} />
    <div className={cn("flex gap-2", wrap ? "flex-wrap" : "flex-nowrap", fullWidth && "w-full")}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          disabled={readonly}
          onClick={(e) => !readonly && onChange?.(it.id, e)}
          className={cn(
            chipBase(kind, color, value === it.id, readonly),
            fullWidth && "flex-1 justify-center",
          )}
        >
          <span>{it.title}</span>
          {typeof it.count === "number" && (
            <span className="ml-1 rounded-full bg-black/5 px-1.5 text-[10px]">{it.count}</span>
          )}
        </button>
      ))}
    </div>
    <ChipsGroupLabel helperText={helperText} error={error} />
  </div>
);

export interface ICheckboxChipsProps {
  disabled?: boolean;
  value: string[];
  items: ChipsGroupItem[];
  kind?: ChipsKind;
  wrap?: boolean;
  onChange?: (value: string[], event: React.SyntheticEvent) => void;
  error?: boolean;
  labelBold?: boolean;
  inline?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  readonly?: boolean;
  testId?: string;
}
export const CheckboxChips: React.FC<ICheckboxChipsProps> = ({
  disabled, value, items, kind = "primary", wrap = true, onChange,
  error, labelBold, inline, required, label, helperText, readonly, testId,
}) => {
  const locked = disabled || readonly;
  return (
    <div data-testid={testId} className={cn(inline && "inline-block")}>
      <ChipsGroupLabel label={label} required={required} labelBold={labelBold} />
      <div className={cn("flex gap-2", wrap ? "flex-wrap" : "flex-nowrap")}>
        {items.map((it) => {
          const selected = value.includes(it.id);
          const next = selected ? value.filter((v) => v !== it.id) : [...value, it.id];
          return (
            <button
              key={it.id}
              type="button"
              disabled={locked}
              onClick={(e) => !locked && onChange?.(next, e)}
              className={chipBase(kind, it.color ?? "gray", selected, locked)}
            >
              <span>{it.title}</span>
              {typeof it.counter === "number" && (
                <span className="ml-1 rounded-full bg-black/5 px-1.5 text-[10px]">{it.counter}</span>
              )}
            </button>
          );
        })}
      </div>
      <ChipsGroupLabel helperText={helperText} error={error} />
    </div>
  );
};

// ============================================================================
// Select — новый адаптер с API из ALL_COMPONENTS.md (options/value/onChange).
// Минимальная реализация поверх radix-Select. tree / showOptionSearch /
// showDroplistButtons / useChips — приняты в типах, базовая работа без них.
// TODO(@sber-orm/ui-kit): полная реализация tree/multiple/chips придёт из пакета.
// ============================================================================
import {
  Select as RxSelect,
  SelectContent as RxContent,
  SelectItem as RxItem,
  SelectTrigger as RxTrigger,
  SelectValue as RxValue,
} from "@/components/ui/select";

export interface SelectOption {
  id?: string;
  key?: string;
  value?: string;
  label?: string;
  title?: string;
}
export type SelectChangeReason = "selectOption" | "clear" | "blur";
export interface SelectProps {
  options?: SelectOption[];
  value?: string | string[] | null;
  onChange?: (
    value: string | string[],
    event: React.SyntheticEvent | null,
    fullValue?: SelectOption | SelectOption[],
    reason?: SelectChangeReason,
  ) => void;
  label?: string;
  labelInside?: boolean;
  placeholder?: string;
  tree?: boolean;
  readonly?: boolean;
  size?: "S" | "M" | "L" | "XL";
  tooltip?: React.ReactNode;
  icon?: IconName;
  isComplexPart?: boolean;
  showOptionValue?: boolean;
  showOptionSearch?: boolean;
  showDroplistButtons?: boolean;
  emptyOptionsText?: string;
  optionRenderLimit?: number;
  hideChevron?: boolean;
  useCustomSearch?: boolean;
  useChips?: boolean;
  multiple?: boolean;
  onChipRemove?: (value: string) => void;
  testId?: string;
  className?: string;
  iconClassName?: string;
}
function optKey(o: SelectOption) {
  return (o.id ?? o.key ?? o.value ?? o.label ?? o.title ?? "") as string;
}
function optLabel(o: SelectOption) {
  return o.label ?? o.title ?? o.value ?? o.id ?? "";
}
export const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  onChange,
  label,
  labelInside,
  placeholder,
  readonly,
  multiple,
  useChips,
  onChipRemove,
  disabled,
  error,
  helperText,
  className,
  testId,
  emptyOptionsText = "Нет вариантов",
}) => {
  // TODO: partial-compatible with @sber-orm/ui-kit
  // migration-note: tree / showOptionSearch / showDroplistButtons / useCustomSearch
  // ещё не реализованы — типы приняты, ждём пакет.
  const locked = readonly || disabled;
  const arr = Array.isArray(value) ? value : value != null ? [value] : [];
  const current = arr[0] ?? "";
  const handleSelect = (v: string) => {
    if (multiple) {
      const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      const fulls = options.filter((o) => next.includes(optKey(o)));
      onChange?.(next, null, fulls, "selectOption");
    } else {
      const full = options.find((o) => optKey(o) === v);
      onChange?.(v, null, full, "selectOption");
    }
  };
  const removeChip = (v: string) => {
    onChipRemove?.(v);
    const next = arr.filter((x) => x !== v);
    const fulls = options.filter((o) => next.includes(optKey(o)));
    onChange?.(next, null, fulls, "clear");
  };
  return (
    <div className={className} data-testid={testId}>
      {label && !labelInside && (
        <div className="mb-1 text-xs text-muted-foreground">{label}</div>
      )}
      {useChips && arr.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-1">
          {arr.map((v) => {
            const o = options.find((x) => optKey(x) === v);
            return (
              <span key={v} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {o ? optLabel(o) : v}
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => removeChip(v)}
                  aria-label="Удалить"
                >×</button>
              </span>
            );
          })}
        </div>
      )}
      <RxSelect
        value={current}
        onValueChange={handleSelect}
        disabled={locked}
      >
        <RxTrigger>
          <RxValue placeholder={placeholder ?? (labelInside ? label : undefined)} />
        </RxTrigger>
        <RxContent>
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-muted-foreground">{emptyOptionsText}</div>
          ) : (
            options.map((o) => (
              <RxItem key={optKey(o)} value={optKey(o)}>
                {optLabel(o)}
                {multiple && arr.includes(optKey(o)) ? " ✓" : ""}
              </RxItem>
            ))
          )}
        </RxContent>
      </RxSelect>
      {helperText && (
        <div className={cn("mt-1 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {helperText}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Radio — минимальный single-выбор адаптер (ALL_COMPONENTS.md).
// Для legacy совместимости RadioGroup/RadioGroupItem из radix остаются
// в re-exports выше.
// ============================================================================
export interface RadioItem {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
}
export interface RadioProps {
  items: RadioItem[];
  value?: string;
  onChange?: (id: string, event: React.SyntheticEvent) => void;
  name?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  inline?: boolean;
  testId?: string;
}
export const Radio: React.FC<RadioProps> = ({
  items, value, onChange, name, label, helperText, error, readonly, disabled, inline, testId,
}) => {
  const locked = readonly || disabled;
  return (
    <div data-testid={testId}>
      {label && <div className="mb-1 text-xs text-muted-foreground">{label}</div>}
      <div className={cn("flex gap-3", inline ? "flex-row" : "flex-col")}>
        {items.map((it) => (
          <label key={it.id} className={cn("inline-flex items-center gap-2 text-sm", (locked || it.disabled) && "opacity-50")}>
            <input
              type="radio"
              name={name}
              value={it.id}
              checked={value === it.id}
              disabled={locked || it.disabled}
              onChange={(e) => onChange?.(it.id, e)}
            />
            <span>{it.title}</span>
          </label>
        ))}
      </div>
      {helperText && (
        <div className={cn("mt-1 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {helperText}
        </div>
      )}
    </div>
  );
};