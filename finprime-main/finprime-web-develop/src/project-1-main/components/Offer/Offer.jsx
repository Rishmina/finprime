                import React, { useState } from 'react';
                import { Helmet, HelmetProvider } from 'react-helmet-async';
                import Navbar from '../Navbar/Navbar';
                import Footer from '../Footer/Footer';
                import WhatsAppIcon from '../WhatsAppIcon/WhatsAppIcon';
                import { Link} from 'react-router-dom';
                import { Services } from '../Services';
import CookieBanner from '../Cookies/CookieBanner';



                const Offer = () => {
                
                const [price, setPrice] = useState(100000);
                const [duration, setDuration] = useState(1); 
                const minPrice = 100000;
                const maxPrice = 2500000;

                
                const handlePriceChange = (event) => {
                    setPrice(Number(event.target.value));
                };

                
                const handleDurationChange = (event) => {
                    setDuration(Number(event.target.value));
                };

                
                const displayPrice = (value) => {
                    return (value / 1000).toFixed(1) + 'k'; 
                };

                                

                const service = Services.find((s) => s.id === parseInt(s.id));
                const subService = service?.subtitles.find((sub) => sub.subid === parseInt(sub.subid));

                if (!service || !subService) return <div>Sub-service not found</div>;


                return (
                    <HelmetProvider>
                    <div>
                                     <Helmet>
                                          <title>Finframe Business and Tax Consultancy</title>
                                          <meta name="description" content="Get in touch with EpicEventz for all your corporate event planning needs. Contact us today!" />
                                          <meta name="keywords" content="contact, event planning, corporate events" />
                                          <meta name="author" content="EpicEventz" />
                                          <meta property="og:title" content="Contact Us - EpicEventz" />
                                          <meta property="og:description" content="Reach out to us for expert corporate event solutions, including annual and family day celebrations." />
                                          <meta property="og:image" content="https://yourwebsite.com/images/about-page-image.jpg" />
                                          <meta property="og:type" content="website" />
                                          <meta property="og:url" content="https://yourwebsite.com/about" />
                                          <meta name="twitter:card" content="summary_large_image" />
                                          <meta name="twitter:title" content="Contact Us - EpicEventz" />
                                          <meta name="twitter:description" content="Reach out to us for expert corporate event solutions, including annual and family day celebrations." />
                                          <meta name="twitter:image" content="https://yourwebsite.com/images/about-page-image.jpg" />
                                   </Helmet>
                        <Navbar/>
                    <div className="p-8 mt-40 mb-10 font-inter">







                    {/* Big Heading */}
                    <h4 className="px-5 text-3xl text-center md:px-20 lg:px-40 md:text-5xl xl:text-7xl xl:px-72 mb-36 animate-fadeinleft sm:animate-fadeinbottom">Get an <span className='italic'>initial estimate
                        </span> in seconds with Finprime consulting </h4>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <div className="flex flex-wrap mb-8 animate-fadeinbottom">
                        <div className="w-full px-6 border-black sm:animate-fadeinleft lg:w-1/2 sm:px-20 lg:px-0 lg:pl-28 xl:pl-40 lg:pr-24 xl:pr-28 lg:border-r-4">
                            <div className='flex justify-between mb-5 '> 
                                <h4 className="text-2xl font-light lg:text-2xl xl:text-4xl ">Amount</h4>
                                <div className="text-2xl font-light text-center text-black lg:text-2xl xl:text-4xl">$ {displayPrice(price)}</div>
                            </div>












                        <div className="relative mb-1 sm:animate-fadeinleft">
                            <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={price}
                            onChange={handlePriceChange}
                   
                   
                   
                            className="w-full h-[2px] bg-black rounded-lg appearance-none"
                            style={{ 
                                background: 'linear-gradient(to right, #4a5568 0%, #4a5568 ' + `${((price - minPrice) / (maxPrice - minPrice)) * 100}%` + ', #d1d5db ' + `${((price - minPrice) / (maxPrice - minPrice)) * 100}%` + ' , #d1d5db 100%)'
                            }}
                            />
                            <div className="absolute w-full transform -translate-y-1/2 top-1/2 "></div>
                            <div
                            className={`absolute top-1/2 transform -translate-y-1/2  transition-transform duration-200`}
                            style={{ left: `${((price - minPrice) / (maxPrice - minPrice)) * 100}%` }}
                            ></div>
                        </div>












                        {/* Display Current Price */}
                        <div className="flex justify-between font-semibold sm:animate-fadeinleft"  >
                            <span>$ {displayPrice(minPrice)}</span>
                            <span>$ {displayPrice(maxPrice)}</span>
                        </div>
                        





















                        {/* Duration Section */}
                        <div className='flex justify-between pb-8 mt-16 sm:animate-fadeinleft'>
                            <div>
                                <h3 className="text-2xl font-light lg:text-2xl xl:text-4xl">Duration</h3>
                            </div>
                            
                            <div className="text-2xl font-light lg:text-2xl xl:text-4xl">{duration} year{duration > 1 ? 's' : ''}</div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4 sm:animate-fadeinleft">
                            
                            <input
                            type="range"
                            min={1}
                            max={2}
                            step={1} 
                            value={duration} 
                            onChange={handleDurationChange}
                            className="w-full h-[1.5px] bg-gray-300 rounded-lg appearance-none"
                            />
                            
                        </div>
                        <div className='flex justify-between font-semibold sm:animate-fadeinleft'>
                            <span className="text-md">1 years</span>
                            <span className="text-md">2 year</span>
                        </div>
                        
                        
                        </div>












                        {/* Column for Details */}
                        <div className="w-full px-6 pt-10 sm:animate-fadeinright lg:w-1/2 sm:px-20 lg:px-0 sm:pt-20 lg:pt-0 lg:pl-24 xl:pl-28 lg:pr-20 xl:pr-40">
                        <h4 className="mb-4 text-2xl font-semibold sm:text-4xl lg:text-3xl xl:text-5xl">${(price + 5000).toLocaleString()}</h4>
                        <h4 className="mb-2 text-xl font-light xl:text-3xl">Long heading describing the offer in more detail goes here.</h4>
                        <p className="mb-4 font-normal lg:text-sm ">Long heading describing the offer in more detail 
                        Long heading describing the offer in more detail goes here.
                        </p>
                        <div className="flex justify-between mb-4 font-medium">
                            <h3 className="text-md sm:text-xl">Interest Rate</h3>
                            <p>5% APR</p>
                        </div>
                        <div className="flex justify-between mb-4 font-medium ">
                            <h3 className="text-md sm:text-xl">Total Interest and Fees</h3>
                            <p>$5,000</p>
                        </div>
                        <div className="flex justify-between font-medium ">
                            <h3 className="text-md sm:text-xl">Total Amount Repayable</h3>
                            <p>${(price + 5000).toLocaleString()}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                        <p className="mb-12">
                        *Includes 1% in and 1% out fees.
                        </p>
                    </div>















                    {/* Inquiry Button */}
                    <div className="text-left">
                        <Link
                        to={`/form2/${service.id}/${subService.subid}`}
                        className="bg-white text-black border border-black
                        text-[10px] xl:text-sm py-2 px-6 transition-all duration-300  hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500">
                        Enquiry Now
                        </Link>
                    </div>
                        </div>
                    </div>

                    
                    
                    </div>
                    <Footer/>
                    <CookieBanner/>
                    <WhatsAppIcon/>
                    </div>
                    </HelmetProvider>
                );
                }

                export default Offer;
