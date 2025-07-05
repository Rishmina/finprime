import React from 'react';
import FINANCIAL_REPORTING from '../../images/servicecard/subservices/FINANCIAL_REPORTING.jpg'

const Servicesection9 = () => {
  return (
    <div className="md:mx-w-full md:h-[400px]  flex flex-col md:flex-row lg:h-500px mb-20  xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:ml-8 md:mr-6 ml-6 mr-4">
      {/* First Column */}
      <div className="w-full md:w-1/2    justify-center text-left md:px-10 md:py-16 lg:px-24">
        <h4 className="text-4xl font-semibold font-inter tracking-[1px] mb-4 ">Careers at Finprime</h4>
        <p className="text-md sm:text-[16px] tracking-[1px]  font-inter mb-4 ">At Finprime, you’ll have the chance to build a career as unique as you are, with
          the global scale, support, inclusive culture and technology to become the best version of you.</p>

        <h4 className="text-xl font-semibold tracking-[1px]  font-inter mb-4 ">experienced professionals</h4>
        <span className='mb-4 border-b border-black'></span>
        <h4 className="text-xl font-semibold mb-5 tracking-[1px]  font-inter sm:mb-0">Students</h4>

      </div>

      <div className="w-full md:w-1/2 ">
        <img
          src={FINANCIAL_REPORTING}
          alt="Careers at Finprime"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Servicesection9;
