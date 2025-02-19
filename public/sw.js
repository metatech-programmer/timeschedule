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
                            tag: "proximasMaterias",
                            actions: [
                                { action: "ver", title: "Ver detalles" },
                                { action: "cerrar", title: "Cerrar" },
                            ],
                            data: {
                                dateOfArrival: Date.now(),
                                primaryKey: 1,
                            },
                            badge: "https://avatar.iran.liara.run/public"

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

});


/* Push Notifications */

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "./icon.webp",
        vibrate: [100, 50, 100],
        silent: false,
        requireInteraction: true,
        actions: [
            { action: "ver", title: "Ver detalles" },
            { action: "cerrar", title: "Cerrar" },

        ],
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
