// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header />

      {/* Deja este padding para que el contenido no quede debajo del header fijo */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


