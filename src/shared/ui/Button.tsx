import * as React from "react";
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveIcon, type IconName } from "./icon-registry";
import { Loader2 } from "lucide-react";

/**
 * Адаптер кнопки под контракт @sber-orm/ui-kit (см. ALL_COMPONENTS.md → Button).
 *
 * Контракт API:
 *  - variant: только sber-варианты (primary/secondary/tertiary/warning/danger/
 *             ghost/ellipse/function/ai).
 *  - size:    'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL'.
 *  - icon / iconAfter: имя иконки (keyof typeof EIconName / string-алиас).
 *  - iconOnly: boolean.
 *  - link:    визуально как ссылка.
 *
 * Legacy shadcn-варианты (default/outline/destructive/link/sm/lg/icon)
 * УБРАНЫ из публичного типа. После установки пакета — заменить на re-export.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "warning"
  | "danger"
  | "ghost"
  | "ellipse"
  | "function"
  | "ai";

export type ButtonSize = "XXS" | "XS" | "S" | "M" | "L" | "XL";

export interface ButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: IconName;
  iconAfter?: IconName;
  iconOnly?: boolean;
  link?: boolean;
}

const variantMap: Record<string, ShadcnButtonProps["variant"]> = {
  primary: "default",
  secondary: "outline",
  tertiary: "secondary",
  warning: "default",
  danger: "destructive",
  ghost: "ghost",
  ellipse: "secondary",
  function: "ghost",
  ai: "default",
};

const sizeMap: Record<string, ShadcnButtonProps["size"]> = {
  XXS: "sm",
  XS: "sm",
  S: "sm",
  M: "default",
  L: "lg",
  XL: "lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "M", loading, icon, iconAfter, iconOnly, link, className, children, disabled, ...rest },
    ref,
  ) => {
    const mappedVariant = variantMap[variant] ?? "default";
    const mappedSize: ShadcnButtonProps["size"] = iconOnly ? "icon" : sizeMap[size] ?? "default";
    const isWarning = variant === "warning";
    const isAi = variant === "ai";
    const isEllipse = variant === "ellipse";
    const isFunction = variant === "function";
    const IconLeft = icon ? resolveIcon(icon) : null;
    const IconRight = iconAfter ? resolveIcon(iconAfter) : null;
    return (
      <ShadcnButton
        ref={ref}
        variant={link ? "link" : mappedVariant}
        size={mappedSize}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          isWarning && "bg-amber-400 text-amber-950 hover:bg-amber-400/90",
          isAi && "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:opacity-95",
          isEllipse && "rounded-full",
          isFunction && "bg-transparent text-primary hover:bg-primary/10 hover:text-primary shadow-none",
          loading && "relative",
          className,
        )}
        {...rest}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : IconLeft ? <IconLeft className="h-4 w-4" /> : null}
        {!iconOnly && children}
        {IconRight ? <IconRight className="h-4 w-4" /> : null}
      </ShadcnButton>
    );
  },
);
Button.displayName = "Button";