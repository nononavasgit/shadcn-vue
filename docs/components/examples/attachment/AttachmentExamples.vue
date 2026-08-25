<script setup lang="ts">
import { Attachment, type AttachmentProps } from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import Example from '../../Example.vue'

const labelCode = `<Attachment label="report.pdf" :icon="{ name: 'fileText' }" />`
const descriptionCode = `<Attachment
  label="report.pdf"
  description="2.4 MB"
  :icon="{ name: 'fileText' }"
/>`
const iconCode = `<Attachment
  label="archive.zip"
  description="18 MB"
  :icon="{ name: 'fileArchive' }"
/>`
const orientationCode = `<div class="grid gap-3">
  <Attachment label="Horizontal" description="Orientación por defecto" :icon="{ name: 'file' }" />
  <Attachment
    label="Vertical"
    description="Contenido apilado"
    orientation="vertical"
    :icon="{ name: 'file' }"
  />
</div>`
const sizeCode = `<div class="grid gap-3">
  <Attachment label="Extra small" size="xs" :icon="{ name: 'fileText' }" />
  <Attachment label="Small" size="sm" :icon="{ name: 'fileText' }" />
  <Attachment label="Medium" size="md" :icon="{ name: 'fileText' }" />
</div>`
const stateCode = `<div class="grid gap-3">
  <Attachment label="Pendiente" state="idle" :icon="{ name: 'fileText' }" />
  <Attachment label="Subiendo" state="uploading" :icon="{ name: 'upload' }" />
  <Attachment label="Procesando" state="processing" :icon="{ name: 'fileText' }" />
  <Attachment label="Error" state="error" :icon="{ name: 'error' }" />
  <Attachment label="Completado" state="done" :icon="{ name: 'check' }" />
</div>`
const mediaVariantCode = `<div class="grid gap-3 sm:grid-cols-2">
  <Attachment label="Con icono" media-variant="icon" :icon="{ name: 'image' }" />
  <Attachment label="Con imagen" media-variant="image">
    <template #media>
      <div class="grid size-full place-items-center bg-primary text-xs text-primary-foreground">
        IMG
      </div>
    </template>
  </Attachment>
</div>`
const mediaSlotCode = `<Attachment label="Vista previa" media-variant="image">
  <template #media>
    <div class="grid size-full place-items-center bg-primary text-xs text-primary-foreground">
      IMG
    </div>
  </template>
</Attachment>`
const labelSlotCode = `<Attachment description="Contenido personalizado" :icon="{ name: 'file' }">
  <template #label>
    <strong>Documento personalizado</strong>
  </template>
</Attachment>`
const descriptionSlotCode = `<Attachment label="report.pdf" :icon="{ name: 'fileText' }">
  <template #description>
    <span class="text-primary">2.4 MB · PDF</span>
  </template>
</Attachment>`
const actionsSlotCode = `<Attachment label="report.pdf" :icon="{ name: 'fileText' }">
  <template #actions>
    <Button size="xs" variant="plain" :icon="{ name: 'x' }" aria-label="Eliminar archivo" />
  </template>
</Attachment>`

const customUi: AttachmentProps['ui'] = {
  media: () => ({ class: 'bg-primary text-primary-foreground' }),
  label: () => ({ class: 'uppercase tracking-wide' }),
  description: () => ({ class: 'italic' }),
  actions: () => ({ class: 'rounded-md bg-muted/50' }),
}

