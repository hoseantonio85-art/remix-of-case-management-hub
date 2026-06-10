import type { ComponentType, SVGProps } from "react";
import {
  Search,
  Check,
  X as Close,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Pencil,
  Trash2,
  Info,
  Settings,
  Filter,
  Calendar,
  Download,
  Upload,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/**
 * Имя иконки из @sber-orm/ui-kit (keyof typeof EIconName).
 * До установки пакета используем строковый алиас + локальный реестр (lucide).
 * Контракт: ALL_COMPONENTS.md → EIconName.
 */
export type IconName = string;

const registry: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  search: Search,
  check: Check,
  close: Close,
  errorRounded: AlertCircle,
  info: Info,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  plus: Plus,
  minus: Minus,
  edit: Pencil,
  trash: Trash2,
  settings: Settings,
  filter: Filter,
  calendar: Calendar,
  download: Download,
  upload: Upload,
  eye: Eye,
  eyeOff: EyeOff,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
};

export function resolveIcon(name: IconName): ComponentType<SVGProps<SVGSVGElement>> | null {
  return registry[name] ?? null;
}