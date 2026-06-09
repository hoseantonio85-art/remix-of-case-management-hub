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
  tagMeta,
  tagColorClass,
} from "@/lib/assessment-data";
import { assessmentCountMeta, type AssessmentCountKind } from "./assessment-count-meta";

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
  const attention = group.criteria.filter((c) => tagMeta[c.tag].category === "attention");
  const info = group.criteria.filter((c) => tagMeta[c.tag].category === "info");
  const clear = group.criteria.filter((c) => tagMeta[c.tag].category === "clear");

  const defaultOpen: string[] = [];
  if (attention.length) defaultOpen.push("attention");
  if (info.length) defaultOpen.push("info");
  if (!defaultOpen.length && clear.length) defaultOpen.push("clear");

  const totalCount = group.criteria.length;
  const metaParts = [
    `${totalCount} ${pluralCriteria(totalCount)}`,
    `${counts.attention} ${counts.attention === 1 ? "требует" : "требуют"} внимания`,
    `${counts.info} информационных`,
    `${counts.clear} без замечаний`,
  ];

  return (
    <InModalDrawer open={open} onOpenChange={onOpenChange}>
      {/* Header */}
      <div className="shrink-0 px-6 pt-6 pb-4">
        <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          Группа оценки
        </div>
        <h3 className="mt-1 pr-10 text-lg font-semibold leading-snug text-slate-900">
          {group.title}
        </h3>
        <div className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {metaParts.join(" · ")}
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryStat kind="attention" value={counts.attention} />
          <SummaryStat kind="info" value={counts.info} />
          <SummaryStat kind="clear" value={counts.clear} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
        <Accordion type="multiple" defaultValue={defaultOpen} className="space-y-3">
          <Section
            kind="attention"
            value="attention"
            count={attention.length}
            items={attention}
          />
          <Section
            kind="info"
            value="info"
            count={info.length}
            items={info}
          />
          <Section
            kind="clear"
            value="clear"
            count={clear.length}
            items={clear}
          />
        </Accordion>
      </div>
    </InModalDrawer>
  );
}

function pluralCriteria(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "критерий";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "критерия";
  return "критериев";
}

function SummaryStat({ kind, value }: { kind: AssessmentCountKind; value: number }) {
  const m = assessmentCountMeta[kind];
  const Ico = m.icon;
  return (
    <div className="flex min-h-[92px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${m.bg}`}>
          <Ico className={`h-4 w-4 ${m.icon_color}`} />
        </div>
        <div className="text-2xl font-semibold leading-none text-slate-900">{value}</div>
      </div>
      <div className="mt-3 text-xs leading-snug text-slate-500">{m.label}</div>
    </div>
  );
}

function Section({
  kind,
  value,
  count,
  items,
}: {
  kind: AssessmentCountKind;
  value: string;
  count: number;
  items: AssessmentCriterion[];
}) {
  const m = assessmentCountMeta[kind];
  const Ico = m.icon;
  return (
    <AccordionItem
      value={value}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>div>svg.chev]:rotate-180">
        <div className="flex w-full items-center gap-3">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.bg}`}>
            <Ico className={`h-3.5 w-3.5 ${m.icon_color}`} />
          </div>
          <span className="text-sm font-medium text-slate-900">{m.label}</span>
          <span className="ml-1 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600">
            {count}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-slate-100 px-0 pb-0 pt-0">
        {count === 0 ? (
          <div className="px-4 py-4 text-sm text-slate-400">
            Нет критериев в этой категории
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((c) => (
              <CriterionRow key={c.number} c={c} />
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function CriterionRow({ c }: { c: AssessmentCriterion }) {
  const color = tagMeta[c.tag].color;
  return (
    <div className="px-4 py-3.5">
      <div className="flex items-start gap-3">
        <div className="w-5 shrink-0 text-[11px] font-medium leading-[1.4] text-slate-400">
          {c.number}.
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium leading-[1.4] text-slate-900">{c.title}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex h-7 items-center whitespace-nowrap rounded-full px-3 text-xs font-semibold ${tagColorClass[color]}`}
            >
              {c.tag}
            </span>
            {c.source && (
              <span className="text-[11px] text-slate-500">Источник: {c.source}</span>
            )}
          </div>
          {c.comment && (
            <div className="mt-1.5 text-xs leading-snug text-slate-500">{c.comment}</div>
          )}
        </div>
      </div>
    </div>
  );
}
