import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Services } from '../Services';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ServicesectionNewText = () => {


    const { servicetitle, subServicetitle } = useParams();
    const service = Services.find((s) =>
        s.title.replace(/\s+/g, '-') === servicetitle);
    const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);



    // // const { servicetitle, subServicetitle, subServiceHeadTitle } = useParams();
    // const location = useLocation();
    // const { service_id, subtitles_id } = location.state ?? {};
    // const service = Services.find((s) => s.id === service_id);
    // console.log(service);
    // const subService = service?.subtitles.find((sub) => sub.subid === subtitles_id);

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
                },);
            }
        }
    }, [location]);

    return (
        <div className="flex flex-col">
            <div className="w-full font-inter px-6 sm:px-6 md:px-10 lg:px-12 text-sm md:text-base leading-relaxed tracking-wide text-black">
                <div className="mb-12" dangerouslySetInnerHTML={{ __html: subService.subcontentbottom }}>
                </div>
            </div>
        </div>


    );
};

export default ServicesectionNewText;
