import React, { useState } from 'react';
import { Link, useLocation, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { Industries } from '../../Industries';


const Industriessection2 = () => {
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  
  const { industriestitle, subindustrytitle } = useParams();
  
  const industry = Industries.find((s) => s.title === industriestitle);
  const subIndustry = industry?.subindustries.find((sub) => sub.title === subindustrytitle);
  

  if (!industry || !subIndustry) return <div>Sub-Industry not found</div>;


  const location = useLocation();

  useEffect(() => {
    const scrollToSection = (hash) => {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.hash) {
      scrollToSection(location.hash);
    } else {
      scrollToSection('hero-section'); 
      }
  }, [location]);

  
  


  return (
    <div 
    className='bg-white mt-[300px] sm:mt-[400px] mb-[150px]   xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6 pr-4 pl-6'>
      <div id='service-two' >
        <div className='flex pb-10 text-3xl font-semibold text-black sm:text-5xl font-inter'><div className='text-6xl sm:text-8xl font-extralight '>|</div> <div className='pb-5'>{subIndustry.headtitle}</div></div>
      </div>
      <div className="flex flex-col ">

        <div className='w-full  font-inter sm:px-2 text-md md:text-[16px] tracking-[1px] leading-7  text-black'>
          <p className='mb-12 '>
            {subIndustry.content}
          </p>
          <Link
            to={`/form/${industry.id}/${subIndustry.id}`}
            onClick={toggleReadMore}
            className="  bg-black text-white py-4 px-12 text-sm rounded-[5px] hover:border hover:border-black hover:bg-white hover:text-black"
          >
            Enquiry
          </Link>
        </div>
        <div className="flex flex-wrap mt-28 ">
        {industry.subindustries.map((sub) => (
          <Link
          to={`/${encodeURIComponent(industry.title)}/${encodeURIComponent(sub.title)}`} 
            key={sub.id} 
            className="border border-gray-300 py-3 sm:py-4 px-4 text-xs  sm:px-8 md:text-[16px] tracking-[1px] mb-5 mr-1 sm:mr-4 rounded-[5px] hover:bg-gray-100 transition-all"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
          >
            <span 
              
            id='subimdustry'
              className="text-center "
            >
              {sub.headtitle}
            </span>
          </Link>
        ))}
      </div>

      </div>

     
    </div>
  );
};

export default Industriessection2;

