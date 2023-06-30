import ManageSubscriptionButton from './ManageSubscriptionButton';
import { updateName } from './actions';
import { updateEmail } from './actions';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import ProfileForm from '@/components/ProfileForm/ProfileForm';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  return (
    <section className="mb-32 ">
      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col  gap-10 items-center">
          <h1 className="text-4xl text-black font-extrabold  sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-800 sm:text-center sm:text-2xl">
            Update your profile
          </p>
          <ProfileForm user={user}></ProfileForm>
        </div>
      </div>
      <div className="p-4"></div>
    </section>
  );
}

// interface Props {
//   title: string;
//   description?: string;
//   footer?: ReactNode;
//   children: ReactNode;
// }

// function Card({ title, description, footer, children }: Props) {
//   return (
//     <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
//       <div className="px-5 py-4">
//         <h3 className="mb-1 text-2xl font-medium">{title}</h3>
//         <p className="text-zinc-300">{description}</p>
//         {children}
//       </div>
//       <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
//         {footer}
//       </div>
//     </div>
//   );
// }
