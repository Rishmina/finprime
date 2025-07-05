import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Bbanner from './Bbanner/Bbanner';
import Btext from './Btext/Btext';
import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon';
import BList from './BlogList/BList';
import CookieBanner from '../Cookies/CookieBanner';


const Blog = ({ toggleSpeakExpert }) => {
  return (
    <HelmetProvider>
    <div className='relative overflow-hidden '>
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
      <Navbar toggleSpeakExpert={toggleSpeakExpert} />  
      <Bbanner/> 
      <Btext/>
      <BList/>
      <Footer/>
      <WhatsAppIcon/>
      <CookieBanner/>
    </div>
    </HelmetProvider>
  )
}

export default Blog;