
import React from 'react';
import Textbutton from './Textbutton';

const Text2 = () => {


  return (
    <div
    className='sm:py-8 pb-8 sm:pb-0 mb-8 sm:mb-20'>
      <div className={`flex flex-col pb-6 pt-10 justify-center text-left space-y-3 w-full md:w-2/3 pl-6 pr-4 sm:pr-0 sm:pl-0
       sm:mx-auto sm:px-4 `}>
        <h4 className='text-2xl md:text-2xl font-semibold font-inter sm:text-left sm:pl-5 text-center md:text-left'>
          We’re Unique
        </h4>
        <div
          className={` sm:pl-5 xl:pr-10  xl::pl-40 pt-5 md:pt-5 space-y-6 
          text-left text-black md:text-left `}
        >
          <h4 className='font-semibold leading-loose font-inter tracking-[1px] text-lg md:text-[16px]'>Finprime is a global consulting firm with its office in the heart of Dubai, Business Bay</h4>
          <p className='leading-loose text-md sm:text-[14px] font-inter'>We understand the true spirit of each entrepreneur and help resolve their 
            challenges and partner with them to achieve their biggest dreams. Our success depends on the deep bond we have with our customers, and a 
            divergent and resilient team that ensures the expectation of clients are always exceeded.</p>
          <p className='leading-loose text-md sm:text-[16px] font-inter'></p>
          
        </div>
      </div>
      <Textbutton />
    </div>
  );
}

export default Text2;

