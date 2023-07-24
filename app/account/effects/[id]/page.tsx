'use client';

import { supabase } from '@/supabase-api';
import { getCampaign } from '@/supabase-api/campaigns';
import { getEffect } from '@/supabase-api/effects';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Player, ControlBar, PlayerReference, PlayerProps } from 'video-react';
import 'video-react/dist/video-react.css';

// import css

const EffectPage = () => {
  const [effectPreview, setEffectPreview] = useState<string | null>(null);
  const [effect, seteffect] = useState<any>(null);

  const params = useParams();
  const effectId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const effectData = await getEffect(parseInt(effectId));

      if (!effectData?.error) {
        seteffect(effectData?.data);
      }
    };
    if (effectId) {
      fetchData();
    }
  }, [effectId]);

  useEffect(() => {
    const getEffect = async () => {
      // get video
      if (effect?.preview_file) {
        const { data } = supabase.storage
          .from('effect-previews')
          .getPublicUrl(effect?.preview_file);

        setEffectPreview(data.publicUrl);
      }
    };

    if (effect) {
      getEffect();
    }
  }, [effect]);

  return (
    <div className="text-black flex flex-col md:flex-row justify-around items-center gap-10 ">
      {effectPreview && (
        <div className="h-[90%] w-[90%] md:w-1/2 p-5 bg-gray-200 rounded-xl">
          {' '}
          <Player
            muted
            autoPlay={true}
            playsInline
            src={effectPreview}
            poster="/loadingDots.svg"
          >
            <ControlBar autoHide={true} className="opacity-0" />
          </Player>
        </div>
      )}
      <div className="border-4 border-gray-400 rounded-xl p-5 flex flex-col gap-5 min-w-[200px]">
        <h1 className="text-xl font-bold">{effect?.name}</h1>
        <h1 className="text-gray-900">State: {effect?.state}</h1>
        <button
          className="w-[75px] text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              effect?.public_link,
              '_blank' // <- This is what makes it open in a new window.
            );
          }}
        >
          {' '}
          View
        </button>
      </div>
    </div>
  );
};

export default EffectPage;
