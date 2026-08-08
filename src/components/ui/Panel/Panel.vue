<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/ui/Button'
import { Collapsible } from '@/components/ui/Collapsible'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useColor } from '@/composables'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { panelVariants } from '.'
import type { PanelContext, PanelProps, PanelSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PanelProps>(), {
  open: undefined,
  variant: 'solid',
  severity: 'primary',
  color: undefined,
  label: undefined,
  icon: undefined,
  collapsible: true,
  ui: undefined,
})
defineSlots<PanelSlots>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)
const calculatedOpen = computed<boolean>({
  get: () => (props.collapsible ? (open.value ?? false) : true),
  set: (value) => {
    if (props.collapsible) open.value = value
  },
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

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, panelContext.value))
  const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, panelContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, panelContext.value))
  const arrowsUI = normalizeHTMLAttributes(useResolve(props.ui?.arrows, panelContext.value))
  const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, panelContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      'data-slot': 'panel',
      class: cn(attrs.class, rootUI.class),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    header: {
      ...headerUI,
      'data-slot': 'panel-header',
      class: cn(headerUI.class),
      style: headerUI.style,
    },
    trigger: {
      as: props.collapsible ? undefined : 'span',
      color: props.color,
      severity: props.severity,
      variant: props.variant,
      class: cn(
        'w-full',
        calculatedOpen.value && 'rounded-br-none rounded-bl-none',
        !props.collapsible && 'justify-start',
      ),
    },
    icon: normalizeIconProps(props.icon),
    label: {
      ...labelUI,
      'data-slot': 'panel-label',
      class: cn(labelUI.class),
      style: labelUI.style,
    },
    arrows: {
      ...arrowsUI,
      'data-slot': 'panel-arrows',
      class: cn('ml-auto shrink-0', arrowsUI.class),
      style: arrowsUI.style,
    },
    content: {
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
    },
  }
})
</script>

<template>
  <Collapsible v-model:open="calculatedOpen" v-bind="calculatedUI.root">
    <template #trigger>
      <div v-bind="calculatedUI.header">
        <Button v-bind="calculatedUI.trigger">
          <span class="flex min-w-0 items-center gap-2">
            <slot name="icon" v-bind="panelContext">
              <Icon
                v-if="calculatedUI.icon?.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
            </slot>

            <span v-if="props.label || $slots.label" v-bind="calculatedUI.label">
              <slot name="label" v-bind="panelContext">{{ props.label }}</slot>
            </span>
          </span>

          <span v-if="props.collapsible" v-bind="calculatedUI.arrows">
            <slot name="arrows" v-bind="panelContext">
              <Icon :name="calculatedOpen ? 'chevronUp' : 'chevronDown'" size="sm" />
            </slot>
          </span>
        </Button>
      </div>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="calculatedUI.content">
        <slot v-bind="panelContext" />
      </div>
    </template>
  </Collapsible>
</template>
