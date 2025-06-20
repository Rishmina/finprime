import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BlogCard = ({ title, image, description, id, date, blog_slug }) => {
  return (
    <div className="relative pt-4 sm:px-0 overflow-hidden w-full lg:w-[380px] xl:w-[480px] 2xl:w-[580px] mx-auto flex flex-col lg:h-full">
      <img
        src={image || 'path/to/default/image.jpg'} // Default image fallback
        alt={title}
        className="w-full h-[160px] lg:h-48 xl:h-56 rounded-[10px] object-cover transition-transform duration-300 transform hover:scale-90"
      />
      <div className="py-3 px-3 relative flex-grow text-left">
        <h3 className="text-black text-lg xl:text-xl tracking-[0.5px] font-medium font-inter pb-3 px-1 lg:px-2">{title}</h3>
        <div
          className="text-black text-sm xl:text-[14px] mb-14 leading-relaxed px-1 lg:px-2 font-inter"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description, {
              ALLOWED_TAGS: ['b', 'i', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'p', 'a', 'strong', 'em'],
              ALLOWED_ATTRS: ['href', 'src', 'alt', 'style', 'class', 'id', 'target', 'title'],
            }),
          }}
        />
        <p className="absolute bottom-4 right-2 pr-2 lg:pr-6 text-sm text-gray-600 font-inter">{date}</p>
        <Link
          to={`/blogs/${blog_slug}`}
          state={{ id: id }}
          className="absolute bottom-4 mx-3 font-medium left-2 px-6 py-1.5 text-xs sm:text-[13px] bg-blue-950 font-inter text-white rounded-full duration-300
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
          <h4 className="text-lg lg:text-xl font-medium font-inter mb-3 md:mb-0 text-right">Daily Articles</h4>
        </div>
        <Link
          to="/blog"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-950 text-white text-xs font-medium tracking-[0.5px] px-4 rounded-[5px] py-4 duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 font-inter"
          style={{ minWidth: '140px', maxWidth: '160px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          All Access Articles
        </Link>
      </div>

      {/* Blog Cards Section */}
      <div className="mt-8 sm:mt-16 ml-4 mr-3 md:ml-6 md:mr-4 lg:ml-8 lg:mr-6 xl:ml-10 xl:mr-8">
        <div className="lg:flex flex-wrap">
          {loading ? (
            <p className="text-center font-inter">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-red-500 font-inter">{error}</p>
          ) : blogs.length === 0 ? (
            <p className="text-center font-inter">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div className="w-full md:w-full lg:w-1/2 cursor-pointer" key={blog.id}>
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