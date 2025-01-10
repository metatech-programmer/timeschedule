import { useEffect } from "react";

const Notificaciones = () => {
  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    console.log("Verificando soporte de notificaciones...");
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Permiso de notificación:", permission);
      });
    }
  }, []);
  return <></>;
};

export default Notificaciones;
