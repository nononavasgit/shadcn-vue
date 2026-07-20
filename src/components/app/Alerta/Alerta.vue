<template>
  <Alert v-if="visible" v-bind="attrs" :class="classCSS" :style="[attrs.style, variablesColor]">
    <div class="flex items-start gap-3">
      <div v-if="slots.izquierda || iconoProps" class="shrink-0 pt-0.5">
        <slot v-if="slots.izquierda" name="izquierda" />
        <Icono v-else-if="iconoProps" v-bind="iconoProps" />
      </div>

      <div class="min-w-0 flex-1">
        <AlertTitle v-if="titulo">
          {{ titulo }}
        </AlertTitle>

        <AlertDescription v-if="descripcion || slots.default" class="text-current/80">
          <slot>{{ descripcion }}</slot>
        </AlertDescription>
      </div>

      <div v-if="cerrable" class="-my-1 -mr-1 shrink-0">
        <slot name="cerrar" :cerrar="cerrar">
          <button
            type="button"
            class="inline-flex size-7 items-center justify-center rounded-md text-current/70 transition-colors hover:bg-current/10 hover:text-current focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:outline-none"
            aria-label="Cerrar alerta"
            @click="cerrar"
          >
            <span aria-hidden="true" class="text-lg leading-none">×</span>
          </button>
        </slot>
      </div>
    </div>
  </Alert>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useAttrs } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Icono, type IconoProps } from '@/components/app/Icono'
import { useColor } from '@/composables'
import { cn } from '@/lib/utils'
import type { AlertaBaseProps } from './types'
import { alertaVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = defineSlots<{
  default?(): unknown
  izquierda?(): unknown
  cerrar?(props: { cerrar: () => void }): unknown
}>()

const emit = defineEmits<{
  cerrar: []
}>()

const props = withDefaults(defineProps<AlertaBaseProps>(), {
  titulo: '',
  descripcion: '',
  icono: undefined,
  variante: 'suave',
  paleta: 'primario',
  cerrable: false,
  color: undefined,
})

const visible = ref(true)

const { variablesColor } = useColor(toRef(props, 'color'), {
  prefijo: 'alerta',
})

const classCSS = computed(() =>
  cn(
    alertaVariantes({
      variante: props.variante,
      paleta: props.paleta,
      cerrable: props.cerrable,
      personalizado: Boolean(props.color),
    }),
    attrs.class,
  ),
)

const iconoProps = computed<IconoProps | undefined>(() => {
  if (!props.icono) return undefined
  return typeof props.icono === 'string' ? { nombre: props.icono, tamano: 'sm' } : props.icono
})

function cerrar() {
  visible.value = false
  emit('cerrar')
}
</script>
