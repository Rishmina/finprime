import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaVolumeUp, FaHeadphones } from 'react-icons/fa';
import './YoutubeBroadcast.css';
import youtubeIcon from '../../images/youtube.png';
import Navbar from '../Navbar/Navbar';
import Inputsection from '../inputsection/Inputsection';
import Oursection from '../Oursection/Oursection';
import Blogsection from '../Blogsection/Blogsection';
import Faq from '../Faq/Faq';
import Text3 from '../Text/Text3';
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from "react-icons/hi2";
import newSectionImage from '../../images/image.png';
import ceoImg from '../../images/team/Ashker.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PodcastCarousel from '../PodcastCarousel';


const youtubeVideos = [
    { id: 'eJBWeMGgF_U', title: 'Why Europeans Invest in Dubai ?' },
    { id: 'a-42nCoSl_A', title: 'Starting a Business in Dubai' },
    { id: 'mwh_a_p8p2Q', title: 'UAE Corporate Tax Insights' },
    { id: 'eJBWeMGgF_U', title: 'Fintech Innovations in 2024' },
    { id: 'a-42nCoSl_A', title: 'Real Estate Investment Guide' },
];

// Sample podcast data
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
];

const VideoCard = ({ videoId, title, onPlay, isPlaying }) => {
    return (
        <div className="relative flex-shrink-0 w-full sm:w-[400px] h-[250px] bg-black rounded-lg overflow-hidden group">
            {isPlaying ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            ) : (
                <>
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <button
                            onClick={() => onPlay(videoId)}
                            className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
                        >
                            <FaPlay className="text-red-600 text-2xl ml-1" />
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-semibold text-lg">{title}</h3>
                    </div>
                </>
            )}
        </div>
    );
};


const YoutubeBroadcast = () => {
  const playerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    // Load YouTube IFrame Player API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube Player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'eJBWeMGgF_U',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          cc_load_policy: 0,
          widget_referrer: window.location.href,
          host: 'https://www.youtube.com',
          loop: 1,
          playlist: 'eJBWeMGgF_U', // Required for looping
          suggestedQuality: 'hd1080'
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.setPlaybackQuality('hd1080');
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              event.target.setPlaybackQuality('hd1080');
            }
          }
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 420; // Width of card + gap
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    }
  };

  const handlePlay = (videoId) => {
    setPlayingVideoId(videoId);
  };

  return (
    <>
      <div className="bg-black">
        <Navbar />
        {/* Top Banner Section */}
        <div className="w-full">
          <div className="relative w-full h-[60vh] sm:h-screen overflow-hidden youtube-container">
            <div className="relative h-full">
              <div className="absolute inset-0">
                <div id="youtube-player" className="w-full h-full object-cover"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full h-full px-4 sm:px-8">
                <div className="flex flex-col items-center sm:items-start sm:pl-20 pt-12 sm:pt-36 w-full">
                  <h2 className="text-white font-bold text-2xl xs:text-3xl sm:text-4xl mb-2 sm:mb-4 drop-shadow-lg text-center sm:text-left">
                    Your concerns become<br />
                    our mission.
                  </h2>
                  <div className="flex items-center mt-2 pt-8 sm:pt-40 sm:-ml-8 justify-center sm:justify-start w-full">
                    <div className="flex items-center justify-center bg-white px-3 py-2" style={{ width: '120px', height: '38px' }}>
                      <img
                        src={youtubeIcon}
                        alt="YouTube"
                        className="h-6 object-contain"
                        style={{ width: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CEO Podcast Card - static on mobile, absolute on sm+ for overlap */}
          <div className="relative sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 z-20 w-full max-w-5xl px-2" style={{ fontFamily: 'Lato, sans-serif', bottom: undefined }}>
            <div className="flex flex-col sm:flex-row items-center gap-0 px-2 sm:px-4 shadow-xl rounded-2xl bg-white max-w-5xl w-full">
              <div className="flex-shrink-0 rounded-sm overflow-hidden shadow-lg bg-gray-100 mb-4 sm:mb-0 sm:ml-[-20px] w-32 h-32 xs:w-40 xs:h-40 sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]">
                <img src={ceoImg} alt="Ashker Kareem" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center min-h-[120px] sm:min-h-[180px] md:min-h-[220px] relative w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-0">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold font-[lato] leading-tight pt-0 text-center sm:text-left">
                    Who anticipate challenges and turn <br />
                    them into opportunities.
                  </h3>
                  <a href="#" className="text-xs sm:text-sm text-black hover:text-brandBlue font-semibold font-lato mt-1 sm:mt-0">
                    Episode page &rarr;
                  </a>
                </div>
                <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-4">Episode 1 &bull; Microphone &bull; 0:13</div>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mb-2">
                  <span className="font-semibold text-gray-800">Ashker Kareem</span>
                  <span className="text-xs text-gray-500">Founder & CEO</span>
                </div>
                {/* Custom Audio Controls */}
                <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 flex items-center gap-2 sm:gap-4">
                  <FaPlay className="text-[#CC0000] text-xl sm:text-2xl" />
                  <span className="text-gray-500 text-xs sm:text-base font-medium">0:00 / 0:00</span>
                  <FaVolumeUp className="text-black text-lg sm:text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Discover text section */}
      <div className="w-full flex justify-center my-4 pb-10">
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.25rem' }}>
          Discover the selection of the most popular podcasts.
        </span>
      </div>
      {/* Podcast Carousel Section */}
      <PodcastCarousel />
      <div className="hidden sm:block h-[200px]" />
    </>
  );
};

export default YoutubeBroadcast; 