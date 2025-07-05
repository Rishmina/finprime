

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { Industries } from '../Industries';
import { Link } from 'react-router-dom';


const ServingSection = () => {
  
  const [activeBg, setActiveBg] = useState(""); 
  const [activeAlt, setActiveAlt] = useState("");  
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const fadeElementRef = useRef(null);
  const swiperRef = useRef(null);


  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = Industries[activeIndex].image;
    img.onload = () => {
      setActiveBg(Industries[activeIndex].image);
      setLoading(false);
    };
    setActiveAlt(Industries[activeIndex].alt);
  }, [activeIndex]);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
    const newIndex = swiperRef.current.swiper.realIndex;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
    const newIndex = swiperRef.current.swiper.realIndex;
    setActiveIndex(newIndex);
  };

  const handleMouseEnter = (img, alt) => {
    setLoading(true);
    const preloadedImg = new Image();
    preloadedImg.src = img;
    preloadedImg.onload = () => {
      setActiveBg(img);
      setLoading(false);
    };
    setActiveAlt(alt);
  };

  const [showAll, setShowAll] = useState(false); // State to handle the toggle

  const handleToggle = () => {
    setShowAll(!showAll); // Toggle the state when clicked
  };
  
  return (
    <div 
      ref={fadeElementRef}
      className="relative w-full h-[570px] md:h-screen overflow-hidden "
    >
      <div
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <img
        src={activeBg}
        alt={activeAlt}
        className="hidden"
        loading="lazy" 
        onLoad={() => setLoading(false)} 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 " /> 

      {/* Title */}
      <div className="absolute left-0 right-0 z-30 flex justify-between pl-6 top-10 sm:top-28 md:pl-8 lg:pl-10 xl:pl-12">
        <h4 className="text-[23px] body sm:text-6xl lg:text-6xl mt-3 text-white font-bold">Who We Serve</h4>
        <div className='pt-5 pr-4 md:pr-6 xl:pr-10 lg:pr-8'><Link className='sm:px-10 sm:py-4 px-2  py-2 bg-brandBlue text-white text-xs  sm:text-[16px] tracking-[2px]
         transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10'>All Industries</Link> </div>
      </div>
      

      <Swiper
        ref={swiperRef}
        loop={true} 
        breakpoints={{
          320: { slidesPerView: 1 }, 
          640: { slidesPerView: 2 }, 
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="z-20 flex items-center justify-center w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {Industries.map((industry ,index) => (
         <SwiperSlide
         key={index}
         style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
         onMouseEnter={() => handleMouseEnter(industry.image, industry.alt)} 
         onMouseOver={() => setActiveIndex(index)} 
          className={`transition-all duration-300 relative 
            ${index === activeIndex ? 'bg-brandBlue bg-opacity-60' : ''}  // Active item background
            ${index !== activeIndex ? 'hover:bg-brandBlue hover:bg-opacity-60' : ''} // Hover effect for non-active items
          `}
       >
            <div className={`group flex flex-col items-center justify-center text-white 
                          h-full w-full p-4 transform cursor-pointer 
                          border-l-4 border-white border-opacity-10 
                          shadow-lg hover:shadow-lg relative`}>
              <div className="flex-grow"></div> 

              <div className='absolute left-0 w-full transition-all duration-300 transform translate-y-6 group-hover:pb-48 md:group-hover:pb-60 lg:group-hover:pb-60 group-hover:translate-y-0 group-hover:opacity-100'>
                
                <div className='flex justify-center sm:justify-between sm:pl-24 '>
                  <h3 className='text-xl sm:text-[22px] text-white font-inter uppercase mb-5  sm:px-0  sm:mr-5 '>
                    {industry.headtitle}
                  </h3>
                </div>

                <div className='absolute w-full px-5 transition-all duration-300 transform translate-y-6 opacity-0 sm:px-0 sm:left-10 md:left-8 lg:left-10 xl:left-12 group-hover:translate-y-0 group-hover:opacity-100'>

                {industry.subindustries.slice(0, showAll ? industry.subindustries.length : 3).map((sub) => (
                  <div key={sub.id} className="px-6 sm:px-14">
                    <Link to={`/${industry.title}/${sub.title}`}
                      className="text-white hover-underline-animation text-md sm:text-[18px] lg:pt-2 tracking-[1px]
                        hover:text-cyan-500 ml-2 cursor-pointer list-none before:content-['•'] before:text-white before:mr-2"
                    >
                      {sub.headtitle}
                    </Link>
                  </div>
                ))}

                <div className='px-6 sm:px-14'>
                  <Link
                    onClick={handleToggle} // Add toggle functionality
                    className="text-white hover-underline-animation text-sm sm:text-[18px] tracking-[1px]
                    lg:pt-2 hover:text-cyan-500 mb-1 ml-2 cursor-pointer list-none before:content-['•'] before:text-white before:mr-2"
                  >
                    {showAll ? 'Show Less' : 'etc...'} {/* Toggle the text based on the state */}
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <HiOutlineArrowSmallLeft 
        className='absolute left-6 md:left-8 lg:left-10 xl:left-12 top-1/2 transform -translate-y-1/2 
        hover:bg-brandBlue hover:bg-opacity-50 text-white cursor-pointer p-2 border border-white border-opacity-15 rounded-md transition-all duration-300 text-[35px] z-20'
        onClick={handlePrev}
      />
      <HiOutlineArrowSmallRight
        className='absolute right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 transform -translate-y-1/2
        hover:bg-brandBlue hover:bg-opacity-50 text-white cursor-pointer p-2 border border-white border-opacity-15 rounded-md transition-all duration-300 text-[35px] z-20'
        onClick={handleNext}
      />
    </div>
  );
};

export default ServingSection;

