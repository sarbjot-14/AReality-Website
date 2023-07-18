import { supabase } from './index';

export async function getPromoActionWithCampaignId(campaignId: number) {
  try {
    return supabase
      .from('promo_action')
      .select('*')
      .eq('campaign_id', campaignId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
export async function getLinkActionWithCampaignId(campaignId: number) {
  try {
    return supabase
      .from('link_action')
      .select('*')
      .eq('campaign_id', campaignId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function upsertPromoActionWithCampaignId(data: any) {
  try {
    return await supabase
      .from('promo_action')
      .upsert(data, { onConflict: 'campaign_id' })
      .select()
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
export async function updateLinkActionWithCampaignId(
  campaignId: number,
  data: any
) {
  try {
    return await supabase
      .from('link_action')
      .update(data)
      .eq('id', campaignId)
      .select();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
