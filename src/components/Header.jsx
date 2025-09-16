import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const base = "px-3 py-2 rounded text-sm md:text-base";
  const item = ({ isActive }) =>
    isActive
      ? `${base} text-white md:text-black md:border-b-2 md:border-red-600`
      : `${base} text-neutral-200 md:text-neutral-600 hover:text-red-500`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-900/80 md:bg-white md:backdrop-blur border-b border-white/10 md:border-neutral-200">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-lg md:text-xl flex items-center gap-2 whitespace-nowrap">
          <span className="bg-red-600 text-white px-2 py-1 rounded">ESTETICCAR</span>
          <span className="hidden sm:inline md:text-neutral-900">Automotores</span>
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
          <li><NavLink to="/" className={item}>Home</NavLink></li>
          <li><NavLink to="/productos" className={item}>Productos</NavLink></li>
          <li><NavLink to="/login" className={item}>Login</NavLink></li>
          <li><NavLink to="/registro" className={item}>Registro</NavLink></li>
        </ul>
      </nav>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-neutral-900/95 backdrop-blur">
          <ul className="max-w-6xl mx-auto px-4 py-3 space-y-1 list-none pl-0">
            <li><NavLink to="/" className={item} onClick={() => setOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/productos" className={item} onClick={() => setOpen(false)}>Productos</NavLink></li>
            <li><NavLink to="/login" className={item} onClick={() => setOpen(false)}>Login</NavLink></li>
            <li><NavLink to="/registro" className={item} onClick={() => setOpen(false)}>Registro</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  );
}
