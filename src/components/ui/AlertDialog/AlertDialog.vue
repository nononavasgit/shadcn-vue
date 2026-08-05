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

function getContext(slotProps: { open: boolean; close: () => void }): AlertDialogContext {
  return {
    open: slotProps.open,
    close: slotProps.close,
  }
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const overlayUI = normalizeHTMLAttributes(props.ui?.overlay)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const headerUI = normalizeHTMLAttributes(props.ui?.header)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const bodyUI = normalizeHTMLAttributes(props.ui?.body)
  const footerUI = normalizeHTMLAttributes(props.ui?.footer)
  const actionUI = normalizeHTMLAttributes(props.ui?.action)
  const cancelUI = normalizeHTMLAttributes(props.ui?.cancel)
  const trigger = normalizeAlertDialogTriggerProps(props.trigger)
  const content = normalizeAlertDialogContentProps(props.content)
  const actionButton = normalizeButtonProps(props.actionButton)
  const cancelButton = normalizeButtonProps(props.cancelButton)

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
      ...triggerUI,
      ...trigger,
      asChild: trigger?.asChild ?? true,
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
      ...contentUI,
      ...content,
      disableOutsidePointerEvents: content?.disableOutsidePointerEvents ?? true,
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
      ...iconUI,
      ...normalizeIconProps(props.icon),
      class: cn(iconUI.class),
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
      ...cancelUI,
      ...cancelButton,
      label: cancelButton?.label ?? t('cancel'),
      variant: cancelButton?.variant ?? ('outline' as const),
      severity: cancelButton?.severity ?? ('secondary' as const),
      class: cn(cancelUI.class),
    },
    action: {
      ...actionUI,
      ...actionButton,
      label: actionButton?.label ?? t('continue'),
      class: cn(actionUI.class),
    },
  }
})
</script>

<template>
  <AlertDialogRoot
    v-slot="rootSlotProps"
    v-bind="calculatedUI.root"
    v-model:open="open"
    data-slot="alert-dialog"
  >
    <AlertDialogTrigger v-bind="calculatedUI.trigger" data-slot="alert-dialog-trigger">
      <slot v-bind="getContext(rootSlotProps)" />
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
          <slot name="header" v-bind="getContext(rootSlotProps)">
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
              <slot name="label" v-bind="getContext(rootSlotProps)">
                {{ props.label }}
              </slot>
            </AlertDialogTitle>

            <AlertDialogDescription
              v-if="props.description || slots.description"
              v-bind="calculatedUI.description"
              data-slot="alert-dialog-description"
            >
              <slot name="description" v-bind="getContext(rootSlotProps)">
                {{ props.description }}
              </slot>
            </AlertDialogDescription>
          </slot>
        </div>

        <div v-if="slots.content" v-bind="calculatedUI.body">
          <slot name="content" v-bind="getContext(rootSlotProps)" />
        </div>

        <div v-bind="calculatedUI.footer" data-slot="alert-dialog-footer">
          <slot name="footer" v-bind="getContext(rootSlotProps)">
            <AlertDialogCancel
              as-child
              data-slot="alert-dialog-cancel"
              @click="emit('cancel', $event)"
            >
              <slot name="cancel" v-bind="getContext(rootSlotProps)">
                <Button v-bind="calculatedUI.cancel" />
              </slot>
            </AlertDialogCancel>

            <AlertDialogAction
              as-child
              data-slot="alert-dialog-action"
              @click="emit('action', $event)"
            >
              <slot name="action" v-bind="getContext(rootSlotProps)">
                <Button v-bind="calculatedUI.action" />
              </slot>
            </AlertDialogAction>
          </slot>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
