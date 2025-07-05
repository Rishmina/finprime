import React, { useEffect, useRef, useState } from 'react';

const Atext1 = () => {


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
    <div>
        <div 
        ref={fadeElementRef}
        className={`flex flex-col w-full ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
        <div className="flex justify-between text-xs sm:text-sm md:text-[16px] tracking-[1px] h-[55px]">
        <button className="flex-1 px-3 overflow-hidden whitespace-nowrap
          group bg-black   relative 
          transition-all duration-300 ease-out uppercase text-white hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500">
            <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
            </span>
            Giving smartness to your business accounting
          </button>
          <button className="flex-1 px-3 overflow-hidden whitespace-nowrap
          group bg-black  relative 
           transition-all duration-300  uppercase text-white border-l border-white hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500
            ease-out ">
            <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
            </span>
            Best Accounting Companies
          </button>
          <button className="flex-1 px-3 overflow-hidden whitespace-nowrap
          group bg-black  relative transition-all duration-300 ease-out uppercase
          text-white border-l border-white hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500">
            <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
            </span>
            Corporate Tax Services
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Atext1