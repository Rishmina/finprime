import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SSLootah from "../../images/partners/SS_LOOTH.png";
import Careem from "../../images/partners/Careem.png";
import Daken from "../../images/partners/DARKEN_SWEETS.png";
import Garner from "../../images/partners/GARNER.png";
import LumoPay from "../../images/partners/partner1.png";
import Easy from "../../images/partners/partner2.png";
import MBM from "../../images/partners/partner3.png";
import ABC from "../../images/partners/partner4.png";
import Rainbow from "../../images/partners/impex.png";
import Impex from "../../images/partners/impex.png";
import Lims from "../../images/partners/lims_group.png";
import PinkLine from "../../images/partners/pinklineinteriors.png";
import ABCNew from "../../images/ABC.jpg";
import MBMNew from "../../images/mbm.png";

const PartnersCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const partners = [
    SSLootah, Careem, Daken, Garner, LumoPay, Easy, MBM, ABC, Rainbow, Impex, Lims, PinkLine, ABCNew, MBMNew
  ];

  return (
    <div>
      <div className="bg-black text-white py-8">
        <div className="container mx-auto flex items-center justify-start px-12">
          <svg
            className="w-10 h-10 mr-6"
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
          <h2 className="text-4xl font-kulim-park">Selected Partners</h2>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="px-2">
              <img src={partner} alt={`Partner ${index + 1}`} className="h-16 mx-auto" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PartnersCarousel;
