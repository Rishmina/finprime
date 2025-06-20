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

    <div className="mt-14 mb-14 sm:mt-24 sm:mb-24 lg:mt-44 lg:mb-56">
      <div

        ref={fadeElementRef}
        className={`my-[35px] sm:my-20 font-inter xl:px-12 lg:px-10 md:px-8 px-6 pt-4  ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
        <h1
          className='text-[34px] md:text-6xl leading-9 lg:text-6xl xl:text-8xl text-left'
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            color: '#040404',
            fontSize: '50px',
          }}
        >
          Committed to your business growth
        </h1>
        <h4
          className='mt-6 sm:mt-14 mb-14 sm:mb-24 lg:mb-44 text-xs sm:text-xl lg:text-3xl text-left'
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            color: '#000000',
          }}
        >
          We Provide  Truly Prominent Accounting Services
        </h4>
        <Certificates />
      </div>
    </div>
  );
}

export default Text1;

