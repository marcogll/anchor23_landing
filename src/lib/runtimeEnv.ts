/**
 * runtimeEnv — lectura de configuración con prioridad:
 *   1) runtime inyectado por el entrypoint (`window.__ANCHOROS_ENV__` desde /env.js)
 *   2) build-time de Vite (`import.meta.env`)
 *
 * Sin esto, cambiar env en Coolify requeriría rebuild: las vars `VITE_*`
 * se hornean en el bundle. Con `/env.js` el mismo build sirve para
 * cualquier ambiente.
 */
declare global {
  interface Window {
    __ANCHOROS_ENV__?: Record<string, string | undefined>;
  }
}

function readWindowEnv(key: string): string {
  try {
    const v = globalThis.window?.__ANCHOROS_ENV__?.[key];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  } catch {
    /* sin window (tests) */
  }
  return '';
}

function readViteEnv(key: string): string {
  try {
    const v = (import.meta as unknown as { env?: Record<string, unknown> }).env?.[key];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  } catch {
    /* sin import.meta.env */
  }
  return '';
}

/** Lee una var con prioridad runtime > build. Nunca lanza. */
export function getRuntimeEnv(key: string): string {
  return readWindowEnv(key) || readViteEnv(key);
}
