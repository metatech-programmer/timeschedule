import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const BtnIntallApp = () => {
  const [installed, setInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(
    installed ? null : undefined
  );

  useEffect(() => {
    const installed = String(localStorage.getItem("InstallApp"));
    setInstalled(installed === "true" ? true : false);
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    deferredPrompt.prompt(); // Mostramos el prompt de instalacion
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("InstallApp", true);
      } else {
        localStorage.setItem("InstallApp", false);
      }
    });
  };

  return (
    <div className="w-dvw px-10 border flex items-center justify-center  ">
      {!window.matchMedia("(display-mode: standalone)").matches &&
      deferredPrompt === null ? (
        <button
          className="bg-background-app hover:bg-background-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md  active:text-white/80 active:scale-90 transition-transform transform flex items-center border border-opacity-1o border-secondary-blue-app border-dashed gap-2 justify-center fixed bottom-20 z-50 w-[85%] text-xs opacity-80 active:opacity-100 animate-expand-btn-2 "
          title="Instalar Timeschedule "
          onClick={handleInstallClick}
        >
          <img src="/icon.webp" alt="logo" className="w-4 h-4 rounded-full" />
          <span>Instala la Timeschedule en tu dispositivo</span>
        </button>
      ) : null}
    </div>
  );
};

export default BtnIntallApp;
