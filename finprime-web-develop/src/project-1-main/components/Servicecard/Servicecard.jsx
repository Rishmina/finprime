import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from "react-icons/hi2";
import { Services } from '../Services';
import { Link, useLocation } from 'react-router-dom';

const Servicecard = () => {

  const [activeBg, setActiveBg] = useState("");
  const [activeAlt, setActiveAlt] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const fadeElementRef = useRef(null);
  const swiperRef = useRef(null);


  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = Services[activeIndex].img;
    img.onload = () => {
      setActiveBg(Services[activeIndex].img);
      setLoading(false);
    };
    setActiveAlt(Services[activeIndex].alt);
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

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };



  return (
    <div
      ref={fadeElementRef}
      className="relative w-full h-[570px] md:h-screen overflow-hidden "
    >
      <div
        className={`absolute top-0 left-0 w-full h-full transition-opacity  duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <img src={activeBg} alt={activeAlt} className="sr-only " />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 " />

      {/* Image for Lazy Loading */}
      <img
        src={activeBg}
        alt={activeAlt}
        className="hidden"
        loading="lazy"
        onLoad={() => setLoading(false)}
      />

      {/* Title */}
      <div id='footerservices' className="absolute left-0 right-0 z-30 flex justify-center top-10 sm:top-16 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12 sm:justify-start">
        <h3 className="text-4xl font-bold text-white sm:text-6xl font-inter">
          Our <span>Services</span>
        </h3>
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
        {Services.map((service, index) => (
          <SwiperSlide
            key={index}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onMouseEnter={() => handleMouseEnter(service.img, service.alt)}
            onMouseOver={() => setActiveIndex(index)}
            className={`transition-all duration-300 relative 
            ${index === activeIndex ? 'bg-brandBlue bg-opacity-40' : ''}  // Active item background
            ${index !== activeIndex ? 'hover:bg-brandBlue hover:bg-opacity-40' : ''} // Hover effect for non-active items
          `}
          >
            <div className={`group flex flex-col items-center justify-center  text-white 
                          h-full w-full p-4 transform cursor-pointer 
                          border-l-4 border-white border-opacity-10 
                          shadow-lg hover:shadow-lg relative`}>
              <div className="flex-grow"></div>

              <div className='absolute left-0 w-full transition-all duration-300 transform translate-y-6 group-hover:pb-48 md:group-hover:pb-60 lg:group-hover:pb-60 md:pl-8 lg:pl-10 xl:pl-12 group-hover:translate-y-0 group-hover:opacity-100'>

                <div className='flex justify-center sm:justify-between'>
                  <h3 className='text-xl sm:text-[22px] text-white font-inter uppercase mb-5 px-5 sm:px-0  sm:mr-5'>
                    {service.headtitle}
                  </h3>
                </div>

                <div className='absolute w-full transition-all duration-300 transform translate-y-6 opacity-0 left-16 md:left-8 lg:left-10 xl:left-12 group-hover:translate-y-0 group-hover:opacity-100'>
                  {service.subtitles.slice(0, 3).map((sub) => (
                    <div key={sub.subid} className="sm:pr-14 pr-28">
                      <Link

                        to={`/services/${service.title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                        state={{ "service_id": service.id, "subtitles_id": sub.subid }}
                        // to={`/${service.title}/${sub.subtitle}/${sub.keyword}`}
                        className="text-white hover-underline-animation text-md sm:text-[18px] lg:pt-2 tracking-[1px] hover:text-cyan-500  ml-2 cursor-pointer list-none before:content-['•'] before:text-white before:mr-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {sub.headsubtitle}
                      </Link>
                    </div>
                  ))}

                  {showMore &&
                    service.subtitles.slice(3).map((sub) => (
                      <div key={sub.subid} className="sm:pr-14 pr-28">
                        <Link
                          to={`/services/${service.title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                          state={{ "service_id": service.id, "subtitles_id": sub.subid }}
                          // to={`/${service.title}/${sub.subtitle}/${sub.keyword}`}
                          className="text-white hover-underline-animation text-md sm:text-[18px] lg:pt-2 tracking-[1px] hover:text-cyan-500 ml-2 cursor-pointer list-none before:content-['•'] before:text-white before:mr-2"
                          onClick={() => {
                            window.scrollTo(0, 0);
                          }}
                        >
                          {sub.headsubtitle}
                        </Link>
                      </div>
                    ))}

                  <Link
                    className="text-white hover-underline-animation text-sm sm:text-[16px] lg:pt-2 tracking-[1px] hover:text-cyan-500 mb-1 ml-2 cursor-pointer list-none before:content-['•'] before:text-white before:mr-2"
                    onClick={handleShowMore}
                  >
                    {showMore ? 'Show Less' : 'etc...'}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <HiOutlineArrowSmallLeft
        className='absolute left-6 md:left-8 lg:left-10 xl:left-12 top-1/2 transform -translate-y-1/2 
        hover:bg-brandBlue hover:bg-opacity-50 text-white p-2 border cursor-pointer border-white border-opacity-15 rounded-md transition-all duration-300 text-[35px] z-20'
        onClick={handlePrev}
      />
      <HiOutlineArrowSmallRight
        className='absolute right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 transform -translate-y-1/2
        hover:bg-brandBlue hover:bg-opacity-50 cursor-pointer text-white p-2 border border-white border-opacity-15 rounded-md transition-all duration-300 text-[35px] z-20'
        onClick={handleNext}
      />
    </div>
  );
};

export default Servicecard;

