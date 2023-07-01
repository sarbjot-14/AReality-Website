'use server';

import { getSession } from '@/app/supabase-server';

export async function callGetUserDetails() {
  const session = await getSession();
  const user = session?.user;
  return user;
}
