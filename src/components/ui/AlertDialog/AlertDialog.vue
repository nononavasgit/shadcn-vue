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
import { Button } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  createAlertDialogContext,
  type AlertDialogExpose,
  type AlertDialogEmits,
  type AlertDialogContext,
  type AlertDialogProps,
  type AlertDialogSlots,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AlertDialogSlots>()
const emit = defineEmits<AlertDialogEmits>()

const props = withDefaults(defineProps<AlertDialogProps>(), {
  disableOutsidePointerEvents: true,
  unmountOnHide: true,
  label: undefined,
  description: undefined,
  icon: undefined,
  actionButton: undefined,
  cancelButton: undefined,
  ui: undefined,
})

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { t } = useI18n()

function close() {
  open.value = false
}

defineExpose<AlertDialogExpose>({ close })

const alertDialogContext = computed<AlertDialogContext>(() => {
  return createAlertDialogContext(props, open.value, close)
})

const rootProps = computed(() => {
  return {
    ...attrs,
    unmountOnHide: props.unmountOnHide,
    defaultOpen: false,
    class: cn(attrs.class),
    style: [attrs.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, alertDialogContext.value)
  return {
    ...triggerUI,
    as: 'div',
    asChild: true,
    class: cn(triggerUI.class),
  }
})

const overlayProps = computed(() => {
  const overlayUI = useUi(props.ui?.overlay, alertDialogContext.value)
  return {
    ...overlayUI,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      overlayUI.class,
    ),
    style: overlayUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = useUi(props.ui?.content, alertDialogContext.value)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI

  void contentDirection

  return {
    ...contentUI,
    as: 'div',
    asChild: false,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents,
    forceMount: props.forceMount,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
      contentUI.class,
    ),
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, alertDialogContext.value)
  return { ...ui, class: cn('flex flex-col gap-2 text-center sm:text-left', ui.class) }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, alertDialogContext.value)
  return {
    ...ui,
    class: cn('flex items-center gap-2 text-lg leading-none font-semibold', ui.class),
  }
})

const iconProps = computed(() => normalizeIconProps(props.icon))

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, alertDialogContext.value)
  return { ...ui, class: cn('text-sm text-muted-foreground', ui.class) }
})

const bodyProps = computed(() => {
  const ui = useUi(props.ui?.body, alertDialogContext.value)
  return { ...ui, class: cn('min-h-0 overflow-y-auto', ui.class) }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, alertDialogContext.value)
  return { ...ui, class: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', ui.class) }
})

const cancelButtonProps = computed(() => ({
  label: t('cancel'),
  variant: 'outline' as const,
  severity: 'secondary' as const,
  ...props.cancelButton,
}))

const actionButtonProps = computed(() => ({
  label: t('continue'),
  ...props.actionButton,
}))
</script>

<template>
  <AlertDialogRoot v-bind="rootProps" v-model:open="open" data-test-alert-dialog-root>
    <AlertDialogTrigger v-bind="triggerProps" data-test-alert-dialog-trigger>
      <slot v-bind="alertDialogContext" />
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay v-bind="overlayProps" data-test-alert-dialog-overlay />
      <AlertDialogContent v-bind="contentProps" data-test-alert-dialog-content>
        <div
          v-if="
            props.label || props.description || slots.header || slots.label || slots.description
          "
          v-bind="headerProps"
          data-test-alert-dialog-header
        >
          <slot name="header" v-bind="alertDialogContext">
            <AlertDialogTitle
              v-if="props.label || slots.label"
              v-bind="labelProps"
              data-test-alert-dialog-label
            >
              <Icon v-if="iconProps?.name" v-bind="iconProps" data-test-alert-dialog-icon />
              <slot name="label" v-bind="alertDialogContext">
                {{ props.label }}
              </slot>
            </AlertDialogTitle>

            <AlertDialogDescription
              v-if="props.description || slots.description"
              v-bind="descriptionProps"
              data-test-alert-dialog-description
            >
              <slot name="description" v-bind="alertDialogContext">
                {{ props.description }}
              </slot>
            </AlertDialogDescription>
          </slot>
        </div>

        <div v-if="slots.content" v-bind="bodyProps">
          <slot name="content" v-bind="alertDialogContext" />
        </div>

        <div v-bind="footerProps" data-test-alert-dialog-footer>
          <slot name="footer" v-bind="alertDialogContext">
            <AlertDialogCancel
              as-child
              data-test-alert-dialog-cancel
              @click="emit('cancel', $event)"
            >
              <slot name="cancel" v-bind="alertDialogContext">
                <Button v-bind="cancelButtonProps" data-test-alert-dialog-cancel-button />
              </slot>
            </AlertDialogCancel>

            <AlertDialogAction
              as-child
              data-test-alert-dialog-action
              @click="emit('action', $event)"
            >
              <slot name="action" v-bind="alertDialogContext">
                <Button v-bind="actionButtonProps" data-test-alert-dialog-action-button />
              </slot>
            </AlertDialogAction>
          </slot>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
