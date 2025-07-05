import React from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const InfoSection = ({ title, open, onToggle, children }) => {
  return (
    <div className="w-full md:w-4/5 sm:mx-auto sm:px-4 font-kulim-park">
      <div className="flex justify-between items-center  border-gray-300 pb-2 cursor-pointer" onClick={onToggle}>
        <h2 className="text-2xl md:text-2xl pl-8 md:pl-0" style={{ fontFamily: 'Kulim Park, sans-serif', fontWeight: 200 }}>{title}</h2>
        <button className="text-2xl bg-transparent text-black rounded-full w-12 h-12 flex items-center justify-center focus:outline-none">
          {open ? <FaArrowDown /> : <FaArrowRight />}
        </button>
      </div>
      {open && (
        <div className="py-8 text-center text-base md:text-lg text-black font-inter transition-all duration-300">
          {children}
        </div>
      )}
      <div className="border-b border-gray-200 mt-2" />
    </div>
  );
};

export default InfoSection; 