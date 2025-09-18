import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const base = "px-3 py-2 rounded text-sm md:text-base";
  const item = ({ isActive }) =>
    isActive
      ? `${base} text-white md:text-white md:border-b-2 md:border-red-600`
      : `${base} text-neutral-200 md:text-white hover:text-red-500`;

  return (
    // MISMO estilo en mobile y desktop: negro translúcido + blur
    <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <nav className="w-full px-2 md:px-0 h-20 flex items-center justify-between">
        {/* Logo + marca */}
        <Link
          to="/"
          className="font-extrabold text-lg md:text-xl flex items-center gap-0 whitespace-nowrap"
        >
          <img
            src="/img/iconoEsteticcarFinal.png"
            alt="Logo Esteticcar"
            className="h-20 w-20 object-contain"
            loading="eager"
          />
          <span className="text-red-600 px-0 py-1 rounded">ESTETICCAR</span>
          <span className="hidden px-2 sm:inline md:text-white">Automotores</span>
        </Link>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-white/20 text-white"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Menú desktop */}
        <ul className="hidden md:flex gap-1 list-none pl-0">
          <li><NavLink to="/" className={item}>Inicio</NavLink></li>
          <li><NavLink to="/productos" className={item}>Catálogo</NavLink></li>
              <li><NavLink to="/nosotros" className={item}>Nosotros</NavLink></li>
          <li><NavLink to="/login" className={item}>Login</NavLink></li>
          <li><NavLink to="/registro" className={item}>Registro</NavLink></li>
        </ul>
      </nav>

      {/* Menú mobile con el MISMO look */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
          <ul className="max-w-6xl mx-auto py-2 space-y-1 list-none pl-0">
            <li><NavLink to="/" className={item} onClick={() => setOpen(false)}>Inicio</NavLink></li>
            <li><NavLink to="/productos" className={item} onClick={() => setOpen(false)}>Catálogo</NavLink></li>
            <li><NavLink to="/nosotros" className={item} onClick={() => setOpen(false)}>Nosotros</NavLink></li>
            <li><NavLink to="/login" className={item} onClick={() => setOpen(false)}>Login</NavLink></li>
            <li><NavLink to="/registro" className={item} onClick={() => setOpen(false)}>Registro</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  );
}
