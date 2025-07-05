import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import logoWhite from '../../images/Navbar/finprime-logo.svg';
import logoDark from '../../images/Navbar/white-dark.png';
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
import companyProfileImage from '../../images/company-pro.png';
import { MdCenterFocusStrong } from 'react-icons/md';
import finLogo from '../../images/Navbar/fin.png';
import logoLanding from '../../images/Navbar/p.svg';

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
    const logoSrc =
        location.pathname === '/' || location.pathname === '/about'
            ? logoLanding
            : logoDark;

    // Show the correct text logo based on the route
    const showTextLogo = location.pathname !== '/' && location.pathname !== '/about';
    const textLogoSrc = showTextLogo ? logoWhite : finLogo;

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

    // Add state for mobile service menu and selected nav item
    const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
    const [selectedMobileNavItem, setSelectedMobileNavItem] = useState(null);

    // Define the extra mobile menu items in the correct order
    const extraMobileMenu = [
        { name: 'FREE CONSULTATION', link: '/freeconsultation' },
        { name: 'RIGHT SOLUTIONS', link: '/rightsolutions' },
        { name: 'SPEAK TO AN EXPERT', link: '/#speaktoanexpert' },
    ];

    return (
        <>
            {/* Logo with Accenture-style animation: main logo moves to top right and shrinks, text logo animates in */}
            <div className="fixed z-[9999] top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8">
                <Link
                    to="/"
                    className="relative inline-block h-12 w-[56px] sm:h-10 sm:w-[120px] md:h-14 md:w-[180px] border-none outline-none"
                    style={{ minWidth: 56, border: 'none', outline: 'none' }}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                    onTouchStart={() => setIsLogoHovered(true)}
                    onTouchEnd={() => setIsLogoHovered(false)}
                >
                    <img
                        src={logoSrc}
                        alt="Finprime Logo"
                        className={`
                            absolute top-0
                            transition-all duration-500 ease-in-out
                            h-12 w-auto sm:h-10 md:h-16
                            ${isLogoHovered
                                ? 'transform scale-50 left-6 sm:left-8 -translate-y-6 sm:-translate-y-9 z-20'
                                : 'transform scale-100 translate-x-0 translate-y-0 z-10'}
                        `}
                        style={{ pointerEvents: 'none', border: 'none', outline: 'none' }}
                    />
                    {isLogoHovered && (
                        <img
                            src={textLogoSrc}
                            alt="Finprime Text Logo"
                            className="h-12 w-auto sm:h-10 md:h-16 z-20 ml-2 transition-all duration-500"
                            style={{ pointerEvents: 'none', border: 'none', outline: 'none' }}
                        />
                    )}
                </Link>
            </div>

            {/* Hamburger Menu - Mobile */}
            <div className="fixed z-[9999] top-8 right-8 block md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className={`${shouldShowDarkLogo ? 'text-black' : 'text-white'} focus:outline-none flex items-center gap-2`}
                >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={shouldShowDarkLogo ? 'black' : 'white'}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>Menu</span>
                </button>
            </div>
            {/* Hamburger Menu - Desktop */}
            <div className="fixed z-[9999] top-8 right-8 hidden md:flex">
                <button
                    onClick={toggleDropdown}
                    className={`${shouldShowDarkLogo ? 'text-black' : 'text-white'} focus:outline-none flex items-center gap-2`}
                >
                    <span className="flex flex-col justify-center items-start w-6 h-6 mr-2">
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'} mb-1`}></span>
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'} mb-1`}></span>
                        <span className={`block w-6 h-0.5 ${shouldShowDarkLogo ? 'bg-black' : 'bg-white'}`}></span>
                    </span>
                    <span>Menu</span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    ref={dropdownRef}
                    className="fixed inset-0 bg-black bg-opacity-90 z-[10000] flex flex-col items-center justify-center md:hidden"
                >
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-8 right-8 text-white"
                    >
                        <HiXMark className="h-10 w-10" />
                    </button>
                    {!isMobileServiceOpen ? (
                        <ul className="text-center">
                            {barmenu.map(item => (
                                <li key={item.MenuId} className="my-6">
                                    <Link
                                        to={item.links}
                                        className="text-white text-3xl font-light hover:text-cyan-400 transition-colors duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                            {/* Extra mobile-only items, all caps */}
                            {extraMobileMenu.map((item, idx) => (
                                <li key={item.name} className="my-6 block md:hidden">
                                    {item.name === 'SPEAK TO AN EXPERT' ? (
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                toggleSpeakExpert();
                                            }}
                                            className="text-white text-3xl font-light hover:text-cyan-400 transition-colors duration-300 tracking-widest"
                                            style={{ letterSpacing: '0.1em' }}
                                        >
                                            {item.name}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.link}
                                            className="text-white text-3xl font-light hover:text-cyan-400 transition-colors duration-300 tracking-widest"
                                            style={{ letterSpacing: '0.1em' }}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                            <li className="my-6">
                                <button
                                    onClick={() => setIsMobileServiceOpen(true)}
                                    className="text-white text-3xl font-light hover:text-cyan-400 transition-colors duration-300 tracking-widest"
                                    style={{ letterSpacing: '0.1em' }}
                                >
                                    SERVICES
                                </button>
                            </li>
                        </ul>
                    ) : selectedMobileNavItem === null ? (
                        // Show all main navbar items under Service
                        <div className="w-full flex flex-col items-center">
                            <button
                                onClick={() => setIsMobileServiceOpen(false)}
                                className="text-white text-xl mb-4"
                            >
                                Back
                            </button>
                            <ul className="w-full max-w-xs mx-auto">
                                {menuItems.map((item, idx) => (
                                    <li key={idx} className="text-white text-lg my-2">
                                        <button
                                            onClick={() => setSelectedMobileNavItem(idx)}
                                            className="w-full text-left text-white text-lg py-2 px-4 rounded hover:bg-cyan-700"
                                        >
                                            {item.headtitle}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        // Show subcontents for the selected main item
                        <div className="w-full flex flex-col items-center">
                            <button
                                onClick={() => setSelectedMobileNavItem(null)}
                                className="text-white text-xl mb-4"
                            >
                                Back
                            </button>
                            <ul className="w-full max-w-xs mx-auto">
                                {menuItems[selectedMobileNavItem].subtitles?.map((sub, subIdx) => (
                                    <li key={subIdx} className="text-cyan-300 text-base my-1">
                                        <Link
                                            to={`/services/${menuItems[selectedMobileNavItem].title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsMobileServiceOpen(false);
                                                setSelectedMobileNavItem(null);
                                            }}
                                            className="block py-2 px-4 hover:bg-cyan-800 rounded"
                                        >
                                            {sub.headsubtitle}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Main Navbar - Centered */}
            <nav className="fixed z-[9999] top-6 left-1/2 -translate-x-1/2 hidden md:block">
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

            {/* Mega menu dropdown rendered outside nav/flex for true full width */}
            {isServiceOpen && (
                <ul className='items-center hidden py-2 lg:flex'>
                    <li
                        className="py-6"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`font-raleway hover:text-cyan-500 font-medium pb-2 tracking-[1px] text-sm lg:text-[20px] xl:text-[16px]
                             ${location.pathname !== '/rightsolutions' &&
                                location.pathname !== '/freeconsultation' &&
                                location.pathname !== '/about' &&
                                location.pathname !== '/' &&
                                location.pathname !== '/blog' &&
                                location.pathname !== '/offer' &&
                                location.pathname !== '/contactus' &&
                                !location.pathname.startsWith('/blog') ? 'link-115  font-bold' : null} ${(location.pathname !== '/' ? 'text-black' : 'text-white')}
                             transition-colors duration-300`}
                            style={{
                                padding: "4px",
                                color: location.pathname !== '/' ? 'black' : 'white',
                            }}>
                            
                        </button>

                        <div
                            className={`fixed left-0 w-full text-black bg-white mt-3 shadow-xl transition-opacity duration-300 ease-in-out transform ${isServiceOpen ? 'animate-fadeinrightsmall visible' : 'opacity-0 -translate-y-4 invisible'} font-roboto font-semibold z-[10001] top-[70px]`}
                        >
                            <div className="flex flex-col w-full h-full md:flex-row">
                                {/* Column 1: Company Profile Card with heading and button overlay */}
                                <div className="flex flex-col items-start justify-start pt-2 px-4 md:px-10 w-full md:w-[28%] min-w-[320px] max-w-[440px]">
                                    <h4 className="mb-3 mt-1 text-xl font-bold font-roboto text-left w-full leading-snug">
                                        Working with you,<br/>
                                        not just for you
                                    </h4>
                                    <div className="relative w-[340px] h-[380px] mt-2">
                                        <img src={companyProfileImage} alt="Company Profile" className="w-full h-full object-contain" />
                                        <button
                                            onClick={() => window.open('/pdf/finprime-company-profile.pdf', '_blank')}
                                            className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[230px] h-[48px] rounded-[24px] flex items-center justify-between px-8 text-white font-roboto text-base transition-all hover:shadow-lg"
                                            style={{
                                                background: 'linear-gradient(90deg, #1A1F39 0%, #06B6D4 100%)',
                                                height: '48px',
                                            }}
                                        >
                                            <span className="pl-2 font-semibold">FinPrime Profile</span>
                                            <div className="flex items-center justify-center ml-4">
                                                <MdCenterFocusStrong size={24} />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Column 2: Service List */}
                                <div className='flex flex-col py-4 pl-4 w-full md:w-[40%]'>
                                    <ul>
                                        {Services.map((service, index) => (
                                            <li key={index} className="group">
                              <button
                                                    onClick={() => handleQuestionClick(index)}
                                                    className={`text-black font-khula text-lg flex justify-between w-full pl-8 py-5 border-b ${selectedIndexOpen === index
                                                        ? 'bg-brandBlue text-white border-l-8 border-cyan-500'
                                                        : 'group-hover:bg-brandBlue group-hover:text-white group-hover:border-l-8 group-hover:border-cyan-500'
                                                        }`}
                                                >
                                                    {service.headtitle}
                                                    <FaArrowRight className={`right-0 text-2xl mr-5 ${selectedIndexOpen === index ? 'hidden' : 'group-hover:animate-fadeinleftsmall'}`} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                                {/* Column 3: Sub-services Display */}
                                <div className='flex flex-col w-full md:w-[40%] h-full relative'>
                                    {selectedIndexOpen !== null && isAnswerVisible ? (
                                        <div className={`inset-0 w-full h-[445px] transition-opacity duration-500 ease-in-out animate-fadeinleftsmall bg-brandBlue px-4 md:px-28 py-4`}>
                                            <div className='flex items-center'>
                                                <button
                                                    onClick={handleCloseAnswer}
                                                    className={`mt-6 -ml-5 mr-5 text-cyan-500 hover:text-cyan-700`}
                                                >
                                                    <RiArrowLeftSLine className='text-2xl' />
                                                </button>
                                                <h4 className="pt-10 mb-3 text-2xl font-bold text-white font-khula">
                                                    {Services[selectedIndexOpen].headtitle}
                            </h4>
                                            </div>
                                            <ul>
                                                {Services[selectedIndexOpen].subtitles.map((sub) => (
                                                    <li key={sub.subid}>
                                  <Link
                                                            to={`/services/${Services[selectedIndexOpen].title.replace(/\s+/g, '-')}/${sub.keyword.replace(/\s+/g, '-')}`}
                                                            state={{
                                                                service_id: Services[selectedIndexOpen].id,
                                                                subtitles_id: sub.subid
                                                            }}
                                                            className="mb-1 ml-8 text-lg text-white hover-underline-animation"
                                                            onClick={handleLinkClick}
                                                        >
                                    {sub.headsubtitle}
                                  </Link>
                                                    </li>
                                                ))}
                            </ul>
                                        </div>
                                    ) : (
                                        <ul className="px-4 py-4 text-black md:px-28 md:py-16">
                                            <h4 className='font-semibold md:text-3xl font-khula'>Who We Serve</h4>
                              {[
                                'Technology',
                                'Healthcare',
                                'Education',
                                'Startups',
                                'Manufacturing',
                                'Financial Services',
                                'Consumer',
                              ].map((item) => (
                                                <p
                                                    key={item} className='flex w-full py-2 cursor-pointer text-md font-raleway items-center'>
                                                    <span className='mr-2 text-lg font-bold'>&gt;</span>
                                                    <span className='hover-underline-animation'>{item}</span>
                                                </p>
                              ))}
                            </ul>
                        )}
                      </div>
                    </div>
                </div>
                    </li>
                </ul>
            )}

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