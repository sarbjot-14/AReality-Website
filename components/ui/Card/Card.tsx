import React from 'react';

const Card = ({ name, description }: any) => {
  return (
    // <a
    //   href="#"
    //   className="block max-w-xs w-44 m-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    // >
    <div className="block cursor-pointer max-w-xs w-36 h-32  p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden truncate">
        {description}
      </p>
    </div>
    // </a>
  );
};

export default Card;
