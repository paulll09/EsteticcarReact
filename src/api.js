const API_URL = import.meta.env.VITE_API_URL;

// === TOKEN STORAGE ===
export function getToken() {                            // 👈 exportado
  return sessionStorage.getItem("JWT_TOKEN") || "";
}
function setToken(token, exp) {
  sessionStorage.setItem("JWT_TOKEN", token);
  if (exp) sessionStorage.setItem("JWT_EXP", String(exp));
}
export function clearToken() {                          // 👈 exportado
  sessionStorage.removeItem("JWT_TOKEN");
  sessionStorage.removeItem("JWT_EXP");
}

// === HELPERS ===
async function parseResponse(res) {
  let data = null, text = null;
  try { data = await res.clone().json(); } catch { }
  if (!res.ok) {
    try { text = await res.text(); } catch { }
    const rawErr = (data && (data.error ?? data.message)) ?? data;
    let msg = null;
    if (typeof rawErr === "string") msg = rawErr;
    else if (rawErr && typeof rawErr === "object") {
      if (rawErr.message && typeof rawErr.message === "string") msg = rawErr.message;
      else msg = JSON.stringify(rawErr, null, 2);
    } else if (text) msg = text.slice(0, 600);
    else msg = `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// === AUTH ===
export async function login(user, pass) {
  const r = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
  });
  const d = await parseResponse(r); // { ok, token, exp }
  if (!d?.ok || !d?.token) throw new Error("Login falló");
  setToken(d.token, d.exp);
  return true;
}

async function refreshToken() {
  const r = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const d = await parseResponse(r);
  setToken(d.token, d.exp);
  return d.token;
}

async function fetchWithAuth(url, options = {}, retry = true) {
  const headers = {
    ...(options.headers || {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401 && retry) {
    try {
      await refreshToken();
      return fetchWithAuth(url, options, false);
    } catch {
      clearToken();
      throw new Error("Sesión expirada");
    }
  }
  return parseResponse(res);
}

// === PÚBLICO ===
export async function listAutos({ q, destacado, marca, page = 1, limit = 12, sort = "created_at desc" } = {}) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (marca) p.set("marca", marca);
  if (destacado != null) p.set("destacado", destacado ? 1 : 0);
  p.set("page", page);
  p.set("limit", limit);
  p.set("sort", sort);
  const r = await fetch(`${API_URL}/autos?${p.toString()}`);
  return parseResponse(r);
}
export async function getAuto(id) {
  const r = await fetch(`${import.meta.env.VITE_API_URL}/autos/${id}`);
  if (!r.ok) throw new Error("Error");
  return r.json();
}

// === ADMIN (JWT) ===
export async function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  return fetchWithAuth(`${API_URL}/uploads/image`, { method: "POST", body: form });
}

export async function createAuto(payload) {
  return fetchWithAuth(`${API_URL}/autos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateAuto(id, payload) {
  return fetchWithAuth(`${API_URL}/autos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteAuto(id) {
  return fetchWithAuth(`${API_URL}/autos/${id}`, { method: "DELETE" });
}

export async function deleteImagen(autoId, imagenId) {
  return fetchWithAuth(`${API_URL}/autos/${autoId}/imagenes/${imagenId}`, { method: "DELETE" });
}

export async function setPortada(autoId, url) {
  const res = await fetch(`${API_URL}/autos/${autoId}/portada`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("Error actualizando portada");
  return res.json();
}

export async function reorderImages(ids) {
  return fetchWithAuth(`${API_URL}/imagenes/reorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

