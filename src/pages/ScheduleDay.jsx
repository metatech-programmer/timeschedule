import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { leerMateriaHorarioDia } from "../../public/db";
import { FaArrowRight, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const ScheduleDay = () => {
  const date = new Date();
  let day = date.toLocaleDateString("es-ES", { weekday: "long" });
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      const materias = await leerMateriaHorarioDia(day);
      setMaterias(materias);
    };
    fetchMaterias();
  }, []);

  return (
    <>
      <Menu />
      <div className="flex flex-col gap-4 text-quaternary-gray-app p-6">
        <h1 className="text-3xl font-bold">Horarios del {day}</h1>
        <ul className="flex flex-col gap-2 overflow-y-scroll">
          {materias.map((materia) =>
            materia.horarios.map(
              (horario) =>
                String(horario.dia).toLowerCase() === day && (
                  <li
                    key={materia.id}
                    className="flex  justify-between flex-col border-2 border-primary-orange-app rounded-lg p-4"
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

export default ScheduleDay;
