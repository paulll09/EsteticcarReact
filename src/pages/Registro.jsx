export default function Registro() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <form className="w-full max-w-md border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Crear cuenta</h1>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300" />
          </div>
          <div>
            <label className="block text-sm mb-1">Apellido</label>
            <input className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input type="password" className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300" />
          </div>
          <div>
            <label className="block text-sm mb-1">Repetir contraseña</label>
            <input type="password" className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300" />
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-red-600 text-white py-2 rounded hover:opacity-90"
        >
          Registrarme
        </button>
      </form>
    </main>
  );
}
