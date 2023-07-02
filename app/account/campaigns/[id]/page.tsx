'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCampaign } from '@/supabase-api/campaigns';
import CampaignForm from './components/CampaignForm/CampaignForm';

const Page = () => {
  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      console.log('camkaign data', campaignData);
      setCampaign(campaignData?.data);
    };
    fetchData();
  }, [campaignId]);
  return (
    <div>
      <p>
        Post:{campaignId} {campaign?.title}
      </p>
      <div>
        <CampaignForm campaign={campaign}></CampaignForm>
      </div>
    </div>
  );
};

export default Page;
