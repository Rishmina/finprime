import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Siljo_Devassy from '../About/Expert/../../../images/team/Siljo_Devassy.jpg';
import Hiba_Farook from '../About/Expert/../../../images/team/Hiba_Farook.jpg';
import Mohammed_Fayyaz_Majeed from '../About/Expert/../../../images/team/Mohammed_Fayyaz_Majeed.jpg';
import Murshina_A from '../About/Expert/../../../images/team/Murshina_A.jpg';

// Placeholder for the country flag icon
const UAEFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 72 72">
        <rect x="25" y="17" width="45" height="12" fill="#009e49"/>
        <rect x="25" y="29" width="42" height="12" fill="#fff"/>
        <rect x="25" y="41" width="42" height="12" fill="#000"/>
        <rect x="9" y="17" width="16" height="36" fill="#f00"/>
    </svg>
);

const ArticleCard = ({ image, name }) => (
    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
        <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
);

const Refer = () => {
    return (
        <div className="bg-white font-sans">
            <Navbar />
            <div className="max-w-screen-xl mx-auto py-20 md:py-40 mt-8 md:mt-16 px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Left Column */}
                    <div className="w-full lg:w-3/5 px-4">
                        <div className="mb-12">
                            <h1 className="text-2xl font-kulim-park mb-4 font-extralight">Earn Up Rewards<br />With Every Successful Referral</h1>
                            <p className="text-gray-600 mb-8">
                                Do you know someone who could benefit from setting up their business with SPC Free Zone? With our referral program, you can now leverage your connections and get rewarded handsomely!
                            </p>
                            <h2 className="text-1xl font-semibold mb-4">How it works:</h2>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li><span className="mr-2 text-xs">&gt;</span>Fill in the referral form on this page.</li>
                                <li><span className="mr-2 text-xs">&gt;</span>Our team will reach out to you.</li>
                                <li><span className="mr-2 text-xs">&gt;</span>Enjoy your rewards after the successful completion of the deal.</li>
                            </ul>
                        </div>
                        <div className="flex flex-wrap -mx-3 mt-12 md:mt-20">
                            <ArticleCard image={Siljo_Devassy} name="Siljo Devassy" />
                            <ArticleCard image={Hiba_Farook} name="Hiba Farook" />
                            <ArticleCard image={Mohammed_Fayyaz_Majeed} name="Mhd Fayyaz Majeed" />
                            <ArticleCard image={Murshina_A} name="Murshina A" />
                        </div>
                    </div>

                    {/* Right Column (Form) */}
                    <div className="w-full lg:w-2/5 px-4 md:px-8 flex flex-col mt-12 lg:-mt-12">
                        <div 
                            className="rounded-[2.5rem] p-6 text-white shadow-2xl"
                            style={{ background: 'linear-gradient(175deg, #06B6D4, #1A1F39 50%)' }}
                        >
                            <form>
                                <div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold mb-3">YOUR DETAILS</h2>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                        <input type="text" id="name" placeholder="Name" className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <UAEFlag />
                                            </div>
                                            <input type="tel" id="phone" placeholder="0501234567" className="w-full p-3 pl-12 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                        <input type="email" id="email" placeholder="identity@gmail.com" className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-xl font-bold mb-3 italic">REFERRAL DETAILS</h2>
                                        <p className="text-sm opacity-80 mb-3">WHO YOU WANT TO REFER</p>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ref-name" className="block text-sm font-medium mb-1">Referral Name</label>
                                        <input type="text" id="ref-name" placeholder="Referral Name" className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ref-phone" className="block text-sm font-medium mb-1">Referral Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <UAEFlag />
                                            </div>
                                            <input type="tel" id="ref-phone" placeholder="0501234567" className="w-full p-3 pl-12 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="ref-email" className="block text-sm font-medium mb-1">Referral Email Address</label>
                                        <input type="email" id="ref-email" placeholder="identity@gmail.com" className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-start mb-4">
                                        <input id="terms" type="checkbox" className="h-4 w-4 mt-1 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 flex-shrink-0" />
                                        <label htmlFor="terms" className="ml-3 block text-xs">
                                            By submitting this form, you agree to the Terms and Privacy Policy of SPCFZ and consent to SPCFZ collecting your details and contacting you via email, phone, or WhatsApp.
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-12 rounded-full transition duration-300">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Refer; 