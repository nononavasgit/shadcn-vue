<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Theme</p>
          <h1 class="text-3xl font-semibold">Design system</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            Una base visual consistente construida con Tailwind CSS 4, Reka UI y variantes tipadas.
          </p>
        </header>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Cómo funciona</h2>
          <p class="text-sm text-muted-foreground">
            Los componentes combinan props, variantes, slots y la utilidad
            <code class="rounded bg-muted px-1.5 py-0.5">ui</code> para personalizar cada parte sin
            copiar el componente.
          </p>
          <pre class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"><code>&lt;Button
  variant="outline"
  severity="primary"
  size="md"
  :ui="{ root: () =&gt; ({ class: 'rounded-full' }) }"
&gt;
  Guardar
&lt;/Button&gt;</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Variantes</h2>
          <p class="text-sm text-muted-foreground">
            Las props como <code class="rounded bg-muted px-1.5 py-0.5">variant</code>,
            <code class="rounded bg-muted px-1.5 py-0.5">severity</code> y
            <code class="rounded bg-muted px-1.5 py-0.5">size</code> controlan estilos con tipos
            TypeScript y clases Tailwind.
          </p>
          <pre
            class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"
          ><code>&lt;Button variant="solid" severity="success" label="Confirmar" /&gt;
&lt;Button variant="outline" severity="warning" label="Revisar" /&gt;
&lt;Button variant="plain" severity="error" label="Eliminar" /&gt;</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Slots y clases</h2>
          <p class="text-sm text-muted-foreground">
            Usa slots cuando necesites cambiar el contenido y
            <code class="rounded bg-muted px-1.5 py-0.5">class</code> o
            <code class="rounded bg-muted px-1.5 py-0.5">ui</code> cuando solo necesites ajustar la
            presentación.
          </p>
          <pre
            class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"
          ><code>&lt;Button class="rounded-full" label="Perfil" /&gt;

&lt;Alert :ui="{ root: () =&gt; ({ class: 'border-primary' }) }"&gt;
  &lt;template #description&gt;
    Mensaje personalizado
  &lt;/template&gt;
&lt;/Alert&gt;</code></pre>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>
