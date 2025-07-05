import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import solutionsCardBg from '../../../images/solutions-card-bg.png';
import strategicCardBg from '../../../images/strategic-card-bg.png';
import beyondCardBg from '../../../images/beyond.png';
import clientCentricCardBg from '../../../images/cliencentric.png';
import deepDiveCardBg from '../../../images/deep.png';
import workingCardBg from '../../../images/working.png';

const cardColors = [
  '#2e7d32', // green
  '#00695c', // teal
  '#1a237e', // navy blue
  '#0d47a1', // dark blue
  '#1b5e20', // darker green
  '#004d40', // darker teal
];

const DropDown = () => {
  const [search, setSearch] = useState('');
  const cardRowRef = React.useRef(null);

  const Rquestion = [
    {
      question: 'Client-Centric, Insight-Driven',
      answer:
        'From your very first interaction with FinPrime, our focus is on you. We listen carefully—not just to what you say, but also to what your business numbers reveal. Whether you\'re a startup seeking efficient bookkeeping or a growing enterprise navigating complex tax structures, we take the time to understand both the minute details and major pain points. Your concerns become our mission.',
      bgImage: clientCentricCardBg
    },
    {
      question: 'Deep Dive Diagnostics',
      answer:
        'Before we propose solutions, we conduct a thorough diagnostic of your existing financial processes, tax structure, internal controls, and compliance status. This deep-dive analysis helps us pinpoint inefficiencies, potential risks, and opportunities for optimization—ensuring that no aspect is overlooked.',
      bgImage: deepDiveCardBg
    },
    {
      question: 'Solutions with Clarity',
      answer:
        'Based on our findings, we build bespoke solutions that align with your business objectives and regulatory requirements. Whether it\'s implementing a streamlined accounting system, offering proactive tax advisory, or supporting with AML compliance, we design every service around your exact needs—not just what\'s standard in the market.',
      bgImage: solutionsCardBg,
      cardType: 'solutions',
    },
    {
      question: 'Working with you, not just for you',
      answer:
        'Our team of experienced professionals maintains open lines of communication throughout the engagement, ensuring clarity, accountability, and smooth implementation. We explain the why behind every decision so that you\'re always informed and confident in the way forward',
      bgImage: workingCardBg
    },
    {
      question: 'Beyond Compliance—Towards Growth',
      answer:
        'Our goal is not just to keep your business compliant but to help it grow. By transforming financial data into actionable insights, we empower you to make smarter decisions. Monthly MIS reports, cash flow forecasts, and performance dashboards are some of the tools we provide to keep you in control and ahead of the curve.',
      bgImage: beyondCardBg
    },
    {
      question: 'Your Strategic CFO Partner',
      answer:
        'At FinPrime, we don\'t view ourselves as just your consultants—we strive to be your long-term partners. As your business evolves, so do our services. We remain adaptive, proactive, and committed to supporting your journey every step of the way.',
      bgImage: strategicCardBg,
      cardType: 'strategic',
    }
  ];

  const sections = [
    {
      title: "Discovery & Onboarding",
      items: [
        "Initial consultation to understand your business",
        "Collect relevant documents & past records",
        "Define scope of services and timelines"
      ]
    },
    {
      title: "System Setup & Transition",
      items: [
        "Design the Plan of Action- Scheduling responsibilities for both sides",
        "Finalize the Software or migration to the best software solution"
      ]
    },
    {
      title: "Monthly Data Sharing",
      items: [
        "Sharing details and documents to us as per our unique checklist",
        "Secure & organized data collection"
      ]
    },
    {
      title: "Accounting, Bookkeeping & Tax",
      items: [
        "Record and reconcile all financial transactions",
        "Prepare and file relevant tax returns on time",
        "Sending periodic reminders about due dates and relevant deadlines"
      ]
    },
    {
      title: "Monthly Review Meeting",
      items: [
        "Discuss financial performance & MIS highlights",
        "Raise red flags or action items",
        "Address your questions and offer strategic advice"
      ]
    },
    {
      title: "Monthly MIS Report Submission",
      items: [
        "MIS reports as agreed in Initial meeting",
        "Financial Reports with insights and comparisons",
        "Any other specific details relating to Accounts and tax"
      ]
    }
  ];

  const scrollCards = (direction) => {
    if (cardRowRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      cardRowRef.current.scrollLeft += scrollAmount;
    }
  };

  const RoundedItem = ({ text, isLong = false }) => {
    return (
      <div 
        className={`relative overflow-hidden inline-flex w-auto max-w-[90vw]`}
        style={{ minHeight: '48px', alignItems: 'center' }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '40px'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
            borderRadius: '40px'
          }}
        />
        <span className="relative z-10 text-white font-inter text-[14px] px-8 py-3 break-words text-center">{text}</span>
      </div>
    );
  };

  return (
    <>
      {/* Search Bar Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-[1050px] mx-auto px-6">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 font-inter text-[14px] text-[#C5C5C5]"
              placeholder="Advance the World drive positive social impacts."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
              aria-label="Search"
            >
              <FiArrowRight className="w-5 h-5 text-[#C5C5C5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="relative">
            <div 
              ref={cardRowRef}
              className="grid grid-cols-1 md:flex md:overflow-x-auto hide-scrollbar gap-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {Rquestion.map((item, index) => (
                <div
                  key={index}
                  className="w-full h-auto md:w-[369px] md:h-[494px] p-8 font-inter flex flex-col justify-start md:flex-shrink-0"
                  style={item.bgImage ? {
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : {
                    backgroundColor: cardColors[index % cardColors.length]
                  }}
                >
                  <div className="border border-white/50 rounded-full py-3 px-6 mb-8 self-start bg-black/20 backdrop-blur-sm">
                    <h3 className='text-white font-kulim-park font-semibold text-base text-left tracking-wider whitespace-nowrap'>{item.question}</h3>
                  </div>
                  <p className="text-white text-base leading-relaxed text-left">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex justify-center gap-4 mt-8">
              <button
                onClick={() => scrollCards('left')}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollCards('right')}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <FiArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Client Journey Section */}
      <div className="w-full bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-[48px] font-kulim-park mb-6" style={{ fontWeight: '400' }}>
              Client Journey With <span style={{ fontWeight: '700' }}>Finprime</span>
            </h2>
            <p className="text-[16px] font-inter text-[#666666] max-w-[900px] mx-auto leading-relaxed mb-8">
              We believe that great service begins with a clear, structured, and transparent journey. From the first conversation to monthly deliverables, we ensure that our clients experience a seamless and proactive approach to accounting, tax, and compliance support.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-[900px] mx-auto">
              <input
                type="text"
                className="w-full px-6 py-4 rounded-full border border-[#E5E5E5] focus:outline-none focus:border-blue-500 font-inter text-[16px]"
                placeholder="Breaking down your journey with us"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ color: '#333333' }}
              />
              <button 
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
                aria-label="Search"
              >
                <FiArrowRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Journey Steps Section */}
      <div className="w-full bg-[#151934] mt-8" style={{ minHeight: '1000px' }}>
        <div className="w-full h-full px-2 sm:px-8 py-10 sm:py-20">
          {/* Mobile: block layout, Desktop: grid */}
          <div className="block md:grid md:grid-cols-12 md:gap-x-[40px] md:gap-y-[80px]">
            {sections.map((section, index) => (
              <div key={index} className={`relative w-full mb-12 md:mb-0 ${index % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'}`}>
                <h3 
                  className="text-white mb-6 sm:mb-8 text-2xl sm:text-[32px] font-light font-kulim-park"
                  style={{ letterSpacing: '0.5px' }}
                >
                  {section.title}
                </h3>
                {/* Mobile: show all items as blocks, Desktop: keep flex/grid */}
                <div className="flex flex-col gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div className="inline-flex w-full" key={itemIndex}>
                      <RoundedItem text={item} isLong={section.title === 'System Setup & Transition'} />
                    </div>
                  ))}
                </div>
                <div 
                  className="w-full h-[1px] mt-8 sm:mt-12"
                  style={{
                    background: 'linear-gradient(90deg, rgba(219, 219, 219, 0.2), rgba(219, 219, 219, 0.05))'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Ongoing Support & Advisory Section */}
          <div className="mt-20">
            <h3 
              className="text-white mb-8" 
              style={{ 
                fontFamily: 'Kulim Park, sans-serif', 
                fontSize: '32px',
                fontWeight: '300',
                letterSpacing: '0.5px'
              }}
            >
              Ongoing Support & Advisory
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="inline-flex w-full md:w-auto"><RoundedItem text="Business insights and forecasting" /></div>
                <div className="inline-flex w-full md:w-auto"><RoundedItem text="Regulatory guidance & audit support" /></div>
              </div>
              <div className="inline-flex w-full md:w-auto"><RoundedItem text="Scalability as your business grows" /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