const uiCode = `<script setup lang="ts">
const customUi = {
  media: () => ({ class: 'bg-primary text-primary-foreground' }),
  label: () => ({ class: 'uppercase tracking-wide' }),
  description: () => ({ class: 'italic' }),
  actions: () => ({ class: 'rounded-md bg-muted/50' }),
}
<\/script>

<Attachment
  label="report.pdf"
  description="2.4 MB"
  :icon="{ name: 'fileText' }"
  :ui="customUi"
/>`
const attrsCode = `<Attachment
  label="report.pdf"
  :icon="{ name: 'fileText' }"
  class="ring-2 ring-primary ring-offset-2"
  data-source="documents"
  aria-label="Archivo report.pdf"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o atributo disponible en Attachment.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Label"
        description="label define el nombre principal del archivo."
        :code="labelCode"
      >
        <Attachment label="report.pdf" :icon="{ name: 'fileText' }" />
      </Example>

      <Example
        title="Description"
        description="description añade información secundaria al archivo."
        :code="descriptionCode"
      >
        <Attachment label="report.pdf" description="2.4 MB" :icon="{ name: 'fileText' }" />
      </Example>

      <Example
        title="Icon"
        description="icon configura el icono de la zona multimedia."
        :code="iconCode"
      >
        <Attachment label="archive.zip" description="18 MB" :icon="{ name: 'fileArchive' }" />
      </Example>

      <Example
        title="Orientation"
        description="orientation puede ser horizontal o vertical."
        :code="orientationCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-3">
          <Attachment
            label="Horizontal"
            description="Orientación por defecto"
            :icon="{ name: 'file' }"
          />
          <Attachment
            label="Vertical"
            description="Contenido apilado"
            orientation="vertical"
            :icon="{ name: 'file' }"
          />
        </div>
      </Example>

      <Example
        title="Size"
        description="Elige entre los tamaños xs, sm y md."
        :code="sizeCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-3">
          <Attachment label="Extra small" size="xs" :icon="{ name: 'fileText' }" />
          <Attachment label="Small" size="sm" :icon="{ name: 'fileText' }" />
          <Attachment label="Medium" size="md" :icon="{ name: 'fileText' }" />
        </div>
      </Example>

      <Example
        title="State"
        description="state muestra los estados idle, uploading, processing, error y done."
        :code="stateCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-3">
          <Attachment label="Pendiente" state="idle" :icon="{ name: 'fileText' }" />
          <Attachment label="Subiendo" state="uploading" :icon="{ name: 'upload' }" />
          <Attachment label="Procesando" state="processing" :icon="{ name: 'fileText' }" />
          <Attachment label="Error" state="error" :icon="{ name: 'error' }" />
          <Attachment label="Completado" state="done" :icon="{ name: 'check' }" />
        </div>
      </Example>

      <Example
        title="Media variant"
        description="mediaVariant alterna entre un icono y contenido multimedia personalizado."
        :code="mediaVariantCode"
        class="md:col-span-2"
      >
        <div class="grid w-full gap-3 sm:grid-cols-2">
          <Attachment label="Con icono" media-variant="icon" :icon="{ name: 'image' }" />
          <Attachment label="Con imagen" media-variant="image">
            <template #media>
              <div
                class="grid size-full place-items-center bg-primary text-xs text-primary-foreground"
              >
                IMG
              </div>
            </template>
          </Attachment>
        </div>
      </Example>

      <Example
        title="Slot media"
        description="media reemplaza el contenido multimedia cuando mediaVariant es image."
        :code="mediaSlotCode"
      >
        <Attachment label="Vista previa" media-variant="image">
          <template #media>
            <div
              class="grid size-full place-items-center bg-primary text-xs text-primary-foreground"
            >
              IMG
            </div>
          </template>
        </Attachment>
      </Example>

      <Example
        title="Slot label"
        description="label permite personalizar el nombre del archivo."
        :code="labelSlotCode"
      >
        <Attachment description="Contenido personalizado" :icon="{ name: 'file' }">
          <template #label>
            <strong>Documento personalizado</strong>
          </template>
        </Attachment>
      </Example>

      <Example
        title="Slot description"
        description="description permite incluir contenido enriquecido."
        :code="descriptionSlotCode"
      >
        <Attachment label="report.pdf" :icon="{ name: 'fileText' }">
          <template #description>
            <span class="text-primary">2.4 MB · PDF</span>
          </template>
        </Attachment>
      </Example>

      <Example
        title="Slot actions"
        description="actions añade controles al archivo."
        :code="actionsSlotCode"
      >
        <Attachment label="report.pdf" :icon="{ name: 'fileText' }">
          <template #actions>
            <Button size="xs" variant="plain" :icon="{ name: 'x' }" aria-label="Eliminar archivo" />
          </template>
        </Attachment>
      </Example>

      <Example
        title="UI personalizada"
        description="ui permite personalizar las partes internas con resolvers."
        :code="uiCode"
      >
        <Attachment
          label="report.pdf"
          description="2.4 MB"
          :icon="{ name: 'fileText' }"
          :ui="customUi"
        >
          <template #actions>
            <Button size="xs" variant="plain" :icon="{ name: 'x' }" aria-label="Eliminar archivo" />
          </template>
        </Attachment>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían al elemento raíz."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Attachment
          label="report.pdf"
          :icon="{ name: 'fileText' }"
          class="ring-2 ring-primary ring-offset-2"
          data-source="documents"
          aria-label="Archivo report.pdf"
        />
      </Example>
    </div>
  </section>
</template>
