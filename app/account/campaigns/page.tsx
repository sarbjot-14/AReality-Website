'use client';

import CreateCard from '@/components/ui/CreateCard/CreateCard';
import Card from '../../../components/ui/Card/Card';
import { getAccount } from '@/supabase-api/accounts';
import { getCampaigns } from '@/supabase-api/campaigns';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading/Loading';
import { getUser, putUser } from '@/supabase-api/users';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const router = useRouter();
  useEffect(() => {
    const protectPath = async () => {
      const user = await callGetUserDetails();
      if (!user) {
        router.push('/signin');
      } else {
        const userInfoData = await getUser(user?.id);
        if (userInfoData?.data?.role == null) {
          const response = await putUser(user?.id, {
            ...userInfoData?.data,
            role: 'Company'
          });
        } else if (userInfoData?.data?.role == 'Influencer') {
          router.push('/influencer-portal/signin');
        }
      }
    };
    protectPath();
  }, []);
  useEffect(() => {
    const fetchCampaigns = async () => {
      const user = await callGetUserDetails();

      const account: any = await getAccount(user?.id);
      console.log('account ', account);
      if (account.error || !account?.data?.approved) {
        router.push('/account/settings');
      }

      const fetchData = await getCampaigns(account?.data?.id);

      setCampaigns(fetchData?.data);
      setLoading(false);
    };
    fetchCampaigns();
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="text-black text-lgf flex flex-wrap gap-5">
      <div
        onClick={() => {
          router.push(`/account/campaigns/new`);
        }}
      >
        <CreateCard text="Create Campaign"></CreateCard>
      </div>

      {campaigns?.map((campaign: any) => {
        return (
          <div
            onClick={() => {
              router.push(`/account/campaigns/${campaign.id}`);
            }}
          >
            <Card name={campaign.title} description={''}></Card>
          </div>
        );
      })}
    </div>
  );
};

export default Campaigns;
