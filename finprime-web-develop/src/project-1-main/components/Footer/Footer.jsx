import React, { useEffect, useState } from 'react';
import img from '../../images/Navbar/finprime-logo.svg';
import bankImage from '../../images/web-Bank-pro.png';
import companyProfileImage from '../../images/company-pro.png';
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from "react-icons/hi2";
import axios from 'axios';

import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const handlePrev = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://finprimeconsulting.com/api/testimonials');
        const sortedTestimonials = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTestimonials(sortedTestimonials);
      } catch (err) {
        setError('Error fetching testimonials. Please try again later.');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className='pt-10 pl-6 pr-4 text-white bg-black xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6 sm:pt-10'>
      <div>
        {/* -------------------------------------------------------header---------------------------------------------------------*/}
        <div className="flex flex-col w-full pb-1 sm:flex-row sm:pb-5">
          <div className="w-full sm:w-1/2 sm:px-0 sm:p-4">
            <h4 className="pt-8 pb-8 text-3xl font-semibold text-center font-inter sm:text-left sm:text-4xl sm:pb-0">
            Eye View - Strong Focus
            </h4>
          </div>
          <div className="flex justify-center w-full py-4 sm:w-1/2 sm:justify-end">
            <img src={img} alt="Fin Frame Logo" className='w-[250px] md:w-[300px]' />
          </div>
        </div>
        <hr className="border-t border-gray-900" />

        {/* -------------------------------------------------------3-column section---------------------------------------------------------*/}
        <div className="w-full flex flex-row justify-start items-start gap-8 mb-8 pl-0" >
          {/* Company Profile Card */}
          <div style={{ width: '300px', height: '455px', position: 'relative' }}>
            <img src={companyProfileImage} alt="Company Profile" className="w-full h-full object-contain" />
            <button
              onClick={() => window.open('/pdf/finprime-company-profile.pdf')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-8px] w-[260px] h-[45px] rounded-[26px] flex items-center justify-between px-10 text-white font-inter text-xs transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #1A1F39 0%, #06B6D4 100%)',
                height: '45px',
              }}
            >
              <span className="pl-2">FinPrime Profile</span>
              <div className="flex items-center justify-center ml-8">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="7" width="24" height="10" rx="2" stroke="white" strokeWidth="2"/>
                  <rect x="11" y="10" width="6" height="4" rx="1" fill="white"/>
                  <rect x="13.5" y="12" width="2" height="1" rx="0.5" fill="#06B6D4"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Banking Services Card */}
          <div style={{ width: '300px', height: '455px', position: 'relative' }}>
            <img src={bankImage} alt="Banking Services" className="w-full h-full object-contain" />
            <button
              onClick={() => window.open('/pdf/finprime-banking-services.pdf')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-8px] w-[260px] h-[45px] rounded-[26px] flex items-center justify-between px-6 gap-4 text-white font-inter text-[14px] transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #1A1F39 0%, #06B6D4 100%)',
                height: '45px',
              }}
            >
              <span className="whitespace-nowrap">FinPrime Banking Services</span>
              <div className="flex items-center justify-center">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="7" width="24" height="10" rx="2" stroke="white" strokeWidth="2"/>
                  <rect x="11" y="10" width="6" height="4" rx="1" fill="white"/>
                  <rect x="13.5" y="12" width="2" height="1" rx="0.5" fill="#06B6D4"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Testimonial Section */}
          <div className="flex lg:w-3/3" style={{ width: '750px', height: '395px', paddingTop: '3.5rem' }}>
            {loading ? (
              <p className="text-center">Loading testimonials...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : testimonials.length === 0 ? (
              <p className="text-center">No testimonials available.</p>
            ) : (
              <div className="w-full bg-white pt-8">
                {/* Display only the current testimonial */}
                <div key={testimonials[currentTestimonialIndex].id}>
                  <div className="lg:flex">
                    <img
                      src={`https://finprimeconsulting.com/${testimonials[currentTestimonialIndex].image_path}`}
                      alt={testimonials[currentTestimonialIndex].author_name}
                      className="object-contain object-top w-[350px] h-[200px] mx-auto lg:mx-0"
                    />

                    <div className="flex flex-col justify-between items-center sm:items-center md:items-center lg:items-start"
                      style={{ marginTop: '10px', marginLeft: '20px', marginRight: '10px' }}
                    >
                      <p className="text-gray-500 text-center mt-20 mb-14 text-xs font-inter px-4">
                        {testimonials[currentTestimonialIndex].content}
                      </p>
                      <div className="flex flex-col items-center text-center font-inter">
                        <p className="font-semibold text-sm text-gray-500">
                          {testimonials[currentTestimonialIndex].author_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonials[currentTestimonialIndex].topic}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User's bottom name and position */}
                  <div className="items-center mt-8 w-full lg:flex lg:justify-center">
                    <div className="flex flex-row items-center justify-center space-x-8 lg:space-x-4 lg:mt-0 lg:mr-10 mb-8">
                      <button
                        className="p-2 text-white rounded-full bg-brandBlue hover:bg-cyan-500 hover:text-black"
                        onClick={handlePrev}
                      >
                        <HiOutlineArrowSmallLeft className="text-xl" />
                      </button>
                      <button
                        className="p-2 text-white rounded-full bg-brandBlue hover:bg-cyan-500 hover:text-black"
                        onClick={handleNext}
                      >
                        <HiOutlineArrowSmallRight className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="border-t border-gray-900" />

        {/* -------------------------------------------------------links and address---------------------------------------------------------*/}
        <div className="flex flex-col w-full pt-8">
          <div className="mb-6 font-inter">
            <h4 className="text-base font-semibold mb-2">Headquarters</h4>
            <p className="text-white text-xs mb-1">Suite 1203, Floor 12A, DAMAC Executive Bay, Business Bay, Dubai, UAE</p>
            <p className="text-white text-xs">Phone: +971 58 259 3543</p>
          </div>

          {/* Social media and email section */}
          <div className="flex items-center justify-end gap-4 mb-8">
            <li className='flex space-x-2'>
               <div className="flex space-x-1 bg-white bg-opacity-55 rounded-[5px] border border-opacity-20 p-1">
                 <button className="hidden xl:block px-2 py-1 rounded-sm shadow-black text-[12px] tracking-[1px] transition-all duration-300 ease-out bg-gradient-to-r from-brandBlue to-cyan-500 text-white">Follow</button>
                 <a href="https://www.facebook.com/finprimeconsulting" aria-label="Facebook" className="p-1 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:border-opacity-10 hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                   <FaFacebookF size={14} />
                 </a>
                 <a href="https://x.com/FinPrimeConsult" aria-label="Twitter" className="p-1 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white">
                   <FaXTwitter size={14} />
                 </a>
                 <a href="https://www.linkedin.com/company/finprimeconsulting/" aria-label="LinkedIn" className="p-1 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white">
                   <RiLinkedinFill size={14} />
                 </a>
                 <a href="https://www.instagram.com/finprimeconsulting/" aria-label="Instagram" className="p-1 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:border-opacity-10 hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                   <FaInstagramSquare size={14} />
                 </a>
                 <a href="https://www.youtube.com/@FinPrimeConsulting" aria-label="YouTube" className="p-1 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white hover:border-opacity-10">
                   <FaYoutube size={14} />
                 </a>
               </div>
              </li>
            <a href="mailto:info@finprimeconsulting.com" 
               className="px-4 py-1 text-sm bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] rounded-full text-white hover:shadow-lg transition-all">
               info@finprimeconsulting.com
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 mb-6 text-xs">
            <Link to="/" className="text-white hover:text-cyan-500">Home</Link>
            <Link to="/about" className="text-white hover:text-cyan-500">About</Link>
            <Link to="/blogs" className="text-white hover:text-cyan-500">Blogs</Link>
            <Link to="/contact-us" className="text-white hover:text-cyan-500">Contact Us</Link>
            <Link to="/terms-of-use" className="text-white hover:text-cyan-500">Terms of use</Link>
            <Link to="/privacy" className="text-white hover:text-cyan-500">Privacy</Link>
            <Link to="/cookie-policy" className="text-white hover:text-cyan-500">Cookie Policy</Link>
            <Link to="/sitemap" className="text-white hover:text-cyan-500">Sitemap</Link>
          </div>

          <hr className="border-t border-gray-800 mb-8" />

          <div className="text-xs text-gray-400 pb-8">
            © 2019 - 2025 Finprime Consulting, Presented by{' '}
            <a href="https://zorroarabemirates.com" className="text-[#FFD700] hover:text-cyan-500 transition-colors">
              Zorro Arab Emirates
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;