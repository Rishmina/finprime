import React, { useState } from 'react';
import emailjs from "emailjs-com";

const InputSection = () => {
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
    fetch('http://localhost:5002/api/send2email', {
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
            () => {
              // success
            },
            () => {
              // fail
            }
          );
      })
      .catch(() => {
        alert('Failed to submit the form.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 py-8 sm:px-16 sm:py-12 gap-8">
      {/* Form on the left */}
      <div className="md:w-1/2 w-full flex flex-col items-start justify-center mb-8 md:mb-0">
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col items-start">
          <h5 className="text-base sm:text-lg font-inter font-semibold mb-4 text-left">Be the first to know about the latest drops</h5>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full h-12 px-4 border border-black/25 rounded-sm focus:outline-none text-sm font-inter mb-3"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full h-12 px-4 border border-black/25 rounded-sm focus:outline-none text-sm font-inter mb-3"
          />
          <div className="flex items-center mt-2 w-full justify-start">
            <span className="text-xs font-inter mr-2 font-semibold">All about experience</span>
            <button
              type="submit"
              className="bg-blue-950 text-white px-4 py-1 rounded-full text-xs font-inter hover:bg-gradient-to-r hover:from-[#1A1F39] hover:to-[#06B6D4] transition-all duration-300"
              style={{ minWidth: '60px' }}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {message && (
            <div className="mt-4 text-xs font-semibold font-inter text-left w-full">
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
      {/* Heading/Button on the right */}
      <div className="md:w-1/2 w-full flex flex-col items-start justify-center">
        <h4 className="text-2xl sm:text-4xl font-inter font-semibold leading-tight text-left mb-4">
          We Lead the AI Trend – Key Features<br />Supporting Accounting & Finance.
        </h4>
        <button
          className="bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] text-white font-inter font-normal text-[10px] flex items-center justify-center pl-6 self-start mt-2"
          style={{ width: '190px', height: '35px', borderRadius: '26.5px', paddingRight: '16px' }}
        >
          Grow Innovative Be on top
        </button>
      </div>
    </div>
  );
};

export default InputSection;