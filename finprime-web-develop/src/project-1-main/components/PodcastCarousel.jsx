import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaHeadphones, FaFacebookF, FaTwitter, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';

// Custom Swiper pagination bullet styles
// Place this <style> tag at the top of the component for local effect
const swiperPaginationStyles = `
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 2px solid #000;
  opacity: 1;
  margin: 0 6px !important;
  box-shadow: none;
  transition: background 0.2s, border 0.2s;
}
.swiper-pagination-bullet-active {
  background: #000;
  border: 2px solid #000;
}
`;

const podcastList = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 7',
    category: 'Technology',
    title: 'SRKP selects: open your mind easy',
    link: '#',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 8',
    category: 'Technology',
    title: 'SRKP selects: keep your watch',
    link: '#',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 9',
    category: 'Technology',
    title: 'SRKP selects: hide',
    link: '#',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 10',
    category: 'Business',
    title: 'SRKP selects: business growth',
    link: '#',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 11',
    category: 'Finance',
    title: 'SRKP selects: financial freedom',
    link: '#',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    episode: 'Episode 12',
    category: 'Lifestyle',
    title: 'SRKP selects: healthy habits',
    link: '#',
  },
];

const PodcastCarousel = () => {
  const paginationRef = useRef(null);

  useEffect(() => {
    // This ensures Swiper can find the pagination element after render
  }, []);

  return (
    <>
      <style>{swiperPaginationStyles}</style>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
          }}
        >
          {podcastList.map((podcast) => (
            <SwiperSlide key={podcast.id}>
              <div className="bg-white shadow-md overflow-hidden flex flex-row items-stretch w-[500px] h-[300px]">
                <div className="relative w-[40%] h-full flex-shrink-0 flex items-center justify-center">
                  <img src={podcast.image} alt={podcast.title} className="w-full h-full object-cover rounded-none" />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-2">
                    <FaHeadphones className="text-gray-700 text-lg" />
                  </div>
                </div>
                <div className="w-[60%] h-full flex flex-col justify-center px-8">
                  <div className="text-xs text-gray-400 mb-1">{podcast.episode} • {podcast.category}</div>
                  <div className="text-2xl font-semibold text-gray-900 mb-4">{podcast.title}</div>
                  <a href={podcast.link} className="text-base text-black hover:text-brandBlue font-semibold font-inter mt-auto flex items-center gap-1">
                    Episode page <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Custom pagination container below the Swiper section */}
      <div className="custom-swiper-pagination flex justify-center mt-6" ref={paginationRef} />

      {/* Meet your hosts section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 mt-16 flex pl-24 justify-between" style={{ fontFamily: 'Lato, sans-serif' }}>
        <h2 className="text-5xl font-bold">Meet your hosts:</h2>
        <a href="#" className="text-base font-semibold flex items-center gap-2 hover:text-brandBlue transition-colors">
          View all of them <span>&rarr;</span>
        </a>
      </div>

      

      {/* Headquarters and social/contact row (from Footer.jsx) at the very end */}
      <div className="w-full bg-black text-white mt-16 py-8 px-4">
        <div className="mb-6 font-inter text-center md:text-left">
          <h4 className="text-base font-semibold mb-2">Headquarters</h4>
          <p className="text-white text-xs mb-1">Suite 1203, Floor 12A, DAMAC Executive Bay, Business Bay, Dubai, UAE</p>
          <p className="text-white text-xs">Phone: +971 58 259 3543</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-4 mb-8">
          <ul className='flex space-x-2'>
            <div className="flex items-center space-x-2 bg-white bg-opacity-55 rounded-xl border border-opacity-20 px-4 py-2">
              <button className="hidden xl:block px-3 py-1 rounded-sm shadow-black text-[14px] tracking-[1px] transition-all duration-300 ease-out bg-gradient-to-r from-brandBlue to-cyan-500 text-white">Follow</button>
              <a href="https://www.facebook.com/finprimeconsulting" aria-label="Facebook" className="p-1.5 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:border-opacity-10 hover:from-brandBlue hover:to-cyan-500 hover:text-white"><FaFacebookF size={16} /></a>
              <a href="https://x.com/FinPrimeConsult" aria-label="Twitter" className="p-1.5 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white"><FaTwitter size={16} /></a>
              <a href="https://www.linkedin.com/company/finprimeconsulting/" aria-label="LinkedIn" className="p-1.5 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white"><RiLinkedinFill size={16} /></a>
              <a href="https://www.instagram.com/finprimeconsulting/" aria-label="Instagram" className="p-1.5 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white hover:border-opacity-10"><FaInstagramSquare size={16} /></a>
              <a href="https://www.youtube.com/@FinPrimeConsulting" aria-label="YouTube" className="p-1.5 text-black transition-all duration-300 ease-out bg-white rounded-full shadow-black hover:bg-gradient-to-r hover:from-brandBlue hover:border-opacity-10 hover:to-cyan-500 hover:text-white hover:border-opacity-10"><FaYoutube size={16} /></a>
            </div>
          </ul>
          <a href="mailto:info@finprimeconsulting.com" 
             className="px-6 py-2 text-base bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] rounded-full text-white hover:shadow-lg transition-all">
             info@finprimeconsulting.com
          </a>
        </div>
      </div>
      {/* Footer navigation links and copyright section */}
      <div className="w-full bg-black text-white px-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 text-xs">
          <a href="/" className="text-white hover:text-cyan-500">Home</a>
          <a href="/about" className="text-white hover:text-cyan-500">About</a>
          <a href="/blogs" className="text-white hover:text-cyan-500">Blogs</a>
          <a href="/contact-us" className="text-white hover:text-cyan-500">Contact Us</a>
          <a href="/terms-of-use" className="text-white hover:text-cyan-500">Terms of use</a>
          <a href="/privacy" className="text-white hover:text-cyan-500">Privacy</a>
          <a href="/cookie-policy" className="text-white hover:text-cyan-500">Cookie Policy</a>
          <a href="/sitemap" className="text-white hover:text-cyan-500">Sitemap</a>
        </div>
        <hr className="border-t border-gray-800 mb-8" />
        <div className="text-xs text-center md:text-left text-gray-400 pb-8">
          © 2019 - 2025 Finprime Consulting, Presented by <a href="https://zorroemirates.com/" className="text-yellow-400 font-semibold underline hover:text-yellow-300" target="_blank" rel="noopener noreferrer">Zorro Arab Emirates</a>
        </div>
      </div>
    </>
  );
};

export default PodcastCarousel; 