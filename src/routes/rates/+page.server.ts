import type { PageServerLoad } from './$types';
import { getAllRateDates, getRateByDate, getLastRate } from '$lib/db/queries';
import { transformRateDBToRate } from '$lib/functions/transforms';

export const load: PageServerLoad = async ({ url }) => {
  const dateParam = url.searchParams.get('date');
  const dates = await getAllRateDates();

  const rateDB = dateParam ? await getRateByDate(dateParam) : await getLastRate();
  const rate = transformRateDBToRate(rateDB);

  return {
    rate,
    dates,
    selectedDate: rateDB.start_day,
  };
};
