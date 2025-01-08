import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "./Menu";
import InstallApp from "./InstallApp";
import { FaDownload } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";

const AcercaDe = () => {
  const [installed, setInstalled] = useState(() => {
    const installStatus = localStorage.getItem("InstallApp");
    return installStatus === "true";
  });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Evitar que se muestre automáticamente el prompt
      setDeferredPrompt(e); // Guardamos el evento para usarlo más tarde
    };

    const handleAppInstalled = () => {
      setInstalled(true); // Actualizar estado a instalado
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

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostramos el prompt de instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setInstalled(true);
          localStorage.setItem("InstallApp", "true");
        } else {
          localStorage.setItem("InstallApp", "false");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      <Menu />
      <InstallApp />

      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md space-y-4 animate-fade-in-fast md:hidden">
        <h1 className="text-3xl font-bold text-primary-orange-app ">
          Acerca de Timeschedule
        </h1>
        <p className="text-pretty text-gray-700">
          Timeschedule es una aplicación web gratuita e intuitiva, diseñada para
          optimizar la organización de horarios. Ideal para estudiantes,
          profesionales y cualquier persona que busque gestionar su tiempo de
          manera eficiente.
        </p>

        {!window.matchMedia("(display-mode: standalone)").matches &&
        !installed &&
        deferredPrompt ? (
          <button
            className="bg-primary-orange-app active:bg-primary-orange-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md active:bg- active:text-white/80 active:scale-105 transition-transform transform flex items-center space-x-2 gap-2 justify-center"
            title="Instalar Timeschedule"
            onClick={handleInstallClick}
          >
            Instalar Timeschedule
            <FaDownload size={20} />
          </button>
        ) : null}
        {!window.matchMedia("(display-mode: standalone)").matches &&
          installed &&
          !deferredPrompt && (
            <>
              <p className="text-pretty text-gray-900/50 text-sm bg-yellow-300 rounded-lg p-4 text-center">
                Ya tienes Timeschedule instalado en tu dispositivo. Disfruta de
                cada funcionalidad que te ofrece y mejora tu productividad.
              </p>
              <a
                className="bg-secondary-blue-app active:bg-secondary-blue-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md active:bg- active:text-white/80 active:scale-105 transition-transform transform flex items-center space-x-2 gap-2 justify-center"
                href="https://timeschedulee.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Timeschedule
                <FaArrowRight size={20} />
              </a>
            </>
          )}

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
            ESTE NO ES DE CARACTER OBLIGATORIO PERO NOS AYUDARÁ A CONTINUAR
            NUESTRO TRABAJO, GRACIAS.
          </span>
        </p>
        <div className="text-center flex items-center justify-center">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=NNJTTX9YPTP4C"
            className="bg-gradient-to-r from-orange-500 to-yellow-400  text-white py-2 px-4 rounded-full flex items-center space-x-2 w-max  active:bg-gradient-to-br active:from-orange-500 active:to-yellow-400 active:text-white/80 active:scale-125 transition-all transform text-center font-extrabold active:font-semibold animate-bg-rainbow "
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
