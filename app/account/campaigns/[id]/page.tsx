'use client';

import CallToActionForm from './components/PromoActionForm/PromoActionForm';
import CampaignForm from './components/CampaignForm/CampaignForm';
import { getCampaign, upsertCampaign } from '@/supabase-api/campaigns';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Analytics from './components/Analytics/Analytics';
import { Select, MenuItem, InputLabel } from '@mui/material';
import DownloadActionForm from './components/DownloadActionForm/DownloadActionForm';

const Page = () => {
  const router = useRouter();

  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);
  const [actionType, setActionType] = useState<any>(null);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/account/campaigns/${campaignId}/analytics`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      setCampaign(campaignData?.data);
      setActionType(campaignData?.data?.call_to_action_type);
    };
    fetchData();
  }, [campaignId]);
  // useEffect(() => {

  // }, [campaign]);
  const settingCampaign = async (campaignId: any, updatedCampaign: any) => {
    console.log('data ', {
      effect_id: updatedCampaign?.effect_id,
      title: updatedCampaign?.title,
      account_id: updatedCampaign?.account_id,
      call_to_action_type: actionType
    });
    const campaignData = await upsertCampaign(campaignId, {
      effect_id: updatedCampaign?.effect_id,
      title: updatedCampaign?.title,
      account_id: updatedCampaign?.account_id,
      call_to_action_type: actionType
    });
    console.log('setttting ', campaignData);
    if (campaignData?.data) {
      setActionType(campaignData?.data?.call_to_action_type);
      setCampaign(campaignData?.data);
      return campaignData;
    }
  };
  // const [open, setOpen] = useState(false);
  // const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  //   props,
  //   ref
  // ) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };
  return (
    <>
      {campaign && (
        <h1 className="text-black text-3xl font-bold">{campaign.title}</h1>
      )}
      <div className="flex flex-col gap-10">
        {campaign && <Analytics></Analytics>}

        <CampaignForm
          campaign={campaign}
          settingCampaign={settingCampaign}
        ></CampaignForm>

        <div
          className={`w-full ${!campaign && 'pointer-events-none opacity-40'} `}
        >
          <h1 className="text-3xl text-black font-medium">
            2. Configure Call To Action
          </h1>
          <div className=" border-2 border-zinc-300 rounded-xl p-5 flex flex-col ">
            <InputLabel> Action Type:</InputLabel>{' '}
            {actionType && (
              <Select
                value={actionType}
                onChange={(e) => {
                  setActionType(e.target.value);
                }}
                fullWidth
              >
                <MenuItem value={'promo'}>Promotional Link</MenuItem>
                <MenuItem value={'download'}>Download</MenuItem>
              </Select>
            )}
            {actionType === 'promo' ? (
              <CallToActionForm
                settingCampaign={settingCampaign}
                campaign={campaign}
              ></CallToActionForm>
            ) : actionType === 'download' ? (
              <DownloadActionForm
                settingCampaign={settingCampaign}
                campaign={campaign}
              ></DownloadActionForm>
            ) : (
              <div className="text-black">Error</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
