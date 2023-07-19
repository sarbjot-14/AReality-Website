'use client';

import CallToActionForm from './components/CallToActionFrom/CallToActionForm';
import CampaignForm from './components/CampaignForm/CampaignForm';
import { getCampaign } from '@/supabase-api/campaigns';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Analytics from './components/Analytics/Analytics';

const Page = () => {
  const router = useRouter();

  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/account/campaigns/${campaignId}/analytics`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      setCampaign(campaignData?.data);
    };
    fetchData();
  }, [campaignId]);
  return (
    <div>
      <div className="flex flex-col gap-10">
        {campaign && <Analytics></Analytics>}

        <CampaignForm campaign={campaign}></CampaignForm>
        <CallToActionForm campaign={campaign}></CallToActionForm>
      </div>
    </div>
  );
};

export default Page;
