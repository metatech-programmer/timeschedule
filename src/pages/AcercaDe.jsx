import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "./Menu";
import InstallApp from "./InstallApp";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";

const AcercaDe = () => {
  const [installed, setInstalled] = useState(
    () => localStorage.getItem("InstallApp") === "true"
  );
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstalled(false);
      localStorage.setItem("InstallApp", "false");
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      localStorage.setItem("InstallApp", "true");
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      const wasAccepted = choiceResult.outcome === "accepted";
      setInstalled(wasAccepted);
      localStorage.setItem("InstallApp", wasAccepted ? "true" : "false");
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <Menu />
      <InstallApp />
      <div
        className="p-6 max-w-4xl mx-auto bg-white shadow-md space-y-4 animate-fade-in-fast md:hidden"
        id="top"
      >
        <h1 className="text-3xl font-bold text-primary-orange-app">
          Acerca de Timeschedule
        </h1>
        <p className="text-balance text-gray-700">
          Timeschedule es una aplicación web gratuita e intuitiva, diseñada para
          optimizar la organización de horarios. Ideal para estudiantes,
          profesionales y cualquier persona que busque gestionar su tiempo de
          manera eficiente.
        </p>

        {!isStandalone && !installed && deferredPrompt && (
          <button
            className="bg-primary-orange-app hover:bg-primary-orange-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md active:scale-105 transition-transform flex items-center gap-2 justify-center"
            title="Instalar Timeschedule"
            onClick={handleInstallClick}
          >
            Instalar Timeschedule <FaDownload size={20} />
          </button>
        )}

        {!isStandalone && installed && !deferredPrompt && (
          <>
            <p className="text-balance text-gray-900/50 text-sm bg-yellow-300 rounded-lg p-4 text-center">
              Ya tienes Timeschedule instalado en tu dispositivo. Disfruta de
              cada funcionalidad que te ofrece y mejora tu productividad.
            </p>
            <a
              className="bg-secondary-blue-app hover:bg-secondary-blue-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md active:scale-105 transition-transform flex items-center gap-2 justify-center"
              href="https://timeschedulee.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Timeschedule <FaArrowRight size={20} />
            </a>
          </>
        )}

        <h2 className="text-2xl font-semibold text-secondary-blue-app ">
          Características Clave
        </h2>
        <ul className="list-disc px-3 space-y-2  list-outside ">
          <li>Interfaz intuitiva y fácil de navegar.</li>
          <li>Personalización de horarios.</li>
          <li>Visualización de horarios en varios formatos.</li>
          <li>Funcionamiento sin conexión a internet.</li>
          <li>
            Recordatorios y notificaciones personalizables (próximamente).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-tertiary-green-app">
           Misión de Timeschedule
        </h2>
        <p className="text-balance text-gray-700">
          La misión que motiva a la creación de Timeschedule es proporcionar una herramienta que permita a las
          personas maximizar su productividad y aprovechar al máximo su tiempo.
        </p>
        <h2 className="text-2xl font-semibold text-background-app">
          
        </h2>
        <p className="text-balance text-gray-700/50 border-2 border-primary-orange-app rounded-lg p-4 text-center">
          Tienes alguna sugerencia o idea para mejorar Timeschedule, no dudes
          en enviar un correo a {" "}
          <a
            href="mailto:metatech000@gmail.com?subject=Timeschedule%20-%20Sugerencia"
            className="text-primary-orange-app underline underline-offset-2 "
          >
            metatech000@gmail.com
          </a>
        </p>
        <hr />
        <p className="text-balance text-gray-700 flex flex-col items-center">
          Si deseas contribuir con una donación, puedes hacerlo a través de
          PayPal. <br />
          <span className="font-semibold text-primary-orange-app bg-zinc-900 rounded-xl mt-2 text-[0.5rem] text-center p-4 text-balance">
            ESTE NO ES DE CARÁCTER OBLIGATORIO, PERO SEGURAMENTE AYUDARÁ A CONTINUAR
            ESTE TIPO DE PROYECTOS. ¡GRACIAS!
          </span>
        </p>
        <div className="text-center flex items-center justify-center z-40">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=NNJTTX9YPTP4C"
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 px-4 rounded-full flex items-center gap-2 w-max active:scale-125 transition-all transform font-extrabold"
          >
            <span>Dona un café</span>
            <GiCoffeeCup className="animate-pulse" size={20} />
          </a>
        </div>
      </div>
      <Footer className="pb-20" />
    </>
  );
};

export default AcercaDe;
