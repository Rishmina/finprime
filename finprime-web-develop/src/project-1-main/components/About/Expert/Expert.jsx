import React, { useState, useEffect } from "react";
import Murshina_A from "../../../images/team/Murshina_A.jpg";
import Hiba_Farook from "../../../images/team/Hiba_Farook.jpg";
import Ashker_Cv from "../../../images/team/Ashker_Cv.jpg";
import Abood_Wadi from "../../../images/team/Abood_Wadi.jpg";
import Zain_Rabab from "../../../images/team/Zain_Rabab.jpg";
import Siljo_Devassy from "../../../images/team/Siljo_Devassy.jpg";
import Mohammed_Fayyaz_Majeed from "../../../images/team/Mohammed_Fayyaz_Majeed.jpg";
import Althaf from "../../../images/team/althaf.png";
import Mohamed_Oun from "../../../images/mohm.jpg";

const cardsData = [
  {
    image: Ashker_Cv,
    alt: "C.A Ashker Kareem",
    name: "C.A Ashker Kareem",
    position: "Founder & CEO",
    number: 1,
    ceo: true,
  },
  {
    image: Mohamed_Oun,
    alt: "Mohamed Oun",
    name: "Mohamed Oun",
    position: "Business consultant",
    number: 2,
  },
  {
    image: Althaf,
    alt: "Mohamed Althaf",
    name: "Mohamed Althaf",
    position: "G M - Operations & Business Development",
    number: 4,
  },
  {
    image: Zain_Rabab,
    alt: "C.A Zain Rabab",
    name: "C.A Zain Rabab",
    position: "Manager - Audit & Assurance",
    number: 5,
  },
  {
    image: Abood_Wadi,
    alt: "Abdul Rahman AA Wadi",
    name: "Abdul Rahman AA Wadi",
    position: "Legal Consultant",
    number: 3,
  },
  {
    image: Siljo_Devassy,
    alt: "Siljo Devassy",
    name: "Siljo Devassy",
    position: "Manager - Finance and Tax",
    number: 6,
  },
  {
    image: Hiba_Farook,
    alt: "Hiba Farook",
    name: "Hiba Farook",
    position: "HR and Recruitment Manager",
    number: 7,
  },
  {
    image: Mohammed_Fayyaz_Majeed,
    alt: "Mhd Fayyaz Majeed",
    name: "Mhd Fayyaz Majeed",
    position: "Digital Marketing Manager",
    number: 8,
  },
  {
    image: Murshina_A,
    alt: "Murshina A",
    name: "Murshina A",
    position: "Account Manager - Service",
    number: 9,
  },
];

