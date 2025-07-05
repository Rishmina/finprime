import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Services } from '../Services';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import audit from '../../images/audit.png';

const Servicesection2 = () => {

  const { servicetitle, subServicetitle } = useParams();
  const service = Services.find((s) =>
    s.title.replace(/\s+/g, '-') === servicetitle);
  const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);

  const location = useLocation();

  // If service or sub-service not found, return error message
  if (!service || !subService) {
    return <div className="mt-10 text-xl font-bold text-center text-red-500">Sub-service not found</div>;
  }

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const isExternalAudit = subService.headsubtitle === 'External Audit';

  return (
    <div className='bg-white mt-[100px] sm:mt-[150px] mb-16 sm:mb-[150px] xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6 pr-4 pl-6'>
      {isExternalAudit ? (
        // Layout for External Audit
        <div>
          <div className="flex items-start">
            <div className='text-6xl sm:text-7xl font-extralight leading-none text-black'>|</div>
            <div className='pl-2 -mt-1'>
              <div className='text-3xl sm:text-4xl md:text-5xl font-light font-["Kulim_Park"]'>{subService.headsubtitle}</div>
            </div>
          </div>

          <div className='w-full font-["Inter"] px-2 text-[16px] leading-7 tracking-[0.5px] text-gray-700 mt-8'>
            <div className='mb-6' dangerouslySetInnerHTML={{ __html: subService.subcontent }}></div>
            <Link
              to={`/form2/${service.id}/${subService.subid}`}
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] text-white py-3 px-8 text-sm font-semibold rounded-full hover:opacity-90 transition-all duration-300"
            >
              Enquiry
            </Link>
          </div>

          <div className="flex flex-wrap mt-12 sm:mt-28 ">
            {service.subtitles.map((sub) => (
              <Link
                to={`/services/${service.title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                state={{ "service_id": service.id, "subtitles_id": sub.subid }}
                key={sub.subid}
                className={`border border-cyan-500 py-3 sm:py-4 px-4 text-xs sm:text-[16px] sm:px-8 mb-5 mr-1 sm:mr-4 rounded-[5px] tracking-[1px] hover:bg-gray-100 transition-all ${sub.keyword.replace(/\s+/g, '-') === subServicetitle ? 'text-cyan-500' : 'text-black'}`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="text-center ">
                  {sub.headsubtitle}
                </span>
              </Link>
            ))}
          </div>

          <div className="my-8">
            <div className="relative mt-8">
              <img src={audit} alt="Audit Background" className="w-full h-auto object-cover rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        // Original Layout for other pages
        <>
          <div id='service-two' className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className='flex items-start w-full lg:w-auto'>
              <div className='text-6xl sm:text-7xl font-extralight leading-none text-[#06B6D4]'>|</div>
              <div className='pl-2 -mt-1'>
                <div className='text-xl sm:text-2xl md:text-3xl font-normal font-["Kulim_Park"] text-gray-600'>{service.headtitle}</div>
                <div className='text-3xl sm:text-4xl md:text-5xl font-bold font-["Kulim_Park"] mt-2'>{subService.headsubtitle}</div>
              </div>
            </div>
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-end mt-8 lg:mt-0 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Read more</span>
                <div className="w-px h-6 bg-gray-400"></div>
                <span className="text-sm font-semibold">Follow</span>
              </div>
              <Link
                to={`/form2/${service.id}/${subService.subid}`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] text-white py-3 px-8 text-sm rounded-[25px] hover:opacity-90 transition-all duration-300 mt-4"
              >
                Make an Appointment
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Trustpilot</span>
                <span className="text-sm">Google</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-12">
            <div className='w-full font-["Inter"] px-2 text-[16px] leading-7 tracking-[0.5px] text-black'>
              <div className='mb-12' dangerouslySetInnerHTML={{ __html: subService.subcontent }}></div>
            </div>
            <div className="flex flex-wrap mt-12 sm:mt-28 ">
              {service.subtitles.map((sub) => (
                <Link
                  to={`/services/${service.title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                  state={{ "service_id": service.id, "subtitles_id": sub.subid }}
                  key={sub.subid}
                  className="border  border-gray-300 py-3 sm:py-4 px-4 text-xs sm:text-[16px] sm:px-8 mb-5 mr-1 sm:mr-4 rounded-[5px] tracking-[1px] hover:bg-gray-100 transition-all"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="text-center ">
                    {sub.headsubtitle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Servicesection2;
