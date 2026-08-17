# @nononavas/shadcn-vue

Librería de componentes para Vue 3 y Nuxt construida con Reka UI, Tailwind CSS 4 y Lucide.

## Estructura

La librería se distribuye íntegramente como paquete npm:

- `components/primitives`: primitivas y wrappers de bajo nivel sobre Reka UI.
- `components/ui`: componentes finales con props, variantes, `ui` y slots.
- `composables`: utilidades reactivas públicas.
- `lib`, iconos y estilos compartidos.

Los componentes no se copian al código fuente de la aplicación consumidora. Las actualizaciones se
gestionan mediante la versión del paquete npm.

## Instalación

```bash
npm install @nononavas/shadcn-vue
npm install -D tailwindcss @tailwindcss/vite
```

También se puede utilizar el asistente:

```bash
npx @nononavas/shadcn-vue@latest init
```

El asistente instala el paquete y las dependencias de Tailwind. No genera ni modifica componentes
locales.

## Vue 3 con Vite

Registra Tailwind en `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

Importa los estilos globales en `src/main.ts`:

```ts
import '@nononavas/shadcn-vue/style.css'
```

Después importa los componentes finales desde `components/ui`:

```vue
<script setup lang="ts">
import { Button } from '@nononavas/shadcn-vue/components/ui/Button'
import { Tabs } from '@nononavas/shadcn-vue/components/ui/Tabs'
</script>

<template>
  <Button label="Guardar" />
  <Tabs />
</template>
```

## Nuxt

Configura Tailwind y los estilos en `nuxt.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['@nononavas/shadcn-vue/style.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

Los componentes se importan directamente desde el paquete:

```vue
<script setup lang="ts">
import { Button } from '@nononavas/shadcn-vue/components/ui/Button'
</script>

<template>
  <Button label="Guardar" />
</template>
```

## Componentes finales y primitivas

En aplicaciones consumidoras se recomienda utilizar `components/ui`:

```ts
import { Dialog } from '@nononavas/shadcn-vue/components/ui/Dialog'
```

Las primitivas también son públicas para composiciones avanzadas:

```ts
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@nononavas/shadcn-vue/components/primitives/Dialog'
```

## Personalización

Los componentes finales ofrecen varios niveles de personalización:

- Props y variantes para los casos habituales.
- La prop `ui` para clases y atributos de cada parte.
- Slots globales e individuales para sustituir contenido.
- Wrappers locales cuando una aplicación necesita comportamiento adicional.

Si una aplicación necesita una implementación completamente distinta, puede crear su propio
componente utilizando las primitivas públicas.

## Actualización

Actualiza la librería mediante npm:

```bash
npm update @nononavas/shadcn-vue
```

Para instalar expresamente la última versión:

```bash
npm install @nononavas/shadcn-vue@latest
```

La actualización no crea archivos `.new` ni modifica el código fuente de la aplicación. Git y el
archivo de bloqueo del gestor de paquetes registran el cambio de versión.

## Rutas públicas

```ts
import { Button } from '@nononavas/shadcn-vue/components/ui/Button'
import { DialogContent } from '@nononavas/shadcn-vue/components/primitives/Dialog'
import { useColor } from '@nononavas/shadcn-vue/composables'
import { useDates } from '@nononavas/shadcn-vue/composables/useDates'
import { cn } from '@nononavas/shadcn-vue/lib/utils'
import { ICONS } from '@nononavas/shadcn-vue/assets/icons'
import '@nononavas/shadcn-vue/style.css'
```

## Desarrollo

```bash
npm install
npm run check
npm pack --dry-run
```

## Publicación

Incrementa la versión según semver:

```bash
npm version patch
npm publish
```

Utiliza `minor` para funcionalidad compatible y `major` para cambios incompatibles.
