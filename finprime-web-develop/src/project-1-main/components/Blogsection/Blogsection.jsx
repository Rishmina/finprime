import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BlogCard = ({ title, image, description, id, date, blog_slug }) => {
  return (
    <div className="relative pt-6 sm:px-0 overflow-hidden w-full flex flex-col lg:h-full">
      <img
        src={image || 'path/to/default/image.jpg'} // Default image fallback
        alt={title}
        className="w-full h-[200px] lg:h-60 xl:h-72 rounded-[10px] object-cover transition-transform duration-300 transform hover:scale-90"
      />
      <div className="py-4 px-4 relative flex-grow text-left">
        <h3 className="text-black text-xl xl:text-[22px] tracking-[1px] font-semibold font-raleway body pb-4 px-1 lg:px-3">{title}</h3>
        <div
          className="text-black text-sm xl:text-[16px]  mb-16 leading-relaxed px-1 lg:px-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description, {
              ALLOWED_TAGS: ['b', 'i', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'p', 'a', 'strong', 'em'],
              ALLOWED_ATTRS: ['href', 'src', 'alt', 'style', 'class', 'id', 'target', 'title'],
            }),
          }}
        />
        <p className="absolute bottom-6 right-2 pr-2 lg:pr-7 text-md text-gray-600">{date}</p>
        <Link
          to={`/blogs/${blog_slug}`}
          state={{ id: id }}
          className="absolute bottom-6 mx-4 font-medium left-2 px-8 py-2 text-xs sm:text-[14px] bg-blue-950 font-raleway text-white rounded-full duration-300
           ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://finprimeconsulting.com/api/blogs');
      const sortedBlogs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
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

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-row-reverse justify-between items-center w-8/10 ml-4 mr-3 md:ml-6 md:mr-4 lg:ml-8 lg:mr-6 xl:ml-10 xl:mr-8 mt-12 pt-6 pb-6 px-6">
        <div className="flex items-center gap-2 text-right">
          <div style={{ width: '16px', height: '12px', background: '#06B6D4', borderRadius: '2px' }}></div>
          <h4 className="text-lg lg:text-2xl font-medium font-inter  mb-3 md:mb-0 text-right">Daily Articles</h4>
        </div>
        <Link
          to="/blog"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-950 text-white text-xs font-medium tracking-[0.5px] px-4 ml-22 rounded-[5px] py-4 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 font-inter"
          style={{ minWidth: '140px', maxWidth: '160px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          All Access Articles
        </Link>
      </div>

      {/* Blog Cards Section */}
      <div className="mt-10 sm:mt-20 ml-8 mr-4 md:ml-12 md:mr-6 lg:ml-16 lg:mr-8 xl:ml-20 xl:mr-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          {loading ? (
            <p className="text-center font-inter">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-red-500 font-inter">{error}</p>
          ) : blogs.length === 0 ? (
            <p className="text-center font-inter">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div className="w-full cursor-pointer" key={blog.id}>
                <BlogCard
                  image={blog.image_path ? `https://finprimeconsulting.com/${blog.image_path}` : null}
                  date={new Date(blog.created_at).toLocaleDateString()}
                  title={blog.topic}
                  description={DOMPurify.sanitize(blog.content.split(/\s+/).slice(0, 30).join(' '))}
                  id={blog.id}
                  blog_slug={blog.blog_slug}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;