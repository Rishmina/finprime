import React, { useEffect, useRef, useState } from 'react';
import Certificates from '../cerificates/certifcate';

const Text1 = () => {

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
    <div className="mt-14 mb-0 sm:mt-24 sm:mb-0 lg:mt-40 lg:mb-0 pl-4 sm:pl-24">
      <div
        ref={fadeElementRef}
        className={`my-6 sm:my-20 font-inter xl:px-12 lg:px-10 md:px-8 px-2 pt-4 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
        <h1
          className='text-2xl sm:text-[36px] md:text-6xl leading-tight sm:leading-9 lg:text-4xl xl:text-6xl text-center sm:text-left font-bold'
          style={{
            fontFamily: 'inter, sans-serif',
            fontWeight: 500,
            color: '#040404',
          }}
        >
          Committed to your business growth
        </h1>
        <h4
          className='mt-2 sm:mt-5 lg:mb-46 text-xs sm:text-xl lg:text-3xl text-center sm:text-left'
          style={{
            fontFamily: 'inter, sans-serif',
            fontWeight: 300,
            color: '#000000',
          }}
        >
          We Provide Truly Prominent Accounting Services
        </h4>
        <hr className="mt-6 mb-6 sm:mb-12 lg:mb-16 border-t-2 border-D9D9D9-300 w-full" />

        <div className="mt-0 mb-8 sm:mb-12 lg:mb-16">
          <Certificates />
        </div>
      </div>
    </div>
  );
}

export default Text1;

