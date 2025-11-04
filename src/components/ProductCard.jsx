import { Link } from "react-router-dom";
import { formatARS } from "../utils/format.js";

export default function ProductCard({ p: raw, producto }) {
  const p = raw ?? producto ?? {};

  // Toma portada; si no hay, intenta imagen/imagenes[0].url; si no, placeholder
  const img =
    p.portada ||
    p.imagen ||
    (Array.isArray(p.imagenes) && (p.imagenes[0]?.url || p.imagenes[0])) ||
    "/placeholder.jpg";

  const nombre = p.nombre || "Vehículo";
  const marca = p.marca || "—";
  const modelo = p.modelo || "—";
  const anio = p.anio ?? "—";
  const precioNum = Number(p.precio || 0);
  const id = p.id ?? "";

  return (
    <article className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-red-600/40 hover:shadow-[0_10px_30px_-15px_rgba(239,68,68,0.4)] transition">
      <img
        src={img}
        alt={nombre}
        className="h-44 w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-white">{nombre}</h3>
        <p className="text-sm text-neutral-300">
          {marca} · {modelo} · {anio}
        </p>
        <p className="text-red-500 font-bold">
          {formatARS(precioNum)}
        </p>

        {id ? (
          <Link
            to={`/productos/${id}`}
            className="inline-block mt-2 w-full text-center bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
          >
            Ver detalle
          </Link>
        ) : (
          <span className="inline-block mt-2 w-full text-center bg-neutral-700 text-white/80 py-2 rounded">
            Sin detalle
          </span>
        )}
      </div>
    </article>
  );
}
