import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "What services does your accounting firm offer?",
      answer: "We offer a range of services including tax preparation, bookkeeping, and financial consulting."
    },
    {
      id: 2,
      question: "How can I schedule a consultation?",
      answer: "You can schedule a consultation by visiting our website or calling our office directly."
    },
    {
      id: 3,
      question: "What are your fees?",
      answer: "Our fees vary depending on the services required. Please contact us for a detailed quote."
    },
    {
      id: 4,
      question: "Do you provide services to individuals as well as businesses?",
      answer: "Yes, we cater to both individual clients and businesses of all sizes."
    },
  ];

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

  return (
    <div
      ref={fadeElementRef}
      className={`flex items-left md:ml-14 md:mr-6 xl:ml-24 xl:mr-10 lg:mr-8 lg:ml-18 ml-2 mr-4 mb-[20px] mt-[28px] sm:mt-28 sm:mb-28 ${hasFadedIn ? 'animate-fadeinbottom' : ''}`}
    >
      <div className='w-full md:w-[90%] lg:w-[80%] 2xl:w-[70%] px-4 sm:px-0'>
        <h1 className='text-lg sm:text-2xl font-inter font-semibold mb-6'>Frequently Asked Questions</h1>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              <div className="flex group justify-between w-full items-center my-2 transition duration-200" onClick={() => toggleOpen(index)}>
                <h4 className="font-medium w-[60%] tracking-[0.5px] leading-5 sm:leading-6 sm:w body group-hover:text-brandBlue text-[14px] sm:text-[16px] font-inter cursor-pointer">
                  {faq.question}
                </h4>
                <HiOutlineArrowSmallRight
                  className={`text-3xl md:text-4xl group-hover:bg-black group-hover:text-white sm:w rounded-full border border-black p-1.5 transition-transform transform ${openIndex === index ? 'rotate-90' : ''}`}
                />
              </div>
              {openIndex === index && (
                <p className="pl-4 text-[13px] sm:text-[14px] tracking-[0.5px] pr-10 mb-4 font-inter md:text-[15px] text-gray-600">{faq.answer}</p>
              )}
              <hr className='my-3 border-gray-300' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;

