
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function CookieBanner() {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    if (!cookieConsent) {
      setIsCookieBannerVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 }); 
    setIsCookieBannerVisible(false); 
  };

  const handleDeclineCookies = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365 }); 
    setIsCookieBannerVisible(false); 
  };

  if (!isCookieBannerVisible) {
    return null; 
  }

  return (
    <div className="fixed top-28 left-8 sm:left-0  sm:bottom-10 sm:right-20 w-[250px] sm:w-[300px] h-[150px] bg-gray-800 bg-opacity-50 text-white p-4 rounded shadow-lg flex flex-col items-center justify-center z-50">
      <p className="text-center mb-4 text-sm">
        We use cookies to enhance your experience on our website. By continuing, you accept our use of cookies.
      </p>
      <div className="flex space-x-6">
        <button
          onClick={handleAcceptCookies}
          className="px-4 py-2 bg-transparent border-2 text-sm border-black border-opacity-50 hover:bg-black bg-opacity-20 text-white "
        >
          Accept
        </button>
        <button
          onClick={handleDeclineCookies}
          className="px-4 py-2 bg-transparent border-2 text-sm border-black border-opacity-50 hover:bg-black bg-opacity-20 text-white "
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
