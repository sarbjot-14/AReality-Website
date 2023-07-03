import { supabase } from './index';

export async function getLocations(accountId: number) {
  try {
    return await supabase
      .from('locations')
      .select('*')
      .eq('account_id', accountId);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function putLocations(accountId: number) {
  // take original and nullify campaign id, take new and update campaign id
  try {
    // fetch all the locations that match
    // return await supabase
    //   .from('locations')
    //   .select('*')
    //   .eq('account_id', accountId);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function resetLocations(campaignId: number) {
  // take original and nullify campaign id, take new and update campaign id
  try {
    //fetch all the locations that match
    return await supabase
      .from('locations')
      .update({ campaign_id: null })
      .eq('campaign_id', campaignId)
      .select();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateCampaignLocations(
  locationId: number,
  campaignId: number
) {
  // take original and nullify campaign id, take new and update campaign id
  try {
    //fetch all the locations that match
    return await supabase
      .from('locations')
      .update({ campaign_id: campaignId })
      .eq('id', locationId)
      .select();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
