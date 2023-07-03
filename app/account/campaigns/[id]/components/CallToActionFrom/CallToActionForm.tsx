'use client';

import {
  getLinkActionWithCampaignId,
  updateLinkActionWithCampaignId
} from '@/supabase-api/callToAction';
import { Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
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
  prompt: yup.string().required('Prompt is required'),
  icon: yup.string().required('Icon is required'),
  link: yup.string().required('Link is required')
});
const CallToActionForm = ({ campaign }: any) => {
  const [linkAction, setLinkAction] = useState<any>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaign?.id) {
        const linkActionData = await getLinkActionWithCampaignId(campaign?.id);
        formik.setFieldValue('prompt', linkActionData?.data?.prompt);
        formik.setFieldValue('icon', linkActionData?.data?.icon);
        formik.setFieldValue('link', linkActionData?.data?.link);
        setLinkAction(linkActionData?.data);
      }
    };
    fetchAccountData();
  }, [campaign]);

  const formik = useFormik({
    initialValues: {
      prompt: linkAction?.prompt || '',
      icon: linkAction?.icon || '',
      link: linkAction?.link || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateLinkActionWithCampaignId(campaign.id, {
        prompt: values?.prompt,
        link: values?.link,
        icon: values?.icon
      });
    }
  });

  const icons = ['TikTok', 'Instagram', 'Youtube', 'Facebook', 'Whatsapp'];

  return (
    <div className="sm:w-2/3 w-full">
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
          <InputLabel className="mb-4">Icon:</InputLabel>
          <Select
            fullWidth
            id="icon"
            name="icon"
            label="Icon"
            value={formik?.values.icon}
            onChange={formik?.handleChange}
            error={formik?.touched.icon && Boolean(formik?.errors.icon)}
          >
            {icons?.map((icon: any) => {
              return (
                <MenuItem key={icon} value={icon}>
                  {icon}
                </MenuItem>
              );
            })}
          </Select>
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
