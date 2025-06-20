import React, { useState } from 'react';
import { Industries } from '../../Industries';
import { Link, useParams } from 'react-router-dom';


const Industriessection4 = () => {




  const { industriestitle, subindustrytitle } = useParams();
  
  const industry = Industries.find((s) => s.title === industriestitle);
  const subIndustry = industry?.subindustries.find((sub) => sub.title === subindustrytitle);
  

  if (!industry || !subIndustry) return <div>Sub-Industry not found</div>;



  const [showMore, setShowMore] = useState(false);


  const visibleColumns = showMore ? industry.subindustries : industry.subindustries.slice(0, 3);

  return (
    <div className="mt-20 mb-10 ml-6 mr-4 sm:mb-20 xl:mr-10 xl:ml-12 lg:mr-8 lg:ml-10 md:mr-6 md:ml-8">
      
      <div className="mb-8">
        <h4 className="mb-2 text-4xl font-semibold sm:text-5xl">Related Industries</h4>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 wrapper">
      {visibleColumns.map((subIndustry) => (
          <Link 
          to={`/${industry.title}/${subIndustry.title}`} 
          key={subIndustry.id} className="border card">
            <img
              src={subIndustry.image}
              alt={subIndustry.alt}
              className="w-full h-auto "
            />
            <div className="info">
              <h4 className="text-xl font-bold mb-5 sm:text-[28px] text-white">{subIndustry.headtitle}</h4>
              <p className="text-white font-inter tracking-[1px] text-[16px]">{subIndustry.content.split(' ').slice(0, 10).join(' ')}{subIndustry.content.split(' ').length > 10 ? '...' : ''}</p>
            </div>
          </Link>
          
        ))}
      </div>
      

      {!showMore && (
        <div className="mt-8 text-center">
          <button
            className="px-4 py-1 mt-2 mb-10 text-xs text-black transition-all duration-300 ease-out bg-transparent border border-black md:text-base sm:py-2 sm:px-8 sm:mb-20 hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Industriessection4;
