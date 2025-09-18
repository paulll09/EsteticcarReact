// src/components/Ubicacion.jsx
export default function Ubicacion() {
  // 📍 Datos editables
  const address = "Av. González Lelong y Eva Perón"; // Cambiá por la dirección real
  const phone = "5493790000000"; // WhatsApp en formato internacional sin + ni espacios
  const displayPhone = "+54 9 379 000 0000"; // cómo se muestra en pantalla
  const waMsg = "Hola, quiero consultar o agendar una visita";

  // 🔗 URLs
  const q = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?q=${q}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMsg)}`;
  const telHref = `tel:${displayPhone.replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative">
      {/* franja de fondo muy sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 to-black-100  pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-14">
        {/* Encabezado */}
        <header className="text-center mb-10">
          <p className="text-red-600 font-semibold uppercase tracking-wide animate-fade-in">
            Visitá nuestra agencia
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 animate-fade-in-up">
            ¿Dónde estamos?
          </h2>
          <p className="text-neutral-300 mt-2 animate-fade-in animate-delay-200">
            Encontranos fácil y coordiná tu visita.
          </p>
        </header>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Mapa */}
          <div className="md:col-span-3 animate-fade-in-up">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-lg hover-lift">
              {/* 16:9 */}
              <div className="relative w-full pt-[56.25%] bg-neutral-900">
                <iframe
                  title="Mapa Esteticcar"
                  src={mapSrc}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Placa con dirección arriba del mapa */}
              <div className="absolute left-3 top-3 bg-black/60 text-white text-[12px] px-2 py-1 rounded-md backdrop-blur">
                <span className="align-middle mr-1">📍</span>
                {address}
              </div>
            </div>
          </div>

          {/* Panel de datos / horarios / acciones */}
          <aside className="md:col-span-2 panel-soft p-6 space-y-4 animate-fade-in-up animate-delay-200">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-600 animate-scale-in" />
              Esteticcar Automotores
            </h3>

            <ul className="space-y-2 text-neutral-300">
              <li className="flex gap-2">
                <span>📍</span>
                <span>{address}</span>
              </li>
              <li className="flex gap-2">
                <span>🕒</span>
                <span>Lunes a Sábados — 8:00 a 12:00 y 16:00 a 20:00</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href={telHref} className="text-white hover:text-red-300 transition">
                  {displayPhone}
                </a>
              </li>
            </ul>

            {/* Acciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Abrir en Google Maps
              </a>

            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}
