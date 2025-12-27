import type { PageServerLoad } from './$types';
import { getPageData } from '$lib/db/getPageData';
import type { MonthReport } from '$lib/types/monthReport';

export const load: PageServerLoad = async (): Promise<MonthReport> => {
  try {
    const data = await getPageData();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
