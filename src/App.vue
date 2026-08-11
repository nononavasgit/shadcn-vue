<script setup lang="ts">
import { ref } from 'vue'
import { ConfigProvider } from '@/components/provider'
import { Checkbox, Label } from '@/components/ui'

const notifications = ref(true)
const plan = ref<'pro' | 'free'>('free')
const selection = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <ConfigProvider>
    <main class="min-h-screen bg-background p-6 text-foreground md:p-10">
      <div class="mx-auto max-w-2xl space-y-10">
        <header class="space-y-2">
          <h1 class="text-3xl font-bold">Checkbox</h1>
          <p class="text-muted-foreground">
            Selecciones binarias, personalizadas e indeterminadas.
          </p>
        </header>

        <section class="space-y-4">
          <h2 class="text-lg font-semibold">Estados</h2>
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center gap-2">
              <Checkbox id="unchecked" />
              <Label for="unchecked">Sin marcar</Label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox id="checked" :value="true" />
              <Label for="checked">Marcado</Label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox id="disabled" disabled />
              <Label for="disabled">Deshabilitado</Label>
            </div>
          </div>
        </section>

        <section class="space-y-4 border-t pt-8">
          <h2 class="text-lg font-semibold">Enlace y valores</h2>
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <Checkbox id="notifications" v-model:value="notifications" />
              <Label for="notifications">Recibir notificaciones ({{ notifications }})</Label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox id="plan" v-model:value="plan" true-value="pro" false-value="free" />
              <Label for="plan">Plan seleccionado: {{ plan }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <Checkbox id="selection" v-model:value="selection" />
              <Label for="selection">Selección: {{ selection }}</Label>
            </div>
          </div>
        </section>

        <section class="space-y-4 border-t pt-8">
          <h2 class="text-lg font-semibold">Slot y UI</h2>
          <div class="flex items-center gap-2">
            <Checkbox
              id="custom"
              :value="true"
              :ui="{
                root: ({ state }) => ({
                  class: state === true && 'size-5 rounded-full bg-emerald-600',
                }),
              }"
            >
              <template #indicator="{ state }">
                <span class="text-xs font-bold">{{ state === true ? '✓' : '' }}</span>
              </template>
            </Checkbox>
            <Label for="custom">Indicador personalizado</Label>
          </div>
        </section>
      </div>
    </main>
  </ConfigProvider>
</template>
