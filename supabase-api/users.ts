import { supabase } from './index';

export async function getUser(userId: string) {
  console.log('user is id ', userId);
  try {
    return await supabase.from('users').select('*').eq('id', userId).single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function putUser(userId: string, payLoad: any) {
  try {
    return await supabase
      .from('users')
      .update(payLoad)
      .eq('id', userId)
      .select('*')
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
