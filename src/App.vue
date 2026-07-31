<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Collapsible } from '@/components/ui/Collapsible'
import { InputOTP } from '@/components/ui/InputOTP'
import { Panel } from '@/components/ui/Panel'

const numericCode = ref('')
const groupedCode = ref('')
const detailsOpen = ref(false)
const accountPanelOpen = ref(true)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">InputOTP, Collapsible y Panel</h1>
      <p class="text-muted-foreground">
        Ejemplos de UI normalizada, props funcionales, estado controlado y slots.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">InputOTP básico</h2>
        <p class="text-sm text-muted-foreground">Código actual: {{ numericCode || 'vacío' }}</p>
      </div>

      <InputOTP
        v-model="numericCode"
        :maxlength="6"
        pattern="digits"
        :ui="{
          root: { 'aria-label': 'Código de verificación' },
          group: { class: 'shadow-sm' },
          slot: { class: 'size-11 text-base' },
        }"
      />
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">InputOTP agrupado y UI contextual</h2>
        <p class="text-sm text-muted-foreground">
          Código alfanumérico: {{ groupedCode || 'vacío' }}
        </p>
      </div>

      <InputOTP
        v-model="groupedCode"
        :maxlength="8"
        :groups="[2, 3, 3]"
        pattern="alphanumeric"
        inputmode="text"
        :ui="{
          root: { class: 'flex-wrap' },
          group: ({ first, last }) => ({
            class: [first && 'ring-2 ring-primary/20', last && 'shadow-md'],
          }),
          slot: ({ index }) => ({
            class: index % 2 === 0 ? 'bg-muted/60' : 'bg-background',
            title: `Posición ${index + 1}`,
          }),
          separator: { class: 'text-primary' },
        }"
      >
        <template #separator="{ index }">
          <span class="px-1 font-bold" :aria-label="`Separador ${index + 1}`">/</span>
        </template>
      </InputOTP>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Collapsible controlado</h2>
        <p class="text-sm text-muted-foreground">
          Estado: {{ detailsOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <Collapsible v-model:open="detailsOpen">
        <template #default="{ open }">
          <Button
            :label="open ? 'Ocultar detalles' : 'Mostrar detalles'"
            :icon="open ? 'chevronUp' : 'chevronDown'"
            variant="plain"
            class="w-full justify-between"
          />
        </template>

        <template #content="{ open }">
          Este contenido permanece montado gracias a <code>content.forceMount</code>. Estado:
          {{ open ? 'visible' : 'oculto' }}.
        </template>
      </Collapsible>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Collapsible con elementos personalizados</h2>
        <p class="text-sm text-muted-foreground">
          Las props funcionales se normalizan por separado de los atributos HTML de <code>ui</code>.
        </p>
      </div>

      <Collapsible
        :trigger="{ asChild: false, as: 'button' }"
        :content="{ as: 'article' }"
        :ui="{
          trigger: {
            class: 'rounded-md bg-secondary px-4 py-2 text-sm font-medium',
          },
          content: { class: 'mt-2 max-w-xl rounded-md border p-4 text-sm' },
        }"
      >
        <template #default="{ open }">Preferencias {{ open ? '−' : '+' }}</template>
        <template #content>Notificaciones, privacidad y configuración de la cuenta.</template>
      </Collapsible>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Panel controlado y variantes</h2>
        <p class="text-sm text-muted-foreground">
          Panel principal: {{ accountPanelOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <Panel
          v-model:open="accountPanelOpen"
          label="Configuración de cuenta"
          icon="info"
          severity="primary"
          :ui="{
            root: { class: 'self-start' },
            label: { class: 'font-semibold' },
            content: { class: 'space-y-3' },
          }"
        >
          <p class="text-sm text-muted-foreground">
            Gestiona tus datos personales y las preferencias de acceso.
          </p>
          <Button label="Guardar cambios" icon="save" size="sm" />
        </Panel>

        <Panel
          label="Estado del servicio"
          severity="success"
          variant="outline"
          :collapsible="false"
          :icon="{ name: 'success', color: 'var(--success)' }"
          :ui="{ content: { class: 'text-sm text-muted-foreground' } }"
        >
          Todos los sistemas funcionan correctamente.
        </Panel>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Panel con slots y anidamiento</h2>
        <p class="text-sm text-muted-foreground">Cabecera y contenido personalizables.</p>
      </div>

      <Panel label="Proyecto" severity="warning" variant="soft">
        <template #icon="{ open }">
          <span class="grid size-6 place-items-center rounded-full bg-warning/20 text-xs">
            {{ open ? '−' : '+' }}
          </span>
        </template>

        <template #label="{ open }">Proyecto Atlas · {{ open ? 'activo' : 'resumido' }}</template>

        <Panel
          label="Despliegue"
          icon="chevronRight"
          severity="secondary"
          variant="outline"
          :ui="{ root: { class: 'shadow-none' }, content: { class: 'text-sm' } }"
        >
          Rama principal desplegada correctamente.
        </Panel>
      </Panel>
    </section>
  </main>
</template>
