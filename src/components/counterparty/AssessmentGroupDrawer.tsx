import { InModalDrawer } from "./InModalDrawer";
import {
  type AssessmentGroup,
  type AssessmentCriterion,
  type CriterionStatus,
  groupCounts,
  statusFromPassed,
  criterionStatusMeta,
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
          {group.criteria.length} {pluralCriteria(group.criteria.length)}
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryStat kind="risk" value={counts.risk} />
          <SummaryStat kind="clear" value={counts.clear} />
          <SummaryStat kind="no_data" value={counts.no_data} />
        </div>
      </div>

      {/* Body — flat list of criteria, no category sections */}
      <div className="px-6 pb-6">
        <div className="space-y-2.5">
          {group.criteria.map((c) => (
            <CriterionCard key={c.number} c={c} />
          ))}
        </div>
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

function CriterionCard({ c }: { c: AssessmentCriterion }) {
  const status: CriterionStatus = statusFromPassed(c.passed);
  const m = criterionStatusMeta[status];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-medium leading-snug text-slate-900">{c.title}</div>
      <div className="mt-2">
        <span
          className={`inline-flex h-6 items-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-semibold ${m.chip}`}
        >
          {m.label}
        </span>
      </div>
      <div className="mt-2 text-xs leading-relaxed text-slate-500">{c.reason}</div>
    </div>
  );
}
