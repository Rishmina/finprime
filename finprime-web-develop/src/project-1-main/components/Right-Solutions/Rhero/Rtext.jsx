import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Rtext = () => {
    return (
        <div className='max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16'>
            <h1 className='text-4xl sm:text-5xl font-extralight text-black text-center'>
                Why Work With <br />
                <span className='font-bold'>
                    FinPrime Consulting?
                </span>
            </h1>
            <p className='mt-6 max-w-4xl mx-auto text-gray-600 font-normal leading-7 text-base text-center'>
                We believe that every client's journey is unique and hence our approach is never a one-size-fits-all. We take the time to understand your business from the ground up—its operations, goals, challenges, and the environment in which it operates—before crafting tailored financial and compliance solutions that drive sustainable value.
            </p>
            <div className="mt-12 max-w-4xl mx-auto">
                <div className="flex items-center  px-6 py-4 rounded-full border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 shadow-sm w-full md:w-auto">
                    <span className="text-gray-400 text-sm flex-1 text-left">Advance the World drive positive social impacts.</span>
                    <FiArrowRight className="w-5 h-5 text-gray-400 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default Rtext;
