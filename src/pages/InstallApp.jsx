import React, { useState, useEffect } from "react";
import { SvgMobile, SvgClipboard } from "../components/Icons";

const InstallApp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobileDevice = () => {
      if (
        window.innerWidth <= 900 ||
        /Mobi|Android/i.test(navigator.userAgent)
      ) {
        setIsMobile(true);
      }
    };
    checkMobileDevice();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("https://timeschedulee.vercel.app/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hidden md:flex items-center justify-center h-screen w-screen bg-background-app text-white relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary-orange-app/10 blur-3xl animate-float pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary-blue-app/10 blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="glass-card rounded-3xl p-10 max-w-md w-full text-center space-y-6 relative z-10 animate-slide-up mx-6">
        <div className="w-16 h-16 rounded-2xl bg-primary-orange-app/10 flex items-center justify-center mx-auto">
          <SvgMobile className="text-primary-orange-app text-2xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gradient mb-2">Solo para móvil</h1>
          <p className="text-quaternary-gray-app/70 text-sm leading-relaxed">
            Timeschedule está diseñada para funcionar en tu smartphone.
            Ábrela desde Chrome en tu dispositivo móvil e instálala como app.
          </p>
        </div>

        {isMobile && showInstallPrompt ? (
          <button
            onClick={handleInstallClick}
            className="btn-primary w-full"
          >
            Instalar App
          </button>
        ) : (
          <button
            className="btn-secondary w-full flex items-center justify-center gap-2"
            onClick={handleCopyUrl}
          >
            {copied ? "¡Copiado! ✓" : <><SvgClipboard /> Copiar URL para móvil</>}
          </button>
        )}

        <p className="text-muted-app text-xs">timeschedulee.vercel.app</p>
      </div>
    </div>
  );
};

export default InstallApp;

