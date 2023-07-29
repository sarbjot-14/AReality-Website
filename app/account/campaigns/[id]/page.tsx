'use client';

import CallToActionForm from './components/CallToActionFrom/CallToActionForm';
import CampaignForm from './components/CampaignForm/CampaignForm';
import { getCampaign, upsertCampaign } from '@/supabase-api/campaigns';
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
  // useEffect(() => {

  // }, [campaign]);
  const settingCampaign = async (campaignId: any, updatedCampaign: any) => {
    const campaignData = await upsertCampaign(campaignId, {
      effect_id: updatedCampaign?.effect_id,
      title: updatedCampaign?.title,
      account_id: updatedCampaign?.account_id,
      call_to_action_type: 'promo'
    });
    if (campaignData?.data) {
      setCampaign(campaignData?.data);
      return campaignData;
    }
  };
  return (
    <div>
      {campaign && (
        <h1 className="text-black text-3xl font-bold">{campaign.title}</h1>
      )}
      <div className="flex flex-col gap-10">
        {campaign && <Analytics></Analytics>}

        <CampaignForm
          campaign={campaign}
          settingCampaign={settingCampaign}
        ></CampaignForm>
        <CallToActionForm campaign={campaign}></CallToActionForm>
      </div>
    </div>
  );
};

export default Page;
