import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import AppDB from "./AppDB";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-dvw h-dvh bg-background-app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/apiDb" element={<AppDB />} />

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
