'use client';

import { getAccountWithAccountId } from '@/supabase-api/accounts';
import { updateCampaign } from '@/supabase-api/campaigns';
import {
  updateCampaignLocations,
  resetLocations
} from '@/supabase-api/locations';
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
  const [locations, setLocations] = useState<any>([]);

  const [account, setAccount] = useState<any>({});

  useEffect(() => {
    const fetchAccountData = async () => {
      if (campaign?.id) {
        const accountData = await getAccountWithAccountId(campaign?.account_id);

        setAccount(accountData?.data);

        setEffects(accountData?.data?.effects);
        setLocations(accountData?.data?.locations);
        formik.setFieldValue('title', campaign.title);
        formik.setFieldValue('effect', campaign?.effects?.id);
        formik.setFieldValue(
          'locations',
          campaign?.locations.map((loc: any) => {
            return loc.name;
          })
        );
      }
    };
    fetchAccountData();
  }, [campaign]);

  const formik = useFormik({
    initialValues: {
      title: campaign?.title || '',
      effect: campaign?.effect || 0,
      locations: campaign?.locations || []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // update title and effect
      await updateCampaign(campaign.id, {
        effect_id: values?.effect,
        title: values?.title
      });
      // update previous locations campaign id to null
      await resetLocations(campaign.id);
      // update campaign with new locations
      for (let i = 0; i < account.locations.length; i++) {
        if (values?.locations.includes(account.locations[i].name)) {
          await updateCampaignLocations(account.locations[i].id, campaign.id);
        }
      }
    }
  });
  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value }
    } = event;
    formik.setFieldValue(
      'locations',
      typeof value === 'string' ? value.split(',') : value
    );
  };

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

        <div>
          <InputLabel className="mb-4"> Locations:</InputLabel>{' '}
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={formik?.values.locations}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {locations?.map((loc: any) => (
              <MenuItem
                key={loc.id}
                value={loc.name}
                style={getStyles(loc.name, loc)}
              >
                {loc.name}
              </MenuItem>
            ))}
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
