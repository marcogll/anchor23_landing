// anchor23_landing — enlaces y destinos centrales.
// Single source of truth para no cazar URLs hardcodeadas por archivo.
// Las invitaciones (join_us / waitlist) van al webhook n8n de Anchor:23,
// que a su vez alimenta el sistema de invitaciones (aperture/inbox).

import { getRuntimeEnv } from './runtimeEnv';

const N8N_BASE = 'https://flows.soul23.cloud/webhook';

export const SITE = {
  bookingUrl: 'https://booking.anchor23.mx',
  phoneDisplay: '+52 844 123 4567', // TODO verificar número real con el negocio
  email: 'contacto@anchor23.mx',
  socials: {
    instagram: 'https://www.instagram.com/anchor23.mx',
    facebook: 'https://www.facebook.com/anchor23.mx',
    youtube: 'https://www.youtube.com/anchor23.mx',
    pinterest: 'https://www.pinterest.com/anchor23.mx',
  },
  // Formularios → flujos n8n (ver n8n-flows/*.json)
  webhooks: {
    joinUs: `${N8N_BASE}/okouvwz8y68mnuju7bzp3dv8jq9v9lmlo7divex`,
    contact: `${N8N_BASE}/4ppiwv0wn5sc3c2vknff0uh0w2ysgsx3dv23y2ny`,
    collabs: `${N8N_BASE}/o0z7qbmpxd0bw9rmfyczvx38yg1fw5us7i4lk9av`,
    memberships: `${N8N_BASE}/27xv9ojycsfzp7tepia4ewavq2c0uep427bkecb`,
    espacios: `${N8N_BASE}/cpz7zocewbc8intp5oe0gvq320fxxej93cn18bpb`,
    trabajar: `${N8N_BASE}/vbc3xs2jtqu7miz5klsgpvxho54p685huxrvyjtb`,
  },
  // Catálogo público de servicios (precios directos de Supabase vía Edge Function).
  // Sin anon key configurada el landing usa el catálogo local de respaldo.
  // En Coolify llega por /env.js en runtime (sin rebuild).
  orgSlug: getRuntimeEnv('VITE_ORG_SLUG') || 'anchor23',
} as const;
