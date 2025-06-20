import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';  
import SideNavbar from '../adminregister/SideNavbar';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const BlogLists = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 7; // Limit to 5 blogs per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://finprimeconsulting.com/api/blogs');
        // Sort the blogs by created_at in descending order (latest first)
        const sortedBlogs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sortedBlogs);
      } catch (err) {
        setError('Error fetching blogs. Please try again later.');
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  // Handle Delete Blog
  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://finprimeconsulting.com/api/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('Blog deleted successfully');
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Error deleting blog');
    }
  };

  // Handle Update Blog
  const handleUpdate = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="mt-32 pr-10 pl-10 overflow-y-auto w-full">
        <h4 className="text-3xl font-bold mb-4">Blog List</h4>
        {error && <p className="text-red-500">{error}</p>}

        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          <table className="border-collapse border border-gray-900 w-full  table-auto min-w-full">
            <thead className="bg-brandBlue text-white">
              <tr>
                <th className="border px-4 py-2 text-center  border-brandBlue">ID</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Date</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Name</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Topic</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Service</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Subservice</th>
                <th className="border px-4 py-2 text-center border-brandBlue">Image</th>
                <th className="border px-4 py-2 text-center border-brandBlue ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 text-center">
                  <td className="border border-brandBlue px-4 py-2">{blog.id}</td>
                  <td className="border border-brandBlue px-4 py-2">{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td className="border border-brandBlue px-4 py-2">{blog.author_name}</td>
                  <td className="border border-brandBlue  px-4 py-2">{blog.topic}</td>
                  <td className="border border-brandBlue px-4 py-2">{blog.services}</td>
                  <td className="border border-brandBlue px-4 py-2">{blog.subservices}</td>
                  {/* <td className="border px-4 py-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.content.split(/\s+/).slice(0, 5).join(' '), {
                          ALLOWED_TAGS: ['b', 'i', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'p', 'a', 'strong', 'em'],
                          ALLOWED_ATTRS: ['href', 'src', 'alt', 'style', 'class', 'id', 'target', 'title'],
                        }),
                      }}
                    />
                  </td> */}
                  <td className="border border-brandBlue pl-2 py-1 ">
                    {blog.image_path ? (
                      <img
                        src={`https://finprimeconsulting.com/${blog.image_path}`}
                        alt={blog.topic}
                        className="w-[100px] h-[70px] object-cover"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="border border-brandBlue px-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(blog.id)}
                        
                      >
                        <MdEdit className='text-3xl text-gray-800'/>
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-300 rounded-l-md"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-300 rounded-r-md"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogLists;