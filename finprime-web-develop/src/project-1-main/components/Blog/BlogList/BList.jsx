import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import axios from 'axios';


const BList = () => {

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRefs = useRef([]);

  useEffect(() => {
    if (contentRefs.current.length > 0) {
      contentRefs.current.forEach((contentDiv) => {
        if (contentDiv) {
          const paragraphs = contentDiv.querySelectorAll('p');
          paragraphs.forEach((p) => {
            p.classList.add('text-lg', 'mb-4', 'text-gray-700');
          });
        }
      });
    }
  }, [blogs]); // Trigger only after blogs are updated


  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const getSizeClass = (index) => {
    const sizes = [
      'sm:col-span-1 sm:row-span-2 h-[200px] sm:h-[450px]',
      'sm:col-span-1 sm:row-span-1 h-[200px] sm:h-[200px]',
      'sm:col-span-1 sm:row-span-2 h-[200px] sm:h-[450px]',
      'sm:col-span-1 sm:row-span-2 h-[200px] sm:h-[480px]',
      'sm:col-span-1 sm:row-span-1 h-[200px] sm:h-[230px]',
      'sm:col-span-1 sm:row-span-1 h-[200px] sm:h-[230px]',
      'sm:col-span-3 sm:row-span-1 h-[200px] sm:h-[230px]',
      'sm:col-span-2 sm:row-span-1 h-[200px] sm:h-[230px]',
      'sm:col-span-1 sm:row-span-2 h-[200px] sm:h-[480px]',
      'sm:col-span-1 sm:row-span-1 h-[200px] sm:h-[230px]',
      'sm:col-span-1 sm:row-span-1 h-[200px] sm:h-[230px]',
    ];

    return sizes[index % sizes.length];
  };



  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://finprimeconsulting.com/api/blogs');
      const sortedBlogs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBlogs(sortedBlogs);
      console.log(blogs);
    } catch (err) {
      setError('Error fetching blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      className={`max-w-7xl xl:mx-auto lg:mx-10 md:mx-8 mb-10 mx-6 sm:p-4 pt-2 `}>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No blogs available.</p>
        ) : (
          blogs.slice(0, visibleCount).map((blog, index) => {
            const sizeClass = getSizeClass(index);

            return (
              <div key={blog.id} className={`relative overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${sizeClass}`}>
                <img
                  src={blog.image_path ? `https://finprimeconsulting.com/${blog.image_path}` : '/path/to/default-image.jpg'}
                  alt={blog.topic}
                  className="w-full h-full object-cover transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold  p-4">
                  <span className="text-center">{blog.topic}</span>
                  <Link
                    to={`/blogs/${blog.blog_slug}`}
                    state={{ id: blog.id }}
                    className="text-blue-400 hover:text-white flex gap-1 mt-2"
                  >
                    Read Full Post <TbLogout className='mt-1' />
                  </Link>
                </div>
              </div>
            );
          }))}
      </div>

      {visibleCount < blogs.length && (
        <div className="text-center mt-16">
          <button
            onClick={handleShowMore}
            className="bg-transparent border border-black text-black text-xs sm:text-sm font-light px-4 sm:px-8 py-1 sm:py-2 mb-10
             shadow-md transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default BList



