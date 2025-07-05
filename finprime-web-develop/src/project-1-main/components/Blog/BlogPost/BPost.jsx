import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';

const BPost = () => {
  const { slug } = useParams();
  console.log(slug)
  const location = useLocation();
  var { id } = location.state ?? {};
  const [allBlogs, setAllBlogs] = useState([]); // Renamed blogs to allBlogs
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRefs = useRef([]);
  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://finprimeconsulting.com/api/blogs');
        const sortedBlogs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAllBlogs(sortedBlogs);
        const responseBlog = await axios.get(`https://finprimeconsulting.com/api/blogs/${slug}`);
        id = responseBlog.data.id
        setSelectedBlog(responseBlog.data);
        console.log(selectedBlog)
      } catch (err) {
        setError('Error fetching blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    console.log(selectedBlog)
    fetchBlogs();
  }, [id]);

  // Add styles to content paragraphs
  useEffect(() => {
    if (selectedBlog && contentRefs.current.length > 0) {
      contentRefs.current.forEach((contentDiv) => {
        if (contentDiv) {
          const headersH3 = contentDiv.querySelectorAll('h3');
          headersH3.forEach((h) => {
            h.classList.add(
              'font-mediam',
              'sm:text-3xl',
              'font-inter',
              'text-xl',
              'mb-2',
              'text-gray-900'
            );
          });

          const headersH4 = contentDiv.querySelectorAll('h4');
          headersH4.forEach((h) => {
            h.classList.add(
              'font-mediam',
              'sm:text-2xl',
              'font-inter',
              'text-lg',
              'mb-2',
              'text-gray-900'
            );
          });

          const paragraphs = contentDiv.querySelectorAll('p');
          paragraphs.forEach((p) => {
            p.classList.add(
              'text-[12px]',
              'mb-4',
              'sm:text-[18px]',
              'tracking-[1px]',
              'font-medium',
              'font-inter',
              'text-gray-700'
            );
          });

          // Style unordered lists and list items
          const ulElements = contentDiv.querySelectorAll('ul');
          ulElements.forEach((ul) => {
            ul.classList.add(
              'list-disc',
              'pl-5',
              'text-gray-700',
              'text-[12px]',
              'sm:text-[18px]',
              'tracking-[1px]',
              'font-medium',
              'font-inter'
            );
          });

          // Apply styles to ordered lists
          const olElements = contentDiv.querySelectorAll('ol');
          olElements.forEach((ol) => {
            ol.classList.add(
              'list-decimal',
              'pl-5',
              'text-gray-700',
              'text-[12px]',
              'sm:text-[18px]',
              'tracking-[1px]',
              'font-medium',
              'font-inter'
            );
          });

          const liElements = contentDiv.querySelectorAll('li');
          liElements.forEach((li) => {
            li.classList.add(
              'ml-2',
              'text-gray-700',
              'text-[12px]',
              'sm:text-[18px]',
              'tracking-[1px]',
              'font-medium',
              'font-inter'
            );
          });
        }
      });
    }
  }, [selectedBlog]);

  if (loading) {
    return <div className="text-center py-20">Loading blog post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  if (!selectedBlog) {
    return <div className="text-center py-20">Blog post not found!</div>;
  }

  const recentBlogs = allBlogs
    .filter((b) => b.id !== parseInt(id))
    .slice(0, 4); // Updated to allBlogs

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 pt-40 xl:pl-12 xl:pr-10 lg:pl-10 lg:pr-8 md:pl-8 md:pr-6 pl-6 pr-4">
        <Link
          to="/blog"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-brandBlue py-2 px-6 text-white font-semibold rounded-md transition-all duration-300 sm:text-[16px] 
              tracking-[1px] ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 "
        >
          Back
        </Link>
        {/* Blog Header */}
        <div className="mb-12 mt-10 shadow-md px-2">
          <h4 className="animate-fadeinleft text-3xl sm:text-5xl font-bold mb-4 text-center">
            {selectedBlog.topic}
          </h4>
          <div className="flex justify-center text-xs items-center space-x-4 mb-6 text-gray-500">
            <p className="animate-fadeinright">
              <strong>Date:</strong>
              {new Date(selectedBlog.created_at).toLocaleDateString()}{' '}
              <strong>Author:</strong>
              {selectedBlog.author_name}{' '}
            </p>
          </div>
          <img
            src={`${selectedBlog.image_path}`}
            alt={selectedBlog.title}
            className="w-full h-80 object-cover shadow-md animate-fadeinbottom"
          />
          {/* Blog Content */}
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="animate-fadeinbottom prose prose-lg max-w-none text-justify text-gray-700 pt-12 px-10 pb-16 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedBlog.content),
            }}
          />
        </div>

        {/* Recent Blogs */}
        <div className={`mt-16`}>
          <div className="bg-gray-300 py-5 px-5 mb-5 flex justify-between">
            <h4 className="text-xl sm:text-3xl font-inter font-semibold">
              Recent Blogs
            </h4>
            <Link
              to="/blog"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-brandBlue py-3 text-xs px-4 font-inter transition-all duration-300 sm:text-[16px] 
              tracking-[1px] ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 text-white shadow-md"
            >
              ALL Blogs
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-0 gap-4">
            {recentBlogs.map((recentBlog) => (
              <div
                key={recentBlog.id}
                className="relative overflow-hidden shadow-lg transition-transform transform hover:scale-105 h-[300px]"
              >
                <Link
                  to={`/blogs/${recentBlog.blog_slug}`}
                  state={{ id: recentBlog.id }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <img
                    src={`https://finprimeconsulting.com/${recentBlog.image_path}`}
                    alt={recentBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold p-4">
                    <span className="text-center">{recentBlog.topic}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BPost;
