import React from 'react';

const Atext = () => {

  return (
    <div id="Discover-More" className='py-8'>
      <div
        className='flex flex-col pb-6 pt-10 w-full md:w-4/5 sm:mx-auto sm:px-4 pl-8 md:pl-0'>
        <div className="flex justify-start">
          <span className="bg-gradient-to-r from-[#181C2A] to-[#13B6D8] text-white text-base font-bold px-5 py-2 rounded-full mb-4 shadow-lg flex items-center justify-center">The Story</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[48px] min-h-full w-1 rounded bg-[#191F3A]" style={{ minHeight: '3.5rem' }}></div>
          <h4
            className="text-4xl md:text-4xl font-normal text-left text-black font-inter leading-tight"
            style={{ fontWeight: 300 }}
          >
            We're Unique: The Turning Point
          </h4>
        </div>
        <div
          className="pt-8 space-y-2 text-left text-[#191F3A] font-inter text-lg md:text-sm leading-relaxed"
        >
          <p>We understand the true spirit of each entrepreneur and help resolve their challenges and partner with them to achieve their biggest dreams.</p>
          <p>Our success depends on the deep bond we have with our customers, and a divergent and resilient team that ensures the expectation of clients are always exceeded.</p>
          <p>'Quality and timeliness are our core values which our team always ensures are never broken in any circumstances</p>
          <p>From Audit & Assurance to Taxation and Accounting and Business Support, Business Advisory and Corporate Strategy to M&A, Fin Prime is synonymous with reliability and international best practices as it provides handholding in a complex jurisdiction. We have built trusted and enduring partnerships by providing integrated solutions for setting up the business and managing your regulatory compliances.</p>
          <p>With a good reputation in UAE and synergy benefits from our Bahrain and India offices, we set the path for our clients with cross-country operations.</p>
          <p>A vibrant cross-functional and multidisciplinary team headed by a dynamic leadership consistently ensures efficient results while a broad reach and expertise make us the preferred choice of SMEs and MNCs.</p>
        </div>
      </div>
    </div>
  );
}

export default Atext;
