import React, { useEffect, useState } from "react";
import {
  agregarMateria,
  leerMaterias,
  actualizarMateria,
  eliminarMateria,
} from "../public/db";
import InstallApp from "./pages/InstallApp";

function App() {
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
    "#FF5733", // Rojo
    "#33FF57", // Verde
    "#3357FF", // Azul
    "#FFD700", // Amarillo
    "#FF33A1", // Rosa
    "#33FFF5", // Turquesa
    "#FF8C33", // Naranja
    "#800080", // Morado
    "#000000", // Negro
    "#808080", // Gris
  ];

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const data = await leerMaterias();
    setMaterias(data);
  };

  const manejarAgregarMateria = () => {
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
      <InstallApp />
      <div className="min-h-screen bg-background-app  px-8 pt-8 flex flex-col items-center md:hidden">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          ¡Gestiona tus Materias!
        </h1>

        {/* Formulario de nueva materia */}
        <h2 className="text-2xl font-semibold text-center text-indigo-100 decoration-wavy underline mb-6">
          Agregar Nueva Materia
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mb-8 h-96 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Nombre de la materia
            </label>
            <input
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
                Imagen de la materia
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
                <label className="w-full text-center">Selecciona el día</label>
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
        <h3 className="text-2xl font-semibold text-center text-indigo-100 mb-4  decoration-wavy underline">
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

        <h2 className="text-2xl font-semibold text-center text-indigo-100 decoration-wavy underline mb-4">
          Materias Agregadas
        </h2>
        <div className="flex flex-col gap-6  w-dvw max-w-max overflow-x-auto h-full">
          <div className="flex space-x-12 p-2  overflow-auto border-y-2 rounded-lg border-gray-600/50 bg-slate-800/50 h-full">
            {materias.map((materia) => (
              <div
                key={materia.id}
                style={{ backgroundColor: materia.color }}
                className="p-6 rounded-lg shadow-lg font-bold h-80 max-h-80 w-72 flex-none overflow-y-auto"
              >
                <div
                  style={{ backgroundImage: `url(${materia.imagen})` }}
                  className="h-40 bg-cover bg-center rounded-lg mb-4 max-h-40 border border-gray-300 shadow-inner shadow-slate-800/60"
                ></div>
                <h3 className="text-2xl uppercase underline decoration-wavy underline-offset-4 mb-5">
                  {materia.nombre}
                </h3>
                <ul>
                  {materia.horarios.map((h, i) => (
                    <li key={i}>
                      <div className="flex justify-around border-b border-gray-400 py-2">
                        <span className="font-bold">{h.dia}</span>
                        <span className="font-bold">
                          {" "}
                          {h.horaInicio} - {h.horaFin}{" "}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-4 items-center">
                  <button
                    className="bg-tertiary-green-app text-yellow-50 p-2 mx-2 rounded-lg  active:shadow-lg shadow-slate-900/60"
                    onClick={() => manejarActualizarMateria(materia.id)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="bg-primary-orange-app text-yellow-50 p-2 mx-2 rounded-lg  active:shadow-lg shadow-slate-900/60"
                    onClick={() => manejarEliminarMateria(materia.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
