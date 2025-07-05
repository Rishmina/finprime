import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Rhero from './Rhero/Rhero';
import DropDown from './DropDown/DropDown';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon';
import CookieBanner from '../Cookies/CookieBanner';
import { FiArrowRight } from 'react-icons/fi';
import Oursection from '../Oursection/Oursection';
import newSectionImage from '../../images/image.png';
import Blogsection from '../Blogsection/Blogsection';
import Faq from '../Faq/Faq';
import Inputsection from '../inputsection/Inputsection';

const RightSolutions = () => {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Right Solutions | FinPrime</title>
          <meta
            name="description"
            content="Discover FinPrime's Right Solutions - Tailored financial and compliance solutions for your business success."
          />
        </Helmet>
        <Navbar />
        <Rhero />
        <DropDown />
        <Inputsection />
        <Oursection />
        <div className="flex justify-center w-full my-16">
          <img src={newSectionImage} alt="We always try to step outside comfort zone, that's part of the reason we got here." />
        </div>
        <Blogsection />
        <Faq />
        <Footer />
        <WhatsAppIcon />
        <CookieBanner />
      </div>
    </HelmetProvider>
  );
};

export default RightSolutions;
