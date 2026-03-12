import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const principiante = localStorage.getItem("principiante") || null;
  const withSchedule = localStorage.getItem("withSchedule");
  const navigate = useNavigate();

  const handleClick = () => {
    const icon = document.getElementById("icon");
    const home = document.getElementById("home");

    icon.classList.add("animate-expanddisplay");
    home.classList.add("animate-fade-out");
    setTimeout(() => {
      localStorage.setItem("principiante", false);
      localStorage.setItem("withoutSchedule", true);
      navigate("/manager");
      home.classList.remove("animate-fade-out");
    }, 2500);
    setTimeout(() => {
      icon.classList.remove("animate-expanddisplay");
    }, 2800);
  };

  useEffect(() => {
    if (principiante) {
      if (withSchedule !== "true") {
        navigate("/manager");
      } else {
        navigate("/schedule");
      }
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-dvh w-dvw overflow-hidden relative"
      id="home"
      style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(246,136,57,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(48,179,187,0.15) 0%, transparent 60%), #0D1B2A" }}
    >
      {/* Animated background orbs */}
      <div className="absolute w-72 h-72 rounded-full opacity-10 animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, #F68839 0%, transparent 70%)", top: "10%", right: "5%" }}
      />
      <div className="absolute w-56 h-56 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #30B3BB 0%, transparent 70%)", bottom: "15%", left: "5%", animation: "float 8s ease-in-out infinite reverse" }}
      />

      {/* Sparkle particles */}
      {[
        { top: "18%", left: "15%", d: "0s", s: "w-1.5 h-1.5" },
        { top: "25%", left: "82%", d: "0.7s", s: "w-1 h-1" },
        { top: "65%", left: "8%",  d: "1.4s", s: "w-1 h-1" },
        { top: "72%", left: "88%", d: "0.3s", s: "w-1.5 h-1.5" },
        { top: "45%", left: "92%", d: "1.1s", s: "w-1 h-1" },
        { top: "80%", left: "55%", d: "0.9s", s: "w-1 h-1" },
      ].map((p, i) => (
        <div key={i} className={`absolute ${p.s} rounded-full bg-primary-orange-app/40 pointer-events-none animate-sparkle`}
          style={{ top: p.top, left: p.left, animationDelay: p.d }} />
      ))}

      <div className="text-center w-full z-10 px-8 animate-slide-up">
        {/* Logo */}
        <div className="relative mx-auto mb-6 w-24 h-24">
          <div className="absolute inset-0 rounded-full animate-glow-pulse" />
          <img
            src="/icon.webp"
            alt="icon"
            id="icon"
            className="relative w-24 h-24 rounded-full object-cover border-2 border-primary-orange-app/60 shadow-xl"
            style={{ filter: "drop-shadow(0 0 12px rgba(246,136,57,0.5))" }}
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-3 text-gradient leading-tight">
          Timeschedule
        </h1>
        <p className="text-base text-muted-app mb-2 font-medium leading-relaxed max-w-xs mx-auto">
          Tu asistente estudiantil personal.
          <br />
          <span className="text-quaternary-gray-app/70 text-sm">Organiza, visualiza y domina tu semana.</span>
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-5 mb-8">
          {["📅 Horario en vivo", "🔔 Notificaciones", "⚡ Sin registro"].map((feat, i) => (
            <span key={feat}
              className="glass text-xs text-muted-app px-3 py-1.5 rounded-full font-medium animate-bounce-soft"
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="btn-primary text-lg px-10 py-4 z-10 animate-slide-up font-bold tracking-wide flex items-center gap-2"
        style={{ animationDelay: "200ms" }}
        onClick={handleClick}
      >
        ¡Empezar ahora! <span className="animate-wiggle inline-block">→</span>
      </button>

      <p className="text-muted-app/50 text-xs mt-6 z-10">
        Gratis · Sin anuncios · Para estudiantes
      </p>
    </div>
  );
};

export default Home;
