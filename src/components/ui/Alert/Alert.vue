<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button, ButtonContext, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
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

const rootProps = computed(() => {
  const calculatedVariants = alertVariants({
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, alertContext.value))

  return {
    ...attrs,
    ...rootUI,
    role: props.decorative ? 'none' : 'alert',
    class: cn(
      'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
      calculatedVariants,
      props.closable && (props.closeButton?.label ? 'pr-24' : 'pr-12'),
      attrs.class,
      rootUI.class,
    ),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))

const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.label, alertContext.value))
  return {
    ...ui,
    class: cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', ui.class),
  }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.description, alertContext.value))
  return {
    ...ui,
    class: cn('col-start-2 text-sm text-current/80 [&_p]:leading-relaxed', ui.class),
  }
})

const closeButtonContainerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useUi(props.ui?.closeButtonContainer, alertContext.value))
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
  <div v-if="visible" v-bind="rootProps" data-slot="alert">
    <slot v-if="iconProps?.name || slots.icon" name="icon" v-bind="alertContext">
      <Icon v-if="iconProps?.name" v-bind="iconProps" />
    </slot>

    <div v-if="props.label || slots.label" v-bind="labelProps" data-slot="alert-title">
      <slot name="label" v-bind="alertContext">{{ props.label }}</slot>
    </div>

    <div
      v-if="props.description || slots.description"
      data-slot="alert-description"
      v-bind="descriptionProps"
    >
      <slot name="description" v-bind="alertContext">{{ props.description }}</slot>
    </div>

    <div v-if="props.closable" v-bind="closeButtonContainerProps">
      <slot name="close" v-bind="alertContext">
        <Button v-bind="closeButtonProps" @click="close" />
      </slot>
    </div>
  </div>
</template>
