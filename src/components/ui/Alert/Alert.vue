<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Alert as AlertBase, AlertDescription, AlertTitle } from '@/components/primitives/Alert'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { useI18n } from '@/i18n'
import { alertVariants, type AlertEmits, type AlertProps, type AlertSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'soft',
  severity: 'primary',
  closable: false,
  decorative: false,
})
const emit = defineEmits<AlertEmits>()
defineSlots<AlertSlots>()

const attrs = useAttrs()
const slots = useSlots()
const visible = ref(true)
const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'alert',
)

const calculatedUI = computed(() => {
  const calculatedVariants = alertVariants({
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const closeButtonUI = normalizeHTMLAttributes(props.ui?.closeButton)
  const closeButton = normalizeButtonProps(props.closeButton)

  return {
    root: {
      ...attrs,
      ...rootUI,
      role: props.decorative ? 'none' : 'alert',
      class: cn(
        calculatedVariants,
        props.closable && (closeButton?.label ? 'pr-24' : 'pr-12'),
        attrs.class,
        rootUI.class,
      ),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    icon: {
      'aria-hidden': true,
      ...iconUI,
      ...normalizeIconProps(props.icon),
      class: cn(iconUI.class),
    },
    label: labelUI,
    description: {
      ...descriptionUI,
      class: cn('text-current/80', descriptionUI.class),
    },
    closeButton: {
      ...closeButtonUI,
      ...closeButton,
      size: 'xs' as const,
      square: true,
      rounded: closeButton?.rounded ?? true,
      variant: props.variant,
      severity: props.severity,
      color: props.color,
      icon: closeButton?.label ? closeButton.icon : (closeButton?.icon ?? 'x'),
      'aria-label': closeButtonUI['aria-label'] ?? t('close'),
      class: cn(
        'absolute top-2 right-2 shrink-0 text-current hover:bg-current/10',
        closeButtonUI.class,
      ),
    },
  }
})

function close() {
  visible.value = false
  emit('close')
}
</script>
<template>
  <AlertBase v-if="visible" v-bind="calculatedUI.root">
    <slot v-if="calculatedUI.icon.name || slots.icon" name="icon" :close="close">
      <Icon
        v-if="calculatedUI.icon.name"
        v-bind="calculatedUI.icon"
        :name="calculatedUI.icon.name"
      />
    </slot>

    <AlertTitle v-if="props.label || slots.label" v-bind="calculatedUI.label">
      <slot name="label" :close="close">{{ props.label }}</slot>
    </AlertTitle>

    <AlertDescription
      v-if="props.description || slots.description"
      v-bind="calculatedUI.description"
    >
      <slot name="description" :close="close">{{ props.description }}</slot>
    </AlertDescription>

    <slot v-if="props.closable" name="close" :close="close">
      <Button v-bind="calculatedUI.closeButton" @click="close" />
    </slot>
  </AlertBase>
</template>
