# @nononavas/shadcn-vue

Sistema híbrido de componentes para Vue 3 y Nuxt, construido con Reka UI, Tailwind CSS 4 y Lucide.

La librería se distribuye de dos maneras:

- `components/ui`, composables, utilidades, iconos y estilos se instalan como un paquete npm normal.
- `components/app` se copia dentro de cada aplicación, al estilo shadcn, para que el proyecto consumidor pueda modificarlo.

## Cómo funciona

Al ejecutar:

```bash
npx @nononavas/shadcn-vue@latest init
```

el CLI:

1. Comprueba que el directorio tenga un `package.json` y Vue instalado.
2. Detecta si el proyecto usa npm, pnpm, Yarn o Bun.
3. Instala `@nononavas/shadcn-vue`.
4. Instala `tailwindcss` y `@tailwindcss/vite` como dependencias de desarrollo.
5. npm instala también las dependencias internas del paquete: Reka UI, Lucide, CVA, `clsx` y `tailwind-merge`.
6. Copia todos los archivos de `components/app` en la aplicación.
7. Convierte los imports internos para consumir `ui`, composables y utilidades desde el paquete.
8. Convierte las relaciones entre componentes `app` en rutas relativas.
9. Genera `nononavas-ui.json` con la versión y el hash de cada archivo copiado.

El resultado predeterminado es:

```text
mi-aplicacion/
├─ node_modules/
│  └─ @nononavas/shadcn-vue/
│     └─ dist/
│        ├─ components/ui/
│        ├─ composables/
│        ├─ lib/
│        ├─ assets/
│        └─ style.css
├─ src/
│  └─ components/
│     └─ app/
│        ├─ Button/
│        ├─ Icon/
│        ├─ Dialog/
│        └─ ...
└─ nononavas-ui.json
```

Un componente copiado utiliza imports como:

```ts
import { button as Button } from '@nononavas/shadcn-vue/components/ui/Button'
import { useColor } from '@nononavas/shadcn-vue/composables'
import { cn } from '@nononavas/shadcn-vue/lib/utils'
import { Icon } from '../Icon'
```

Los tres primeros imports se resuelven mediante `exports` del paquete. `../Icon` apunta a otro componente copiado dentro de la aplicación. Los componentes generados no necesitan el alias `@`.

## Vue 3 con Vite

### 1. Inicializar

Desde la raíz del proyecto:

```bash
npx @nononavas/shadcn-vue@latest init
```

También puedes instalar primero el paquete:

```bash
npm install @nononavas/shadcn-vue
npx @nononavas/shadcn-vue@latest init
```

La primera orden ya instala el paquete, por lo que normalmente no necesitas ejecutar `npm install` por separado.

### 2. Configurar Tailwind

El CLI instala las dependencias, pero no modifica automáticamente tu configuración. Registra el plugin oficial de Tailwind en `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

Consulta también la [guía oficial de Tailwind para Vite](https://tailwindcss.com/docs/installation/using-vite).

### 3. Importar los estilos

En `src/main.ts`:

```ts
import '@nononavas/shadcn-vue/style.css'
```

### 4. Usar un componente

```vue
<script setup lang="ts">
import { Boton } from './components/ui/Button'
</script>

<template>
  <Boton label="Guardar" />
