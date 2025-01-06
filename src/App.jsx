import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Footer from "./components/Footer";
import AcercaDe from "./pages/AcercaDe";

function App() {
  return (
    <div className="w-dvw h-dvh bg-background-app ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<AcercaDe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
