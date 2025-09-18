export default function Footer() {
  const redes = [
    { name: "Instagram", href: "https://instagram.com/esteticcar", icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-1.25 2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/></svg>
    )},
    { name: "Facebook", href: "https://facebook.com/esteticcar", icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h3v3h-3a1 1 0 0 0-1 1V12H17l-.5 3h-2.5v7A10 10 0 0 0 22 12"/></svg>
    )},
  ];

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* fila redes */}
        <div className="flex items-center justify-center gap-5 mb-4">
          {redes.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.name}
              className="text-neutral-400 hover:text-white transition hover-lift"
              title={r.name}
            >
              {r.icon}
            </a>
          ))}
        </div>

        {/* línea separadora */}
        <div className="h-px w-full bg-white/10 mb-4" />

        {/* copyright */}
        <p className="text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Esteticcar Automotores — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
