import React from 'react';
import { useState, useEffect } from "react";




const Rhero = () => {


  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };



  useEffect(() => {
    if (isPanelOpen) {

      document.body.style.overflow = 'hidden';
    } else {

      document.body.style.overflow = 'auto';
    }


    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPanelOpen]);


  return (
    <div className="flex pt-20 bg-white w-full justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className='text-left w-full pt-24'>
          <h1
            style={{
              fontFamily: 'Kulim Park, sans-serif',
              fontWeight: 400,
              fontSize: '40px',
              lineHeight: '56px',
              letterSpacing: 0,
              marginBottom: '0',
            }}
          >
            Why Work With
          </h1>
          <h1
            style={{
              fontFamily: 'Kulim Park, sans-serif',
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '56px',
              letterSpacing: 0,
              marginBottom: '24px',
            }}
          >
            FinPrime Consulting?
          </h1>
          <p
            style={{
              fontFamily: 'Kulim Park, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '20px',
              color: '#222',
              marginBottom: '0',
              marginTop: '16px',
              maxWidth: '880px',
            }}
          >
            We believe that every client's journey is unique and hence our approach is never a one-size-fits-all. We take the time to understand your business from the ground up—its operations, goals, challenges, and the environment in which it operates—before crafting tailored financial and compliance solutions that drive sustainable value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rhero;
