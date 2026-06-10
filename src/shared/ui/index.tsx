/**
 * Единая точка входа UI.
 *
 * Все продуктовые/доменные компоненты импортируют UI ТОЛЬКО отсюда:
 *   import { Button, Input, Modal } from "@/shared/ui";
 *
 * Внутри пока используются локальные адаптеры поверх shadcn/radix.
 * Контракт API соответствует @sber-orm/ui-kit (ALL_COMPONENTS.md).
 *
 * После установки пакета — переключение делается через sber-switch.ts.
 */

// import * as SberUiKit from "@sber-orm/ui-kit"; // включить после `npm i @sber-orm/ui-kit`

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./Button";
export { Input, type InputProps } from "./Input";
export {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
  // legacy совместимость
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Modal";

// --- остальные адаптеры (passthrough к shadcn с совместимым API) ---
export { Checkbox } from "@/components/ui/checkbox";
export { Textarea } from "@/components/ui/textarea";
export {
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
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export { Skeleton as Loader } from "@/components/ui/skeleton";
export { Skeleton } from "@/components/ui/skeleton";
export { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export { Toaster as Sonner, Toaster } from "@/components/ui/sonner";

// --- статические helpers с прокси к ALL_COMPONENTS.md API ---
import * as React from "react";
import { cn } from "@/lib/utils";

export const Text: React.FC<React.HTMLAttributes<HTMLSpanElement> & { size?: "XS" | "S" | "M" | "L" }> = ({
  size = "M",
  className,
  ...rest
}) => {
  const sizes = { XS: "text-xs", S: "text-sm", M: "text-base", L: "text-lg" } as const;
  return <span className={cn(sizes[size], className)} {...rest} />;
};

export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 }> = ({
  level = 2,
  className,
  ...rest
}) => {
  const sizes = {
    1: "text-3xl font-semibold tracking-tight",
    2: "text-2xl font-semibold tracking-tight",
    3: "text-xl font-semibold",
    4: "text-base font-semibold",
  } as const;
  return React.createElement(`h${level}`, { className: cn(sizes[level], className), ...rest });
};

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, ...rest }) => (
  <a className={cn("text-primary underline-offset-4 hover:underline", className)} {...rest} />
);

export const Icon: React.FC<{ children: React.ReactNode; size?: number; className?: string }> = ({
  children,
  size = 16,
  className,
}) => (
  <span style={{ width: size, height: size }} className={cn("inline-flex items-center justify-center", className)}>
    {children}
  </span>
);

export const Row: React.FC<React.HTMLAttributes<HTMLDivElement> & { gap?: number }> = ({
  gap = 8,
  style,
  className,
  ...rest
}) => <div className={cn("flex flex-row items-center", className)} style={{ gap, ...style }} {...rest} />;

export const Col: React.FC<React.HTMLAttributes<HTMLDivElement> & { gap?: number }> = ({
  gap = 8,
  style,
  className,
  ...rest
}) => <div className={cn("flex flex-col", className)} style={{ gap, ...style }} {...rest} />;

type ChipProps = {
  value: string;
  label: React.ReactNode;
  selected?: boolean;
  onSelect?: (value: string) => void;
};
export const Chips: React.FC<{ items: ChipProps[]; className?: string }> = ({ items, className }) => (
  <div className={cn("flex flex-wrap gap-2", className)}>
    {items.map((it) => (
      <button
        key={it.value}
        type="button"
        onClick={() => it.onSelect?.(it.value)}
        className={cn(
          "rounded-full border px-3 py-1 text-xs transition",
          it.selected
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-background text-muted-foreground hover:bg-muted",
        )}
      >
        {it.label}
      </button>
    ))}
  </div>
);

export const RadioChips: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: React.ReactNode }[];
  className?: string;
}> = ({ value, onChange, options, className }) => (
  <Chips
    className={className}
    items={options.map((o) => ({
      ...o,
      selected: o.value === value,
      onSelect: (v) => onChange?.(v),
    }))}
  />
);

export const CheckboxChips: React.FC<{
  value?: string[];
  onChange?: (v: string[]) => void;
  options: { value: string; label: React.ReactNode }[];
  className?: string;
}> = ({ value = [], onChange, options, className }) => (
  <Chips
    className={className}
    items={options.map((o) => ({
      ...o,
      selected: value.includes(o.value),
      onSelect: (v) =>
        onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]),
    }))}
  />
);