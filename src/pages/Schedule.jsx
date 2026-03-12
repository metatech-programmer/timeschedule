import React, { useState, useEffect } from "react";
import {
  leerMateriaDiaHora,
  leerMateriaHorarioDia,
  leerMaterias,
} from "../../db";
import Menu from "./Menu";
import InstallApp from "./InstallApp";
import DayClass from "../components/DayClass";
import { SvgBolt, SvgCalendar, SvgGrid, SvgClock, SvgMapPin } from "../components/Icons";

const Schedule = () => {
  const [day, setDay] = useState(
    new Date().toLocaleDateString("es-CO", { weekday: "long" })
  );

  const [hourMinutes, setHourMinutes] = useState(
    new Date().getHours() +
      ":" +
      (new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes())
  );

  const [hourMinutesNextClass, setHourMinutesNextClass] = useState(
    new Date().getHours() +
      1 +
      ":" +
      (new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes())
  );

  const [amPm, setAmPm] = useState(
    new Date().toLocaleString("es-ES", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  const [materias, setMaterias] = useState([]);
  const [materiasAll, setMateriasAll] = useState([]);
  const [materiasNext, setMateriasNext] = useState([]);
  const [materiasNow, setMateriasNow] = useState([]);

  const [scheduleFind, setScheduleFind] = useState(
    localStorage.getItem("scheduleFind") || "vivo"
  );

  const formatearDia = (dia) => {
    return dia
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const agruparPorDia = (materias) => {
    const dias = {};

    materias.forEach((materia) => {
      materia.horarios.forEach((horario) => {
        const diaFormateado = formatearDia(horario.dia);
        if (!dias[diaFormateado]) {
          dias[diaFormateado] = [];
        }
        dias[diaFormateado].push({
          nombre: materia.nombre,
          docente: materia.docente,
          color: materia.color,
          imagen: materia.imagen,
          aula: horario.aula,
          horaInicio: horario.horaInicio,
          horaFin: horario.horaFin,
          id: materia.id,
        });
      });
    });

    for (const dia in dias) {
      dias[dia].sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }

    return dias;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDay(new Date().toLocaleDateString("es-CO", { weekday: "long" }));
      setHourMinutes(
        new Date().getHours() +
          ":" +
          (new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes())
      );
      setHourMinutesNextClass(
        new Date().getHours() +
          1 +
          ":" +
          (new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes())
      );
      setAmPm(
        new Date().toLocaleString("es-CO", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const findBy = localStorage.getItem("scheduleFind") || "vivo";
    handleClick(findBy);
  }, amPm);

  const handleClick = async (findBy) => {
    switch (findBy) {
      case "dia":
        {
          const materiasDay = await leerMateriaHorarioDia(day);
          setMaterias(materiasDay);
        }
        break;
      case "vivo":
        {
          const materiasVivo = await leerMateriaDiaHora(day, hourMinutes);
          const materiasVivoPlus = await leerMateriaDiaHora(
            day,
            hourMinutesNextClass
          );
          if (
            materiasVivo.length === materiasVivoPlus.length &&
            materiasVivo.every((materia, index) => {
              return (
                materia.id === materiasVivoPlus[index].id &&
                materia.nombre === materiasVivoPlus[index].nombre &&
                materia.docente === materiasVivoPlus[index].docente &&
                materia.color === materiasVivoPlus[index].color &&
                materia.imagen === materiasVivoPlus[index].imagen &&
                materia.aula === materiasVivoPlus[index].aula &&
                materia.horaInicio === materiasVivoPlus[index].horaInicio &&
                materia.horaFin === materiasVivoPlus[index].horaFin
              );
            })
          ) {
            setMateriasNext([]);
          } else {
            setMateriasNext(materiasVivoPlus);
          }
          setMateriasNow(materiasVivo);
        }
        break;
      case "full":
        {
          const materiasWeek = await leerMaterias();
          const materiasAllWeek = agruparPorDia(materiasWeek);
          setMateriasAll(materiasAllWeek);
        }
        break;
    }

    localStorage.setItem("scheduleFind", findBy);
    setScheduleFind(findBy);
  };

  // â”€â”€ Helper: render a single class card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ClassCard = ({ materia, horario, badge, dim = false }) => (
    <div
      className={
        "glass-card rounded-2xl p-4 flex gap-3 items-center animate-fade-in-fast transition-all overflow-hidden relative " +
        (dim ? "opacity-50" : "")
      }
      style={{ borderLeftColor: materia.color, borderLeftWidth: "3px" }}
    >
      {badge && (
        <span className="absolute top-2 right-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1"
          style={badge === "EN VIVO"
            ? { background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" }
            : { background: "rgba(248,131,57,0.2)", color: "#f68839", border: "1px solid rgba(248,131,57,0.4)" }
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-live-dot inline-block" />
          {badge}
        </span>
      )}
      {/* avatar */}
      <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ backgroundColor: materia.color + "25", border: `1px solid ${materia.color}50` }}
      >
        {materia.imagen
          ? <img src={materia.imagen} alt={materia.nombre} className="w-10 h-10 rounded-xl object-cover" />
          : <span style={{ color: materia.color }} className="text-lg font-bold">{materia.nombre.charAt(0).toUpperCase()}</span>
        }
      </div>
      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-quaternary-gray-app text-sm truncate">{materia.nombre}</p>
        <p className="text-xs text-muted-app truncate mt-0.5">{materia.docente}</p>
        <div className="flex flex-wrap gap-x-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-app"><SvgClock size={10} className="text-primary-orange-app/70" />{horario.horaInicio} – {horario.horaFin}</span>
          {horario.aula && <span className="flex items-center gap-1 text-xs text-muted-app"><SvgMapPin size={10} className="text-secondary-blue-app/70" />{horario.aula}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-app relative md:hidden">
      {/* Background orb */}
      <div className="fixed top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #30B3BB 0%, transparent 70%)" }}
      />
      <div className="fixed bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #F68839 0%, transparent 70%)", animation: "float 9s ease-in-out infinite reverse" }}
      />
      {[
        { top: "8%", left: "22%", d: "0s", c: "bg-secondary-blue-app" },
        { top: "22%", left: "80%", d: "1.2s", c: "bg-primary-orange-app" },
        { top: "50%", left: "5%", d: "0.6s", c: "bg-tertiary-green-app" },
        { top: "68%", left: "90%", d: "1.8s", c: "bg-secondary-blue-app" },
        { top: "85%", left: "40%", d: "0.9s", c: "bg-primary-orange-app" },
      ].map((p, i) => (
        <div key={i} className={`fixed w-1 h-1 rounded-full pointer-events-none animate-drift opacity-30 ${p.c}`}
          style={{ top: p.top, left: p.left, animationDelay: p.d }} />
      ))}

      <InstallApp />
      <Menu />

      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-app capitalize">{day}</p>
            <h1 className="text-2xl font-bold text-gradient leading-tight">{amPm}</h1>
          </div>
          <img src="/icon.webp" alt="logo" className="w-9 h-9 rounded-xl border border-primary-orange-app/40" />
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 bg-surface-1 rounded-2xl p-1">
          {[
            { key: "vivo", icon: <SvgBolt size={11} />, label: "En Vivo" },
            { key: "dia",  icon: <SvgCalendar size={11} />, label: "Hoy" },
            { key: "full", icon: <SvgGrid size={11} />, label: "Semana" },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={
                "flex-1 text-xs font-semibold py-2 rounded-xl transition-all duration-200 " +
                (scheduleFind === key
                  ? "bg-primary-orange-app text-white shadow-md"
                  : "text-muted-app hover:text-quaternary-gray-app")
              }
            >
              <span className="flex items-center gap-1 justify-center">{icon}{label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4 z-10" id="top">

        {/* â”€â”€ FULL WEEK view â”€â”€â”€ */}
        {scheduleFind === "full" && (
          <div className="flex flex-col gap-1 animate-fade-in-fast">
            <DayClass materias={materiasAll} dia={"lunes"} id="lunes" />
            <DayClass materias={materiasAll} dia={"martes"} />
            <DayClass materias={materiasAll} dia={"miercoles"} />
            <DayClass materias={materiasAll} dia={"jueves"} />
            <DayClass materias={materiasAll} dia={"viernes"} />
            <DayClass materias={materiasAll} dia={"sabado"} />
            <DayClass materias={materiasAll} dia={"domingo"} />
          </div>
        )}

        {/* â”€â”€ DAY view â”€â”€â”€ */}
        {scheduleFind === "dia" && (
          <div className="flex flex-col gap-3 animate-fade-in-fast">
            <p className="text-xs text-muted-app uppercase tracking-widest text-center mb-1">Clases de hoy</p>
            {materias.length === 0 && (
              <div className="glass-card rounded-2xl p-8 text-center mt-6">
                <p className="text-4xl mb-3 animate-bounce-soft inline-block">🎉</p>
                <p className="font-semibold text-quaternary-gray-app">¡Sin clases hoy!</p>
                <p className="text-xs text-muted-app mt-1">Disfruta tu tiempo libre 🌟</p>
              </div>
            )}
            {materias.map((materia) =>
              materia.horarios.map(
                (horario) =>
                  String(horario.dia).toLowerCase() === day && (
                    <ClassCard key={materia.id + horario.horaInicio} materia={materia} horario={horario} />
                  )
              )
            )}
          </div>
        )}

        {/* â”€â”€ LIVE view â”€â”€â”€ */}
        {scheduleFind === "vivo" && (
          <div className="flex flex-col gap-3 animate-fade-in-fast">

            {/* Now */}
            {materiasNow.length > 0 && (
              <>
                <p className="text-xs text-muted-app uppercase tracking-widest text-center">Ahora mismo</p>
                {materiasNow.map((materia) =>
                  materia.horarios.map(
                    (horario) =>
                      String(horario.dia).toLowerCase() === day &&
                      Number(hourMinutes.replace(":", "")) >= Number(horario.horaInicio.replace(":", "")) &&
                      Number(hourMinutes.replace(":", "")) <= Number(horario.horaFin.replace(":", "")) && (
                        <ClassCard key={materia.id + "now"} materia={materia} horario={horario} badge="EN VIVO" />
                      )
                  )
                )}
              </>
            )}

            {/* Divider between now & next */}
            {materiasNow.length > 0 && materiasNext.length > 0 && (
              <div className="flex items-center gap-3 my-1">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-muted-app">Próximamente</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            )}

            {/* Next */}
            {materiasNext.map((materia) =>
              materia.horarios.map(
                (horario) =>
                  String(horario.dia).toLowerCase() === day &&
                  Number(horario.horaInicio.replace(":", "")) >= Number(hourMinutes.replace(":", "")) && (
                    <ClassCard key={materia.id + "next"} materia={materia} horario={horario} badge="PRÓXIMA" dim />
                  )
              )
            )}

            {/* Free time */}
            {materiasNow.length === 0 && materiasNext.length === 0 && (
              <div className="glass-card rounded-2xl p-6 text-center mt-4">
                <p className="text-5xl mb-3 animate-wave-hand inline-block">😎</p>
                <p className="font-bold text-quaternary-gray-app text-base">¡Tiempo libre!</p>
                <p className="text-xs text-muted-app mt-1 mb-5">No tienes clases ahora mismo</p>
                <p className="text-xs text-muted-app uppercase tracking-widest mb-3">Puedes visitar</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { href: "https://www.youtube.com/", label: "YouTube", emoji: "▶️" },
                    { href: "https://www.twitch.tv/", label: "Twitch", emoji: "🎮" },
                    { href: "https://www.instagram.com/", label: "Instagram", emoji: "📸" },
                    { href: "https://www.twitter.com/", label: "Twitter", emoji: "🐦" },
                    { href: "https://www.tiktok.com/", label: "TikTok", emoji: "🎵" },
                  ].map(({ href, label, emoji }, i) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-muted-app hover:text-quaternary-gray-app transition-all active:scale-95 animate-bounce-soft"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    >
                      <span>{emoji}</span> {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Schedule;
