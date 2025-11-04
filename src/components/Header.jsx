import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../api";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogged(!!getToken());
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLogged(false);
    navigate("/");
  };

  const base = "px-3 py-2 rounded text-sm md:text-base";
  const item = ({ isActive }) =>
    isActive
      ? `${base} text-white md:border-b-2 md:border-red-600`
      : `${base} text-neutral-200 md:text-white hover:text-red-500`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <nav className="w-full px-2 md:px-0 h-20 flex items-center justify-between">
        {/* Logo */}
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

        {/* Botón hamburguesa (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col items-center justify-center w-10 h-10 rounded border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>

        {/* Menú desktop */}
        <ul className="hidden md:flex gap-1 list-none pl-0">
          <li><NavLink to="/" className={item}>Inicio</NavLink></li>
          <li><NavLink to="/productos" className={item}>Vehículos</NavLink></li>
          <li><NavLink to="/nosotros" className={item}>Nosotros</NavLink></li>
          <li><NavLink to="/contacto" className={item}>Contactanos</NavLink></li>
          {/* ❌ Eliminamos enlace a Admin / Panel del menú público */}
        </ul>
      </nav>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
          <ul className="max-w-6xl mx-auto py-2 space-y-1 list-none pl-0">
            <li><NavLink to="/" className={item} onClick={() => setOpen(false)}>Inicio</NavLink></li>
            <li><NavLink to="/productos" className={item} onClick={() => setOpen(false)}>Catálogo</NavLink></li>
            <li><NavLink to="/nosotros" className={item} onClick={() => setOpen(false)}>Nosotros</NavLink></li>
            {/* ❌ Sin enlace a Admin en mobile */}
          </ul>
        </div>
      )}
    </header>
  );
}
