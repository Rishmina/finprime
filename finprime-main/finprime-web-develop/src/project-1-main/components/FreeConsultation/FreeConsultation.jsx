import React, { useEffect, useRef, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CountUp from 'react-countup';
import SelectPartners from './SelectPartners';
import { useInView } from 'react-intersection-observer';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import backgroundImage from '../../images/success/success.jpg';
import Servicecard from '../Servicecard/Servicecard';
import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon';
import CookieBanner from '../Cookies/CookieBanner';
import PartnersCarousel from './PartnersCarousel';
import FreeConsultationForm from './FreeConsultationForm';

const WhyChooseUs = () => {
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

  const { ref: customerRef, inView: customerVisible } = useInView({ triggerOnce: true });
  const { ref: successRef, inView: successVisible } = useInView({ triggerOnce: true });
  const { ref: trustRef, inView: trustVisible } = useInView({ triggerOnce: true });

  return (
    <div
      ref={fadeElementRef}
      className="flex flex-col md:flex-row h-[700px] justify-between items-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={`flex-1 lg:pl-10 xl:pl-12 md:pl-8 pl-6 pr-4 sm:pr-0 mb-8 ${hasFadedIn ? 'animate-fadeinbottom' : ''} text-left z-10`}>
        <h3 className="pt-10 mb-4 text-3xl font-bold text-white uppercase md:text-4xl lg:text-9xl sm:pt-28">Why Choose Us</h3>
        <h1 className="mb-5 text-lg font-medium text-white md:text-xl lg:text-xl sm:mb-20">Our Success is Built on Your Success</h1>
      </div>

      <div className="z-10 flex flex-col items-center justify-center flex-1 pb-10 space-y-8 sm:pl-36 sm:pb-0">
        <div className="p-6 text-center" ref={customerRef}>
          <h1 className="text-4xl font-bold text-white duration-500 md:text-5xl lg:text-6xl">
            {customerVisible && <CountUp start={0} end={1500} duration={3} suffix="+" />}
          </h1>
          <h4 className="text-lg font-bold text-white md:text-xl lg:text-2xl">Happy Clients</h4>
        </div>
        
        <div className="p-6 text-center" ref={successRef}>
          <h1 className="text-4xl font-bold text-white duration-500 md:text-5xl lg:text-6xl">
            {successVisible && <CountUp start={0} end={1280} duration={3} suffix="+" />}
          </h1>
          <h4 className="text-lg font-bold text-white md:text-xl lg:text-2xl">TRN Numbers Delivered</h4>
        </div>
        
        <div className="p-6 text-center" ref={trustRef}>
          <h1 className="text-4xl font-bold text-white duration-500 md:text-5xl lg:text-6xl">
            {trustVisible && <CountUp start={0} end={15} duration={3} suffix="+" />}
          </h1>
          <h4 className="text-lg font-bold text-white md:text-xl lg:text-2xl">Employees</h4>
        </div>
      </div>
    </div>
  );
};

const FreeConsultation = () => {
  return (
    <div className='relative overflow-hidden'>
      <Navbar />
      <div className="relative pt-60 pb-40">
        <div className="relative z-10 container mx-auto px-4 text-black">
          <div className="text-left pl-4 md:pl-0">
            <p className="mb-4 text-lg">Get Your Free Consultation</p>
            <div className="flex items-center">
              <div className="border-l-4 border-black h-16 mr-4"></div>
              <h1 className="text-4xl font-semibold font-kulim-park uppercase">
                Start growing your business firm with srtip
              </h1>
            </div>
            <p className="mt-4 text-lg">Let us help you with tailored solutions.</p>
          </div>
        </div>
      </div>
      <Servicecard />
      <WhyChooseUs />
      <PartnersCarousel />
      <Footer />
    </div>
  );
};

export default FreeConsultation;
