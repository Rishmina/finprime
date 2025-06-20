import React, { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaXTwitter, FaYoutube} from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { CgArrowLongDown } from "react-icons/cg";

const Hero = () => {

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
    <div className='sm:mt-10  max-w-8xl '>
      <div className='flex flex-col md:flex-row justify-between '>
        <div className='flex flex-col justify-center w-full md:w-2/3 h-[60vh]  
         lg:pt-80 md:pt-[450px] md:pl-8 xl:pl-12 lg:pl-10 pl-2 pr-6 sm:pr-0 pt-[400px]    xl:pt-0 '>
          <h4
          className='text-4xl sm:text-4xl pl-5 sm:pl-0 md:text-4xl text-white 
          font-bold mb-4 mt-10 md:mt-20 ml-4 md:ml-0 
           delay-300 duration-700 animate-fadeinleft '>
            Fin Prime-Accounting Services
          </h4>
        </div>
        <div className="flex flex-col items-center md:items-end xl:pr-10  md:pr-6 pr-4 pl-6 sm:pl-0 md:pt-[400px] pt-16 xl:pt-0 lg:pr-8 lg:pt-80 justify-center w-full md:w-1/3  
        ">
          <div className="flex space-x-2 bg-white bg-opacity-55 rounded-[5px] border border-opacity-20  p-3 -mb-1 ">
            <button className="hidden md:block   pl-4 pr-4 rounded-sm   shadow-black  text-[16px] tracking-[1px]
            transition-all duration-300 ease-out bg-gradient-to-r from-brandBlue to-cyan-500 text-white">Follow</button>
            <a href="https://www.facebook.com/finprimeconsulting" aria-label="Facebook" className="p-2 
             bg-white rounded-full text-black  shadow-black
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:border-opacity-10 hover:from-brandBlue hover:to-cyan-500 hover:text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/FinPrimeConsult" aria-label="Twitter" className="p-2 
             bg-white rounded-full text-black  shadow-black
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white ">
              <FaXTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/company/finprimeconsulting/" aria-label="LinkedIn" className="p-2 
             bg-white rounded-full text-black shadow-black
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white ">
              <RiLinkedinFill size={20} />
            </a>
            <a href="https://www.instagram.com/finprimeconsulting/" aria-label="WhatsApp" className="p-2 
             bg-white rounded-full text-black shadow-black
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
              <FaInstagramSquare  size={20} />
            </a>
            <a href="https://www.youtube.com/@FinPrimeConsulting" aria-label="WhatsApp" className="p-2 
             bg-white rounded-full text-black shadow-black
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
              <FaYoutube  size={20} />
            </a>
          </div >
          <div className='pr-52   '>
             <CgArrowLongDown  className="text-white  text-opacity-40  text-6xl animate-fadeinright"  aria-label="Scroll down" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
