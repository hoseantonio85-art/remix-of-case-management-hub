export type CriterionStatus = "risk" | "clear" | "no_data";

export const statusFromPassed = (p: boolean | null): CriterionStatus =>
  p === false ? "risk" : p === true ? "clear" : "no_data";

export const criterionStatusMeta: Record<
  CriterionStatus,
  { label: string; chip: string }
> = {
  risk: { label: "Выявлен риск", chip: "bg-rose-50 text-rose-700" },
  clear: { label: "Нарушений нет", chip: "bg-emerald-50 text-emerald-700" },
  no_data: { label: "Нет данных", chip: "bg-slate-100 text-slate-600" },
};

export type AssessmentCriterion = {
  number: number;
  title: string;
  passed: boolean | null;
  reason: string;
  source?: string;
};

export type AssessmentGroupId = "legal" | "management" | "finance" | "court";

export type AssessmentGroup = {
  id: AssessmentGroupId;
  title: string;
  description: string;
  criteria: AssessmentCriterion[];
};

export type AssessmentChange = {
  text: string;
  tone: "rose" | "amber" | "slate" | "emerald";
};

export type AssessmentSource = "auto" | "manual";

export type Assessment = {
  inn: string;
  counterpartyName: string;
  date: string;
  nextCheck?: string;
  source: AssessmentSource;
  summary: string;
  changes: AssessmentChange[];
  groups: AssessmentGroup[];
};

const NO_DATA_REASON = "Нет данных для проверки";
const OK_REASON = "Нарушений не выявлено";

const FIN_REASON =
  "По найденной информации выявлены признаки финансовой неустойчивости: оперативное погашение краткосрочных обязательств невозможно, активы сформированы в основном за счет привлеченных средств, имеется просроченная кредиторская или дебиторская задолженность.";
const HEAD_REASON =
  "По найденной информации за последние 6 месяцев произошла смена директора компании.";

const legal: AssessmentGroup = {
  id: "legal",
  title: "Юридический статус и правоспособность",
  description:
    "Проверка статуса ЮЛ, регистрации, ограничений и права заключать договор",
  criteria: [
    { number: 1, title: "Ликвидация или реорганизация", passed: true, reason: OK_REASON },
    { number: 2, title: "Банкротство ЮЛ", passed: true, reason: OK_REASON },
    { number: 3, title: "Деятельность приостановлена по КоАП РФ", passed: null, reason: NO_DATA_REASON },
    { number: 4, title: "Решение о приостановлении деятельности", passed: null, reason: NO_DATA_REASON },
    { number: 5, title: "Ограничения по счетам от ФНС", passed: null, reason: NO_DATA_REASON },
    { number: 6, title: "Недостоверный адрес в ЕГРЮЛ", passed: true, reason: OK_REASON },
    { number: 7, title: "Адрес массовой регистрации", passed: null, reason: NO_DATA_REASON },
    { number: 8, title: "Смена юрадреса в течение года", passed: null, reason: NO_DATA_REASON },
    { number: 9, title: "С даты регистрации менее 6 месяцев", passed: null, reason: NO_DATA_REASON },
    { number: 10, title: "Отсутствие нужных ОКВЭД под договор", passed: null, reason: NO_DATA_REASON },
  ],
};

const management: AssessmentGroup = {
  id: "management",
  title: "Руководство и бенефициары",
  description:
    "Проверка руководителей, учредителей, связей и изменений в управлении",
  criteria: [
    { number: 1, title: "Дисквалификация руководителей", passed: true, reason: OK_REASON },
    { number: 2, title: "Недостоверные сведения о руководителе/учредителе", passed: true, reason: OK_REASON },
    { number: 3, title: "Банкротство физлица (руководитель/учредитель)", passed: true, reason: OK_REASON },
    { number: 4, title: "Судимость за экономические преступления", passed: null, reason: NO_DATA_REASON },
    { number: 5, title: "Иностранные учредители/руководители", passed: null, reason: NO_DATA_REASON },
    { number: 6, title: "Совпадение учредителя и руководителя", passed: null, reason: NO_DATA_REASON },
    { number: 7, title: "Массовость руководителя", passed: true, reason: OK_REASON },
    { number: 8, title: "Массовость учредителя", passed: true, reason: OK_REASON },
    { number: 9, title: "Смена руководителя в течение года", passed: false, reason: HEAD_REASON },
    { number: 10, title: "Смена управляющей компании в течение года", passed: null, reason: NO_DATA_REASON },
    { number: 11, title: "Отсутствие маркеров из I–III групп", passed: false, reason: "Обнаружены риски в группах 1–3" },
  ],
};

