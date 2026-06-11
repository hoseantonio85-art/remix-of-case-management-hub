import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Адаптер Modal под контракт @sber-orm/ui-kit.
 * Внутри использует shadcn Dialog. Контракт API:
 *   Modal:        open / onClose / onOpenChange / children
 *   ModalHeader:  title / closeButtonProps / children
 *   ModalBody:    children
 *   ModalFooter:  noBorder / children
 *
 * Закрытие по overlay и Escape — стандартное поведение shadcn Dialog
 * (onOpenChange(false) → onClose()).
 */
export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onOpenChange, children }) => (
  <Dialog
    open={open}
    onOpenChange={(o) => {
      onOpenChange?.(o);
      if (!o) onClose?.();
    }}
  >
    {children}
  </Dialog>
);

export const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { className?: string }
>(({ className, ...rest }, ref) => (
  <DialogContent ref={ref as never} className={cn(className)} {...rest} />
));
ModalBody.displayName = "ModalBody";

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  /** TODO: partial-compatible with @sber-orm/ui-kit
   *  migration-note: closeButtonProps received but pass-through only; close button
   *  itself is rendered by shadcn DialogContent. */
  closeButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  closeButtonProps: _closeButtonProps,
  children,
  className,
  ...rest
}) => (
  <DialogHeader className={className} {...rest}>
    {title ? <DialogTitle>{title}</DialogTitle> : null}
    {children}
  </DialogHeader>
);

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}
export const ModalFooter: React.FC<ModalFooterProps> = ({
  noBorder,
  className,
  ...rest
}) => (
  <DialogFooter
    className={cn(!noBorder && "border-t pt-3", className)}
    {...rest}
  />
);

export const ModalTitle = DialogTitle;
export const ModalDescription = DialogDescription;
export const ModalTrigger = DialogTrigger;

// legacy-adapter
// migration-note: Dialog is not part of ALL_COMPONENTS.md. Prefer Modal.
// Re-exported, чтобы не ломать CounterpartyModal/AssessmentModal/Index, где
// используется фиксированная вёрстка через largeModalContentClass.
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};