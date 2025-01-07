import React, { useState, useEffect } from "react";
import { leerMateriaDiaHora, leerMateriaHorarioDia } from "../../public/db";
import { FaArrowRight } from "react-icons/fa";
import Menu from "./Menu";
import { FaPersonRunning } from "react-icons/fa6";

const Schedule = () => {
  const date = new Date();
  let day = date.toLocaleDateString("es-ES", { weekday: "long" });
  4;
  let hourMinutes = date.getHours() + ":" + date.getMinutes();
  let amPm = date.toLocaleString("es-ES", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [materias, setMaterias] = useState([]);
  const [scheduleFind, setScheduleFind] = useState(
    localStorage.getItem("scheduleFind") || "dia"
  );

  useEffect(() => {
    const fetchMaterias = async () => {
      const materiasDay = await leerMateriaHorarioDia(day);
      const materiasVivo = await leerMateriaDiaHora(day, hourMinutes);
      setMaterias(scheduleFind === "vivo" ? materiasVivo : materiasDay);
    };
    fetchMaterias();
  }, []);

  const handleClick = async (findBy) => {
    const materiasDay = await leerMateriaHorarioDia(day);
    const materiasVivo = await leerMateriaDiaHora(day, hourMinutes);
    setMaterias(findBy === "vivo" ? materiasVivo : materiasDay);
    localStorage.setItem("scheduleFind", findBy);
    setScheduleFind(findBy);
  };

  return (
    <>
      <Menu />
      <div className="flex gap-2 p-5 w-full justify-end">
        <button
          className="bg-primary-orange-app text-white p-3 rounded-full h-5 text-xs text-center flex items-center font-bold active:scale-95 transition-all active:bg-secondary-blue-app "
          onClick={() => handleClick("dia")}
        >
          <span>H. x Día</span>
        </button>
        <button
          className="bg-primary-orange-app text-white p-3 rounded-full h-5 text-xs text-center flex items-center font-bold active:scale-95 transition-all active:bg-secondary-blue-app "
          onClick={() => handleClick("vivo")}
        >
          <span>H. en VIVO</span>
        </button>
      </div>
      <div className="flex flex-col gap-4 text-quaternary-gray-app animate-fade-in-fast">
        <h1 className="text-lg  bg-secondary-blue-app font-bold uppercase text-center w-full py-2  border-y-2 border-primary-orange-app/50">
          Horarios del {day} <hr className="opacity-50" />{" "}
          <span className="text-sm text-background-app">{amPm}</span>{" "}
        </h1>
        <ul className="flex flex-col gap-6 overflow-y-scroll px-6">
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
                      className="rounded-tl-full rounded-br-full p-2 mb-5"
                      style={{
                        backgroundColor: materia.color,
                      }}
                    >
                      <div className="flex  items-center gap-2 justify-center">
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
                              backgroundImage: "url(https://picsum.photos/100)",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        )}
                        <span
                          className="font-bold uppercase"
                          style={{ textShadow: "1px 1px 4px skyblue" }}
                        >
                          {materia.nombre}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-2">
                      <span className="flex items-center gap-2">
                        <span className="text-primary-orange-app">
                          {horario.aula}
                        </span>{" "}
                        ...
                        <FaPersonRunning />
                      </span>

                      <span className="flex items-center gap-2 font-bold capitalize">
                        {materia.docente}

                        <span className="text-secondary-blue-app  border-l-2 border-secondary-blue-app pl-2 ml-2 font-light">
                          {horario.horaInicio + " - " + horario.horaFin}
                        </span>
                      </span>
                    </div>
                  </li>
                )
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default Schedule;
