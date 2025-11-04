import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Si usás anchors con hash (#algo), podés respetarlos:
    if (hash) {
      // Esperar al render y desplazar al anchor si existe
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
    }
    // Por defecto: ir arriba del todo
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash]);

  return null;
}
