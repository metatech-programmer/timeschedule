import React, { useEffect, useRef, useState } from "react";
import {
  agregarMateria,
  leerMaterias,
  actualizarMateria,
  eliminarMateria,
} from "../../db";
import InstallApp from "./InstallApp";
import Menu from "./Menu";
import { SvgArrowRight, SvgTrash, SvgRotateLeft, SvgColorPicker, SvgPen } from "../components/Icons";
import { useNavigate } from "react-router-dom";
import { HexColorPicker } from "react-colorful";

function ScheduleManager() {
  const buttonRef = useRef(null);
  const pickerRef = useRef(null);
  const principiante = localStorage.getItem("principiante");
  const navigate = useNavigate();

  const [aulaInput, setAulaInput] = useState("");
  const [idMateria, setIdMateria] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({
    nombre: "",
    docente: "",
    color: "#ffffff",
    imagen: "",
    horarios: [],
  });
  const [horario, setHorario] = useState({
    aula: "",
    dia: "Lunes",
    horaInicio: "00:00",
    horaFin: "23:59",
  });
  const [imagenPreview, setImagenPreview] = useState(null);

  const [pasos, setPasos] = useState(1);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const coloresDisponibles = [
    "#A8D5BA", // Verde menta pastel
    "#92D4D9", // Azul cielo pastel
    "#F0C19D", // Melocotón pastel
    "#B7D9F0", // Azul bebé pastel
    "#FFDCC3", // Naranja durazno pastel
    "#C7E5A6", // Verde limón pastel
    "#9AD0F5", // Azul celeste suave
    "#F2B48D", // Naranja coral pastel
    "#A4E4D4", // Verde agua pastel
    "MORECOLORS", // Naranja cálido pastel
  ];

  useEffect(() => {
    if (principiante === "true" || principiante === null) {
      localStorage.clear();
      navigate("/");
    }
    cargarMaterias();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (actualizar) {
        manejarActualizarMateria(idMateria);
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [actualizar]);

  useEffect(() => {
    if (showColorPicker && buttonRef.current && pickerRef.current) {
      // Keep picker centered — nothing to override
    }
  }, [showColorPicker]);

  const cargarMaterias = async () => {
    const data = await leerMaterias();
    setMaterias(data);
    if (data.length === 0) localStorage.setItem("scheduleFirst", false);

    localStorage.setItem("withoutSchedule", data.length === 0 ? true : false);
  };

  const manejarAgregarMateria = () => {
    if (!nuevaMateria.nombre || !nuevaMateria.docente) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (nuevaMateria.horarios.length === 0) {
      alert("Por favor, agrega al menos un horario.");
      return;
    }

    if (nuevaMateria.color === "#ffffff") {
      alert("Por favor, selecciona un color.");
      return;
    }

    agregarMateria(nuevaMateria).then(() => {
      cargarMaterias();
      setNuevaMateria({
        nombre: "",
        aula: "",
        docente: "",
        color: "#ffffff",
        imagen: "",
        horarios: [],
      });
      setImagenPreview(null);
    });
    window.location.href = "#newSchedule";
  };

  const agregarHorario = () => {
    if (!horario.aula) {
      horario.aula = aulaInput;
    }

    if (
      !horario.dia ||
      !horario.horaInicio ||
      !horario.horaFin ||
      !horario.aula
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setAulaInput(String(document.getElementById("aula").value));

    setNuevaMateria({
      ...nuevaMateria,
      horarios: [...nuevaMateria.horarios, { ...horario }],
    });

    setHorario({
      aula: "",
      dia: "Lunes",
      horaInicio: "00:00",
      horaFin: "23:59",
    });
  };

  const manejarEliminarHorario = (index) => {
    const nuevosHorarios = nuevaMateria.horarios.filter((_, i) => i !== index);
    setNuevaMateria({ ...nuevaMateria, horarios: nuevosHorarios });
  };

  const manejarActualizarMateria = (id) => {
    setIdMateria(id);

    const { nombre, aula, docente, color, imagen, horarios } = materias.find(
      (materia) => materia.id === idMateria
    );

    setNuevaMateria({
      nombre,
      aula,
      docente,
      color,
      imagen,
      horarios,
    });

    const materia = materias.find((materia) => materia.id === idMateria);
    if (materia) {
      actualizarMateria(idMateria, { ...materia, ...nuevaMateria }).then(() => {
        cargarMaterias();

        setNuevaMateria({
          nombre: materia.nombre,
          aula: materia.aula,
          docente: materia.docente,
          color: materia.color,
          imagen: materia.imagen,
          horarios: materia.horarios,
        });
        setImagenPreview(materia.imagen);
        if (pasos === 1) {
          setActualizar(false);
          setPasos(2);
        } else {
          setActualizar(true);
          setPasos(1);
        }
      });
    }
  };

  const manejarEliminarMateria = (id) => {
    eliminarMateria(id).then(() => cargarMaterias());
  };

  const manejarDropImagen = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    manejarCargarImagen(file);
  };

  const manejarCargarImagen = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaMateria({ ...nuevaMateria, imagen: reader.result });
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const manejarArrastrarSobre = (e) => {
    e.preventDefault();
  };

  const fileInputRef = React.createRef();

  const manejarClickInput = () => {
    fileInputRef.current.click();
  };

  const manejarColorSeleccionado = (color) => {
    setNuevaMateria({ ...nuevaMateria, color });
  };

  const manejaPasos = (paso) => {
    setPasos(paso);
  };

  const manejarEditarHorario = (index) => {
    const materia = nuevaMateria;

    if (!materia) {
      alert(`Materia con ID ${idMateria} no encontrada.`);
      return;
    }

    const { horarios } = materia; // Extrae los horarios de la materia
    if (Array.isArray(horarios) && index >= 0 && index < horarios.length) {
      const horario = horarios[index];
      if (horario) {
        setHorario(horario); // Establece el horario si es válido
      } else {
        alert(`Horario no encontrado en el índice ${index}`);
      }
    } else {
      alert(`Índice de horario ${index} fuera de rango.`);
    }
    manejarEliminarHorario(index);
  };

  const handlerClickAnteriorSalon = () => {
    document.getElementById("aula").value = aulaInput;
  };

  const handleClickSchedule = () => {
    localStorage.setItem("withoutSchedule", false);
    localStorage.setItem("principiante", false);
    localStorage.setItem("withSchedule", true);
    localStorage.setItem("ScheduleFirst", true);
    navigate("/schedule");
  };
  const getComplementaryColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const complementaryR = 255 - r;
    const complementaryG = 255 - g;
    const complementaryB = 255 - b;
    return `#${complementaryR.toString(16).padStart(2, "0")}${complementaryG
      .toString(16)
      .padStart(2, "0")}${complementaryB.toString(16).padStart(2, "0")}`;
  };


  return (
    <>
      <Menu status={actualizar} />
      <InstallApp />
      <div className="min-h-screen bg-background-app flex flex-col md:hidden" id="top">
        <div className="fixed bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-5"
          style={{ background: "radial-gradient(circle, #F68839 0%, transparent 70%)" }}
        />
        <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gradient leading-tight">
                {localStorage.getItem("withSchedule") === "true" ? "Mis Materias" : "Configura tu horario"}
              </h1>
              <p className="text-xs text-muted-app mt-0.5">
                {pasos === 1 ? "Agrega o edita una materia" : pasos === 2 ? "Revisa tus materias" : "Todo listo!"}
              </p>
            </div>
            <img src="/icon.webp" alt="logo" className="w-9 h-9 rounded-xl border border-primary-orange-app/40" />
          </div>
          <div className="flex items-center gap-2">
            {[1, 2].concat(localStorage.getItem("ScheduleFirst") !== "true" ? [3] : []).map((step, i, arr) => (
              <React.Fragment key={step}>
                <button
                  onClick={() => { if(step===1) manejaPasos(1); else if(step===2 && !actualizar) manejaPasos(2); else if(step===3 && materias.length>0) manejaPasos(3); }}
                  disabled={(step===2 && actualizar) || (step===3 && materias.length===0)}
                  className={"w-8 h-8 rounded-full text-sm font-bold transition-all flex items-center justify-center flex-shrink-0 " + (pasos===step ? "bg-primary-orange-app text-white shadow-md" : pasos>step ? "bg-tertiary-green-app text-background-app" : "bg-surface-2 text-muted-app opacity-60")}
                >{pasos > step ? "✓" : step}</button>
                {i < arr.length - 1 && <div className={"h-0.5 flex-1 rounded-full transition-all " + (pasos > step ? "bg-tertiary-green-app" : "bg-surface-2")} />}
              </React.Fragment>
            ))}
          </div>
        </header>

        {pasos === 1 && (
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28 animate-fade-in-fast">
            <div id="newSchedule" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-secondary-blue-app mb-4">
              {idMateria > 0 ? "✏️ Editando materia" : "➕ Nueva materia"}
            </h2>
            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-app uppercase tracking-wider block mb-1.5">Nombre *</label>
              <input className="input-futuristic" type="text" placeholder="Ej. Calculo Diferencial" value={nuevaMateria.nombre}
                onChange={(e) => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })} />
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold text-muted-app uppercase tracking-wider block mb-1.5">Docente *</label>
              <input className="input-futuristic" type="text" placeholder="Ej. Dr. Juan Perez" value={nuevaMateria.docente}
                onChange={(e) => setNuevaMateria({ ...nuevaMateria, docente: e.target.value })} />
            </div>
            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-app uppercase tracking-wider block mb-1.5">Color</label>
                <div className="flex flex-wrap gap-2">
                  {coloresDisponibles.map((color) => color === "MORECOLORS" ? (
                    <React.Fragment key="more">
                      <button type="button" ref={buttonRef} onClick={() => setShowColorPicker(!showColorPicker)}
                        className="w-8 h-8 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center text-muted-app hover:border-secondary-blue-app transition-all"
                        style={{ backgroundColor: nuevaMateria.color !== "#ffffff" ? nuevaMateria.color + "30" : "transparent" }}>
                        <SvgColorPicker size={12} className={showColorPicker ? "animate-rotate-45" : ""} />
                      </button>
                      {showColorPicker && (
                        <>
                          <div className="fixed inset-0 z-[80] bg-black/60" onClick={() => setShowColorPicker(false)} />
                          <div ref={pickerRef} className="fixed z-[90] glass-card rounded-2xl p-4" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                            <p className="text-xs text-muted-app text-center mb-3">Elige un color personalizado</p>
                            <HexColorPicker color={nuevaMateria.color} onChange={manejarColorSeleccionado} />
                            <button onClick={() => setShowColorPicker(false)} className="btn-secondary w-full mt-3 text-sm py-2">Listo</button>
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  ) : (
                    <button key={color} onClick={() => manejarColorSeleccionado(color)}
                      className="w-8 h-8 rounded-lg transition-all duration-200 flex-shrink-0"
                      style={{ backgroundColor: color, border: nuevaMateria.color===color ? "3px solid #30B3BB" : "2px solid transparent", boxShadow: nuevaMateria.color===color ? "0 0 8px rgba(48,179,187,0.5)" : "none" }} />
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-muted-app uppercase tracking-wider block mb-1.5">Imagen <span className="normal-case opacity-50">(opc.)</span></label>
                <div className="glass border border-dashed border-white/20 rounded-xl p-3 flex items-center justify-center cursor-pointer hover:border-secondary-blue-app/50 transition-all min-h-[72px]"
                  onClick={manejarClickInput} onDrop={manejarDropImagen} onDragOver={manejarArrastrarSobre}>
                  {imagenPreview ? <img src={imagenPreview} alt="preview" className="w-14 h-14 object-cover rounded-lg" /> : <p className="text-xs text-muted-app/60 text-center">📂 Subir foto</p>}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => manejarCargarImagen(e.target.files[0])} className="hidden" />
              </div>
            </div>
            <div className="glass-card rounded-2xl p-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary-blue-app mb-3">📅 Horarios</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-muted-app block mb-1">Dia</label>
                  <select value={horario.dia || "Lunes"} onChange={(e) => setHorario({ ...horario, dia: e.target.value })} className="input-futuristic text-sm py-2">
                    {["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"].map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-app block mb-1">Aula</label>
                  <div className="relative">
                    <input id="aula" className="input-futuristic text-sm py-2" type="text" placeholder="Ej. 101-A" value={horario.aula}
                      onChange={(e) => setHorario({ ...horario, aula: e.target.value })} />
                    {aulaInput.length > 0 && (
                      <button onClick={handlerClickAnteriorSalon} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-app/50 hover:text-secondary-blue-app" title="Repetir aula anterior">
                        <SvgRotateLeft size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-muted-app block mb-1">Hora inicio</label>
                  <input type="time" value={horario.horaInicio} onChange={(e) => setHorario({ ...horario, horaInicio: e.target.value })} className="input-futuristic text-sm py-2" />
                </div>
                <div>
                  <label className="text-xs text-muted-app block mb-1">Hora fin</label>
                  <input type="time" value={horario.horaFin} onChange={(e) => setHorario({ ...horario, horaFin: e.target.value })} className="input-futuristic text-sm py-2" />
                </div>
              </div>
              <button onClick={agregarHorario} className="btn-secondary w-full text-sm py-2.5 rounded-xl">+ Agregar horario</button>
              {nuevaMateria.horarios.length > 0 && (
                <div className="mt-3 flex flex-col gap-2 max-h-40 overflow-y-auto">
                  {nuevaMateria.horarios.map((h, index) => (
                    <div key={index} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                      <span className="text-xs text-secondary-blue-app font-bold w-4">{index+1}</span>
                      <div className="flex-1 text-xs text-quaternary-gray-app cursor-pointer" onClick={() => manejarEditarHorario(index)}>
                        <span className="font-semibold">{h.dia}</span> · {h.aula} · {h.horaInicio}–{h.horaFin}
                      </div>
                      <button onClick={() => manejarEliminarHorario(index)} className="text-red-400/70 hover:text-red-400 transition-colors"><SvgTrash size={11} /></button>
                    </div>
                  ))}
                  <p className="text-[10px] text-muted-app/40 text-center">Toca un horario para editarlo</p>
                </div>
              )}
            </div>
            {!actualizar ? (
              <button onClick={manejarAgregarMateria} className="btn-primary w-full text-sm py-3.5 rounded-xl">💾 Guardar materia</button>
            ) : (
              <button onClick={manejarActualizarMateria} className="btn-secondary w-full text-sm py-3.5 rounded-xl">🔄 Actualizar materia</button>
            )}
          </div>
        )}

        {pasos === 2 && (
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28 animate-fade-in-fast">
            <h2 className="text-sm font-bold uppercase tracking-widest text-secondary-blue-app mb-4">
              {localStorage.getItem("withSchedule") ? "📚 Edita tus materias" : "📚 Materias registradas"}
            </h2>
            {materias.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center mt-6">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-semibold text-quaternary-gray-app">Sin materias aun</p>
                <p className="text-xs text-muted-app mt-1 mb-4">Ve al paso 1 para agregar tu primera materia</p>
                <button onClick={() => manejaPasos(1)} className="btn-primary text-sm py-2.5 px-6 rounded-xl">Agregar materia</button>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {materias.map((materia) => (
                  <div key={materia.id} className="glass-card rounded-2xl flex-none w-64 snap-center overflow-hidden"
                    style={{ borderTopColor: materia.color, borderTopWidth: "3px" }}>
                    <div className="p-4 bg-surface-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: materia.color + "30", border: "2px solid " + materia.color + "50" }}>
                          {materia.imagen
                            ? <img src={materia.imagen} alt={materia.nombre} className="w-11 h-11 rounded-xl object-cover" />
                            : <span style={{ color: materia.color }} className="text-xl font-bold">{materia.nombre.charAt(0).toUpperCase()}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-quaternary-gray-app text-sm truncate">{materia.nombre}</p>
                          <p className="text-xs text-muted-app truncate">{materia.docente}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 max-h-28 overflow-y-auto">
                        {materia.horarios.map((h, i) => (
                          <div key={i} className="glass rounded-lg px-2 py-1.5 text-xs">
                            <span className="text-secondary-blue-app font-semibold">{h.dia}</span>
                            <span className="text-muted-app ml-2">{h.horaInicio}–{h.horaFin}</span>
                            {h.aula && <span className="text-muted-app/60 ml-2">📍{h.aula}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 p-3 bg-surface-2">
                      <button onClick={() => manejarActualizarMateria(materia.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-secondary-blue-app/20 text-secondary-blue-app border border-secondary-blue-app/30 active:scale-95">
                        <SvgPen size={10} /> Editar
                      </button>
                      <button onClick={() => manejarEliminarMateria(materia.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 active:scale-95">
                        <SvgTrash size={10} /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => manejaPasos(1)} className="w-full mt-4 glass border border-dashed border-secondary-blue-app/30 text-secondary-blue-app text-sm font-semibold py-3 rounded-2xl">
              ➕ Agregar otra materia
            </button>
          </div>
        )}

        {pasos === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-28 animate-fade-in-fast">
            <div className="glass-card rounded-3xl p-8 text-center max-w-sm w-full">
              <div className="text-6xl mb-4 animate-float">🎉</div>
              <h2 className="text-xl font-bold text-gradient mb-3">Horario listo!</h2>
              <p className="text-sm text-muted-app leading-relaxed mb-2">Tu horario se guardo correctamente. Ahora podras ver tus clases en tiempo real.</p>
              <p className="text-xs text-secondary-blue-app mb-6">Bienvenido a Timeschedule! 🚀</p>
              <button onClick={handleClickSchedule} className="btn-primary w-full text-base py-4 rounded-2xl flex items-center justify-center gap-2">
                Ver mi horario <SvgArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ScheduleManager;
