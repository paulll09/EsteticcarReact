export default function Login() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6">
      <form className="w-full max-w-sm border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <button
          type="button"
          className="w-full bg-red-600 text-white py-2 rounded hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
