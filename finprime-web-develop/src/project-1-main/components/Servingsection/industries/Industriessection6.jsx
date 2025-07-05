
import React from 'react';
import { Industries } from '../../Industries';
import { useParams } from 'react-router-dom';

const Industriessection6 = () => {




  const { industriestitle, subindustrytitle } = useParams();
  
  const industry = Industries.find((s) => s.title === industriestitle);
  const subIndustry = industry?.subindustries.find((sub) => sub.title === subindustrytitle);
  

  if (!industry || !subIndustry) return <div>Sub-Industry not found</div>;


  return (
    <div className='mt-10 mb-20 ml-6 mr-4 sm:mt-20 xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:mr-6 md:ml-8'>
        <div className="flex flex-col md:flex-row h-[500px] md:h-[400px] lg:h-[500px]">
      
      <div className="w-full md:w-1/2">
        <img
          src={subIndustry.image} 
          alt="Service Image"
          className="object-cover w-full h-full"
        />
      </div>


      <div className="flex flex-col justify-center w-full md:w-1/2 md:px-10 lg:px-20">
        <h5 className="text-3xl mt-5 sm:mt-0 sm:text-2xl lg:text-4xl tracking-[1px] font-semibold font-inter mb-4">Finprime professionals share their stories</h5>
        <p className="text-sm sm:text-[16px] leading-6 tracking-[1px] font-inter mb-6">
          This is a short paragraph describing the service offered in this section. It provides insights and information about the features and benefits of the service.
        </p>
        <button className="w-full mt-4 text-left">
            <span className="bg-transparent text-black border sm:text-[16px] text-sm border-black
             py-2 lg:py-3 px-4 tracking-[1px] font-inter transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                Learn More
            </span>
        </button>
      </div>
    </div>
    <div className="flex  sm:mt-20 h-[500px] md:h-[400px] lg:h-[500px]">
      <div className="flex flex-col-reverse h-auto md:flex-row">
  {/* Text Content */}
  <div className="flex flex-col justify-center w-full py-6 md:w-1/2 sm:px-6 lg:px-20 lg:py-0">
    <h4 className="text-3xl sm:text-2xl lg:text-4xl font-semibold tracking-[1px] font-inter mb-4">
    Finprime professionals share their stories
    </h4>
    <p className="text-sm sm:text-[16px] leading-6 tracking-[1px] font-inter mb-6">
      This is a short paragraph describing the service offered in this section. It provides insights and information about the features and benefits of the service.
    </p>
    <button className="w-full mt-4 text-left">
      <span className="bg-transparent text-black border sm:text-[16px] text-sm border-black
        py-2 lg:py-3 font-inter  tracking-[1px] px-4 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
        Learn More
      </span>
    </button>
  </div>

  <div className="w-full md:w-1/2 ">
    <img
      src={industry.image} 
      alt="Service Image"
      className="object-cover w-full h-full"
    />
  </div>
</div>

    </div>
    </div>
  );
};

export default Industriessection6;
