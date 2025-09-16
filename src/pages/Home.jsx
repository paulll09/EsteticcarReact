import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import productos from "../data/products.js";

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <main>
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
              <h1 className="text-4xl md:text-5xl font-extrabold">
                Encontrá tu próximo auto
              </h1>
              <p className="mt-3 text-white/90">
                Vehículos seleccionados y verificados.
              </p>
              <Link
                to="/productos"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 transition"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-red-500 p-4">Destacados</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </main>
  );
}


