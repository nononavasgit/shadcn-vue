<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { Button } from '@/components/ui/Button'
import { Collapsible } from '@/components/ui/Collapsible'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { panelVariants } from '.'
import type { PanelContext, PanelProps, PanelSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PanelProps>(), {
  variant: 'solid',
  severity: 'primary',
  color: undefined,
  label: undefined,
  icon: undefined,
  collapsible: true,
  ui: undefined,
})
defineSlots<PanelSlots>()
const emit = defineEmits<{ valueChange: [value: boolean] }>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)
const calculatedOpen = computed<boolean>({
  get: () => (props.collapsible ? open.value : true),
  set: (value) => {
    if (props.collapsible) open.value = value
  },
})

watch(open, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const panelContext = computed<PanelContext>(() => {
  const { ui, icon, ...panelProps } = props
  void ui
  void icon

  return {
    props: panelProps,
    open: calculatedOpen.value,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, panelContext.value))

  return {
    ...attrs,
    ...rootUI,
    'data-slot': 'panel',
    class: cn(attrs.class, rootUI.class),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const headerProps = computed(() => {
  const headerUI = normalizeHTMLAttributes(useUi(props.ui?.header, panelContext.value))

  return {
    ...headerUI,
    'data-slot': 'panel-header',
    class: cn(headerUI.class),
    style: headerUI.style,
  }
})

const triggerProps = computed(() => ({
  as: props.collapsible ? undefined : 'span',
  color: props.color,
  severity: props.severity,
  variant: props.variant,
  class: cn(
    'w-full',
    calculatedOpen.value && 'rounded-br-none rounded-bl-none',
    !props.collapsible && 'justify-start',
  ),
}))

const iconProps = computed(() => ({ ...normalizeIconProps(props.icon) }))

const labelProps = computed(() => {
  const labelUI = normalizeHTMLAttributes(useUi(props.ui?.label, panelContext.value))

  return {
    ...labelUI,
    'data-slot': 'panel-label',
    class: cn(labelUI.class),
    style: labelUI.style,
  }
})

const arrowsProps = computed(() => {
  const arrowsUI = normalizeHTMLAttributes(useUi(props.ui?.arrows, panelContext.value))

  return {
    ...arrowsUI,
    'data-slot': 'panel-arrows',
    class: cn('ml-auto shrink-0', arrowsUI.class),
    style: arrowsUI.style,
  }
})

const contentProps = computed(() => {
  const contentUI = normalizeHTMLAttributes(useUi(props.ui?.content, panelContext.value))

  return {
    ...contentUI,
    'data-slot': 'panel-content',
    class: cn(
      panelVariants({
        severity: props.severity,
        variant: props.variant,
        color: Boolean(props.color),
      }),
      'rounded-t-none border-t-0 p-[15px] text-card-foreground shadow-none',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})
</script>

<template>
  <Collapsible v-model:open="calculatedOpen" v-bind="rootProps">
    <template #trigger>
      <div v-bind="headerProps">
        <Button v-bind="triggerProps">
          <span class="flex min-w-0 items-center gap-2">
            <slot name="icon" v-bind="panelContext">
              <Icon v-if="iconProps.name" v-bind="iconProps" :name="iconProps.name" />
            </slot>

            <span v-if="props.label || $slots.label" v-bind="labelProps">
              <slot name="label" v-bind="panelContext">{{ props.label }}</slot>
            </span>
          </span>

          <span v-if="props.collapsible" v-bind="arrowsProps">
            <slot name="arrows" v-bind="panelContext">
              <Icon :name="calculatedOpen ? 'chevronUp' : 'chevronDown'" size="sm" />
            </slot>
          </span>
        </Button>
      </div>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="contentProps">
        <slot v-bind="panelContext" />
      </div>
    </template>
  </Collapsible>
</template>
