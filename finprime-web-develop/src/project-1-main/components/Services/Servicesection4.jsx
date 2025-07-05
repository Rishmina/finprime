import React, { useEffect, useState } from 'react';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';
import { Services } from '../Services';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Servicesection4 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const { servicetitle, subServicetitle } = useParams();
  const service = Services.find((s) =>
    s.title.replace(/\s+/g, '-') === servicetitle);
  const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);


  // const { servicetitle, subServicetitle } = useParams();

  // // Find the service based on the title
  // const service = Services.find((s) => s.title === servicetitle);
  // const subService = service?.subtitles.find((sub) => sub.subtitle === subServicetitle);
  // const location = useLocation();
  // const { service_id, subtitles_id } = location.state ?? {};
  // const service = Services.find((s) => s.id === service_id);
  // console.log(service);
  // const subService = service?.subtitles.find((sub) => sub.subid === subtitles_id);
  // If service or sub-service not found, return error message
  if (!service || !subService) {
    return <div className="mt-10 text-xl font-bold text-center text-red-500">Sub-service not found</div>;
  }


  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://finprimeconsulting.com/api/blogs');
      const sortedBlogs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBlogs(sortedBlogs);
    } catch (err) {
      setError('Error fetching blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on the current subServiceId
  const filteredBlogs = blogs.filter((blog) => blog.subservices === subService.subtitle);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  return (
    <div className="pl-6 pr-4 xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-5xl font-inter">Our Latest Thinking</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center">No blogs available for this sub-service.</p>
        ) : (
          currentItems.map((blog) => (
            <Link
              to={`/blogs/${blog.blog_slug}`}
              state={{ id: blog.id }}

              key={blog.id} className="mb-5">
              <img
                src={blog.image_path ? `https://finprimeconsulting.com/${blog.image_path}` : null}
                alt={`Image ${blog.topic}`}
                className="w-full h-[280px] mb-4"
              />
              <Link to={`/blogs/${blog.blog_slug}`}
                state={{ id: blog.id }}
                className="text-xl font-inter font-semibold sm:text-[22px] tracking-[1px] ">{blog.topic}</Link>
              <p className="hidden mb-2 text-lg font-medium text-gray-700">{blog.subservices}</p> {/* Subtitle */}
              <div className='tracking-[1px] font-inter text-[16px] mb-5 mt-3'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    blog.content.split(/\s+/).slice(0, 20).join(' '),
                    {
                      ALLOWED_TAGS: ['b', 'i', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'p', 'a', 'strong', 'em'],
                      ALLOWED_ATTRS: ['href', 'src', 'alt', 'style', 'class', 'id', 'target', 'title'],
                    }
                  ),
                }}
              />
              <p className="text-xs lg:text-sm">
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </p>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 mb-10 text-center">
        <ul className="inline-flex items-center space-x-4">
          {/* Left Arrow */}
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="text-black hover:text-cyan-500 pt-[6px] disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <IoMdArrowBack />
            </button>
          </li>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(index + 1)}
                className={`text-black hover:text-brandBlue text-lg ${currentPage === index + 1 ? 'font-bold' : ''}`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Right Arrow */}
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="text-black hover:text-cyan-500 pt-[6px] disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <IoMdArrowForward />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Servicesection4;