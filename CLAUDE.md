# landing-tedxbarriouniversitario

Landing page estática para **TEDxBarrioUniversitario Women 2026** — "Alzar el vuelo".
Evento: 04 Dic 2026 · 09:00–13:00 · Universidad de Concepción.

**Derivado de:** `anami-landing-starter` (metodología ANAMI de sitios web estáticos).
**Cliente:** TEDxBarrioUniversitario Women — Javiera Burgos (organizadora y directora general).
**Diseñadora:** Natalie Aguayo (Nata) — mockup `WEB.pdf` + tipografía aprobada 14-jul-2026.

## Stack

Astro 5 + Tailwind 4 (`@tailwindcss/vite`) + DirectAdmin/PremiumHosting (servidoresph.com).
Sin `@astrojs/tailwind` — Tailwind 4 se integra vía Vite directamente.
Imágenes: `astro:assets` `<Image>` (WebP srcset automático, lazy por defecto).

## Identidad Visual

| Token | Valor |
|-------|-------|
| Rojo TED | `#db0028` |
| Charcoal | `#232323` |
| Lavanda | `#afb5db` |
| Superficie | `#f7f7f7` |
| Fuente display | Roboto Condensed 300 (Light) + 900 (Black) |
| Fuente mono (fechas/números) | Roboto Mono 700 (Bold) |
| Fuente cuerpo | Inter 400/600 |

> Decisión Nata 14-jul-2026: Roboto Condensed reemplaza Montserrat; Roboto Mono reemplaza Space Mono.
> Ambas vía `@fontsource` (Apache 2.0, sin CDN — CSP cerrada).

Textura concreto al 18% de opacidad: clase `.texture-overlay` → `textura-concreto.webp` en `public/`.

## Secciones (index.astro) — orden canónico WEB.pdf

| # | Sección | Fondo |
|---|---------|-------|
| 1 | Hero "Alzar el vuelo" + countdown | Oscuro (charcoal) |
| 2 | EN COLABORACIÓN (equipo 6 headshots) | Claro + textura |
| 3 | ¿QUÉ ES TEDx? (2 cols: texto + foto) | Claro |
| 4 | ¿POR QUÉ TEDxWomen? (texto + foto) | Claro + textura |
| 5 | ALZAR EL VUELO — boarding pass + avión SVG | Oscuro |
| 6 | FICHA TÉCNICA — polaroid + contadores + temáticas | Claro |
| 7 | ¿POR QUÉ SUMARSE COMO AUSPICIADOR? (2 polaroids rotadas) | Oscuro |
| 8 | BENEFICIOS — 4 en fila + form Formspree alianzas | Claro + textura |
| 9 | CONVOCATORIA SPEAKERS — silueta + proceso 3 etapas + form | Claro |
| 10 | NUESTROS PARTNERS — carrusel 5 categorías | Claro + textura |
| 11 | CONTACTO — email + socials + foto | Oscuro |
| 12 | Footer | Oscuro (en BaseLayout.astro) |

## Animaciones JS (inline `<script>`)

- **Countdown**: `setInterval` 1s sobre `2026-12-04T09:00:00-03:00`. Texto estático accesible en `<span class="sr-only">`.
- **Count-up counters**: `IntersectionObserver` threshold 0.5. Lee `data-target` del DOM.
- **Avión SVG**: `animateMotion` + `<mpath href="#flight-path">`, `dur="5s"`.
- **Parallax**: `requestAnimationFrame` sobre `.parallax-img img`, solo >768px, off en `reduced-motion`.
- **Scroll reveals**: `IntersectionObserver` + `opacity/translateY` con delay staggered.
- **Carrusel partners**: botones prev/next + dots, soporte teclado (ArrowLeft/Right).
- Todo bajo `prefers-reduced-motion: reduce` (anulado o estático).

## Formularios

Formspree `FORMSPREE_FORM_ID` (env var). Campo oculto `_tipo` discrimina destino:
- `partner` → alianzas@tedxbarriouniversitario.cl
- `postulacion-speaker` → contacto@tedxbarriouniversitario.cl
- Honeypot `_gotcha` en ambos.

## Variables de Entorno

Ver `.env.example`. Mínimo necesario:
- `SITE_URL` — URL de producción (`https://tedxbarriouniversitario.cl`)
- `FORMSPREE_FORM_ID` — ID del formulario Formspree
- `PUBLIC_GA4_ID` — ID de Google Analytics 4
- `BASE_PATH` — vacío en prod

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Dev server en :4321 |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build |
| `npm run check` | Type-check de Astro |

## Deploy

- **Staging:** GitHub Pages → `https://anami-spa.github.io/landing-tedxbarriouniversitario/`
- **Producción:** DirectAdmin/PremiumHosting → `https://tedxbarriouniversitario.cl`
  - Servidor: DA006 PRO · IP `147.124.195.34`
  - Usuario DA: `tedxbarr` (clave en `~/.openclaw/openclaw.json["tedxbarriouniversitario"]`)
  - Método: `astro build` → subir `dist/` a `public_html` vía SSH/FTPS
  - **Deploy a producción SOLO con OK explícito de Cristian.**

## Seguridad

- `public/_headers` con CSP cerrada (SRI no aplica a GA4/CF Analytics → documentado en el archivo).
- Honeypot en ambos formularios Formspree.
- Sin credenciales en código; todo en `.env` (excluido de git).
- Credenciales hosting SOLO en `~/.openclaw/openclaw.json` (chmod 600).

## Material Gráfico del Cliente

`~/ANAMI_SPA/3_VENTAS_Y_CLIENTES/3.4_CLIENTES/TEDxBarrioUniversitarioWomen/GRAFICAS/WEB/Material Web/`
- **Mockup**: `WEB.pdf` — referencia visual 1:1 para cada sección.
- **Contenidos**: `Contenidos.docx` — copy definitivo.
- **Imágenes**: `IMG/` → `src/assets/images/*.webp` (convertidas con sharp).
- **Logos**: `LOGOS/` → `public/partners/` (TEDx Blanco/Negro/Rojo + UdeC Blanco/Negro).

## Pendientes de Contenido (no bloquean el build)

1. `FORMSPREE_FORM_ID` definitivo (provisionar cuenta Formspree)
2. Correos del dominio (`contacto@`, `alianzas@`) — provisionar en DirectAdmin
3. Nombre exacto del auditorio
4. Logos partners Main / Experiencia / Media (hoy placeholder)
5. Logo UdeC vectorial si lo hay (hoy PNG 800×300)
6. Handles LinkedIn confirmados del equipo
7. Rotar clave DirectAdmin tras primer login

## CLAUDE.md — regla de sincronización

Actualizar tras cambios en `astro.config.mjs`, variables de entorno, secciones o modo de deploy.
