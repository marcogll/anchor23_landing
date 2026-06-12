# Sitemap — ANCHOR:23 Landing Site

> **Fecha:** 2026-06-11
> **Tech Stack:** Vite + React + Tailwind CSS + React Router
> **Dominio Producción:** `https://anchor23.mx`
> **Dominio Temporal (Hostinger):** `https://review.anchor23.mx` (para review)
> **Instagram:** `https://www.instagram.com/anchor23.mx`
> **Facebook:** `https://www.facebook.com/anchor23.mx`
> **YouTube:** `https://www.youtube.com/anchor23.mx`
> **Pinterest:** `https://www.pinterest.com/anchor23.mx`

---

## Estructura de Rutas

```
/
├── /                          Home (Landing principal)
│   ├── Hero
│   ├── Fundamento
│   ├── Servicios Exclusivos (Preview)
│   ├── Testimonios
│   ├── Instagram Gallery
│   └── Footer
│
├── /historia                  Historia / Nosotros
│   ├── Hero
│   ├── Fundamento
│   ├── El Significado
│   └── Nuestra Filosofía
│
├── /servicios                 Servicios
│   ├── Filosofía de Servicios
│   ├── Categorías de Servicios
│   ├── Lista de Servicios (dinámico)
│   └── Valores / CTA
│
├── /membresias               Membresías
│   ├── Hero
│   ├── Nota Operativa
│   ├── Planes (Gold, Black, VIP)
│   └── Formulario de Solicitud
│
├── /contacto                 Contacto
│   ├── Hero
│   ├── Información de Contacto
│   └── Formulario de Contacto
│
├── /franchises               Franquicias
│   ├── Hero
│   ├── Modelo de Negocio
│   ├── Beneficios
│   ├── Requisitos
│   └── Formulario de Solicitud
│
├── /legal                    Términos y Condiciones
│   └── 11 secciones legales
│
├── /privacy-policy           Política de Privacidad
│   └── 8 secciones de privacidad
│
└── /hq                       HQ Dashboard (Admin)
    └── Requiere autenticación
```

---

## Layout Global

- **Navigation:** ResponsiveNav fijo con backdrop blur
- **Footer:** Links principales, newsletter, redes sociales
- **CTA Principal:** Redirige a `booking.anchor23.mx`

---

## Componentes Globales Compartidos

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `Navigation` | `src/sections/Navigation.tsx` | Todas las páginas |
| `Footer` | `src/sections/Footer.tsx` | Todas las páginas |
| `AnimatedLogo` | `src/components/AnimatedLogo.tsx` | Hero de todas las páginas |
| `RollingPhrases` | `src/components/RollingPhrases.tsx` | Hero principal |
| `WebhookForm` | `src/components/WebhookForm.tsx` | Contacto, Membresías, Franquicias |
| `LoadingScreen` | `src/components/LoadingScreen.tsx` | Primera visita a `/` |

---

## Flujo de Usuario

```
Usuario entra a anchor23.mx
    ↓
Middleware / App Router detecta hostname
    ↓
Renderiza LandingLayout
    ↓
LoadingScreen (solo primera vez en /)
    ↓
Navigation (responsive, fijo)
    ↓
Main Content (según ruta)
    ↓
Footer
    ↓
CTA redirige a booking.anchor23.mx
```

---

## Rutas Implementadas

| Ruta | Componente | Estado |
|------|------------|--------|
| `/` | `Home.tsx` | ✅ Implementado |
| `/historia` | `Historia.tsx` | 🚧 En desarrollo |
| `/servicios` | `Servicios.tsx` | 🚧 En desarrollo |
| `/membresias` | `Membresias.tsx` | 🚧 En desarrollo |
| `/contacto` | `Contacto.tsx` | 🚧 En desarrollo |
| `/franchises` | `Franchises.tsx` | 🚧 En desarrollo |
| `/legal` | `Legal.tsx` | 🚧 En desarrollo |
| `/privacy-policy` | `PrivacyPolicy.tsx` | 🚧 En desarrollo |
| `/hq` | `HQ.tsx` | 🔒 Requiere auth |

---

## Notas de Implementación

- **Vite + React Router:** Usando `BrowserRouter` para SPA routing
- **Animaciones:** GSAP + ScrollTrigger para animaciones de entrada
- **Scroll:** Lenis smooth scrolling
- **Estilos:** Tailwind CSS v3 con tema ANCHOR:23 (colores base, surface, gold, accent)
- **Tipografías:** Cinzel (display) + Cormorant Garamond (body)
- **Imágenes:** Directorio `public/images/`
- **Videos:** Directorio `public/videos/`

---

## Próximos Pasos

1. [ ] Completar contenido de páginas placeholder
2. [ ] Implementar `AnimatedLogo` component
3. [ ] Implementar `RollingPhrases` component
4. [ ] Implementar `WebhookForm` component
5. [ ] Implementar `LoadingScreen` component
6. [ ] Agregar autenticación para `/hq`
7. [ ] Conectar con API backend (`/api/services`)
8. [ ] Agregar SEO / meta tags por página
9. [ ] Implementar responsive mobile menu
10. [ ] Testing y optimización de performance
