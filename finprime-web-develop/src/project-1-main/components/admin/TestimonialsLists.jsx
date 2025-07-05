import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavbar from '../adminregister/SideNavbar';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TestimonialsLists = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const testimonialsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://finprimeconsulting.com/api/testimonials');
        const sortedTestimonials = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTestimonials(sortedTestimonials);
      } catch (err) {
        setError('Error fetching testimonials. Please try again later.');
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (testimonialId) => {
    try {
      await axios.delete(`https://finprimeconsulting.com/api/testimonials/${testimonialId}`);
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialId));
      alert('Testimonial deleted successfully');
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Error deleting testimonial');
    }
  };

  const handleUpdate = (testimonialId) => {
    navigate(`/update-testimonial/${testimonialId}`);
  };

  // Paginate testimonials
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(testimonials.length / testimonialsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="mx-auto mt-16 bg-white rounded-lg p-4 py-20 pr-10 pl-10 overflow-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Testimonial List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {testimonials.length === 0 ? (
          <p>No testimonials available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-brandBlue text-white">
                <th className="border border-brandBlue w-14">ID</th>
                <th className="border border-brandBlue w-24">Date</th>
                <th className="border border-brandBlue px-4 py-2">Author Name</th>
                <th className="border border-brandBlue px-4 py-2">Topic</th>
                <th className="border border-brandBlue px-4 py-2">Content</th>
                <th className="border border-brandBlue  w-32 ">Image</th>
                <th className="border border-brandBlue w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTestimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50 text-center">
                  <td className="border border-brandBlue px-4 py-2">{testimonial.id}</td>
                  <td className="border border-brandBlue px-4 py-2">{new Date(testimonial.created_at).toLocaleDateString()}</td>
                  <td className="border border-brandBlue px-4 py-2">{testimonial.author_name}</td>
                  <td className="border border-brandBlue px-4 py-2">{testimonial.topic}</td>
                  <td className="border border-brandBlue px-4 py-2">
                    {testimonial.content.substring(0, 150)}...
                  </td>
                  <td className="border border-brandBlue px-4 py-2">
                    {testimonial.image_path && (
                      <img
                        src={`https://finprimeconsulting.com/${testimonial.image_path}`}
                        alt={testimonial.topic}
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td className="border border-brandBlue px-4 py-2">
                    <div className="flex space-x-2">
                    <button
                        onClick={() => handleUpdate(testimonial.id)}
                        
                      >
                        <MdEdit className='text-3xl text-gray-800'/>
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        
                      >
                        <MdDelete className='text-3xl text-red-600'/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded"
          >
            &#60; Prev
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded ${number === currentPage ? 'bg-blue-500 text-white' : ''}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
            className="px-4 py-2 border rounded"
          >
            Next &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsLists;