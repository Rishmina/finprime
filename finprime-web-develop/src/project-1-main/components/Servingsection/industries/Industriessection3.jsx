import React from 'react';
import { Industries } from '../../Industries';
import { useParams } from 'react-router-dom';


const Industriessection3 = () => {




  const { industriestitle, subindustrytitle } = useParams();
  
  const industry = Industries.find((s) => s.title === industriestitle);
  const subIndustry = industry?.subindustries.find((sub) => sub.title === subindustrytitle);
  

  if (!industry || !subIndustry) return <div>Sub-Industry not found</div>;




  return (
    <div className="relative mb-24">
      <img
        src={industry.image}
        alt={industry.alt}
        className="w-full h-[500px] object-cover"
      />

      <div className="absolute pl-6 text-right text-white top-20 md:pl-8 right-4 md:right-6 lg:right-8 xl:right-10 xl:pl-12 lg:pl-10">
       
        <h4 className="text-4xl font-bold md:text-4xl xl:text-9xl font-inter">{industry.headtitle}</h4>

        <p className='text-lg md:pl-20 '></p>
      </div>
    </div>
  );
};

export default Industriessection3;
