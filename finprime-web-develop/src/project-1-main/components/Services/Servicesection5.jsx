import React from 'react';
import { Link } from 'react-router-dom';
import { Services } from '../Services';

import { useLocation, useParams } from 'react-router-dom';

const Servicesection5 = () => {
  const { servicetitle, subServicetitle } = useParams();
  const service = Services.find((s) =>
    s.title.replace(/\s+/g, '-') === servicetitle);
  const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);


  // const location = useLocation();
  // const { service_id, subtitles_id } = location.state ?? {};
  // const service = Services.find((s) => s.id === service_id);
  // console.log(service);
  // const subService = service?.subtitles.find((sub) => sub.subid === subtitles_id);
  return (
    <div className="mx-w-full h-[160px] mt-16 bg-brandBlue px-5 sm:px-16 flex items-center justify-between
    xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:mr-6 md:ml-8 ml-6 mr-4">

      <div>
        <h4 className="text-lg text-white md:text-3xl lg:text-4xl pb-2 font-bold">Direct Your Inbox</h4>
        <p className="text-xs text-white tracking-[1px] font-inter sm:text-[16px]">Stay up to date with our Editor's picks newsletter.</p>
      </div>
      <div>
        <Link to={`/form2/${service.id}/${subService.subid}`} className="bg-transparent text-xs md:text-[16px] tracking-[1px] text-white border border-white font-semibold py-2 sm:py-3 font-inter px-3 sm:px-10 transition-all duration-300 
        ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          Enquiry
        </Link>
      </div>
      {/* <div>
        <Link to="/contactus#subscribe"  className="bg-transparent text-xs md:text-[16px] tracking-[1px] text-white border border-white font-semibold py-2 sm:py-3 font-inter px-3 sm:px-10 transition-all duration-300 
        ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          Subscribe
        </Link>
      </div> */}
    </div>
  );
};

export default Servicesection5;
