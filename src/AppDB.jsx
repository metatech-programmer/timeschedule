import React, { useEffect, useState } from "react";
import {
  agregarMateria,
  leerMaterias,
  actualizarMateria,
  eliminarMateria,
} from "./db";
import { ChromePicker } from "react-color";

function App() {
  const [materias, setMaterias] = useState([]);
  const [nuevaMateria, setNuevaMateria] = useState({
    nombre: "",
    color: "#ffffff",
    imagen: "",
    horarios: [],
  });
  const [horario, setHorario] = useState({
    dia: "",
    horaInicio: "",
    horaFin: "",
  });
  const [imagenPreview, setImagenPreview] = useState(null);

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
        color: "#ffffff",
        imagen: "",
        horarios: [],
      });
      setImagenPreview(null); // Resetear la previsualización de la imagen
    });
  };

  const agregarHorario = () => {
    setNuevaMateria({
      ...nuevaMateria,
      horarios: [...nuevaMateria.horarios, horario],
    });
    setHorario({ dia: "", horaInicio: "", horaFin: "" });
  };

  const manejarEliminarHorario = (index) => {
    const nuevosHorarios = nuevaMateria.horarios.filter((_, i) => i !== index);
    setNuevaMateria({ ...nuevaMateria, horarios: nuevosHorarios });
  };

  const manejarActualizarMateria = (id) => {
    actualizarMateria(id, { nombre: "Materia Actualizada" }).then(() =>
      cargarMaterias()
    );
  };

  const manejarEliminarMateria = (id) => {
    eliminarMateria(id).then(() => cargarMaterias());
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNuevaMateria({ ...nuevaMateria, imagen: reader.result });
      setImagenPreview(reader.result); // Previsualizar la imagen
    };
    reader.readAsDataURL(file);
  };

  const manejarColorChange = (color) => {
    setNuevaMateria({ ...nuevaMateria, color: color.hex });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8 animate__animated animate__fadeInUp">
        ¡Gestiona tus Materias con Estilo!
      </h1>

      {/* Formulario de nueva materia */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mb-12 animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Agregar Nueva Materia
        </h2>

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
            className="w-full p-3 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700">
              Selecciona el color
            </label>
            <ChromePicker
              color={nuevaMateria.color}
              onChange={manejarColorChange}
              className="w-full p-3 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700">
              Imagen de la materia
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={manejarImagen}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:bg-indigo-100 file:border file:border-indigo-300 file:rounded-md"
            />
            {imagenPreview && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Previsualización:
                </h3>
                <img
                  src={imagenPreview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg mt-2"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Selecciona el horario
          </label>
          <div className="flex space-x-4">
            <select
              value={horario.dia}
              onChange={(e) => setHorario({ ...horario, dia: e.target.value })}
              className="w-1/3 p-3 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Día</option>
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

            <input
              type="time"
              value={horario.horaInicio}
              onChange={(e) =>
                setHorario({ ...horario, horaInicio: e.target.value })
              }
              className="w-1/3 p-3 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <input
              type="time"
              value={horario.horaFin}
              onChange={(e) =>
                setHorario({ ...horario, horaFin: e.target.value })
              }
              className="w-1/3 p-3 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            onClick={agregarHorario}
            className="mt-4 w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Agregar Horario
          </button>
        </div>

        <button
          onClick={manejarAgregarMateria}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Agregar Materia
        </button>
      </div>

      {/* Listado de horarios agregados */}
      <div className="mb-8 w-full max-w-3xl" >
        <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
          Horarios Agregados
        </h3>
        {nuevaMateria.horarios.length > 0 ? (
          <ul className="space-y-4">
            {nuevaMateria.horarios.map((h, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-white border-2 border-indigo-300 rounded-lg"
              >
                <span>
                  {h.dia} - {h.horaInicio} - {h.horaFin}
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

      {/* Lista de materias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {materias.map((materia) => (
          <div
          key={materia.id}
          style={{ backgroundColor: materia.color }}
          className=" p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div
              className="h-40 w-full mb-4 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${materia.imagen})` }}
            ></div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {materia.nombre}
            </h3>
            <div className="text-gray-700">
              {materia.horarios.length > 0 ? (
                <ul className="space-y-2">
                  {materia.horarios.map((horario, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{horario.dia}</span>
                      <span>
                        {horario.horaInicio} - {horario.horaFin}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No hay horarios asignados.
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => manejarActualizarMateria(materia.id)}
                className="text-indigo-500 hover:underline"
              >
                Actualizar
              </button>
              <button
                onClick={() => manejarEliminarMateria(materia.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
