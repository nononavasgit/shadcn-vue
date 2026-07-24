<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Boton } from '@/components/app/Button'
import { Collapsible } from '@/components/app/Collapsible'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { panelVariants, type PanelEmits, type PanelProps, type PanelSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  label?(props: PanelSlotProps): unknown
  icon?(props: PanelSlotProps): unknown
  arrows?(props: PanelSlotProps): unknown
}>()

const props = withDefaults(defineProps<PanelProps>(), {
  variant: 'solid',
  severity: 'primary',
  expandable: true,
})
defineEmits<PanelEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)

const openCalculado = computed({
  get: () => (props.expandable ? open.value : true),
  set: (value: boolean) => {
    if (props.expandable) open.value = value
  },
})

const uiCalculado = computed(() => ({
  root: {
    ...props.ui?.root,
    ...attrs,
    class: cn(
      panelVariants({
        severity: props.severity,
        variant: props.variant,
        color: Boolean(props.color),
      }),
      props.ui?.root?.class,
      attrs.class,
    ),
    style: [colorStyle.value, props.ui?.root?.style, attrs.style],
  },
  header: {
    ...props.ui?.header,
    class: cn(
      'h-auto min-h-0 w-full justify-start rounded-none border-x-0 border-t-0 px-[15px] py-[10px] text-left text-base leading-[1.1] font-medium shadow-none',
      !props.expandable && 'disabled:cursor-default disabled:opacity-100',
      props.ui?.header?.class,
    ),
  },
  icon: {
    ...props.ui?.icon,
    ...props.iconProps,
    class: cn(props.ui?.icon?.class, props.iconProps?.class),
  },
  label: props.ui?.label,
  arrows: props.ui?.arrows,
  content: {
    ...props.ui?.content,
    class: cn('bg-card p-[15px] text-card-foreground', props.ui?.content?.class),
  },
}))
</script>

<template>
  <Collapsible
    v-bind="uiCalculado.root"
    v-model:open="openCalculado"
    :default-open="props.expandable ? props.defaultOpen : true"
    :disabled="!props.expandable"
  >
    <template #default="collapsibleState">
      <Boton
        v-bind="uiCalculado.header"
        :color="props.color"
        :severity="props.severity"
        :variant="props.variant"
      >
        <span class="flex min-w-0 items-center gap-2">
          <slot name="icon" :open="collapsibleState.open">
            <Icon v-if="props.nameIcon" v-bind="uiCalculado.icon" :name="props.nameIcon" />
          </slot>

          <span v-if="props.label || $slots.label" v-bind="uiCalculado.label">
            <slot name="label" :open="collapsibleState.open">{{ props.label }}</slot>
          </span>
        </span>

        <span v-if="props.expandable" v-bind="uiCalculado.arrows" class="ml-auto shrink-0">
          <slot name="arrows" :open="collapsibleState.open">
            <Icon :name="collapsibleState.open ? 'chevronUp' : 'chevronDown'" size="sm" />
          </slot>
        </span>
      </Boton>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="uiCalculado.content">
        <slot />
      </div>
    </template>
  </Collapsible>
</template>
