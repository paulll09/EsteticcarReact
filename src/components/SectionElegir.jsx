import { useEffect, useRef } from "react";

export default function SectionElegir() {
  const items = [
    {
      img: "/img/ampliostock.jpg",
      title: "Amplio stock permanente",
      text: (
        <>
          Contamos con un inventario de <strong>más de 100 vehículos</strong>{" "}
          exhibidos en nuestra <strong>agencia</strong>.
        </>
      ),
    },
    {
      img: "/img/service.jpg",
      title: "Vehículos seleccionados",
      text: (
        <>
          Realizamos en cada vehículo un <strong>minucioso chequeo</strong>,
          garantizándote una <strong>compra segura y confiable</strong>.
        </>
      ),
    },
    {
      img: "/img/financia.webp",
      title: "Financiamientos a medida",
      text: (
        <>
          Entrega mínima, <strong>saldo en cuotas fijas por banco</strong>, ¡y
          financiamos el 50% solo con tu DNI!
        </>
      ),
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = root.querySelectorAll("[data-animate]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("a-show");
            // si querés que solo se animen la primera vez:
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-6 py-16">
      {/* Título con reveal & subrayado animado */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-white a-hidden"
          data-animate
          style={{ ["--d"]: "0ms" }}
        >
          ¿Por qué nos eligen?
          <span className="block mx-auto mt-2 h-[3px] w-0 bg-red-600 underline-anim" />
        </h2>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid gap-10 md:grid-cols-3">
        {items.map(({ img, title, text }, i) => (
          <article
            key={i}
            className="text-center card a-hidden"
            data-animate
            style={{ ["--d"]: `${200 + i * 120}ms` }} // stagger
          >
            <figure className="mb-6 img-wrap">
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-56 md:h-64 object-cover rounded-[28px] shadow-lg img-zoom"
              />
            </figure>

            <h3 className="text-2xl font-bold text-red-500 mb-3">{title}</h3>
            <p className="text-neutral-300 leading-relaxed max-w-[36ch] mx-auto">
              {text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
