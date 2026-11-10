import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

/**
 * Guardián anti-horneado: el sitio es estático y la config de Supabase vive
 * en `site-config.js` del servidor (ver STATIC_DEPLOY.md). Si alguien deja
 * valores en el `.env` local, el build falla en vez de publicarlos.
 * Solo aplica a `vite build`; `vite dev` sigue leyendo el `.env` local.
 */
function noBakedSecrets(): Plugin {
  return {
    name: 'anchor23-no-baked-secrets',
    apply: 'build',
    configResolved(config) {
      const leaked = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'].filter(
        (k) => String(config.env[k] ?? '').trim() !== ''
      );
      if (leaked.length > 0) {
        throw new Error(
          `[no-baked-secrets] ${leaked.join(', ')} con valor en el entorno de build. ` +
          `Vacía esas vars en tu .env antes de compilar: la config va en site-config.js del servidor.`
        );
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), noBakedSecrets()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
