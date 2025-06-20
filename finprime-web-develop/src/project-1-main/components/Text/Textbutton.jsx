import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Textbutton = () => {


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
    className={ `mt-0 pb-4 flex-row ml-6  md:ml-32 space-x-5 space-y-4 md:space-y-0
     md:space-x-10  ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
      <Link to="/about#Discover-More" className='text-xs sm:text-[16px] font-inter py-3 sm:py-3 px-3 sm:px-6 rounded-[5px] bg-brandBlue tracking-[2px] 
       hover:bg-cyan-500 text-white  transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white   '>
        Discover More
      </Link>
      <Link to='/about'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
       className='text-xs sm:text-[16px] font-inter py-3 sm:py-3 px-3 sm:px-6  bg-brandBlue rounded-[5px] font-medium tracking-[2px]
        hover:bg-cyan-500 text-white  transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white '>
        About
      </Link>
    </div>
  );
}

export default Textbutton;
