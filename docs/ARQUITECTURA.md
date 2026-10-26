# Arquitectura de la interfaz de LIF

Actualizado el 22 de octubre de 2026. Revisión R2 de la variante WorkInProgress.

## Alcance de esta variante

El sitio presenta sabores, información nutricional, recetas, Confesiones y juegos. En WorkInProgress, Renzo, comunidad, todas las historias y sus páginas individuales mantienen el aviso de construcción. El hero y el formulario de Confesiones siguen disponibles. La referencia completa conserva esas secciones visibles.

## Organización del código

- `app/`: páginas y estilos de las distintas secciones.
- `components/`: piezas reutilizables de la interfaz y sus interacciones.
- `hooks/` y `lib/`: lógica compartida y datos de presentación.
- `public/`: ilustraciones, productos, tipografías, audio y documentos descargables.

Esta guía describe la interfaz pública y sus recursos. El historial de cambios permanece en Git.

## Hero y stickers

`components/home-content.tsx` compone el inicio y sus stickers. Los laterales `public/brand/hero-side-left.svg` y `hero-side-right.svg` conservan las ilustraciones, colores, transparencias y proporciones del arte aprobado.

En móvil, `CampaignStickers` muestra un solo sello en la esquina superior izquierda del carrusel. Reserva una banda de 64 px y una caja de 104 × 72 px. El sello permanece 5,5 segundos, se desvanece durante 450 ms, cambia con opacidad cero y reaparece durante 450 ms. No se desplaza ni hace zoom. Los tres recursos se precargan; la rotación se detiene fuera de móvil, con movimiento reducido o con la pestaña oculta.

Los sellos móviles son Puro sabor, Bajo en calorías y Con stevia. En escritorio, Puro sabor y Con stevia aparecen únicamente dentro del arte lateral. Bajo en calorías mantiene su ilustración original y ocupa el área verde central para dejar visible el vaso. `app/home.css` define la composición y la transición.

## Fondos gráficos

Los siguientes SVG reutilizan la familia visual de los laterales, con composiciones adaptadas a cada superficie:

- `public/brand/brand-fruit-strip.svg`: franja compartida del footer y adaptación móvil del recetario.
- `public/brand/brand-fruit-panel.svg`: panel diagonal del recetario.
- `public/brand/brand-fruit-pattern.svg`: fondo del diálogo de contacto.
- `public/brand/insumos/`: sellos nuevos de Puro sabor y Con stevia.

Los estilos de integración están en `app/brand-chrome.css`, `app/globals.css` y `app/contact.css`. Los recursos anteriores se conservan como historial, pero ya no alimentan esos fondos activos.

## Bienvenida y foco

La selección aprobada es Actual → Hielo fluido → Ajustado. `lib/home-intro.ts` fija la selección `ice4`; `components/home-intro-logo.tsx` representa los vectores y `components/home-entrance.tsx` coordina la experiencia.

La pista `public/audio/lif-welcome-ice4.wav` conserva el audio original. La animación dura 2612,25 ms y después se traslada al menú durante 520 ms, dejando visible la firma LAICA completa. Si el navegador bloquea el audio automático, la misma animación continúa en silencio. Se conservan los controles de omitir, repetir y silenciar, así como el soporte de movimiento reducido.

R2 corrige el cierre automático: no enfoca el logo del encabezado y retira el foco del overlay antes de desmontarlo cuando corresponde. Entrar, Escape, la repetición manual y la interacción con controles sí restauran el foco al elemento apropiado. Los estilos de foco visible para teclado permanecen activos.

## Verificación

La distribución WIP preparada pasa compilación, TypeScript y 113 referencias de recursos sin faltantes en 12 páginas HTML. La referencia completa de Sites se verifica por separado: 11 páginas HTML, 128 referencias y 136 recursos públicos idénticos a fuente. No deben mezclarse los conteos de ambas variantes.

La revisión HTTP del sitio Sites publicado confirmó los recursos gráficos y el audio, así como el código servido de la posición móvil, el desvanecimiento y la corrección de foco. No se enviaron formularios ni registros de participantes. La revisión visual automatizada final de los fondos sigue pendiente; las vistas del arte no equivalen a capturas del sitio. Detalle en [PUBLICACION.md](PUBLICACION.md).
