import { leerMateriaDiaHora } from "../db";

/* Data Sync */
const getDiaHora = () => {
    const now = new Date();
    const dia = now.toLocaleDateString("es-CO", { weekday: "long" });
    const horaStr = `${now.getHours() + 1}:${now.getMinutes().toString().padStart(2, "0")}`;
    return { dia, horaStr };
};


self.addEventListener("sync", (event) => {
    if (event.tag === "proximasMaterias") {
        event.waitUntil(
            (async () => {
                const { dia, horaStr } = getDiaHora();
                try {
                    const data = await leerMateriaDiaHora(dia, horaStr);
                    if (data) {
                        self.registration.showNotification("Timeschedule", {
                            body: "Revisa tu horario en vivo, ¡hay un nuevo item!",
                            icon: "https://avatar.iran.liara.run/public",
                        });
                    }
                } catch (error) {
                    console.error("Error al sincronizar materias:", error);
                }
            })()
        );
    }
});

self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting().then(() => {

        return self.registration.sync.register("proximasMaterias");
    }));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
    crearAlarma("proximasMaterias", 3600000); // Una hora
    crearAlarma("recordatorioClase", 1800000); // Media hora
});


/* Push Notifications */

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "./icon.webp",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        badge: "https://avatar.iran.liara.run/public",
    };

    event.waitUntil(self.registration.showNotification("Timeschedule", options));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(self.clients.openWindow("https://timeschedule.vercel.app"));
});

function mostrarNotificacion(titulo, mensaje) {
    self.registration.showNotification(titulo, {
        body: mensaje,
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
    });
}

/* alarms notificaciones */


const crearAlarma = (tag, delay) => {
    if ("setTimeout" in self) {
        setTimeout(() => {
            self.dispatchEvent(new CustomEvent("alarms", { detail: { tag } }));
        }, delay);
    }
};

self.addEventListener("alarms", (event) => {
    if (event.detail.tag === "proximasMaterias") {
        ejecutarSincronizacionDeMaterias();
    }
});
self.addEventListener("message", (event) => {
    if (event.data.action === "activarAlarma") {
      ejecutarSincronizacionDeMaterias();
    }
  });
  
  const ejecutarSincronizacionDeMaterias = async () => {
    const { dia, horaStr } = getDiaHora();
    try {
      const data = await leerMateriaDiaHora(dia, horaStr);
      if (data) {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              action: "mostrarNotificacion",
              titulo: "Timeschedule",
              mensaje: "Revisa tu horario en vivo, ¡hay un nuevo item!",
            });
          });
        });
      }
    } catch (error) {
      console.error("Error al manejar la alarma de materias:", error);
    }
  };
  