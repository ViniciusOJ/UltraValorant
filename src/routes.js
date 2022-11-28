import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exercicio from "./pages/Personagens";
import Header from "./components/Header";
import Home from "./pages/Home";
import Erro from "./pages/Erro";
import Favoritos from "./pages/Favoritos";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agentes/:id" element={<Exercicio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
