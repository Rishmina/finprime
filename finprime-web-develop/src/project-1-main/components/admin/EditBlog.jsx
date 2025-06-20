import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import SideNavbar from '../adminregister/SideNavbar';
import { Services } from '../Services';
import { MdArrowBack } from "react-icons/md";


const EditBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    content: '',
    author_name: '',
    services: '',
    subservices: '',
    image: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const quillRef = useRef(null); // Reference to Quill container
  const quillInstance = useRef(null); // Quill editor instance

  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch blog details
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://finprimeconsulting.com/api/blogs/${blogId}`);
      if (response.data) {
        setBlog(response.data);
        setFormData({
          topic: response.data.topic,
          content: response.data.content,
          author_name: response.data.author_name,
          services: response.data.services,
          subservices: response.data.subservices,
          image: null,
          imagePreview: response.data.image_path ? `https://finprimeconsulting.com/${response.data.image_path}` : null,
        });
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      setError('Error fetching blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    } else {
      setError('No blog ID provided');
      setLoading(false);
    }
  }, [blogId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: fileURL,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const form = new FormData();
    form.append('topic', formData.topic);
    form.append('content', formData.content);
    form.append('author_name', formData.author_name);
    form.append('services', formData.services);
    form.append('subservices', formData.subservices);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.put(
        `https://finprimeconsulting.com/api/blogs/${blogId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating blog');
    } finally {
      setLoading(false);
    }
  };

  // Initialize Quill editor
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
            [{
              'table': ['insertRow', 'insertColumn', 'deleteRow', 'deleteColumn']
            }],
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

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="w-full max-w-full py-20 pl-10 pr-10 mx-auto mt-10 overflow-auto bg-white rounded-lg shadow-lg ">
        <div className='flex'>
      <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="px-3 mb-4 ml-1 text-white rounded-full bg-cyan-500 hover:bg-gray-700"
        >
         <MdArrowBack className='text-xl text-black' />
        </button>
        <h4 className="mb-6 ml-5 text-3xl font-bold text-black">Edit Blog</h4>

        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}

        {/* Back Button */}
        

        {blog ? (
          <form onSubmit={handleSubmit} className="space-y-6 border border-black">
            {/* Author Name and Image */}
            <div className="grid grid-cols-1 gap-4 p-4 mb-10">
              <div className="space-y-2 ">
                {/* Image Input */}
                <div >
                  <label htmlFor="image" className="mb-2 font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="block w-full p-2 border border-black"
                  />
                  {formData.imagePreview && (
                    <div className="hidden mt-4">
                      <img
                        src={formData.imagePreview}
                        alt="Image Preview"
                        className="object-cover w-24 h-24 border border-gray-200 rounded-md"
                      />
                    </div>
                  )}
                  {blog.image && !formData.image && !formData.imagePreview && (
                    <div className="mt-4">
                      <img
                        src={`https://finprimeconsulting.com/${blog.image}`}
                        alt="Current Blog"
                        className="object-cover w-24 h-24 border border-gray-200 rounded-md"
                      />
                      <p className="mt-2 text-sm text-gray-500">Current image</p>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="image" className="mb-2 font-medium text-gray-700">Author Name</label>
                  {/* Author Name Input */}
                  <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    placeholder="Author Name"
                    className="block w-full p-2 border border-black "
                  />
                </div>
              </div>

              {/* Services and Subservices */}
              <div className="flex w-full gap-8 mt-2">
              <div className="grid w-full grid-cols-2 gap-8 ">
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
              </div>
            </div>

            {/* Blog Topic */}
            <div className="mx-4 ">
              <label htmlFor="topic" className="block font-medium text-gray-700">Blog Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Blog Topic"
                className="w-full p-3 border border-black "
              />
            </div>

            {/* Quill Editor */}
            <div className="mx-4 mb-6 border border-black">
              <div ref={quillRef} className="border h-[300px] border-black "></div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 mx-5 mb-6 text-black transition-all duration-300 ease-out bg-transparent border border-black hover:text-white hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500"
              >
                Update Blog
              </button>
            </div>
          </form>
        ) : (
          <p>No blog data available</p>
        )}
      </div>
    </div>
  );
};

export default EditBlog;