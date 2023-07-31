'use client';

import {
  getAccount,
  getAccountWithAccountId,
  putAccount
} from '@/supabase-api/accounts';
import { putCompany } from '@/supabase-api/companies';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  InputLabel,
  AlertProps
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      const userData = await callGetUserDetails();
      setUser(userData);
      const accountData: any = await getAccount(userData?.id);
      setAccount(accountData?.data);
      setLoading(false);
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
        formik.setErrors({});
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
        if (accountResult?.data) {
          setOpen(true);
          setAccount(accountResult?.data);
        }
      }
    }
  });

  return (
    <div>
      {loading ? (
        <div className="m-100" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 p-100"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="sm:w-2/3 w-full">
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Saved Settings
            </Alert>
          </Snackbar>
          <h1 className="text-3xl text-black font-medium">Account Settings</h1>
          <form
            className=" border-2 border-zinc-300 rounded-xl p-5 flex flex-col gap-10 "
            onSubmit={formik?.handleSubmit}
          >
            <div className="">
              {/* <InputLabel className="mb-1"> Company Name:</InputLabel> */}
              <TextField
                fullWidth
                id="company_name"
                name="company_name"
                label="Company Name"
                value={formik?.values.company_name}
                onChange={formik?.handleChange}
                error={Boolean(formik?.errors.company_name)}
              />
              <p className="text-red-500 text-sm">
                {formik?.errors.company_name as string}
              </p>
            </div>
            <div className="">
              {/* <InputLabel className="mb-1"> Industry:</InputLabel> */}
              <TextField
                fullWidth
                id="industry"
                name="industry"
                label="Industry"
                value={formik?.values.industry}
                onChange={formik?.handleChange}
                error={
                  formik?.touched.industry && Boolean(formik?.errors.industry)
                }
              />
              <p className="text-red-500 text-sm">
                {formik?.errors.industry as string}
              </p>
            </div>
            <div className="">
              {/* <InputLabel className="mb-1"> Company Website:</InputLabel> */}
              <TextField
                fullWidth
                id="company_website"
                name="company_website"
                label="Company Website"
                value={formik?.values.company_website}
                onChange={formik?.handleChange}
                error={Boolean(formik?.errors.company_website)}
              />
              <p className="text-red-500 text-sm">
                {formik?.errors.company_website as string}
              </p>
            </div>

            <div className="">
              {/* <InputLabel className="mb-1"> Full Name:</InputLabel> */}
              <TextField
                fullWidth
                id="full_name"
                name="full_name"
                label="Full Name"
                value={formik?.values.full_name}
                onChange={formik?.handleChange}
                error={Boolean(formik?.errors.full_name)}
              />
              <p className="text-red-500 text-sm">
                {formik?.errors.full_name as string}
              </p>
            </div>
            <div className="">
              {/* <InputLabel className="mb-1"> Title:</InputLabel> */}
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik?.values.title}
                onChange={formik?.handleChange}
                error={Boolean(formik?.errors.title)}
              />
              <p className="text-red-500 text-sm">
                {formik?.errors.title as string}
              </p>
            </div>
            <div className="">
              {/* <InputLabel className="mb-1"> Email:</InputLabel> */}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik?.values.email}
                onChange={formik?.handleChange}
                error={Boolean(formik?.errors.email)}
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
      )}
    </div>
  );
};

export default CampaignForm;
