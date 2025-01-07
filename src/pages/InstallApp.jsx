import React, { useState, useEffect } from "react";

const InstallApp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Detectar si el dispositivo es móvil
    const checkMobileDevice = () => {
      if (
        window.innerWidth <= 900 ||
        /Mobi|Android/i.test(navigator.userAgent)
      ) {
        setIsMobile(true);
      }
    };
    checkMobileDevice();

    // Listener para detectar el evento de instalación
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Guardamos el evento para usarlo más tarde
      setShowInstallPrompt(true); // Mostramos el botón de instalación
    };

    // Detectamos si el navegador soporta PWA
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Limpiar evento al desmontar el componente
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Función para manejar la instalación de la PWA
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostramos el prompt de instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("El usuario ha aceptado la instalación");
        } else {
          console.log("El usuario ha rechazado la instalación");
        }
        setDeferredPrompt(null); // Limpiamos el evento
        setShowInstallPrompt(false); // Ocultamos el botón de instalación
      });
    }
  };

  return (
    <div className="hidden md:flex items-center justify-center h-screen w-screen bg-background-app text-white text-center p-6">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "url(motion2.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.05",
          zIndex: "1",
        }}
      ></div>
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg z-50">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">
          ¡Atención! Solo para dispositivos móviles
        </h1>
        <p className="text-xl mb-4 font-medium leading-relaxed">
          Esta aplicación ha sido diseñada específicamente para una experiencia
          óptima en dispositivos móviles.
        </p>
        <p className="text-lg mb-6">
          Para disfrutar de todas las funcionalidades y el mejor rendimiento,
          por favor abre la app en tu dispositivo móvil e
          <span className="font-semibold text-yellow-300">
            {" "}
            instala la app desde Chrome
          </span>
          .
        </p>
        {isMobile && showInstallPrompt ? (
          <button
            onClick={handleInstallClick}
            className="bg-green-500 text-gray-900 py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-green-400 transition duration-300 ease-in-out"
          >
            Instalar App
          </button>
        ) : (
          // Botón para abrir la app en móvil

          <button
            className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-yellow-400 transition duration-300 ease-in-out cursor-pointer z-50"
            onClick={() => {
              alert(
                "Abre la app en tu móvil para disfrutar de todas las funcionalidades.\n(Url copiada en el portapapeles)"
              );
              navigator.clipboard.writeText(
                "https://timeschedulee.vercel.app/"
              );
            }}
          >
            Abrir en móvil
          </button>
        )}
      </div>
    </div>
  );
};

export default InstallApp;

