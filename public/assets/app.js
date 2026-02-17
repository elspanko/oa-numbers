// Configure your API base (Cloudflare Worker URL).
// Example: https://oa-numbers-api.<your-subdomain>.workers.dev
const API_BASE = "https://oa-numbers-api.spanky.workers.dev"; // if you map /api/* to the worker later

export async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function statusPill(status) {
  const s = String(status || "Unknown");
  return `<span class="pill">${escapeHtml(s)}</span>`;
}
