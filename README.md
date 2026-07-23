# @nonito/ui

Base personal para construir componentes Vue 3 con Reka UI, Tailwind CSS 4 y los iconos de `@lucide/vue`.

El proyecto no incluye componentes preconstruidos. `src/index.js` es la entrada pública donde puedes exportar los componentes que vayas creando.

## Utilidades públicas

```js
import { cn, cv, cva } from '@nonito/ui'
import '@nonito/ui/style.css'
```

- `cn` y `cv` combinan clases condicionales y resuelven conflictos de Tailwind.
- `cva` crea variantes tipadas mediante `class-variance-authority`.

## Desarrollo

```bash
npm install
npm run dev
npm run check
```

Los componentes nuevos pueden usar los primitivos de `reka-ui` y los iconos de `@lucide/vue` directamente.
