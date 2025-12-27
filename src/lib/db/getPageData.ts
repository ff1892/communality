import { generateMonthReportData } from '$lib/functions/generateMonthReportData';
import { supabase } from '$lib/supabaseClient';
import type { MetricDB } from '$lib/types/metric';
import type { RateDB } from '$lib/types/rate';

const getLastRate = async (): Promise<RateDB> => {
  const { data, error } = await supabase
    .from('rates')
    .select<'rate', RateDB>()
    .order('start_day', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error('Error getting rates');
  }
  return data;
};

const getLastMetrics = async (): Promise<MetricDB[]> => {
  const { data, error } = await supabase
    .from('metrics')
    .select<'metric', MetricDB>()
    .order('checked_at', { ascending: false })
    .limit(2);
  if (error || !data) {
    throw new Error('Error getting metrics');
  }
  return data;
};

export const getPageData = async () => {
  const lastRate = await getLastRate();
  const lastMetrics = await getLastMetrics();

  const [newerMetric, olderMetric] = lastMetrics;

  const pageData = generateMonthReportData(lastRate, [newerMetric, olderMetric]);
  return pageData;
};
