import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const base = "px-3 py-2 rounded text-sm md:text-base";
  const item = ({ isActive }) =>
    isActive
      ? `${base} text-black border-b-2 border-red-600`
      : `${base} text-neutral-600 hover:text-red-600`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo simple */}
        <Link to="/" className="font-extrabold text-lg md:text-xl flex items-center gap-2">
          <span className="bg-red-600 text-black px-2 py-1 rounded">Esteticar</span>
          <span>Automotores</span>
        </Link>

        {/* Menú */}
        <ul className="flex gap-1 list-none pl-0">
          <li><NavLink to="/" className={item}>Home</NavLink></li>
          <li><NavLink to="/productos" className={item}>Productos</NavLink></li>
          <li><NavLink to="/login" className={item}>Login</NavLink></li>
          <li><NavLink to="/registro" className={item}>Registro</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

