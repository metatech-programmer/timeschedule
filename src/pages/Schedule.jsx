import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Schedule = () => {
  useEffect(() => {
    const schedule = document.getElementById("schedule");
    schedule.classList.add("animate-fade-in");
  
  }, []);

  const [activities, setActivities] = useState([
    { name: "Ejercicio", time: "8:00" },
    { name: "Desayuno", time: "9:00" },
    { name: "Trabajo", time: "10:00" },
    { name: "Almuerzo", time: "12:00" },
    { name: "Trabajo", time: "13:00" },
    { name: "Cena", time: "18:00" },
    { name: "Relax", time: "19:00" },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const time = formData.get("time");
    setActivities((prevActivities) => [...prevActivities, { name, time }]);
  };

  return (
    <div className="flex flex-col items-center" id="schedule">
      <h1 className="text-6xl font-bold mb-4">Horario</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Nombre</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Hora</span>
          <input
            type="time"
            name="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar
        </button>
      </form>
      <ul className="mt-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="text-lg">{activity.name}</span>
            <span className="text-lg">{activity.time}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/"
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver
      </Link>
    </div>
  );
};

export default Schedule;
