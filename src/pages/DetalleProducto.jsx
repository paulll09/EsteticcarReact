import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatARS } from "../utils/format.js";
import Ubicacion from "../components/Ubicacion.jsx";
import { getAuto } from "../api";
import { cld } from "../utils/cld.js";

const AGENCY_WHATSAPP = "543716400743";          //  ← poné el nro real con código país
const AGENCY_EMAIL = "contacto@esteticcar.com"; //  ← poné el email real

// ------- Modal reutilizable (NO TOCAR) -------
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-2xl rounded-xl border border-white/10 bg-neutral-900 p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-neutral-300 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ------- Recordatorio de financiación (NUEVO) -------
function FinancingReminder() {
  // Ícono nuevo: tarjeta de crédito (más amigable que el triángulo de advertencia)
  const CreditCardIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      className="h-5 w-5 text-red-500"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <rect x="3.75" y="9" width="16.5" height="1.8" fill="currentColor" stroke="none" />
      <rect x="5.5" y="13.25" width="5" height="1.6" rx=".4" />
    </svg>
  );

  // Bullet con tilde
  const Bullet = ({ children }) => (
    <li className="flex items-start gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="currentColor" className="mt-0.5 h-5 w-5 text-red-500 shrink-0">
        <path d="M9 16.17 5.12 12.3a1 1 0 0 0-1.41 1.41l4.59 4.59a1 1 0 0 0 1.41 0l10-10a1 1 0 1 0-1.41-1.41L9 16.17z" />
      </svg>
      <span className="text-sm text-neutral-200">{children}</span>
    </li>
  );

  return (
    <div className="financing-card financing-anim p-4 mt-4">
      <div className="financing-title">
        <CreditCardIcon />
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Opciones de financiación
        </h3>
      </div>

      <ul className="financing-list">
        <Bullet>Entrega mínima</Bullet>
        <Bullet>Saldo en <b>cuotas fijas por banco</b></Bullet>
        <Bullet>¡Financiamos el <b>50% solo con tu DNI</b>!</Bullet>
        <Bullet>Tomamos <b>usados</b> como parte de pago</Bullet>
      </ul>

      <p className="mt-3 text-xs text-neutral-400">
        * Sujeto a aprobación crediticia. Consultá condiciones y documentación requerida.
      </p>
    </div>
  );
}


// ------- Helpers de validación (NO TOCAR) -------
const emailOk = (s) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());

const phoneOk = (s) => {
  const only = String(s || "").replace(/[^\d]/g, "");
  return only.length >= 8;
};

