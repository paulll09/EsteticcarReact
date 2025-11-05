import { useEffect, useMemo, useState } from "react";
import {
  login,
  getToken,
  clearToken,
  createAuto,
  deleteAuto,
  listAutos,
  uploadImage,
  updateAuto,
  getAuto, // 👈 asegurate que exista en api.js
} from "../api";
import toast from "react-hot-toast";
import Uploader from "../components/Uploader";

// Modal simple
function Modal({ open, onClose, children, title = "Editar" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-neutral-300 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Admin() {
  // ======== AUTH ========
  const [token, setTokenState] = useState(getToken());
  const logged = !!token;

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  async function onSubmitLogin(e) {
    e.preventDefault();
    setAuthMsg("");
    try {
      setAuthLoading(true);
      await login(user, pass);
      setTokenState(getToken());
      toast.success("Inicio de sesión exitoso 🎉", { containerId: "main" });
    } catch (err) {
      toast.error(err?.message || "Credenciales inválidas", { containerId: "main" });
      setAuthMsg(err?.message || "Credenciales inválidas");
    } finally {
      setAuthLoading(false);
    }
  }

  function onLogout() {
    clearToken();
    setTokenState("");
    toast("Sesión cerrada 👋", { containerId: "main" });
  }

  // ======== TABS ========
  const [tab, setTab] = useState("nuevo"); // "nuevo" | "listado"

  // ======== NUEVO AUTO ========
  const [form, setForm] = useState({
    nombre: "", marca: "", modelo: "", anio: "", kilometraje: "",
    combustible: "", transmision: "", puertas: "", color: "",
    precio: "", codigo: "", destacado: false,
  });
  const [files, setFiles] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [msg, setMsg] = useState("");

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  function onFiles(e) {
    setFiles([...e.target.files]);
  }
  function removeFile(i) {
    setFiles((arr) => arr.filter((_, idx) => idx !== i));
  }

  async function onSubmitNuevo(e) {
    e.preventDefault();
    setMsg("");

    const required = ["nombre", "marca", "modelo", "anio", "precio", "codigo"];
    for (const k of required) {
      if (!form[k]) {
        const m = `Completá el campo: ${k}`;
        setMsg(m);
        toast.error(m);
        return;
      }
    }

    try {
      setSubiendo(true);

      // 1) subir imágenes
      const imagenes = [];
      for (const f of files) {
        const up = await uploadImage(f);
        imagenes.push({ url: up.url, public_id: up.public_id });
      }

      // 2) crear auto
      const payload = {
        nombre: form.nombre,
        marca: form.marca,
        modelo: form.modelo,
        anio: Number(form.anio),
        precio: Number(form.precio),
        codigo: form.codigo,
        destacado: form.destacado ? 1 : 0,
        puertas: form.puertas ? Number(form.puertas) : null,
        combustible: form.combustible || null,
        transmision: form.transmision || null,
        color: form.color || null,
        kilometraje: form.kilometraje || null,
        imagenes,
      };

      const res = await createAuto(payload);
      toast.success(`✔ Auto creado (ID ${res.id})`, { containerId: "main" });
      setMsg(`✔ Auto creado (ID ${res.id})`);

      // reset
      setForm({
        nombre: "", marca: "", modelo: "", anio: "", kilometraje: "",
        combustible: "", transmision: "", puertas: "", color: "",
        precio: "", codigo: "", destacado: false,
      });
      setFiles([]);

      setPage(1);
      await loadListado();
      setTab("listado");
    } catch (err) {
      toast.error(err?.message || "Error creando auto", { containerId: "main" });
      setMsg(err?.message || "Error creando auto");
    } finally {
      setSubiendo(false);
    }
  }

  // ======== LISTADO (búsqueda + paginación) ========
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [errList, setErrList] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function loadListado() {
    try {
      setLoadingList(true);
      const data = await listAutos({ q, page, limit: 10, sort: "created_at desc" });
      setItems(data.items || []);
      setPages(data.pages || 1);
      setErrList("");
    } catch {
      const m = "No se pudieron cargar los autos";
      toast.error(m);
      setErrList(m);
    } finally {
      setLoadingList(false);
    }
  }
  useEffect(() => { if (logged) loadListado(); }, [logged, q, page]);

  async function onDelete(id) {
    if (!confirm("¿Eliminar este auto y sus imágenes?")) return;
    try {
      await deleteAuto(id);
      toast.success("Auto eliminado correctamente", { containerId: "main" });
      if (items.length === 1 && page > 1) setPage((p) => p - 1);
      else await loadListado();
    } catch (e) {
      toast.error(e?.message || "Error eliminando auto", { containerId: "main" });
    }
  }

  // ======== EDICIÓN ========
  const [openEdit, setOpenEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editImages, setEditImages] = useState([]); // 👈 imágenes del auto
  const [savingEdit, setSavingEdit] = useState(false);

  async function openEditModal(item) {
    setOpenEdit(true);
    try {
      // Traer detalle con imágenes
      const full = await getAuto(item.id);
      setEditItem({
        id: full.id,
        nombre: full.nombre ?? "",
        marca: full.marca ?? "",
        modelo: full.modelo ?? "",
        anio: full.anio ?? "",
        precio: full.precio ?? "",
        codigo: full.codigo ?? "",
        destacado: Number(full.destacado) === 1 ? 1 : 0,
      });
      setEditImages(full.imagenes || []);
    } catch (e) {
      toast.error("No se pudo cargar el detalle del auto");
      setOpenEdit(false);
    }
  }

  function onChangeEdit(e) {
    const { name, value, type, checked } = e.target;
    setEditItem((it) => ({
      ...it,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  }

  async function onSaveEdit(e) {
    e.preventDefault();
    if (!editItem) return;
    try {
      setSavingEdit(true);
      const payload = {
        nombre: editItem.nombre,
        marca: editItem.marca,
        modelo: editItem.modelo,
        anio: Number(editItem.anio),
        precio: Number(editItem.precio),
        codigo: editItem.codigo,
        destacado: Number(editItem.destacado) === 1 ? 1 : 0,
      };
      await updateAuto(editItem.id, payload);
      toast.success("Cambios guardados correctamente", { containerId: "main" });
      setOpenEdit(false);
      setEditItem(null);
      await loadListado();
    } catch (err) {
      toast.error(err?.message || "Error guardando cambios", { containerId: "main" });
    } finally {
      setSavingEdit(false);
    }
  }

  // ======== UI ========
  if (!logged) {
    return (
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin — Iniciar sesión</h1>
        <form onSubmit={onSubmitLogin} className="space-y-3">
          <input
            type="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Usuario (ej: admin@esteticcar.com)"
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Contraseña"
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          />
          {authMsg && <p className="text-rose-400 text-sm">{authMsg}</p>}
          <button
            disabled={authLoading}
            className="bg-red-600 text-white px-5 py-2 rounded disabled:opacity-60"
          >
            {authLoading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
        <p className="text-sm text-neutral-400 mt-3">
          * Tus credenciales se validan contra la API y se genera un token seguro (JWT).
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <div className="flex items-center gap-3">
          <button onClick={onLogout} className="text-sm text-neutral-300 underline">
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("nuevo")}
          className={`px-4 py-2 rounded ${tab === "nuevo" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-200"}`}
        >
          Nuevo auto
        </button>
        <button
          onClick={() => setTab("listado")}
          className={`px-4 py-2 rounded ${tab === "listado" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-200"}`}
        >
          Listado
        </button>
      </div>

      {tab === "nuevo" && (
        <section>
          {msg && <div className="mb-4 p-3 rounded bg-neutral-800 text-white text-sm">{msg}</div>}

          <form onSubmit={onSubmitNuevo} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="nombre" placeholder="Nombre *" value={form.nombre} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="marca" placeholder="Marca *" value={form.marca} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="modelo" placeholder="Modelo *" value={form.modelo} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="anio" placeholder="Año *" value={form.anio} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="kilometraje" placeholder="Kilometraje" value={form.kilometraje} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="combustible" placeholder="Combustible" value={form.combustible} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="transmision" placeholder="Transmisión" value={form.transmision} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="puertas" placeholder="Puertas" value={form.puertas} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="color" placeholder="Color" value={form.color} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="precio" placeholder="Precio *" value={form.precio} onChange={onChange} />
              <input className="border rounded px-3 py-2 bg-neutral-900 text-white" name="codigo" placeholder="Código *" value={form.codigo} onChange={onChange} />
              <label htmlFor="destacado" className="flex items-center gap-2 text-white">
                <input id="destacado" type="checkbox" name="destacado" checked={!!form.destacado} onChange={onChange} />
                <span>Destacado</span>
              </label>
            </div>

            <div>
              <label htmlFor="imagenes" className="block text-sm mb-1 text-white">
                Imágenes (podés seleccionar varias)
              </label>
              <input id="imagenes" type="file" multiple accept="image/*" onChange={onFiles} className="text-white" />
              {previews?.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} className="w-full aspect-video object-cover rounded border border-white/10" alt={`preview ${i + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white text-xs"
                        title="Quitar"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={subiendo}
              className="bg-red-600 text-white px-5 py-2 rounded disabled:opacity-60"
            >
              {subiendo ? "Subiendo..." : "Crear auto"}
            </button>
          </form>
        </section>
      )}

      {tab === "listado" && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => { setPage(1); setQ(e.target.value); }}
              placeholder="Buscar por marca, modelo o código…"
              className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition w-full sm:w-80"
            />
            <button onClick={loadListado} className="bg-neutral-800 px-3 py-2 rounded border border-white/10">
              Refrescar
            </button>
          </div>

          {loadingList && <p className="text-neutral-400">Cargando…</p>}
          {errList && <p className="text-rose-400">{errList}</p>}

          {!loadingList && !errList && (
            <>
              <div className="overflow-x-auto border border-white/10 rounded-lg">
                <table className="min-w-full text-sm">
                  <thead className="bg-neutral-900 text-neutral-300">
                    <tr>
                      <th className="text-left p-3">ID</th>
                      <th className="text-left p-3">Portada</th>
                      <th className="text-left p-3">Nombre</th>
                      <th className="text-left p-3">Marca</th>
                      <th className="text-left p-3">Modelo</th>
                      <th className="text-left p-3">Año</th>
                      <th className="text-left p-3">Precio</th>
                      <th className="text-left p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((a) => (
                      <tr key={a.id} className="border-t border-white/10">
                        <td className="p-3">{a.id}</td>
                        <td className="p-3">
                          <img src={a.portada || "/placeholder.jpg"} className="h-12 w-20 object-cover rounded" alt={`portada ${a.id}`} />
                        </td>
                        <td className="p-3">{a.nombre}</td>
                        <td className="p-3">{a.marca}</td>
                        <td className="p-3">{a.modelo}</td>
                        <td className="p-3">{a.anio}</td>
                        <td className="p-3">
                          {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(Number(a.precio || 0))}
                        </td>
                        <td className="p-3 flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(a)}
                            className="px-3 py-1 rounded bg-sky-700 text-white hover:bg-sky-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => onDelete(a.id)}
                            className="px-3 py-1 rounded bg-rose-700 text-white hover:bg-rose-600"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-4 text-center text-neutral-400">
                          No hay autos cargados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex items-center justify-end gap-2 mt-3">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 bg-neutral-800 rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm text-neutral-400">
                  Página {page} de {pages}
                </span>
                <button
                  disabled={page >= pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 bg-neutral-800 rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Modal de edición */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title={`Editar auto #${editItem?.id ?? ""}`}>
        {editItem ? (
          <div className="space-y-5">
            <form onSubmit={onSaveEdit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="nombre" placeholder="Nombre" value={editItem.nombre} onChange={onChangeEdit} />
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="marca" placeholder="Marca" value={editItem.marca} onChange={onChangeEdit} />
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="modelo" placeholder="Modelo" value={editItem.modelo} onChange={onChangeEdit} />
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="anio" placeholder="Año" value={editItem.anio} onChange={onChangeEdit} />
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="precio" placeholder="Precio" value={editItem.precio} onChange={onChangeEdit} />
                <input className="border rounded px-3 py-2 bg-neutral-800 text-white" name="codigo" placeholder="Código" value={editItem.codigo} onChange={onChangeEdit} />
                <label htmlFor="edit_destacado" className="flex items-center gap-2 text-white">
                  <input
                    id="edit_destacado"
                    type="checkbox"
                    name="destacado"
                    checked={Number(editItem.destacado) === 1}
                    onChange={onChangeEdit}
                  />
                  <span>Destacado</span>
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setOpenEdit(false)} className="px-4 py-2 rounded bg-neutral-700 text-white">Cancelar</button>
                <button disabled={savingEdit} className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-60">
                  {savingEdit ? "Guardando…" : "Guardar cambios"}
                </button>
              </div>
            </form>

            {/* Gestor de imágenes del auto */}
            <div>
              <h4 className="font-semibold mb-2">Imágenes</h4>
              <Uploader
                autoId={editItem.id}
                images={editImages}
                onUploaded={(img) => setEditImages((arr) => [...arr, img])}
                onChanged={(arr) => setEditImages(arr)}
              />
            </div>
          </div>
        ) : (
          <p className="text-neutral-400">Cargando…</p>
        )}
      </Modal>
    </main>
  );
}