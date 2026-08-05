<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/ui/Button'
import { Collapsible } from '@/components/ui/Collapsible'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  panelVariants,
  resolvePanelUIValue,
  type PanelEmits,
  type PanelProps,
  type PanelSlots,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PanelSlots>()

const props = withDefaults(defineProps<PanelProps>(), {
  variant: 'solid',
  severity: 'primary',
  collapsible: true,
})
defineEmits<PanelEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)
const calculatedOpen = computed({
  get: () => (props.collapsible ? open.value : true),
  set: (value: boolean) => {
    if (props.collapsible) open.value = value
  },
})

const calculatedUI = computed(() => {
  const context = { open: calculatedOpen.value }
  const rootUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.root, context))
  const headerUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.header, context))
  const iconUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.icon, context))
  const labelUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.label, context))
  const arrowsUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.arrows, context))
  const contentUI = normalizeHTMLAttributes(resolvePanelUIValue(props.ui?.content, context))
  const icon = normalizeIconProps(props.icon)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    header: { ...headerUI, class: cn(headerUI.class), style: headerUI.style },
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
    icon: { ...iconUI, ...icon, class: cn(iconUI.class), style: iconUI.style },
    label: { ...labelUI, class: cn(labelUI.class), style: labelUI.style },
    arrows: { ...arrowsUI, class: cn('ml-auto shrink-0', arrowsUI.class), style: arrowsUI.style },
    content: {
      ...contentUI,
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
  {{ calculatedOpen }}
  <Collapsible v-model:open="calculatedOpen" v-bind="calculatedUI.root">
    <template #default="{ open: isOpen }">
      <div v-bind="calculatedUI?.header">
        <Button v-bind="calculatedUI.trigger">
          <span class="flex min-w-0 items-center gap-2">
            <slot name="icon" :open="isOpen">
              <Icon
                v-if="calculatedUI.icon.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
            </slot>

            <span v-if="props.label || $slots.label" v-bind="calculatedUI.label">
              <slot name="label" :open="isOpen">{{ props.label }}</slot>
            </span>
          </span>

          <span v-if="props.collapsible" v-bind="calculatedUI.arrows">
            <slot name="arrows" :open="isOpen">
              <Icon :name="isOpen ? 'chevronUp' : 'chevronDown'" size="sm" />
            </slot>
          </span>
        </Button>
      </div>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="calculatedUI.content">
        <slot :open="calculatedOpen" />
      </div>
    </template>
  </Collapsible>
</template>
