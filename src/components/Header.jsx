import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const base = "px-3 py-2 rounded text-sm md:text-base";
  const item = ({ isActive }) =>
    isActive
      ? `${base} text-white border-b-2 border-red-600`
      : `${base} text-white -600 hover:text-red-600`;

  return (
    <header className="fixed inset-x-5 top-0 z-50 px-0 ">
      <nav className="h-16 w-full flex items-center justify-between pr-3">

        <Link to="/" className="font-extrabold text-lg md:text-xl flex items-center gap-2">
          <span className="bg-red-600 text-white px-2 py-1 rounded">ESTETICCAR</span>
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
