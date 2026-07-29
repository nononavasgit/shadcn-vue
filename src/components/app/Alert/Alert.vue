<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Alert as AlertBase, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button, useNormalizeButtonProps } from '@/components/app/Button'
import { Icon, useNormalizeIconProps } from '@/components/app/Icon'
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
const calculatedIcon = useNormalizeIconProps(() => props.icon)
const calculatedCloseButton = useNormalizeButtonProps(() => props.closeButton)
const { t } = useI18n()
const { colorStyle } = useColor(
  computed(() => props.color),
  'alert',
)

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    role: props.decorative ? 'none' : 'alert',
    class: cn(
      alertVariants({
        variant: props.variant,
        severity: props.severity,
        color: Boolean(props.color),
      }),
      props.closable && (calculatedCloseButton.value?.label ? 'pr-24' : 'pr-12'),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  },
  icon: {
    'aria-hidden': true,
    ...props.ui?.icon,
    ...calculatedIcon.value,
    class: cn(props.ui?.icon?.class, calculatedIcon.value?.class),
  },
  label: {
    ...props.ui?.label,
  },
  description: {
    ...props.ui?.description,
    class: cn('text-current/80', props.ui?.description?.class),
  },
  closeButton: {
    ...calculatedCloseButton.value,
    size: 'xs' as const,
    square: true,
    rounded: calculatedCloseButton.value?.rounded ?? true,
    variant: props.variant,
    severity: props.severity,
    color: props.color,
    icon: calculatedCloseButton.value?.label
      ? calculatedCloseButton.value.icon
      : (calculatedCloseButton.value?.icon ?? 'x'),
    ...calculatedCloseButton.value,
    'aria-label': calculatedCloseButton.value?.['aria-label'] ?? t('close'),
    class: cn(
      'absolute top-2 right-2 shrink-0 text-current hover:bg-current/10',
      calculatedCloseButton.value?.class,
    ),
  },
}))

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
