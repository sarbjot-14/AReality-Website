'use client';

import CreateCard from '@/components/ui/CreateCard/CreateCard';
import Card from '../../../components/ui/Card/Card';
import { getAccount } from '@/supabase-api/accounts';
import { getCampaigns } from '@/supabase-api/campaigns';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const protectPath = async () => {
      const user = await callGetUserDetails();
      if (!user) {
        router.push('/signin');
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
    };
    fetchCampaigns();
  }, []);
  return (
    <div className="text-black text-lgf flex flex-wrap gap-5">
      <div
        onClick={() => {
          router.push(`/account/campaigns/new`);
        }}
      >
        <CreateCard></CreateCard>
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
