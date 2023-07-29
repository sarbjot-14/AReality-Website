'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCampaign } from '@/supabase-api/campaigns';
import { getAnalyticsCurrentMonth } from '@/supabase-api/analytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';

const Analytics = () => {
  const costPerClick: number = 200; // 200 cents
  const costPerImpression: number = 20; // 20 cents
  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const [totalImpressions, setTotalImpressions] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const campaignData = await getCampaign(parseInt(campaignId));
      setCampaign(campaignData?.data);

      const analyticsData = await getAnalyticsCurrentMonth(
        parseInt(campaignId)
      );

      setAnalytics(
        analyticsData?.data?.map((point: any) => {
          return { ...point, created_at: new Date(point.created_at) };
        })
      );
    };
    if (campaignId) {
      fetchData();
    }
  }, [campaignId]);

  //TODO: move to utlity
  function getDaysInMonth() {
    var date = new Date();
    const thisMonth = date.getMonth();
    var firstDay: any = new Date(date.getFullYear(), date.getMonth(), 1);
    var days = [];
    while (firstDay.getMonth() === thisMonth) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }
    return days;
  }
  //TODO: move to utlity
  function getFormattedDate(date: any) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day;
  }
  useEffect(() => {
    const convertData = () => {
      const graphDataArray = [];

      const allDay = getDaysInMonth();
      let totImpressions = 0;
      let totClicks = 0;

      // loop over array and filter analytics
      for (let i = 0; i < allDay.length; i++) {
        let daysPoints = analytics.filter(
          (item: any) => item.created_at.getDate() == allDay[i].getDate()
        );
        let impressionsCount = daysPoints.reduce(
          (total: number, point: any) => {
            return point.impression ? total + 1 : total;
          },
          0
        );
        totImpressions += impressionsCount;
        let clicksCount = daysPoints.reduce((total: number, point: any) => {
          return point.clicked ? total + 1 : total;
        }, 0);
        totClicks += clicksCount;
        graphDataArray.push({
          date: getFormattedDate(allDay[i]),

          clicks: clicksCount,
          impressions: impressionsCount
        });
      }
      setGraphData(graphDataArray);
      setTotalClicks(totClicks);
      setTotalImpressions(totImpressions);
    };
    if (analytics) {
      convertData();
    }
  }, [analytics]);

  return (
    <div className="flex flex-col w-full m:w-9/10 max-w-4xl items-start border-2 border-gray-400 my-10 p-2 rounded-lg shadow">
      <h1 className="text-black text-2xl font-bold ml-10 p-5">
        Analytics Overview
      </h1>
      <div className="p-10  w-full overflow-x-auto">
        <LineChart
          width={730}
          height={250}
          data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            interval={2}
            angle={-25}
            height={30}
            padding={{ right: 5 }}
          ></XAxis>
          <YAxis> </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#d95050" />
          <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
        </LineChart>
      </div>
      <dl className=" w-full flex flex-row justify-around   text-gray-900  dark:text-white sm:p-8">
        <div className="flex flex-col items-center justify-center ">
          <dt className="mb-2 text-3xl font-extrabold">{totalImpressions}</dt>
          <dd className="text-gray-500 dark:text-gray-400">Impressions</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">{totalClicks}</dt>
          <dd className="text-gray-500 dark:text-gray-400">Clicks</dd>
        </div>
        {/* <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-3xl font-extrabold">
            $
            {Math.round(
              totalClicks * costPerClick + totalImpressions * costPerImpression
            ) / 100}
          </dt>
          <dd className="text-gray-500 dark:text-gray-400">Cost</dd>
        </div> */}
      </dl>
    </div>
  );
};

export default Analytics;
