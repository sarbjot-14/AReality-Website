'use client';

import { callGetUserDetails } from '@/utils/shared-server-functions';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, putUser } from '@/supabase-api/users';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const protectPath = async () => {
      const user = await callGetUserDetails();
      if (!user) {
        router.push('/influencer-portal/signin');
      } else {
        const userInfoData = await getUser(user?.id);
        if (userInfoData?.data?.role == null) {
          const response = await putUser(user?.id, {
            ...userInfoData?.data,
            role: 'Influencer'
          });
        } else if (userInfoData?.data?.role == 'Company') {
          router.push('/signin');
        }
      }
      //console.log('user is ', user);
    };
    protectPath();
  }, []);
  // getUser;

  return <div className="text-black">Dashboard</div>;
};

export default Dashboard;
