/**
 * local.tsx — локальные адаптеры поверх shadcn/radix.
 *
 * Здесь живут компоненты, чьё API приведено к контракту @sber-orm/ui-kit
 * (см. ALL_COMPONENTS.md), но реализация пока локальная.
 *
 * Сейчас все адаптеры физически определены в ./index.tsx, ./Button.tsx,
 * ./Input.tsx, ./Modal.tsx — этот файл реэкспортирует их, чтобы зафиксировать
 * слой "local" в архитектуре staged migration.
 */

export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from "./Button";
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
} from "./Modal";
export {
  Text,
  Title,
  Link,
  Icon,
  Row,
  Col,
  Chips,
  RadioChips,
  CheckboxChips,
  Select,
  Radio,
  type IconName,
} from "./index";