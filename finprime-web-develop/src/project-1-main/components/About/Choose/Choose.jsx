import React, { useEffect, useRef, useState } from 'react';
import img2 from '../../../images/choose/choose.jpeg';
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

const Choose = () => {

  const [hasFadedIn, setHasFadedIn] = useState(false); 
  const fadeElementRef = useRef(null);

  useEffect(() => {
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFadedIn) {
            setHasFadedIn(true); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    const currentElement = fadeElementRef.current;
    if (currentElement) {
      fadeInObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        fadeInObserver.unobserve(currentElement);
      }
    };
  }, [hasFadedIn]);


  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { id: 1, 
      question: 'Accounting and Financiai Reporting', 
      answer: 'Our dedicated Accounting team are fully conversant with traditional and International accounting software viz. Tally ERP, SAGE, NAVISION, NETSUITE, SAP, MICROSOFT DYNAMICS, Zoho Books, Quick Books, ODOO etc. We ensure that accounts are maintained in accor' },
    { id: 2, 
      question: 'Audit and Assurance', 
      answer: 'Our sister audit firm Mansoor Mulla Auditing is DMCC, JAFZA, DAFZA approved auditors with license number 738553 and approved by Ministry of Economy to carry out activities of Auditing. We are in the process of listing other freezones as well.' },
    { id: 3,
       question: 'Business Advisory', 
       answer: 'We assist you in establishing your dream company anywhere in UAE. We manage the entire process from identifying an ideal sponsor, location as per your requirements, key service providers/contractors, to procuring necessary clearances from government bodie' },
    { 
      id: 4, 
      question: 'Transaction Advisory', 
      answer: 'Mistakes are common in VAT returns but there should be a solution. Our efficient team of tax experts who are well versed in Arabic language can submit reconsideration forms and can appear before FTA authorities in cases involving genuine mistakes and reso' 
    },
  ];


  return (
    <div 
    ref={fadeElementRef}
    className={`max-w-full my-16 xl:ml-12 xl:mr-10 lg:ml-10 lg:mr-8 md:ml-8 md:mr-6 ml-6 mr-4 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}>








      
      <div className="flex flex-col lg:flex-row">



        
        <div className="w-full lg:w-2/3 ">
          <h3
            className='text-2xl md:text-3xl font-medium pb-5 pl-5 border-l-4 border-gray-800'
          >
            Why Choose Us
          </h3>

          <div className="pt-20 pl-5 sm:pl-14 lg:pl-16  pb-10 pr-5">
            <h3 
              className="text-xl lg:text-3xl font-kulim-park mb-8 text-white py-3 px-5 inline-block"
              style={{ background: 'linear-gradient(to right, #1e293b, #06b6d4)' }}
            >
              We Make World Class Financial Service
            </h3>
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <div key={faq.id} 
                className='md:pr-14 lg:pr-0'>
                  <div
                    className="flex justify-between items-center  cursor-pointer group transition duration-200"
                    onClick={() => toggleOpen(index)}
                  >
                    <h3 className=" text-sm sm:text-[24px] tracking-[1px]  font-kulim-park font-medium">{faq.question}</h3>
                    <HiOutlineArrowSmallRight
                      className={`text-4xl lg:text-5xl rounded-full border  border-black p-2 group-hover:bg-black group-hover:text-white
                         transition-transform transform ${openIndex === index ? 'rotate-90' : ''}`}
                    />
                  </div>
                  
                  
                    {openIndex === index && (
                      <p 
                        className="px-4 sm:px-16 leading-7 text-sm sm:text-[16px] font-inter tracking-[1px] mb-5 text-gray-600 mt-2"
                      >
                        {faq.answer}
                      </p>
                    )}
                
                  <hr className="my-4 border-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>








        {/* Second Div*/}
        <div className="w-full lg:w-2/5 relative">
          <div className="flex items-center justify-center lg:justify-end relative bottom-0 lg:top-10 xl:top-5 right-0">
            <img
              src={img2}
              alt="Banner Image"
              className="h-[220px] sm:h-[260px] md:h-[370px] lg:h-[590px] xl:h-[580px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;

