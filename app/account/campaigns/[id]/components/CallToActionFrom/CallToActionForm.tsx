'use client';

import Card from '@/components/ui/Card/Card';
import {
  getLinkActionWithCampaignId,
  getPromoActionWithCampaignId,
  updateLinkActionWithCampaignId,
  upsertPromoActionWithCampaignId
} from '@/supabase-api/callToAction';
import { Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { supabase } from '@/supabase-api';

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
  prompt: yup.string().required('Prompt is required'),

  link: yup.string().required('Link is required')
});
const CallToActionForm = ({ campaign }: any) => {
  const [promoAction, setPromoAction] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await callGetUserDetails();
      setUser(userData);
    };
    fetchUser();
  }, [campaign]);
  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaign?.id) {
        const promoActionData = await getPromoActionWithCampaignId(
          campaign?.id
        );
        formik.setFieldValue('prompt', promoActionData?.data?.prompt);

        formik.setFieldValue('link', promoActionData?.data?.link);
        setPromoAction(promoActionData?.data);
      }
    };
    fetchAccountData();
  }, [campaign]);

  const formik = useFormik({
    initialValues: {
      prompt: promoAction?.prompt || '',
      link: promoAction?.link || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var re = /(?:\.([^.]+))?$/;

      var ext = file?.name.substr(file?.name.lastIndexOf('.') + 1);
      const uploadName = campaign.id + '.' + ext;
      const { data, error } = await supabase.storage
        .from('images')
        .upload(uploadName, file, {
          cacheControl: '3600',
          upsert: true
        });
      if (error) {
        console.log(error);
      } else {
        await upsertPromoActionWithCampaignId(campaign.id, {
          campaign_id: campaign.id,
          prompt: values?.prompt,
          link: values?.link,
          image_name: uploadName
        });
      }
    }
  });
  const onFileChange = (event: any) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl text-black font-medium">
        Configure Call To Action
      </h1>

      <form
        className=" border-2 border-zinc-300 rounded-xl p-5 flex flex-col gap-10"
        onSubmit={formik?.handleSubmit}
      >
        <div>
          <InputLabel className="mb-4">Prompt:</InputLabel>
          <TextField
            fullWidth
            id="prompt"
            name="prompt"
            label="Prompt"
            value={formik?.values.prompt}
            onChange={formik?.handleChange}
            error={formik?.touched.prompt && Boolean(formik?.errors.prompt)}
          />
        </div>

        <div>
          <InputLabel className="mb-4">Promo Image:</InputLabel>
          <input type="file" onChange={onFileChange} />
          <p className="text-black">File Name: {file?.name}</p>
        </div>
        <div>
          <InputLabel className="mb-4">Link:</InputLabel>
          <TextField
            fullWidth
            id="link"
            name="link"
            label="link"
            value={formik?.values.link}
            onChange={formik?.handleChange}
            error={formik?.touched.link && Boolean(formik?.errors.link)}
          />
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

export default CallToActionForm;
