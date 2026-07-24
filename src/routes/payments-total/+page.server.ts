import type { PageServerLoad } from './$types';
import { getPaymentTotalsByYear, getPaymentYears } from '$lib/db/queries';

const monthLabels = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

const buildMonthlySeries = (points: Array<{ month: number; total: number }>) => {
  const totalsByMonth = new Map(points.map((point) => [point.month, point.total]));

  return monthLabels.map((label, index) => {
    const month = index + 1;

    return {
      month,
      label,
      total: totalsByMonth.get(month) ?? 0,
    };
  });
};

export const load: PageServerLoad = async ({ url }) => {
  const years = await getPaymentYears();
  const currentYear = new Date().getFullYear();
  const yearParam = Number(url.searchParams.get('year'));
  const selectedYear = years.includes(yearParam) ? yearParam : (years[0] ?? currentYear);
  const totals = years.length > 0 ? await getPaymentTotalsByYear(selectedYear) : [];
  const points = buildMonthlySeries(totals);
  const yearTotal = Number(points.reduce((sum, point) => sum + point.total, 0).toFixed(2));
  const maxTotal = Math.max(...points.map((point) => point.total), 0);
  const activeMonths = points.filter((point) => point.total > 0);
  const averageTotal = activeMonths.length
    ? Number((yearTotal / activeMonths.length).toFixed(2))
    : 0;

  return {
    years,
    selectedYear,
    points,
    yearTotal,
    maxTotal,
    averageTotal,
  };
};
