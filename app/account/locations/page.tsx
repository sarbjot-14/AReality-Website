'use client';
import React, { useEffect, useState } from 'react';
import { getLocations } from '@/supabase-api/locations';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { getAccount } from '@/supabase-api/accounts';
import Card from '../../../components/ui/Card/Card';

const Locations = () => {
  const [locations, setLocations] = useState<any>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const user = await callGetUserDetails();
      const account: any = await getAccount(user?.id);

      const fetchData = await getLocations(account?.data?.id);
      console.log('locations are ', fetchData);

      setLocations(fetchData?.data);
    };
    fetchLocations();
  }, []);
  return (
    <div className="min-w-screen flex">
      {locations?.map((location: any) => {
        return (
          <Card name={location.name} description={location?.address}></Card>
          // <div key={effect.id} className="text-black">
          //   {effect.name}
          // </div>
        );
      })}
    </div>
  );
};

export default Locations;
