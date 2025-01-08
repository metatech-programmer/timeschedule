import React from "react";
import { Link } from "react-router-dom";
import phrases from "../utils/phrases";

const Thanks = () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <div className="bg-background-app text-quaternary-gray-app p-5 rounded-lg  h-dvh flex flex-col items-center justify-center text-center relative">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url(motion2.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.05",
          zIndex: "1",
        }}
      ></div>
      <h1
        className="text-2xl font-bold uppercase text-primary-orange-app text-pretty"
        style={{ textShadow: "2px 2px 4px " }}
      >
        {phrase}
      </h1>
      <img
        src="https://picsum.photos/1720/1080"
        alt="thanks"
        className="m-4 rounded-xl"
      />
      <p className="mt-4 text-lg text-balance">
        Gracias por atribuirnos esa grandiosa donación. Esperamos que disfrutes
        de Timeschedule.
      </p>
      <Link
        to="/schedule"
        className="mt-8 block text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white p-3 rounded-full z-50"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default Thanks;
