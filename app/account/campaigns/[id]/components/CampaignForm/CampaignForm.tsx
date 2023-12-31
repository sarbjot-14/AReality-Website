'use client';

import { getAccount, getAccountWithAccountId } from '@/supabase-api/accounts';
import { upsertCampaign } from '@/supabase-api/campaigns';
import { callGetUserDetails } from '@/utils/shared-server-functions';

import {
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  InputLabel,
  Snackbar
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
  title: yup.string().required('Title is required'),
  effect: yup.number().required('Effect is required')
});
const CampaignForm = ({ campaign, settingCampaign }: any) => {
  const [effects, setEffects] = useState<any>(null);

  const [account, setAccount] = useState<any>({});
  const [campaignInfo, setCampaignInfo] = useState<any>({});
  const [open, setOpen] = useState(false);

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
    const fetchAccountData = async () => {
      if (campaign) {
        setCampaignInfo(campaign);
      }
      const user = await callGetUserDetails();
      const accountData: any = await getAccount(user?.id);

      setAccount(accountData?.data);
      setEffects(accountData?.data?.effects);
    };
    fetchAccountData();
  }, [campaign]);
  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaignInfo?.id) {
        formik.setFieldValue('title', campaignInfo.title);
        formik.setFieldValue('effect', campaignInfo?.effect_id);
        formik.setErrors({});
      }
    };
    fetchAccountData();
  }, [campaignInfo]);

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    initialValues: {
      title: campaignInfo?.title || '',
      effect: campaignInfo?.effect || 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // update title and effect
      const campaignData = await settingCampaign(campaignInfo?.id, {
        effect_id: values?.effect,
        title: values?.title,
        account_id: account?.id
      });
      if (campaignData?.data) {
        setOpen(true);

        setCampaignInfo(campaignData?.data);
      }
    }
  });

  return (
    <div className="w-full">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Saved Settings
        </Alert>
      </Snackbar>
      <h1 className="text-3xl text-black font-medium">1. Configure Campaign</h1>
      <form
        className=" border-2 border-zinc-300 rounded-xl p-5 flex flex-col gap-10 "
        onSubmit={formik?.handleSubmit}
      >
        <div>
          <InputLabel className="mb-4"> Title:</InputLabel>{' '}
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

        <div>
          <InputLabel className="mb-4"> Effect:</InputLabel>{' '}
          <Select
            fullWidth
            id="effect"
            name="effect"
            label="Effect"
            value={formik?.values.effect}
            onChange={formik?.handleChange}
            error={formik?.touched.effect && Boolean(formik?.errors.effect)}
          >
            {effects?.map((effect: any) => {
              return (
                <MenuItem key={effect.id} value={effect.id}>
                  {effect.name}
                </MenuItem>
              );
            })}
          </Select>
          <p className="text-red-500 text-sm">
            {formik?.errors.effect as string}
          </p>
        </div>

        <button
          type="submit"
          className="w-1/3 mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
