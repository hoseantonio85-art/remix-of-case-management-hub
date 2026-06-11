/**
 * @/shared/ui — единая точка входа для UI прототипа.
 *
 * Источник истины: реальный пакет @sber-orm/ui-kit (prebuilt 0.283.0,
 * подключён через alias в vite.config.ts → packages/ui-kit/dist).
 *
 * Сюда же сведены тонкие legacy-обёртки для того, что в kit пока отсутствует
 * или имеет несовместимую сигнатуру с текущими доменными вызовами:
 *   - Dialog/DialogContent — большие модалки на largeModalContentClass
 *     (1320×100dvh), kit Modal не покрывает фикс-шелл.
 *   - Sheet/SheetContent — правый drawer (нет аналога в kit).
 *   - Checkbox — домен использует Radix `onCheckedChange`, kit ждёт нативный
 *     onChange. Refactor — отдельной задачей.
 *   - Textarea — домен использует event-first `onChange`, kit — value-first.
 *   - Toaster — kit предоставляет императивный notification, App.tsx
 *     монтирует sonner.
 *
 * Прямые импорты `lucide-react` и `@/components/ui/*` в продуктовом коде
 * запрещены — всё идёт через этот файл или напрямую `@sber-orm/ui-kit`.
 */

// Глобальные стили kit (бандл CSS, шрифты SBSans, токены).
import "@sber-orm/ui-kit/index.css";

// Полный re-export всех компонентов, хуков, иконок и типов kit-а.
// Named-overrides ниже перекрывают star-export для конфликтующих имён.
export * from "@sber-orm/ui-kit";

// legacy-adapter — Checkbox с Radix-сигнатурой (`onCheckedChange`).
export { Checkbox } from "@/components/ui/checkbox";

// legacy-adapter — Textarea с event-first `onChange`.
export { Textarea } from "@/components/ui/textarea";

// legacy-adapter — фикс-шелл больших модалок (CounterpartyModal, AssessmentModal).
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// legacy-adapter — правый Sheet (ProcessFilterDrawer).
export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

// legacy-adapter — Sonner-тостер (App.tsx).
export { Toaster } from "sonner";