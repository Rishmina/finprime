
import React from 'react';
import BUSINESS_VALUATION from '../../images/servicecard/subservices/BUSINESS_VALUATION.jpg'
import INTERNATIONAL_TAXATION from '../../images/servicecard/subservices/INTERNATIONAL_TAXATION.jpg'


const Servicesection7 = () => {
  return (
    <div className='mt-10 sm:mt-20 xl:ml-12  xl:mr-10 lg:ml-10 lg:mr-8 md:mr-6 md:ml-8 ml-6 mr-4'>
        <div className="flex flex-col md:flex-row h-[500px] lg:h-[500px]">
 
      <div className="w-full md:w-1/2">
        <img
          src={BUSINESS_VALUATION} 
          alt="Professional Testimonials of finprime"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center sm:px-10 lg:px-20">
        <h4 className="text-3xl mt-5 sm:mt-0 sm:text-2xl lg:text-4xl font-semibold tracking-[1px] font-inter mb-4">Finprime professionals share their stories</h4>
        <p className="text-sm sm:text-[16px] tracking-[1px] leading-6 font-inter mb-6">
          This is a short paragraph describing the service offered in this section. It provides insights and information about the features and benefits of the service.
        </p>
        <button className="w-full text-left mt-4">
            <span className="bg-transparent text-black border lg:text-md text-sm border-black  sm:text-[16px] tracking-[1px] leading-6 font-inter
             py-3 px-4  transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                Learn More
            </span>
        </button>
      </div>
    </div>
    <div className="flex mt-20 h-[500px] md:h-[500px] lg:h-[500px]">
      <div className="flex flex-col-reverse md:flex-row h-auto">
  
  <div className="w-full md:w-1/2 flex flex-col justify-center sm:px-6 lg:px-20 py-6 lg:py-0">
    <h2 className="text-3xl sm:text-2xl lg:text-4xl tracking-[1px] font-semibold font-inter mb-4">
    Finprime professionals share their stories
    </h2>
    <p className="text-sm sm:text-[16px] tracking-[1px] leading-6  font-inter mb-6">
      This is a short paragraph describing the service offered in this section. It provides insights and information about the features and benefits of the service.
    </p>
    <button className="w-full text-left mt-4">
      <span className="bg-transparent text-black border lg:text-md text-sm border-black sm:text-[16px] tracking-[1px] leading-6 font-inter
        py-2 lg:py-3 px-4 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
        Learn More
      </span>
    </button>
  </div>

  <div className="w-full md:w-1/2 ">
    <img
      src={INTERNATIONAL_TAXATION} 
      alt="Professional Testimonials of finprime"
      className="w-full h-full object-cover"
    />
  </div>
</div>

    </div>
    </div>
  );
};

export default Servicesection7;
