import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "./Menu";
import InstallApp from "./InstallApp";
import { SvgDownload, SvgArrowRight, SvgBolt, SvgBell, SvgMobile, SvgWifi, SvgCheckCircle, SvgCoffee } from "../components/Icons";

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

  const features = [
    { icon: SvgMobile, label: "Interfaz intuitiva y fácil de navegar" },
    { icon: SvgBolt, label: "Personalización total de tu horario" },
    { icon: SvgCheckCircle, label: "Visualización en varios formatos" },
    { icon: SvgWifi, label: "Funciona sin conexión a internet" },
    { icon: SvgBell, label: "Notificaciones de clase en tiempo real" },
  ];

  return (
    <>
      <Menu />
      <InstallApp />
      <div className="min-h-dvh bg-background-app pb-28 md:hidden animate-slide-up" id="top">

        {/* Header */}
        <div className="px-5 pt-8 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <img src="/icon.webp" alt="logo" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Timeschedule</h1>
              <p className="text-muted-app text-xs">Tu horario, siempre contigo</p>
            </div>
          </div>
          <p className="text-quaternary-gray-app/80 text-sm text-balance leading-relaxed">
            App web gratuita e intuitiva diseñada para estudiantes que quieren
            organizar su semana sin complicaciones.
          </p>
        </div>

        {/* Install CTA */}
        {!isStandalone && !installed && deferredPrompt && (
          <div className="px-5 mb-5">
            <button
              className="btn-primary w-full flex items-center justify-center gap-2"
              onClick={handleInstallClick}
            >
            <SvgDownload /> Instalar en mi dispositivo
            </button>
          </div>
        )}

        {!isStandalone && installed && !deferredPrompt && (
          <div className="px-5 mb-5 space-y-3">
            <p className="glass-card text-muted-app text-xs rounded-2xl p-3 text-center">
              ✅ Ya tienes Timeschedule instalada. ¡Disfruta tu horario!
            </p>
            <a
              className="btn-secondary flex items-center justify-center gap-2"
              href="https://timeschedulee.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Timeschedule <SvgArrowRight />
            </a>
          </div>
        )}

        {/* Features */}
        <div className="px-5 mb-6">
          <h2 className="text-xs font-semibold text-muted-app uppercase tracking-widest mb-3">
            Características
          </h2>
          <div className="space-y-2">
            {features.map(({ icon: Icon, label }, i) => (
              <div key={label}
                className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-8 h-8 rounded-xl bg-primary-orange-app/10 flex items-center justify-center flex-shrink-0">
                  <span className="animate-wiggle inline-block" style={{ animationDelay: `${i * 0.15}s` }}>
                    <Icon className="text-primary-orange-app text-sm" />
                  </span>
                </div>
                <span className="text-quaternary-gray-app/90 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="px-5 mb-6">
          <h2 className="text-xs font-semibold text-muted-app uppercase tracking-widest mb-3">
            Misión
          </h2>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-quaternary-gray-app/80 text-sm leading-relaxed">
              Proporcionar una herramienta que permita a los estudiantes maximizar
              su productividad y aprovechar al máximo su tiempo cada día.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="px-5 mb-6">
          <h2 className="text-xs font-semibold text-muted-app uppercase tracking-widest mb-3">
            Contacto
          </h2>
          <div className="glass-card rounded-2xl p-4 border border-primary-orange-app/20">
            <p className="text-quaternary-gray-app/80 text-sm text-center">
              ¿Tienes alguna sugerencia?{" "}
              <a
                href="mailto:metatech000@gmail.com?subject=Timeschedule%20-%20Sugerencia"
                className="text-primary-orange-app underline underline-offset-2"
              >
                metatech000@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Donation */}
        <div className="px-5 mb-6">
          <div className="glass-card rounded-2xl p-5 text-center space-y-3 border border-primary-orange-app/20">
            <p className="text-muted-app text-xs uppercase tracking-widest">Apoya el proyecto</p>
            <p className="text-quaternary-gray-app/70 text-xs text-balance">
              No es obligatorio, pero cada contribución ayuda a seguir desarrollando
              herramientas como esta. ¡Gracias! ☕
            </p>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=NNJTTX9YPTP4C"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 px-5 rounded-full font-bold text-sm active:scale-95 transition-transform"
            >
              Donar un café <SvgCoffee className="animate-pulse" />
            </a>
          </div>
        </div>

        <Footer className="pb-4" />
      </div>
    </>
  );
};

export default AcercaDe;
