import React, { useEffect, useRef, useState } from 'react';

const Text4 = () => {


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
    className={`w-full xl:max-w-5xl xl:mx-auto  text-center mt-32 lg:mt-40 xs:mt-32 pl-6 pr-4 sm:pl-0 sm:pr-0 sm:px-8 md:px-4 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
      <div className='mb-5 lg:mb-24 text-left'>
        <h3 className='text-[25px] font-inter sm:text-[34px] text-center lg:text-[46px] xl:text-5xl font-bold'>
         We always try to step outside comfort zone
        </h3>
        <h3 className='text-[25px] font-inter sm:text-[34px] mb-16 lg:pb-20 lg:mb-0 text-center lg:text-[46px] xl:lg:text-5xl sm:mt-2 font-bold'>
          That's part of the reason we got <span className='underline hover:text-cyan-500 cursor-pointer'>here</span>.
        </h3>
      </div>
      <div className='flex flex-col items-center bg-pink-50 pt-10 lg:pt-24 pb-10 lg:pb-28 px-10 md:mx-32 lg:mx-16
      xl:mx-0 lg:pr-16 lg:pl-16 
      sm:rounded-bl-[70px]'>
        <div className='text-xs font-inter md:text-[16px] font-semibold mb-2'>
          Equipping you for achievement{' '}
          <button className='bg-blue-950 font-inter text-[8px] sm:text-[10px] lg:text-xs text-white ml-4 px-2 sm:px-4 sm:py-2 tracking-[1px] mb-5 rounded-full duration-300 ease-out hover:bg-gradient-to-r
           hover:from-brandBlue hover:to-cyan-500'>
            More.
          </button>
        </div>
        <h4 className='text-lg font-inter sm:text-2xl lg:text-5xl underline leading-relaxed '>
          Building the foundation 
        </h4>
        <h4 className='text-lg font-inter sm:text-2xl lg:text-5xl underline lg:mt-5 leading-relaxed'>
            for your future achievement.
        </h4>
      </div>
    </div>
  );
};

export default Text4;

