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

## Secciones (index.astro) — orden real del DOM (verificado oct-2026, `id` de cada `<section>`)

| # | `id` | Sección | Fondo |
|---|------|---------|-------|
| 1 | `inicio` | Hero carrusel de 2 slides: "Alzar el vuelo" + banner de venta de entradas, y countdown | Oscuro (charcoal) |
| 2 | `equipo` | EN COLABORACIÓN (equipo 6 headshots) | Claro + textura |
| 3 | `que-es-tedx` | ¿QUÉ ES TEDx? (2 cols: texto + foto) | Claro |
| 4 | `tedxwomen` | ¿POR QUÉ TEDxWomen? (texto + foto) | Claro + textura |
| 5 | `concepto` | ALZAR EL VUELO — boarding pass + avión SVG | Oscuro |
| 6 | `evento` | FICHA TÉCNICA — polaroid + contadores + temáticas | Claro |
| 6b | `speakers` | LAS VOCES QUE NOS INVITAN A ALZAR EL VUELO — 6 speakers (nov-2026, después de la Ficha Técnica) | Banda oscura + claro con textura |
| 7 | `prensa` | ENTREVISTAS Y PRENSA — grid 10 tarjetas enlazadas a medios | Oscuro |
| 8 | `partners` | NUESTROS PARTNERS — carrusel 29 logos (1 por slide, con enlace externo si hay URL) | Claro + textura |
| 9 | `auspiciadores` | ¿POR QUÉ SUMARSE COMO AUSPICIADOR? (2 polaroids rotadas) | Oscuro |
| 10 | `beneficios` | BENEFICIOS — 4 en fila + form Formspree alianzas | Claro + textura |
| 11 | `contacto` | CONTACTO — email + socials + foto | Oscuro |
| 12 | — | Footer | Oscuro (en BaseLayout.astro) |

> La "Convocatoria de Speakers" que ocupaba el slot 7 se eliminó oct-2026 (pedido Javiera) y
> fue reemplazada por "Entrevistas y Prensa" en el mismo lugar del DOM, conservando la
> alternancia oscuro/claro del sitio.

## Animaciones JS (inline `<script>`)

- **Countdown**: `setInterval` 1s sobre `2026-12-04T09:00:00-03:00`. Texto estático accesible en `<span class="sr-only">`.
- **Count-up counters**: `IntersectionObserver` threshold 0.5. Lee `data-target` del DOM.
- **Avión SVG**: `animateMotion` + `<mpath href="#flight-path">`, `dur="5s"`.
- **Parallax**: `requestAnimationFrame` sobre `.parallax-img img`, solo >768px, off en `reduced-motion`.
- **Scroll reveals**: `IntersectionObserver` + `opacity/translateY` con delay staggered.
  Selector: `.equipo-card, .beneficio-card, .prensa-card, .s-auspi__bullet`.
- **Carrusel del hero**: 2 slides apilados en la misma celda de grid (el alto lo manda el hero
  original, así que rotar no mueve nada). Rota solo cada 7 s; puntos + botón pausa (WCAG 2.2.2);
  se detiene con hover/foco; con `prefers-reduced-motion` no rota y se oculta el botón pausa.
  Script propio (`#hero-carousel`), independiente del de partners.
- **Speakers**: bio recortada a 3 líneas con botón "ver más" (`aria-expanded`). Sin JS se ve completa.
- **Carrusel partners**: botones prev/next + dots + botón pausa (WCAG 2.2.2). Sin soporte de
  teclado por flechas (ArrowLeft/Right) — los dots y botones sí son focuseables y accionables
  por teclado/Enter como cualquier `<button>`.
- Todo bajo `prefers-reduced-motion: reduce` (anulado o estático).

## Formularios

Formspree `FORMSPREE_FORM_ID` (env var). Campo oculto `_tipo` discrimina destino:
- `partner` → alianzas@tedxbarriouniversitario.cl
- Honeypot `_gotcha`.

> El formulario de postulación de speakers (`_tipo=postulacion-speaker`) se eliminó de la
> landing oct-2026 junto con la sección `#speakers`. El link al Google Form de postulación
> sigue vivo en el footer (columna "Participar") — no se tocó porque el pedido del cliente
> no lo incluía; confirmar con Javiera si la convocatoria sigue abierta.

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
  - Se despliega automáticamente en cada push a `main` vía `.github/workflows/gh-pages.yml`.
- **Producción:** DirectAdmin/PremiumHosting → `https://tedxbarriouniversitario.cl`
  - Servidor: DA006 PRO · IP `147.124.195.34`
  - Usuario DA: `tedxbarr` (clave en `~/.openclaw/openclaw.json["tedxbarriouniversitario"]`)
  - **Deploy automático** en cada push a `main` vía `.github/workflows/deploy.yml` (rsync SSH).
  - Secrets en GitHub: `SITE_URL`, `PUBLIC_GA4_ID`, `DA_FTP_SERVER`, `DA_FTP_USERNAME`, `DA_FTP_PASSWORD`, `DA_SSH_KNOWN_HOSTS`.
  - **Flujo correcto:** rama → PR → merge a `main` → CI/CD despliega solo.
  - Deploy manual rsync solo como emergencia si CI/CD falla (credenciales en openclaw.json).

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

## Hero: banner de venta de entradas (nov-2026)

Slide 2 del hero = banner del diseñador (Nata) en `src/assets/images/banner-entradas-*.webp`:
4 artes (1920×840 y 1600×700 escritorio, 1600×1067 tablet, 400×876 móvil) servidos con
`<picture>`. **El texto, el precio y el botón "Compra tu entrada" vienen horneados en la imagen**:
todo el banner es un `<a>` a `entradas.url` (Evenia) y el `alt` repite el contenido.
Constante `entradas` en el frontmatter de `index.astro`.
- Escritorio `object-fit: cover` (`62% center`); tablet `contain` sobre negro (arte 3:2 vs hero
  casi cuadrado); móvil `contain` en el área sobre la isla del countdown (que solapa 4rem del
  hero y tapaba el precio) con bordes difuminados al negro.
- ⚠️ **La imagen dice "hasta el 22 de noviembre"**: al vencer la preventa hay que quitar el slide
  (borrar el `<div class="hero-slide hero-slide--banner">` y los controles) o reemplazar el arte.

## Speakers (nov-2026)

`speakers` = array en el frontmatter de `index.astro`: `{ nombre, img, rol, bio, url?, red }`.
Contenido de `ACTUALIZACION DE CONTENIDO SITIO WEB.docx` (carpeta cliente `Web - Noviembre/`).
Fotos en `src/assets/images/speaker-*.webp` (900×1000, fondo transparente con la "X" roja ya
incluida). La banda oscura superior es un pseudo-elemento de la foto de la primera tarjeta
(`200vw`, baja al 70% de la foto) — no un bloque aparte, así sigue al diseño en cualquier ancho.
Sin `url` no se muestra ícono (Octavio Enriquez). Hans Contreras usa Instagram, no LinkedIn.
⚠️ **Paulina Saravia figura "por confirmar" en el documento de Nata** y su foto es una silueta
provisional (`speaker-paulina-saravia.webp`): reemplazar cuando llegue.
Nota: el contador de la Ficha Técnica dice 8 speakers; aquí hay 6 (faltan por anunciar).

## S07 Prensa — arquitectura (oct-2026; 10 piezas desde nov-2026)

`prensa` = array de 10 objetos en `src/pages/index.astro` (frontmatter, junto a `partnerSlides`).
Forma: `{ img, tipo, medio, bajada, alt, url? }`. `url` opcional: sin ella, la tarjeta
renderiza un `<div>` en vez de `<a>` (mismo aspecto, sin enlace — caso de TVU hasta que
Javiera confirme el link). Grid `.prensa-grid`: 1 col / 2 cols ≥640px / 3 cols ≥1024px.

Decisión de accesibilidad: a diferencia del mockup del cliente, el texto (medio + bajada) NO
va superpuesto a la foto — va en un bloque sólido debajo, con un degradado como transición
visual. Solo el chip del tipo ("ENTREVISTA →") va superpuesto, con fondo sólido `--color-ted-red`.
Motivo: Lighthouse corre `color-contrast` como error y no evalúa de forma fiable texto sobre
foto variable. Fotos: `src/assets/images/prensa-0N-*.webp`, convertidas con sharp desde los
JPG 640×440 del cliente.

