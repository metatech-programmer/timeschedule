import React from "react";
import Footer from "../components/Footer";
import Menu from "./Menu";

const AcercaDe = () => {
  return (
    <>
    <Menu />
    
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md space-y-4 animate-fade-in-fast">
        <h1 className="text-3xl font-bold text-primary-orange-app">
          Acerca de Timeschedule
        </h1>
        <p className="text-gray-700">
          Timeschedule es una aplicación web de código abierto y gratuita que te
          permite organizar tus horarios de manera sencilla y visual. Fue creada
          por una persona que se cansó de perder el tiempo en tareas repetitivas
          y quería algo que lo ayudara a ser más productivo.
        </p>
        <h2 className="text-2xl font-semibold text-secondary-blue-app">
          Características Clave
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Interfaz minimalista y fácil de usar.</li>
          <li>Sincronización en múltiples dispositivos (próximamente).</li>
          <li>Notificaciones y recordatorios personalizados (próximamente).</li>
          <li>
            Visualización de horarios en diferentes formatos (próximamente).
          </li>
          <li>
            Funcionalidades de arrastrar y soltar para reorganizar eventos
            (próximamente).
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-tertiary-green-app">
          Nuestra Misión
        </h2>
        <p className="text-gray-700">
          Nuestra misión es proporcionar una herramienta que permita a las
          personas maximizar su productividad y aprovechar al máximo su tiempo.
          No queremos ganar dinero con esta aplicación, solo queremos ayudar a
          la gente a ser más productiva.
        </p>
        <p className="text-gray-700">
          Si quieres contribuir a la aplicación o reportar un bug, puedes
          hacerlo en nuestro repositorio de GitHub.
        </p>
      </div>
      <Footer className="pb-20" />
    </>
  );
};

export default AcercaDe;
