'use client';

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

      const fetchData = await getCampaigns(account?.data?.id);

      setCampaigns(fetchData?.data);
    };
    fetchCampaigns();
  }, []);
  return (
    <div className="text-black text-lg">
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
