import { useParams, Link } from "react-router-dom";
import productos from "../data/products.js";
import { formatARS } from "../utils/format.js";

export default function DetalleProducto() {
  const { id } = useParams();
  const p = productos.find((x) => x.id === id);

  if (!p) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <p className="text-neutral-300">Producto no encontrado.</p>
        <Link to="/productos" className="text-red-400 underline">Volver</Link>
      </main>
    );
  }

  const rows = [
    ["Código", p.codigo],
    ["Marca", p.marca],
    ["Modelo", p.modelo],
    ["Año", p.año],
    ["Kilometraje", p.kilometraje],
    ["Combustible", p.combustible],
    ["Transmisión", p.transmision],
    ["Puertas", p.puertas],
    ["Color", p.color],
  ].filter(([, v]) => v !== undefined && v !== null && v !== "");

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.imagen}
          alt={p.nombre}
          className="w-full h-72 md:h-96 object-cover rounded-xl"
        />

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{p.nombre}</h1>
          <p className="text-red-400 text-xl font-bold">{formatARS(p.precio)}</p>

          <div className="text-sm text-neutral-300 space-y-1">
            <p>
              Stock:{" "}
              <b className={p.stock > 0 ? "text-emerald-400" : "text-red-400"}>
                {p.stock}
              </b>
            </p>

            {rows.map(([k, v]) => (
              <p key={k}>
                {k}: <b className="text-neutral-100">{String(v)}</b>
              </p>
            ))}
          </div>

          <Link
            to="/productos"
            className="inline-block mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
