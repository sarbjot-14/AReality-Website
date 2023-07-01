import { supabase } from './index';

export async function getEffects(accountId: number) {
  try {
    return await supabase
      .from('effects')
      .select('*')
      .eq('account_id', accountId);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
