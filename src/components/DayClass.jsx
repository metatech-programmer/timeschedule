import React from "react";
import { SvgClock, SvgMapPin, SvgXmark } from "./Icons";

const DayClass = ({ materias = {}, dia = "lunes", id }) => {
  const materiasDia = materias[dia] || [];
  const DAY_LABELS = { lunes: "Lunes", martes: "Martes", miercoles: "Miercoles", jueves: "Jueves", viernes: "Viernes", sabado: "Sabado", domingo: "Domingo" };
  return (
    <div id={id} className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-3 mt-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary-blue-app/40" />
        <span className="text-xs font-bold uppercase tracking-[4px] px-3 py-1 rounded-full glass text-secondary-blue-app">{DAY_LABELS[dia] || dia}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary-blue-app/40" />
      </div>
      {materiasDia.map((materia) => (<div key={materia.id} className="glass-card rounded-2xl p-4 animate-fade-in-fast flex gap-3 items-center overflow-hidden" style={{ borderLeftColor: materia.color, borderLeftWidth: "3px" }}><div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: materia.color + "30", border: "1px solid " + materia.color + "60" }}>{materia.imagen ? (<img src={materia.imagen} alt={materia.nombre} className="w-9 h-9 rounded-xl object-cover" />) : (<span style={{ color: materia.color }} className="text-base font-bold">{materia.nombre.charAt(0).toUpperCase()}</span>)}</div><div className="flex-1 min-w-0"><p className="font-semibold text-quaternary-gray-app text-sm truncate leading-tight">{materia.nombre}</p><div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1"><span className="flex items-center gap-1 text-xs text-muted-app"><SvgClock size={9} className="text-primary-orange-app" />{materia.horaInicio} - {materia.horaFin}</span>{materia.aula && (<span className="flex items-center gap-1 text-xs text-muted-app"><SvgMapPin size={9} className="text-secondary-blue-app" />{materia.aula}</span>)}</div></div></div>))}
      {materiasDia.length === 0 && (<div className="flex items-center gap-2 py-3 px-4 rounded-xl justify-center opacity-40"><SvgXmark size={13} className="text-muted-app" /><p className="text-xs text-muted-app">Sin clases este dia</p></div>)}
    </div>
  );
};

export default DayClass;
