import React from 'react';

const Rtext = () => {
  return (
    <div className=' flex  flex-col  items-center bg-gray-200'>
      <p className="animate-fadeinbottom text-3xl sm:text-3xl md:text-6xl  mb-3 bg-gray-200 mt-10"> OUR APPROACH</p>
      <div className=" flex justify-center items-center md:pt-20 pb-5 md:pb-20 bg-gray-200 ">
        <div className="flex w-[70%] justify-between px-6">
          <p className="text-xs text-gray-700 md:w-[60%]">
          </p>
          <p className="animate-fadeinbottom  text-[18px]  text-gray-700 md:w-[60%] text-left">
            We believe that every client's journey is unique and hence our approach is never a one-size-fits-all. We take the time to understand your business from the ground up—its operations, goals, challenges, and the environment in which it operates—before crafting tailored financial and compliance solutions that drive sustainable value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rtext;
