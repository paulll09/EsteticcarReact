// src/api.js

// BASE de API: debe ser EXACTAMENTE tu /public/api (sin barra final)
const API_URL = (import.meta.env?.VITE_API_URL || "https://bisque-cat-715086.hostingersite.com/esteticcar-api/public").replace(/\/+$/, "");

// =============================================
// Helpers de token (ajusta si ya los tenés en otro lado)
const KEY = "jwt";
const EXP = "jwt_exp";

export function setToken(t, expTs) {
  localStorage.setItem(KEY, t);
  if (expTs) localStorage.setItem(EXP, String(expTs));
}
export function getToken() {
  return localStorage.getItem(KEY) || "";
}
export function clearToken() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(EXP);
}

// Parse genérico
async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = isJson ? (data?.error || JSON.stringify(data)) : data;
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return data;
}

async function fetchWithAuth(url, options = {}, retry = true) {
  const headers = {
    ...(options.headers || {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };
  const res = await fetch(url, { ...options, headers, credentials: "include" });
  // Si tu API devuelve 401 y tienes refresh, podrías reintentar aquí
  return parseResponse(res);
}

// =============================================
// PÚBLICO

// ✅ SIN credentials: 'include'
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
  const r = await fetch(`${API_URL}/autos/${id}`);
  return parseResponse(r);
}

export async function getDestacados(limit = 6) {
  const r = await fetch(`${API_URL}/autos?destacado=1&limit=${encodeURIComponent(limit)}&sort=id desc`);
  return parseResponse(r);
}

// =============================================
// AUTH

export async function login(user, pass) {
  const r = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
    credentials: "include",
  });
  const d = await parseResponse(r);
  setToken(d.token, d.exp);
  return true;
}

// =============================================
// ADMIN (JWT)

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

// ⛳️ BORRAR AUTO con spoof de método (POST + override).  ESTA ES LA CLAVE EN HOSTINGER.
export async function deleteAuto(id) {
  const res = await fetch(`${API_URL}/autos/${id}`, {
    method: "POST", // Hostinger bloquea DELETE
    headers: {
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "DELETE", // spoof header
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ _method: "DELETE" }), // fallback body spoof
    credentials: "include",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Error al eliminar: ${res.status} - ${txt}`);
  }

  return res.json();
}

// Imágenes auxiliares (si las usas)
export async function deleteImagen(autoId, imagenId) {
  // Para Hostinger, usa spoof también:
  const res = await fetch(`${API_URL}/autos/${autoId}/imagenes/${imagenId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "DELETE",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ _method: "DELETE" }),
    credentials: "include",
  });
  return parseResponse(res);
}

export async function setPortada(autoId, url) {
  const res = await fetch(`${API_URL}/autos/${autoId}/portada`, {
    method: "POST", // 👈 Hostinger bloquea PUT
    headers: {
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "PUT", // spoof
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ url }),
    credentials: "include",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Error al definir portada: ${res.status} - ${txt}`);
  }

  return res.json();
}


export async function reorderImages(ids) {
  return fetchWithAuth(`${API_URL}/imagenes/reorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

// Log de diagnóstico (lo ves en Vercel/producción)
console.log("[API_URL]", API_URL);
