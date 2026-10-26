# Estado público de la entrega LIF

22 de octubre de 2026, Costa Rica. Revisión R2.

## Alcance aprobado

Daniel aprobó los cambios visuales del sitio local y autorizó actualizar ambos repositorios GitHub y Sites. Esta variante WorkInProgress conserva Renzo, comunidad y las historias de Confesiones en construcción, con hero y formulario activos. La referencia completa mantiene todo el contenido visible.

R2 reúne el arte vectorial del hero, los fondos nuevos de footer, recetario y contacto, el sello Con stevia actualizado y Bajo en calorías original. En móvil se muestra un solo sticker arriba a la izquierda con desvanecimiento por opacidad. En escritorio se evitan duplicados de los sellos laterales y se despeja el vaso. La bienvenida utiliza Actual → Hielo fluido → Ajustado.

La corrección final de R2 evita que la entrada automática deje el foco en el logo del encabezado. Entrar, Escape, repetición manual o interacción con controles mantienen la restauración de foco correspondiente. Los anillos de foco del teclado permanecen activos.

## Enlaces y estado

- [LIF en Netlify, variante WorkInProgress](https://lifnewsitev1.netlify.app/).
- [LIF en Sites, referencia completa](https://lifnewsitev1.danielviquez19.chatgpt.site/).

Sites ya tiene publicada la revisión final con la corrección de foco. La actualización de ambos repositorios GitHub está en curso. La nueva actualización de Netlify debe confirmarse después de incorporar esta entrega; una distribución preparada no prueba por sí sola que el sitio público haya cambiado.

Los paquetes R2 sustituyen a las distribuciones iniciales preparadas el mismo día, antes de incorporarlas a GitHub. El historial anterior se conserva en Git.

## Comprobaciones realizadas

- TypeScript y compilación correctos.
- WorkInProgress preparado: 12 páginas HTML y 113 referencias de recursos comprobadas sin faltantes.
- Sites completo: 11 páginas HTML, 128 referencias sin faltantes y 136 recursos públicos idénticos a fuente.
- En el Sites público se comprobaron nueve recursos gráficos y de audio con los mismos bytes de la fuente aprobada.
- Home y sus estilos y scripts enlazados respondieron correctamente. El código servido conserva el sticker móvil a la izquierda, el desvanecimiento de 450 ms, la selección `ice4` y la corrección del foco automático. Entrar y Escape restauran el foco explícitamente; el traslado conserva sus 520 ms.
- Solo se realizaron consultas de lectura. No se enviaron formularios ni registros de participantes.

## Límites de la revisión

La comprobación visual automatizada final de los fondos dentro del navegador sigue pendiente porque su control local está desactivado. Las vistas aisladas de SVG permiten revisar el arte, pero no sustituyen capturas del sitio. Safari en un iPhone físico y las pruebas de carga permanecen pendientes.

Esta guía pública registra el comportamiento, las pruebas y los enlaces de revisión. Los resultados de una nueva publicación deben confirmarse antes de declararla completada.
