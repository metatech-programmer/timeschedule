import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import AcercaDe from "./pages/AcercaDe";
import ScheduleManager from "./pages/ScheduleManager";
import Thanks from "./pages/Thanks";
import Wrong from "./pages/Wrong";
import BtnIntallApp from "./components/BtnInstallApp";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);


  navigator.serviceWorker.ready.then((registration) => {
    registration.sync.register("proximasMaterias").then(() => {
      console.log("Sync registration successful");
    }).catch((error) => {
      console.error("Sync registration failed:", error);
    })
    })

  /* -------------------------------------------------------------- */
  const mostrarNotificacion = (titulo, mensaje) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(titulo, {
          body: mensaje,
          tag: "proximasMaterias",
          icon: "https://avatar.iran.liara.run/public",
        });
      });
    }
  };

  const handleNotificationClick = () => {
    mostrarNotificacion("Timeschedule", "Gracias por usar Timeschedule!");
  };

  /* -------------------------------------------------------------- */

  function requestNotificationPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permiso de notificaciones concedido");
          registerServiceWorker();
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });
    } else {
      console.log("El navegador no soporta notificaciones");
    }
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
          console.log("Service Worker registrado:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
    }
  }

  return (
    <div className="w-dvw h-dvh bg-background-app overflow-y-scroll relative ">
      <BtnIntallApp />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manager" element={<ScheduleManager />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<AcercaDe />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/wrong" element={<Wrong />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
