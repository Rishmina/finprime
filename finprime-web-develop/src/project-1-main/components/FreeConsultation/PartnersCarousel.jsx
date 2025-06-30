import React from "react";
import "./PartnersCarousel.css";
import SSLootah from "../../images/partners/SS_LOOTH.png";
import Careem from "../../images/partners/Careem.png";
import Daken from "../../images/partners/DARKEN_SWEETS.png";
import Garner from "../../images/partners/GARNER.png";
import LumoPay from "../../images/partners/partner1.png";
import Easy from "../../images/partners/partner2.png";
import MBM from "../../images/partners/partner3.png";
import ABC from "../../images/partners/partner4.png";
import Impex from "../../images/partners/impex.png";
import Lims from "../../images/partners/lims_group.png";
import PinkLine from "../../images/partners/pinklineinteriors.png";
import ABCNew from "../../images/ABC.jpg";
import MBMNew from "../../images/mbm.png";

const PartnersCarousel = () => {
  const partners = [
    SSLootah, Careem, Daken, Garner, LumoPay, Easy, MBM, ABC, Impex, Lims, PinkLine, ABCNew, MBMNew
  ];

  // Create multiple sets for seamless infinite scroll
  const carouselItems = [...partners, ...partners, ...partners];

  return (
    <div className="partners-carousel-container">
      <div className="bg-black text-white py-6">
        <div className="container mx-auto flex items-center justify-start px-6 sm:px-12">
          <svg
            className="w-8 h-8 mr-4 sm:mr-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-kulim-park">Selected Partners</h2>
        </div>
      </div>
      
      <div className="partners-carousel-wrapper">
        <div className="partners-carousel">
          {carouselItems.map((partner, index) => (
            <div key={index} className="partner-item">
              <img 
                src={partner} 
                alt={`Partner ${index + 1}`} 
                className="partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
