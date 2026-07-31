<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Sheet } from '@/components/ui/Sheet'

const name = ref('')
const email = ref('usuario@ejemplo.com')
const customInput = ref('Valor personalizado')
const dialogOpen = ref(false)
const sheetOpen = ref(false)
</script>

<template>
  <main class="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Input, Dialog y Sheet</h1>
      <p class="text-muted-foreground">
        Ejemplos con props funcionales agrupadas y atributos UI normalizados.
      </p>
    </header>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Input</h2>
        <p class="text-sm text-muted-foreground">Valores reactivos y estados habituales.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <label class="space-y-2">
          <span class="text-sm font-medium">Nombre</span>
          <Input v-model="name" placeholder="Escribe tu nombre" aria-label="Nombre" />
          <span class="block text-xs text-muted-foreground">Valor: {{ name || 'vacío' }}</span>
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Correo electrónico</span>
          <Input v-model="email" type="email" aria-label="Correo electrónico" />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Valor inicial</span>
          <Input default-value="Contenido inicial" aria-label="Valor inicial" />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium">Deshabilitado</span>
          <Input disabled value="No editable" aria-label="Input deshabilitado" />
        </label>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Input personalizado</h2>
        <p class="text-sm text-muted-foreground">ui.root admite atributos HTML normalizados.</p>
      </div>

      <div class="max-w-lg space-y-2">
        <Input
          v-model="customInput"
          :ui="{
            root: {
              class:
                'h-11 rounded-xl border-primary/40 bg-primary/5 font-medium text-primary shadow-sm',
              title: 'Input personalizado',
            },
          }"
          aria-label="Input personalizado"
        />
        <p class="text-sm text-muted-foreground">{{ customInput }}</p>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Dialog básico</h2>
        <p class="text-sm text-muted-foreground">
          Trigger, content y close contienen sus props funcionales.
        </p>
      </div>

      <Dialog
        label="Editar perfil"
        description="Actualiza la información pública de tu perfil."
        icon="info"
        :ui="{
          close: {
            class:
              'rounded-full border border-primary/50 bg-primary/10 text-primary hover:bg-primary/20',
          },
        }"
      >
        <Button label="Abrir Dialog" variant="outline" />

        <template #content>
          <div class="grid gap-4 py-2">
            <label class="space-y-2">
              <span class="text-sm font-medium">Nombre visible</span>
              <Input default-value="Nononavas" aria-label="Nombre visible" />
            </label>
            <label class="space-y-2">
              <span class="text-sm font-medium">Usuario</span>
              <Input default-value="@nononavas" aria-label="Usuario" />
            </label>
          </div>
        </template>

        <template #footer="{ close }">
          <Button label="Cancelar" variant="outline" @click="close" />
          <Button label="Guardar" icon="save" @click="close" />
        </template>
      </Dialog>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Dialog controlado y UI</h2>
        <p class="text-sm text-muted-foreground">
          Estado: {{ dialogOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <Dialog
        v-model:open="dialogOpen"
        label="Confirmar operación"
        description="Esta acción actualizará los datos seleccionados."
        icon="warning"
        :content="{ disableOutsidePointerEvents: true }"
        :ui="{
          root: { 'data-example': 'controlled-dialog' },
          trigger: { class: 'rounded-lg ring-2 ring-warning/20' },
          content: { class: 'border-2 border-warning/30 shadow-xl' },
          header: { class: 'rounded-md bg-warning/5 p-3' },
          title: { class: 'text-warning' },
          icon: { class: 'size-5' },
          description: { class: 'text-warning/70' },
          body: { class: 'py-6' },
          footer: { class: 'bg-muted/40' },
          close: { class: 'text-warning', title: 'Cerrar confirmación' },
        }"
      >
        <template #default="{ open }">
          <Button :label="open ? 'Dialog abierto' : 'Abrir confirmación'" severity="warning" />
        </template>

        <template #content>
          <p class="text-sm text-muted-foreground">
            Revisa la información antes de confirmar la operación.
          </p>
        </template>

        <template #footer="{ close }">
          <Button label="Volver" variant="outline" @click="close" />
          <Button label="Confirmar" severity="warning" @click="close" />
        </template>
      </Dialog>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Sheet por posiciones</h2>
        <p class="text-sm text-muted-foreground">La posición pertenece al objeto content.</p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Sheet
          v-for="side in ['top', 'right', 'bottom', 'left'] as const"
          :key="side"
          :label="`Sheet ${side}`"
          description="Contenido lateral con posición configurable."
          :content="{ side }"
        >
          <Button :label="side" variant="outline" />

          <template #content>
            <div class="space-y-3 py-4">
              <p class="text-sm text-muted-foreground">Este Sheet aparece desde {{ side }}.</p>
              <Input placeholder="Campo de ejemplo" aria-label="Campo del Sheet" />
            </div>
          </template>

          <template #footer="{ close }">
            <Button label="Cerrar" class="w-full" @click="close" />
          </template>
        </Sheet>
      </div>
    </section>

    <section class="space-y-6 rounded-xl border p-5">
      <div>
        <h2 class="text-lg font-semibold">Sheet controlado y personalizado</h2>
        <p class="text-sm text-muted-foreground">
          Estado: {{ sheetOpen ? 'abierto' : 'cerrado' }}.
        </p>
      </div>

      <Sheet
        v-model:open="sheetOpen"
        label="Configuración"
        description="Personaliza las preferencias de la aplicación."
        icon="save"
        :trigger="{ asChild: true }"
        :content="{
          side: 'right',
          forceMount: false,
          disableOutsidePointerEvents: true,
        }"
        :close="{ as: 'button' }"
        :ui="{
          root: { 'data-example': 'custom-sheet' },
          trigger: { class: 'rounded-lg ring-2 ring-primary/20' },
          content: { class: 'w-full border-l-2 border-primary/30 sm:max-w-md' },
          header: { class: 'bg-primary/5' },
          label: { class: 'text-primary' },
          icon: { class: 'size-5' },
          description: { class: 'text-primary/70' },
          body: { class: 'space-y-5 py-6' },
          footer: { class: 'border-t bg-muted/30' },
          close: { class: 'text-primary', title: 'Cerrar configuración' },
        }"
      >
        <template #default="{ open }">
          <Button :label="open ? 'Sheet abierto' : 'Abrir configuración'" />
        </template>

        <template #content>
          <label class="block space-y-2">
            <span class="text-sm font-medium">Nombre del espacio</span>
            <Input default-value="Mi espacio" aria-label="Nombre del espacio" />
          </label>
          <label class="block space-y-2">
            <span class="text-sm font-medium">Descripción</span>
            <Input placeholder="Descripción opcional" aria-label="Descripción" />
          </label>
        </template>

        <template #footer="{ close }">
          <div class="flex w-full gap-2">
            <Button label="Cancelar" variant="outline" class="flex-1" @click="close" />
            <Button label="Guardar" icon="save" class="flex-1" @click="close" />
          </div>
        </template>
      </Sheet>
    </section>
  </main>
</template>
