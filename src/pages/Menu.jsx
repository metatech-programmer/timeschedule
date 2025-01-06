import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const menuItems = [
  { path: "/schedule", label: "Horarios", icon: <FaHome size={20} /> },
  { path: "/schedule", label: "Horarios", icon: <FaCalendarAlt size={20} /> },
  { path: "/about", label: "Informacion", icon: <FaInfoCircle size={20} /> },
];

const Menu = () => {
  const linkClasses =
    "flex flex-col items-center bg-white p-2 rounded-lg shadow-sm text-gray-700 transition-transform transform active:scale-105 active:bg-primary-orange-app active:text-white";

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-gradient-to-r from-[#a8d5cd] to-[#b7d9f0] p-3 rounded-full shadow-xl shadow-secondary-blue-app/80 flex justify-around z-[60]">
      {menuItems.map(({ path, label, icon }) => (
        <Link key={path} to={path} className={linkClasses} about={label} accessKey={label} aria-atomic={label} aria-label={label} aria-describedby={label} aria-hidden={label}  >
          {icon}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
