import React, { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

const DynamicButton = ({ defaultText, activeText, formTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.body.style.overflow = ''; 
    };
  }, [isOpen]);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      
      <div onClick={toggleForm}>
        <button>{isOpen ? activeText : defaultText}</button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0  bg-black bg-opacity-60 z-50 flex justify-center items-center"
          onClick={toggleForm}
        >
          <div
            className="relative bg-brandBlue w-full h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white font-bold"
              onClick={toggleForm}
            >
              <IoIosClose size={28} className="hover:text-brandBlue transition-colors duration-500" />
            </button>

            {/* Form */}
            <form action="" className="space-y-4 z-50">
              <div className="w-[100%] mx-auto">
                <h1 className="text-white font-inter text-4xl font-semibold py-6">{formTitle}</h1>
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b-2 border-white font-inter focus:outline-none focus:border-brandBlue text-white placeholder:text-gray-600 font-semibold text-sm transition-colors placeholder:font-inter duration-300 ease-in-out"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full bg-transparent border-b-2 border-white focus:outline-none placeholder:font-inter text-white placeholder:text-gray-600 font-semibold text-sm focus:border-brandBlue transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full bg-transparent border-b-2 text-white placeholder:font-inter placeholder:text-gray-600 font-semibold text-sm border-white focus:outline-none focus:border-brandBlue transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    className="w-full bg-transparent border-b-2 border-white focus:outline-none text-white placeholder:text-gray-600 font-semibold text-sm placeholder:font-inter focus:border-brandBlue transition-colors"
                  />
                  <label htmlFor="privacy-policy" className="ml-1 block text-xs text-gray-300 font-inter">
                    I agree to the Privacy Policy <span className="text-red-900 font-inter underline">required</span>
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-transparent border border-white text-white py-2 px-16 text-sm font-inter transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </li>
  );
};

export default DynamicButton;
