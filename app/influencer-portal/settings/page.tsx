'use client';
import React, { useEffect } from 'react';
// import AccountForm from './components/AccountForm';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { useRouter } from 'next/navigation';

const Settings = async () => {
  const router = useRouter();
  //   useEffect(() => {
  //     const protectPath = async () => {
  //       const user = await callGetUserDetails();
  //       if (!user) {
  //         router.push('/signin');
  //       }
  //     };
  //     protectPath();
  //   }, []);
  return (
    <div className="text-black ">
      <h1>influencer settings</h1>
    </div>
  );
};

export default Settings;
