// ANCHOR:23 — config de runtime (NO horneada en el build).
// Cómo usarlo (manual, una sola vez por servidor):
//   1) Copia este archivo como `site-config.js` en la RAÍZ del hosting,
//      junto al index.html (NO dentro de assets/).
//   2) Llena los valores y guárdalo. Nunca lo commitees con valores reales.
// Para rotar la anon key basta editar este archivo en el servidor.
// Sin este archivo el sitio funciona con el catálogo local de respaldo.
window.__ANCHOROS_ENV__ = {
  VITE_SUPABASE_URL: 'https://jncdsapglugbpanumeru.supabase.co',
  VITE_SUPABASE_ANON_KEY: '',
  VITE_ORG_SLUG: 'anchor23',
};
