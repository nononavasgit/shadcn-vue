<script setup lang="ts">
import { Badge } from '@/components/app/Badge'
import { Icon } from '@/components/app/Icon'

const variants = ['solid', 'outlined', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
</script>

<template>
  <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
    <div class="mx-auto max-w-6xl space-y-12">
      <header class="space-y-2">
        <p class="text-sm font-medium text-primary">@nonito/ui</p>
        <h1 class="text-3xl font-semibold tracking-tight">Badge</h1>
        <p class="max-w-2xl text-muted-foreground">Variants y severities del componente Badge.</p>
      </header>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Basic examples</h2>
          <p class="text-sm text-muted-foreground">
            Uso mediante label, slot, iconos y elementos personalizados.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Badge label="Default" />
          <Badge label="Secondary" severity="secondary" />
          <Badge label="Warning" severity="warning" />
          <Badge label="Success" severity="success" />
          <Badge label="Error" severity="error" />
          <Badge label="Custom color" color="#7c3aed" />

          <Badge label="Small" size="sm" variant="soft" />
          <Badge label="Medium" size="md" variant="soft" />
          <Badge label="Large" size="lg" variant="soft" />

          <Badge label="Verified" variant="soft" severity="success" icon="check" />

          <Badge
            as="a"
            href="#linked-badge"
            label="Linked badge"
            variant="outlined"
            severity="primary"
            trailing-icon="chevronRight"
          />
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Icons</h2>
          <p class="text-sm text-muted-foreground">
            Iconos mediante props, objetos de configuración y slots.
          </p>
        </div>

        <div class="flex flex-row flex-wrap items-center gap-3">
          <Badge label="Information" icon="info" variant="soft" />
          <Badge label="Completed" icon="check" severity="success" />
          <Badge label="Attention" trailing-icon="alert" severity="warning" variant="outlined" />
          <Badge
            label="Search"
            icon="search"
            trailing-icon="chevronRight"
            severity="secondary"
          />
          <Badge
            label="Configured icon"
            :icon="{ name: 'info', color: '#7c3aed', 'aria-hidden': true }"
            variant="outlined"
          />

          <Badge label="Slots" variant="subtle" severity="error">
            <template #leading>
              <Icon name="error" size="sm" />
            </template>
            <template #trailing>
              <Icon name="x" size="sm" />
            </template>
          </Badge>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Variants and severities</h2>
          <p class="text-sm text-muted-foreground">
            Cada variant puede combinarse con cualquier severity.
          </p>
        </div>

        <div class="overflow-x-auto rounded-xl border">
          <div class="grid min-w-5xl grid-cols-[8rem_repeat(5,minmax(8rem,1fr))]">
            <div class="border-b bg-muted/50 p-4 text-sm font-medium">Severity</div>
            <div
              v-for="variant in variants"
              :key="variant"
              class="border-b bg-muted/50 p-4 text-sm font-medium capitalize"
            >
              {{ variant }}
            </div>

            <template v-for="severity in severities" :key="severity">
              <div class="flex items-center border-b p-4 text-sm font-medium capitalize">
                {{ severity }}
              </div>
              <div
                v-for="variant in variants"
                :key="`${severity}-${variant}`"
                class="flex items-center border-b p-4"
              >
                <Badge :label="severity" :variant="variant" :severity="severity" />
              </div>
            </template>
          </div>
        </div>
      </section>

      <section id="linked-badge" class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Content and attributes</h2>
          <p class="text-sm text-muted-foreground">
            Contenido personalizado y atributos reenviados al elemento raÃ­z.
          </p>
        </div>

        <div class="flex flex-row items-center gap-3 overflow-x-auto pb-2">
          <Badge variant="subtle" severity="warning" title="Pending review">
            <Icon name="alert" />
            Pending review
          </Badge>

          <Badge variant="outlined" severity="error" aria-label="Three errors">
            <Icon name="error" />
            3 errors
          </Badge>

          <Badge class="rounded-full px-3" severity="success"> Custom classes </Badge>
        </div>
      </section>
    </div>
  </main>
</template>
