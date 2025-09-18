import { Link } from "react-router-dom";
import productos from "../data/products.js";
import Ubicacion from "../components/Ubicacion.jsx";
import SectionElegir from "../components/SectionElegir.jsx";
import Destacados from "../components/Destacados.jsx";

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)]">
        <img
          src="/img/bannerfinal.png"
          alt="Concesionaria"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold animate-fade-in-up">
                Encontrá tu próximo auto
              </h1>
              <p className="mt-6 text-white/90 animate-fade-in animate-delay-200">
                Vehículos seleccionados y verificados.
              </p>
              <Link
                to="/productos"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded btn-primary-glow animate-fade-in-up animate-delay-400"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Por qué nos eligen? */}
      <SectionElegir />

      {/* Destacados (componente) */}
      <Destacados items={destacados} />

      <Ubicacion />
    </main>
  );
}