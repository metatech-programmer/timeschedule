self.addEventListener("sync", (event) => {
    if (event.tag === "enviar-notificacion") {
        event.waitUntil(
            mostrarNotificacion('Sincronización', 'La sincronización se ha completado correctamente.')
        );
    }
});

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
});


function mostrarNotificacion(titulo, mensaje) {
    self.registration.showNotification(titulo, {
        body: mensaje,
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
    });
}