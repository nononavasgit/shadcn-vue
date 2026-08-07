<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeAlertDialogContentProps,
  normalizeAlertDialogTriggerProps,
  type AlertDialogEmits,
  type AlertDialogContext,
  type AlertDialogProps,
  type AlertDialogSlots,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AlertDialogSlots>()
const emit = defineEmits<AlertDialogEmits>()

const props = withDefaults(defineProps<AlertDialogProps>(), {
  unmountOnHide: true,
  label: undefined,
  description: undefined,
  icon: undefined,
  actionButton: undefined,
  cancelButton: undefined,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { t } = useI18n()

function close() {
  open.value = false
}

const alertDialogContext = computed<AlertDialogContext>(() => {
  const { ui, ...alertDialogProps } = props
  void ui

  return {
    props: alertDialogProps,
    open: open.value ?? false,
    close,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, alertDialogContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, alertDialogContext.value))
  const overlayUI = normalizeHTMLAttributes(useResolve(props.ui?.overlay, alertDialogContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, alertDialogContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, alertDialogContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, alertDialogContext.value))
  const descriptionUI = normalizeHTMLAttributes(
    useResolve(props.ui?.description, alertDialogContext.value),
  )
  const bodyUI = normalizeHTMLAttributes(useResolve(props.ui?.body, alertDialogContext.value))
  const footerUI = normalizeHTMLAttributes(useResolve(props.ui?.footer, alertDialogContext.value))

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      defaultOpen: props.defaultOpen,
      unmountOnHide: props.unmountOnHide,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      asChild: true,
      ...normalizeAlertDialogTriggerProps(props.trigger),
      ...triggerUI,
      class: cn(triggerUI.class),
    },
    overlay: {
      ...overlayUI,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        overlayUI.class,
      ),
      style: overlayUI.style,
    },
    content: {
      disableOutsidePointerEvents: true,
      ...normalizeAlertDialogContentProps(props.content),
      ...contentUI,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
        contentUI.class,
      ),
    },
    header: {
      ...headerUI,
      class: cn('flex flex-col gap-2 text-center sm:text-left', headerUI.class),
    },
    label: {
      ...labelUI,
      class: cn('flex items-center gap-2 text-lg leading-none font-semibold', labelUI.class),
    },
    icon: {
      'aria-hidden': true,
      ...normalizeIconProps(props.icon),
    },
    description: {
      ...descriptionUI,
      class: cn('text-sm text-muted-foreground', descriptionUI.class),
    },
    body: {
      ...bodyUI,
      class: cn('min-h-0 overflow-y-auto', bodyUI.class),
    },
    footer: {
      ...footerUI,
      class: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', footerUI.class),
    },
    cancel: {
      label: t('cancel'),
      variant: 'outline' as const,
      severity: 'secondary' as const,
      ...normalizeButtonProps(props.cancelButton),
    },
    action: {
      label: t('continue'),
      ...normalizeButtonProps(props.actionButton),
    },
  }
})
</script>

<template>
  <AlertDialogRoot v-bind="calculatedUI.root" v-model:open="open" data-slot="alert-dialog">
    <AlertDialogTrigger v-bind="calculatedUI.trigger" data-slot="alert-dialog-trigger">
      <slot v-bind="alertDialogContext" />
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay v-bind="calculatedUI.overlay" data-slot="alert-dialog-overlay" />
      <AlertDialogContent v-bind="calculatedUI.content" data-slot="alert-dialog-content">
        <div
          v-if="
            props.label || props.description || slots.header || slots.label || slots.description
          "
          v-bind="calculatedUI.header"
          data-slot="alert-dialog-header"
        >
          <slot name="header" v-bind="alertDialogContext">
            <AlertDialogTitle
              v-if="props.label || slots.label"
              v-bind="calculatedUI.label"
              data-slot="alert-dialog-title"
            >
              <Icon
                v-if="calculatedUI.icon.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
              <slot name="label" v-bind="alertDialogContext">
                {{ props.label }}
              </slot>
            </AlertDialogTitle>

            <AlertDialogDescription
              v-if="props.description || slots.description"
              v-bind="calculatedUI.description"
              data-slot="alert-dialog-description"
            >
              <slot name="description" v-bind="alertDialogContext">
                {{ props.description }}
              </slot>
            </AlertDialogDescription>
          </slot>
        </div>

        <div v-if="slots.content" v-bind="calculatedUI.body">
          <slot name="content" v-bind="alertDialogContext" />
        </div>

        <div v-bind="calculatedUI.footer" data-slot="alert-dialog-footer">
          <slot name="footer" v-bind="alertDialogContext">
            <AlertDialogCancel
              as-child
              data-slot="alert-dialog-cancel"
              @click="emit('cancel', $event)"
            >
              <slot name="cancel" v-bind="alertDialogContext">
                <Button v-bind="calculatedUI.cancel" />
              </slot>
            </AlertDialogCancel>

            <AlertDialogAction
              as-child
              data-slot="alert-dialog-action"
              @click="emit('action', $event)"
            >
              <slot name="action" v-bind="alertDialogContext">
                <Button v-bind="calculatedUI.action" />
              </slot>
            </AlertDialogAction>
          </slot>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
