import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const menuItems = [
  { path: "/", label: "Inicio", icon: <FaHome size={20} /> },
  { path: "/schedule", label: "Horarios", icon: <FaCalendarAlt size={20} /> },
  { path: "/about", label: "Acerca de", icon: <FaInfoCircle size={20} /> },
];

const Menu = () => {
  const linkClasses =
    "flex flex-col items-center bg-white p-2 rounded-lg shadow-sm text-gray-700 transition-transform transform hover:scale-105";

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-gradient-to-r from-[#A8D5BA] to-[#B7D9F0] p-3 rounded-full shadow-md flex justify-around z-[60]">
      {menuItems.map(({ path, label, icon }) => (
        <Link key={path} to={path} className={linkClasses}>
          {icon}
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
