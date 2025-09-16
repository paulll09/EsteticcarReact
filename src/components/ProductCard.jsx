import { Link } from "react-router-dom";
import { formatARS } from "../utils/format.js";

export default function ProductCard({ producto }) {
  return (
    <article className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-red-600/40 hover:shadow-[0_10px_30px_-15px_rgba(239,68,68,0.4)] transition">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="h-44 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-white">{producto.nombre}</h3>
        <p className="text-red-500 font-bold">{formatARS(producto.precio)}</p>

        <p className="text-sm text-neutral-300">
          Stock:{" "}
          <b className={producto.stock > 0 ? "text-emerald-400" : "text-red-400"}>
            {producto.stock}
          </b>{" "}
          · Código: <b className="text-neutral-200">{producto.codigo}</b>
        </p>

        <Link
          to={`/productos/${producto.id}`}
          className="inline-block mt-2 w-full text-center bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
