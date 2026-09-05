---
name: docs-examples
description: Crea o actualiza la pagina de documentacion y los ejemplos copiables de componentes Vue de este repositorio. Usala al documentar props, emits, slots, expose, tipos o contextos en docs/components.
---

# Documentacion y ejemplos de componentes

Inspecciona primero el contrato publico del componente, sus defaults, tipos, emits y slots. Conserva los cambios existentes del usuario y sigue como referencia directa un componente reciente con contrato parecido; usa `LinearChart` cuando se solicite expresamente su formato.

## Documentacion API

Crea o actualiza `docs/components/docs/<Component>Docs.vue` con `ApiTable`. Incluye Props, Emits, Slots y Expose, y añade tablas separadas para tipos publicos y contextos usados por props, slots o resolvers `ui`.

- Usa los defaults reales importados cuando resulte practico.
- Enlaza `IconConfig` con `/icon#icon-config` y `ButtonConfig` con `/button#button-config`.
- Enlaza tipos locales con anchors de la propia pagina mediante `typeLink`.
- Para tipos compuestos que contienen enlaces, usa `typeParts`.
- Documenta `ui` dentro de la fila de la prop `ui`, enumerando cada resolver y enlazando su contexto.
- En las filas de slots usa `type-label="slotProps"`; enlaza cada slot a su tipo de contexto y crea la tabla de ese contexto.
- Describe el comportamiento observable y la accesibilidad relevante.

## Ejemplos

Crea o actualiza `docs/components/examples/<component>/<Component>Examples.vue`. Cada prop, emit y slot publico debe tener un ejemplo relacionado y un bloque de codigo completo que se pueda copiar. Incluye valores normales y usa ejemplos separados para miembros de una union cuando su resultado sea distinto.

Los ejemplos interactivos deben poder reiniciarse. El codigo mostrado debe importar todo lo que usa, compilar al copiarse y coincidir con la vista renderizada. Retira ejemplos de APIs eliminadas. No importes primitivas unstyled salvo que el contrato publico requiera que el consumidor las use.

Registra la pagina en `docs/router.ts` y `docs/config/components.ts` cuando sea nueva. Si la pagina ya incluye ejemplos exhaustivos, evita que `ComponentApiExamples` los duplique.

## Verificacion

Ejecuta Prettier y ESLint sobre los archivos modificados, compila la documentacion y revisa que cada miembro del contrato tenga una fila y un ejemplo. Distingue fallos preexistentes de los introducidos por el cambio.
