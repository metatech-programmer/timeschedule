import React from "react";
import Footer from "../components/Footer";
import Menu from "./Menu";

const AcercaDe = () => {
  return (
    <>
      <Menu />

      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md space-y-4 animate-fade-in-fast ">
        <h1 className="text-3xl font-bold text-primary-orange-app">
          Acerca de Timeschedule
        </h1>
        <p className="text-pretty text-gray-700">
          Timeschedule es una aplicación web gratuita y de código abierto
          diseñada para optimizar la organización de horarios. Ideal para
          estudiantes, profesionales y cualquier persona que busque gestionar su
          tiempo de manera eficiente.
        </p>
        <h2 className="text-2xl font-semibold text-secondary-blue-app">
          Características Clave
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Interfaz intuitiva y fácil de navegar.</li>
          <li>
            Recordatorios y notificaciones personalizables (próximamente).
          </li>
          <li>Visualización de horarios en varios formatos (próximamente).</li>
        </ul>
        <h2 className="text-2xl font-semibold text-tertiary-green-app">
          Nuestra Misión
        </h2>
        <p className="text-pretty text-gray-700">
          Nuestra misión es proporcionar una herramienta que permita a las
          personas maximizar su productividad y aprovechar al máximo su tiempo.
          Queremos ayudar a las personas a ser más productivas.
        </p>
        <p className="text-pretty text-gray-700 flex flex-col items-center">
          Si deseas contribuir con una donación, puedes hacerlo a traves de
          PayPal. <br />
          <span className="font-semibold text-primary-orange-app bg-black rounded-xl mt-2 text-xs text-center p-4">

          ESTE NO ES DE CARACTER OBLIGATORIO PERO NOS AYUDARÁ A CONTINUAR NUESTRO
          TRABAJO, GRACIAS.
          </span>
        </p>
        <div className="text-center">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=NNJTTX9YPTP4C"
            className="bg-primary-orange-app text-white py-2 px-4 rounded-full inline-block mt-4"
          >
            Donar con PayPal
          </a>
        </div>
      </div>
      <Footer className="pb-20" />
    </>
  );
};

export default AcercaDe;
