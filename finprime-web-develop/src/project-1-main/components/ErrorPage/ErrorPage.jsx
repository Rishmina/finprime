import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Independent pupil positions for both eyes
  const [leftEyePosition, setLeftEyePosition] = useState({ x: "0px", y: "0px" });
  const [rightEyePosition, setRightEyePosition] = useState({ x: "0px", y: "0px" });

  // Simulate random eye movement for both eyes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLeftX = Math.random() * 20 - 8 + "px"; // Random horizontal movement for left eye
      const randomLeftY = Math.random() * 20 - 6 + "px"; // Random vertical movement for left eye
      const randomRightX = Math.random() * 20 - 5 + "px"; // Random horizontal movement for right eye
      const randomRightY = Math.random() * 20 - 20 + "px"; // Random vertical movement for right eye
      setLeftEyePosition({ x: randomLeftX, y: randomLeftY });
      setRightEyePosition({ x: randomRightX, y: randomRightY });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-brandBlue via-cyan-500 overflow-hidden px-4">
      {/* Cartoon Eyes */}
      <div className="relative flex items-center space-x-6 md:space-x-8 lg:space-x-12 mb-8">
        {/* Left Eye */}
        <div className="w-20 h-20 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center border-4 border-black">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full"
            style={{
              transform: `translate(${leftEyePosition.x}, ${leftEyePosition.y})`,
              transition: "transform 0.5s",
            }}
          ></div>
        </div>
        {/* Right Eye */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-black">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full"
            style={{
              transform: `translate(${rightEyePosition.x}, ${rightEyePosition.y})`,
              transition: "transform 0.5s",
            }}
          ></div>
        </div>
      </div>

      {/* Error Message */}
      <h4 className="text-7xl sm:text-9xl font-extrabold text-white tracking-[1px] animate-bounce">404</h4>
      <h4 className="mt-4 text-2xl sm:text-3xl font-inter tracking-[1px] lg:text-4xl font-bold text-black text-center">
        Oops! Page Not Found
      </h4>
      <p className="mt-2 text-base sm:text-lg lg:text-xl tracking-[1px] font-inter text-gray-700 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={goHome}
        className="mt-6 px-6 sm:px-8 py-2 sm:py-2 text-base sm:text-lg tracking-[1px] font-inter font-medium text-white bg-transparent border border-white  shadow-lg transform transition-all hover:scale-105 "
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
