import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InModalDrawer } from "./InModalDrawer";
import {
  type AssessmentGroup,
  type AssessmentCriterion,
  groupCounts,
  toneStyles,
} from "@/lib/assessment-data";
import { AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";

export function AssessmentGroupDrawer({
  group,
  open,
  onOpenChange,
}: {
  group: AssessmentGroup | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!group) return null;
  const counts = groupCounts(group);
  const t = toneStyles[group.tone];
  const detected = group.criteria.filter((c) => c.status === "detected");
  const review = group.criteria.filter((c) => c.status === "review");
  const clear = group.criteria.filter((c) => c.status === "clear");

  const defaultOpen: string[] = [];
  if (detected.length) defaultOpen.push("detected");
  if (review.length) defaultOpen.push("review");

  return (
    <InModalDrawer open={open} onOpenChange={onOpenChange}>
      <div className="border-b border-border px-6 pt-6 pb-4">
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Группа критериев
        </div>
        <h3 className="mt-1 pr-8 text-lg font-semibold text-foreground">{group.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{group.description}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Stat label="Всего" value={group.total} />
          <Stat
            label={group.id === "positive" ? "Подтверждено" : "Выявлено"}
            value={counts.detected}
            tone={counts.detected > 0 ? t.iconText : undefined}
          />
          <Stat
            label={group.id === "positive" ? "Не подтверждено" : "Без замечаний"}
            value={group.id === "positive" ? counts.review + counts.clear : counts.clear}
          />
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        <Accordion type="multiple" defaultValue={defaultOpen} className="space-y-2">
          {detected.length > 0 && (
            <Section
              value="detected"
              title={group.id === "positive" ? "Подтверждены" : "Выявлены"}
              count={detected.length}
              icon={<AlertTriangle className="h-3.5 w-3.5 text-rose-600" />}
              items={detected}
            />
          )}
          {review.length > 0 && (
            <Section
              value="review"
              title="Требуют проверки"
              count={review.length}
              icon={<HelpCircle className="h-3.5 w-3.5 text-slate-500" />}
              items={review}
            />
          )}
          {clear.length > 0 && (
            <Section
              value="clear"
              title="Без замечаний"
              count={clear.length}
              icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
              items={clear}
            />
          )}
        </Accordion>
      </div>
    </InModalDrawer>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-base font-semibold ${tone ?? "text-foreground"}`}>{value}</div>
    </div>
  );
}

function Section({
  value,
  title,
  count,
  icon,
  items,
}: {
  value: string;
  title: string;
  count: number;
  icon: React.ReactNode;
  items: AssessmentCriterion[];
}) {
  return (
    <AccordionItem value={value} className="overflow-hidden rounded-xl border border-border bg-white px-3">
      <AccordionTrigger className="py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {count}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-3 pt-0">
        {items.map((c) => (
          <CriterionRow key={c.number} c={c} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function CriterionRow({ c }: { c: AssessmentCriterion }) {
  const statusMeta: Record<AssessmentCriterion["status"], { label: string; cls: string }> = {
    detected: { label: "Выявлен", cls: "bg-rose-50 text-rose-700" },
    review: { label: "Требует проверки", cls: "bg-slate-100 text-slate-700" },
    clear: { label: "Без замечаний", cls: "bg-emerald-50 text-emerald-700" },
  };
  const m = statusMeta[c.status];
  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <div className="flex items-start gap-3">
        <div className="text-[11px] font-medium text-muted-foreground">{c.number}.</div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium leading-snug text-foreground">{c.title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${m.cls}`}>
              {m.label}
            </span>
            {c.source && (
              <span className="text-[11px] text-muted-foreground">Источник: {c.source}</span>
            )}
          </div>
          {c.comment && (
            <div className="mt-1.5 text-xs text-muted-foreground">{c.comment}</div>
          )}
        </div>
      </div>
    </div>
  );
}
