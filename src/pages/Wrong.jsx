import React from "react";
import { Link } from "react-router-dom";

const Wrong = () => {
  return (
     <div className="bg-red-950 text-quaternary-gray-app p-5 rounded-lg  h-dvh flex flex-col items-center justify-center text-center relative">
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
            className="text-2xl font-bold uppercase text-red-500 text-pretty"
            style={{ textShadow: "2px 2px 4px " }}
          >
            Lo sentimos, hubo un error en la donación
          </h1>
          <img
            src="https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg"
            alt="thanks"

            className="m-4 rounded-xl w-52"
          />
          <p className="mt-4 text-lg text-balance">
            Aunque no pudimos procesar la donación, te invitamos a disfrutar de Timeschedule.
          </p>
          <Link
            to="/schedule"
            className="mt-8 block text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white p-3 rounded-full z-50">
            Volver al inicio
          </Link>
        </div>
  );
};

export default Wrong;
