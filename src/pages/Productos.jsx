import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { listAutos } from "../api";

// Marcas disponibles para el filtro (ajustá según tu base)
const MARCAS = [
  "Chevrolet",
  "Toyota",
  "Volkswagen",
  "Ford",
  "Peugeot",
  "Renault",
  "Fiat",
  "Nissan",
];

export default function Productos() {
  // Leer ?marca= de la URL y aplicarla como filtro inicial
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const marcaURL = searchParams.get("marca") || "";

  const [q, setQ] = useState("");
  const [marca, setMarca] = useState(marcaURL);
  const [orden, setOrden] = useState("created_at desc"); // mismo contrato que tu API
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Si cambia la URL (por ejemplo al clickear un logo /productos?marca=Ford), sincronizamos el filtro
  useEffect(() => {
    setMarca(marcaURL);
    setPage(1);
  }, [marcaURL]);

  // Fetch a la API cuando cambian filtros/página/orden
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const data = await listAutos({
          q: q || undefined,
          marca: marca || undefined,
          page,
          limit: 12,
          sort: orden, // e.g. "created_at desc" | "precio asc" | "precio desc" | "anio desc"
        });

        if (!alive) return;
        setItems(Array.isArray(data?.items) ? data.items : []);
        setTotal(Number(data?.total || 0));
        setPages(Number(data?.pages || 1));
      } catch (e) {
        if (!alive) return;
        setErr("No se pudieron cargar los vehículos.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [q, marca, page, orden]);

  const headerTitle = useMemo(() => {
    return marca ? `Vehículos — ${marca}` : "Catálogo de vehículos";
  }, [marca]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Metadatos (React 19) */}
      <title>Catálogo | Esteticcar Automotores</title>
      <meta
        name="description"
        content="Explorá el catálogo de Esteticcar: autos seleccionados, verificados y listos para vos. Filtrá por marca y ordená por precio o novedad."
      />
      <meta property="og:title" content="Catálogo | Esteticcar Automotores" />
      <meta
        property="og:description"
        content="Buscá por marca o modelo y encontrá tu próximo auto en Esteticcar."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={typeof window !== "undefined" ? window.location.href : ""}
      />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Encabezado */}
      <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 py-8 text-center shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold">{headerTitle}</h1>
        <p className="mt-2 text-white/80">
          {total} resultado{total === 1 ? "" : "s"} encontrados
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por marca, modelo o código…"
              className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={marca}
              onChange={(e) => {
                setMarca(e.target.value);
                setPage(1);
              }}
              className="bg-neutral-900 border border-white/10 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Todas las marcas</option>
              {MARCAS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={orden}
              onChange={(e) => {
                setOrden(e.target.value);
                setPage(1);
              }}
              className="bg-neutral-900 border border-white/10 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="created_at desc">Más recientes</option>
              <option value="precio asc">Precio (menor a mayor)</option>
              <option value="precio desc">Precio (mayor a menor)</option>
              <option value="anio desc">Año (nuevo a viejo)</option>
              <option value="anio asc">Año (viejo a nuevo)</option>
            </select>
          </div>
        </div>

        {/* Listado */}
        {loading && <p className="text-neutral-400">Cargando…</p>}
        {err && <p className="text-rose-400">{err}</p>}

        {!loading && !err && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>

            {items.length === 0 && (
              <p className="text-center text-neutral-400 mt-10">
                No hay resultados.
              </p>
            )}

            {/* Paginación */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((x) => Math.max(1, x - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-neutral-900 text-white border border-white/10 disabled:opacity-50"
                >
                  ← Anterior
                </button>
                <span className="text-neutral-400 text-sm">
                  Página {page} de {pages}
                </span>
                <button
                  onClick={() => setPage((x) => Math.min(pages, x + 1))}
                  disabled={page === pages}
                  className="px-3 py-1 rounded bg-neutral-900 text-white border border-white/10 disabled:opacity-50"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
