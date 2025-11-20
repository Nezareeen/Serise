export function apiBase(){
  // Prefer Vite env, otherwise fallback to localhost:4000
  return import.meta.env.VITE_API_BASE || 'http://localhost:4000'
}

export async function apiFetch(path, opts = {}){
  const base = apiBase();
  const url = path.startsWith('http') ? path : `${base}${path}`;
  return fetch(url, opts);
}






















