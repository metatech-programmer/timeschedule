import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const BtnIntallApp = () => {
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
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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
    <div className="w-dvw px-10 border flex items-center justify-center md:hidden ">
      {!window.matchMedia("(display-mode: standalone)").matches &&
      !installed && deferredPrompt ? (
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
