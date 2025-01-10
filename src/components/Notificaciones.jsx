import { useEffect } from "react";

const Notificaciones = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Permiso de notificación:", permission);
      });
    }
  }, []);
  return <div>Notificaciones</div>;
};

export default Notificaciones;
