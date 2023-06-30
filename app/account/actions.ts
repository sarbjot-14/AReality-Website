'use server';

import { getSession } from '../supabase-server';
import { Database } from '@/types_db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function updateName(formData: FormData) {
  const newName = formData.get('name') as string;
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await getSession();
  const user = session?.user;
  const { error } = await supabase
    .from('users')
    .update({ full_name: newName })
    .eq('id', user?.id);
  if (error) {
    console.log(error);
  }
  revalidatePath('/account');
}

// updating email is auth change
export async function updateEmail(formData: FormData) {
  const newEmail = formData.get('email') as string;
  const supabase = createServerActionClient<Database>({ cookies });
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    console.log(error);
  }
  revalidatePath('/account');
}
