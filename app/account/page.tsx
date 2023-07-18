import ManageSubscriptionButton from './ManageSubscriptionButton';
import { updateName } from './actions';
import { updateEmail } from './actions';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Account() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  return (
    <section className="mb-32   ">
      <div className="max-w-3xl px-4 py-8 sm:px-6 sm:pt-24 lg:px-8 pt-24 md:pt-10  md:mx-auto">
        <div className="sm:align-center sm:flex sm:flex-col  gap-10 items-center ">
          <h1 className="text-4xl text-black font-extrabold  sm:text-center sm:text-6xl">
            Account
          </h1>
        </div>
      </div>
      <div className="p-4"></div>
    </section>
  );
}
