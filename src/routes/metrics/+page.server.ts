import type { PageServerLoad } from './$types';
import { getAllMetricDates, getMetricByDate, getLastMetric } from '$lib/db/queries';
import { transformMetricDBToMetric } from '$lib/functions/transforms';

export const load: PageServerLoad = async ({ url }) => {
  const dateParam = url.searchParams.get('date');
  const dates = await getAllMetricDates();

  const metricDB = dateParam ? await getMetricByDate(dateParam) : await getLastMetric();
  const metric = transformMetricDBToMetric(metricDB);

  return {
    metric,
    dates,
    selectedDate: metricDB.checked_at,
  };
};
