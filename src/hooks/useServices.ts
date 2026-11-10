import { useEffect, useState } from 'react';
import { fetchPublicServices, type PublicCatalog } from '../lib/servicesApi';
import { SITE } from '../lib/site';

export type ServicesSource = 'live' | 'fallback' | 'pending';

/**
 * Catálogo de servicios desde Supabase (precios directos de DB).
 * Fallback transparente al catálogo local del i18n si no hay
 * credenciales, red o endpoint (el landing nunca se queda vacío).
 */
export function useServices() {
  const [catalog, setCatalog] = useState<PublicCatalog | null>(null);
  const [source, setSource] = useState<ServicesSource>('pending');

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPublicServices(SITE.orgSlug, ctrl.signal).then((data) => {
      if (ctrl.signal.aborted) return;
      if (data) {
        setCatalog(data);
        setSource('live');
      } else {
        setSource('fallback');
      }
    });
    return () => ctrl.abort();
  }, []);

  return { catalog, source, live: source === 'live' };
}
