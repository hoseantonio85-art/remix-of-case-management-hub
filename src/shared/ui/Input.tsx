import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resolveIcon, type IconName } from "./icon-registry";

/**
 * Адаптер Input под контракт @sber-orm/ui-kit (ALL_COMPONENTS.md → Input).
 *
 * Контракт:
 *  - size: 'S' | 'M' | 'L' | 'XL'
 *  - icon: keyof typeof EIconName (имя иконки строкой)
 *  - onChange: (value: string, event: ChangeEvent, reason?: string) => void
 *  - error: boolean (текст ошибки передаётся через helperText)
 *  - viewOnly / readonly / label / labelInside / noBorder / tooltip / required
 */
export type InputSize = "S" | "M" | "L" | "XL";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  size?: InputSize;
  viewOnly?: boolean;
  labelInside?: boolean;
  noBorder?: boolean;
  tooltip?: React.ReactNode;
  icon?: IconName;
  /** alias of readOnly to match ALL_COMPONENTS.md */
  readonly?: boolean;
  /** TODO: partial-compatible with @sber-orm/ui-kit
   *  migration-note: isComplexPart visual treatment is not implemented. */
  isComplexPart?: boolean;
  /** TODO: partial-compatible — grayPrefix slot not rendered. */
  grayPrefix?: boolean;
  required?: boolean;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>, reason?: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, helperText, error, size = "M", viewOnly, labelInside, noBorder, tooltip, icon, className,
      readOnly, readonly, isComplexPart: _isComplexPart, grayPrefix: _grayPrefix, required,
      onChange, placeholder, ...rest },
    ref,
  ) => {
    const isErr = Boolean(error);
    const isReadOnly = readOnly || readonly;
    const IconCmp = icon ? resolveIcon(icon) : null;
    if (viewOnly) {
      return (
        <div className={cn("text-sm", className)}>
          {label && <div className="mb-1 text-xs text-muted-foreground">{label}</div>}
          <div className="text-foreground">{(rest.value as React.ReactNode) ?? "—"}</div>
          {helperText && <div className="mt-1 text-xs text-muted-foreground">{helperText}</div>}
        </div>
      );
    }
    return (
      <label className={cn("block", className)}>
        {label && !labelInside && (
          <div className="mb-1 text-xs text-muted-foreground">
            {label}{required && <span className="text-destructive"> *</span>}
          </div>
        )}
        <div className="relative">
          {IconCmp && (
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <IconCmp className="h-4 w-4" />
            </span>
          )}
          <ShadcnInput
            ref={ref}
            readOnly={isReadOnly}
            placeholder={labelInside && typeof label === "string" ? label : placeholder}
            aria-invalid={isErr || undefined}
            onChange={(e) => onChange?.(e.target.value, e)}
            className={cn(
              IconCmp && "pl-8",
              noBorder && "border-0 shadow-none",
              isErr && "border-destructive focus-visible:ring-destructive",
            )}
            {...rest}
          />
        </div>
        {helperText && (
          <div className={cn("mt-1 text-xs", isErr ? "text-destructive" : "text-muted-foreground")}>
            {helperText}
          </div>
        )}
        {tooltip && <div className="sr-only">{tooltip}</div>}
      </label>
    );
  },
);
Input.displayName = "Input";