export default function DetalleProducto() {
  const { id } = useParams();

  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [idx, setIdx] = useState(0);

  // Modal de contacto (NO TOCAR campos/validaciones)
  const [openContact, setOpenContact] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [consulta, setConsulta] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getAuto(id)
      .then((data) => {
        if (!alive) return;
        setAuto(data);
        setErr(null);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e.message || "Error cargando el auto");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => { alive = false; };
  }, [id]);

  const images = useMemo(() => {
    if (Array.isArray(auto?.imagenes) && auto.imagenes.length) {
      return auto.imagenes.map((im) => im?.url ?? im).filter(Boolean);
    }
    return auto?.portada ? [auto.portada] : [];
  }, [auto]);

  useEffect(() => { setIdx(0); }, [images.length]);

  const next = () => setIdx((i) => (images.length ? (i + 1) % images.length : 0));
  const prev = () => setIdx((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  const select = (i) => setIdx(i);

  const rows = useMemo(() => [
    ["Marca", auto?.marca],
    ["Modelo", auto?.modelo],
    ["Año", auto?.anio],
    ["Kilometraje", auto?.kilometraje],
    ["Combustible", auto?.combustible],
    ["Transmisión", auto?.transmision],
    ["Puertas", auto?.puertas],
    ["Color", auto?.color],
  ].filter(([, v]) => v !== undefined && v !== null && v !== ""), [auto]);

  // Mensaje base (NO TOCAR)
  const mensajeBase = useMemo(() => {
    if (!auto) return "";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const precio = auto?.precio != null ? formatARS(Number(auto.precio)) : "—";
    return (
      `Hola, quiero consultar por este auto:
• ${auto?.nombre ?? "—"} (cód: ${auto?.codigo ?? "—"})
• Precio: ${precio}
• Link: ${pageUrl}

Mis datos:
• Nombre: ${nombre || "(completar)"}
• Teléfono: ${telefono || "(completar)"}
• Email: ${email || "(completar)"}

Consulta:
${consulta || "(escribí tu consulta aquí)"}`
    );
  }, [auto, nombre, telefono, email, consulta]);

  const waHref = useMemo(() => {
    return `https://wa.me/${AGENCY_WHATSAPP}?text=${encodeURIComponent(mensajeBase)}`;
  }, [mensajeBase]);

  const mailtoHref = useMemo(() => {
    if (!auto) return "#";
    const subject = `Consulta por ${auto?.nombre ?? "vehículo"} (cód ${auto?.codigo ?? "-"})`;
    return `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mensajeBase)}`;
  }, [auto, mensajeBase]);

  // Validación (NO TOCAR)
  const validate = () => {
    const errs = {};
    if (!String(nombre).trim()) errs.nombre = "Ingresá tu nombre";
    if (!emailOk(email)) errs.email = "Ingresá un email válido";
    if (!phoneOk(telefono)) errs.telefono = "Ingresá un teléfono válido (mín. 8 dígitos)";
    if (!String(consulta).trim()) errs.consulta = "Escribí tu consulta";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canSend = useMemo(() => {
    return (
      String(nombre).trim() &&
      emailOk(email) &&
      phoneOk(telefono) &&
      String(consulta).trim()
    );
  }, [nombre, email, telefono, consulta]);

  async function copiarMensaje() {
    try {
      await navigator.clipboard.writeText(mensajeBase);
      alert("Mensaje copiado al portapapeles");
    } catch {
      alert("No se pudo copiar. Copiá manualmente.");
    }
  }

  function onWhatsApp(e) {
    e.preventDefault();
    if (!validate()) return;
    window.open(waHref, "_blank", "noopener,noreferrer");
  }

  function onEmail(e) {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = mailtoHref;
  }

  // ========= Metadatos dinámicos =========
  const metaTitle = auto ? `${auto.nombre} | Esteticcar Automotores` : "Esteticcar Automotores";
  const metaDesc = auto
    ? `Consultá por ${auto.nombre} (${auto.marca} ${auto.modelo}, ${auto.anio}) — Precio ${auto.precio != null ? formatARS(Number(auto.precio)) : "—"}. Vehículo seleccionado y verificado por Esteticcar.`
    : "Concesionaria de autos seleccionados y verificados en Corrientes.";
  const metaImg = images.length ? images[0] : "/img/bannerfinal.png";
  const metaUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-6 md:p-10 text-neutral-300">
        <title>Cargando… | Esteticcar Automotores</title>
        <meta name="description" content="Cargando vehículo…" />
        Cargando…
      </main>
    );
  }
  if (err || !auto) {
    return (
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <title>Error | Esteticcar Automotores</title>
        <meta name="description" content="El vehículo no fue encontrado." />
        <p className="text-neutral-300 mb-3">{err ? `Error: ${err}` : "Producto no encontrado."}</p>
        <Link to="/productos" className="text-red-400 underline">Volver</Link>
      </main>
    );
  }

  return (
    <main className="bg-neutral-950 text-white">
      {/* Metadatos */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImg} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={metaUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImg} />

      <section className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Galería */}
          <div className="space-y-3">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <div className="relative w-full pt-[56.25%] bg-neutral-900">
                {images.length > 0 ? (
                  <img
                    key={images[idx]}
                    src={cld(images[idx], { w: 1280, c: "fill" })}
                    srcSet={[
                      `${cld(images[idx], { w: 640, c: "fill" })} 640w`,
                      `${cld(images[idx], { w: 960, c: "fill" })} 960w`,
                      `${cld(images[idx], { w: 1280, c: "fill" })} 1280w`,
                      `${cld(images[idx], { w: 1600, c: "fill" })} 1600w`,
                    ].join(", ")}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${auto.nombre} - foto ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    Sin imágenes
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label="Anterior"
                    >‹</button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label="Siguiente"
                    >›</button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                    {images.map((_, i) => (
                      <span key={i} className={`h-1.5 w-6 rounded-full transition ${i === idx ? "bg-white/90" : "bg-white/30"}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => select(i)}
                    className={`relative rounded-lg overflow-hidden border transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-300 ${i === idx ? "border-red-600" : "border-white/10"}`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <div className="w-full pt-[70%] bg-neutral-900" />
                    <img
                      src={cld(src, { w: 240, c: "fill" })}
                      alt={`${auto.nombre} miniatura ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{auto.nombre}</h1>
            {auto.precio != null && (
              <p className="text-red-600 text-xl font-bold">
                {formatARS(Number(auto.precio))}
              </p>
            )}

            <div className="text-sm text-neutral-300 space-y-1 border-t border-neutral-700 pt-3">
              {rows.map(([k, v]) => (
                <p key={k}><span className="text-neutral-400">{k}:</span> <b className="text-white">{String(v)}</b></p>
              ))}
            </div>

            {/* Recordatorio de financiación (SOLO AGREGADO) */}
            <FinancingReminder />

            {/* Acciones (NO TOCAR) */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/productos"
                className="inline-flex items-center justify-center bg-neutral-800 text-white px-5 py-2 rounded hover:bg-neutral-700 transition"
              >
                ← Volver al catálogo
              </Link>

              <button
                onClick={() => setOpenContact(true)}
                className="inline-flex items-center justify-center bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </section>

      <Ubicacion />

      {/* Modal de contacto (NO TOCAR) */}
      <Modal
        open={openContact}
        onClose={() => setOpenContact(false)}
        title="Contactar a la agencia"
      >
        <div className="space-y-4">
          {/* Resumen del auto */}
          <div className="rounded-lg border border-white/10 p-3 bg-neutral-800/40">
            <div className="text-sm text-neutral-300">Consultando por:</div>
            <div className="text-base font-semibold">
              {auto?.nombre}
            </div>

            <div className="text-sm text-neutral-300">
              Precio: {auto?.precio != null ? formatARS(Number(auto.precio)) : "—"}
            </div>
          </div>

          {/* Form del cliente */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <input
                placeholder="Tu nombre *"
                className={`w-full bg-neutral-900 border rounded px-3 py-2 text-white outline-none focus:ring-2 transition ${errors.nombre ? "border-rose-600 focus:ring-rose-500" : "border-neutral-700 focus:border-red-500 focus:ring-red-500"
                  }`}
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  if (errors.nombre) setErrors((er) => ({ ...er, nombre: undefined }));
                }}
              />
              {errors.nombre && <p className="mt-1 text-xs text-rose-400">{errors.nombre}</p>}
            </div>

            <div>
              <input
                placeholder="Tu email *"
                type="email"
                className={`w-full bg-neutral-900 border rounded px-3 py-2 text-white outline-none focus:ring-2 transition ${errors.email ? "border-rose-600 focus:ring-rose-500" : "border-neutral-700 focus:border-red-500 focus:ring-red-500"
                  }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                }}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <input
                placeholder="Tu teléfono *"
                className={`w-full bg-neutral-900 border rounded px-3 py-2 text-white outline-none focus:ring-2 transition ${errors.telefono ? "border-rose-600 focus:ring-rose-500" : "border-neutral-700 focus:border-red-500 focus:ring-red-500"
                  }`}
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                  if (errors.telefono) setErrors((er) => ({ ...er, telefono: undefined }));
                }}
              />
              {errors.telefono && <p className="mt-1 text-xs text-rose-400">{errors.telefono}</p>}
            </div>
          </div>

          <div>
            <textarea
              rows={4}
              placeholder="Escribí tu consulta *"
              className={`w-full bg-neutral-900 border rounded px-3 py-2 text-white outline-none focus:ring-2 transition ${errors.consulta ? "border-rose-600 focus:ring-rose-500" : "border-neutral-700 focus:border-red-500 focus:ring-red-500"
                }`}
              value={consulta}
              onChange={(e) => {
                setConsulta(e.target.value);
                if (errors.consulta) setErrors((er) => ({ ...er, consulta: undefined }));
              }}
            />
            {errors.consulta && <p className="mt-1 text-xs text-rose-400">{errors.consulta}</p>}
          </div>

          {/* Acciones (NO TOCAR) */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end mt-2">
            {/* WhatsApp */}
            <a
              href={canSend ? waHref : "#"}
              onClick={onWhatsApp}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition
                ${canSend ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-900/40 text-green-200/60 cursor-not-allowed"}`}
              title="Enviar por WhatsApp"
              aria-disabled={!canSend}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor" className="h-5 w-5">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.38 0 .02 5.36.02 12a11.89 11.89 0 0 0 1.7 6L0 24l6.19-1.62a11.93 11.93 0 0 0 5.81 1.48h.01c6.63 0 12-5.37 12-12a11.93 11.93 0 0 0-3.48-8.38zM12 21.75h-.01a9.74 9.74 0 0 1-4.96-1.36l-.36-.21-3.67.96.98-3.58-.23-.37a9.74 9.74 0 0 1-1.5-5.16C2.25 6.24 6.24 2.25 12 2.25A9.72 9.72 0 0 1 21.75 12c0 5.76-4.99 9.75-9.75 9.75zm5.31-7.27c-.29-.15-1.73-.85-1.99-.94-.27-.1-.46-.15-.65.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07s-1.22-.45-2.32-1.42c-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.5-.07-.15-.65-1.57-.9-2.15-.24-.58-.49-.5-.65-.5h-.55c-.19 0-.5.07-.76.36s-.99.97-.99 2.37 1.02 2.75 1.16 2.94c.15.19 2.01 3.08 4.88 4.32.68.29 1.21.46 1.63.59.68.22 1.3.19 1.79.12.55-.08 1.73-.7 1.98-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
              </svg>
              WhatsApp
            </a>

            {/* Email */}
            <a
              href={canSend ? mailtoHref : "#"}
              onClick={onEmail}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition
                ${canSend ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-900/40 text-blue-200/60 cursor-not-allowed"}`}
              title="Enviar por Email"
              aria-disabled={!canSend}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.8"
                className="h-5 w-5">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email
            </a>

            {/* Copiar mensaje */}
            <button
              onClick={copiarMensaje}
              className="inline-flex items-center justify-center gap-2 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
              title="Copiar texto al portapapeles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"
                className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8 16h8m-8-4h8m-8-4h4m7-3H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              </svg>
              Copiar mensaje
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
