'use client';

import {
  getAccount,
  getAccountWithAccountId,
  putAccount
} from '@/supabase-api/accounts';
import { updateCampaign } from '@/supabase-api/campaigns';
import { putCompany } from '@/supabase-api/companies';
import { callGetUserDetails } from '@/utils/shared-server-functions';

import {
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  InputLabel
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(name: string, personName: string[]) {
  return {};
}
/*
full_name
Title
Contact Email
Company Name
Product/Services Description
Website Link

*/
const validationSchema = yup.object({
  company_name: yup.string().required('Company Name is required'),
  industry: yup.string().required('Industry is required'),
  company_website: yup.string().required('Company Website is required'),
  full_name: yup.string().required('Full Name is required'),
  title: yup.string().required('Title is required'),
  email: yup.string().email().required('Email is required')
});
const CampaignForm = () => {
  //   const [effects, setEffects] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>({});
  const [account, setAccount] = useState<any>({});
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const userData = await callGetUserDetails();
      console.log('use is ', userData);
      setUser(userData);
      const accountData: any = await getAccount(userData?.id);
      console.log('account data is ', accountData);
      setAccount(accountData?.data);
    };
    getData();
  }, []);
  useEffect(() => {
    const setData = async () => {
      if (account) {
        formik.setFieldValue('company_name', account?.companies?.name);
        formik.setFieldValue('industry', account?.companies?.industry);
        formik.setFieldValue(
          'company_website',
          account?.companies?.company_website
        );
        formik.setFieldValue('full_name', account?.full_name);
        formik.setFieldValue('title', account?.title);
        formik.setFieldValue('email', account?.email);
      }
    };
    setData();
  }, [account]);

  const formik = useFormik({
    initialValues: {
      company_name: account?.name || '',
      industry: account?.industry || '',
      company_website: account?.company_website || '',
      full_name: account?.full_name || '',
      title: account?.title || '',
      email: account?.email || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('submitting values ', values);

      const companyResult = await putCompany(account?.company_id, {
        name: values.company_name,
        industry: values.industry,
        company_website: values.company_website
      });

      if (companyResult?.data) {
        const accountResult = await putAccount(account?.id, {
          company_id: companyResult?.data?.id,
          user_id: user?.id,
          full_name: values.full_name,
          title: values.title,
          email: values.email
        });
        setAccount(accountResult?.data);
        console.log('account result', accountResult);
      }
    }
  });

  return (
    <div className="sm:w-2/3 w-full">
      <h1 className="text-3xl text-black font-medium">Account Settings</h1>
      <form
        className=" border-2 border-zinc-300 rounded-xl p-5 flex flex-col gap-10 "
        onSubmit={formik?.handleSubmit}
      >
        <div className="">
          <InputLabel className="mb-1"> Company Name:</InputLabel>
          <TextField
            fullWidth
            id="company_name"
            name="company_name"
            label="Company Name"
            value={formik?.values.company_name}
            onChange={formik?.handleChange}
            error={
              formik?.touched.company_name &&
              Boolean(formik?.errors.company_name)
            }
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.company_name as string}
          </p>
        </div>
        <div className="">
          <InputLabel className="mb-1"> Industry:</InputLabel>
          <TextField
            fullWidth
            id="industry"
            name="industry"
            label="Industry Name"
            value={formik?.values.industry}
            onChange={formik?.handleChange}
            error={formik?.touched.industry && Boolean(formik?.errors.industry)}
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.industry as string}
          </p>
        </div>
        <div className="">
          <InputLabel className="mb-1"> Company Website:</InputLabel>
          <TextField
            fullWidth
            id="company_website"
            name="company_website"
            label="Company Website"
            value={formik?.values.company_website}
            onChange={formik?.handleChange}
            error={
              formik?.touched.company_website &&
              Boolean(formik?.errors.company_website)
            }
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.company_website as string}
          </p>
        </div>

        <div className="">
          <InputLabel className="mb-1"> Full Name:</InputLabel>
          <TextField
            fullWidth
            id="full_name"
            name="full_name"
            label="Full Name"
            value={formik?.values.full_name}
            onChange={formik?.handleChange}
            error={
              formik?.touched.full_name && Boolean(formik?.errors.full_name)
            }
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.full_name as string}
          </p>
        </div>
        <div className="">
          <InputLabel className="mb-1"> Title:</InputLabel>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik?.values.title}
            onChange={formik?.handleChange}
            error={formik?.touched.title && Boolean(formik?.errors.title)}
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.title as string}
          </p>
        </div>
        <div className="">
          <InputLabel className="mb-1"> Email:</InputLabel>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik?.values.email}
            onChange={formik?.handleChange}
            error={formik?.touched.email && Boolean(formik?.errors.email)}
          />
          <p className="text-red-500 text-sm">
            {formik?.errors.email as string}
          </p>
        </div>

        <button
          type="submit"
          className="w-1/2 mx-auto rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
