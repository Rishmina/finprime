import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Services } from '../Services';
import img1 from '../../images/Navbar/finprime-logo.svg'
import bgimg from '../../images/Banner/enquiry.jpg';
import emailjs from 'emailjs-com'; // Import EmailJS

const Form2 = () => {
  const { serviceId, subServiceId } = useParams();
  const navigate = useNavigate();

  // Find the service based on URL parameters
  const service = Services.find((s) => s.id === parseInt(serviceId));

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: service?.title || '',  // Changed 'industry' to 'service'
    subService: '', // Start with empty string
    comments: '',
  });

  const [subServices, setSubServices] = useState(service ? service.subtitles : []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === 'service') {
        const selectedService = Services.find((s) => s.title === value);
        setSubServices(selectedService ? selectedService.subtitles : []);
        return {
          ...prevData,
          service: value,
          subService: '', 
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    if (subServiceId) {
      const selectedSubService = subServices.find((sub) => sub.subid === parseInt(subServiceId));
      if (selectedSubService) {
        setFormData((prevData) => ({
          ...prevData,
          subService: selectedSubService.subtitle,
        }));
      }
    }
  }, [subServiceId, subServices]);

 

   // Function to handle form submission and send email
   // Make sure to import emailjs
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
      !formData.service ||
      !formData.subService ||
      !formData.comments
    ) {
      alert('All fields are required');
      return; // Stop further execution if any field is missing
    }
  
    // Destructure form data
    const { companyName, firstName, lastName, email, phone, service, subService, comments } = formData;
  
    // Submit form data to API
    fetch('https://finprimeconsulting.com/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName, firstName, lastName, email, phone, service, subService }),
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
          service: '',
          subService: '',
          comments: '',
        });
  
        // After the form submission, send the data via EmailJS
        // info@finprimeconsulting.com
        const templateParams = {
          companyName,
          firstName,
          lastName,
          email,
          phone,
          service,
          subService,
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
    <div className=''
    style={{
      backgroundImage: `url(${bgimg})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
    }}
  >
        <div className="absolute top-4 left-5 flex items-center space-x-2">
        <button
          onClick={() => navigate(-1)}
          className=" px-5  text-white bg-brandBlue py-3 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 text-sm sm:text-[16px] tracking-[1px] font-inter rounded-[5px]"
        >
          Back
        </button>
        <span className="text-black text-md tracking-[1px] font-inter sm:text-[16px]">
          {service?.title} &gt; {formData.subService}
        </span>
      </div>
    <div className="max-w-2xl mx-5 sm:mx-auto top-20  border pb-10  p-8 bg-brandBlue shadow-lg rounded-lg relative">
      

      <img src={img1} alt="Logo" className='h-20 sm:h-32 lg:h-20 mx-auto mb-12 mt-5' />
      {/* <h4 className="text-2xl font-bold mb-2 text-center ">Enquiry Form</h4> */}
      {/* <div className='border mb-12 border-gray-400'></div> */}

      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className="mb-4">
          <input
            type="text"
            name="companyName"
            placeholder='company name'
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
            required
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <input
              type="text"
              name="firstName"
              placeholder='first name'
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              required
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              name="lastName"
              placeholder='last name'
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <input
              type="email"
              name="email"
              placeholder='e-mail'
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              required
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              name="phone"
              placeholder='phone'
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
            required
          >
            <option value="" disabled>Select a Service</option>
            {Services.map((s) => (
              <option  key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        

        <div className="mb-4">
          <select
            name="subService"
            value={formData.subService}
            onChange={handleChange}
            className="w-full border-b-2 border-white text-white p-2 bg-brandBlue rounded-[5px] placeholder:uppercase placeholder:text-white"
            required
            disabled={!formData.service}
          >
            <option value="" disabled>Select a Sub-Service</option>
            {subServices.map((s) => (
              <option key={s.subid} value={s.subtitle}>
                {s.subtitle}
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

        
            <div className="flex mt-10 mb-6 items-center">
              <input
                id="privacy-policy"
                name="privacy-policy"
                type="checkbox"
                className="h-3 w-3"
              />
              <label htmlFor="privacy-policy" className="ml-1 block text-[13px] xs:text-sm
               text-gray-500">
                I agree to the Privacy Policy <span className='text-red-900 underline'>required</span>
              </label>
            </div>

        <button
          type="submit"
          className=" py-2 px-8 border border-white text-white duration-300 ease-out hover:bg-gradient-to-r
           hover:from-brandBlue hover:to-cyan-500 font-inter text-[16px] tracking-[1px] font-medium rounded-[5px] "
          // onClick={handleEnquiry}
          
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Form2;