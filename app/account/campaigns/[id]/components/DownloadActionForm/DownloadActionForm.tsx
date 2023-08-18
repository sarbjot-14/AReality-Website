'use client';

import Card from '@/components/ui/Card/Card';
import {
  getDownloadActionWithCampaignId,
  getPromoActionWithCampaignId,
  upsertDownloadActionWithCampaignId,
  upsertPromoActionWithCampaignId
} from '@/supabase-api/callToAction';
import { Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { callGetUserDetails } from '@/utils/shared-server-functions';
import { supabase } from '@/supabase-api';
import Snackbar from '@mui/material/Snackbar';
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
  prompt: yup.string().required('Prompt is required')
});
const DownloadActionForm = ({ campaign, settingCampaign }: any) => {
  const previewAdLink = 'https://effect-campaign.vercel.app';
  const [downloadAction, setDownloadAction] = useState<any>(null);

  const [file, setFile] = useState<any>(null);
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
      if (campaign?.id) {
        const downloadActionData = await getDownloadActionWithCampaignId(
          campaign?.id
        );
        console.log('download data ', downloadActionData);

        setDownloadAction(downloadActionData?.data);
      }
    };
    fetchAccountData();
  }, [campaign]);
  useEffect(() => {
    const fetchAccountData = async () => {
      if (downloadAction) {
        formik.setFieldValue('prompt', downloadAction?.prompt);

        formik.setErrors({});
      }
    };
    fetchAccountData();
  }, [downloadAction]);

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    initialValues: {
      prompt: downloadAction?.prompt || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var ext = file?.name.substr(file?.name.lastIndexOf('.') + 1);
      const uploadName = campaign.id + '.' + ext;
      if (file) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(uploadName, file, {
            cacheControl: '3600',
            upsert: true
          });
      }

      const actionData = await upsertDownloadActionWithCampaignId({
        ...downloadAction,
        campaign_id: campaign.id,
        prompt: values?.prompt,
        image_name: file ? uploadName : null
      });
      console.log('action data is ', actionData);

      if (actionData?.data) {
        settingCampaign(campaign?.id, {
          ...campaign,
          call_to_action_type: 'download'
        });
        setOpen(true);
        setDownloadAction(actionData?.data);
      }
    }
  });
  const onFileChange = (event: any) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={formik?.handleSubmit}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Saved Settings
        </Alert>
      </Snackbar>
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
        <p className="text-red-500 text-sm">
          {formik?.errors?.prompt as string}
        </p>
      </div>

      <div>
        <InputLabel className="mb-4">Download Image:</InputLabel>
        <input type="file" onChange={onFileChange} />
        <p className="text-black">File Name: {file?.name}</p>
      </div>

      <div className="flex justify-around p-5">
        {' '}
        <button
          type="submit"
          className="w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Save
        </button>
        {downloadAction && (
          <button
            className="w-1/3 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                previewAdLink + `?campaign=${campaign?.id}&t=true`,
                '_blank' // <- This is what makes it open in a new window.
              );
            }}
          >
            {' '}
            Preview Ad Campaign
          </button>
        )}
      </div>
    </form>
  );
};

export default DownloadActionForm;
