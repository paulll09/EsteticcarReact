import { useState } from "react";
import { uploadImage, reorderImages, setPortada } from "../api";
import toast from "react-hot-toast";

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
      <div className="flex flex-wrap gap-3">
        {files.map((img, i) => (
          <div
            key={i}
            className="relative group cursor-grab"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("index", i)}
            onDrop={(e) => {
              const from = Number(e.dataTransfer.getData("index"));
              const to = i;
              const arr = [...files];
              const [moved] = arr.splice(from, 1);
              arr.splice(to, 0, moved);
              setFiles(arr);
              onChanged && onChanged(arr);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <img
              src={img.url}
              alt="auto"
              className="w-28 h-28 object-cover rounded border border-white/10"
            />
            <button
              type="button"
              onClick={() => handleSetPortada(img.url)}
              className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              title="Definir como portada"
            >
              Portada
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input type="file" onChange={handleUpload} accept="image/*" />
        <button
          type="button"
          onClick={() => handleSetPortada(img.url)}
          className={`absolute bottom-1 left-1 text-xs px-2 py-1 rounded transition ${img.isPortada
              ? "bg-green-600 text-white"
              : "bg-black/60 text-white hover:bg-black/80"
            }`}
          title="Definir como portada"
        >
          {img.isPortada ? "Portada ✅" : "Hacer portada"}
        </button>

      </div>
    </div>
  );
}
