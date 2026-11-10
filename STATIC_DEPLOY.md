# ANCHOR:23 — Deploy estático + precios desde Supabase

El sitio es 100% estático (sin servidor Node, sin Coolify). Los precios y
duraciones de servicios salen en vivo de Supabase vía la Edge Function `api`
(`GET /v1/public/services?org=anchor23`, pública sin login). **Nada de
Supabase se hornea en el build**: la config vive en `site-config.js`, un
archivo aparte en el servidor que se edita sin rebuild.

```
navegador ──fetch──▶ supabase.co/functions/v1/api/v1/public/services
   │                           │ (service role, solo is_active=true)
   │                           ▼
   │                     public.services (DB = fuente de verdad)
   ▼
site-config.js (URL + anon key, editable en servidor, sin rebuild)
```

## 1. Supabase (una sola vez)

1. Desplegar la función con el endpoint público:
   ```bash
   cd anchoros_hq
   supabase functions deploy api
   ```
2. Dashboard Supabase → Edge Functions → Secrets → agregar:
   | Variable | Valor |
   |---|---|
   | `ALLOWED_ORIGINS` | `https://anchor23.mx,https://www.anchor23.mx` |
   | `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Solo si se cobran depósitos online (ver repo raíz) |
   
   `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` las
   inyecta Supabase solo — no se dan de alta.
3. Conseguir la anon key: Dashboard → Project Settings → API → `anon public`.
   Es pública por diseño (el RLS es quien protege); aun así solo vive en
   `site-config.js` del servidor, nunca en el repo ni en el bundle.
4. Verificar el endpoint (debe responder sin login):
   ```bash
   curl -s "https://jncdsapglugbpanumeru.supabase.co/functions/v1/api/v1/public/services?org=anchor23" \
     -H "apikey: <ANON_KEY>" | head -c 400
   ```

## 2. Servidor (una sola vez, manual por hPanel/FTP)

1. Subir a la raíz del `public_html`:
   - `hostinger/.htaccess` → `.htaccess` (SPA fallback + sin caché para config)
   - Copia de `hostinger/site-config.example.js` → `site-config.js`, **llenando**
     `VITE_SUPABASE_ANON_KEY`. Este archivo jamás se commitea.
2. En cada deploy posterior solo se re-suben los archivos del `dist/` nuevo.
   `site-config.js` y `.htaccess` se tocan únicamente para rotar/configurar.

## 3. Build + subida (cada deploy, manual)

```bash
cd anchor23_landing
npm install
npm run build        # sale SIN vars horneadas (a propósito)
```

> **Política anti-horneado.** El `.env` local debe tener `VITE_SUPABASE_URL`
> y `VITE_SUPABASE_ANON_KEY` **vacíos**. Un plugin de Vite (`no-baked-secrets`)
> **bloquea el build** si detecta valores — así es imposible publicar
> credenciales por accidente. Para probar el catálogo `live` en local,
> llena el `.env` temporalmente y usa `npm run dev` (el dev sí lo lee);
> vacíalo antes de compilar.

Subir el **contenido** de `dist/` a la raíz del `public_html`
(`index.html`, `assets/`, `images/`, `videos/`, `favicon.svg`, …).
No subir: `node_modules/`, `src/`, `.env`, `site-config.example.js`.

## 4. Verificación

- [ ] Rutas SPA: `/`, `/servicios`, `/membresias`, `/invitar`, `/contacto` (sin 404, gracias al `.htaccess`)
- [ ] `/servicios` muestra precios de DB (origen `live`). Sin red/key muestra el catálogo local (origen `fallback`, nunca vacío)
- [ ] Formularios (contacto, invitaciones, membresías, espacios, collabs, trabajar) llegan a sus flujos n8n (ver `src/lib/site.ts` + `n8n-flows/`)
- [ ] Consola del navegador sin errores de CORS (si hay, revisar `ALLOWED_ORIGINS`)
- [ ] `site-config.js` responde `no-cache` y con los valores correctos

## 5. Extraer este folder a repo aparte

Este folder ya trae `.git` propio anidado y es autocontenido
(`npm install` + `npm run dev`). Para lanzarlo aparte:

```bash
# desde anchoros_hq/
cp -r anchor23_landing /ruta/nuevo-repo && cd /ruta/nuevo-repo
rm -rf node_modules dist hostinger_deploy .env
npm install && npm run dev   # http://localhost:3000
```

Llevarse: `src/`, `public/`, `index.html`, `hostinger/`, `n8n-flows/`,
`STATIC_DEPLOY.md`, `.env.example`, configs (`vite`, `tailwind`, `tsconfig`).
No llevarse: `node_modules/`, `dist/`, `hostinger_deploy/`, `.env`.

## Pendientes (del negocio, no del código)

- [ ] `VITE_SUPABASE_ANON_KEY` real en el `site-config.js` del servidor
- [ ] `supabase functions deploy api` ejecutado en producción
- [ ] Secret `ALLOWED_ORIGINS` con el dominio final del landing
- [ ] Servicios reales en `public.services` (hoy el seed trae Gelish/Polygel/Acrílicas/Lash Lifting; el landing muestra otro catálogo — al activar `live` se verá lo de DB)
- [ ] Confirmar teléfono real (`src/lib/site.ts` trae `+52 844 123 4567` como placeholder)
- [ ] Verificar flujos n8n activos en `flows.soul23.cloud` (6 webhooks en `src/lib/site.ts`)
- [ ] Membresías siguen con precios fijos en el i18n (fuera de alcance de esta fase)

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Precios viejos / catálogo local | Falta `site-config.js` o anon key vacía | Subir/llenar `site-config.js`, recarga dura |
| `Failed to fetch` + error CORS | Origen no en `ALLOWED_ORIGINS` | Agregar el dominio al secret y reintentar |
| `401` del endpoint | Gateway sin apikey | El código ya manda `apikey` + `Bearer`; revisar key |
| Cambié un precio y no se refleja | Caché 60s del endpoint o caché del navegador | Esperar 1 min / recarga dura (`site-config.js` no se cachea, el catálogo sí 60s) |
| Ruta `/x` da 404 en Hostinger | Falta el `.htaccess` | Subir `hostinger/.htaccess` a la raíz |
