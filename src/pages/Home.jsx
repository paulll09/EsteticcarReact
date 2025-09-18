import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import productos from "../data/products.js";
import Ubicacion from "../components/Ubicacion.jsx";

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <main>
      {/* Hero pantalla completa (menos el header de 4rem) */}
      <section className="relative min-h-[calc(100vh-4rem)]">
        {/* Imagen de fondo */}
        <img
          src="/img/bannerfinal.png"
          alt="Concesionaria"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Contenido centrado */}
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold animate-fade-in-up will-change-transform">
                Encontrá tu próximo auto
              </h1>

                <h3 className="mt-5 md:text-2xl text-white/90 animate-fade-in-up animate-delay-200 will-change-transform">
              Entrega mínima, Saldo en cuotas fijas por banco, ¡Y financiamos el 50% solo con tu DNI!
              </h3>

              <p className="mt-6 text-white/90 animate-fade-in-up animate-delay-200 will-change-transform">
                Vehículos seleccionados y verificados.
              </p>

              <Link
                to="/productos"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded hover:opacity-90 transition animate-fade-in-up animate-delay-400 will-change-transform"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Destacados</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
      <Ubicacion />
    </main>
  );
}


