import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import logoWhite from '../../images/logo-white.svg';
import logoDark from '../../images/white-dark.png';
import textLogoWhite from '../../images/Navbar/finprime-logo-white.png';
import textLogoDark from '../../images/Navbar/logo-dark.png';
import img1 from '../../images/menubar/contact.jpg';
import img2 from '../../images/menubar/blog.jpg';
import img3 from '../../images/menubar/home.jpg';
import img4 from '../../images/menubar/about.png';
import img5 from '../../images/menubar/offer.jpg';
import { IoMdHome } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaMessage } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { Services } from '../Services';
import { RiArrowLeftSLine } from 'react-icons/ri';
import companyProImg from '../../images/company-pro.png';
import { IoIosClose } from 'react-icons/io';
import emailjs from "emailjs-com";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const closeTimeout = useRef(null);
    
    // Determine which logo to show based on the current route
    const shouldShowDarkLogo = location.pathname === '/rightsolutions' || 
                               location.pathname === '/refer-and-earn' || 
                               location.pathname === '/freeconsultation' ||
                               location.pathname.includes('external-audit');
    const logoSrc = shouldShowDarkLogo ? logoDark : logoWhite;
    const textLogoSrc = shouldShowDarkLogo ? textLogoDark : textLogoWhite;

    // Toggle overlay menu
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Close overlay menu when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const barmenu = [
        { MenuId: 1, title: "FINPRIME", links: "/", icon: <IoMdHome />, bgImage: img3 },
        { MenuId: 2, title: "ABOUT US", links: "/about", icon: <HiMiniUserGroup />, bgImage: img4 },
        { MenuId: 3, title: "INSIGHTS", links: "/blog", icon: <FaMessage />, bgImage: img2 },
        { MenuId: 4, title: "REFER & EARN", links: "/refer-and-earn", icon: <BiSolidOffer />, bgImage: img5 },
        { MenuId: 5, title: "CONTACT US", links: "/contactus", icon: <IoIosContact />, bgImage: img1 }
    ];

    // Add state and handlers for the Services mega menu
    const [selectedIndexOpen, setSelectedIndexOpen] = useState(null);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setIsServiceOpen(true);
    };

    const handleMouseLeave = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }
        closeTimeout.current = setTimeout(() => {
            setIsServiceOpen(false);
            setHoveredIndex(null);
        }, 500); // Increased delay to give more time
    };

    const handleQuestionClick = (index) => {
        if (selectedIndexOpen === index) {
            setIsAnswerVisible(false);
            setTimeout(() => setSelectedIndexOpen(null), 500);
        } else {
            setSelectedIndexOpen(index);
            setIsAnswerVisible(true);
        }
    };
    const handleCloseAnswer = () => { setIsAnswerVisible(false); setTimeout(() => setSelectedIndexOpen(null), 500); };
    const handleLinkClick = () => setIsServiceOpen(false);

    // Build a single menuItems array for correct index alignment
    const menuItems = [
        ...Services.slice(0, 3),
        {
            headtitle: 'Banking Operations Excellence',
            subtitles: [
                { subid: 1, headsubtitle: 'Retail Banking' },
                { subid: 2, headsubtitle: 'Corporate & SME Banking' },
                { subid: 3, headsubtitle: 'Risk and Compliance' },
                { subid: 4, headsubtitle: 'Digital Banking' },
                { subid: 5, headsubtitle: 'Customer Services and Relationship Management' }
            ]
        },
        ...Services.slice(3)
    ];

    // Speak to an Expert Modal State & Logic
    const [isSpeakExpert, setIsSpeakExpert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        mobile: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const toggleSpeakExpert = () => {
        setIsSpeakExpert(prev => !prev);
    };

    useEffect(() => {
        if (isSpeakExpert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSpeakExpert]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.company || !formData.email || !formData.mobile) {
            alert('All fields are required');
            return;
        }
        setLoading(true);
        // ... (rest of handleSubmit logic from Banner.jsx)
        fetch('https://finprimeconsulting.com/api/sendemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message || 'Form submitted successfully!');
            setMessage(data.message);
            setFormData({ name: '', company: '', email: '', mobile: '' });
            const templateParams = {
                companyName: formData.company,
                firstName: formData.name,
                email: formData.email,
                phone: formData.mobile,
            };
            emailjs
                .send('service_m92dk5v', 'template_nhk2mx3', templateParams, '_zGtLeC1_fmp56KY0')
                .then(
                    (response) => {
                        console.log('Enquiry email sent successfully!');
                        const autoReplyParams = { to_name: formData.name, to_email: formData.email };
                        emailjs.send('service_m92dk5v', 'template_x05occf', autoReplyParams, '_zGtLeC1_fmp56KY0')
                            .then(
                                (autoReplyResponse) => console.log('Auto-reply email sent successfully!'),
                                (autoReplyError) => console.error('Failed to send the auto-reply email:', autoReplyError)
                            );
                    },
                    (error) => console.error('Failed to send the enquiry email:', error)
                );
        })
        .catch((error) => alert('Failed to submit the form.'))
        .finally(() => {
            setLoading(false);
            setIsSpeakExpert(false); // Close modal
        });
    };

    return (
        <>
            {/* Logo with both logos moving: main logo slides left, text logo slides in from right */}
            <div className="fixed z-[9999] top-8 left-8">
                <Link
                    to="/"
                    className="relative inline-flex items-center h-14 pl-4"
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                    onTouchStart={() => setIsLogoHovered(true)}
                    onTouchEnd={() => setIsLogoHovered(false)}
                >
                    {/* Main Logo (slides left) */}
                    <img
                        src={logoSrc}
                        alt="Finprime Logo"
                        className={`
                            h-14 w-auto transition-all duration-500
                            ${isLogoHovered ? '-translate-x-8' : 'translate-x-0'}
                        `}
                        style={{ zIndex: 2 }}
                    />
                    {/* Text Logo (slides in from right, larger and closer) */}
                    <img
                        src={textLogoSrc}
                        alt="Finprime Text Logo"
                        className={`
                            h-24 w-auto ml-0.5 transition-all duration-500 object-contain
                            ${isLogoHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                        `}
                        style={{ zIndex: 1 }}
                    />
                        </Link>
                    </div>

            {/* Main Navbar - Centered */}
            <nav className="fixed z-[9999] top-6 left-1/2 -translate-x-1/2 hidden lg:block">
                <div className="w-[860px] h-[47px] bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] rounded-[26px] px-8">
                    <div className="flex items-center justify-between h-full">
                    {/* Desktop Navigation */}
                        <ul className="flex items-center justify-between w-full">
                            {/* Regular nav items */}
                            <div className="flex items-center space-x-8">
                                <li className="relative">
                                    <div
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        className="h-[47px] flex items-center"
                                    >
                                        <button className="text-white hover:text-opacity-80 text-[15px] font-normal transition-colors px-0 bg-transparent border-none outline-none cursor-pointer">
                                            Services
                                        </button>
                                    </div>
                                </li>

                                <Link to="/rightsolutions" 
                                    className="text-white hover:text-opacity-80 text-[15px] font-normal transition-colors"
                                >
                                    Right solutions
                        </Link>
                        
                                <Link to="/freeconsultation" 
                                    className="text-white hover:text-opacity-80 text-[15px] font-normal transition-colors"
                                >
                                    Free consultation
                        </Link>
                        
                                <Link to="/about" 
                                    className="text-white hover:text-opacity-80 text-[15px] font-normal transition-colors"
                                >
                            Company
                        </Link>

                                <Link to="/refer-and-earn" 
                                    className="text-white hover:text-opacity-80 text-[15px] font-normal transition-colors"
                                >
                                    Refer & earn
                                </Link>
                            </div>

                            {/* Expert button */}
                            <div className="flex items-center ml-8">
                                <button onClick={toggleSpeakExpert}
                                    className="bg-white/10 backdrop-blur-sm text-white font-normal 
                                        px-6 py-1.5 rounded-full hover:bg-white/20 
                                        transition-all duration-300 text-[15px]"
                                >
                                    Speak to an expert
                                </button>
                    </div>
                        </ul>
                </div>
            </div>
            </nav>

            {/* Hamburger menu button */}
            <div className="fixed z-[9999] top-8 right-8">
                <button
                    onClick={toggleDropdown}
                    className={`font-semibold flex items-center gap-x-3 text-[15px] group ${shouldShowDarkLogo ? 'text-black' : 'text-white'}`}
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col space-y-1.5">
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'}`}></span>
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'}`}></span>
                    </div>
                    <span>Menu</span>
                </button>
            </div>

            {/* Mega menu dropdown rendered outside nav/flex for true full width */}
            {isServiceOpen && (
                <div
                    className="fixed left-0 right-0 top-[100px] w-screen text-black bg-white shadow-xl transition-opacity duration-300 ease-in-out transform z-[9998] animate-fadeinrightsmall visible"
                    style={{ 
                        minHeight: '400px', 
                        borderRadius: '0', 
                        padding: 0, 
                        margin: 0, 
                        width: '100vw', 
                        display: 'flex', 
                        alignItems: 'stretch',
                        position: 'fixed',
                        top: '53px' // Positioned right below the navbar
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Left: Just text and image, no card styling */}
                    <div 
                        className="flex flex-col justify-center items-center w-[260px] min-w-[220px] max-w-[280px] mr-8 my-8"
                        onMouseEnter={handleMouseEnter}
                    >
                        <h4
                          style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            fontSize: '20px',
                            color: '#000',
                            textAlign: 'left',
                            marginBottom: '12px',
                            lineHeight: 1.2
                          }}
                        >
                          Working with you,<br />
                          not just for you
                        </h4>
                        <img
                            src={companyProImg}
                            alt="FinPrime Profile"
                            style={{
                                width: '110px',
                                height: 'auto',
                                display: 'block',
                                margin: '0 auto',
                                borderRadius: '0 px'
                            }}
                        />
                    </div>
                    {/* Center: Main Services */}
                    <div
                        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
                        onMouseEnter={handleMouseEnter}
                    >
                      {/* Service List */}
                      <div className="flex flex-col justify-center w-[420px] min-w-[380px] max-w-[440px] py-8" style={{ zIndex: 2 }}>
                        <ul>
                          {menuItems.map((item, index) => (
                            <li
                              key={index}
                              onMouseEnter={() => {
                                handleMouseEnter();
                                setHoveredIndex(index);
                              }}
                              style={hoveredIndex === index ? { background: '#1A1F39', color: '#fff', position: 'relative', zIndex: 3 } : {}}
                            >
                              <button
                                className={`flex items-center justify-between w-full px-6 py-4 border-b border-gray-100 transition-all duration-200
                                  ${hoveredIndex === index ? 'text-white' : 'text-black hover:bg-[#F5F7FA]'}
                                `}
                                style={{
                                  fontFamily: 'Roboto, sans-serif',
                                  fontSize: '14px',
                                  fontWeight: 700,
                                  background: 'none',
                                  border: 'none',
                                  outline: 'none',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  whiteSpace: 'nowrap',
                                  boxShadow: hoveredIndex === index ? '2px 0 0 0 #1A1F39' : 'none',
                                  borderRight: 'none',
                                  marginRight: 0,
                                  paddingRight: 0
                                }}
                              >
                                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: '90%'}}>
                                  {item.headtitle}
                                </span>
                                <FaArrowRight
                                  style={{
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: hoveredIndex === index ? '#fff' : '#000',
                                    marginLeft: '12px'
                                  }}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Subitem Panel */}
                      <div 
                        style={{
                            background: hoveredIndex !== null ? '#1A1F39' : '#fff',
                            color: hoveredIndex !== null ? '#fff' : '#000',
                            borderRadius: '0',
                            padding: '32px 24px',
                            minHeight: '100%',
                            minWidth: '340px',
                            maxWidth: '520px',
                            flex: 1,
                            width: '100%',
                            overflow: 'visible',
                            margin: 0,
                            borderLeft: 'none',
                            transition: 'background 0.2s, color 0.2s, width 0.2s'
                        }}
                        onMouseEnter={handleMouseEnter}
                      >
                        {hoveredIndex !== null ? (
                          <>
                            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '16px' }}>
                              &larr; {menuItems[hoveredIndex] ? menuItems[hoveredIndex].headtitle : ''}
                            </h4>
                            <ul>
                              {menuItems[hoveredIndex] && menuItems[hoveredIndex].subtitles.map((sub) => {
                                const parentTitle = menuItems[hoveredIndex].title;
                                const subPath = sub.keyword;
                                const fullPath = `/services/${parentTitle}/${subPath}`;
                                
                                return (
                                  <Link
                                    key={sub.subid}
                                    to={fullPath}
                                    onClick={() => {
                                      setIsServiceOpen(false);
                                      setHoveredIndex(null);
                                    }}
                                    style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      marginBottom: '12px', 
                                      color: '#fff',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      padding: '8px 12px',
                                      borderRadius: '4px',
                                      textDecoration: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <span style={{ fontSize: '16px', color: '#b0b8d1', marginRight: '10px' }}>&#8250;</span>
                                    {sub.headsubtitle}
                                  </Link>
                                );
                              })}
                            </ul>
                          </>
                        ) : (
                          <div className="flex flex-col justify-center py-8 pl-8">
                            <h4
                              style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 700,
                                fontSize: '16px',
                                marginBottom: '10px',
                                color: '#000'
                              }}
                            >
                              Who We Serve
                            </h4>
                            <ul
                              style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '15px',
                                color: '#1A1F39',
                                fontWeight: 400,
                                lineHeight: 1.7
                              }}
                            >
                              {[
                                'Technology',
                                'Healthcare',
                                'Education',
                                'Startups',
                                'Manufacturing',
                                'Financial Services',
                                'Consumer',
                              ].map((item) => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center' }}>
                                  <span style={{ fontSize: '16px', color: '#b0b8d1', marginRight: '10px' }}>&#8250;</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-[9999] transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out lg:hidden`}>
                <div className="w-[860px] bg-gradient-to-r from-[#1A1F39] to-[#06B6D4] rounded-[26px] px-6 py-4 space-y-3">
                    <Link to="/services" 
                        className="text-white hover:text-opacity-80 block px-3 py-2 text-[15px] font-normal"
                    >
                        Services
                    </Link>
                    <Link to="/rightsolutions" 
                        className="text-white hover:text-opacity-80 block px-3 py-2 text-[15px] font-normal"
                    >
                        Right solutions
                        </Link>
                    <Link to="/freeconsultation" 
                        className="text-white hover:text-opacity-80 block px-3 py-2 text-[15px] font-normal"
                    >
                        Free consultation
                        </Link>
                    <Link to="/about" 
                        className="text-white hover:text-opacity-80 block px-3 py-2 text-[15px] font-normal"
                    >
                        Company
                        </Link>
                    <Link to="/refer-and-earn" 
                        className="text-white hover:text-opacity-80 block px-3 py-2 text-[15px] font-normal"
                    >
                        Refer & earn
                        </Link>
                    <Link to="/expert"
                        className="block text-center bg-white/10 backdrop-blur-sm
                            text-white px-4 py-2 rounded-full text-[15px] font-normal 
                            hover:bg-white/20 transition-all duration-300"
                    >
                        Speak to an expert
                        </Link>
                </div>
            </div>

            {/* Overlay menu */}
            {isOpen && (
                <div className="fixed z-[9999] top-0 left-0 w-full h-full bg-brandBlue bg-center bg-cover" ref={dropdownRef}>
                    <span
                        className="absolute top-8 right-12 text-white text-xl font-bold cursor-pointer z-50"
                        onClick={toggleDropdown}
                    >
                        Close
                    </span>
                    <div className="flex items-center justify-center h-full">
                        <ul className="grid w-full h-full grid-cols-5 text-center">
                            {barmenu.map((item, idx) => (
                                <Link
                                    to={item.links}
                                    key={item.MenuId}
                                    className="relative transition duration-200 bg-center bg-cover shadow-md group hover:shadow-lg"
                                    style={{ backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
                                >
                                    <div className="absolute top-0 left-0 z-10 w-full h-full transition-all duration-300 bg-black bg-opacity-60 group-hover:bg-opacity-0"></div>
                                    <div className="z-20 flex flex-col items-start justify-start h-full p-2 text-white">
                                        <div style={{ marginTop: '480px', marginLeft: '20px' }}>
                                            <div 
                                                className="flex items-center justify-center gap-2"
                                                style={{
                                                    background: 'linear-gradient(90deg, #1A1F39 35.58%, #06B6D4 100%)',
                                                    width: '178px',
                                                    height: '45px',
                                                    borderRadius: '26.5px',
                                                    
                                                }}
                                            >
                                                {idx === 0 && (
                                                    <span className="text-white text-xl flex items-center"><IoMdHome /></span>
                                                )}
                                                {idx === 1 && (
                                                    <span className="text-white text-xl flex items-center"><HiMiniUserGroup /></span>
                                                )}
                                                {idx === 2 && (
                                                    <span className="text-white text-xl flex items-center"><FaMessage /></span>
                                                )}
                                                {idx === 3 && (
                                                    <span className="text-white text-xl flex items-center"><BiSolidOffer /></span>
                                                )}
                                                {idx === 4 && (
                                                    <span className="text-white text-xl flex items-center"><IoIosContact /></span>
                                                )}
                                                <span 
                                                    style={{
                                                        fontFamily: 'Inter',
                                                        fontWeight: 600,
                                                        fontSize: '18px',
                                                        lineHeight: 1.2,
                                                        letterSpacing: 0,
                                                        display: 'inline-block',
                                                        textAlign: 'left',
                                                    }}
                                                    className="text-white"
                                                >
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>
                                </div>
                                </Link>
                            ))}
                </ul>
            </div>
        </div>
            )}

            {/* Speak to an Expert Modal */}
            {isSpeakExpert && (
                <div
                    className="fixed inset-0 w-screen h-[100vh] bg-black bg-opacity-60 z-[10000] flex justify-center items-center"
                    onClick={toggleSpeakExpert}
                >
                    <div
                        className="relative bg-[#1a233a] w-[600px] h-auto shadow-md p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-white font-bold"
                            onClick={toggleSpeakExpert}
                        >
                            <IoIosClose size={28} className='hover:text-cyan-500 transition-colors duration-500' />
                        </button>
                        <form onSubmit={handleSubmit} className="space-y-4 z-50">
                            <div className="w-[90%] mx-auto">
                                <h5 className='text-white font-inter text-2xl sm:text-4xl font-semibold py-6'>Speak to an Expert</h5>
                                <div className="grid grid-cols-2 gap-6 pt-8">
                                    <input
                                        type="text" name="name" value={formData.name} onChange={handleChange}
                                        placeholder="Name" required
                                        className="w-full bg-transparent border-b-2 border-white font-inter focus:outline-none focus:border-cyan-500 text-white placeholder:text-gray-400 font-semibold text-sm transition-colors placeholder:font-inter duration-300 ease-in-out"
                                    />
                                    <input
                                        type="text" name="company" value={formData.company} onChange={handleChange}
                                        placeholder="Company" required
                                        className="w-full bg-transparent border-b-2 border-white focus:outline-none placeholder:font-inter text-white placeholder:text-gray-400 font-semibold text-sm focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6 pt-8">
                                    <input
                                        type="email" name="email" value={formData.email} onChange={handleChange}
                                        placeholder="E-mail" required
                                        className="w-full bg-transparent border-b-2 text-white placeholder:font-inter placeholder:text-gray-400 font-semibold text-sm border-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                    <input
                                        type="text" name="mobile" value={formData.mobile} onChange={handleChange}
                                        placeholder="Mobile" required
                                        className="w-full bg-transparent border-b-2 border-white focus:outline-none text-white placeholder:text-gray-400 font-semibold text-sm placeholder:font-inter focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="flex items-center mt-6">
                                    <input type="checkbox" id="privacy-policy" required className="mr-2" />
                                    <label htmlFor="privacy-policy" className="ml-1 block text-xs text-gray-300 font-inter">
                                        I agree to the Privacy Policy <span className="text-red-500 font-inter underline">required</span>
                                    </label>
                                </div>
                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="bg-transparent border border-white text-white py-2 px-16 text-sm font-inter transition-colors duration-300 hover:bg-black hover:text-white"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                                {message && <p className="text-white mt-4">{message}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </> 
    );
};

export default Navbar;