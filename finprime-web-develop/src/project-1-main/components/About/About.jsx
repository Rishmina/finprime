import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import bgvideo from '../../public/hero1.mp4';
import Ahero from './Ahero/Ahero';
import Footer from '../Footer/Footer';
import Atext from './Text/Atext';
import Expert from './Expert/Expert';
import Choose from './Choose/Choose';
import Accounts from './Accounts/Accounts';
import Atext1 from './Text/Atext1';
import Navbar from '../Navbar/Navbar';
import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon';
import Dropdown from '../dropdown/Dropdown';
import Text3 from '../Text/Text3';
import CookieBanner from '../Cookies/CookieBanner';
import InfoSection from './Text/InfoSection';
import menuAboutFull from '../../images/company/menu-about-full.jpg';

const AboutAccordion = () => {
  const [openSection, setOpenSection] = useState(null);
  return (
    <div className="my-8">
      <InfoSection
        title="What we do"
        open={openSection === 'do'}
        onToggle={() => setOpenSection(openSection === 'do' ? null : 'do')}
      >
        Quality and timeliness' are our core values which our team always ensures is never broken in any circumstances
      </InfoSection>
      <div className="my-6" />
      <InfoSection
        title="What we Believe"
        open={openSection === 'believe'}
        onToggle={() => setOpenSection(openSection === 'believe' ? null : 'believe')}
      >
        We believe that bold steps taken by businesses must be rewarded in the best way. We seek out our clients to capture their greatest opportunities and guide them to do the right thing at the right time.
      </InfoSection>
    </div>
  );
};

const About = ({ toggleSpeakExpert }) => {
    return (
        <HelmetProvider>
            <div className='relative overflow-hidden'>
                <Helmet>
                    <title>Finframe Business and Tax Consultancy</title>
                    <meta name="description" content="Get in touch with EpicEventz for all your corporate event planning needs. Contact us today!" />
                    <meta name="keywords" content="contact, event planning, corporate events" />
                    <meta name="author" content="EpicEventz" />
                    <meta property="og:title" content="Contact Us - EpicEventz" />
                    <meta property="og:description" content="Reach out to us for expert corporate event solutions, including annual and family day celebrations." />
                    <meta property="og:image" content="https://yourwebsite.com/images/about-page-image.jpg" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://yourwebsite.com/about" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Contact Us - EpicEventz" />
                    <meta name="twitter:description" content="Reach out to us for expert corporate event solutions, including annual and family day celebrations." />
                    <meta name="twitter:image" content="https://yourwebsite.com/images/about-page-image.jpg" />
                </Helmet>

                <div className="h-[700px] xl:h-[520px] relative overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src="/hero1.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 h-full">
                      <Navbar toggleSpeakExpert={toggleSpeakExpert} />
                      <Ahero />
                    </div>
                </div>
                <Atext1 />
                <Atext />
                <AboutAccordion />
                {/* People and Culture Section */}
                <div className="relative w-full flex justify-center items-center my-12">
                  <img
                    src={menuAboutFull}
                    alt="Our People and Culture"
                    className="w-full max-h-[420px] object-cover rounded-lg shadow"
                  />
                  {/* Top right label */}
                  <div className="absolute top-6 right-8 px-6 py-2 rounded-full text-white text-lg font-semibold" style={{background: 'linear-gradient(90deg, #191F3A 60%, #06B6D4 100%)'}}>
                    Our People and Culture
                  </div>
                  {/* Bottom overlay text */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] bg-black bg-opacity-60 px-6 py-3 rounded text-white text-xl text-center font-normal" style={{background: 'linear-gradient(90deg, #191F3A 60%, #06B6D4 100%)', opacity: 0.85}}>
                    Trust grows when your time Might lead them to feel more empowered.
                  </div>
                </div>
                <Text3 />
                <Expert />
                <Choose />
                <Footer />
                <CookieBanner />
                <WhatsAppIcon />

            </div>
        </HelmetProvider>
    );
};

export default About;
