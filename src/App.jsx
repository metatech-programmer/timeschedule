import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import AcercaDe from "./pages/AcercaDe";
import ScheduleManager from "./pages/ScheduleManager";

function App() {
  return (
    <div className="w-dvw h-dvh bg-background-app overflow-y-scroll ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manager" element={<ScheduleManager />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<AcercaDe />} />
          <Route path="/thanks" element={<AcercaDe />} />
          <Route path="/wrong" element={<AcercaDe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
