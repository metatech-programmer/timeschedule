import React, { useState, useEffect } from "react";
import {
  leerMateriaDiaHora,
  leerMateriaHorarioDia,
  leerMaterias,
} from "../../public/db";
import Menu from "./Menu";
import { FaPersonRunning } from "react-icons/fa6";
import InstallApp from "./InstallApp";
import { FaPlay } from "react-icons/fa";
import { stringify } from "postcss";
import DayClass from "../components/DayClass";

const Schedule = () => {
  const [day, setDay] = useState(
    new Date().toLocaleDateString("es-ES", { weekday: "long" })
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
          setMateriasNext(materiasVivoPlus);
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

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-b from-background-app to-secondary-blue-app relative
    "
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
      <InstallApp />
      <Menu />
      <div className="flex gap-2 p-5 w-full justify-end  md:hidden z-50" id="top">
        <button
          className={
            " text-white p-3 rounded-full h-5 text-xs text-center flex items-center font-bold active:scale-95 transition-all active:bg-secondary-blue-app" +
            " " +
            (scheduleFind === "full"
              ? "bg-secondary-blue-app ring-2 ring-offset-2 ring-tertiary-green-app  ring-offset-transparent"
              : "bg-primary-orange-app")
          }
          onClick={() => handleClick("full")}
        >
          <span>H. Full</span>
        </button>
        <button
          className={
            " text-white p-3 rounded-full h-5 text-xs text-center flex items-center font-bold active:scale-95 transition-all active:bg-secondary-blue-app" +
            " " +
            (scheduleFind === "dia"
              ? "bg-secondary-blue-app ring-2 ring-offset-2 ring-tertiary-green-app  ring-offset-transparent"
              : "bg-primary-orange-app")
          }
          onClick={() => handleClick("dia")}
        >
          <span>H. x Día</span>
        </button>
        <button
          className={
            "bg-primary-orange-app text-white p-3 rounded-full h-5 text-xs text-center flex items-center font-bold active:scale-95 transition-all active:bg-secondary-blue-app" +
            " " +
            (scheduleFind === "vivo"
              ? "bg-secondary-blue-app ring-2 ring-offset-2 ring-tertiary-green-app  ring-offset-transparent"
              : "bg-primary-orange-app")
          }
          onClick={() => handleClick("vivo")}
        >
          <span>H. en VIVO</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 text-quaternary-gray-app animate-fade-in-fast overflow-y-scroll  md:hidden z-50 ">
        <h1 className="text-lg  bg-secondary-blue-app font-bold uppercase text-center w-full py-2  border-y-2 border-primary-orange-app/50">
          Horario del {day} <hr className="opacity-50" />{" "}
          <span className="text-sm text-background-app">{amPm}</span>{" "}
        </h1>
        <ul className="flex flex-col gap-6 overflow-y-scroll px-6 pb-24" >
          {/* -------------------------------------------------------- */}

          {scheduleFind === "full" && (
            <>
              <DayClass materias={materiasAll} dia={"lunes"} id="top" />
              <DayClass materias={materiasAll} dia={"martes"} />
              <DayClass materias={materiasAll} dia={"miercoles"} />
              <DayClass materias={materiasAll} dia={"jueves"} />
              <DayClass materias={materiasAll} dia={"viernes"} />
              <DayClass materias={materiasAll} dia={"sabado"} />
              <DayClass materias={materiasAll} dia={"domingo"} />
            </>
          )}

          {/* -------------------------------------------------------- */}
          {scheduleFind === "dia" && (
            <>
              {materias.map((materia) =>
                materia.horarios.map(
                  (horario) =>
                    String(horario.dia).toLowerCase() === day && (
                      <li
                        key={materia.id}
                        className="flex  justify-between flex-col border-2 border-primary-orange-app rounded-lg p-4 animate-fade-in-fast"
                        style={{ borderColor: materia.color }}
                        
                      >
                        <div
                          className="rounded-tl-full rounded-br-full p-2 mb-5 w-full flex items-center justify-center"
                          style={{
                            backgroundColor: materia.color,
                          }}
                        >
                          <div className="flex items-center gap-2 justify-center max-w-[80%]  text-xs text-pretty h-8 max-h-8 overflow-y-scroll text-center">
                            {materia.imagen ? (
                              <img
                                src={materia.imagen}
                                alt={materia.nombre}
                                className="w-5 h-5 rounded-full border animate-fade-in-fast"
                              />
                            ) : (
                              <div
                                className="w-5 h-5 border rounded-full animate-fade-in"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundImage:
                                    "url(https://picsum.photos/100)",
                                  backgroundSize: "cover",
                                }}
                              ></div>
                            )}
                            <span
                              className="font-bold uppercase w-[70%] truncate"
                              style={{ textShadow: "1px 1px 4px skyblue" }}
                            >
                              {materia.nombre}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 px-2 w-[100%]">
                          <span className="flex items-center  gap-2 justify-center">
                            <span className="text-primary-orange-app text-balance ">
                              {horario.aula}
                            </span>{" "}
                            <span className="flex gap-2 justify-center items-center">
                              ...
                              <FaPersonRunning />
                            </span>
                          </span>

                          <span className="flex items-center gap-2 font-bold capitalize text-center text-pretty text-xs w-full bg-black/10 p-1 rounded-xl">
                            <span>{materia.docente}</span>

                            <span className="text-secondary-blue-app  border-l-2 border-secondary-blue-app pl-2 ml-2 font-light w-1/2">
                              {horario.horaInicio + " - " + horario.horaFin}
                            </span>
                          </span>
                        </div>
                      </li>
                    )
                )
              )}
            </>
          )}

          {/* -------------------------------------------------------- */}

          {scheduleFind === "vivo" && (
            <>
              {materiasNow.map((materia) =>
                materia.horarios.map(
                  (horario) =>
                    String(horario.dia).toLowerCase() === day &&
                    Number(hourMinutes.replace(":", "")) >=
                      Number(horario.horaInicio.replace(":", "")) &&
                    Number(hourMinutes.replace(":", "")) <=
                      Number(horario.horaFin.replace(":", "")) && (
                      <li
                        key={materia.id}
                        className="flex  justify-between flex-col border-2 border-primary-orange-app rounded-lg p-4 animate-fade-in-fast relative"
                        style={{ borderColor: materia.color }}
                      >
                        <span className="text-quaternary-gray-app bg-red-700 p-1 rounded-full text-xs  top-1 -left-1 text-balance font-bold absolute uppercase scale-75 animate-pulse overflow-hidden flex gap-2 justify-center items-center px-2 border">
                          <FaPlay size={10} />
                          en vivo
                        </span>

                        <div
                          className="rounded-tl-full rounded-br-full p-2 mb-5"
                          style={{
                            backgroundColor: materia.color,
                          }}
                        >
                          <div className="flex items-center gap-2 justify-center max-w-[80%]  text-xs text-pretty h-8 max-h-8 overflow-y-scroll text-center">
                            {materia.imagen ? (
                              <img
                                src={materia.imagen}
                                alt={materia.nombre}
                                className="w-5 h-5 rounded-full border animate-fade-in-fast"
                              />
                            ) : (
                              <div
                                className="w-5 h-5 border rounded-full animate-fade-in"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundImage:
                                    "url(https://picsum.photos/100)",
                                  backgroundSize: "cover",
                                }}
                              ></div>
                            )}
                            <span
                              className="font-bold uppercase w-[70%] truncate"
                              style={{ textShadow: "1px 1px 4px skyblue" }}
                            >
                              {materia.nombre}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 px-2 w-[100%]">
                          <span className="flex items-center  gap-2 justify-center">
                            <span className="text-primary-orange-app text-balance ">
                              {horario.aula}
                            </span>{" "}
                            <span className="flex gap-2 justify-center items-center">
                              ...
                              <FaPersonRunning />
                            </span>
                          </span>

                          <span className="flex items-center gap-2 font-bold capitalize text-center text-pretty text-xs w-full bg-black/10 p-1 rounded-xl">
                            <span>{materia.docente}</span>

                            <span className="text-secondary-blue-app  border-l-2 border-secondary-blue-app pl-2 ml-2 font-light w-1/2">
                              {horario.horaInicio + " - " + horario.horaFin}
                            </span>
                          </span>
                        </div>
                      </li>
                    )
                )
              )}
            </>
          )}

          {/* -------------------------------------------------------- */}
          {scheduleFind === "vivo" && materiasNow.length > 0 && (
            <li>
              <div className="flex items-center justify-center  flex-col">
                <span className="text-primary-orange-app text-balance font-bold uppercase">
                  {materiasNext.length > 0
                    ? "Próximas materias 👇"
                    : "¡Pronto quedaras libre! 😎 \n"}
                </span>
                <span className="text-quaternary-gray-app text-balance font-bold text-xs opacity-30">
                  {materiasNext.length > 0
                    ? " "
                    : "(revisa por si acaso tus horarios de estudio)"}
                </span>
              </div>
            </li>
          )}
          {/* -------------------------------------------------------- */}

          {scheduleFind === "vivo" && (
            <>
              {materiasNext.map((materia) =>
                materia.horarios.map(
                  (horario) =>
                    String(horario.dia).toLowerCase() === day &&
                    Number(horario.horaInicio.replace(":", "")) >=
                      Number(hourMinutes.replace(":", "")) && (
                      <li
                        key={materia.id}
                        className="flex  justify-between flex-col border-2 border-primary-orange-app rounded-lg p-4 animate-fade-in-fast"
                        style={{ borderColor: materia.color }}
                      >
                        <div
                          className="rounded-tl-full rounded-br-full p-2 mb-5"
                          style={{
                            backgroundColor: materia.color,
                          }}
                        >
                          <div className="flex items-center gap-2 justify-center max-w-[80%]  text-xs text-pretty h-8 max-h-8 overflow-y-scroll text-center">
                            {materia.imagen ? (
                              <img
                                src={materia.imagen}
                                alt={materia.nombre}
                                className="w-5 h-5 rounded-full border animate-fade-in-fast"
                              />
                            ) : (
                              <div
                                className="w-5 h-5 border rounded-full animate-fade-in"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundImage:
                                    "url(https://picsum.photos/100)",
                                  backgroundSize: "cover",
                                }}
                              ></div>
                            )}
                            <span
                              className="font-bold uppercase w-[70%] truncate"
                              style={{ textShadow: "1px 1px 4px skyblue" }}
                            >
                              {materia.nombre}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 px-2 w-[100%]">
                          <span className="flex items-center  gap-2 justify-center">
                            <span className="text-primary-orange-app text-balance ">
                              {horario.aula}
                            </span>{" "}
                            <span className="flex gap-2 justify-center items-center">
                              ...
                              <FaPersonRunning />
                            </span>
                          </span>

                          <span className="flex items-center gap-2 font-bold capitalize text-center text-pretty text-xs w-full bg-black/10 p-1 rounded-xl">
                            <span>{materia.docente}</span>

                            <span className="text-secondary-blue-app  border-l-2 border-secondary-blue-app pl-2 ml-2 font-light w-1/2">
                              {horario.horaInicio + " - " + horario.horaFin}
                            </span>
                          </span>
                        </div>
                      </li>
                    )
                )
              )}
            </>
          )}

          {/* -------------------------------------------------------- */}

          {materiasNext.length === 0 &&
            materiasNow.length === 0 &&
            scheduleFind === "vivo" && (
              <div className="flex flex-col items-center gap-2 mt-5 border-2 border-secondary-blue-app bg-black/50 rounded-lg p-4">
                <span className="text-secondary-blue-app  text-pretty font-bold uppercase text-center text-sm flex flex-col">
                  ¡Puedes entrar donde quieras! 👇 aprovecha tu tiempo libre
                  <span className="text-quaternary-gray-app text-balance font-bold text-[0.6rem] opacity-30">
                    (no olvides revisar por tus horarios de estudio)
                  </span>
                </span>
                <div className="flex items-center gap-6 flex-wrap justify-evenly my-5">
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.youtube.com/"
                  >
                    <svg
                      viewBox="0 0 256 180"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                    >
                      <path
                        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
                        fill="red"
                      />
                      <path
                        fill="#FFF"
                        d="m102.421 128.06 66.328-38.418-66.328-38.418z"
                      />
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.twitch.tv/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      xml:space="preserve"
                      viewBox="0 0 2400 2800"
                    >
                      <path
                        fill="#fff"
                        d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z"
                      />
                      <g fill="#9146ff">
                        <path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" />
                        <path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" />
                      </g>
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.instagram.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#fff"
                        d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
                      />
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.facebook.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      fill="url(#a)"
                      height="30"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          x2="50%"
                          y1="97.078%"
                          y2="0%"
                          id="a"
                        >
                          <stop offset="0%" stop-color="#0062E0" />
                          <stop offset="100%" stop-color="#19AFFF" />
                        </linearGradient>
                      </defs>
                      <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
                      <path
                        fill="#FFF"
                        d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
                      />
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.twitter.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="none"
                      viewBox="0 0 1200 1227"
                    >
                      <path
                        fill="#fff"
                        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                      />
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.snapchat.com/"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                    >
                      <title>Snapchat</title>
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
                    </svg>
                  </a>
                  <a
                    className="scale-110 m-2 border-2 border-primary-orange-app p-2 rounded-full h-20 w-20 flex items-center justify-center active:opacity-50"
                    href="https://www.tiktok.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 290"
                      width="40"
                    >
                      <path
                        fill="#FF004F"
                        d="M189.72022 104.42148c18.67797 13.3448 41.55932 21.19661 66.27233 21.19661V78.08728c-4.67694.001-9.34196-.48645-13.91764-1.4554v37.41351c-24.71102 0-47.5894-7.85181-66.27232-21.19563v96.99656c0 48.5226-39.35537 87.85513-87.8998 87.85513-18.11308 0-34.94847-5.47314-48.93361-14.85978 15.96175 16.3122 38.22162 26.4315 62.84826 26.4315 48.54742 0 87.90477-39.33253 87.90477-87.85712v-96.99457h-.00199Zm17.16896-47.95275c-9.54548-10.4231-15.81283-23.89299-17.16896-38.78453v-6.11347h-13.18894c3.31982 18.92715 14.64335 35.09738 30.3579 44.898ZM69.67355 225.60685c-5.33316-6.9891-8.21517-15.53882-8.20226-24.3298 0-22.19236 18.0009-40.18631 40.20915-40.18631 4.13885-.001 8.2529.6324 12.19716 1.88328v-48.59308c-4.60943-.6314-9.26154-.89945-13.91167-.80117v37.82253c-3.94726-1.25089-8.06328-1.88626-12.20313-1.88229-22.20825 0-40.20815 17.99196-40.20815 40.1873 0 15.6937 8.99747 29.28075 22.1189 35.89954Z"
                      />
                      <path d="M175.80259 92.84876c18.68293 13.34382 41.5613 21.19563 66.27232 21.19563V76.63088c-13.79353-2.93661-26.0046-10.14114-35.18573-20.16215-15.71554-9.80162-27.03808-25.97185-30.3579-44.898H141.8876v189.84333c-.07843 22.1318-18.04855 40.05229-40.20915 40.05229-13.05889 0-24.66039-6.22169-32.00788-15.8595-13.12044-6.61879-22.1179-20.20683-22.1179-35.89854 0-22.19336 17.9999-40.1873 40.20815-40.1873 4.255 0 8.35614.66217 12.20312 1.88229v-37.82254c-47.69165.98483-86.0473 39.93316-86.0473 87.83429 0 23.91184 9.55144 45.58896 25.05353 61.4276 13.98514 9.38565 30.82053 14.85978 48.9336 14.85978 48.54544 0 87.89981-39.33452 87.89981-87.85612V92.84876h-.00099Z" />
                      <path
                        fill="#00F2EA"
                        d="M242.07491 76.63088V66.51456c-12.4384.01886-24.6326-3.46278-35.18573-10.04683 9.34196 10.22255 21.64336 17.27121 35.18573 20.16315Zm-65.54363-65.06015a67.7881 67.7881 0 0 1-.72869-5.45726V0h-47.83362v189.84531c-.07644 22.12883-18.04557 40.04931-40.20815 40.04931-6.50661 0-12.64987-1.54375-18.09025-4.28677 7.34749 9.63681 18.949 15.8575 32.00788 15.8575 22.15862 0 40.13171-17.9185 40.20915-40.0503V11.57073h34.64368ZM99.96593 113.58077V102.8112c-3.9969-.54602-8.02655-.82003-12.06116-.81805C39.35537 101.99315 0 141.32669 0 189.84531c0 30.41846 15.46735 57.22621 38.97116 72.99536-15.5021-15.83765-25.05353-37.51576-25.05353-61.42661 0-47.90014 38.35466-86.84847 86.0483-87.8333Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
