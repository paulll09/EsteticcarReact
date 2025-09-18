import { useState } from "react";
import productos from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");

  const lista = productos.filter((p) => {
    const s = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(s) ||
      p.codigo.toLowerCase().includes(s)
    );
  });

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero interno */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 py-7 text-center text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold animate-fade-in-up">
          Nuestro catálogo
        </h1>
        <p className="mt-2 text-white/80 animate-fade-in animate-delay-200">
          Explorá los vehículos disponibles y encontrá el ideal para vos.
        </p>
      </section>

      {/* Buscador */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-semibold text-white">Productos</h2>

          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-2.5 text-neutral-400">🔍</span>
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o código…"
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-9 py-2 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
        </div>

        {/* Grid productos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p, idx) => (
            <div
              key={p.id}
              className={`hover-lift animate-scale-in ${
                idx % 3 === 1
                  ? "animate-delay-100"
                  : idx % 3 === 2
                  ? "animate-delay-200"
                  : ""
              }`}
            >
              <ProductCard producto={p} />
            </div>
          ))}
        </div>

        {lista.length === 0 && (
          <p className="text-center text-neutral-400 mt-10 animate-fade-in">
            No hay resultados para <b>{busqueda}</b>.
          </p>
        )}
      </div>
    </main>
  );
}
