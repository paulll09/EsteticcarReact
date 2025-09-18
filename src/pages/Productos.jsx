import { useState } from "react";
import productos from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");

  // filtro sencillo por nombre o código
  const lista = productos.filter((p) => {
    const s = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(s) ||
      p.codigo.toLowerCase().includes(s)
    );
  });

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Productos</h1>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o código…"
          className="w-full sm:w-80 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-800"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>

      {lista.length === 0 && (
        <p className="text-white">No hay resultados.</p>
      )}
    </main>
  );
}
