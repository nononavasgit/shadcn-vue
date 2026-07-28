<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/app/Button'
import { Collapsible } from '@/components/app/Collapsible'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { panelVariantes, type PanelEmits, type PanelProps, type PanelSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  titulo?(props: PanelSlotProps): unknown
  icono?(props: PanelSlotProps): unknown
  flechas?(props: PanelSlotProps): unknown
}>()

const props = withDefaults(defineProps<PanelProps>(), {
  variante: 'solido',
  gravedad: 'primario',
  expandible: true,
})
defineEmits<PanelEmits>()

const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)

const iconoCalculado = computed(() =>
  typeof props.icono === 'string' ? { nombre: props.icono } : props.icono,
)

const abiertoCalculado = computed({
  get: () => (props.expandible ? abierto.value : true),
  set: (value: boolean) => {
    if (props.expandible) abierto.value = value
  },
})

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    class: cn('', attrs.class),
    style: [colorStyle.value, attrs.style],
  },
  encabezado: {
    ...props.ui?.encabezado,
    as: props.expandible ? undefined : 'span',
    color: props.color,
    gravedad: props.gravedad,
    variante: props.variante,
    class: cn(
      'w-full',
      abiertoCalculado.value && 'rounded-br-none rounded-bl-none',
      !props.expandible ? 'justify-start' : '',
      props.ui?.encabezado?.class,
    ),
  },
  icono: {
    ...props.ui?.icono,
    ...iconoCalculado.value,
    class: cn(props.ui?.icono?.class, iconoCalculado.value?.class),
  },
  titulo: props.ui?.titulo,
  flechas: {
    ...props.ui?.flechas,
    class: cn('ml-auto shrink-0', props.ui?.flechas?.class),
  },
  contenido: {
    ...props.ui?.contenido,
    class: cn(
      panelVariantes({
        gravedad: props.gravedad,
        variante: props.variante,
        color: Boolean(props.color),
      }),
      'rounded-t-none border-t-0 p-[15px] text-card-foreground shadow-none',
      props.ui?.contenido?.class,
    ),
  },
}))
</script>

<template>
  <Collapsible v-bind="uiCalculado.raiz" v-model:abierto="abiertoCalculado">
    <template #default="estadoColapsable">
      <Button v-bind="uiCalculado.encabezado">
        <span class="flex min-w-0 items-center gap-2">
          <slot name="icono" :abierto="estadoColapsable.abierto">
            <Icon
              v-if="uiCalculado.icono?.nombre"
              v-bind="uiCalculado.icono"
              :nombre="uiCalculado.icono?.nombre"
            />
          </slot>

          <span v-if="props.titulo || $slots.titulo" v-bind="uiCalculado.titulo">
            <slot name="titulo" :abierto="estadoColapsable.abierto">{{ props.titulo }}</slot>
          </span>
        </span>

        <span v-if="props.expandible" v-bind="uiCalculado.flechas">
          <slot name="flechas" :abierto="estadoColapsable.abierto">
            <Icon :nombre="estadoColapsable.abierto ? 'chevronUp' : 'chevronDown'" tamano="sm" />
          </slot>
        </span>
      </Button>
    </template>

    <template v-if="$slots.default" #contenido>
      <div v-bind="uiCalculado.contenido">
        <slot />
      </div>
    </template>
  </Collapsible>
</template>
