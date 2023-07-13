import { supabase } from './index';

export async function getAnalyticsCurrentMonth(campaignId: number) {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDay1: string = firstDay.toISOString();
  const lastDay2: string = lastDay.toISOString();
  try {
    return await supabase
      .from('ad_analytics')
      .select('*')
      .eq('campaign_id', campaignId)
      .gt('created_at', firstDay1)
      .lt('created_at', lastDay2);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
