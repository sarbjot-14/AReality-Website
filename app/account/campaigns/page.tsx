'use client';
import React, { useEffect, useState } from 'react';
import { getEffects } from '@/supabase-api/effects';
import { callGetUserDetails } from './actions';
import { getAccount } from '@/supabase-api/accounts';
import Card from '../../../components/ui/Card/Card';

const Effects = () => {
  const [effects, setEffects] = useState<any>(null);

  useEffect(() => {
    const fetchEffects = async () => {
      const user = await callGetUserDetails();
      const account: any = await getAccount(user?.id);

      const fetchData = await getEffects(account?.data?.id);

      setEffects(fetchData?.data);
    };
    fetchEffects();
  }, []);
  return (
    <div className="text-black text-lg">
      {effects?.map((effect: any) => {
        return (
          <Card name={effect.name} description={'Configure'}></Card>
          // <div key={effect.id} className="text-black">
          //   {effect.name}
          // </div>
        );
      })}
    </div>
  );
};

export default Effects;
