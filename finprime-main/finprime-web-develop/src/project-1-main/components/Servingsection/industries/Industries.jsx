import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import Industriessection2 from './Industriessection2'
import Industriessection3 from './Industriessection3'
import Industriessection4 from './Industriessection4'
import Industriessection5 from './Industriessection5'
import Industriessection6 from './Industriessection6'
import WhatsAppIcon from '../../WhatsAppIcon/WhatsAppIcon';
import CookieBanner from '../../Cookies/CookieBanner';

const Industries = () => {
  return (
    <HelmetProvider>
    <div>
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
        <Navbar/>
        <Industriessection2/>
        <Industriessection3/>
        <Industriessection4/>
        <Industriessection5/>
        <Industriessection6/>
        <Footer/>
        <WhatsAppIcon/>
        <CookieBanner/>
    </div>
    </HelmetProvider>
  )
}

export default Industries