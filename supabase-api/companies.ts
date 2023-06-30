import { supabase } from './index';

export async function getCompanies() {
  try {
    return await supabase.from('companies').select('*');
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
