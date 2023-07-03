'use client';

import CallToActionForm from './components/CallToActionFrom/CallToActionForm';
import CampaignForm from './components/CampaignForm/CampaignForm';
import { getCampaign } from '@/supabase-api/campaigns';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      setCampaign(campaignData?.data);
    };
    fetchData();
  }, [campaignId]);
  return (
    <div>
      <p>
        Post:{campaignId} {campaign?.title}
      </p>
      <div className="flex flex-col gap-10 items-center my-16">
        <CampaignForm campaign={campaign}></CampaignForm>
        <CallToActionForm campaign={campaign}></CallToActionForm>
      </div>
    </div>
  );
};

export default Page;
