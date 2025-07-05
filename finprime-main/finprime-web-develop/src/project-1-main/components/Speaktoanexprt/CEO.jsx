import React from 'react';
import img1 from '../../images/team/Ashker.jpg';
import { Link } from 'react-router-dom';

const CEO = () => {

  return (
    <div className="flex items-center justify-start min-h-screen sm:p-10">

      <Link
        to='/#ceo'
        className="absolute top-10 left-10 bg-brandBlue duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500 text-white px-5 font-inter text-[16px] tracking-[1px] py-3 rounded-[5px] shadow-md"
      >
        Back
      </Link>

      <div className="items-center justify-center w-full mx-auto mt-40 space-x-12 xl:flex xl:max-w-7xl sm:mt-20">

        <div className="relative w-[400px] h-auto xl:h-[700px] mx-auto">
          <img
            src={img1}
            alt="Image"
            className="w-[80%] mx-auto sm:w-full h-full object-cover rounded-lg hover:scale-105 transition-transform ease-out"
          />


        </div>


        <div className="pr-10 mt-16 xl:flex-1 xl:mt-10">
          <p className=" text-gray-700 text-[16px] font-inter tracking-[1px] leading-7 font-medium ">
            When I founded FinPrime Consulting in 2017, my vision was simple: to build a firm that bridges global expertise with the unique demands of businesses in Dubai and beyond.
            Today, as I reflect on our journey, I am proud to say that we’ve grown into a trusted partner with more than 500 clienteles, navigating them through the complexities of accounting,
            financial compliance, cross-border transactions, and strategic growth

          </p>
          <p className=" text-gray-700 text-[16px] font-inter tracking-[1px] leading-7 font-medium pt-5">
            Our success stems from a relentless commitment to a client-centric solutions. The challenge in this industry is about understanding each business, the financial knowledge of
            the business owners and developing the right financial solutions for them without complicating. From Dubai to Germany, India, Bahrain and Cyprus, our team of professionals
            combines local insights with international best practices to deliver tailored services—whether it’s ensuring AML compliance, optimizing tax strategies, or transforming financial
            reporting into a tool for growth.
          </p>
          <p className=" text-gray-700 text-[16px] font-inter tracking-[1px] leading-7 font-medium pt-5">
            In a world where regulations evolve rapidly and markets grow increasingly interconnected, businesses need more than just advisors—they need partners who anticipate challenges
            and turn them into opportunities. At FinPrime, we don’t just crunch numbers or audit statements; we empower you to make decisions with clarity and confidence.
            With a full heart, I thank my entire team and partners for carrying the legacy of Finprime over these years and standing with me over the challenging times.

          </p>
          <p className="text-lg text-gray-700 sm:text-[16px] font-inter tracking-[1px] leading-7 font-medium pt-10 pb-20">

            Warm regards, <br />
            <span className='font-semibold text-black'>Ashker Kareem</span><br />
            Founder & CEO
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEO;
