import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import AcercaDe from "./pages/AcercaDe";
import ScheduleManager from "./pages/ScheduleManager";
import Thanks from "./pages/Thanks";
import Wrong from "./pages/Wrong";
import BtnIntallApp from "./components/BtnInstallApp";
import "./App.css";

function App() {
  const mostrarNotificacion = (titulo, mensaje) => {
    if (Notification.permission === "granted") {
      new Notification(titulo, {
        body: mensaje,
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
      });
    }
  };

  const handleNotificationClick = () => {
    mostrarNotificacion("Timeschedule", "Gracias por usar Timeschedule!");
  };

  return (
    <div className="w-dvw h-dvh bg-background-app overflow-y-scroll relative ">
      <button
        onClick={handleNotificationClick}
        className="fixed bottom-4 hidden md:block right-4 bg-primary-orange-app text-white py-2 px-4 rounded-full z-[9999] hover:bg-primary-orange-app/80 transition duration-300 ease-in-out"
      >
        Notificar
      </button>
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
