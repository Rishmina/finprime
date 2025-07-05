import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import SideNavbar from '../adminregister/SideNavbar';
import { Services } from '../Services';


const BlogForm = ({ fetchBlogs }) => {
  const [formData, setFormData] = useState({
    topic: '',
    content: '', // Ensure content is initialized as a string
    author_name: '',
    image: null,
    services: '',
    subservices: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quillRef = useRef(null); // Reference to Quill container
  const quillInstance = useRef(null); // To store Quill instance

  // Handle text field changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);  // Debugging
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF).');
      setFormData((prev) => ({ ...prev, image: null }));
    } else {
      setFormData((prev) => ({ ...prev, image: file }));
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure content is updated correctly before submitting
    const content = quillInstance.current.root.innerHTML;
    setFormData((prev) => ({ ...prev, content }));

    // Validation
    if (
      !formData.topic.trim() ||
      !content.trim() ||
      !formData.author_name.trim() ||
      !formData.services.trim() ||
      !formData.subservices.trim()
    ) {
      return setError('All fields are required.');
    }

    setLoading(true);
    setError(null);

    // Prepare FormData
    const form = new FormData();
    form.append('topic', formData.topic);
    form.append('content', content); // Add the content from Quill
    form.append('author_name', formData.author_name);
    form.append('services', formData.services);
    form.append('subservices', formData.subservices);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.post('https://finprimeconsulting.com/api/blogs', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem("token", response.data.token);
      alert('Blog uploaded successfully');
      if (fetchBlogs) fetchBlogs();

      // Reset form
      setFormData({
        topic: '',
        content: '', // Reset content after submission
        author_name: '',
        image: null,
        services: '',
        subservices: '',
      });
    } catch (error) {
      setError(`Error uploading blog: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };
 
  
  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      // Initialize Quill editor only once
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: '3' }, { header: '4' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ align: [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'size': ['small', 'normal', 'large', 'huge'] }],
            ['image'],
            ['table'], 
          ],
        },
      });

      quillInstance.current = quill;

      // Initialize content of Quill editor
      if (formData.content) {
        quill.root.innerHTML = formData.content;
      }

      // Update content state after Quill is initialized
      quill.on('text-change', () => {
        setFormData((prev) => ({ ...prev, content: quill.root.innerHTML }));
      });
    }
  }, [formData.content]); // Re-initialize Quill if content changes

  // Sanitize content before displaying it in preview
  const sanitizedContent = DOMPurify.sanitize(formData.content);

  

  return (
    <div className='flex h-screen'>
      <SideNavbar/>
    
    <div className="w-full p-4 py-20 pl-10 pr-10 mx-auto mt-16 overflow-auto rounded-lg shadow-lg ">
      <h3 className='mb-5 text-4xl font-bold'>Create Blog</h3>
      <form onSubmit={handleSubmit} className='border border-brandBlue'>
        <div className="grid grid-cols-1 gap-4 p-4 mb-10 rounded-lg">
          {/* File and Author Input */}
          <div className="flex gap-8">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="block w-full p-2 border border-black "
            />
            <input
              type="text"
              name="author_name"
              value={formData.author_name}
              onChange={handleChange}
              placeholder="Author Name"
              className="block w-full p-2 border border-black placeholder:text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
      {/* Service Dropdown */}
      <select
        name="services"
        value={formData.services}
        onChange={handleChange}
        className="w-full p-2 border border-black placeholder:uppercase placeholder:text-black"
        required
      >
        <option value="" disabled>Select a Service</option>
        {Services.map((service) => (
          <option key={service.id} value={service.title}>
            {service.title}
          </option>
        ))}
      </select>

      {/* Subservice Dropdown (Visible only after selecting a service) */}
      <select
        name="subservices"
        value={formData.subservices}
        onChange={handleChange}
        className="w-full p-2 border border-black placeholder:uppercase placeholder:text-black"
        required
        disabled={!formData.services}
      >
        <option value="" disabled>Select a Sub-Service</option>
        {formData.services && (
          Services.find((service) => service.title === formData.services)?.subtitles?.map((subservice) => {
            console.log(subservice);  // Debugging here
            return (
              <option key={subservice.subid} value={subservice.subtitle}>
                {subservice.subtitle}
              </option>
            );
          })
        )}
      </select>
    </div>



          {/* Topic */}
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Topic"
            className="block w-full p-2 border border-brandBlue placeholder:text-black"
          />
        </div>

        {/* Formatting and Editable Content */}
        <div className="flex items-center ">
          <div className='w-full mx-5 mb-5 '>
            <h1 className="mb-4 text-xl font-semibold">Content</h1>
            <div ref={quillRef}  className="border border-black  h-[250px] w-full"></div> {/* Quill editor container */}
          </div>
        </div>

        {/* Error and Submit */}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 mx-5 mb-6 text-black transition-all duration-300 ease-out bg-transparent border border-black hover:text-white hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500"
        >
          {loading ? 'Uploading...' : 'Upload Blog'}
        </button>
      </form>

      {/* Display the content */}
      <div className="hidden p-4 mt-8 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold">Blog Preview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className="p-4 mt-4 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    </div>
  );
};

export default BlogForm;