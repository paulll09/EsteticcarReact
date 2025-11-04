import { useState } from "react";

export default function Contactanos() {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
        website: "" // honeypot (oculto)
    });
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState("");
    const [err, setErr] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const validate = () => {
        if (!form.nombre.trim()) return "Ingresá tu nombre";
        if (!form.email.trim()) return "Ingresá tu email";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email inválido";
        if (!form.asunto.trim()) return "Ingresá el asunto";
        if (!form.mensaje.trim()) return "Ingresá tu mensaje";
        return null;
        // teléfono es opcional
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(""); setOk("");
        const v = validate();
        if (v) { setErr(v); return; }

        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data?.ok) {
                throw new Error(data?.error || "No se pudo enviar tu consulta");
            }
            setOk("¡Gracias! Tu mensaje fue enviado. Te responderemos a la brevedad.");
            setForm({
                nombre: "", email: "", telefono: "", asunto: "", mensaje: "", website: ""
            });
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-3xl mx-auto px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Contactanos</h1>
            <p className="text-white/80 mb-6">
                ¿Tenés dudas sobre algún vehículo o querés coordinar una visita? Escribinos.
            </p>

            {ok && <div className="mb-4 rounded-lg bg-emerald-600/20 border border-emerald-500/40 px-4 py-3">{ok}</div>}
            {err && <div className="mb-4 rounded-lg bg-rose-600/20 border border-rose-500/40 px-4 py-3">{err}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Honeypot (oculto) */}
                <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    className="hidden"
                    autoComplete="off"
                    tabIndex={-1}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-white/70 mb-1">Nombre y apellido *</label>
                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={onChange}
                            className="w-full rounded-lg px-3 py-2 bg-neutral-900 border border-white/10 outline-none focus:ring-2 focus:ring-red-600"

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/70 mb-1">Correo Electronico *</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full rounded-lg px-3 py-2 bg-neutral-900 border border-white/10 outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-white/70 mb-1">Teléfono</label>
                        <input
                            name="telefono"
                            value={form.telefono}
                            onChange={onChange}
                            className="w-full rounded-lg px-3 py-2 bg-neutral-900 border border-white/10 outline-none focus:ring-2 focus:ring-red-600"

                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/70 mb-1">Asunto *</label>
                        <input
                            name="asunto"
                            value={form.asunto}
                            onChange={onChange}
                            className="w-full rounded-lg px-3 py-2 bg-neutral-900 border border-white/10 outline-none focus:ring-2 focus:ring-red-600"

                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-white/70 mb-1">Mensaje *</label>
                    <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={onChange}
                        className="w-full rounded-lg px-3 py-2 bg-neutral-900 border border-white/10 outline-none focus:ring-2 focus:ring-red-600 min-h-[140px]"
                        placeholder="Contanos en qué estás interesado/a..."
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-medium hover:opacity-95 active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Enviando..." : "Enviar consulta"}
                </button>
            </form>


        </main>
    );
}
