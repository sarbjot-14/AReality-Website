import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    console.log('session is ', session);
    return redirect('/influencer-portal/dashboard');
  }

  return (
    <div className="text-black flex justify-center height-screen-helper">
      <h1>influencccerrrs</h1>
      <div className="flex flex-col justify-start  max-w-lg p-3 mx-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
