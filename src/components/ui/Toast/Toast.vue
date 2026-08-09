<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type { ToastContext, ToastEmits, ToastProps, ToastSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ToastSlots>()
const emit = defineEmits<ToastEmits>()

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'foreground',
  label: undefined,
  description: undefined,
  icon: undefined,
  actionButton: undefined,
  closeButton: undefined,
  closable: true,
  disableSwipe: false,
  swipeDirection: 'right',
  swipeThreshold: 50,
  viewport: undefined,
  ui: undefined,
})

const attrs = useAttrs()
const slots = useSlots()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()

watch(open, (value, previousValue) => {
  if (previousValue && !value) emit('close')
})

function close() {
  open.value = false
}

const toastContext = computed<ToastContext>(() => {
  const { ui, ...toastProps } = props
  void ui

  return {
    props: toastProps,
    open: open.value,
    close,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, toastContext.value))

  return {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    type: props.type,
    duration: props.duration,
    defaultOpen: props.defaultOpen,
    forceMount: props.forceMount,
    ...rootUI,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full pointer-events-auto relative grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 overflow-hidden rounded-lg border bg-background p-4 pr-10 text-foreground shadow-lg duration-200 sm:data-[state=open]:slide-in-from-bottom-full',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))

const iconContainerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.iconContainer, toastContext.value))
  return { ...ui, class: cn('row-span-2 mt-0.5 [&_svg]:size-5', ui.class) }
})

const contentProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.content, toastContext.value))
  return { ...ui, class: cn('col-start-2 grid min-w-0 gap-1', ui.class) }
})

const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.label, toastContext.value))
  return { ...ui, class: cn('text-sm font-semibold', ui.class) }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.description, toastContext.value))
  return { ...ui, class: cn('text-sm text-muted-foreground', ui.class) }
})

const actionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.action, toastContext.value))
  return { ...ui, class: cn('col-start-3 row-span-2 self-center', ui.class) }
})

const actionButtonProps = computed(() => ({
  variant: 'outline' as const,
  severity: 'secondary' as const,
  size: 'sm' as const,
  ...normalizeButtonProps(props.actionButton),
}))

const closeProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.close, toastContext.value))
  return {
    ...ui,
    class: cn('absolute top-2 right-2', ui.class),
  }
})

const closeButtonProps = computed(() => ({
  size: 'xs' as const,
  square: true,
  rounded: true,
  variant: 'plain' as const,
  severity: 'secondary' as const,
  icon: 'x' as const,
  ...normalizeButtonProps(props.closeButton),
}))

const viewportProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.viewport, toastContext.value))
  return {
    as: props.viewport?.as,
    asChild: props.viewport?.asChild,
    hotkey: props.viewport?.hotkey,
    label: props.viewport?.label,
    ...ui,
    class: cn(
      'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:right-0 sm:bottom-0 sm:top-auto sm:max-w-sm sm:flex-col',
      ui.class,
    ),
    style: ui.style,
  }
})

const providerProps = computed(() => ({
  disableSwipe: props.disableSwipe,
  swipeDirection: props.swipeDirection,
  swipeThreshold: props.swipeThreshold,
}))

function onAction(event: PointerEvent) {
  emit('action', event)
}
</script>

<template>
  <ToastProvider v-bind="providerProps">
    <ToastPortal>
      <ToastRoot
        v-bind="rootProps"
        v-model:open="open"
        data-slot="toast"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pause="emit('pause')"
        @resume="emit('resume')"
        @swipe-start="emit('swipeStart', $event)"
        @swipe-move="emit('swipeMove', $event)"
        @swipe-cancel="emit('swipeCancel', $event)"
        @swipe-end="emit('swipeEnd', $event)"
      >
        <slot v-bind="toastContext">
          <div
            v-if="iconProps?.name || slots.icon"
            v-bind="iconContainerProps"
            data-slot="toast-icon"
          >
            <slot name="icon" v-bind="toastContext">
              <Icon v-if="iconProps?.name" v-bind="iconProps" />
            </slot>
          </div>

          <div v-bind="contentProps" data-slot="toast-content">
            <ToastTitle
              v-if="props.label || slots.label"
              v-bind="labelProps"
              data-slot="toast-title"
            >
              <slot name="label" v-bind="toastContext">{{ props.label }}</slot>
            </ToastTitle>

            <ToastDescription
              v-if="props.description || slots.description"
              v-bind="descriptionProps"
              data-slot="toast-description"
            >
              <slot name="description" v-bind="toastContext">{{ props.description }}</slot>
            </ToastDescription>
          </div>

          <ToastAction
            v-if="props.actionButton || slots.action"
            v-bind="actionProps"
            :alt-text="props.actionButton?.label ?? 'Action'"
            as-child
            data-slot="toast-action"
            @click="onAction"
          >
            <slot name="action" v-bind="toastContext">
              <Button v-bind="actionButtonProps" />
            </slot>
          </ToastAction>

          <ToastClose v-if="props.closable" v-bind="closeProps" as-child data-slot="toast-close">
            <slot name="close" v-bind="toastContext">
              <Button v-bind="closeButtonProps" :aria-label="t('close')" />
            </slot>
          </ToastClose>
        </slot>
      </ToastRoot>

      <slot name="viewport" v-bind="toastContext">
        <ToastViewport v-bind="viewportProps" data-slot="toast-viewport" />
      </slot>
    </ToastPortal>
  </ToastProvider>
</template>
