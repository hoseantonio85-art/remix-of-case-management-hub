/**
 * legacy-adapter
 * migration-note:
 * These exports are NOT part of @sber-orm/ui-kit.
 * They are kept temporarily to avoid breaking the prototype.
 * Product code should gradually migrate from Dialog/Sheet/legacy Select
 * to Modal, Select, or product-specific components.
 */

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export { Label } from "@/components/ui/label";
export { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";