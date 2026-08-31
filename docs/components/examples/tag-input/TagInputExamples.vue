<script setup lang="ts">
import { ref } from 'vue'
import { TagInput } from '@/components/ui/TagInput'
import Example from '../../Example.vue'

const basicTags = ref(['Vue', 'Reka UI'])
const limitedTags = ref(['TypeScript'])
const customTags = ref(['frontend', 'design'])

const basicCode = `<TagInput
  v-model:value="tags"
  placeholder="Añadir tecnología..."
/>`

const optionsCode = `<TagInput
  v-model:value="tags"
  delimiter=";"
  :add-on-paste="true"
  :add-on-tab="true"
  :max="4"
  placeholder="Añadir con ;, Tab o pegado"
/>`

const clearCode = `<TagInput
  v-model:value="tags"
  clearable
  placeholder="Etiquetas"
/>`

const slotCode = `<TagInput v-model:value="tags">
  <template #tag="{ value, index }">
    <span>#{{ value }}</span>
    <span class="text-muted-foreground">{{ index + 1 }}</span>
  </template>
</TagInput>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Etiquetas controladas, límites, pegado, limpieza y personalización mediante slots.
      </p>
    </div>

    <div class="grid gap-4">
      <Example
        title="Uso básico"
        description="Confirma cada etiqueta con Enter o con el delimitador configurado."
        :code="basicCode"
      >
        <div class="grid w-full gap-3">
          <TagInput v-model:value="basicTags" placeholder="Añadir tecnología..." />
          <output class="text-sm text-muted-foreground">{{
            basicTags.join(', ') || 'Sin etiquetas'
          }}</output>
        </div>
      </Example>

      <Example
        title="Límite y opciones de entrada"
        description="Limita el número de etiquetas y habilita Tab y pegado como confirmación."
        :code="optionsCode"
      >
        <div class="grid w-full gap-3">
          <TagInput
            v-model:value="limitedTags"
            delimiter=";"
            :add-on-paste="true"
            :add-on-tab="true"
            :max="4"
            placeholder="Añadir con ;, Tab o pegado"
          />
          <output class="text-sm text-muted-foreground">{{
            limitedTags.join(', ') || 'Sin etiquetas'
          }}</output>
        </div>
      </Example>

      <Example
        title="Botón para limpiar"
        description="clearable muestra una acción accesible para eliminar todas las etiquetas."
        :code="clearCode"
      >
        <TagInput v-model:value="customTags" clearable placeholder="Etiquetas" />
      </Example>

      <Example
        title="Slot tag"
        description="Personaliza el contenido de cada etiqueta sin perder su botón de borrado."
        :code="slotCode"
      >
        <TagInput v-model:value="customTags">
          <template #tag="{ value, index }">
            <span>#{{ value }}</span>
            <span class="text-muted-foreground">{{ index + 1 }}</span>
          </template>
        </TagInput>
      </Example>
    </div>
  </section>
</template>
