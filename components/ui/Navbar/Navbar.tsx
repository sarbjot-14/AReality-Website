import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import Link from 'next/link';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, putUser } from '@/supabase-api/users';

export default async function Navbar() {
  //const router = useRouter();
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userInfoData = await getUser(user?.id!);

  // const userDetail = await callGetUserDetails();
  // console.log('auth user is ', user);
  // console.log('user detail is ', userDetail);

  // useEffect(() => {
  //   const protectPath = async () => {
  //     console.log('auth user is ', user);
  //     const userDetail = await callGetUserDetails();
  //     console.log('user detail is ', userDetail);
  //     if (!user) {
  //       router.push('/influencer-portal/signin');
  //     } else {
  //       const userInfoData = await getUser(user?.id);
  //       if (userInfoData?.data?.role == null) {
  //         const response = await putUser(user?.id, {
  //           ...userInfoData?.data,
  //           role: 'Influencer'
  //         });
  //       } else if (userInfoData?.data?.role == 'Company') {
  //         router.push('/signin');
  //       }
  //     }
  //     //console.log('user is ', user);
  //   };
  //   protectPath();
  // }, []);

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-6 align-center md:py-4 ">
          <div className="flex items-center flex-1 ">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="ml-6 space-x-2 ">
              <Link href="/" className={s.link}>
                Home
              </Link>
              {user &&
                (userInfoData?.data?.role == 'Company' ? (
                  <Link href="/account/campaigns" className={s.link}>
                    Account
                  </Link>
                ) : (
                  <Link href="/influencer-portal/dashboard" className={s.link}>
                    Account
                  </Link>
                ))}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
