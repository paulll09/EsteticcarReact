import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ubicacion from "../components/Ubicacion.jsx";
import SectionElegir from "../components/SectionElegir.jsx";
import Destacados from "../components/Destacados.jsx";
import { listAutos } from "../api";
import Marcas from "../components/Marcas.jsx";

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await listAutos({
          destacado: 1,
          page: 1,
          limit: 6,
          sort: "created_at desc",
        });
        if (alive) setDestacados(Array.isArray(data?.items) ? data.items : []);
      } catch {
        if (alive) setErr("No se pudieron cargar los destacados");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <main className="bg-black text-white">
      {/* Metadatos */}
      <title>Esteticcar Automotores</title>
      <meta name="description" content="Autos seleccionados y verificados. Encontrá tu próximo vehículo con Esteticcar Automotores." />
      <meta property="og:title" content="Esteticcar Automotores" />
      <meta property="og:description" content="Compra y venta de autos seleccionados y verificados. Mirá nuestros destacados." />
      <meta property="og:image" content="/img/interiorAuto.jpg" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* ========= HERO limpio, sin gradiente ========= */}
      <section className="relative min-h-[calc(100vh-4rem)] pt-[env(safe-area-inset-top)]">
        {/* Imagen con movimiento */}
        <img
          src="/img/banneragencia.jpg"
          alt="Concesionaria"
          className="absolute inset-0 h-full w-full object-cover animate-hero-kenburns will-change-transform"
        />

        {/* Contenido centrado y animado */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center text-center px-6">
          <div>
            <h1
              className="
                font-extrabold text-glow-hero hero-reveal
                [font-size:clamp(2rem,6vw,3.5rem)]
              "
            >
              Encontrá tu próximo auto
            </h1>

            <p
              className="
                mt-3 md:mt-4 text-white/95 text-glow-hero-sub hero-reveal delay-150
                [font-size:clamp(1rem,3vw,1.25rem)]
              "
            >
              Vehículos seleccionados y verificados.
            </p>

            <Link
              to="/productos"
              className="inline-block mt-5 md:mt-6 bg-red-600 text-white px-6 py-3 rounded btn-primary-glow hero-reveal delay-300"
            >
              Ver vehículos
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones */}
      <SectionElegir />
      <Marcas />

      {/* Destacados */}
      {loading && (
        <p className="text-center text-neutral-400 py-6">Cargando destacados…</p>
      )}
      {err && <p className="text-center text-rose-400 py-6">{err}</p>}
      {!loading && !err && <Destacados items={destacados} />}

      <Ubicacion />
    </main>
  );
}
