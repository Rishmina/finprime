import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const ContactIcons = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'hero') {
            setIsHeroVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971521540818', '_blank'); // Updated WhatsApp number
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+971582593543'; // Updated phone number
  };

  if (isHeroVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-10 right-5 flex flex-col z-50 space-y-4">
      {/* Call Icon */}
      <div
        onClick={handleCallClick}
        className="flex bg-blue-500 rounded-full px-2 py-2 cursor-pointer shadow-lg transition-transform transform hover:scale-110"
        aria-label="Call us"
      >
        <FaPhone className="text-white text-2xl" />
      </div>

      {/* WhatsApp Icon */}
      <div
        onClick={handleWhatsAppClick}
        className="flex bg-green-500 rounded-full px-2 py-2 cursor-pointer shadow-lg transition-transform transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default ContactIcons;
