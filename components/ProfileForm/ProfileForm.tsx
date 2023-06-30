'use client';

import { getCompanies } from '@/supabase-api/companies';
import { getUser, putUser, putUserParam } from '@/supabase-api/users';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  fullname: string;
  companyId: number;
};
const ProfileForm = ({ user }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payLoad: putUserParam = {
      full_name: data.fullname,
      company_id: data.companyId
    };
    const result = await putUser(user.id, payLoad);
    if (!result?.error) {
    }
    console.log(result);
  };

  //console.log(watch("example")) // watch input value by passing the name of it

  const [companies, setCompanies] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(user.id);
      const companyData = await getCompanies();
      // make sure current company is first option
      companyData?.data?.sort((companyA, companyB) => {
        return companyA.id == userData?.data?.company_id ? -1 : 1;
      });
      //console.log(companyData, user?.company_id);
      setCompanies(companyData?.data);
      setCurrentUser(userData?.data);
    };
    fetchData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-lg border-2 border-zinc-300 rounded-xl p-5"
    >
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profile
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Full Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                {...register('fullname', { required: true })}
                type="text"
                name="fullname"
                id="fullname"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={currentUser?.full_name}
              ></input>
            </div>
            {errors.fullname?.type && (
              <p className="text-red-500" role="alert">
                {errors.fullname?.type}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Company
          </label>
          <div className="mt-2">
            <select
              {...register('companyId', { required: true })}
              id="company"
              name="companyId"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {companies &&
                companies.map((company: any) => {
                  return (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {errors.companyId?.type && (
            <p className="text-red-500" role="alert">
              {errors.companyId?.type}
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
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
