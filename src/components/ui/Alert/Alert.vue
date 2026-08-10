<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { Button, ButtonContext, normalizeButtonProps } from '@/components/ui/Button'
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
  const rootUI = useUi(props.ui?.root, alertContext.value)

  return {
    ...attrs,
    ...rootUI,
    role: props.decorative ? 'none' : 'alert',
    class: cn(
      'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
      (props.icon || slots.icon) && 'grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3',
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
  <div v-if="visible" v-bind="rootProps" data-alert-ui="root">
    <div
      v-if="slots.icon"
      class="[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"
      data-alert-slot="icon"
    >
      <slot :name="'icon'" v-bind="alertContext"></slot>
    </div>
    <div
      v-else-if="iconProps?.name"
      class="[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"
    >
      <Icon v-bind="iconProps" data-alert="icon" />
    </div>

    <div
      v-if="props.label || slots.label"
      v-bind="labelProps"
      data-alert-ui="label"
      data-alert-slot="label"
    >
      <slot name="label" v-bind="alertContext">{{ props.label }}</slot>
    </div>

    <div
      v-if="props.description || slots.description"
      v-bind="descriptionProps"
      data-alert-ui="description"
      data-alert-slot="description"
    >
      <slot name="description" v-bind="alertContext">{{ props.description }}</slot>
    </div>

    <div
      v-if="props.closable"
      v-bind="closeButtonContainerProps"
      data-alert-ui="closeButtonContainer"
      data-alert-slot="close"
    >
      <slot name="close" v-bind="alertContext">
        <Button v-bind="closeButtonProps" data-alert="buttonClose" @click="close" />
      </slot>
    </div>
  </div>
</template>
