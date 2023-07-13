'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCampaign } from '@/supabase-api/campaigns';
import { getAnalyticsCurrentMonth } from '@/supabase-api/analytics';

const Analytics = () => {
  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      setCampaign(campaignData?.data);

      const analyticsData = await getAnalyticsCurrentMonth(
        parseInt(campaignId)
      );
      setAnalytics(analyticsData?.data);
      console.log('data ', analyticsData?.data);
      console.log(
        'pst',
        analyticsData?.data?.map((point: any) => {
          return { ...point, created_at: new Date(point.created_at) };
        })
      );
    };
    if (campaignId) {
      fetchData();
    }
  }, [campaignId]);
  return <div className="text-black">Analytics</div>;
};

export default Analytics;
