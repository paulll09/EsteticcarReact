import { Link } from "react-router-dom";

const BRANDS = [
  { name: "Toyota",      slug: "Toyota",      logo: "/img/brands/toyota.svg" },
  { name: "Peugeot",     slug: "Peugeot",     logo: "/img/brands/Peugeot_2021_Logo.svg" },
  { name: "Chevrolet",   slug: "Chevrolet",   logo: "/img/brands/Chevrolet.svg" },
  { name: "Volkswagen",  slug: "Volkswagen",  logo: "/img/brands/volkswagen.svg" },
  { name: "Ford",        slug: "Ford",        logo: "/img/brands/Ford.svg" },
  { name: "Renault",     slug: "Renault",     logo: "/img/brands/renault3.png" },
  { name: "Fiat",        slug: "Fiat",        logo: "/img/brands/fiat.png" },
  { name: "Nissan",      slug: "Nissan",      logo: "/img/brands/nissan.png" },
];


function BrandItem({ b, i }) {
  const delay = (i % 8) * 0.12; // efecto “flotar” alternado

  return (
    <Link
      to={`/productos?marca=${encodeURIComponent(b.slug)}`}
      title={`Ver ${b.name}`}
      aria-label={`Filtrar por ${b.name}`}
      className="group inline-flex items-center justify-center px-4"
    >
      <div
        className="flex items-center justify-center w-36 md:w-48 h-12 md:h-16"
        style={{ animation: `brand-bob 3.2s ease-in-out ${delay}s infinite` }}
      >
        <img
          src={b.logo}
          alt={b.name}
          className="block w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.06] drop-shadow-[0_0_8px_rgba(255,255,255,.18)]"
          loading="lazy"
          onError={(e) => {
            console.error("[Marcas] No se pudo cargar:", b.logo);
            const span = document.createElement("span");
            span.className =
              "text-white/85 group-hover:text-white text-sm md:text-base font-semibold";
            span.textContent = b.name;
            e.currentTarget.replaceWith(span);
          }}
        />
      </div>
    </Link>
  );
}

export default function Marcas() {
  const row = [...BRANDS, ...BRANDS]; // duplicamos para loop infinito

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Carrusel continuo */}
        <div className="marquee mask-gradient">
          <div className="marquee-inner hover:[animation-play-state:paused]">
            {row.map((b, i) => (
              <BrandItem key={b.slug + "-" + i} b={b} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}