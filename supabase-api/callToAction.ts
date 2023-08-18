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
export async function getDownloadActionWithCampaignId(campaignId: number) {
  try {
    return supabase
      .from('download_action')
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
      .upsert(data, { onConflict: 'id' })
      .select()
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function upsertDownloadActionWithCampaignId(data: any) {
  try {
    return await supabase
      .from('download_action')
      .upsert(data, { onConflict: 'id' })

      .select()
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
// export async function upsertDownloadActionWithCampaignId(
//   campaignId: number,
//   data: any
// ) {
//   try {
//     if (campaignId) {
//       return await supabase
//         .from('download_action')
//         .upsert(data, { onConflict: 'id' })
//         .eq('id', campaignId)
//         .select()
//         .single();
//     } else {
//       return await supabase.from('campaigns').insert([data]).select().single();
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }
