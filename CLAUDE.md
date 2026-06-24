# landing-tedxbarriouniversitario

Landing page estática para **TEDxBarrioUniversitario Women 2026** — "Alzar el vuelo".
Evento: 04 Dic 2026 · 09:00–13:00 · Universidad de Concepción.

**Derivado de:** `anami-landing-starter` (metodología ANAMI de sitios web estáticos).
**Cliente:** TEDxBarrioUniversitario Women — Javiera Burgos (organizadora y directora general).

## Stack

Astro 5 + Tailwind 4 (`@tailwindcss/vite`) + Cloudflare Pages.
Sin `@astrojs/tailwind` — Tailwind 4 se integra vía Vite directamente.

## Identidad Visual

| Token | Valor |
|-------|-------|
| Rojo TED | `#db0028` |
| Charcoal | `#232323` |
| Lavanda | `#afb5db` |
| Superficie | `#f7f7f7` |
| Fuente display | Montserrat (300/400/700/900) |
| Fuente mono (fechas/números) | Space Mono 700 |
| Fuente cuerpo | Inter |

Textura concreto al 18% de opacidad sobre fondo claro (`textura-concreto.webp` en `public/`).
Logos en `public/logo-tedx-negro.svg` (header claro) y `public/logo-tedx-blanco.svg` (footer oscuro).

## Motivos Gráficos (diseño real del cliente)

- Boarding pass lavanda: IDEA 09:00 AM → `Directo` → ACCIÓN 13:00 PM
- Trayectorias punteadas curvas + flechas rojas (↑ → ↗)
- Texto rotado vertical "BARRIO UNIVERSITARIO"
- Cajas/píldoras lavanda para citas
- Comillas rojas en tarjetas de equipo

## Secciones (index.astro)

| # | Sección | Fondo |
|---|---------|-------|
| 1 | Hero "Alzar el vuelo" | Claro + textura |
| 2 | ¿Qué es TEDx? | Oscuro |
| 3 | El concepto / Teaser | Claro + textura |
| 4 | ¿Por qué TEDxWomen? | Claro + textura |
| 5 | Ficha técnica / El evento | Oscuro |
| 6 | Auspiciadores + Formspree | Claro + textura |
| 7 | Equipo (7 personas autorizadas) | Oscuro |
| 8 | Speakers (6 placeholders) + Formspree | Oscuro |
| Footer | Footer (en BaseLayout) | Oscuro |

## Formularios

Ambos formularios usan **Formspree** con el mismo `FORMSPREE_FORM_ID`:
- Auspiciadores → campo `_tipo` no definido (no aplica)
- Speakers → `_tipo: postulacion-speaker`
- Honeypot: `_gotcha` (campo oculto anti-spam)
- ⚠️ Correo destino pendiente de provisionar (dominio tedxbarriouniversitario.cl)

## Variables de Entorno

Ver `.env.example`. Mínimo necesario:
- `SITE_URL` — URL de producción
- `FORMSPREE_FORM_ID` — ID del formulario Formspree
- `PUBLIC_GA4_ID` — ID de Google Analytics 4
- `BASE_PATH` — vacío en prod; `/landing-tedxbarriouniversitario` en GitHub Pages preview

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Dev server en :4321 |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build |
| `npm run check` | Type-check de Astro |

## Deploy

- **Preview:** GitHub Pages → `https://anami-spa.github.io/landing-tedxbarriouniversitario/`
- **Producción:** Cloudflare Pages → `https://tedxbarriouniversitario.cl`
- Deploy a producción **SOLO con OK explícito de Cristian**.

## Pendientes de Contenido (no bloquean el build)

1. Correo destino Formspree (correos del dominio aún por provisionar)
2. Confirmar tipografía exacta de marca con la diseñadora (Montserrat = recomendación)
3. Headshots individuales del equipo (hoy solo hay piezas compuestas)
4. Foto campus UdeC para sección evento
5. Handles exactos IG/LinkedIn del equipo TEDx
6. URL oficial evento en ted.com (provisional: `/tedx/events/69535`)

## Seguridad

- `public/_headers` con CSP cerrada; fuentes locales (sin CDN)
- Honeypot en ambos formularios Formspree
- Sin credenciales en código; todo en `.env` (excluido de git)
- SRI no aplicable a GA4/CF Analytics (proveedores no publican hashes estables); compensado por CSP

## Material Gráfico del Cliente

`~/ANAMI_SPA/3_VENTAS_Y_CLIENTES/3.4_CLIENTES/TEDxBarrioUniversitarioWomen/GRAFICAS/WEB/`
- Logos SVG: `Logo TEDx Women/SVG/TEDx-Blanco.svg` + `TEDx-Negro.svg`
- Paleta oficial: `Colores/ColoresOK.pdf`
- Referencias de sección: `Formato-Publicaciones/*.jpg` (7 piezas)
- Presentación auspiciadores: `Presentacion-Auspiciadores.pdf`

## CLAUDE.md — regla de sincronización

Actualizar tras cambios en `astro.config.mjs`, variables de entorno o modo de deploy.
