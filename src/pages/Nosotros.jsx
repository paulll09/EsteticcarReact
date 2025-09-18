import { Link } from "react-router-dom";
import Ubicacion from "../components/Ubicacion.jsx";

export default function Nosotros() {
  // Ajustá estos datos si querés
  const phone = "5493790000000";
  const waMsg = "Hola, quiero hacer una consulta sobre Esteticcar Automotores";
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMsg)}`;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center">
        <img
          src="/img/nosotros2.webp" 
          onError={(e) => (e.currentTarget.style.display = "none")}
          alt="Nosotros - Esteticcar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <p className="text-red-600 font-semibold uppercase tracking-wide animate-fade-in text-2xl">
            Esteticcar Automotores
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold animate-fade-in-up">
            Pasión por los autos, foco en las personas
          </h1>
          <p className="mt-3 text-white max-w-2xl animate-fade-in animate-delay-200">
            Más que una agencia: un equipo que te acompaña antes, durante y después de tu compra.
          </p>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold">Quiénes somos</h2>
            <p className="text-white leading-relaxed">
              En <strong className="text-white">Esteticcar Automotores</strong> trabajamos todos los
              días para ofrecerte una experiencia de compra simple, transparente y segura.
              Seleccionamos cada unidad con criterios estrictos, realizamos un
              <strong> chequeo técnico completo</strong> y nos ocupamos de que el proceso
              sea ágil, desde la <strong>tasación</strong> hasta la <strong>entrega</strong>.
            </p>
            <p className="text-white leading-relaxed">
              Te ofrecemos <strong>financiación a medida</strong>, tomamos tu usado como parte
              de pago, y contamos con <strong>gestoría propia</strong> para que hagas todos los
              trámites en un mismo lugar. Nuestro objetivo es que te lleves el auto que querés,
              con total tranquilidad.
            </p>
          </div>

          <div className="panel-soft p-6 space-y-4 animate-fade-in-up animate-delay-200">
            <h3 className="text-xl font-bold">Nuestros diferenciales</h3>
            <ul className="space-y-3 text-white">
              <li className="flex gap-3">
                <span>✅</span>
                <span>
                  <strong className="text-white">Vehículos seleccionados</strong> con historial
                  verificado y <strong>chequeo integral</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span>✅</span>
                <span>
                  <strong className="text-white">Financiación</strong> bancarizada y planes flexibles.
                </span>
              </li>
              <li className="flex gap-3">
                <span>✅</span>
                <span>
                  Tomamos tu <strong className="text-white">usado</strong> como parte de pago.
                </span>
              </li>
              <li className="flex gap-3">
                <span>✅</span>
                <span>
                  <strong className="text-white">Asesoramiento personalizado</strong> y postventa cercana.
                </span>
              </li>
            </ul>

            <div className="pt-2 flex gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded btn-primary-glow"
              >
                {/* ícono WA */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.52 3.48A10 10 0 0 0 3.5 20.5L2 22l1.62-.35A10 10 0 1 0 20.52 3.48m-8.51 2.04a8 8 0 0 1 6.93 11.95l-.3.42a8 8 0 0 1-11.17.6l-.52-.51l-2.68.58l.58-2.68l-.51-.52A8 8 0 0 1 12.01 5.52m-2.2 2.3c-.24 0-.5.12-.63.31c-.16.25-.45.68-.45 1.3c0 .83.55 1.66.66 1.82c.12.17 1.16 1.93 2.93 2.73c1.46.67 1.76.57 2.05.5c.38-.1 1.06-.38 1.16-.77c.12-.42.1-.7 0-.8c-.12-.12-.23-.2-.48-.35s-.98-.5-1.06-.55c-.1-.05-.21-.06-.35.02c-.14.08-.36.51-.46.64c-.1.13-.21.13-.35.06c-.2-.09-.77-.3-1.43-.96c-.65-.66-.91-1.34-1-1.54c-.08-.15-.06-.26.04-.36c.1-.1.28-.27.3-.47c.02-.2 0-.31 0-.49c0-.17-.37-1.03-.54-1.33c-.1-.18-.3-.3-.5-.3Z"
                  />
                </svg>
                Escribinos por WhatsApp
              </a>

              <Link
                to="/productos"
                className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded btn-primary-glow"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas / confianza */}
      <section className="max-w-6xl mx-auto px-6 pb-12 md:pb-16">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { n: "+200", t: "Clientes felices" },
            { n: "+100", t: "Unidades en stock" },
            { n: "200+", t: "Puntos de control por unidad" },
          ].map((s, i) => (
            <div key={s.t} className={`panel-soft p-6 animate-fade-in-up ${i === 1 ? "animate-delay-200" : i === 2 ? "animate-delay-400" : ""}`}>
              <div className="text-3xl font-extrabold text-white">{s.n}</div>
              <div className="text-neutral-300">{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compromiso / texto largo */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Nuestro compromiso</h3>
            <p className="text-neutral-300 leading-relaxed">
              Nos comprometemos a brindarte una atención cercana, precios justos y
              <strong> transparencia total</strong> en cada paso. Creemos en relaciones a largo plazo:
              por eso, nuestro equipo de asesores te acompaña desde la primera consulta
              hasta la entrega, y también en la posventa.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-200">
            <h3 className="text-xl font-bold mb-2">Misión y visión</h3>
            <p className="text-neutral-300 leading-relaxed">
              <strong>Misión:</strong> ayudar a las personas a subirse a su próximo auto con la mejor
              combinación de calidad, financiación y servicio.
              <br />
              <strong>Visión:</strong> ser la agencia referente por confianza y experiencia,
              innovando en procesos para que comprar un auto sea cada vez más simple.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto panel-soft p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <h4 className="text-lg md:text-xl font-bold">¿Coordinamos una visita?</h4>
            <p className="text-neutral-300">
              Te esperamos en nuestro showroom. Podemos tasar tu usado y armarte un plan de financiación.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded btn-primary-glow"
            >
              Agendar por WhatsApp
            </a>
            <Link
              to="/productos"
              className="inline-flex items-center justify-center bg-red-600 text-white px-5 py-2 rounded btn-primary-glow"
            >
              Ver autos disponibles
            </Link>
          </div>
        </div>
      </section>

      <div className="h-10" />

    <Ubicacion />

    </main>
  );
}
