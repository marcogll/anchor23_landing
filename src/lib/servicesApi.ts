// Catálogo público de servicios — fuente de verdad: Supabase
// (Edge Function `api`, GET /v1/public/services?org=<slug>).
// Precio y duración siempre vienen de DB cuando hay conexión;
// título/descripción se conservan del i18n por idioma mediante match de nombre.

import { getRuntimeEnv } from './runtimeEnv';

export interface PublicServiceCategory {
  name: string;
  display_order: number;
}

export interface PublicService {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  deposit_percent: number;
  category: PublicServiceCategory | null;
}

export interface PublicCatalog {
  organization: { slug: string; name: string };
  services: PublicService[];
}

function edgeBase(): string | null {
  // runtime (/env.js en Coolify) > build-time (Vite)
  const url = getRuntimeEnv('VITE_SUPABASE_URL').replace(/\/$/, '');
  const key = getRuntimeEnv('VITE_SUPABASE_ANON_KEY');
  if (!url || !key) return null;
  return url;
}

function anonKey(): string | null {
  const key = getRuntimeEnv('VITE_SUPABASE_ANON_KEY');
  return key || null;
}

export async function fetchPublicServices(orgSlug: string, signal?: AbortSignal): Promise<PublicCatalog | null> {
  const base = edgeBase();
  const key = anonKey();
  if (!base || !key) return null; // sin credenciales → catálogo local de respaldo
  try {
    const res = await fetch(
      `${base}/functions/v1/api/v1/public/services?org=${encodeURIComponent(orgSlug)}`,
      {
        // apikey: llave del proyecto para el gateway. Authorization con la
        // misma anon key (es un JWT válido) por si la función tiene
        // "Verify JWT" activado en el dashboard — el handler no pide login.
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        signal,
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as PublicCatalog;
    if (!Array.isArray(data?.services)) return null;
    return data;
  } catch {
    return null;
  }
}

/** 35000 centavos → "$350" (MXN, sin decimales) */
export function formatPriceMXN(priceCents: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

/** 90 → "90 min", 120 → "2 h" */
export function formatDuration(durationMinutes: number): string {
  if (durationMinutes >= 60 && durationMinutes % 60 === 0) {
    return `${durationMinutes / 60} h`;
  }
  return `${durationMinutes} min`;
}

/** Match tolerante para ligar filas de DB con items del i18n. */
export function normalizeServiceName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
