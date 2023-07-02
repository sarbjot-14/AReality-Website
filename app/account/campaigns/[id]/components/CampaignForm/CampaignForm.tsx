'use client';

import { getAccountWithAccountId } from '@/supabase-api/accounts';
// import {
//   getAccount,
//   putAccount,
//   putAccountParam
// } from '@/supabase-api/accounts';
import { getCompanies } from '@/supabase-api/companies';
import { getEffects } from '@/supabase-api/effects';
import { getUser, putUser, putUserParam } from '@/supabase-api/users';
import { MultiSelect } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  title: string;
  effectId: number;
  locationsIds: number;
};
const CampaignForm = ({ campaign }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('submitting ', data);
    // const payLoad: putAccountParam = {
    //   company_id: data.companyId,
    //   user_id: user.id
    // };
    // await putAccount(user.id, payLoad);
    // const userParams: putUserParam = { full_name: data.title };
    // await putUser(user.id, userParams);
  };

  //console.log(watch("example")) // watch input value by passing the name of it

  const [effects, setEffects] = useState<any>(null);
  const [locations, setLocations] = useState<any>([]);
  // const [currentUser, setCurrentUser] = useState<any>(null);
  const [account, setAccount] = useState<any>({});
  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaign?.id) {
        const accountData = await getAccountWithAccountId(campaign?.account_id);
        console.log('account data ', accountData);
        setAccount(accountData?.data);
        console.log('effects ', accountData?.data?.effects);
        setEffects(accountData?.data?.effects);
        setLocations(accountData?.data?.locations);
      }
    };
    fetchAccountData();
  }, [campaign]);
  useEffect(() => {
    const fetchData = async () => {
      // const companyData = await getEffects(1);
      // companyData?.data?.sort((companyA, companyB) => {
      //   return companyA.id == account?.company_id ? -1 : 1;
      // });
      // setEffects(companyData?.data);
      // setCurrentUser(account.users);
    };
    fetchData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-lg border-2 border-zinc-300 rounded-xl p-5 "
    >
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Effect Campaign
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 flex flex-col">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                {...register('title', { required: true })}
                type="text"
                name="title"
                id="title"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={campaign?.title}
              ></input>
            </div>
            {errors.title?.type && (
              <p className="text-red-500" role="alert">
                {errors.title?.type}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Effect
          </label>
          <div className="mt-2">
            <select
              {...register('effectId', { required: true })}
              id="effects"
              name="effectId"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {effects &&
                effects.map((effect: any) => {
                  return (
                    <option key={effect.id} value={effect.id}>
                      {effect.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {errors.effectId?.type && (
            <p className="text-red-500" role="alert">
              {errors.effectId?.type}
            </p>
          )}
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Effect
          </label>
          <div className="mt-2">
            <MultiSelect
              data={locations.map((loc: any) => {
                return { label: loc.address, value: loc.id };
              })}
              {...register('locationsIds', { required: true })}
              label="Locations"
              placeholder="Pick all that you like"
            />
            <select
              multiple
              {...register('effectId', { required: true })}
              id="effects"
              name="effectId"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {locations &&
                locations.map((effect: any) => {
                  return (
                    <option key={effect.id} value={effect.id}>
                      {effect.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {errors.effectId?.type && (
            <p className="text-red-500" role="alert">
              {errors.effectId?.type}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
