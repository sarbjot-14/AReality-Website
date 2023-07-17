import { supabase } from './index';

export async function getCompanies() {
  try {
    return await supabase.from('companies').select('*');
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getCompanyWithId(companyId: number) {
  try {
    return await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function putCompany(companyId: number, payLoad: any) {
  const company = await getCompanyWithId(companyId);

  if (company?.data != null) {
    return await supabase
      .from('companies')
      .update(payLoad)
      .eq('id', companyId)
      .select()
      .single();
  } else {
    return await supabase.from('companies').insert([payLoad]).select().single();
  }
}
