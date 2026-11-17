// Venta de entradas (Evenia). Fuente única: la usan el banner del hero (index.astro)
// y el botón rojo del menú (BaseLayout.astro). Cambiar el enlace o el texto aquí.
export const entradas = {
  url: "https://evenia.cl/alzar-el-vuelo/c4fc7146-95b5-4840-87a9-9534d5c7cfd1",
  label: "Compra tu entrada",
  labelCorto: "Entradas", // pantallas medianas, para que el menú no se desborde
  // El texto, el precio y el botón del banner vienen horneados en la imagen del
  // diseñador (Nata, 15-nov-2026): el `alt` repite su contenido.
  bannerAlt:
    "¡Preventa activa! No te quedes fuera, es momento de alzar el vuelo. Compra tu entrada. Precio especial preventa: $15.000, hasta el 22 de noviembre.",
  // El arte dice "hasta el 22 de noviembre": pasada esta fecha el banner se retira solo
  // (script en línea del hero). El botón del menú no caduca.
  bannerHasta: "2026-11-22T23:59:59-03:00",
};
