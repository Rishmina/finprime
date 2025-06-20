import React, { useEffect, useRef, useState } from 'react';
import {  FaInstagram,FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Btext = () => {


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
    className={`xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 py-1 md:pr-6 md:pl-8  pl-6 pr-4 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>

      <h4 className="text-5xl sm:text-7xl font-medium mb-6 sm:mb-4 mt-20">Social Feeds </h4>





      <p className="mb-6   text-[12px] sm:text-[16px] tracking-[1px]  font-inter">
        This is a long paragraph related to the blog content. Here, you can discuss the blog topic in detail, providing insights, opinions, or any relevant information that engages your readers. Make sure to cover the key points and maintain a friendly tone to keep your audience interested.
      </p>





      <div className="flex space-x-3 sm:space-x-6 mt-20 mb-6">
        <a href="https://www.instagram.com/finprimeconsulting/" target="_blank" rel="noopener noreferrer" 
        className="text-black rounded-full bg-white px-2 py-2 shadow-md transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          <FaInstagram className='text-xl sm:text-4xl mx-1 my-1' />
        </a>
        <a href="https://www.facebook.com/finprimeconsulting" target="_blank" rel="noopener noreferrer" 
        className="text-black rounded-full bg-white px-2 py-2 shadow-md transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          <FaFacebookF className='text-xl sm:text-4xl mx-1 my-1' />
        </a>
        <a href="https://www.youtube.com/@FinPrimeConsulting" target="_blank" rel="noopener noreferrer" 
        className="text-black rounded-full bg-white px-2 py-2 shadow-md transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          <FaYoutube className='text-xl sm:text-4xl mx-1 my-1' />
        </a>
        <a href="https://www.linkedin.com/company/finprimeconsulting/" target="_blank" rel="noopener noreferrer" 
        className="text-black rounded-full bg-white px-2 py-2 shadow-md transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          <FaLinkedin className='text-xl sm:text-4xl mx-1 my-1' />
        </a>
      </div>






      <div className="flex justify-between items-center mt-12">

        <div>
          <h4 className="text-[12px] sm:text-[22px] font-semibold font-inter tracking-[1px]">Browse All</h4>
        </div>

        <div className="text-right text-[12px] sm:text-base flex gap-4">
            
          
          
         
        </div>
      </div>




      <div className="border-t border-gray-300 mt-6"></div>
    </div>
  );
};

export default Btext;