Flecha decorativa reutilizada de `public/s3-flecha.png` (ya existente, variante punteado
blanco para fondo oscuro — la misma que usa `#que-es-tedx`).

## S08 Partners — arquitectura actual (oct-2026)

`partnerSlides` = array explícito ordenado en `src/pages/index.astro` (frontmatter, junto a
`prensa`). **1 logo por slide, 29 slides** (nov-2026: 14 + 15 nuevos).
Forma: `{ src, alt, tipo: "anfitrion"|"normal", categoria, url? }`. `url` opcional: sin ella
el logo renderiza sin `<a>` (ver Pendientes de Contenido).

Categorías según Nata (nov-2026): **Institución Anfitriona** (UdeC), **Partner Oficial**
(Camanchaca, Lotería), **Partner Estratégico** (Bar Callejón) y **Partner Colaborador** (todos
los demás — LINAC, TVU y CMAS bajaron de Estratégico; Casa Endless, VIC-UdeC, Grafitto y
Sistémico dejaron "Impulsor"/"Pyme"). Orden: ese mismo; los nuevos van al final.
Desktop: 5 visibles + flechas. Tablet: 3. Móvil: 1. Con 29 logos los puntos (`.partners-dots`)
hacen salto de línea (`flex-wrap`): en móvil quedan en 3 filas.
⚠️ Preexistente: "siguiente" en la última posición no vuelve al inicio (el autoplay se queda
en el final); "anterior" desde el inicio sí salta al final.

Logos en `public/partners/`, casi todos SVG optimizados con `svgo --multipass`. Excepción:
`casa-endless.webp` y `tvu.webp` — sus SVG de origen eran un `<image>` PNG en base64
envuelto en SVG (1,0 MB y 81 KB respectivamente); se reconvirtieron a WebP real con sharp
(→ 7,1 KB y 5,8 KB) en vez de servir ese peso muerto. Igual en nov-2026 con `hg`, `pti`,
`pettra`, `manada`, `h-celestial`, `casa-luthier` y `emprendidas` (H&G pesaba 1 MB, PTI 800 KB;
ahora 52 y 55 KB; render a 960×560).

El `width`/`height` declarado en el `<img>` es `240×140` (ratio 1,714, el de los 14 SVG
nuevos con `viewBox="0 0 1200 700"` uniforme) — antes era `212×140`, un ratio que no
correspondía a ningún logo real y generaba CLS al pintar.

## Pendientes de Contenido (no bloquean el build)

1. `FORMSPREE_FORM_ID` definitivo (formulario de alianzas no funciona)
2. Correos del dominio (`contacto@`, `alianzas@`) — provisionar en DirectAdmin
3. Nombre exacto del auditorio
4. ~~Logos partners~~ ✅ integrados y en producción (ago-2026), actualizados a set v3 color (oct-2026)
5. Logo UdeC vectorial si lo hay (hoy SVG funcional)
6. Handles LinkedIn confirmados del equipo
7. Rotar clave DirectAdmin tras primer login
8. **URL de la entrevista en TVU** (`#prensa`, tarjeta 6, el matinal) — pendiente de Javiera
9. **URLs de PImagen, VIC-UdeC, Sistémico, Lotería, Bar Callejón y los 13 partners nuevos de
   nov-2026** (`#partners`, logos sin link) — pendiente de Nata/Javiera
12. **Quitar o reemplazar el banner de entradas** al vencer la preventa (22-nov-2026)
13. **Foto definitiva de Paulina Saravia** y confirmar que participa (figura "por confirmar")
14. Confirmar si el "Especial TEDx en TVU" (nov) se suma a la tarjeta del matinal de TVU (hoy se
    sumaron las dos) y el contador "8 speakers" de la Ficha vs. los 6 publicados
10. Confirmar destino del CTA rojo del header ("Postular →" apuntaba a `#speakers`, eliminada;
    quedó provisionalmente en `#contacto` — ver `BaseLayout.astro` comentario de cabecera)
11. Confirmar si se agrega "Prensa" al nav (hecho provisionalmente) o si la sección queda solo
    descubrible por scroll. "Speakers" se agregó al nav en nov-2026 (así sale en el diseño de Nata).

## CLAUDE.md — regla de sincronización

Actualizar tras cambios en `astro.config.mjs`, variables de entorno, secciones o modo de deploy.
