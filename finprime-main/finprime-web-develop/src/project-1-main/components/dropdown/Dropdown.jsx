import React, { useState } from 'react';
import { HiOutlineArrowSmallDown } from "react-icons/hi2";

const Dropdown = () => {
  // Initialize state with all dropdowns open
  const [openIndexes, setOpenIndexes] = useState([0, 1]); // Add indices of all open dropdowns

  const toggleOpen = (index) => {
    if (openIndexes.includes(index)) {
      // If already open, remove it from the array
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // Add it to the array if not open
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqs = [
    {
      id: 1,
      question: "What we do",
      answer: "Quality and timeliness' are our core values which our team always ensures is never broken in any circumstances"
    },
    {
      id: 2,
      question: "What we Believe",
      answer: "We believe that bold steps taken by businesses must be rewarded in the best way. We seek out our clients to capture their greatest opportunities and guide them to do the right thing at the right time."
    },
  ];

  return (
    <div className='w-[80%] md:w-2/3 mx-auto mt-24 mb-24'>
      <div className=' '> 
        <div className='space-y-5 '>
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border-b">
              <div 
              className={`flex group justify-between items-center my-2 p-4 
              md:p-8 transition duration-200 cursor-pointer `} 
              onClick={() => toggleOpen(index)}>
                <h3 
                
                className={`font-semibold font-inter text-2xl  group-hover:text-brandBlue 
                md:text-4xl `}>{faq.question}</h3>
                <div className="bg-[#1B1B3A] rounded-full p-2">
                  <HiOutlineArrowSmallDown
                    className={`text-2xl sm:text-2xl lg:text-3xl text-white`}
                  />
                </div>
              </div>
              {openIndexes.includes(index) && (
                <p className="md:px-20 lg:px-28 px-10 font-inter mb-10 text-black text-md leading-7 tracking-[1px] md:text-[16px]">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
