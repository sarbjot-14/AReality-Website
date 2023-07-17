import { supabase } from './index';

export async function getAccount(userId: any) {
  console.log('getting account with user id ', userId);
  try {
    return await supabase
      .from('accounts')
      .select(
        `
  *,
  users (
    *
  ),
  companies (
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

export async function getAccountWithAccountId(accountId: number) {
  try {
    return await supabase
      .from('accounts')
      .select('*,users(*), companies(*), effects(*)')
      .eq('id', accountId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function putAccount(id: number, payLoad: any) {
  if (id) {
    return await supabase
      .from('accounts')
      .update(payLoad)
      .eq('id', id)
      .select('*,users(*), companies(*)')
      .single();
  } else {
    return await supabase
      .from('accounts')
      .insert([payLoad])
      .select('*,users(*), companies(*)')
      .single();
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
