import React, { useState } from "react";
import Murshina_A from "../../images/team/Murshina_A.jpg";
import Hiba_Farook from "../../images/team/Hiba_Farook.jpg";
import Ashker_Cv from "../../images/team/Ashker_Cv.jpg";
import Abood_Wadi from "../../images/team/Abood_Wadi.jpg";
import Zain_Rabab from "../../images/team/Zain_Rabab.jpg";
import Ishmail_martin_Muga from "../../images/team/Ishmail_martin_Muga.jpg";
import Siljo_Devassy from "../../images/team/Siljo_Devassy.jpg";
import Mohammed_Fayyaz_Majeed from "../../images/team/Mohammed_Fayyaz_Majeed.jpg";
import Althaf from "../../images/team/althaf.png";
const Servicesection8 = () => {
  const [showMore, setShowMore] = useState(false);

  const columns = [
    {
      id: 1,
      image: Ashker_Cv,
      alt: "C.A Ashker Kareem",
      name: "C.A Ashker Kareem",
      position: "Ceo & Founder",
    },
    {
      id: 2,
      image: Abood_Wadi,
      alt: "Abdul Rahman AA wadi",
      name: "Abdul Rahman AA wadi",
      position: "Business Development Manager",
    },
    {
      id: 3,
      image: Althaf,
      alt: "Mohamed Althaf",
      name: "Mohamed Althaf",
      position: " General Manager - Operations and Business Development",
    },
    {
      id: 4,
      image: Zain_Rabab,
      alt: "C.A Zain Rabab",
      name: "C.A Zain Rabab",
      position: " Audit Manager - Audit and Assurance",
    },
    {
      id: 5,
      image: Ishmail_martin_Muga,
      alt: "Ishmail martin Muga",
      name: "Ishmail martin Muga",
      position: " Accounting Manager Taxation",
    },
    {
      id: 6,
      image: Siljo_Devassy,
      alt: "Siljo Devassy",
      name: "Siljo Devassy",
      position: "Manager- Finance and Tax",
    },

    {
      id: 7,
      image: Hiba_Farook,
      alt: "Hiba Farook",
      name: "Hiba Farook",
      position: "HR and Recruitment Manager",
    },
    {
      id: 8,
      image: Murshina_A,
      alt: "Murshina A",
      name: "Murshina A",
      position: "Account Manager- Accounting Service",
    },
    {
      id: 9,
      image: Mohammed_Fayyaz_Majeed,
      alt: "Mohammed Fayyaz Majeed",
      name: "Mohammed Fayyaz Majeed",
      position: "Digital Marketing Manager",
    },
  ];

  const visibleColumns = showMore ? columns : columns.slice(0, 3);

  return (
    <div className="mt-20 mb-10 sm:mb-20 xl:mr-10 xl:ml-12 lg:mr-8 lg:ml-10 md:mr-6 md:ml-8 ml-6 mr-4">
      <div className="mb-8">
        <h4 className="text-4xl sm:text-5xl font-semibold mb-2">
          Meet our Experts
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 wrapper">
        {visibleColumns.map((column) => (
          <div key={column.id} className="border card">
            <img
              src={column.image}
              alt={`Image ${column.alt}`}
              className="w-full object-top h-auto  "
            />
            <div className="info">
              <h4 className="text-xl sm:text-2xl uppercase font-bold mb-2 text-white">
                {column.name}
              </h4>
              <h4>{column.position}</h4>
              <p className="text-white">{column.text}</p>
            </div>
          </div>
        ))}
      </div>

      {!showMore && (
        <div className="text-center mt-8">
          <button
            className="bg-transparent text-xs md:text-base text-black py-1 sm:py-2 px-4 sm:px-8 border border-black mt-2 mb-10  sm:mb-20
             transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Servicesection8;
