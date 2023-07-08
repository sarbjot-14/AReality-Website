import { supabase } from './index';

export async function getCampaigns(accountId: number) {
  try {
    return await supabase
      .from('campaigns')
      .select('*')
      .eq('account_id', accountId);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getCampaign(campaignId: number) {
  try {
    return await supabase
      .from('campaigns')
      .select('*, effects(*)')
      .eq('id', campaignId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateCampaign(campaignId: number, data: any) {
  try {
    return await supabase
      .from('campaigns')
      .update(data)
      .eq('id', campaignId)
      .select();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
