import React, { useEffect, useState } from "react";
import {
  agregarMateria,
  leerMaterias,
  actualizarMateria,
  eliminarMateria,
} from "../../public/db";
import InstallApp from "./InstallApp";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Schedule() {
  const [materias, setMaterias] = useState([]);
  const [nuevaMateria, setNuevaMateria] = useState({
    nombre: "",
    aula: "",
    docente: "",
    color: "#ffffff",
    imagen: "",
    horarios: [],
  });
  const [horario, setHorario] = useState({
    dia: "Lunes",
    horaInicio: "00:00",
    horaFin: "23:59",
  });
  const [imagenPreview, setImagenPreview] = useState(null);

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
    "#F5A873", // Naranja cálido pastel
  ];

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const data = await leerMaterias();
    setMaterias(data);
  };

  const manejarAgregarMateria = () => {
    if (!nuevaMateria.nombre || !nuevaMateria.aula || !nuevaMateria.docente) {
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
  };

  const agregarHorario = () => {
    setNuevaMateria({
      ...nuevaMateria,
      horarios: [...nuevaMateria.horarios, { ...horario }],
    });
    setHorario({ dia: "Lunes", horaInicio: "00:00", horaFin: "23:59" });
  };

  const manejarEliminarHorario = (index) => {
    const nuevosHorarios = nuevaMateria.horarios.filter((_, i) => i !== index);
    setNuevaMateria({ ...nuevaMateria, horarios: nuevosHorarios });
  };

  const manejarActualizarMateria = (id) => {
    actualizarMateria(id, { nombre: nuevaMateria.nombre }).then(() =>
      cargarMaterias()
    );
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

  return (
    <>
      <Menu />
      <InstallApp />
      <div className="min-h-screen bg-gradient-to-t from-secondary-blue-app to-background-app  pt-8 flex flex-col items-center md:hidden ">
        <h1
          className="text-4xl font-bold text-primary-orange-app mb-8 text-center uppercase"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "cursive",
          }}
        >
          Digita tu horario de clases
        </h1>
        <div className="border-b border-dashed border-indigo-100/50 my-3 w-full px-8">
          {/* Formulario de nueva materia */}
          <h2 className="text-2xl font-semibold text-center text-quaternary-gray-app/80 decoration-wavy underline-offset-8 underline mb-6">
            Agregar Nueva Materia
          </h2>
          <div className="bg-quaternary-gray-app p-8 rounded-lg shadow-xl w-full max-w-3xl mb-8 h-96 overflow-y-auto">
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Nombre de la materia
              </label>
              <input
                required
                type="text"
                placeholder="Ej. Matemáticas"
                value={nuevaMateria.nombre}
                onChange={(e) =>
                  setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Aula
              </label>
              <input
                required
                type="text"
                placeholder="Ej. Aula 101"
                value={nuevaMateria.aula}
                onChange={(e) =>
                  setNuevaMateria({ ...nuevaMateria, aula: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-400 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Docente
              </label>
              <input
                required
                type="text"
                placeholder="Ej. Juan Pérez"
                value={nuevaMateria.docente}
                onChange={(e) =>
                  setNuevaMateria({ ...nuevaMateria, docente: e.target.value })
                }
                className="w-full p-3 border-2 border-indigo-400 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-6 md:flex-row  md:justify-between space-x-4 mb-6">
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Color de la materia
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {coloresDisponibles.map((color) => (
                    <button
                      key={color}
                      onClick={() => manejarColorSeleccionado(color)}
                      style={{
                        backgroundColor: color,
                        border:
                          nuevaMateria.color === color
                            ? "3px solid skyblue"
                            : "1px solid #ccc",
                      }}
                      className={`w-10 h-10 rounded-lg cursor-pointer focus:outline-none transition-all duration-300 outline-offset-4 outline-sky-700`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Imagen de la materia (opcional)
                </label>
                <div
                  className="border-2 border-dashed border-indigo-400 p-4 rounded-lg flex justify-center items-center cursor-pointer"
                  onClick={manejarClickInput}
                  onDrop={manejarDropImagen}
                  onDragOver={manejarArrastrarSobre}
                >
                  {imagenPreview ? (
                    <img
                      src={imagenPreview}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-500 text-center">
                      Arrastra y suelta una imagen aquí, o haz clic para
                      seleccionar
                    </p>
                  )}
                </div>
                <input
                  required
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => manejarCargarImagen(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Horario
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex-col md:w-1/3">
                  <label className="w-full text-center">
                    Selecciona el día
                  </label>
                  <select
                    value={horario.dia || "Lunes"}
                    onChange={(e) =>
                      setHorario({ ...horario, dia: e.target.value })
                    }
                    className="w-full p-3 border-2 border-indigo-400 rounded-lg"
                  >
                    {[
                      "Lunes",
                      "Martes",
                      "Miércoles",
                      "Jueves",
                      "Viernes",
                      "Sábado",
                      "Domingo",
                    ].map((dia) => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex flex-row gap-4">
                  <div className="flex-1 flex-col md:w-1/3">
                    <label className="w-full text-center">Hora de inicio</label>
                    <input
                      required
                      type="time"
                      value={horario.horaInicio}
                      onChange={(e) =>
                        setHorario({ ...horario, horaInicio: e.target.value })
                      }
                      className="w-full p-3 border-2 border-indigo-400 rounded-lg"
                    />
                  </div>

                  <div className="flex-1 flex-col md:w-1/3">
                    <label className="w-full text-center">Hora de fin</label>
                    <input
                      required
                      type="time"
                      value={horario.horaFin}
                      onChange={(e) =>
                        setHorario({ ...horario, horaFin: e.target.value })
                      }
                      className="w-full p-3 border-2 border-indigo-400 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={agregarHorario}
                className="mt-4 w-full bg-indigo-500 text-white py-3 rounded-lg"
              >
                Agregar Horario
              </button>
            </div>

            <button
              onClick={manejarAgregarMateria}
              className="w-full bg-green-500 text-white py-3 rounded-lg"
            >
              Guardar Materia
            </button>
          </div>
        </div>

        <div className="border-b border-dashed border-indigo-100/50 my-3 w-full px-8">
          <h3 className="text-2xl font-semibold text-center text-quaternary-gray-app/80 mb-4  decoration-wavy underline-offset-8 underline">
            Horarios Agregados
          </h3>
          {/* Listado de horarios agregados */}
          <div className="mb-8 w-full max-w-3xl bg-slate-100 p-4 rounded-lg shadow-xl max-h-44 overflow-y-auto">
            {nuevaMateria.horarios.length > 0 ? (
              <ul className="space-y-4">
                {nuevaMateria.horarios.map((h, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 bg-white border-2 border-indigo-300 rounded-lg"
                  >
                    <span className="border-r-2 border-indigo-300 font-semibold pr-4 mr-2">
                      {index + 1}
                    </span>
                    <span>
                      {h.dia}
                      <div>
                        {h.horaInicio} - {h.horaFin}
                      </div>
                    </span>
                    <button
                      onClick={() => manejarEliminarHorario(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No hay horarios agregados aún.
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center text-quaternary-gray-app/80 decoration-wavy underline-offset-8 underline mb-4">
            Materias Agregadas
          </h2>
          {/* Listado de materias */}
          {!materias.length ? (
            <p className="text-center text-gray-500 mb-4">
              No hay materias agregadas aún.
            </p>
          ) : (
            <div className="flex flex-col gap-6 w-dvw max-w-max  overflow-x-auto h-full bg-gradient-to-b from-transparent to-secondary-blue-app  ">
              <div className="flex space-x-12 p-2 overflow-auto  w-max  h-full snap-x snap-mandatory relative">
                {materias.map((materia, index) => (
                  <div
                    key={materia.id}
                    style={{ backgroundColor: materia.color }}
                    className="p-6 rounded-lg shadow-lg font-bold h-80 max-h-80 w-72 flex-none overflow-y-auto snap-center z-50 "
                  >
                    {materia.imagen && (
                      <div
                        style={{ backgroundImage: `url(${materia.imagen})` }}
                        className="h-40 bg-cover bg-center rounded-lg mb-4 max-h-40 border border-gray-300 shadow-inner shadow-slate-800/60"
                      ></div>
                    )}

                    <h3 className="text-2xl uppercase underline decoration-wavy underline-offset-8 mb-5">
                      {materia.nombre}
                    </h3>
                    <ul>
                      {materia.horarios.map((h, i) => (
                        <li key={i}>
                          <div className="flex justify-around border-b border-gray-400 py-2">
                            <span className="font-bold">{h.dia}</span>
                            <span className="font-bold">
                              {h.horaInicio} - {h.horaFin}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-4 items-center">
                      <button
                        className="bg-tertiary-green-app text-yellow-50 p-2 mx-2 rounded-lg active:shadow-lg shadow-slate-900/60"
                        onClick={() => manejarActualizarMateria(materia.id)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="bg-primary-orange-app text-yellow-50 p-2 mx-2 rounded-lg active:shadow-lg shadow-slate-900/60"
                        onClick={() => manejarEliminarMateria(materia.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Schedule;
