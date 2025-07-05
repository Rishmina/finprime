import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import SideNavbar from '../adminregister/SideNavbar';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

const EditTestimonials = () => {
  const { testimonialsId } = useParams();  // Get testimonialsId from URL params
  const [testimonials, setTestimonials] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    content: '',
    author_name: '',
    image: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Fetch testimonials data by ID
  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials with ID:', testimonialsId);
      const response = await axios.get(`https://finprimeconsulting.com/api/testimonials/${testimonialsId}`);
      console.log('Fetched testimonials Response:', response);

      if (response.data) {
        setTestimonials(response.data); // Set the testimonials data
        setFormData({
          topic: response.data.topic,
          content: response.data.content,
          author_name: response.data.author_name,
          image: null,
          imagePreview: response.data.image_path ? `https://finprimeconsulting.com/${response.data.image_path}` : null,
        });
      } else {
        setError('Testimonials not found');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err.response || err);
      setError(err.response?.data?.message || 'Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('TestimonialsId from useParams:', testimonialsId);
    if (testimonialsId) {
      fetchTestimonials();
    } else {
      setError('No testimonials ID provided');
      setLoading(false);
    }
  }, [testimonialsId]); // Use testimonialsId as the dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: fileURL,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const form = new FormData();
    form.append('topic', formData.topic);
    form.append('content', formData.content);
    form.append('author_name', formData.author_name);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.put(
        `https://finprimeconsulting.com/api/testimonials/${testimonialsId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating testimonials');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading testimonials...</p>;
  }

  return (
    <div className='flex h-screen'>
      <SideNavbar/>  
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg  py-20 pr-10 pl-10 mt-16 overflow-auto w-full">
    <h2 className="text-3xl font-bold mb-6 text-center">Edit Testimonials</h2>
     {/* Back Button */}
     <div className="mt-6 flex justify-start">
        <button
          onClick={handleBack}
          className="bg-cyan-500 mb-2 px-3 py-3 rounded-full font-medium hover:bg-gray-400"
        >
         <MdArrowBack className='text-xl text-black' />
        </button>
      </div>

    {error && <p className="text-red-500 mb-4">{error}</p>}
    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

    {testimonials ? (
      <form onSubmit={handleSubmit} className='border border-black p-5'>
         <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-500"
          />
          {/* Image Preview */}
          {formData.imagePreview && (
            <div className="mt-2">
              <img
                src={formData.imagePreview}
                alt="Image Preview"
                className="w-24 h-24 object-cover rounded-md hidden"
              />
              <p className="text-sm mt-1"></p>
            </div>
          )}
          {/* Current Image Display */}
          {testimonials.image && !formData.image && !formData.imagePreview && (
            <div className="mt-2">
              <img
                src={`https://finprimeconsulting.com/${testimonials.image}`}
                alt="Current Testimonials"
                className="w-24 h-24 object-cover rounded-md"
              />
              <p className="text-sm mt-1">Current Image</p>
            </div>
          )}
        </div>
        
        {/* Author Name Input */}
        <div className="mb-6">
          <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            placeholder="Enter the author's name"
            className="w-full p-3 border border-gray-500"
            required
          />
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter the topic"
            className="w-full p-3 border border-gray-500"
            required
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter the content"
            rows="6"
            className="w-full p-3 border border-gray-500"
            required
          />
        </div>


        {/* Image Upload */}
       
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className=" bg-transparent border border-black text-black  hover:text-white px-6 py-2 mx-5 mb-6 transition-all 
           duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500"
          >
            {loading ? 'Updating...' : 'Update Testimonial'}
          </button>
        </div>
      </form>
    ) : (
      <p className="text-center text-gray-500">Testimonials not found or there was an error loading it.</p>
    )}
  </div>
  </div>
  );
};

export default EditTestimonials;