import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF,  FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiLinkedinFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { IoIosPhonePortrait } from "react-icons/io";
import { ImAddressBook } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import emailjs from "emailjs-com";


const ContactUs = () => {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
        alert('All fields are required');
        return;
    }

    setLoading(true);
    fetch('https://finprimeconsulting.com/api/send2email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message || 'Form submitted successfully!');
            setMessage(data.message);
            setFormData({ name: '', email: '' });

            const templateParams = {
                firstName: formData.name,
                email: formData.email,
            };

            emailjs
                .send('service_m92dk5v', 'template_nhk2mx3', templateParams, '_zGtLeC1_fmp56KY0')
                .then(
                  (response) => {
                    alert('Your enquiry has been submitted successfully!');

                    // Send the auto-reply email
                    const autoReplyParams = {
                        to_name: formData.name,
                        to_email: formData.email,
                    };
        
                    emailjs
                        .send('service_m92dk5v', 'template_x05occf', autoReplyParams, '_zGtLeC1_fmp56KY0')
                        .then(
                            (autoReplyResponse) => {
                                console.log('Auto-reply email sent successfully!');
                            },
                            (autoReplyError) => {
                                console.error('Failed to send the auto-reply email:', autoReplyError);
                            }
                        );
                },
                  (error) => {
                      alert('Failed to send the enquiry email.');
                  }
              );
        })
        .catch((error) => {
            alert('Failed to submit the form.');
        })
        .finally(() => setLoading(false));
      };


  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); 

  const LocationMap = ({ mapSrc }) => (
    <div className="mt-10">
      <div className="w-full h-40 pt-10">
        <iframe
          title="Location Map"
          className="w-full h-full "
          src={mapSrc}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );

  return (
    <div>
     
      <div className=" mt-72 ">
        <div className='border-b-2 xl:ml-12 xl:mr-10 lg:mr-8 lg:ml-10 md:ml-8 md:mr-6 ml-6 mr-4'>
        <h3 className="text-3xl md:text-5xl font-inter font-medium   pb-4 animate-fadeinright">we provide world class best financial Accounting </h3>
        <h3 className="text-md md:text-5xl mb-8  font-medium font-inter    pb-8 animate-fadeinright">and Auditing services in dubai</h3>
        <h4 className='mb-8 text-gray-500 text-xs sm:text-[16px] font-inter font-medium tracking-[1px]'>CONTACT INFO</h4>
        <h4 className='text-2xl sm:text-5xl mb-4 font-inter font-medium bg-gradient-to-r from-brandBlue via-cyan-500
               to-cyan-300 bg-clip-text  text-transparent'>Get in Touch</h4>
        <p className='text-gray-500 text-xs sm:text-[16px] tracking-[1px] font-medium mb-2'>Looking for a dedicated Accountant to take care of your Business. We</p>
        <p className='mb-6 text-gray-500 text-xs sm:text-[16px] font-medium tracking-[1px]'>ensure your data is secure with us. For More details, Talk to our expert</p>
        </div>
        


        <div className="flex flex-wrap lg:flex-nowrap ml-6 xl:ml-4 mr-4 sm:ml-0 sm:mr-0 sm:mx-8">
          <div className="w-full lg:w-5/6 p-4 space-y-4 lg:border-r-2 animate-fadeinbottom">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">





              {/* UAE */}
              <div className="space-y-3 lg:px-4">
                <h4 className="text-[22px] font-semibold pb-4">UAE</h4>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><CgMail size={22} className="mr-2 bg-white rounded-full shadow-lg py-1 px-1 transition-all duration-300 ease-out 
                hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />info@finprimeconsulting.com</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><IoIosPhonePortrait size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />+971582593543</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><ImAddressBook size={24} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />12A03, The Executive Bay, Tower B, Business Bay, Dubai, United Arab Emirates</p>
                <LocationMap mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.317334553686!2d55.26386477592983!3d25.192518731889233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d5bfeaf5f7%3A0xab8c50a717489dbd!2sTower%20B%20-%20Executive%20Towers!5e0!3m2!1sen!2sin!4v1734004210545!5m2!1sen!2sin" />
              </div>









              {/* India */}
              <div className="space-y-3 lg:px-4">
                <h4 className="text-[22px] font-semibold pb-4">India</h4>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><CgMail size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all
                 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />info@finprimeconsulting.com</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><IoIosPhonePortrait size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all
                 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />+919633747200</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><ImAddressBook size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all 
                duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />First Floor, Bluemark Building, Kadavanthra, Kochi, Kerala, India</p>
                <LocationMap mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15718.905242896682!2d76.29285820896868!3d9.956714026953446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872cb66c596cb%3A0xd0c2654dc1875acb!2sKadavanthra%2C%20Kochi%2C%20Ernakulam%2C%20Kerala%20682020!5e0!3m2!1sen!2sin!4v1734004998043!5m2!1sen!2sin" />
              </div>








              {/* Bahrain */}
              <div className="space-y-3 lg:px-4">
                <h4 className="text-[22px] font-semibold pb-4">Bahrain</h4>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><CgMail size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1
                 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />info@finprimeconsulting.com</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><IoIosPhonePortrait size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all
                 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />+97336302789</p>
                <p className="flex items-center text-[16px] tracking-[1px] font-medium"><ImAddressBook size={22} className="mr-2 bg-white rounded-full shadow-md py-1 px-1 transition-all 
                duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white" />First Floor, Qudaibiya Building, Qudaibiya, Kingdom of Bahrain</p>
                <LocationMap mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14317.285695167542!2d50.57970981310372!3d26.218743733156494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af4831d1cd89%3A0xcc5d98f4294dd0bb!2sQudaibiya%2C%20Manama%2C%20Bahrain!5e0!3m2!1sen!2sin!4v1734005143506!5m2!1sen!2sin" />
              </div>
            </div>
          </div>

        
        
        
        
        
        
          {/*  Social Media Icons */}
          <div className="w-full lg:w-1/6 p-4 flex justify-center pt-20 lg:pt-12 animate-fadeinbottom">
            <div className="space-y-4 ">
                <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-8">
                {/* Facebook */}
                <a href="https://www.facebook.com/finprimeconsulting" target="_blank" rel="noreferrer" className="
                 text-black rounded-full bg-white shadow-lg px-3  py-3
                  text-2xl hover:scale-110  transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                    <FaFacebookF />
                </a>
                {/* WhatsApp */}
                <a href="https://www.linkedin.com/company/finprimeconsulting/" target="_blank" rel="noreferrer" className="
                text-black rounded-full bg-white shadow-lg px-3  py-3
                 text-2xl hover:scale-110 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                    <RiLinkedinFill />
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/finprimeconsulting/" target="_blank" rel="noreferrer" className="
                 text-black rounded-full bg-white shadow-lg px-3  py-3
                  text-2xl hover:scale-110 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                    <FaInstagram />
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@FinPrimeConsulting" target="_blank" rel="noreferrer" className=" text-black
                 rounded-full bg-white shadow-lg px-3  py-3
                  text-2xl hover:scale-110 transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
                    <FaYoutube />
                </a>
                </div>
            </div>
            </div>

        </div>
        <div className='bg-black pt-10 pb-10 mt-16 '>
      <div className="w-[70%] mx-auto py-10 text-white ">






    
        <form id='subscribe' onSubmit={handleSubmit} className="w-full">
          {/* Heading */}
          <h4 className="text-2xl font-semibold  pb-20 text-gray-200 mb-6">
            Enter email address to subscribe
          </h4>

        
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Input 1 */}
            <div className="relative">
            <input
              type="text"
              id="input5"
              name="name"  // Add name attribute
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="py-3 pe-0 block w-full bg-transparent 
                border-t-transparent border-b-2 border-x-transparent
                text-white text-sm placeholder:text-white font-bold"
            />

            </div>
            {/* Input 2 */}
            <div className="relative">
            <input
              type="email"
              id="name-input"
              name="email"  // Add name attribute
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-3 pe-0 block w-full bg-transparent 
                border-t-transparent border-b-2 border-x-transparent
                text-white text-sm placeholder:text-white font-bold"
            />

            </div>

          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <input
                id="privacy-policy"
                name="privacy-policy"
                type="checkbox"
                className="h-3 w-3"
              />
              <label htmlFor="privacy-policy" className="ml-1 block text-[10px] sm:text-sm
               text-gray-300">
                I agree to the Privacy Policy <span className='text-red-900 underline'>required</span>
              </label>
            </div>
            <div className="flex pt-2">
              <button
                type="submit"
                className="bg-transparent border border-white text-white
                 px-10 sm:px-20 py-1 sm:py-2 text-xs sm:text-sm 
                 shadow-sm transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white"
              >
              {loading ? "Sending..." : "Send"}
              </button>
            </div>
            {message && (
              <div className="mt-4 text-lg font-semibold">
                <p>{message}</p>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className='border-b mx-24 border-gray-600'>

      </div>
    </div>
      </div>
    </div>
  );
};

export default ContactUs;