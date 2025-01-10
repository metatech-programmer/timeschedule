import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";

const menuItems = [
  { path: "/manager", label: "Agendar", icon: <FaHome size={20} /> },
  {
    path: "/schedule",
    label: "Horarios",
    icon: <FaCalendarAlt size={20} />,
  },
  { path: "/about", label: "Información", icon: <FaInfoCircle size={20} /> },
];


const Menu = (props) => {
  const linkClasses =
    "flex flex-col items-center p-2 rounded-lg shadow-sm transition-transform transform active:scale-105 active:bg-primary-orange-app active:text-white ";

  return (
    <div
      className={
        "fixed md:hidden bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-gradient-to-r from-[#a8d5cd] to-[#b7d9f0] p-3 rounded-full shadow-xl shadow-secondary-blue-app/80 flex justify-around z-[60]" +
        (props.status ? " hidden" : "")
      }
    >
      {menuItems.map(({ path, label, icon }) =>
        localStorage.getItem("ScheduleFirst") !== "true" &&
        path === "/schedule" ? null : (
          <Link
            key={path}
            to={path}
            className={
              linkClasses +
              " " +
              (window.location.pathname === path
                ? "bg-primary-orange-app text-white"
                : "bg-quaternary-gray-app text-gray-700")
            }
            title={label}
          >
            {icon}
          </Link>
        )
      )}

      <a
        className="flex flex-col items-center p-2 rounded-lg shadow-sm transition-transform transform active:scale-105  active:bg-primary-orange-app active:text-white bg-quaternary-gray-app text-gray-700 "
        style={{ scrollBehavior: "smooth" }}
        href="#top"
      >
        <BiUpArrowAlt size={20} className="active:scale-110" />
      </a>
    </div>
  );
};

export default Menu;
