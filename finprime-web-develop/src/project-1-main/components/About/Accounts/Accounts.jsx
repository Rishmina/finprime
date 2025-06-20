import React, { useEffect, useRef, useState } from 'react';
import protectorsofpublicinterest from '../../../images/7 helps/protectorsofpublicinterest.jpeg';
import ensuringthequalityoffinancialreporting from '../../../images/7 helps/ensuringthequalityoffinancialreporting.jpeg';
import helpscutdowncost from '../../../images/7 helps/helpscutdowncost.jpeg';
import helpmanageexpenses from '../../../images/7 helps/helpmanageexpenses.jpeg';
import willsaveyourtime from '../../../images/7 helps/willsaveyourtime.jpeg';
import givesprofessionaladvice from '../../../images/7 helps/givesprofessionaladvice.jpeg';
import helpsyouinlegalmatters from '../../../images/7 helps/helpsyouinlegalmatters.jpeg';


const Accounts = () => {


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


  const images = [
    { 
        id: 1, 
        src: protectorsofpublicinterest, 
        title: "Protectors Of Public Interest" 
    },
    { 
        id: 2, 
        src: ensuringthequalityoffinancialreporting, 
        title: "Ensuring The Quality Of Financial Reporting" 
    },
    { 
        id: 3, 
        src: helpscutdowncost,
        title: "Helps Cut Down Cost" 
    },
    { 
        id: 4, 
        src: helpmanageexpenses, 
        title: "Help Manage Expenses" 
    },
    { 
        id: 5, 
        src: willsaveyourtime, 
        title: "Will Save Your Time"
     },
    { 
        id: 6, 
        src: givesprofessionaladvice, 
        title: "Gives Professional Advice" 
    },
    { 
        id: 7, 
        src: helpsyouinlegalmatters, 
        title: "Helps You In Legal Matters" 
    },
  ];



  return (
    <div className="max-w-full xl:pl-12 xl:pr-10  lg:pl-10 lg:pr-8 md:pl-8 md:pr-6 pl-6 pr-4 mt-28 mb-20">

      <div className="grid px-1 pb-5  ">
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-semibold animate-fadeinright "
        >
          Seven Reasons why <span className='bg-gradient-to-r from-brandBlue via-cyan-500
               to-cyan-300 bg-clip-text text-transparent font-semibold'>ACCOUNTANTS</span>
        </h1>
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-semibold animate-fadeinright" 
        >
          are important people in business
        </h1>
      </div>







      {/* Centered Heading */}





      <div className="flex justify-left mt-6 ">
        <h2
          className="text-md sm:text-2xl font-semibold uppercase animate-fadeinleft"
        >
          An Accounts
        </h2>
      </div>








      {/* Third Row  */}








      <div 
      ref={fadeElementRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
       xl:grid-cols-3 gap-8 mt-10  ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group"
          >
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              className="w-full h-[400px] sm:h-[480px] xl:h-[580px] 
              object-cover transition-transform duration-300 transform group-hover:scale-95
              " 
            />
            <div className="absolute bottom-10 w-[90%] mx-3 md:mx-2.5 xl:mx-4 transition-all duration-300
             ease-out group-hover:bg-gradient-to-r group-hover:from-brandBlue hover:to-cyan-500 
             text-white p-2 text-center">
              <h3 className=" font-semibold text-md lg:text-lg xl:text-lg text-shadow-md">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
