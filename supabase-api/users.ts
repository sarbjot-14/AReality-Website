import { supabase } from './index';

export async function getUser(userId: number) {
  try {
    return await supabase.from('users').select('*').single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export type putUserParam = { full_name: string };
export async function putUser(userId: number, payLoad: putUserParam) {
  try {
    return await supabase
      .from('users')
      .update(payLoad)
      .eq('id', userId)
      .select();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
