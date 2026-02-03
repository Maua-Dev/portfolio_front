import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Projects from "./pages/projects";
import Members from "./pages/members";
import Events from "./pages/events";
import NotFound from "./pages/notFound";
import HomeMobile from "./pages/homeMobile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/homeMobile" element={<HomeMobile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
