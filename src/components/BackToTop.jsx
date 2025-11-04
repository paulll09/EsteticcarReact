//Botón flotante “Subir” (solo en mobile)

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Subir al inicio"
      className="
        fixed bottom-5 right-5 z-[60] sm:hidden
        rounded-full h-12 w-12
        bg-red-600 text-white
        shadow-lg shadow-red-900/30
        grid place-items-center
        transition-transform
        active:scale-95
        backtotop-pop
      "
      title="Subir"
    >
      {/* Flecha simple */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 5l-7 7M12 5l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}
