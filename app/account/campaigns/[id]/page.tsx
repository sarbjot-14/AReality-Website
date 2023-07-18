'use client';

import CallToActionForm from './components/CallToActionFrom/CallToActionForm';
import CampaignForm from './components/CampaignForm/CampaignForm';
import { getCampaign } from '@/supabase-api/campaigns';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        {/* <div className="">
          <div
            onClick={handleClick}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              View Analytics
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </p>
          </div>
        </div> */}
        <CampaignForm campaign={campaign}></CampaignForm>
        <CallToActionForm campaign={campaign}></CallToActionForm>
      </div>
    </div>
  );
};

export default Page;
