import { useState, useEffect } from "react";

const Notificaciones = () => {
  const [permiso, setPermiso] = useState("");
  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setPermiso(permission.toLocaleLowerCase());
        console.log("Permiso de notificación:", permission);
      });
    } else {
      setPermiso("no-soportado");
    }
  }, []);
  return (
    <div>
      {permiso === "granted" ? (
        <p>Notificaciones permitidas</p>
      ) : permiso === "denied" ? (
        <p>Notificaciones denegadas</p>
      ) : permiso === "no-soportado" ? (
        <p>El navegador no soporta notificaciones</p>
      ) : (
        <p>Solicitando permiso de notificación...</p>
      )}
    </div>
  );
};

export default Notificaciones;

