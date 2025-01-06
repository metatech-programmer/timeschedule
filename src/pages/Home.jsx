import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const icon = document.getElementById("icon");
    const home = document.getElementById("home");

    icon.classList.add("animate-expanddisplay");
    home.classList.add("animate-fade-out");
    setTimeout(() => {
      navigate("/schedule");
      home.classList.remove("animate-fade-out");
    }, 2500);
    setTimeout(() => {
      icon.classList.remove("animate-expanddisplay");
    }, 2800);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-dvh w-dvw bg bg-gradient-to-b from-primary-orange-app to-background-app"
      id="home"
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url(motion2.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.1",
          zIndex: "1",
        }}
      ></div>
      <div className="text-center w-full z-10">
        <img
          src="/icon.webp"
          alt="icon"
          id="icon"
          className="mx-auto mb-4 h-20 border-collapse"
          style={{
            borderRadius: "50%",
            border: "1px solid #F6F6F4",
            backgroundColor: "#F6F6F4",
            objectFit: "cover",
            objectPosition: "center",
            filter: "drop-shadow(2px 2px 5px rgba(0, 0, 16, 0.6))",
          }}
        />
        <h1
          className="text-5xl font-extrabold mb-4 text-primary-orange-app"
          style={{ textShadow: "2px 2px 5px rgba(0, 0, 16, 0.6)" }}
        >
          Timeschedule
        </h1>
        <p className="text-lg  text-quaternary-gray-app/70 mb-8 font-semibold">
          Planificador de horarios, oragniza tu día con facilidad y comodidad
        </p>
      </div>

      <button
        className="bg-secondary-blue-app hover:bg-primary-orange-app text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl z-10 overflow-hidden"
        onClick={handleClick}
      >
        Vamos
      </button>
      
    </div>
  );
};

export default Home;
