import React, { useState, useEffect } from "react";
import { leerMateriaDiaHora, leerMateriaHorarioDia } from "../../public/db";
import Menu from "./Menu";
import { FaPersonRunning } from "react-icons/fa6";
import InstallApp from "./InstallApp";

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
  const [materiasNext, setMateriasNext] = useState([]);
  const [materiasNow, setMateriasNow] = useState([]);

  const [scheduleFind, setScheduleFind] = useState(
    localStorage.getItem("scheduleFind") || "vivo"
  );

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
    const fetchMaterias = async () => {
      const materiasDay = await leerMateriaHorarioDia(day);
      const materiasVivo = await leerMateriaDiaHora(day, hourMinutes);
      const materiasVivoPlus = await leerMateriaDiaHora(
        day,
        hourMinutesNextClass
      );

      setMaterias(materiasDay);
      setMateriasNext(materiasVivoPlus);
      setMateriasNow(materiasVivo);
    };
    fetchMaterias();
  }, amPm);

  const handleClick = async (findBy) => {
    const materiasDay = await leerMateriaHorarioDia(day);
    const materiasVivo = await leerMateriaDiaHora(day, hourMinutes);
    const materiasVivoPlus = await leerMateriaDiaHora(
      day,
      hourMinutesNextClass
    );
    setMaterias(materiasDay);
    setMateriasNow(materiasVivo);
    setMateriasNext(materiasVivoPlus);
    localStorage.setItem("scheduleFind", findBy);
    setScheduleFind(findBy);
  };

  return (
    <>
      <InstallApp />
      <Menu />
      <div className="flex gap-2 p-5 w-full justify-end  md:hidden">
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

      <div className="flex flex-col gap-4 text-quaternary-gray-app animate-fade-in-fast overflow-y-scroll  md:hidden">
        <h1 className="text-lg  bg-secondary-blue-app font-bold uppercase text-center w-full py-2  border-y-2 border-primary-orange-app/50">
          Horario del {day} <hr className="opacity-50" />{" "}
          <span className="text-sm text-background-app">{amPm}</span>{" "}
        </h1>
        <ul className="flex flex-col gap-6 overflow-y-scroll px-6 pb-24">
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

          {scheduleFind === "vivo" && (
            <>
              {materiasNext.map((materia) =>
                materia.horarios.map(
                  (horario) =>
                    String(horario.dia).toLowerCase() === day &&
                    Number(hourMinutesNextClass.replace(":", "")) >=
                      Number(horario.horaInicio.replace(":", "")) &&
                    Number(hourMinutesNextClass.replace(":", "")) <=
                      Number(horario.horaFin.replace(":", "")) && (
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
        </ul>
      </div>
    </>
  );
};

export default Schedule;
