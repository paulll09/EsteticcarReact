export default function SectionElegir() {
  const items = [
    {
      img: "/img/variedad.webp",
      title: "Amplio stock permanente",
      text: (
        <>
          Contamos con un inventario de <strong>más de 50 vehículos</strong>{" "}
          exhibidos en nuestra <strong>agencia</strong>.
        </>
      ),
    },
    {
      img: "/img/seleccionados.webp",
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

  return (
    // 👇 sin bg-* aquí; hereda el fondo de la página
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10 animate-fade-in">
        ¿Por qué nos eligen?
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {items.map(({ img, title, text }, i) => (
          <article
            key={i}
            className={`text-center hover-lift animate-fade-in-up ${
              i === 1 ? "animate-delay-200" : i === 2 ? "animate-delay-400" : ""
            }`}
          >
            <figure className="mb-6 hover-zoom-img">
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-56 md:h-64 object-cover rounded-[28px] shadow-lg img-smooth"
              />
            </figure>

            <h3 className="text-2xl font-bold text-red-500 mb-3">{title}</h3>
            <p className="text-neutral-300 leading-relaxed max-w-[36ch] mx-auto">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
