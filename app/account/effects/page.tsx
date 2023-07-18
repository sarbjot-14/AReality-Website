'use client';

import Card from '../../../components/ui/Card/Card';
import CreateCard from '@/components/ui/CreateCard/CreateCard';
import { getAccount } from '@/supabase-api/accounts';
import { getEffects } from '@/supabase-api/effects';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Effects = () => {
  const router = useRouter();

  const [effects, setEffects] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    const fetchEffects = async () => {
      const user = await callGetUserDetails();
      const account: any = await getAccount(user?.id);
      setAccount(account?.data);

      const fetchData = await getEffects(account?.data?.id);

      setEffects(fetchData?.data);
    };
    fetchEffects();
  }, []);
  return (
    <div className="text-black flex flex-wrap gap-10">
      <a
        target="_blank"
        href="https://calendly.com/?utm_source=google&utm_medium=cpc&utm_campaign=Sign_Ups_Intl_Brand_Canada_Search&utm_adgroup=calendly-exact-ca&utm_content=calendly-exact-ca&utm_term=calendly&utm_matchtype=e&utm_targetid=aud-1725165476283:kwd-309663638777&utm_location=9001512&utm_placement=&utm_device=c&gad=1&gclid=Cj0KCQjwzdOlBhCNARIsAPMwjbwKWZuP1yKBTBEFW1vy2a_svNc1LjOM4Rpc32u_OeSZEoIbpOjaUEAaAnz0EALw_wcB"
      >
        <CreateCard></CreateCard>
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
