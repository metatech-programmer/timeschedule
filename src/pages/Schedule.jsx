import React, { useEffect, useState } from "react";
import {
  agregarMateria,
  leerMaterias,
  actualizarMateria,
  eliminarMateria,
} from "../../public/db";
import InstallApp from "./InstallApp";
import Menu from "./Menu";
import { FaArrowRight, FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRotateLeft } from "react-icons/fa6";

function Schedule() {
  const withinSchedule = localStorage.getItem("withoutSchedule");
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
    if (
      (principiante === "false" || principiante === null) &&
      withinSchedule === "true"
    ) {
      localStorage.clear();
      navigate("/");
    }
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const data = await leerMaterias();
    setMaterias(data);
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
          setPasos(2);
          setActualizar(false);
        } else {
          setPasos(1);
          setActualizar(true);
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

  const handlerClickAnteriorSalon = () => {
    document.getElementById("aula").value = aulaInput;
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
          Sigue los pasos
        </h1>

        <div className="flex justify-evenly w-full items-center">
          <button
            className={
              "bg-primary-orange-app text-white font-bold py-2 px-4 rounded-full mb-4 active:scale-95 transition-all" +
              (pasos === 1
                ? " bg-secondary-blue-app ring-4 ring-offset-1 ring-primary-orange-app/50"
                : "")
            }
            onClick={() => manejaPasos(1)}
          >
            1
          </button>
          <button
            disabled={!actualizar ? false : true}
            className={
              "bg-primary-orange-app text-white font-bold py-2 px-4 rounded-full mb-4 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 " +
              (pasos === 2
                ? " bg-secondary-blue-app ring-4 ring-offset-1 ring-primary-orange-app/50"
                : "")
            }
            onClick={() => manejaPasos(2)}
          >
            2
          </button>

          <button
            disabled={materias.length > 0 ? false : true}
            className={
              "bg-primary-orange-app text-white font-bold py-2 px-4 rounded-full mb-4 active:scale-95 transition-all  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600" +
              (pasos === 3
                ? " bg-secondary-blue-app ring-4 ring-offset-1 ring-primary-orange-app/50"
                : "")
            }
            onClick={() => manejaPasos(3)}
          >
            3
          </button>
        </div>
        {pasos === 1 && (
          <div className="border-dashed border-indigo-100/50 my-3 w-full h-screen px-2 animate-fade-in-fast">
            {/* Formulario de nueva materia */}
            <div className="bg-background-app text-quaternary-gray-app p-8 rounded-lg shadow-xl w-full max-w-3xl mb-8 overflow-y-auto h-screen pb-20">
              <h2 className="text-lg font-extrabold  text-center text-secondary-blue-app decoration-wavy  uppercase underline-offset-8 underline mb-6">
                Agrega tus materias
              </h2>
              <div className="mb-4">
                <label className="block text-lg font-medium text-quaternary-gray-app">
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
                  className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-quaternary-gray-app">
                  Docente
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={nuevaMateria.docente}
                  onChange={(e) =>
                    setNuevaMateria({
                      ...nuevaMateria,
                      docente: e.target.value,
                    })
                  }
                  className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-6 md:flex-row  md:justify-between space-x-4 mb-6">
                <div className="flex-1">
                  <label className="block text-lg font-medium text-quaternary-gray-app mb-2">
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
                  <label className="block text-lg font-medium text-quaternary-gray-app mb-2">
                    Imagen de la materia{" "}
                    <span className="text-sm text-quaternary-gray-app/50">
                      (Opcional){" "}
                    </span>
                  </label>
                  <div
                    className="border-2 border-dashed border-indigo-400 text-background-app p-4 rounded-lg flex justify-center items-center cursor-pointer"
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
                <label className="block text-lg font-medium text-quaternary-gray-app">
                  Horario{" "}
                  <span className="text-sm text-quaternary-gray-app/50">
                    (Agrega tantos como desees){" "}
                  </span>
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
                      className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
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
                  <div className="">
                    <label className="block  text-quaternary-gray-app">
                      Aula de clase
                    </label>
                    <input
                      required
                      id="aula"
                      type="text"
                      placeholder="Ej. Aula 101"
                      value={horario.aula}
                      onChange={(e) =>
                        setHorario({ ...horario, aula: e.target.value })
                      }
                      className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
                    />
                    {aulaInput.length > 0 && (
                      <div className="flex flex-row gap-4">
                        <button
                          onClick={handlerClickAnteriorSalon}
                          className="text-sm text-quaternary-gray-app/50 flex flex-row gap-2 justify-end w-full items-center m-2 active:text-primary-orange-app/50"
                        >
                          Aula anterior
                          <FaRotateLeft className="active:-rotate-180 transition-all" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-row gap-4">
                    <div className="flex-1 flex-col md:w-1/3">
                      <label className="w-full text-center">
                        Hora de inicio
                      </label>
                      <input
                        required
                        type="time"
                        value={horario.horaInicio}
                        onChange={(e) =>
                          setHorario({ ...horario, horaInicio: e.target.value })
                        }
                        className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
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
                        className="w-full p-3 border-2 border-indigo-400 text-background-app rounded-lg"
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
                <div className=" w-full ">
                  {/* Listado de horarios agregados */}
                  <div className=" bg-slate-100 rounded-lg mt-4 max-h-44 overflow-y-auto text-background-app">
                    {nuevaMateria.horarios.length > 0 ? (
                      <ul className="space-y-4">
                        {nuevaMateria.horarios.map((h, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center p-4 bg-white border-2 border-indigo-300 rounded-lg overflow-clip"
                          >
                            <span className="border-r-2 border-indigo-300 font-semibold pr-4 mr-2">
                              {index + 1}
                            </span>
                            <span className="flex-1 text-balance">
                              {h.dia} -{" "}
                              {String(h.aula).toUpperCase().split(" ").at(0)}
                              <div className="text-sm text-gray-500">
                                {h.horaInicio} - {h.horaFin}
                              </div>
                            </span>
                            <button
                              onClick={() => manejarEliminarHorario(index)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                              <FaTrash className="w-4 h-4 active:scale-105" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-gray-500 p-2">
                        No hay horarios agregados aún.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {!actualizar && (
                <button
                  onClick={manejarAgregarMateria}
                  className="w-full bg-green-500 text-white py-3 rounded-lg"
                >
                  Guardar Materia
                </button>
              )}
              {actualizar && (
                <button
                  onClick={manejarActualizarMateria}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg"
                >
                  Actualizar Materia
                </button>
              )}
            </div>
          </div>
        )}

        {pasos === 2 && (
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg font-semibold text-center text-quaternary-gray-app uppercase bg-secondary-blue-app py-2  my-4 w-full">
              Materias Agregadas
            </h2>
            {/* Listado de materias */}
            {!materias.length ? (
              <p className="text-center text-gray-500 mb-4">
                No se han agregado materias aún.
              </p>
            ) : (
              <div className="flex flex-col gap-6 w-dvw max-w-max  overflow-x-auto  animate-fade-in-fast">
                <div className="flex space-x-12 p-2 overflow-auto  w-max  snap-x snap-mandatory relative">
                  {materias.map((materia, index) => (
                    <div
                      key={materia.id}
                      style={{ backgroundColor: materia.color }}
                      className="p-4 rounded-lg shadow-lg font-bold h-80 max-h-80 w-72  flex-none overflow-y-auto snap-center z-50  "
                    >
                      <div
                        className={
                          "flex  items-center justify-between text-quaternary-gray-app w-full bg-zinc-900 border-2 border-y-secondary-blue-app overflow-clip rounded-t-lg p-2 h-44" +
                          " " +
                          (materia.imagen ? "flex-col" : "")
                        }
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                      >
                        {materia.imagen && (
                          <div className=" w-16 h-16 max-h-16 bg-cover bg-center rounded-full border border-gray-600 shadow-inner shadow-slate-800/60 m-2 overflow-auto">
                            <img
                              src={materia.imagen}
                              alt={materia.nombre}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}

                        <h3
                          className={
                            "text-sm uppercase font-bold text-center text-balance " +
                            (materia.imagen
                              ? " max-h-12 w-52 h-12 overflow-y-scroll"
                              : "w-full ")
                          }
                        >
                          {materia.nombre}
                        </h3>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary-blue-app/50 rounded-b-xl">
                        {materia.docente && (
                          <p className="text-sm text-center text-background-app capitalize ">
                            Docente:{" "}
                            {String(materia.docente).split(" ").at(0) +
                              " " +
                              (String(materia.docente).split(" ").at(1) ?? "")}
                          </p>
                        )}
                        {materia.aula && (
                          <p className="text-sm text-center text-background-app ">
                            Aula: {materia.aula}
                          </p>
                        )}
                      </div>
                      <ul>
                        {materia.horarios.map((h, i) => (
                          <li key={i}>
                            <div
                              className="flex justify-around border-b border-gray-400 py-2 text-background-app items-center"
                              style={{
                                textShadow: "1px 1px 1px #fff",
                              }}
                            >
                              <span className="font-bold">
                                {h.dia}
                                <div className="text-xs text-gray-500 max-w-28">
                                  {h.aula}
                                </div>
                              </span>
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
                          <FaPen className="w-4 h-4 active:scale-105" />
                        </button>
                        <button
                          className="bg-primary-orange-app text-yellow-50 p-2 mx-2 rounded-lg active:shadow-lg shadow-slate-900/60"
                          onClick={() => manejarEliminarMateria(materia.id)}
                        >
                          <FaTrash className="w-4 h-4 active:scale-105" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {pasos === 3 && (
          <div className="w-full">
            <h2 className="text-lg font-semibold text-center text-quaternary-gray-app uppercase bg-primary-orange-app py-2  my-4">
              Información
            </h2>
            <p className="text-center text-quaternary-gray-app/80 animate-fade-in-fast mb-4 p-4 text-balance text-2xl font-semibold ">
              Tu horario se ha guardado con exito. Estas a punto de disfrutar de
              una nueva experiencia en donde veras tu horario de forma dinamica
              y en tiempo real.
              <br />
              <br />
              <span className="text-secondary-blue-app text-xl">
                Gracias por utilizar Timeschedule. Esperamos que lo disfrutes.
              </span>
            </p>
            <Link to="/scheduleDay">
              <button className="w-max  bg-green-500 text-white p-3 m-auto rounded-lg flex items-center justify-center gap-4 animate-expand-btn active:animate-none">
                Vamos a ver tu horario <FaArrowRight className="text-xl" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Schedule;
