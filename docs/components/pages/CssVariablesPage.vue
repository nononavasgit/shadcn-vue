<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Theme</p>
          <h1 class="text-3xl font-semibold">Variables CSS</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            Personaliza los colores, radios y tokens semánticos desde tu hoja de estilos.
          </p>
        </header>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Tokens principales</h2>
          <p class="text-sm text-muted-foreground">
            Define las variables en <code class="rounded bg-muted px-1.5 py-0.5">:root</code> y
            sobrescribe los valores del tema oscuro en
            <code class="rounded bg-muted px-1.5 py-0.5">.dark</code>.
          </p>
          <pre class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"><code>:root {
  --primary: oklch(0.55 0.2 260);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  --radius: 0.625rem;
}

.dark {
  --primary: oklch(0.7 0.18 260);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Variables disponibles</h2>
          <div class="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <code>--background</code>
            <code>--foreground</code>
            <code>--card</code>
            <code>--popover</code>
            <code>--primary</code>
            <code>--secondary</code>
            <code>--muted</code>
            <code>--accent</code>
            <code>--destructive</code>
            <code>--success</code>
            <code>--warning</code>
            <code>--error</code>
            <code>--border</code>
            <code>--input</code>
            <code>--ring</code>
            <code>--radius</code>
          </div>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>
