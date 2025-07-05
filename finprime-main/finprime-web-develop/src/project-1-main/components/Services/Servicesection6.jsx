import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Services } from '../Services';
import { Link } from 'react-router-dom';

const Servicesection6 = () => {
  const { servicetitle, subServicetitle } = useParams();
  const service = Services.find((s) =>
    s.title.replace(/\s+/g, '-') === servicetitle);
  const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);



  // const { servicetitle, subServicetitle } = useParams();

  // // Find the service based on the title
  // const service = Services.find((s) => s.title === servicetitle);
  // const subService = service?.subtitles.find((sub) => sub.subtitle === subServicetitle);

  // const location = useLocation();
  // const { service_id, subtitles_id } = location.state ?? {};
  // const service = Services.find((s) => s.id === service_id);
  // console.log(service);
  // const subService = service?.subtitles.find((sub) => sub.subid === subtitles_id);
  // If service or sub-service not found, return error message
  if (!service || !subService) {
    return <div className="mt-10 text-xl font-bold text-center text-red-500">Sub-service not found</div>;
  }



  return (
    <div className="pl-6 pr-4 mt-24 xl:pr-10 xl:pl-12 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6">

      <div className="mb-14">
        <h4 className="text-4xl sm:text-5xl font-inter tracking-[1px] font-md">Related Sub-Survices</h4>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3">
        {service.subtitles.map((sub) => (
          <div key={sub.subid} className="sm:pb-10">
            <h4 className="text-2xl font-inter hover-underline-animation tracking-[1px] cursor-pointer font-md mb-2"> <span >{sub.headsubtitle}</span> </h4>
            <p
              className="text-md tracking-[1px] font-inter sm:text-[16px]"
              dangerouslySetInnerHTML={{
                __html: sub.subcontent
                  .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
                  .replace(/\s+/g, " ") // Replace multiple spaces with a single space
                  .trim() // Remove leading and trailing spaces
                  .split(" ")
                  .slice(0, 10)
                  .join(" ") + "...",
              }}
            ></p>



            {/*             
            <p className="text-md tracking-[1px] font-inter sm:text-[16px]">{sub.subcontent.split(' ').slice(0, 10).join(' ')}{sub.subcontent.split(' ').length > 10 ? '...' : ''}</p> */}

            <Link to={`/services/${service.title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
              state={{ "service_id": service.id, "subtitles_id": sub.subid }}
              className="text-cyan-500 font-bold mt-2 cursor-pointer sm:sm:text-[16px] tracking-[1px] font-inter "
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>Read more</Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Servicesection6;
