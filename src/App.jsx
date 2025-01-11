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
    if (Notification.permission !== "granted") {
      requestNotificationPermission();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    navigator.serviceWorker.ready.then((registration) => {
      registration.sync.getTags().then((tags) => {
        if (!tags.includes("proximasMaterias")) {
          registration.sync
            .register("proximasMaterias")
            .then(() => {
              console.log("Sync registration successful");
            })
            .catch((error) => {
              console.error("Sync registration failed:", error);
            });
        }
      });
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let alarmaID;
    const intervalo = 60 * 60 * 1000; // 1 hora en milisegundos
    
    const programarAlarma = () => {
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then((registration) => {
          if (!alarmaID) {
            alarmaID = setInterval(() => {
              registration.active.postMessage({ action: "activarAlarma" });
              console.log("Alarma activada para verificar materias");
            }, intervalo);
          }
        });
      }
    };
  
    programarAlarma();
  
    return () => {
      if (alarmaID) {
        clearInterval(alarmaID);
      }
    };
  }, []);
  

  /* -------------------------------------------------------------- */
  const mostrarNotificacion = (titulo, mensaje) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(titulo, {
          body: mensaje,
          tag: "proximasMaterias",
          icon: "https://avatar.iran.liara.run/public",
          actions: [
            { action: "ver", title: "Ver detalles" },
            { action: "cerrar", title: "Cerrar" },
          ],
        });
      });
    }
  };

  const handleNotificationClick = () => {
    mostrarNotificacion("Timeschedule", "Gracias por usar Timeschedule!");
  };

  /* -------------------------------------------------------------- */

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission !== "granted") {
            console.warn("Notificaciones no permitidas por el usuario.");
          }
        })
        .catch((error) => {
          console.error("Error al solicitar permisos de notificación:", error);
        });
    } else {
      console.warn("Las notificaciones no son compatibles con este navegador.");
    }
  };

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
/* -------------------------------------------------------------- */
navigator.serviceWorker.addEventListener("message", (event) => {
  if (event.data && event.data.action === "mostrarNotificacion") {
    mostrarNotificacion(event.data.titulo, event.data.mensaje);
  }
});


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
