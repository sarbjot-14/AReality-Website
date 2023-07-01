import { supabase } from './index';

export async function getAccount(userId: any) {
  try {
    return await supabase
      .from('accounts')
      .select(
        `
  *,
  users (
    *
  )
`
      )
      .eq('user_id', userId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export type putAccountParam = { company_id: number; user_id: string };
export async function putAccount(userId: number, payLoad: putAccountParam) {
  const account = await getAccount(userId);

  if (account?.data != null) {
    const { data, error } = await supabase
      .from('accounts')
      .update(payLoad)
      .eq('user_id', userId)
      .select();
  } else {
    console.log('inserting');
    const { data, error } = await supabase
      .from('accounts')
      .insert([payLoad])
      .select();
  }
}

export async function deleteAccounts() {
  try {
    return await supabase.from('accounts').delete().neq('id', 0);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
