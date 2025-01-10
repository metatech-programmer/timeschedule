import { leerMateriaDiaHora } from "../db";

/* Data Sync */
const dia = new Date().toLocaleDateString("es-CO", { weekday: "long" });
const horaStr = (new Date().getHours() + 1) + ":" + (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes());


self.addEventListener("sync", (event) => {
    if (event.tag === "proximasMaterias") {
        event.waitUntil(
            leerMateriaDiaHora(dia, horaStr)
                .then(() => {
                    (data) => {
                        if (data) {
                            self.registration.showNotification("Timeschedule", {
                                body: "Revisa tú horario en vivo, hay un nuevo item!",
                                icon: "https://avatar.iran.liara.run/public",
                            });
                        }
                    }
                })
        );
    }
});


/* Push Notifications */

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        badge: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
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
