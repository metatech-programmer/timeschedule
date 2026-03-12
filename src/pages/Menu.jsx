import { Link, useLocation } from "react-router-dom";
import { SvgPlus, SvgCalendar, SvgInfo, SvgArrowUp } from "../components/Icons";

const menuItems = [
  { path: "/manager", label: "Gestionar", icon: <SvgPlus size={18} /> },
  { path: "/schedule", label: "Horario", icon: <SvgCalendar size={18} /> },
  { path: "/about", label: "Info", icon: <SvgInfo size={18} /> },
];

const Menu = (props) => {
  const location = useLocation();

  return (
    <nav
      className={
        "fixed md:hidden bottom-4 left-1/2 -translate-x-1/2 z-[60] " +
        (props.status ? "hidden" : "")
      }
    >
      <div className="glass-card flex items-center gap-1 px-3 py-2 rounded-2xl shadow-2xl"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(48,179,187,0.2)" }}
      >
        {menuItems.map(({ path, label, icon }) => {
          if (localStorage.getItem("ScheduleFirst") !== "true" && path === "/schedule") return null;
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              title={label}
              className={
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 " +
                (isActive
                  ? "bg-primary-orange-app text-white shadow-lg glow-orange"
                  : "text-muted-app hover:text-quaternary-gray-app hover:bg-white/5")
              }
            >
              <span className={isActive ? "animate-wiggle inline-block" : "inline-block"}>{icon}</span>
              {isActive && <span className="animate-fade-in-fast">{label}</span>}
            </Link>
          );
        })}

        <a
          href="#top"
          title="Ir arriba"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 text-muted-app hover:text-quaternary-gray-app hover:bg-white/5"
        >
          <SvgArrowUp size={18} />
        </a>
      </div>
    </nav>
  );
};

export default Menu;
