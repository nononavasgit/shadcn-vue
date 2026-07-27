<script setup>
import { ref } from 'vue'
import { Badge } from '@/components/app/Badge'
import { HoverCard } from '@/components/app/HoverCard'
import { Tooltip } from '@/components/app/Tooltip'
import { Textarea } from '@/components/app/Textarea'
import { Switch } from '@/components/app/Switch'
import { Separator } from '@/components/app/Separator'
import { Popover } from '@/components/app/Popover'

const hoverCardAbierto = ref(false)
const tooltipAbierto = ref(false)
const texto = ref('Texto inicial')
const switchActivado = ref(false)
const popoverAbierto = ref(false)
</script>

<template>
  <Badge
    titulo="Hola"
    :ui="{
      icono: { nombre: 'alerta' },
      iconoFinal: { nombre: 'chevronLeft', 'aria-label': 'pepe' },
    }"
  ></Badge>

  <Badge titulo="Adios" gravedad="exito"></Badge>
  <Badge titulo="Adios" gravedad="error"></Badge>
  <Badge titulo="Adios" gravedad="alerta"></Badge>
  <Badge titulo="Adios" color="#4aaddd"></Badge>

  <section class="mt-10 flex flex-wrap items-start gap-8 p-6">
    <HoverCard lado="abajo" evitar-colisiones="false">
      <button class="rounded-md border px-4 py-2">Contenido simple</button>
      <template #contenido="{ abierto }">
        <div class="space-y-2">
          <p class="font-semibold">HoverCard personalizado</p>
          <p class="text-sm text-muted-foreground">Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
        </div>
      </template>
    </HoverCard>

    <HoverCard :desplazamiento-lado="8">
      <button class="rounded-md border px-4 py-2">Contenido mediante slot</button>

      <template #contenido="{ abierto }">
        <div class="space-y-2">
          <p class="font-semibold">HoverCard personalizado</p>
          <p class="text-sm text-muted-foreground">Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
        </div>
      </template>
    </HoverCard>

    <HoverCard v-model:abierto="hoverCardAbierto">
      <button class="rounded-md border px-4 py-2">Apertura controlada</button>

      <template #contenido>
        <div class="space-y-3">
          <p>Este ejemplo controla la apertura mediante <code>v-model:abierto</code>.</p>
          <button class="rounded-md border px-3 py-1" @click="hoverCardAbierto = false">
            Cerrar
          </button>
        </div>
      </template>
    </HoverCard>
  </section>

  <section class="mt-10 flex flex-wrap items-center gap-8 p-6">
    <Tooltip contenido="Tooltip con contenido simple">
      <button class="rounded-md border px-4 py-2">Tooltip simple</button>
    </Tooltip>

    <Tooltip>
      <button class="rounded-md border px-4 py-2">Tooltip personalizado</button>

      <template #contenido="{ abierto }">
        {{ abierto }}
        <div class="space-y-1">
          <p class="font-semibold">Contenido mediante slot</p>
          <p>Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
        </div>
      </template>
    </Tooltip>

    <Tooltip v-model:abierto="tooltipAbierto">
      <button class="rounded-md border px-4 py-2" :aria-describedby="undefined">
        {{ tooltipAbierto ? 'Tooltip abierto' : 'Apertura controlada' }}
      </button>

      <template #contenido> ee </template>
    </Tooltip>
  </section>

  <section class="m-6 max-w-xl space-y-6 rounded-lg border p-6">
    <div class="space-y-2">
      <label for="textarea-ejemplo" class="text-sm font-medium">Textarea controlado</label>
      <Textarea
        id="textarea-ejemplo"
        v-model="texto"
        valor-predeterminado="Texto predeterminado"
        placeholder="Escribe aqui..."
        rows="4"
      />
      <p class="text-sm text-muted-foreground">Valor: {{ texto }}</p>
    </div>

    <Separator orientacion="horizontal" :decorativo="true" />

    <div class="flex items-center justify-between gap-4">
      <label for="switch-ejemplo" class="text-sm font-medium">Activar notificaciones</label>
      <Switch id="switch-ejemplo" v-model="switchActivado">
        <template #indicador="{ activado }">
          <span class="">{{ activado ? 'SI' : '' }}</span>
        </template>
      </Switch>
    </div>

    <p class="text-sm text-muted-foreground">
      Switch: {{ switchActivado ? 'activado' : 'desactivado' }}
    </p>

    <Separator orientacion="horizontal" :decorativo="false" />

    <div class="flex h-12 items-center gap-4 text-sm">
      <span>Izquierda</span>
      <Separator orientacion="vertical" :decorativo="true" />
      <span>Centro</span>
      <Separator orientacion="vertical" :decorativo="true" />
      <span>Derecha</span>
    </div>
  </section>

  <section class="mt-10 flex flex-wrap items-start gap-8 p-6">
    <Popover>
      <button class="rounded-md border px-4 py-2">Popover basico</button>

      <template #contenido="{ cerrar }">
        <div class="w-64 space-y-3">
          <p class="font-semibold">Contenido del popover</p>
          <p class="text-sm text-muted-foreground">
            Puede contener botones, formularios o cualquier otro contenido.
          </p>
          <button class="rounded-md border px-3 py-1" @click="cerrar">Cerrar</button>
        </div>
      </template>
    </Popover>

    <Popover>
      <button class="rounded-md border px-4 py-2">Posicion y colisiones</button>

      <template #contenido="{ abierto, cerrar }">
        <div class="space-y-3">
          <p>Estado: {{ abierto ? 'abierto' : 'cerrado' }}</p>
          <button class="rounded-md border px-3 py-1" @click="cerrar">Aceptar</button>
        </div>
      </template>
    </Popover>

    <Popover v-model:abierto="popoverAbierto" lado="abajo" alineacion="centro">
      <button class="rounded-md border px-4 py-2">
        {{ popoverAbierto ? 'Popover abierto' : 'Apertura controlada' }}
      </button>

      <template #contenido="{ cerrar }">
        <div class="space-y-3">
          <p>Este ejemplo utiliza <code>v-model:abierto</code>.</p>
          <button class="rounded-md border px-3 py-1" @click="cerrar">Cerrar</button>
        </div>
      </template>
    </Popover>
  </section>
</template>
