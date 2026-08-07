<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button, ButtonContext, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { useI18n } from '@/i18n'
import {
  alertVariants,
  type AlertContext,
  type AlertEmits,
  type AlertProps,
  type AlertSlots,
} from '.'

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

const alertContext = computed<AlertContext>(() => {
  const { ui, ...alertProps } = props
  void ui

  return {
    props: alertProps,
    close,
  }
})

const calculatedUI = computed(() => {
  const calculatedVariants = alertVariants({
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, alertContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, alertContext.value))
  const descriptionUI = normalizeHTMLAttributes(
    useResolve(props.ui?.description, alertContext.value),
  )
  const closeButtonContainerUI = normalizeHTMLAttributes(
    useResolve(props.ui?.closeButtonContainer, alertContext.value),
  )
  const closeButton = normalizeButtonProps(props.closeButton)

  return {
    root: {
      ...attrs,
      ...rootUI,
      role: props.decorative ? 'none' : 'alert',
      class: cn(
        'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
        calculatedVariants,
        props.closable && (closeButton?.label ? 'pr-24' : 'pr-12'),
        attrs.class,
        rootUI.class,
      ),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    icon: {
      'aria-hidden': true,
      ...normalizeIconProps(props.icon),
    },
    label: {
      ...labelUI,
      class: cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', labelUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn('col-start-2 text-sm text-current/80 [&_p]:leading-relaxed', descriptionUI.class),
    },
    closeButtonContainer: {
      ...closeButtonContainerUI,
      class: cn('absolute top-2 right-2 shrink-0', closeButtonContainerUI.class),
    },
    closeButton: {
      ...closeButton,
      ui: {
        ...closeButton?.ui,
        root: (obj: ButtonContext) => {
          const res =
            typeof closeButton?.ui?.root == 'function'
              ? closeButton?.ui?.root?.(obj)
              : closeButton?.ui?.root
          return {
            'aria-label': t('close'),
            ...res,
          }
        },
      },
      size: closeButton?.size ?? ('xs' as const),
      square: closeButton?.square ?? true,
      rounded: closeButton?.rounded ?? true,
      variant: closeButton?.variant ?? props.variant,
      severity: closeButton?.severity ?? props.severity,
      color: closeButton?.color ?? props.color,
      icon: closeButton?.icon ?? ('x' as const),
    },
  }
})

function close() {
  visible.value = false
  emit('close')
}
</script>
<template>
  <div v-if="visible" v-bind="calculatedUI.root" data-slot="alert">
    <slot v-if="calculatedUI.icon.name || slots.icon" name="icon" v-bind="alertContext">
      <Icon
        v-if="calculatedUI.icon.name"
        v-bind="calculatedUI.icon"
        :name="calculatedUI.icon.name"
      />
    </slot>

    <div v-if="props.label || slots.label" v-bind="calculatedUI.label" data-slot="alert-title">
      <slot name="label" v-bind="alertContext">{{ props.label }}</slot>
    </div>

    <div
      v-if="props.description || slots.description"
      data-slot="alert-description"
      v-bind="calculatedUI.description"
    >
      <slot name="description" v-bind="alertContext">{{ props.description }}</slot>
    </div>

    <div v-if="props.closable" v-bind="calculatedUI.closeButtonContainer">
      <slot name="close" v-bind="alertContext">
        <Button v-bind="calculatedUI.closeButton" @click="close" />
      </slot>
    </div>
  </div>
</template>
