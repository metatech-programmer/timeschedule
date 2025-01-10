import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import AcercaDe from "./pages/AcercaDe";
import ScheduleManager from "./pages/ScheduleManager";
import Thanks from "./pages/Thanks";
import Wrong from "./pages/Wrong";
import BtnIntallApp from "./components/BtnInstallApp";
import "./App.css";
import Notificaciones from "./components/Notificaciones";

function App() {
/*   const mostrarNotificacion = (titulo, mensaje) => {
    if (Notification.permission === "granted") {
      console.log("Notificaciones permitidas");
      new Notification(titulo, {
        body: mensaje,
        icon: "https://cdn.pixabay.com/photo/2020/12/20/04/06/man-5846064_1280.jpg",
      });
    }
  }; */


  return (
    <div className="w-dvw h-dvh bg-background-app overflow-y-scroll relative ">
     
      <Notificaciones />
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
