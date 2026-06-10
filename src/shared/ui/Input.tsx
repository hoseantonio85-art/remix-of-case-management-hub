import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Адаптер Input под контракт @sber-orm/ui-kit.
 * Поддерживает label / helperText / error / icon / viewOnly / readonly.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean | string;
  size?: "XS" | "S" | "M" | "L";
  viewOnly?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, size = "M", viewOnly, icon, className, readOnly, ...rest }, ref) => {
    const errMsg = typeof error === "string" ? error : undefined;
    const isErr = Boolean(error);
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
        {label && <div className="mb-1 text-xs text-muted-foreground">{label}</div>}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </span>
          )}
          <ShadcnInput
            ref={ref}
            readOnly={readOnly}
            aria-invalid={isErr || undefined}
            className={cn(
              icon && "pl-8",
              isErr && "border-destructive focus-visible:ring-destructive",
            )}
            {...rest}
          />
        </div>
        {(errMsg || helperText) && (
          <div className={cn("mt-1 text-xs", isErr ? "text-destructive" : "text-muted-foreground")}>
            {errMsg ?? helperText}
          </div>
        )}
      </label>
    );
  },
);
Input.displayName = "Input";