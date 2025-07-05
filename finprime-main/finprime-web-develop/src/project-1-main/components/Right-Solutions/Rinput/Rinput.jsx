import React, {  useState } from 'react';
import axios from 'axios';
import emailjs from "emailjs-com";

const Rinput = () => {


  
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


  return (
    <div className='bg-black pt-10 sm:pb-10'>
      <div className="w-full px-4 sm:px-6 lg:px-8 sm:py-10 text-white">
      <div className=''>
            {/* Address Section */}
            <div className='flex justify-between pt-5 pb-5  border-t-2 border-b-2'>
                <h4 className='text-xs md:text-lg font-semibold pr-2 xs:pr-0'>ADDRESS </h4>
                <h4 className='text-xs md:text-lg text-gray-300'>Suit 12A03, Floor 12A, Damac Executive Bay, Business Bay, Dubai, UAE</h4>
            </div>

            {/* Contact Section */}
            <div className='flex justify-between pt-5 pb-5  border-b-2'>
                <h4 className='text-xs md:text-lg font-semibold pr-2 xs:pr-0'>CONTACT</h4>
                <h4 className='text-xs md:text-lg text-gray-300'>info@finprimeconsulting.com +971 582 593 543</h4>
            </div>
        </div>


        <form onSubmit={handleSubmit} className="w-full mt-16">
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
    </div>
  );
};

export default Rinput;