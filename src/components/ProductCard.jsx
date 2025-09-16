import { Link } from "react-router-dom";
import { formatARS } from "../utils/format.js";

export default function ProductCard({ producto }) {
  return (
    <article className="border rounded-xl overflow-hidden bg-black">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="h-44 w-full object-cover"
      />
      <div className="p-4 space-y-">
        <h3 className="font-semibold">{producto.nombre}</h3>
        <p className="text-red-600 font-bold">{formatARS(producto.precio)}</p>

        <p className="text-sm text-white">
          Stock: <b className={producto.stock > 0 ? "text-green-600" : "text-red-600"}>
            {producto.stock}
          </b>{" "}
          · Código: <b>{producto.codigo}</b>
        </p>

        <Link
          to={`/productos/${producto.id}`}
          className="inline-block mt-2 w-full text-center bg-red-600 text-white py-2 rounded hover:opacity-90"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
