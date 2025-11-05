import { Link } from "react-router-dom";

export default function Footer() {
  const redes = [
    { name: "Instagram", href: "https://www.instagram.com/srl.esteticar/?hl=es", icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-1.25 2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/></svg>
    )},
    { name: "Facebook", href: "https://www.facebook.com/share/1BQVbeeRFV/?mibextid=wwXIfr", icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h3v3h-3a1 1 0 0 0-1 1V12H17l-.5 3h-2.5v7A10 10 0 0 0 22 12"/></svg>
    )},
  ];

  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Columna 1: Sobre nosotros */}
        <div>
          <h3 className="text-white font-semibold mb-2">Sobre Esteticcar</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Somos una agencia de autos seleccionados y verificados.
            Nuestro compromiso es ofrecerte vehículos en excelente estado
            y el mejor asesoramiento personalizado.
          </p>

        </div>

        {/* Columna 2: Enlaces útiles */}
        <div>
          <h3 className="text-white font-semibold mb-2">Enlaces útiles</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-red-500 transition">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-red-500 transition">Catálogo</Link></li>
            <li><Link to="/nosotros" className="hover:text-red-500 transition">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-red-500 transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto + redes */}
        <div>
          <h3 className="text-white font-semibold mb-2">Contacto</h3>
          <p>📞 +54 9 379 6400 743</p>
          <p>✉️ contacto@esteticcar.com</p>
          <div className="flex items-center gap-4 mt-3">
            {redes.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.name}
                className="text-neutral-400 hover:text-red-500 transition"
              >
                {r.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="h-px w-full bg-white/10" />

      {/* Copyright + links legales */}
      <div className="max-w-6xl mx-auto px-6 py-5 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Esteticcar Automotores — Todos los derechos reservados.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
          <Link to="/politica-privacidad" className="hover:text-white">Política de Privacidad</Link>
          <span className="hidden sm:inline">·</span>
          <Link to="/terminos-condiciones" className="hover:text-white">Términos y Condiciones</Link>
          <span className="hidden sm:inline">·</span>
        </div>
      </div>
    </footer>
  );
}
