'use client';
import React, { useEffect, useState } from 'react';
import { getCampaigns } from '@/supabase-api/campaigns';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { getAccount } from '@/supabase-api/accounts';
import Card from '../../../components/ui/Card/Card';
import { useRouter } from 'next/navigation';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const user = await callGetUserDetails();

      const account: any = await getAccount(user?.id);

      const fetchData = await getCampaigns(account?.data?.id);
      console.log(fetchData);

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
              console.log('wwhhhat');
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
