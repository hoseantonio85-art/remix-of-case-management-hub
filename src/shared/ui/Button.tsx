import * as React from "react";
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Адаптер кнопки под контракт @sber-orm/ui-kit.
 * Поддерживает sber-варианты (primary/secondary/...) и устаревшие shadcn
 * (default/outline/ghost/...). После перехода на пакет — заменить на re-export.
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
  | "ai"
  // legacy shadcn passthroughs (временно поддержаны для совместимости)
  | "default"
  | "destructive"
  | "outline"
  | "link";

export type ButtonSize = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  iconOnly?: React.ReactNode;
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
  default: "default",
  destructive: "destructive",
  outline: "outline",
  link: "link",
};

const sizeMap: Record<string, ShadcnButtonProps["size"]> = {
  XXS: "sm",
  XS: "sm",
  S: "sm",
  M: "default",
  L: "lg",
  XL: "lg",
  default: "default",
  sm: "sm",
  lg: "lg",
  icon: "icon",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "M", loading, icon, iconAfter, iconOnly, className, children, disabled, ...rest }, ref) => {
    const mappedVariant = variantMap[variant] ?? "default";
    const mappedSize = iconOnly ? "icon" : sizeMap[size] ?? "default";
    const isWarning = variant === "warning";
    const isAi = variant === "ai";
    return (
      <ShadcnButton
        ref={ref}
        variant={mappedVariant}
        size={mappedSize}
        disabled={disabled || loading}
        className={cn(
          isWarning && "bg-amber-400 text-amber-950 hover:bg-amber-400/90",
          isAi && "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:opacity-95",
          className,
        )}
        {...rest}
      >
        {iconOnly ?? (
          <>
            {icon}
            {children}
            {iconAfter}
          </>
        )}
      </ShadcnButton>
    );
  },
);
Button.displayName = "Button";