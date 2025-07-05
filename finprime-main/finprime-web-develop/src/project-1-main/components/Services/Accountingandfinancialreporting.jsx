import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Servicesection2 from './Servicesection2'
import Servicesection3 from './Servicesection3'
import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon'
import CookieBanner from '../Cookies/CookieBanner'
import Servicesectionnew from './ServicesectionNewtext'
import { metaDetails } from '../Services';


const Accountingandfinancialreporting = () => {
  const { servicetitle, subServicetitle } = useParams();

  const currentMeta = metaDetails[subServicetitle] || {
    title: 'Finprime Business and Tax Consultancy',
    description: 'Professional business and tax consultancy services in Dubai by FinPrime. Explore our solutions.',
    keywords: 'business consultancy, tax consultancy, Dubai services'
  };

  console.log(currentMeta)
  return (
    <HelmetProvider>
      <div className='relative overflow-hidden'>
        <Helmet>
          <title>{currentMeta.title}</title>
          <meta name="title" content={currentMeta.title} />
          <meta name="description" content={currentMeta.description} />
          <meta name="keywords" content={currentMeta.keywords} />
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
        <Navbar />
        <Servicesection2 />
        <Servicesection3 />
        <Servicesectionnew />
        <Footer />
        <CookieBanner />
        <WhatsAppIcon />
      </div>
    </HelmetProvider>
  )
}

export default Accountingandfinancialreporting