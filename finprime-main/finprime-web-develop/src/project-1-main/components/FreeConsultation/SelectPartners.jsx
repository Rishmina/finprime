import React, { useEffect, useRef, useState } from 'react';
import {  FaAws, FaMicrosoft } from 'react-icons/fa';
import { TbBrandDatabricks } from 'react-icons/tb';
import { SiSnowflake, SiDbt} from 'react-icons/si';
import { GoArrowRight } from "react-icons/go";
import PartnersCarousel from './PartnersCarousel';

const partners = [
    { id: 1, name: "Databricks", icon: <TbBrandDatabricks className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" /> },
    { id: 2, name: "AWS", icon: <FaAws className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" /> },
    { id: 3, name: "Microsoft", icon: <FaMicrosoft className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" /> },
    { id: 4, name: "Snowflake", icon: <SiSnowflake className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" /> },
    { id: 5, name: "DBT", icon: <SiDbt className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" /> },
];

const SelectPartners = () => {


    const [hasFadedIn, setHasFadedIn] = useState(false); 
     const fadeElementRef = useRef(null);
  
    useEffect(() => {
      const fadeInObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasFadedIn) {
              setHasFadedIn(true); 
            }
          });
        },
        { threshold: 0.1 } 
      );
  
      const currentElement = fadeElementRef.current;
      if (currentElement) {
        fadeInObserver.observe(currentElement);
      }
  
      return () => {
        if (currentElement) {
          fadeInObserver.unobserve(currentElement);
        }
      };
    }, [hasFadedIn]);



    return (
        <div 
        ref={fadeElementRef}
        className="mx-auto bg-black">
            <div className={`scale-y-125 scale-x-60 mx-10 xl:mr-10 xl:ml-12 lg:ml-10 ml-6  text-white pt-16 mb-8 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
                <GoArrowRight  className='text-6xl md:text-7xl lg:text-8xl transform rotate-90' />
            </div>








            {/* <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mx-w-[100%] xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:mr-6 md:ml-8 ml-6 mr-4
             text-white  ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
              
                {partners.map(({ id, name, icon }) => (
                    <div
                        key={id} 
                        className="flex flex-col justify-center text-center items-center py-16  border  border-white"
                    >
                      <div className=''>
                         <span className=''>{icon}</span>
                        <p className="text-2xl md:text-4xl font-medium">{name}</p></div>
                        
                    </div>
                ))}
            </div> */}
            <PartnersCarousel/>

            <div className={`mt-10 xl:pl-12 lg:pl-10 md:pl-8 pl-6 pr-4 sm:pr-0 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
                <h1 className='text-3xl sm:text-5xl lg:text-7xl text-white font-medium pb-20 '>Selected Partners </h1>
                <div className='border-b opacity-20'></div>
            </div>
        </div>
    );
};

export default SelectPartners;