const Expert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleEnquiryClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };
  
  const ceoCard = cardsData.find(card => card.ceo);
  const otherCards = cardsData.filter(card => !card.ceo);

  return (
    <div className="xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:ml-8 md:mr-6 ml-6 mr-4 max-w-screen md:my-20">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left Column: Info */}
        <div className="w-full md:w-1/4 flex flex-col items-center text-center md:text-left">
          <div className="flex flex-col items-center w-full">
            <button 
              className="text-gray-700 font-semibold hover:bg-cyan-50 transition-colors"
              style={{
                width: '300px',
                height: '76px',
                borderRadius: '5px',
                border: '1px solid #0B8FAC',
                fontFamily: "'Kulim Park', sans-serif",
                fontSize: '26px',
              }}
            >
              Get Acquaintance
            </button>
            
            <div className="flex flex-col items-center mt-8">
              <button
                onClick={() => handleEnquiryClick(ceoCard)}
                style={{
                  width: '163px',
                  height: '43px',
                  borderRadius: '26.5px',
                  border: 'none',
                  fontFamily: "'Kulim Park', sans-serif",
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '27px',
                  letterSpacing: '0%',
                  background: 'linear-gradient(90deg, #1A1F39 35.58%, #06B6D4 100%)',
                  color: '#FFFFFF',
                }}
              >
                Reply or action
              </button>

              <div className="pt-4 text-center">
                <h3 
                  className="text-gray-800"
                  style={{
                    width: '190px',
                    height: '27px',
                    fontFamily: "'Kulim Park', sans-serif",
                    fontWeight: 600,
                    fontSize: '22px',
                    lineHeight: '27px',
                    letterSpacing: '0%',
                  }}
                >
                  {ceoCard.name}
                </h3>
                <p 
                  className="mt-1"
                  style={{
                    fontFamily: "'Kulim Park', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '27px',
                    letterSpacing: '0%',
                    color: '#323232',
                  }}
                >
                  {ceoCard.position}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image Grid */}
        <div className="w-full md:w-3/4">
          {/* First Row: CEO + 3 Team Members */}
          <div className="flex flex-nowrap justify-start items-start gap-x-6 gap-y-12 mb-12">
            {/* CEO Image Card */}
            <div className="flex flex-col items-center text-center flex-shrink-0">
              <div
                className="relative"
                style={{ width: '306px', height: '390px' }}
              >
                <img
                  src={ceoCard.image}
                  alt={ceoCard.alt}
                  className="w-full h-full object-cover object-top shadow-xl rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl"></div>
                <button
                  onClick={() => handleEnquiryClick(ceoCard)}
                  className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[220px] h-[52px] rounded-full bg-gradient-to-r from-[#191F3A] to-[#00BFFF] text-white text-lg shadow-lg flex items-center justify-center border-2 border-white/30"
                  style={{ fontFamily: "'Kulim Park', sans-serif" }}
                >
                  CEO Message
                </button>
              </div>
            </div>

            {/* First 3 Team Members */}
            {otherCards.slice(0, 3).map(card => (
              <div key={card.number} className="flex flex-col items-center text-center flex-shrink-0">
                <div className="relative w-[180px] h-[220px]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover shadow-lg"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  <button
                    onClick={() => handleEnquiryClick(card)}
                    className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[120px] h-[34px] rounded-full bg-gradient-to-r from-[#191F3A] to-[#00BFFF] text-white shadow-lg flex items-center justify-center border border-white/30"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '12px' }}
                  >
                    Reply or action
                  </button>
                </div>
                <div className="mt-4">
                  <h4
                    className="font-semibold text-gray-800"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '20px' }}
                  >
                    {card.name}
                  </h4>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '14px' }}
                  >
                    {card.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row: Remaining Team Members */}
          <div className="flex flex-nowrap justify-start gap-x-16 gap-y-12 -ml-48">
            {otherCards.slice(3).map(card => (
              <div key={card.number} className="flex flex-col items-center text-center flex-shrink-0">
                <div className="relative w-[180px] h-[220px]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover shadow-lg"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  <button
                    onClick={() => handleEnquiryClick(card)}
                    className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[120px] h-[34px] rounded-full bg-gradient-to-r from-[#191F3A] to-[#00BFFF] text-white shadow-lg flex items-center justify-center border border-white/30"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '12px' }}
                  >
                    Reply or action
                  </button>
                </div>
                <div className="mt-4">
                  <h4
                    className="font-semibold text-gray-800"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '20px' }}
                  >
                    {card.name}
                  </h4>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Kulim Park', sans-serif", fontSize: '14px' }}
                  >
                    {card.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal logic remains */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-5 md:mx-0">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 text-gray-800 hover:text-cyan-500 text-[16px]"
            >
              Close
            </button>
            <div className="w-full p-4 flex flex-col lg:flex-row justify-between items-center">
              <div className="flex justify-center mb-4 lg:mb-0">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
              <div className="lg:ml-6 text-gray-800 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-2">{selectedCard.name}</h3>
                <p className="mb-4">{selectedCard.position}</p>
                <form className="flex flex-col items-center lg:items-start">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expert;
