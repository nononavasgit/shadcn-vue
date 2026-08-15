<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button, normalizeButtonProps, type ButtonContext } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { useI18n } from '@/i18n'
import {
  alertVariants,
  createAlertContext,
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
  closeButton: undefined,
  color: undefined,
  description: undefined,
  icon: undefined,
  label: undefined,
  ui: undefined,
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

const alertContext = computed(() => createAlertContext(props, close))

const rootProps = computed(() => {
  const calculatedVariants = alertVariants({
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })
  return {
    ...attrs,
    role: props.decorative ? 'none' : 'alert',
    class: cn(
      'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
      (props.icon || slots.icon) && 'grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3',
      '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
      calculatedVariants,
      props.closable && (props.closeButton?.label ? 'pr-24' : 'pr-12'),
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, alertContext.value)
  return {
    ...ui,
    class: cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, alertContext.value)
  return {
    ...ui,
    class: cn('col-start-2 text-sm text-current/80 [&_p]:leading-relaxed', ui.class),
  }
})

const closeButtonContainerProps = computed(() => {
  const ui = useUi(props.ui?.closeButtonContainer, alertContext.value)
  return { ...ui, class: cn('absolute top-2 right-2 shrink-0', ui.class) }
})

const closeButtonProps = computed(() => {
  const button = normalizeButtonProps(props.closeButton)
  return {
    ...button,
    ui: {
      ...button?.ui,
      root: (context: ButtonContext) => {
        const root =
          typeof button?.ui?.root === 'function' ? button.ui.root(context) : button?.ui?.root
        return { 'aria-label': t('close'), ...root }
      },
    },
    size: button?.size ?? ('xs' as const),
    square: button?.square ?? true,
    rounded: button?.rounded ?? true,
    variant: button?.variant ?? props.variant,
    severity: button?.severity ?? props.severity,
    color: button?.color ?? props.color,
    icon: button?.icon ?? ('x' as const),
  }
})

function close() {
  visible.value = false
  emit('close')
}
</script>
<template>
  <div v-if="visible" v-bind="rootProps" data-test-alert-root>
    <slot name="icon" v-bind="alertContext">
      <Icon v-if="iconProps?.name" v-bind="iconProps" data-test-alert-icon />
    </slot>

    <div v-if="props.label || slots.label" v-bind="labelProps" data-test-alert-label>
      <slot name="label" v-bind="alertContext">{{ props.label }}</slot>
    </div>

    <div
      v-if="props.description || slots.description"
      v-bind="descriptionProps"
      data-test-alert-description
    >
      <slot name="description" v-bind="alertContext">{{ props.description }}</slot>
    </div>

    <div v-if="props.closable" v-bind="closeButtonContainerProps">
      <slot name="close" v-bind="alertContext">
        <Button v-bind="closeButtonProps" data-test-alert-close-button @click="close" />
      </slot>
    </div>
  </div>
</template>
