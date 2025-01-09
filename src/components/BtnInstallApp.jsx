import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const BtnInstallApp = () => {
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
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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

  if (isStandalone || installed || !deferredPrompt) return null;

  return (
    <div className="w-dvw px-10 border flex items-center justify-center md:hidden z-[70]" >
      <button
        className="bg-background-app hover:bg-background-app/90 text-white font-bold py-2 px-4 rounded-lg shadow-md active:scale-90 transition-transform flex items-center justify-center gap-2 fixed bottom-20 z-50 w-[85%] text-xs opacity-80 animate-expand-btn-2 border border-dashed border-secondary-blue-app/70 "
        title="Instalar Timeschedule"
        onClick={handleInstallClick}
      >
        <img src="/icon.webp" alt="logo" className="w-4 h-4 rounded-full " />
        <span>Instala la Timeschedule en tu dispositivo</span>
      </button>
    </div>
  );
};

export default BtnInstallApp;
