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
 * Внутри использует shadcn Dialog. Дополнительно ре-экспортирует Dialog*
 * для совместимости с существующими крупными модалками (CounterpartyModal,
 * AssessmentModal), где используется фиксированная вёрстка через
 * largeModalContentClass.
 */
export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onOpenChange, children }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
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

export const ModalHeader = DialogHeader;
export const ModalFooter = DialogFooter;
export const ModalTitle = DialogTitle;
export const ModalDescription = DialogDescription;
export const ModalTrigger = DialogTrigger;

// Совместимость: пока CounterpartyModal/AssessmentModal используют Dialog напрямую,
// re-export базовых dialog-примитивов остаётся, чтобы не ломать существующую вёрстку.
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};