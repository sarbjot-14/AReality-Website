'use client';

import CreateCard from '@/components/ui/CreateCard/CreateCard';
import Card from '../../../components/ui/Card/Card';
import { getAccount } from '@/supabase-api/accounts';
import { getCampaigns } from '@/supabase-api/campaigns';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const user = await callGetUserDetails();

      const account: any = await getAccount(user?.id);
      if (account.error) {
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
