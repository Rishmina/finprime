import React, { useState, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';
import './banner.css';
import youtubeIcon from '../../images/youtube.png';

const Banner = () => {
  const playerRef = useRef(null);
  
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

  const handleYouTubeClick = (e) => {
    e.preventDefault();
    window.open('https://youtu.be/eJBWeMGgF_U', '_blank');
  };
  
  return (
          <div className="w-full">
      <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[811px] overflow-hidden youtube-container mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <div className="relative h-full">
          <div className="absolute inset-0">
            <div id="youtube-player" className="w-full h-full object-cover"></div>
            
            {/* Dark overlay to hide bottom text */}
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]"></div>
          </div>
          
          {/* YouTube Redirect Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white shadow-lg
                hover:bg-opacity-90 transition-all duration-300"
              onClick={handleYouTubeClick}
            >
              <FaPlay className="text-red-600 text-2xl sm:text-3xl md:text-4xl ml-1 sm:ml-2" />
            </button>
          </div>

          {/* Bottom Text and Logo */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 flex items-center space-x-4 sm:space-x-6 md:space-x-8 z-20">
            <img 
              src={youtubeIcon} 
              alt="YouTube" 
              className="w-16 sm:w-20 md:w-24 cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={handleYouTubeClick}
            />
            <div className="text-white font-['Roboto']">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">Your</h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">concerns</h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">become our</h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">mission.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;



