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
        <Link to="/productos" className="text-red-400 underline">
          Volver
        </Link>
      </main>
    );
  }

  // Configurá acá el WhatsApp de la empresa (formato internacional sin + ni espacios).
  // Ejemplo Argentina: +54 9 370 123 4567 => "5493701234567"
  const phone = "5493700000000";
  const baseMsg = `Quiero consultar o agendar una visita`;
  const autoInfo = ` (${p?.nombre ?? ""} • Código ${p?.codigo ?? ""})`;
  const waText = encodeURIComponent(baseMsg + autoInfo);
  const waUrl = `https://wa.me/${phone}?text=${waText}`;

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
  ].filter(([, v]) => v);

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-15">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Imagen con zoom */}
        <figure className="hover-zoom-img rounded-xl overflow-hidden shadow-lg">
          <img
            src={p.imagen}
            alt={p.nombre}
            className="w-full h-80 md:h-[28rem] object-cover img-smooth"
          />
        </figure>

        {/* Info */}
        <div className="panel-soft p-6 space-y-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {p.nombre}
          </h1>

          <p className="text-red-600 text-xl font-bold">
            {formatARS(p.precio)}
          </p>

          {/* Tabla simple */}
          <div className="text-sm text-neutral-300 space-y-1 border-t border-neutral-700 pt-3">
            {rows.map(([k, v]) => (
              <p key={k}>
                <span className="text-neutral-400">{k}:</span>{" "}
                <b className="text-white">{String(v)}</b>
              </p>
            ))}
          </div>

          {/* CTA WhatsApp */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded btn-primary-glow"
            >
              {/* ícono WhatsApp */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="currentColor" d="M12 2a10 10 0 0 0-8.8 14.9L2 22l5.3-1.1A10 10 0 1 0 12 2m0 2a8 8 0 0 1 6.9 12l-.3.4a8 8 0 0 1-11.2.6l-.5-.5l-2.7.6l.6-2.7l-.5-.5A8 8 0 0 1 12 4m-2.2 3.8c-.2 0-.5.1-.6.3c-.2.3-.6.8-.6 1.5c0 .9.6 1.8.7 1.9c.1.2 1.2 2 3 2.8c1.5.7 1.8.6 2.1.5c.4-.1 1.1-.4 1.2-.8c.1-.4.1-.7 0-.8c-.1-.1-.2-.2-.5-.4s-1-.5-1.1-.6c-.1-.1-.2-.1-.4 0s-.4.6-.5.7c-.1.1-.2.1-.4 0c-.2-.1-.8-.3-1.5-1s-1-1.5-1.1-1.7c-.1-.2 0-.3.1-.4c.1-.1.3-.3.3-.5c.1-.1 0-.3 0-.5c0-.1-.4-1.1-.6-1.4c-.1-.2-.3-.3-.5-.3"/>
              </svg>
              <span>Quiero consultar o agendar una visita</span>
            </a>

            <Link
              to="/productos"
              className="inline-flex items-center justify-center bg-red-600 text-white px-5 py-2 rounded hover:bg-neutral-700 transition"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
