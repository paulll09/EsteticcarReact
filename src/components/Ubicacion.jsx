// src/components/UbicacionSection.jsx
export default function Ubicacion() {
  // 👉 Cambiá esta dirección por la real del local
  const address = "Av. González Lelong y Eva Perón";

  // URLs para el iframe y para abrir Google Maps en una pestaña nueva
  const q = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?q=${q}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">¿Dónde estamos?</h2>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Mapa */}
        <div className="md:col-span-3 animate-fade-in-up">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
            {/* 16:9 con padding-top */}
            <div className="relative w-full pt-[56.25%]">
              <iframe
                title="Mapa Esteticcar"
                src={mapSrc}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Datos / horarios */}
        <div className="md:col-span-2 bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-3 animate-fade-in-up animate-delay-200">
          <h3 className="text-lg font-semibold text-white">Esteticcar Automotores</h3>

          <p className="text-neutral-300">
            <span className="mr-1">📍</span>
            {address}
          </p>

          <p className="text-neutral-300">
            <span className="mr-1">🕒</span>
            Lunes a Sábados — 8:00 a 12:00 y 16:00 a 20:00
          </p>

          {/* Cambiá el teléfono si querés mostrarlo */}
          <p className="text-neutral-400 text-sm">
            Tel.:{" "}
            <a href="tel:+549000000000" className="text-red-400 hover:text-red-300">
              +54 9 000 000 000
            </a>
          </p>

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
          >
            Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
