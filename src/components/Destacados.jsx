import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function Destacados({
  items = [],
  title = "Destacados",
  subtitle = "Modelos seleccionados y listos para entrega inmediata.",
  ctaHref = "/productos",
  ctaText = "Ver todos",
}) {
  return (
    <section className="relative">
      {/* Fondo sutil con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black-100 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-red-400 bg-red-500/10 px-2 py-1 rounded">
              Selección de la semana
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-neutral-400">{subtitle}</p>}
          </div>

        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, idx) => (
              <div
                key={p.id}
                className={`hover-lift animate-scale-in ${
                  idx % 3 === 1 ? "animate-delay-100" : idx % 3 === 2 ? "animate-delay-200" : ""
                }`}
              >
                <div className="hover-zoom-img">
                  <ProductCard producto={p} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-400 mt-6 animate-fade-in">
            No hay productos destacados por el momento.
          </p>
        )}

        {/* CTA inferior opcional */}
        {ctaHref && (
          <div className="text-center mt-10">
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              Ver el catálogo completo
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M10 17l5-5-5-5v10z" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
