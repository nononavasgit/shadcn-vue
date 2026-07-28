<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Dialog as DialogBase,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import type { DialogEmits, DialogProps, DialogSlotProps, DialogSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<DialogSlots>()
const emit = defineEmits<DialogEmits>()

const props = withDefaults(defineProps<DialogProps>(), {
  modal: true,
  desmontarAlOcultar: true,
  mostrarBotonCerrar: true,
})

const slots = useSlots()
const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')

const iconoCalculado = computed(() =>
  typeof props.icono === 'string' ? { nombre: props.icono } : props.icono,
)

function propiedadesSlot(propiedades: { open: boolean; close: () => void }): DialogSlotProps {
  return {
    abierto: propiedades.open,
    cerrar: propiedades.close,
  }
}

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    defaultOpen: props.abiertoPredeterminado,
    modal: props.modal,
    unmountOnHide: props.desmontarAlOcultar,
  },
  activador: {
    ...props.ui?.activador,
    asChild: props.ui?.activador?.asChild ?? true,
  },
  contenedor: {
    ...props.ui?.contenedor,
    forceMount: props.forzarMontaje,
    disableOutsidePointerEvents: props.deshabilitarPunteroExterior,
    onOpenAutoFocus: (evento: Event) => emit('enfocarAbrir', evento),
    onCloseAutoFocus: (evento: Event) => emit('enfocarCerrar', evento),
    onEscapeKeyDown: (evento: Event) => emit('pulsarEscape', evento),
    onPointerDownOutside: (evento: Event) => emit('pulsarFuera', evento),
    onFocusOutside: (evento: Event) => emit('enfocarFuera', evento),
    onInteractOutside: (evento: Event) => emit('interactuarFuera', evento),
  },
  encabezado: {
    ...props.ui?.encabezado,
  },
  titulo: {
    ...props.ui?.titulo,
    class: cn('flex items-center gap-2', props.ui?.titulo?.class),
  },
  icono: {
    'aria-hidden': true,
    ...props.ui?.icono,
    ...iconoCalculado.value,
    class: cn(props.ui?.icono?.class, iconoCalculado.value?.class),
  },
  descripcion: {
    ...props.ui?.descripcion,
  },
  contenido: {
    ...props.ui?.contenido,
    class: cn('min-h-0 overflow-y-auto', props.ui?.contenido?.class),
  },
  pie: {
    ...props.ui?.pie,
  },
  cerrar: {
    ...props.ui?.cerrar,
    'aria-label': props.ui?.cerrar?.['aria-label'],
    class: cn(
      'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      props.ui?.cerrar?.class,
    ),
  },
}))
</script>

<template>
  <DialogBase v-slot="propiedadesRaiz" v-bind="uiCalculado.raiz" v-model:open="abierto">
    <DialogTrigger v-bind="uiCalculado.activador">
      <slot v-bind="propiedadesSlot(propiedadesRaiz)" />
    </DialogTrigger>

    <DialogContent v-bind="uiCalculado.contenedor">
      <template v-if="props.mostrarBotonCerrar" #close>
        <slot name="cerrar" v-bind="propiedadesSlot(propiedadesRaiz)">
          <DialogClose v-bind="uiCalculado.cerrar">
            <slot name="iconoCerrar" v-bind="propiedadesSlot(propiedadesRaiz)">
              <Icon nombre="x" />
            </slot>
          </DialogClose>
        </slot>
      </template>

      <DialogHeader v-bind="uiCalculado.encabezado">
        <slot name="encabezado" v-bind="propiedadesSlot(propiedadesRaiz)">
          <DialogTitle v-if="props.titulo || slots.titulo" v-bind="uiCalculado.titulo">
            <Icon
              v-if="iconoCalculado?.nombre"
              v-bind="uiCalculado.icono"
              :nombre="iconoCalculado.nombre"
            />
            <slot name="titulo" v-bind="propiedadesSlot(propiedadesRaiz)">
              {{ props.titulo }}
            </slot>
          </DialogTitle>

          <DialogDescription
            v-if="props.descripcion || slots.descripcion"
            v-bind="uiCalculado.descripcion"
          >
            <slot name="descripcion" v-bind="propiedadesSlot(propiedadesRaiz)">
              {{ props.descripcion }}
            </slot>
          </DialogDescription>
        </slot>
      </DialogHeader>

      <div v-if="slots.contenido" v-bind="uiCalculado.contenido">
        <slot name="contenido" v-bind="propiedadesSlot(propiedadesRaiz)" />
      </div>

      <DialogFooter v-if="slots.pie" v-bind="uiCalculado.pie">
        <slot name="pie" v-bind="propiedadesSlot(propiedadesRaiz)" />
      </DialogFooter>
    </DialogContent>
  </DialogBase>
</template>