</template>
```

Si tu aplicación ya tiene configurado `@` como alias de `src`, también puedes usar:

```ts
import { Boton } from '@/components/ui/Button'
```

## Nuxt 4

Nuxt 4 utiliza `app/` como directorio de código fuente de manera predeterminada. Sus componentes se guardan en `app/components/`.

### 1. Inicializar

```bash
npx @nononavas/shadcn-vue@latest init --app-dir app/components/app
```

El resultado será:

```text
app/components/app/
├─ Button/
├─ Icon/
├─ Dialog/
└─ ...
```

Nuxt detecta automáticamente los componentes colocados en su directorio de componentes. Consulta la [estructura oficial de Nuxt 4](https://nuxt.com/docs/4.x/getting-started/upgrade#new-directory-structure).

### 2. Configurar Tailwind y los estilos

En `nuxt.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['@nononavas/shadcn-vue/style.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

### 3. Usar los componentes

Puedes utilizar el auto-import de Nuxt o importar explícitamente:

```vue
<script setup lang="ts">
import { Boton } from '~/components/app/Button'
</script>

<template>
  <Boton label="Guardar" />
</template>
```

En Nuxt 4, `~` apunta normalmente a `app/`.

## Nuxt 3 o Nuxt con estructura clásica

Si el proyecto utiliza `components/` en la raíz:

```bash
npx @nononavas/shadcn-vue@latest init --app-dir components/app
```

Configura `nuxt.config.ts` igual que en el ejemplo anterior:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['@nononavas/shadcn-vue/style.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

## Opciones de `init`

```text
--cwd <directorio>       Proyecto consumidor
--package <nombre>       Paquete real
--alias <nombre>         Prefijo usado en los imports
--app-dir <directorio>   Destino de los componentes (por defecto: src/components/ui)
--skip-install           No instala el paquete ni Tailwind
--force                  Reemplaza archivos existentes
```

Ejemplos:

```bash
# Inicializar otro directorio
npx @nononavas/shadcn-vue@latest init --cwd ../mi-aplicacion

# Elegir otro destino
npx @nononavas/shadcn-vue@latest init --app-dir src/catalogo/app

# Probar el CLI sin instalar dependencias
node ../shadcn-vue/bin/shadcn-vue.mjs init --cwd . --skip-install
```

## Rutas públicas del paquete

```ts
import { button } from '@nononavas/shadcn-vue/components/ui/Button'
import { Dialog } from '@nononavas/shadcn-vue/components/ui/Dialog'
import { useColor } from '@nononavas/shadcn-vue/composables'
import { useDate } from '@nononavas/shadcn-vue/composables/useDate'
import { cn } from '@nononavas/shadcn-vue/lib/utils'
import { ICONS } from '@nononavas/shadcn-vue/assets/icons'
import '@nononavas/shadcn-vue/style.css'
```

## Actualizar la infraestructura instalada

Para actualizar `components/ui`, composables, utilidades, iconos y estilos:

```bash
npm update @nononavas/shadcn-vue
```

También puedes instalar una versión concreta:

```bash
npm install @nononavas/shadcn-vue@0.2.0
```

Esto no modifica los archivos copiados en `components/app`.

## Actualizar los componentes copiados

Utiliza siempre la última versión del CLI:

```bash
npx @nononavas/shadcn-vue@latest update
```

El comando instala la última versión del paquete y compara cada componente con el hash guardado durante `init`.

### Archivo sin modificaciones locales

Se actualiza automáticamente:

```text
actualizado Button/Button.vue
```

### Componente nuevo

Se copia automáticamente:

```text
nuevo DatePicker/index.ts
nuevo DatePicker/DatePicker.vue
```

### Archivo modificado por la aplicación

El archivo local se conserva y la versión nueva se escribe con la extensión `.new`:

```text
Button.vue       # Tu versión modificada
Button.vue.new   # Nueva versión del paquete
```

El CLI informa del conflicto:

```text
conflicto Button/Button.vue -> Button/Button.vue.new
```

Compara ambos archivos, incorpora los cambios que necesites y elimina `.new` cuando termines.

### Forzar el reemplazo

```bash
npx @nononavas/shadcn-vue@latest update --force
```

`--force` reemplaza archivos modificados. Confirma tus cambios en Git antes de usarlo.

### Archivos eliminados del catálogo

`update` no borra automáticamente componentes de la aplicación aunque hayan desaparecido del paquete. Esto evita eliminar código que el proyecto pueda seguir utilizando.

## Archivo `nononavas-ui.json`

El CLI genera:

```json
{
  "package": "@nononavas/shadcn-vue",
  "alias": "@nononavas/shadcn-vue",
  "appDirectory": "src/components/ui",
  "version": "0.1.1",
  "files": {
    "Button/Button.vue": "hash-sha256",
    "Button/index.ts": "hash-sha256"
  }
}
```

No edites manualmente los hashes. Se utilizan para distinguir los archivos intactos de los modificados por la aplicación.

## Desarrollo local de la librería

```bash
npm install
npm run typecheck
npm run build
```

Revisar qué se publicará:

```bash
npm pack --dry-run
```

## Publicar una actualización

Una versión ya publicada no puede sobrescribirse. Incrementa la versión:

```bash
npm version patch
```

Utiliza `minor` para funcionalidad nueva compatible y `major` para cambios incompatibles:

```bash
npm version minor
npm version major
```

Después:

```bash
npm run typecheck
npm run build
npm pack --dry-run
npm publish
```

Proceso completo:

1. Modificas la infraestructura o los componentes plantilla.
2. Incrementas la versión.
3. Compilas y publicas.
4. La aplicación ejecuta `npm update` para actualizar la infraestructura.
5. La aplicación ejecuta `npx @nononavas/shadcn-vue@latest update` para actualizar las copias `app`.
6. Los archivos modificados localmente producen un `.new` y no se sobrescriben.
