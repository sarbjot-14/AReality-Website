'use client';

import { getAccountWithAccountId } from '@/supabase-api/accounts';
import { updateCampaign } from '@/supabase-api/campaigns';

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

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  effect: yup.number().required('Password is required')
});
const CampaignForm = ({ campaign }: any) => {
  const [effects, setEffects] = useState<any>(null);

  const [account, setAccount] = useState<any>({});

  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaign?.id) {
        const accountData = await getAccountWithAccountId(campaign?.account_id);

        setAccount(accountData?.data);

        setEffects(accountData?.data?.effects);

        formik.setFieldValue('title', campaign.title);
        formik.setFieldValue('effect', campaign?.effects?.id);
      }
    };
    fetchAccountData();
  }, [campaign]);

  const formik = useFormik({
    initialValues: {
      title: campaign?.title || '',
      effect: campaign?.effect || 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // update title and effect
      await updateCampaign(campaign.id, {
        effect_id: values?.effect,
        title: values?.title
      });
    }
  });

  return (
    <div className="sm:w-2/3 w-full">
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
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
