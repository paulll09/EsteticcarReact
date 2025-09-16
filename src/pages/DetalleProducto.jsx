import { useParams, Link } from "react-router-dom";
import productos from "../data/products.js";
import { formatARS } from "../utils/format.js";

export default function DetalleProducto() {
  const { id } = useParams();
  const p = productos.find((x) => x.id === id);

  if (!p) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <p className="text-neutral-600">Producto no encontrado.</p>
        <Link to="/productos" className="text-red-600 underline">Volver</Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.imagen}
          alt={p.nombre}
          className="w-full h-72 md:h-96 object-cover rounded-xl"
        />

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{p.nombre}</h1>
          <p className="text-red-600 text-xl font-bold">{formatARS(p.precio)}</p>
          

          <div className="text-sm text-white space-y-1">
            <p>
              Stock:{" "}
              <b className={p.stock > 0 ? "text-green-600" : "text-red-600"}>
                {p.stock}
              </b>
            </p>
            <p>Código: <b>{p.codigo}</b></p>
            <p>Marca: <b>{p.marca}</b></p>
            <p>Modelo: <b>{p.modelo}</b></p>
            <p>Año: <b>{p.año}</b></p>
            <p>Kilometraje: <b>{p.kilometraje}</b></p>
            <p>Combustible: <b>{p.combustible}</b></p>
            <p>Transmisión: <b>{p.transmision}</b></p>
            <p>Puertas: <b>{p.puertas}</b></p>
            <p>Color: <b>{p.color}</b></p>
            <p></p>
          </div>

          <Link to="/productos" className="inline-block mt-2 text-black bg-red-600 p-1 ">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
