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
import { leerMateriaDiaHora } from "../db";

function App() {
  const getDiaHora = () => {
    const now = new Date();
    const dia = now.toLocaleDateString("es-CO", { weekday: "long" });
    const horaStr = `${now.getHours() + 1}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return { dia, horaStr };
  };

  /* -------------------------------------------------------------- */
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
    const { dia, horaStr } = getDiaHora();

    leerMateriaDiaHora(dia, horaStr).then((materiasDiaHora) => {
      if (materiasDiaHora.length > 0) {
        mostrarNotificacion(
          "Timeschedule",
          "Revisa tu horario en vivo, ¡hay un nuevo item!"
        );
      }
    })
  }, []);

  /* -------------------------------------------------------------- */
  const mostrarNotificacion = (titulo, mensaje) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(titulo, {
          body: mensaje,
          tag: "proximasMaterias",
          badge: "https://avatar.iran.liara.run/public",
          icon: "./icon.webp",
          silent: false,
          renotify: true,
          vibrate: [100, 50, 100],
          actions: [
            { action: "ver", title: "Ver detalles" },
            { action: "cerrar", title: "Cerrar" },
          ],
        });
      });
    }
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
