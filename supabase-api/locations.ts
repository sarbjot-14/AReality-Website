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
