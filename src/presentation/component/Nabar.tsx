import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../infrastructure/context/AuthContext";
import { clearTokens } from "../../Services/utils/tokenUtils";
import {
  FaHome,
  FaUserEdit,
  FaBook,
  FaUserGraduate,
  FaList,
  FaHandHolding,
  FaCog,
  FaSync,
} from "react-icons/fa"; 

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  // Nav items with icons
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Author", path: "/author", icon: <FaUserEdit /> },
    { name: "Book", path: "/book", icon: <FaBook /> },
    { name: "Student", path: "/student", icon: <FaUserGraduate /> },
    { name: "Transaction List", path: "/transaction", icon: <FaList /> },
    { name: "Issuing", path: "/issuing", icon: <FaHandHolding /> },
    // { name: "Favicon Settings", path: "/favicon-settings", icon: <FaCog /> }, // New page for favicon settings
  ];

  
  const logout = () => {
    clearTokens();
    authLogout();
    navigate("/login");
  };

  
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-[222px] h-screen bg-[#255D81] text-white">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        HSMSS LIBRARY
      </div>
      <div className="flex flex-col mt-6 space-y-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-6 py-2 flex items-center space-x-3 ${
              activeLink === item.path
                ? "bg-white text-blue-600"
                : "hover:bg-white hover:text-blue-600"
            }`}
            onClick={() => setActiveLink(item.path)}
          >
            <span>{item.icon}</span> {/* Render icon */}
            <span>{item.name}</span> {/* Render name */}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-6 w-full">
        {/* Refresh Button */}
        <button
          onClick={refreshPage}
          className="w-full text-left hover:bg-white hover:text-blue-600 px-6 py-2 flex items-center space-x-3"
        >
          <span>
            <FaSync /> {/* Refresh icon */}
          </span>
          <span>Refresh</span>
        </button>
        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full text-left hover:bg-white hover:text-blue-600 px-6 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;