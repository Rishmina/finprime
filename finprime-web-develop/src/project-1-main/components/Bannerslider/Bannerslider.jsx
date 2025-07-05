import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
// import { IoIosClose } from 'react-icons/io';
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import Audit_and_Assurance from '../../video/Audit_and_Assurance.mp4';
import Company_formation_Business_Consultancy from '../../video/Company_formation_Business_Consultancy.mp4';
import HR_Consulting_Advisory from '../../video/HR_Consulting_Advisory.mp4';
import Regulatory_and_Compliance from '../../video/Regulatory_and_Compliance.mp4';
import Taxation from '../../video/Taxation.mp4';
import Accounting_Finance from '../../video/Accounting_Finance.mp4';
import { Services } from '../Services';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import groupedLogo from '../../images/image 20.png';


const Bannerslider = () => {
  // Find the index of the 'taxation' service
  const taxationIndex = Services.findIndex(service => service.title === 'taxation');
  const [currentSlide, setCurrentSlide] = useState(taxationIndex !== -1 ? taxationIndex : 0);

  // Array of video sources
  const videos = [Audit_and_Assurance, Accounting_Finance, Taxation, Regulatory_and_Compliance, Company_formation_Business_Consultancy, HR_Consulting_Advisory];

  const CurrentTitle = Services[currentSlide];
  const CurrentSubtitles = CurrentTitle.subtitles || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % videos.length);
    }, 14000); // Change slide every 14 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [videos.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? videos.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  //   const [isSpeakExpert, setIsSpeakExpert] = useState(false);

  //   const toggleSpeakExpert = () => {
  //     setIsSpeakExpert(!isSpeakExpert);
  // };

  //   useEffect(() => {
  //     if (isSpeakExpert) {
  //         document.body.style.overflow = 'hidden';  
  //     } else {
  //         document.body.style.overflow = '';  
  //     }
  //     return () => {
  //         document.body.style.overflow = '';
  //     };
  // }, [isSpeakExpert]);


  // const [selectedService, setSelectedService] = useState("");  // State for selected service
  // const [selectedSubtitle, setSelectedSubtitle] = useState(""); // State for selected subtitle
  // const [selectedIndexOpen, setSelectedIndexOpen] = useState(null); // Index of the selected service

  // const handleServiceChange = (e) => {
  //   const serviceTitle = e.target.value;
  //   setSelectedService(serviceTitle);

  //   // Find the index of the selected service from the Services array
  //   const selectedServiceIndex = Services.findIndex(service => service.title === serviceTitle);
  //   setSelectedIndexOpen(selectedServiceIndex);
  //   setSelectedSubtitle("");  // Reset subtitle when service changes
  // };

  // const handleSubtitleChange = (e) => {
  //   setSelectedSubtitle(e.target.value);
  // };



  return (
    <div className='relative w-full h-screen hero-ban-fin'>
      {/* Decorative element, now hidden on smaller screens */}
      <div className='hidden lg:block absolute w-[200px] h-[550px] left-0 top-1/2 -translate-y-1/2 bg-[#06b6d4] rounded-r-3xl'></div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        className="relative w-full h-full overflow-hidden"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-[-1] "
              >
                <source src={video} type="video/mp4" />
              </video>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 " />

              {/* Banner Content */}
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-4 text-white md:p-0">
                <div className="w-full md:absolute md:left-0 md:justify-center md:pl-6 md:mt-52 lg:pl-10 xl:pl-12 md:pl-8">
                  {/* Banner Text for International Taxation */}
                  {CurrentTitle.title === 'taxation' && CurrentSubtitles[0]?.subid === 2 ? (
                    <div className="mb-6 text-left">
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          color: '#fff',
                          fontSize: '24px',
                          marginBottom: '0.5rem',
                          lineHeight: 1.2
                        }}
                      >
                        {CurrentSubtitles[0]?.headsubtitle}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          color: '#fff',
                          fontSize: '36px',
                          marginBottom: '1rem',
                          lineHeight: 1.2
                        }}
                      >
                        {CurrentSubtitles[0]?.subtitle}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          color: '#fff',
                          fontSize: '18px',
                          lineHeight: 1.5
                        }}
                      >
                        {CurrentSubtitles[0]?.subcontent}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#FFFFFF', margin: 0 }}
                      >
                        {CurrentTitle.headtitle}
                      </h3>
                      <span
                        className="text-3xl md:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#FFFFFF', display: 'block', marginTop: '8px', marginLeft: 0 }}
                      >
                        {CurrentSubtitles[0]?.headsubtitle}
                      </span>
                    </>
                  )}
                  {/* Read more with vertical lines - its own row */}
                  <div className="flex items-center mt-6 mb-8">
                    <span style={{ height: '33px', width: '1px', background: '#008EAA', display: 'inline-block', marginRight: '16px' }}></span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '20px', lineHeight: '100%', color: '#FFFFFF', letterSpacing: '0' }}>Read more</span>
                    <span style={{ height: '33px', width: '1px', background: '#008EAA', display: 'inline-block', marginLeft: '16px' }}></span>
                  </div>
                  {/* Controls Row: Arrows, Button, Logos - separate row below Read more */}
                  <div className='flex flex-wrap items-center gap-4'>
                    <button
                      onClick={handlePrevSlide}
                      className="px-2 py-2 text-4xl text-black transition-all duration-300 ease-in-out bg-white rounded-full hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:bg-opacity-40 hover:text-white"
                    >
                      <HiOutlineArrowSmallLeft className="text-lg" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="px-2 py-2 text-4xl text-black transition-all duration-300 ease-in-out bg-white rounded-full hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:bg-opacity-40 hover:text-white"
                    >
                      <HiOutlineArrowSmallRight className="text-lg" />
                    </button>
                    <Link
                      to={`/form2/$${CurrentTitle.id}/${CurrentSubtitles[0]?.subid}`}
                      className='text-center sm:text-left cursor-pointer text-[15px] bg-brandBlue sm:text-[16px] sm:tracking-[2px] tracking-[1px] text-white border border-cyan-700 rounded-[5px] transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 py-3 px-5 md:ml-2'>
                      <p>Make an Appointment</p>
                    </Link>
                    <img src={groupedLogo} alt="Google and Trustpilot" className="h-10 md:h-12 object-contain md:ml-26" />
                    <div className="flex items-center h-14 bg-white bg-opacity-55 border border-opacity-20 px-4 space-x-2 ml-auto mr-4 rounded-md">
                      <button className="px-3 py-1 rounded shadow text-[15px] tracking-[1px] bg-gradient-to-r from-brandBlue to-cyan-500 text-white">Follow</button>
                      <div className="flex space-x-2">
                          <a href="https://www.facebook.com/finprimeconsulting" aria-label="Facebook" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:border-opacity-10 hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                          <FaFacebookF size={20} />
                          </a>
                          <a href="https://x.com/FinPrimeConsult" aria-label="Twitter" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white ">
                          <FaXTwitter size={20} />
                          </a>
                          <a href="https://www.linkedin.com/company/finprimeconsulting/" aria-label="LinkedIn" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:border-opacity-10 hover:text-white ">
                          <RiLinkedinFill size={20} />
                          </a>
                          <a href="https://www.instagram.com/finprimeconsulting/" aria-label="Instagram" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                          <FaInstagramSquare size={20} />
                          </a>
                          <a href="https://www.youtube.com/@FinPrimeConsulting" aria-label="YouTube" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                          <FaYoutube size={20} />
                          </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex justify-center gap-4 mt-4">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={` ${currentSlide === index ? '' : ''} `}
                    />
                  ))}
                </div>

                {/* Paragraph at the bottom */}
                <div className="absolute bottom-0 w-full text-center">
                  <div className="flex text-white text-[10px] sm:text-xs md:text-[16px] tracking-[1px] uppercase">
                    <button className="flex-1 p-2 text-center bg-[#1A233A] transition-all duration-300 md:p-4 hover:bg-gradient-to-r from-[#06B6D4] to-[#1A233A]">
                      Giving smartness to your business accounting 
                    </button>
                    <button className="flex-1 p-2 text-center bg-[#1A233A] transition-all duration-300 border-l border-r border-gray-600 md:p-4 hover:bg-gradient-to-r from-[#06B6D4] to-[#1A233A]">
                      Best Accounting Companies
                    </button>
                    <button className="flex-1 p-2 text-center bg-[#1A233A] transition-all duration-300 md:p-4 hover:bg-gradient-to-r from-[#06B6D4] to-[#1A233A]">
                      Corporate Tax Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Bannerslider;
