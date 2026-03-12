import React from "react";
import { Link } from "react-router-dom";
import phrases from "../utils/phrases";
import InstallApp from "./InstallApp";
import { SvgArrowRight } from "../components/Icons";

const Thanks = () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <>
      <InstallApp />
      <div className="bg-background-app h-dvh flex flex-col items-center justify-center text-center px-6 relative md:hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary-orange-app/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-secondary-blue-app/10 blur-3xl" />
        </div>

        <div className="glass-card rounded-3xl p-8 space-y-5 animate-slide-up max-w-sm w-full relative z-10">
          <div className="text-5xl animate-wave-hand inline-block">🎉</div>
          <h1 className="text-xl font-bold text-gradient">{phrase}</h1>
          <p className="text-quaternary-gray-app/70 text-sm text-balance leading-relaxed">
            Gracias por tu donación. Cada contribución ayuda a que Timeschedule
            siga mejorando para todos los estudiantes.
          </p>
          <Link
            to="/schedule"
            className="btn-primary flex items-center justify-center gap-2"
          >
            Volver al horario <SvgArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Thanks;
