import { useState, useRef } from "react";

export default function Ubicacion() {
  const sucursales = [
    {
      nombre: "Esteticcar Automotores - Casa Central",
      address: "Car Aesthetics 2, 3636, Formosa",
      phone: "5493790000000",
      displayPhone: "+54 9 379 000 0000",
      horario: "Lunes a Sábados — 8:00 a 12:00 y 16:00 a 20:00",
    },
    {
      nombre: "Esteticcar Automotores - Sucursal",
      address: "Av. González Lelong y Eva Perón, Formosa",
      phone: "5493791111111",
      displayPhone: "+54 9 379 111 1111",
      horario: "Lunes a Sábados — 8:00 a 12:00 y 16:00 a 20:00",
    },
    // Podés agregar más objetos aquí
  ];

  const [idx, setIdx] = useState(0);
  const total = sucursales.length;

  const go = (i) => setIdx((i + total) % total);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // Accesibilidad/teclado
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Swipe móvil
  const touchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
  };

  const s = sucursales[idx];
  const q = encodeURIComponent(s.address);
  const mapSrc = `https://www.google.com/maps?q=${q}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const waUrl = `https://wa.me/${s.phone}?text=Hola, quiero consultar sobre autos`;
  const telHref = `tel:${s.displayPhone.replace(/[^+\d]/g, "")}`;

  return (
    <section
      className="relative bg-black text-white"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 to-black/90 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-14">
        <header className="text-center mb-8">
          <p className="text-red-600 font-semibold uppercase tracking-wide">
            Nuestras sucursales
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            ¿Dónde estamos?
          </h2>
        </header>

        {/* Carrusel */}
        <div className="relative">
          {/* Contenido activo (mapa + info) */}
          <div
            className="grid md:grid-cols-5 gap-6 items-stretch"
            aria-live="polite"
          >
            {/* Mapa */}
            <div className="md:col-span-3">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <div className="relative w-full pt-[56.25%] bg-neutral-900">
                  <iframe
                    title={`Mapa ${s.nombre}`}
                    src={mapSrc}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="absolute left-3 top-3 bg-black/60 text-white text-[12px] px-2 py-1 rounded-md backdrop-blur">
                  📍 {s.address}
                </div>
              </div>
            </div>

            {/* Info */}
            <aside className="md:col-span-2 p-6 space-y-4 bg-neutral-900/40 rounded-xl">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
                {s.nombre}
              </h3>

              <ul className="space-y-2 text-neutral-300">
                <li>📍 {s.address}</li>
                <li>🕒 {s.horario}</li>
                <li>
                  📞{" "}
                  <a
                    href={telHref}
                    className="text-white hover:text-red-300 transition"
                  >
                    {s.displayPhone}
                  </a>
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Google Maps
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  WhatsApp
                </a>
              </div>
            </aside>
          </div>

          {/* Flechas */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
              >
                ›
              </button>
            </>
          )}

          {/* Puntos */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {sucursales.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Ir a sucursal ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === idx ? "w-6 bg-red-500" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Miniaturas / Tabs horizontales (opcional) */}
        {total > 1 && (
          <div className="mt-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {sucursales.map((x, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`px-3 py-2 rounded-lg border text-sm transition ${
                    i === idx
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-neutral-900/40 text-neutral-200 border-white/10 hover:border-white/30"
                  }`}
                >
                  {x.nombre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
