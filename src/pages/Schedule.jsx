import React, { useState, useEffect } from "react";
import { leerMateriaDiaHora, leerMateriaHorarioDia } from "../../public/db";
import { FaArrowRight } from "react-icons/fa";
import Menu from "./Menu";

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
        <ul className="flex flex-col gap-2 overflow-y-scroll px-6">
          {materias.map((materia) =>
            materia.horarios.map(
              (horario) =>
                String(horario.dia).toLowerCase() === day && (
                  <li
                    key={materia.id}
                    className="flex  justify-between flex-col border-2 border-primary-orange-app rounded-lg p-4 animate-fade-in-fast"
                  >
                    <div className="bg-black/10 p-2">
                      <div className="flex items-center gap-2 justify-center">
                        {materia.imagen ? (
                          <img
                            src={materia.imagen}
                            alt={materia.nombre}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary-orange-app rounded-full"></div>
                        )}
                        <span>{materia.docente}</span>
                      </div>
                    </div>
                    <div>
                      <span className="flex items-center gap-2">
                        <FaArrowRight />
                        <span className="text-primary-orange-app">
                          {horario.aula}
                        </span>
                      </span>

                      <span className="flex items-center gap-2">
                        {materia.nombre}
                      </span>
                    </div>
                    <div>
                      <span className="text-primary-orange-app">
                        {horario.horaInicio + " - " + horario.horaFin}
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
