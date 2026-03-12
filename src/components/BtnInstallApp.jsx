import { useEffect, useState } from "react";
import { SvgDownload } from "./Icons";

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
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-[70] px-6 md:hidden">
      <button
        className="glass-card flex items-center gap-3 py-3 px-5 rounded-2xl glow-teal border border-secondary-blue-app/40 active:scale-95 transition-all animate-slide-up max-w-xs w-full"
        title="Instalar Timeschedule"
        onClick={handleInstallClick}
      >
        <img src="/icon.webp" alt="logo" className="w-7 h-7 rounded-full" />
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold text-quaternary-gray-app">Instalar Timeschedule</p>
          <p className="text-[0.6rem] text-muted-app">Acceso rápido desde tu pantalla</p>
        </div>
        <SvgDownload size={14} className="text-secondary-blue-app flex-shrink-0" />
      </button>
    </div>
  );
};

export default BtnInstallApp;
