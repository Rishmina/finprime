import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'; 
import vdo from '../BlogVideo/blogvideo.mp4';
import { Link } from 'react-router-dom';

const Bbanner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      
      videoRef.current.pause();
      setIsPlaying(false); 
    } else {
      
      videoRef.current.play();
      setIsPlaying(true); 
    }
  };


  

  return (
    <div className="relative h-[500px] w-full overflow-hidden">





      {/* Background video */}
      <video
        ref={videoRef}
        src={vdo}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-[-1]"
        autoPlay
        loop
        muted
        playsInline 
      />





      {/* Content overlay */}
      <div
      
      className="absolute top-0 left-0 pt-60 xl:pl-12 lg:pl-10 md:pl-8 pl-6 pr-4 sm:pr-0 text-white ">
        <h4 className="text-4xl sm:text-4xl font-medium mb-6 animate-fadeinleft ">Blog</h4>
        <p className="animate-fadeinbottom text-xs sm:text-[16px] tracking-[1px] font-inter mb-2">
          This is a long paraexpand on this with multiple lines of text to make it more informative.
        </p>
        <p className='mb-6 animate-fadeinbottom text-xs sm:text-[16px] tracking-[1px] font-inter'>underneath the heading. It can describe something important</p>
        {/* <button className="bg-transparent border animate-fadeinbottom
         border-white text-white px-3 sm:px-6 py-1 sm:py-2 text-[10px] sm:text-sm
         htransition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white">
          Read More
        </button> */}
      </div>







      {/*  headings and sub-headings */}
      <div className="absolute bottom-8 xl:left-12 lg:left-10 md:left-8 left-6 w-7/10 border-t border-white w-[60%] sm:w-[70%]">
        <div className=" mb-2 pt-5"></div>
        <div className="flex items-center space-x-4 sm:space-x-8 text-white animate-fadeinleft">
          {/* <div className="flex flex-col items-center">
            
            <h3 className="font-light text-[12px] sm:text-lg">Latest Blog</h3>
            
          </div> */}
          <div className="flex flex-col items-center">
            
            <Link to='/' className="  text-[12px] sm:text-[18px] tracking-[1px] font-medium font-inter">Home</Link>
           
          </div>
          <div className="flex flex-col items-center">
           
            <Link to='contactus' className=" text-[12px] sm:text-[18px] tracking-[1px] font-medium font-inter">Contact Us</Link>
          
          </div>
        </div>
       </div>







      {/*  video controls (play/pause) */}
      <div className="absolute bottom-4 sm:bottom-10 xl:right-10 lg:right-8 md:right-6 right-4 animate-fadeinright">
        <button
          onClick={handlePlayPause}
          className="bg-black bg-opacity-10 text-black p-3 shadow-lg
           rounded-full transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 hover:text-white"
        >
          {isPlaying ? <FaPause  className='text-lg sm:text-2xl'/> : <FaPlay className='text-lg sm:text-2xl' />}
        </button>
      </div>
    </div>
  );
};

export default Bbanner;
