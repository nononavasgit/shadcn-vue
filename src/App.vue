<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@/components/app/Separator'
import { Switch } from '@/components/app/Switch'
import { Icon } from '@/components/app/Icon'
import { Label } from '@/components/app/Label'

const notifications = ref(true)
const airplaneMode = ref(false)
const compactMode = ref(false)
</script>

<template>
  <div class="w-full max-w-[300px] mx-[15px]">
    <div class="text-stone-700 dark:text-white text-sm leading-5 font-semibold">
      Reka UI
    </div>
    <div class="text-stone-700 dark:text-white text-sm leading-5">
      An open-source UI component library.
    </div>
    <Separator class="my-1" />
    <div class="flex h-5 gap-1 items-center">
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Blog
      </div>
      <Separator decorative orientation="vertical" />
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Docs
      </div>
      <Separator decorative orientation="vertical" />
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Source
      </div>
    </div>

    <Separator class="my-4" />

    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-semibold text-stone-700 dark:text-white">Switch</h2>
        <p class="text-xs text-muted-foreground">
          Ejemplos de estado, formularios y contenido personalizado.
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <Label for="notifications">Notifications</Label>
        <Switch id="notifications" v-model="notifications" required />
      </div>
      <p class="text-xs text-muted-foreground">
        Estado: {{ notifications ? 'activado' : 'desactivado' }}
      </p>

      <div class="flex items-center justify-between gap-4">
        <Label for="airplane-mode">Airplane mode</Label>
        <Switch id="airplane-mode" v-model="airplaneMode" />
      </div>

      <div class="flex items-center justify-between gap-4">
        <span class="text-sm text-muted-foreground">Disabled</span>
        <div class="flex items-center gap-2">
          <Switch disabled aria-label="Disabled unchecked" />
          <Switch disabled :default-value="true" aria-label="Disabled checked" />
        </div>
      </div>

      <form class="space-y-2" @submit.prevent>
        <div class="flex items-center justify-between gap-4">
          <Label for="compact-mode">Compact mode</Label>
          <Switch id="compact-mode" v-model="compactMode" name="compactMode" required>
            <template #thumb="{ checked }">
              <span class="flex size-full items-center justify-center text-[7px] font-semibold">
                <Icon :name="checked ? 'success' : 'error'" color="red" />
              </span>
            </template>
          </Switch>
        </div>
        <p class="text-xs text-muted-foreground">
          Incluye name, required y un thumb personalizado.
        </p>
      </form>
    </div>
  </div>
</template>
