<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            @nononavas/shadcn-vue
          </p>
          <h1 class="text-3xl font-semibold">Instalación</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            Instala la librería, configura el provider y empieza a utilizar los componentes.
          </p>
        </header>

        <section class="grid gap-8">
          <article class="grid gap-3">
            <h2 class="text-xl font-semibold">1. Requisitos</h2>
            <ul class="grid gap-1 text-sm text-muted-foreground">
              <li>Vue 3.</li>
              <li>Tailwind CSS 4.</li>
              <li>Vite o Nuxt.</li>
            </ul>
          </article>

          <article class="grid gap-3">
            <h2 class="text-xl font-semibold">2. Instalación</h2>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>npm install @nononavas/shadcn-vue
npm install -D tailwindcss @tailwindcss/vite</code></pre>
          </article>

          <article class="grid gap-3">
            <h2 class="text-xl font-semibold">3. Configuración</h2>
            <p class="text-sm text-muted-foreground">
              Añade Tailwind a Vite e importa los estilos de la librería una sola vez.
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})</code></pre>
            <p class="text-sm text-muted-foreground">
              En el archivo CSS principal de la aplicación, importa los estilos de la librería:
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>@import '@nononavas/shadcn-vue/style.css';</code></pre>
            <p class="text-sm text-muted-foreground">
              En la raíz de la aplicación, envuelve el contenido con
              <code class="rounded bg-muted px-1 py-0.5">ConfigProvider</code>:
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>&lt;script setup lang="ts"&gt;
import { ConfigProvider } from '@nononavas/shadcn-vue/components/provider'
&lt;/script&gt;

&lt;template&gt;
  &lt;ConfigProvider&gt;
    &lt;RouterView /&gt;
  &lt;/ConfigProvider&gt;
&lt;/template&gt;</code></pre>
            <p class="text-sm text-muted-foreground">
              Después importa cualquier componente desde
              <code class="rounded bg-muted px-1 py-0.5">components/ui</code>:
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>&lt;script setup lang="ts"&gt;
import { Button } from '@nononavas/shadcn-vue/components/ui/Button'
&lt;/script&gt;

&lt;template&gt;
  &lt;Button label="Guardar" /&gt;
&lt;/template&gt;</code></pre>
          </article>

          <article class="grid gap-3">
            <h2 class="text-xl font-semibold">4. Idioma</h2>
            <p class="text-sm text-muted-foreground">
              La librería incluye
              <code class="rounded bg-muted px-1 py-0.5">en</code>,
              <code class="rounded bg-muted px-1 py-0.5">es</code>,
              <code class="rounded bg-muted px-1 py-0.5">ar</code>,
              <code class="rounded bg-muted px-1 py-0.5">pt-BR</code> y
              <code class="rounded bg-muted px-1 py-0.5">pt-PT</code>. Cambia el idioma con
              <code class="rounded bg-muted px-1 py-0.5">setLocale</code>:
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>import { setLocale } from '@nononavas/shadcn-vue'

setLocale('es')</code></pre>
            <p class="text-sm text-muted-foreground">
              El árabe utiliza dirección RTL. También se normalizan valores como
              <code class="rounded bg-muted px-1 py-0.5">es-ES</code> y
              <code class="rounded bg-muted px-1 py-0.5">pt_BR</code>.
            </p>
          </article>

          <article class="grid gap-3">
            <h2 class="text-xl font-semibold">5. Temas CSS</h2>
            <p class="text-sm text-muted-foreground">
              Personaliza el tema sobrescribiendo las variables CSS:
            </p>
            <pre
              class="overflow-x-auto rounded-lg border bg-card p-4 text-sm text-card-foreground"
            ><code>:root {
  --primary: oklch(0.55 0.2 260);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  --radius: 0.625rem;
}

.dark {
  --primary: oklch(0.7 0.18 260);
}</code></pre>
          </article>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
</script>
