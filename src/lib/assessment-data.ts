export type CriterionStatus = "detected" | "review" | "clear";

export type AssessmentCriterion = {
  number: number;
  title: string;
  status: CriterionStatus;
  comment?: string;
  source?: string;
};

export type AssessmentGroupId = "critical" | "approval" | "potential" | "positive";

export type AssessmentGroup = {
  id: AssessmentGroupId;
  title: string;
  description: string;
  total: number;
  criteria: AssessmentCriterion[];
  tone: "rose" | "amber" | "slate" | "emerald";
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

const critical: AssessmentGroup = {
  id: "critical",
  title: "Критические маркеры",
  description: "Факторы, которые могут блокировать сотрудничество",
  total: 15,
  tone: "rose",
  criteria: [
    {
      number: 1,
      title: "ЮЛ ликвидировано / находится в процессе ликвидации или реорганизации",
      status: "detected",
      comment: "Стоп-фактор, требуется согласование ГД",
      source: "ЕГРЮЛ",
    },
    {
      number: 2,
      title: "ЮЛ находится в процедуре банкротства",
      status: "clear",
    },
    {
      number: 3,
      title: "Найден в реестре недобросовестных поставщиков",
      status: "detected",
      comment: "Стоп-фактор, требуется согласование ГД",
      source: "ФАС",
    },
    {
      number: 4,
      title: "Недостоверные сведения о руководителе или учредителе",
      status: "detected",
      comment: "Стоп-фактор, требуется согласование ГД",
      source: "ЕГРЮЛ",
    },
    {
      number: 5,
      title: "Недостоверный адрес по ЕГРЮЛ",
      status: "detected",
      comment: "Стоп-фактор, требуется согласование ГД",
      source: "ЕГРЮЛ",
    },
    {
      number: 6,
      title: "Ограничения на операции по банковским счетам, установленные ФНС",
      status: "detected",
      comment: "Стоп-фактор, требуется согласование ГД",
      source: "ФНС",
    },
    {
      number: 7,
      title: "Иная негативная информация о деловой репутации",
      status: "detected",
      comment: "Требуется верификация комплаенс-службой",
    },
    { number: 8, title: "Дисквалификация руководителя", status: "clear" },
    { number: 9, title: "Запись о массовом руководителе", status: "clear" },
    { number: 10, title: "Запись о массовом учредителе", status: "clear" },
    { number: 11, title: "Адрес массовой регистрации", status: "clear" },
    { number: 12, title: "Нахождение в санкционных списках", status: "clear" },
    { number: 13, title: "Связь с организациями в стоп-листе холдинга", status: "clear" },
    { number: 14, title: "Возбуждено уголовное дело в отношении руководителя", status: "clear" },
    { number: 15, title: "Исключение из ЕГРЮЛ по решению ФНС", status: "clear" },
  ],
};

const approval: AssessmentGroup = {
  id: "approval",
  title: "Маркеры для согласования",
  description: "Факторы, которые требуют проверки перед сотрудничеством",
  total: 11,
  tone: "amber",
  criteria: [
    {
      number: 1,
      title: "Налоговый спор в суде",
      status: "detected",
      comment: "Требуется согласование с юридическим департаментом",
      source: "Картотека арбитражных дел",
    },
    {
      number: 2,
      title: "Претензии или санкции со стороны правоохранительных / налоговых органов",
      status: "detected",
      comment: "Требуется согласование с комплаенс",
    },
    { number: 3, title: "Открытые исполнительные производства", status: "review", comment: "Уточнить статус у ответственного" },
    { number: 4, title: "Судебные споры на крупные суммы", status: "clear" },
    { number: 5, title: "Признаки фирмы-однодневки", status: "clear" },
    { number: 6, title: "Аффилированность с проблемными контрагентами", status: "clear" },
    { number: 7, title: "Отсутствие отчётности за последний период", status: "clear" },
    { number: 8, title: "Резкое снижение выручки", status: "clear" },
    { number: 9, title: "Отрицательные чистые активы", status: "clear" },
    { number: 10, title: "Просроченная задолженность перед бюджетом", status: "clear" },
    { number: 11, title: "Задолженность по заработной плате", status: "clear" },
  ],
};

const potential: AssessmentGroup = {
  id: "potential",
  title: "Потенциальные маркеры",
  description: "Косвенные признаки неблагополучной деловой репутации",
  total: 14,
  tone: "slate",
  criteria: [
    { number: 1, title: "Смена руководителя в течение года", status: "detected", source: "ЕГРЮЛ" },
    { number: 2, title: "Смена юридического адреса", status: "detected", source: "ЕГРЮЛ" },
    { number: 3, title: "Высокая доля вычитаемого НДС", status: "detected", comment: "Свыше 95%" },
    { number: 4, title: "Уставной капитал не превышает 50 тысяч рублей", status: "detected" },
    { number: 5, title: "Одно физлицо является учредителем и руководителем", status: "detected" },
    { number: 6, title: "Малая численность сотрудников", status: "review" },
    { number: 7, title: "Отсутствие сайта / контактной информации", status: "review" },
    { number: 8, title: "Регистрация менее года назад", status: "clear" },
    { number: 9, title: "Частая смена учредителей", status: "clear" },
    { number: 10, title: "Отсутствие лицензий по ОКВЭД", status: "clear" },
    { number: 11, title: "Отсутствие имущества", status: "clear" },
    { number: 12, title: "Отрицательная динамика налоговых платежей", status: "clear" },
    { number: 13, title: "Низкая налоговая нагрузка", status: "clear" },
    { number: 14, title: "Признаки технической компании", status: "clear" },
  ],
};

const positive: AssessmentGroup = {
  id: "positive",
  title: "Позитивные маркеры",
  description: "Факторы, подтверждающие отсутствие негативной информации",
  total: 3,
  tone: "emerald",
  criteria: [
    { number: 1, title: "Отсутствие маркеров из I–III групп", status: "review", comment: "Не подтверждено: выявлены критические маркеры" },
    { number: 2, title: "Положительный опыт взаимодействия с компаниями холдинга", status: "detected", comment: "Подтверждён: 3 закрытых договора без претензий" },
    { number: 3, title: "Наличие госконтрактов", status: "review", comment: "Не подтверждено" },
  ],
};

export const defaultGroups: AssessmentGroup[] = [critical, approval, potential, positive];

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
      "По результатам оценки выявлено 6 критических критериев, 2 критерия требуют согласования и 5 потенциальных маркеров. Основные причины внимания: ограничения ФНС, недостоверные сведения и изменения регистрационных данных.",
    changes: [
      { text: "Появились ограничения ФНС по банковским счетам", tone: "rose" },
      { text: "Обнаружен новый налоговый спор", tone: "amber" },
      { text: "Изменился юридический адрес", tone: "slate" },
      { text: "Добавлены сведения о смене руководителя", tone: "slate" },
    ],
    groups: defaultGroups,
  };
}

export function groupCounts(g: AssessmentGroup) {
  const detected = g.criteria.filter((c) => c.status === "detected").length;
  const review = g.criteria.filter((c) => c.status === "review").length;
  const clear = g.criteria.filter((c) => c.status === "clear").length;
  return { detected, review, clear };
}

export const toneStyles: Record<
  AssessmentGroup["tone"],
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
