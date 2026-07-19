# @nonito/ui

Librería personal de componentes Vue 3 basada en shadcn-vue, Tailwind CSS 4 y Vite.

## Desarrollo

```bash
npm install
npm run dev
```

`src/App.vue` es únicamente el escaparate local. La API pública está en `src/index.ts`.

## Añadir componentes

```bash
npx shadcn-vue@latest add button
```

Después de añadir uno, expórtalo desde `src/index.ts`. Revisa el componente antes de sobrescribir uno personalizado.

## Consumir desde otra app

```bash
npm install ../ruta/a/shadcn-vue
```

```ts
import { Button } from '@nonito/ui'
import '@nonito/ui/style.css'
```

Para publicar, cambia `name` por tu scope real y usa `npm publish --access public`.

## Comandos

- `npm run dev`: escaparate con HMR.
- `npm run typecheck`: comprueba TypeScript y Vue.
- `npm run build`: genera `dist`.
- `npm run check`: ejecuta typecheck y build.
