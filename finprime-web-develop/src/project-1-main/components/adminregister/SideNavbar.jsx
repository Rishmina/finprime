import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserAlt, FaComments, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import Top from "./Top";

const SideNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateToken = () => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || (expiry && Date.now() > parseInt(expiry))) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
    }
  };

  useEffect(() => {
    validateToken();

    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get('https://finprimeconsulting.com/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Unable to load data.");
        if ([401, 403].includes(error.response?.status)) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }


  return (

    <div >
      <Top/>
       <div className="flex h-screen">

       

      <div className="w-48 bg-gray-800 text-white flex flex-col">
     
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Sidebar</h1>
        </div>
        <nav className="flex-grow">
          <ul className="mt-8">
            {[
              { path: "/bloglists", icon: <FaComments />, label: "Blog Lists" },
              { path: "/blogform", icon: <FaComments />, label: "Blog Form" },
              { path: "/testimonialslists", icon: <FaComments />, label: "Testimonial Lists" },
              { path: "/testimonialform", icon: <FaComments />, label: "Testimonial Form" },
              { path: "/form-submissions", icon: <FaComments />, label: "Survice Mail" },
              { path: "/form2-submissions", icon: <FaComments />, label: "Industry Mail" },
              { path: "/maillist", icon: <FaComments />, label: "Subscribers" },
              { path: "/maillist2", icon: <FaComments />, label: "Subscribers2" },
            ].map(({ path, icon, label }) => (
              <li
                key={path}
                className={`p-4 ${
                  location.pathname === path ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <Link to={path} className="flex text-lg items-center gap-2">
                   {label}
                </Link>
              </li>
            ))}
            <li className="p-4 border-t"> 
              <button
                onClick={handleLogout}
                className=" text-white text-lg flex items-center gap-2"
              >Logout
              </button>

            </li>
           
          </ul>
        </nav>
      </div>
    </div>
    </div>
  );
};

export default SideNavbar;
