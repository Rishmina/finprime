import React from 'react';
import img1 from '../../images/oursection/section1.jpg';
import img2 from '../../images/team/Ashker.jpg';
import img3 from '../../images/oursection/unique_brand_experince.jpg';
import { Link, useLocation } from 'react-router-dom';

const Card = ({ title, image, alt }) => (
  <div className="relative overflow-hidden transition-transform duration-200">
    <img
      src={image}
      alt={alt}
      className="w-full h-[340px] object-cover object-top"
    />
    <div className="absolute left-0 right-0 flex justify-center p-4 bottom-6">
      <h4 className="font-bold text-white text-base sm:text-lg font-inter lg:text-xl text-center">{title}</h4>
    </div>
  </div>
);

const OurSection = () => {
  const cardData = [
    { title: 'Power of Finprime', image: img1, link: '/about#our-team', alt: 'Finprime Business & Tax Consultancy Team' },
    { title: 'Lets Meet CEO', image: img2, link: '/CEO', alt: 'Finprime Business & Tax Consultancy Team' },
    { title: 'Unique Brand Experience', image: img3, link: '/CEO', alt: 'Business Consultancy Services in UAE' },
  ];

  return (
    <div id="ceo" className="mt-4 mb-8 px-2 sm:px-0 md:mx-8 lg:mx-10 xl:mx-12">
      <div className="pt-4 pb-2">
        <div className="flex flex-row justify-between items-start mx-2 mb-4">
          <h4 className="text-xl font-semibold font-inter text-left">Relax. We've got you.</h4>
          <h5 className="text-xl font-semibold font-inter text-right">The best results</h5>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-start">
          {cardData.map((card, index) => (
            <Link to={card.link} className="w-full sm:w-1/3" key={index}>
              <Card title={card.title} image={card.image} alt={card.alt} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurSection;
