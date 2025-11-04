import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Admin from "./pages/Admin.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";
import BackToTop from "./components/BackToTop.jsx";
import Contactanos from "./pages/Contactanos.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Header />
      <div className="pt-16 min-h-screen bg-neutral-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contactanos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
        </Routes>
      </div>

    <BackToTop />

      <Footer />

      <Toaster
        containerId="main"                // 👈 ÚNICO contenedor
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            fontSize: "15px",
            borderRadius: "8px",
            padding: "12px 18px",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#1f2937" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#1f2937" } },
        }}
      />
    </>
  );
}
