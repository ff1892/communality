import type { Actions } from './$types';
import { isValidRecalcToken, processUnprocessedMetrics } from '$lib/server/paymentProcessing';

export const actions: Actions = {
  process: async ({ request }) => {
    const formData = await request.formData();
    const token = formData.get('token');

    if (!isValidRecalcToken(token)) {
      return { success: false, error: 'Неверный токен' };
    }

    try {
      const result = await processUnprocessedMetrics();

      return {
        success: true,
        message: result.message,
        processed: result.paymentsCreated,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      console.error('[cash/process]', message);
      return { success: false, error: message };
    }
  },
};
