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
import googleLogo from '../../images/google.png';
import trustpilotLogo from '../../images/trustpilot.png';
import { Swiper, SwiperSlide } from 'swiper/react';


const Bannerslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className='relative w-full h-screen'>
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
              <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-white ">
                <div className="absolute left-0 justify-center pl-6 mt-52 lg:pl-10 xl:pl-12 md:pl-8">
                  {/* Heading with Inter font, not bold, same as subtitle */}
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '42px',
                      lineHeight: '61px',
                      letterSpacing: '0',
                      color: '#FFFFFF',
                      margin: 0
                    }}
                  >
                    {CurrentTitle.headtitle}
                  </h3>
                  {/* Subtitle with Inter font, left-aligned under heading */}
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '42px',
                      lineHeight: '61px',
                      letterSpacing: '0',
                      color: '#FFFFFF',
                      display: 'block',
                      marginTop: '8px',
                      marginLeft: 0
                    }}
                  >
                    {CurrentSubtitles[0]?.headsubtitle}
                  </span>
                  {/* Read more with vertical lines - its own row */}
                  <div className="flex items-center mt-6 mb-8">
                    <span style={{ height: '33px', width: '1px', background: '#008EAA', display: 'inline-block', marginRight: '16px' }}></span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '20px', lineHeight: '100%', color: '#FFFFFF', letterSpacing: '0' }}>Read more</span>
                    <span style={{ height: '33px', width: '1px', background: '#008EAA', display: 'inline-block', marginLeft: '16px' }}></span>
                  </div>
                  {/* Controls Row: Arrows, Button, Logos - separate row below Read more */}
                  <div className='flex items-center gap-4'>
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
                      className='text-center sm:text-left cursor-pointer text-[15px] bg-brandBlue sm:text-[16px] sm:tracking-[2px] tracking-[1px] text-white border border-cyan-700 rounded-[5px] transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 py-3 px-5 ml-2'>
                      <p>Make an Appointment</p>
                    </Link>
                    <img src={trustpilotLogo} alt="Trustpilot" className="h-8 md:h-10 object-contain ml-4" />
                    <img src={googleLogo} alt="Google" className="h-8 md:h-10 object-contain ml-2" />
                  </div>
                </div>

                {/* Icons on the right */}
                <div className="absolute flex-col justify-center hidden gap-4 text-3xl md:block sm:right-8 bottom-52 sm:flex sm:mb-3 lg:mb-0 pb-72 sm:pb-0">
                  <div className="flex space-x-2 bg-white bg-opacity-55 rounded-[5px] border border-opacity-20  p-1 xl:p-3 -mb-1 ">
                    <button className="   pl-4 pr-4 rounded-sm   shadow-black  text-[16px] tracking-[1px]
                    transition-all duration-300 ease-out bg-gradient-to-r from-brandBlue to-cyan-500 text-white">Follow</button>
                    <a href="https://www.facebook.com/finprimeconsulting" aria-label="Facebook" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:border-opacity-10 hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                      <FaFacebookF size={20} />
                    </a>
                    <a href="https://x.com/FinPrimeConsult" aria-label="Twitter" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white ">
                      <FaXTwitter size={20} />
                    </a>
                    <a href="https://www.linkedin.com/company/finprimeconsulting/" aria-label="LinkedIn" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:border-opacity-10 hover:text-white ">
                      <RiLinkedinFill size={20} />
                    </a>
                    <a href="https://www.instagram.com/finprimeconsulting/" aria-label="WhatsApp" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                      <FaInstagramSquare size={20} />
                    </a>
                    <a href="https://www.youtube.com/@FinPrimeConsulting" aria-label="WhatsApp" className="p-2 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                      <FaYoutube size={20} />
                    </a>

                  </div >
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
                <div className="absolute bottom-0 flex flex-col w-full text-center sm:pl-0 sm:pr-0 ">
                  <div className="flex justify-between text-xs sm:text-sm md:text-[16px] tracking-[1px]">
                    <button className="flex-1 p-3 overflow-hidden 
                      group bg-brandBlue   relative 
                      transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue uppercase hover:to-cyan-500  text-white">
                      <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
                        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
                      </span>
                      Giving smartness to your business accounting firm in Dubai
                    </button>
                    <button className="flex-1 p-3 overflow-hidden 
                      group bg-brandBlue  relative 
                       transition-all duration-300  hover:bg-gradient-to-r hover:from-brandBlue uppercase hover:to-cyan-500 text-white 
                        ease-out ">
                      <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
                        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
                      </span>
                      Best Accounting Companies
                    </button>
                    <button className="flex-1 p-3 overflow-hidden 
                      group bg-brandBlue  relative transition-all duration-300 ease-out hover:bg-gradient-to-r uppercase hover:from-brandBlue hover:to-cyan-500
                      text-white ">
                      <span className="absolute right-0 w-10 h-32 -mt-12 transition-all duration-1000 
                        transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-[500px] ease">
                      </span>
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
