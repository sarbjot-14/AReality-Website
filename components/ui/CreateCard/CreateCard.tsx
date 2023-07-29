import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const CreateCard = ({ tooltipMessage, text }: any) => {
  return (
    <Tooltip placement="top" title={tooltipMessage}>
      <div className="flex flex-col justify-center items-center cursor-pointer w-32 h-32 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <h5 className="block mb-2 text-2xl font-bold tracking-tight text-gray-400 dark:text-white text-center">
          {text}
        </h5>
      </div>
    </Tooltip>
  );
};

export default CreateCard;