const finance: AssessmentGroup = {
  id: "finance",
  title: "Финансы и налоги",
  description:
    "Проверка налоговой дисциплины, долгов, выручки и финансовой устойчивости",
  criteria: [
    { number: 1, title: "Непредставление налоговой отчётности более 1 года", passed: true, reason: OK_REASON },
    { number: 2, title: "Неоплаченная налоговая задолженность", passed: null, reason: NO_DATA_REASON },
    { number: 3, title: "Высокая доля вычитаемого НДС", passed: null, reason: NO_DATA_REASON },
    { number: 4, title: "Обязательства более 30% выручки", passed: null, reason: NO_DATA_REASON },
    { number: 5, title: "Снижение выручки более 50%", passed: null, reason: NO_DATA_REASON },
    { number: 6, title: "Недостаточная численность работников", passed: null, reason: NO_DATA_REASON },
    { number: 7, title: "Уставной капитал не более 50 тыс. руб.", passed: null, reason: NO_DATA_REASON },
    { number: 8, title: "С даты регистрации прошло 12 месяцев", passed: null, reason: NO_DATA_REASON },
    { number: 9, title: "Положительный опыт с компаниями холдинга", passed: null, reason: NO_DATA_REASON },
    { number: 10, title: "Наличие госконтрактов", passed: null, reason: NO_DATA_REASON },
    { number: 11, title: "Финансовый анализ на данных отчётности", passed: false, reason: FIN_REASON },
  ],
};

const court: AssessmentGroup = {
  id: "court",
  title: "Судебная нагрузка и репутация",
  description: "Проверка судебных, исполнительных и репутационных факторов",
  criteria: [
    { number: 1, title: "Терроризм / экстремизм", passed: true, reason: OK_REASON },
    { number: 2, title: "Список иноагентов", passed: null, reason: NO_DATA_REASON },
    { number: 3, title: "Административная ответственность ст. 19.28 КоАП", passed: true, reason: OK_REASON },
    { number: 4, title: "Недобросовестный поставщик", passed: true, reason: OK_REASON },
    { number: 5, title: "Исполнительные производства более 10% выручки", passed: null, reason: NO_DATA_REASON },
    { number: 6, title: "Значительные арбитражные дела (ответчик)", passed: null, reason: NO_DATA_REASON },
    { number: 7, title: "Требования к ответчику более 10% выручки", passed: null, reason: NO_DATA_REASON },
    { number: 8, title: "Налоговый спор в суде", passed: null, reason: NO_DATA_REASON },
    { number: 9, title: "Банкротство физлица-ИП за 12 мес.", passed: null, reason: NO_DATA_REASON },
    { number: 10, title: "Претензии / санкции от госорганов", passed: null, reason: NO_DATA_REASON },
    { number: 11, title: "Иная негативная репутационная информация", passed: true, reason: OK_REASON },
    { number: 12, title: "3 и более фактора из III группы", passed: true, reason: OK_REASON },
    { number: 13, title: "Информация об арбитражных исках", passed: true, reason: OK_REASON },
  ],
};

export const defaultGroups: AssessmentGroup[] = [legal, management, finance, court];

export function buildAssessment(
  counterpartyName: string,
  inn: string,
  source: AssessmentSource = "auto",
  dateOverride?: string,
): Assessment {
  return {
    inn,
    counterpartyName,
    date: dateOverride ?? "04.06.2026",
    nextCheck: source === "auto" ? "завтра" : undefined,
    source,
    summary:
      "По результатам оценки выявлены критические факторы по руководству и финансовой устойчивости.",
    changes: [],
    groups: defaultGroups,
  };
}

export type GroupCounts = { risk: number; clear: number; no_data: number };

export function groupCounts(g: AssessmentGroup): GroupCounts {
  let risk = 0;
  let clear = 0;
  let no_data = 0;
  for (const c of g.criteria) {
    if (c.passed === false) risk++;
    else if (c.passed === true) clear++;
    else no_data++;
  }
  return { risk, clear, no_data };
}

export const toneStyles: Record<
  "rose" | "amber" | "slate" | "emerald",
  { dot: string; border: string; iconBg: string; iconText: string; chip: string }
> = {
  rose: {
    dot: "bg-rose-500",
    border: "border-l-rose-400",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    chip: "bg-rose-50 text-rose-700",
  },
  amber: {
    dot: "bg-amber-500",
    border: "border-l-amber-400",
    iconBg: "bg-amber-50",
    iconText: "text-amber-700",
    chip: "bg-amber-50 text-amber-800",
  },
  slate: {
    dot: "bg-slate-400",
    border: "border-l-slate-300",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    chip: "bg-slate-100 text-slate-700",
  },
  emerald: {
    dot: "bg-emerald-500",
    border: "border-l-emerald-400",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
  },
};
