'use client';

import Card from '../../../components/ui/Card/Card';
import CreateCard from '@/components/ui/CreateCard/CreateCard';
import { getAccount } from '@/supabase-api/accounts';
import { getEffects } from '@/supabase-api/effects';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Effects = () => {
  const router = useRouter();

  const [effects, setEffects] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    const fetchEffects = async () => {
      const user = await callGetUserDetails();
      const accountData: any = await getAccount(user?.id);

      if (accountData?.data) {
        const fetchData = await getEffects(accountData?.data?.id);

        setAccount(accountData?.data);
        setEffects(fetchData?.data);
      }
    };
    fetchEffects();
  }, []);
  return (
    <div className="text-black flex flex-wrap gap-10">
      <a
        target="_blank"
        href="https://calendly.com/areality/areality-tiktok-effect-design"
      >
        <CreateCard tooltipMessage="Set a meeting to design your custom TikTok Effect"></CreateCard>
      </a>

      {effects?.map((effect: any) => {
        return (
          <div
            onClick={() => {
              if (effect.state != 'In Progress') {
                router.push(`/account/effects/${effect.id}`);
              }
            }}
          >
            {' '}
            <Card
              name={effect.name}
              description={`State: ${effect.state}`}
            ></Card>
          </div>
        );
      })}
    </div>
  );
};

export default Effects;
