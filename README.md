# Sitio LIF — WorkInProgress

Desarrollo: Daniel Víquez Azofeifa para LAICA 2026.

Esta variante mantiene Renzo, comunidad y las historias de Confesiones en construcción. El hero y el formulario de esa sección permanecen disponibles. Los medios del contenido bloqueado se excluyen de la distribución.

## Actualización aprobada: 22 de octubre de 2026

La revisión R2 incorpora los cambios visuales aprobados:

- Laterales vectoriales del hero y la misma familia gráfica en la franja del footer, el recetario y contacto.
- Sellos nuevos de Puro sabor y Con stevia; Bajo en calorías conserva su arte original.
- En móvil, un solo sticker arriba a la izquierda. Alterna con un desvanecimiento de 450 ms y deja espacio para los sobres y la etiqueta Nuevo sabor. La rotación se detiene con movimiento reducido o la pestaña oculta.
- En escritorio, los sellos incluidos en los laterales aparecen una sola vez. Bajo en calorías queda sobre el área verde para despejar el vaso.
- Bienvenida Actual → Hielo fluido → Ajustado, con el audio original y la firma LAICA completa antes del traslado.
- La entrada automática termina sin enfocar el logo del encabezado. Entrar, Escape, repetición manual o uso de los controles restauran el foco al contexto apropiado. Los anillos de foco del teclado se conservan.

## Revisar el sitio

Vista pública de esta variante: [LIF en Netlify](https://lifnewsitev1.netlify.app/).

Referencia con el contenido completo: [LIF en Sites](https://lifnewsitev1.danielviquez19.chatgpt.site/).

La actualización R2 de Sites está publicada. La nueva actualización de Netlify debe comprobarse después de incorporar esta entrega. El estado y las comprobaciones se describen en [PUBLICACION.md](docs/PUBLICACION.md).

## Desarrollo local

Requiere Node.js 22.13 o posterior.

```sh
npm ci
npm run dev
```

Abrir la dirección que indique la terminal. Para generar la distribución de esta variante:

```sh
npm run build
```

La estructura y los componentes visuales se describen en [ARQUITECTURA.md](docs/ARQUITECTURA.md). Los cambios deben actualizar estos documentos y regenerar la distribución antes de revisarse en el sitio publicado.

## Comprobaciones y límites

TypeScript y compilación correctos. La distribución WIP preparada contiene 12 páginas HTML, con 113 referencias de recursos comprobadas sin faltantes. Las consultas de revisión fueron de lectura; no se enviaron formularios ni registros de participantes.

La bienvenida y los stickers respetan movimiento reducido. La comprobación visual automatizada final de los fondos sigue pendiente porque el control local del navegador está desactivado. Las vistas aisladas de los SVG sirven para revisar el arte y no sustituyen capturas del sitio. Safari en un iPhone físico y las pruebas de carga permanecen pendientes.

El historial de entregas anteriores se conserva en Git.
