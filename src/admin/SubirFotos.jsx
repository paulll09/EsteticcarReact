// src/admin/SubirFotos.jsx
import { useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export default function SubirFotos({ uid }) {
  const [file, setFile] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setSubiendo(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch(`${API}/autos/${encodeURIComponent(uid)}/fotos`, {
        method: "POST",
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || `HTTP ${r.status}`);
      setMsg(`OK: ${data.url}`);
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 border rounded-lg space-y-3">
      <div>
        <label className="block text-sm mb-1">Imagen</label>
        <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
      </div>
      <button disabled={!file || subiendo} className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {subiendo ? "Subiendo..." : "Subir"}
      </button>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
