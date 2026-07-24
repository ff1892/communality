import type { PageServerLoad } from './$types';
import { getAllPaymentDates, getPaymentByDate, getLastPayment } from '$lib/db/queries';
import { transformPaymentDBToPayment } from '$lib/functions/transforms';

export const load: PageServerLoad = async ({ url }) => {
  const dateParam = url.searchParams.get('date');
  const dates = await getAllPaymentDates();

  if (dates.length === 0) {
    return { payment: null, dates, selectedDate: null };
  }

  const paymentDB = dateParam ? await getPaymentByDate(dateParam) : await getLastPayment();
  if (!paymentDB) {
    return { payment: null, dates, selectedDate: null };
  }

  const payment = transformPaymentDBToPayment(paymentDB);

  return {
    payment,
    dates,
    selectedDate: paymentDB.period_to,
  };
};
