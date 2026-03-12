import React from "react";
import { Link } from "react-router-dom";
import InstallApp from "./InstallApp";
import { SvgArrowRight } from "../components/Icons";

const Wrong = () => {
  return (
    <>
      <InstallApp />
      <div className="bg-background-app h-dvh flex flex-col items-center justify-center text-center px-6 relative md:hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="glass-card rounded-3xl p-8 space-y-5 animate-slide-up max-w-sm w-full relative z-10 border border-red-500/20">
          <div className="text-5xl animate-bounce-soft inline-block">😔</div>
          <h1 className="text-xl font-bold text-red-400">Error en la donación</h1>
          <p className="text-quaternary-gray-app/70 text-sm text-balance leading-relaxed">
            No pudimos procesar la donación esta vez. No te preocupes,
            puedes intentarlo de nuevo más tarde.
          </p>
          <p className="text-muted-app text-xs">
            Mientras tanto, sigue usando Timeschedule sin interrupciones. 😊
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

export default Wrong;
