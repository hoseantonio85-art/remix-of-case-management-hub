// migration-note: This meta module stores LucideIcon components as values
// used by product widgets. After @sber-orm/ui-kit migration, replace with IconName
// strings rendered via the Icon adapter from @/shared/ui.

import { AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";

export type AssessmentCountKind = "risk" | "clear" | "no_data";

export const assessmentCountMeta: Record<
  AssessmentCountKind,
  {
    label: string;
    icon: typeof AlertTriangle;
    bg: string;
    icon_color: string;
    num: string;
  }
> = {
  risk: {
    label: "Выявлены риски",
    icon: AlertTriangle,
    bg: "bg-rose-50",
    icon_color: "text-rose-500",
    num: "text-rose-700",
  },
  clear: {
    label: "Без нарушений",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    icon_color: "text-emerald-600",
    num: "text-emerald-700",
  },
  no_data: {
    label: "Нет данных",
    icon: MinusCircle,
    bg: "bg-slate-100",
    icon_color: "text-slate-500",
    num: "text-slate-600",
  },
};