import { useState } from "react";
import { toast } from "react-hot-toast";
import { setPortada } from "../api";


export default function Uploader({ autoId, images = [], onUploaded, onChanged }) {
  const [files, setFiles] = useState(images);

  async function handleUpload(e) {
    const f = e.target.files[0];
    if (!f) return;
    const up = await uploadImage(f); // { ok, url, public_id, id? }
    const next = [...files, up];
    setFiles(next);
    onUploaded && onUploaded(up);
    onChanged && onChanged(next);
    toast.success("Imagen subida");
  }

  async function handleReorder() {
    const ids = files.map((f) => f.id); // tu API guarda id en ImagenModel
    if (!ids.length) return;
    await reorderImages(ids);
    toast.success("Orden actualizado");
  }

  async function handleSetPortada(url) {
    if (!autoId) return toast.error("Guardá el auto primero");
    try {
      await setPortada(autoId, url);
      setFiles((arr) =>
        arr.map((img) => ({
          ...img,
          isPortada: img.url === url,
        }))
      );
      toast.success("Portada actualizada correctamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la portada");
    }
  }



  return (
  <div className="space-y-2">
    <div className="flex flex-wrap gap-2">
      {files.map((img) => (
        <div key={img.id || img.url} className="relative group">
          <img
            src={img.url}
            alt=""
            draggable="false"
            className="w-28 h-20 object-cover rounded block"
          />
          <button
            type="button"
            onClick={() => handleSetPortada(img.url)}
            className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded transition ${
              img.isPortada
                ? "bg-green-600 text-white"
                : "bg-black/60 text-white hover:bg-black/80"
            }`}
            title="Definir como portada"
          >
            {img.isPortada ? "Portada ✅" : "Hacer portada"}
          </button>
        </div>
      ))}
    </div>

    {/* Subida de nuevas imágenes */}
    <div className="flex gap-2 items-center">
      <input type="file" onChange={handleUpload} accept="image/*" />
      {/* Si querés, podés agregar un texto de ayuda acá */}
      {/* <span className="text-sm text-slate-400">PNG/JPG hasta 5MB</span> */}
    </div>
  </div>
)};
