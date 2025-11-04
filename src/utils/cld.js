// Devuelve la misma URL si no es de Cloudinary.
// Si es de Cloudinary, inserta transformaciones en /upload/...
export function cld(src, { w, h, c = "fill", q = "auto", f = "auto" } = {}) {
  if (!src || !src.includes("/upload/")) return src;
  const opts = [
    f ? `f_${f}` : null,
    q ? `q_${q}` : null,
    w ? `w_${w}` : null,
    h ? `h_${h}` : null,
    c ? `c_${c}` : null,
  ]
    .filter(Boolean)
    .join(",");
  return src.replace("/upload/", `/upload/${opts}/`);
}
