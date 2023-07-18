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
      const { data } = supabase.storage
        .from('effect-previews')
        .getPublicUrl(effect?.preview_file);

      setEffectPreview(data.publicUrl);
    };
    if (effect) {
      getEffect();
    }
  }, [effect]);

  return (
    <div className="text-black flex flex-col md:flex-row justify-around items-center gap-10 ">
      <div className="h-[90%] w-[90%] md:w-1/2 p-5 bg-gray-200 rounded-xl">
        {' '}
        {effectPreview && (
          <Player
            muted
            autoPlay={true}
            playsInline
            src={effectPreview}
            poster="/loadingDots.svg"
          >
            <ControlBar autoHide={true} className="opacity-0" />
          </Player>
        )}
      </div>
      <div className="border-4 border-gray-400 rounded-xl p-5 flex flex-col gap-5">
        <h1 className="text-xl font-bold">{effect?.name}</h1>
        <h1 className="text-gray-900">State: {effect?.state}</h1>
        <a href={effect?.public_link} target="_blank">
          <button
            type="submit"
            className="w-1/2 mx-auto rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View
          </button>
        </a>
      </div>
    </div>
  );
};

export default EffectPage;
