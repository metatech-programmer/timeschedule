import React from "react";
import { FaPersonRunning, FaX, FaXmark } from "react-icons/fa6";

const DayClass = ({ materias = {}, dia = "lunes", id }) => {
  const materiasDia = materias[dia] || [];
  return (
    <div id={id}>
      <h2 className="text-2xl font-extrabold  uppercase text-primary-orange-app text-pretty animate-fade-in-fast bg-gradient-to-b from-black/60 to-transparent  rounded-tl-lg rounded-tr-lg p-2 mt-2  text-center" style={{ textShadow: "1px 1px 1px skyblue", letterSpacing: "6px" }}>
        {dia}
      </h2>

      {materiasDia.map((materia) => (
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
                    backgroundImage: "url(https://picsum.photos/100)",
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
                {materia.aula}
              </span>{" "}
              <span className="flex gap-2 justify-center items-center">
                ...
                <FaPersonRunning />
              </span>
            </span>

            <span className="flex items-center gap-2 font-bold capitalize text-center text-pretty text-xs w-full bg-black/10 p-1 rounded-xl">
              <span>{materia.docente}</span>

              <span className="text-secondary-blue-app  border-l-2 border-secondary-blue-app pl-2 ml-2 font-light w-1/2">
                {materia.horaInicio + " - " + materia.horaFin}
              </span>
            </span>
          </div>
        </li>
      ))}

      {/* -------------------------------------------------------------------------- */}

      {materiasDia.length === 0 && (
        <div
          className="flex flex-col items-center justify-center gap-2 animate-fade-in-fast"
          style={{ height: "6rem" }}
        >
          <FaXmark className="text-2xl animate-fade-in-fast" style={{ filter: "drop-shadow(1px 1px 3px skyblue)" }} />
          <p className="text-sm text-balance animate-fade-in-fast text-quaternary-gray-app/50 ">
            No hay materias en este día
          </p>
        </div>
      )}
    </div>
  );
};

export default DayClass;
