<script setup lang="ts">
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'
import Example from '../../Example.vue'

const imageCode = `<Avatar
  src="https://github.com/shadcn.png"
  alt="Perfil de usuario"
/>`
const labelCode = `<Avatar label="AL" />`
const iconCode = `<Avatar :icon="{ name: 'user' }" />`
const sizeCode = `<div class="flex items-center gap-2">
  <Avatar label="XS" size="xs" />
  <Avatar label="SM" size="sm" />
  <Avatar label="MD" size="md" />
  <Avatar label="LG" size="lg" />
</div>`
const shapeCode = `<div class="flex items-center gap-2">
  <Avatar label="Round" shape="rounded" />
  <Avatar label="Square" shape="square" />
</div>`
const delayCode = `<Avatar src="/missing-avatar.png" label="AL" :delay-ms="500" />`
const fallbackCode = `<Avatar src="/missing-avatar.png">
  <template #fallback>
    <span class="font-semibold">NA</span>
  </template>
</Avatar>`
const attrsCode = `<Avatar
  src="https://github.com/shadcn.png"
  alt="Perfil de usuario"
  class="ring-2 ring-primary ring-offset-2"
/>`
</script>

<template>
  <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div>
      <h2 class="text-xl font-semibold">Ejemplos</h2>
      <p class="text-sm text-muted-foreground">
        Cada ejemplo muestra una prop, slot o atributo disponible en Avatar.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Example
        title="Src"
        description="src muestra una imagen cuando la URL se puede cargar."
        :code="imageCode"
      >
        <Avatar src="https://github.com/shadcn.png" alt="Perfil de usuario" />
      </Example>

      <Example
        title="Label"
        description="label se muestra como fallback cuando no hay imagen ni icono."
        :code="labelCode"
      >
        <Avatar label="AL" />
      </Example>

      <Example
        title="Icon"
        description="icon configura el icono del fallback mediante un IconConfig."
        :code="iconCode"
      >
        <Avatar :icon="{ name: 'user' }" />
      </Example>

      <Example
        title="Size"
        description="Elige entre los tamaños xs, sm, md y lg."
        :code="sizeCode"
        class="md:col-span-2"
      >
        <div class="flex items-center gap-2">
          <Avatar label="XS" size="xs" />
          <Avatar label="SM" size="sm" />
          <Avatar label="MD" size="md" />
          <Avatar label="LG" size="lg" />
        </div>
      </Example>

      <Example
        title="Shape"
        description="shape define si el avatar es circular o cuadrado."
        :code="shapeCode"
      >
        <div class="flex items-center gap-2">
          <Avatar label="Round" shape="rounded" />
          <Avatar label="Square" shape="square" />
        </div>
      </Example>

      <Example
        title="Delay"
        description="delayMs retrasa la aparición del fallback de una imagen que no carga."
        :code="delayCode"
      >
        <Avatar src="/missing-avatar.png" label="AL" :delay-ms="500" />
      </Example>

      <Example
        title="Slot fallback"
        description="fallback sustituye el contenido generado por label o icon."
        :code="fallbackCode"
        class="md:col-span-2"
      >
        <Avatar src="/missing-avatar.png">
          <template #fallback>
            <span class="font-semibold">NA</span>
          </template>
        </Avatar>
      </Example>

      <Example
        title="Atributos HTML"
        description="Los atributos y clases se reenvían a la imagen o al fallback."
        :code="attrsCode"
        class="md:col-span-2"
      >
        <Avatar
          src="https://github.com/shadcn.png"
          alt="Perfil de usuario"
          class="ring-2 ring-primary ring-offset-2"
        />
      </Example>
    </div>

    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon name="info" class="size-4" />
      Los ejemplos con una imagen remota necesitan conexión a Internet para mostrarla.
    </div>
  </section>
</template>
