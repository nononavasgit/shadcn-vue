<script setup lang="ts">
import DocsLayout from '../DocsLayout.vue'
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-8">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Integrations
          </p>
          <h1 class="text-3xl font-semibold">Iconos</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">
            La librería utiliza iconos de Lucide a través del componente
            <code class="rounded bg-muted px-1.5 py-0.5">Icon</code>.
          </p>
        </header>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Usar un icono</h2>
          <pre
            class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"
          ><code>&lt;script setup lang="ts"&gt;
import { Icon } from '@nononavas/shadcn-vue/components/ui/Icon'
&lt;/script&gt;

&lt;template&gt;
  &lt;Icon name="search" size="md" /&gt;
&lt;/template&gt;</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
          <h2 class="text-xl font-semibold">Iconos en componentes</h2>
          <pre class="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"><code>&lt;Button
  label="Guardar"
  :icon="{ name: 'save' }"
  :trailing-icon="{ name: 'chevronRight' }"
/&gt;</code></pre>
          <p class="text-sm text-muted-foreground">
            Los nombres disponibles están tipados mediante
            <code class="rounded bg-muted px-1.5 py-0.5">IconName</code> y el mapa público
            <code class="rounded bg-muted px-1.5 py-0.5">ICONS</code>.
          </p>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>
