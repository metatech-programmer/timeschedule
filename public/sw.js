self.addEventListener("sync", (event) => {
    if (event.tag === "enviar-notificacion") {
        event.waitUntil(
            mostrarNotificacion('Sincronización', 'La sincronización se ha completado correctamente.')
        );
    }
});

function mostrarNotificacion(titulo, mensaje) {
   self.registration.showNotification(titulo, {
        body: mensaje,
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
    });
}