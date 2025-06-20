import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Industries } from '../Industries';
import img1 from '../../images/Navbar/finprime-logo.svg';
import bgimg from '../../images/Banner/enquiry.jpg';
import emailjs from 'emailjs-com'; // Import EmailJS

const Form = () => {
  const { industryId, subIndustryId } = useParams();
  const navigate = useNavigate();

  const industry = Industries.find((ind) => ind.id === parseInt(industryId));

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: industry?.title || '',
    subIndustry: '',
    comments: '',
  });

  const [subIndustries, setSubIndustries] = useState(industry ? industry.subindustries : []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === 'industry') {
        const selectedIndustry = Industries.find((ind) => ind.title === value);
        setSubIndustries(selectedIndustry ? selectedIndustry.subindustries : []);
        return {
          ...prevData,
          industry: value,
          subIndustry: '', // Reset subIndustry when changing industry
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    if (subIndustryId) {
      const selectedSubIndustry = subIndustries.find((sub) => sub.id === parseInt(subIndustryId));
      if (selectedSubIndustry) {
        setFormData((prevData) => ({
          ...prevData,
          subIndustry: selectedSubIndustry.title,
        }));
      }
    }
  }, [subIndustryId, subIndustries]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);  // Log form data to see if it's populated

    // If any field is empty, return error
    if (
      !formData.companyName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.industry ||
      !formData.subIndustry ||
      !formData.comments
    ) {
      alert('All fields are required');
      return; // Stop further execution if any field is missing
    }

    // Destructure form data
    const { companyName, firstName, lastName, email, phone, industry, subIndustry, comments } = formData;

    // Submit form data to API
    fetch('https://finprimeconsulting.com/api/submit-form2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName, firstName, lastName, email, phone, industry, subIndustry }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message); // Success alert after form submission

        // Reset form data after successful submission
        setFormData({
          companyName: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          industry: '',
          subIndustry: '',
          comments: '',
        });

        // After the form submission, send the data via EmailJS
        const templateParams = {
          companyName,
          firstName,
          lastName,
          email,
          phone,
          industry,
          subIndustry,
          comments,
        };

        // Send email using EmailJS
        emailjs
          .send(
            'service_m92dk5v', // Replace with your Service ID
            'template_nhk2mx3', // Replace with your Template ID
            templateParams,
            '_zGtLeC1_fmp56KY0' // Replace with your User ID
          )
          .then(
            (response) => {
              alert('Your enquiry has been submitted successfully!');

              // Send the auto-reply email
              const autoReplyParams = {
                  to_name: formData.firstName,
                  to_name2: formData.lastName,
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
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="absolute flex items-center space-x-2 top-4 left-5">
        <button
          onClick={() => navigate(-1)}
          className=" px-5  text-white bg-brandBlue py-3 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 text-sm sm:text-[16px] tracking-[1px] font-inter rounded-[5px]"
          >
          Back
        </button>
        <span className="text-black text-md tracking-[1px] font-inter sm:text-[16px]">
          {industry?.title} &gt; {formData.subIndustry}
        </span>
      </div>

      <div className="relative max-w-2xl p-8 pb-10 mx-5 border rounded-lg shadow-lg sm:mx-auto top-20 bg-brandBlue">
        <img src={img1} alt="Logo" className="h-20 mx-auto mt-5 mb-12 sm:h-32 lg:h-20" />
        {/* <h2 className="mb-2 text-2xl font-bold text-center ">Enquiry Form</h2>
        <div className="mb-12 border border-gray-400"></div> */}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="company name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
            />
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              />
            </div>
          </div>

          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="phone"
                placeholder="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
            >
              <option value="" disabled>
                Select an Industry
              </option>
              {Industries.map((ind) => (
                <option key={ind.id} value={ind.title}>
                  {ind.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="subIndustry"
              value={formData.subIndustry}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              disabled={!formData.industry}
            >
              <option value="" disabled>
                Select a Sub-Industry
              </option>
              {subIndustries.map((sub) => (
                <option key={sub.id} value={sub.title}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
          <textarea
            name="comments"
            placeholder="Add your comments"
            value={formData.comments || ''} // Default value if undefined
            onChange={handleChange}
            className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white h-32"
          />
        </div>

          <button
            type="submit"
            className="py-2 px-8 border border-white text-white duration-300 ease-out hover:bg-gradient-to-r
           hover:from-brandBlue hover:to-cyan-500 font-inter text-[16px] tracking-[1px] font-medium rounded-[5px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;