<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { Separator } from '@/components/ui/Separator'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeDialogCloseProps,
  normalizeDialogContentProps,
  normalizeDialogRootProps,
  normalizeDialogTriggerProps,
} from '.'
import type { DialogContext, DialogEmits, DialogProps, DialogSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<DialogSlots>()
defineEmits<DialogEmits>()

const props = withDefaults(defineProps<DialogProps>(), {
  modal: true,
  block: false,
  unmountOnHide: true,
  label: undefined,
  description: undefined,
  icon: undefined,
  closeIcon: 'x',
  showCloseButton: true,
  trigger: undefined,
  content: undefined,
  close: undefined,
  ui: undefined,
})

const slots = useSlots()
const attrs = useAttrs()
const modelOpen = defineModel<boolean>('open')
const { t } = useI18n()

const open = computed<boolean>({
  get: () => modelOpen.value ?? props.defaultOpen ?? false,
  set: (value) => {
    if (props.block && !value) return
    modelOpen.value = value
  },
})

function close() {
  if (!props.block) open.value = false
}

const dialogContext = computed<DialogContext>(() => {
  const { ui, ...dialogProps } = props
  void ui

  return {
    props: dialogProps,
    open: open.value,
    close,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, dialogContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, dialogContext.value))
  const overlayUI = normalizeHTMLAttributes(useResolve(props.ui?.overlay, dialogContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, dialogContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, dialogContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, dialogContext.value))
  const descriptionUI = normalizeHTMLAttributes(
    useResolve(props.ui?.description, dialogContext.value),
  )
  const bodyUI = normalizeHTMLAttributes(useResolve(props.ui?.body, dialogContext.value))
  const footerUI = normalizeHTMLAttributes(useResolve(props.ui?.footer, dialogContext.value))
  const closeUI = normalizeHTMLAttributes(useResolve(props.ui?.close, dialogContext.value))

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...normalizeDialogRootProps(props),
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      asChild: true,
      ...normalizeDialogTriggerProps(props.trigger),
      ...triggerUI,
      class: cn(triggerUI.class),
      style: triggerUI.style,
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
      disableOutsidePointerEvents: props.modal,
      ...normalizeDialogContentProps(props.content),
      ...contentUI,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
        contentUI.class,
      ),
      style: contentUI.style,
    },
    header: {
      ...headerUI,
      class: cn('flex flex-col gap-2 text-center sm:text-left', headerUI.class),
      style: headerUI.style,
    },
    label: {
      ...labelUI,
      class: cn('flex items-center gap-2 text-lg leading-none font-semibold', labelUI.class),
      style: labelUI.style,
    },
    icon: {
      'aria-hidden': true,
      ...normalizeIconProps(props.icon),
    },
    description: {
      ...descriptionUI,
      class: cn('text-sm text-muted-foreground', descriptionUI.class),
      style: descriptionUI.style,
    },
    body: {
      ...bodyUI,
      class: cn('min-h-0 overflow-y-auto', bodyUI.class),
      style: bodyUI.style,
    },
    footer: {
      ...footerUI,
      class: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', footerUI.class),
      style: footerUI.style,
    },
    close: {
      ...normalizeDialogCloseProps(props.close),
      ...closeUI,
      'aria-label': closeUI['aria-label'] ?? t('close'),
      class: cn(
        'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        closeUI.class,
      ),
      style: closeUI.style,
    },
    closeIcon: { ...normalizeIconProps(props.closeIcon) },
  }
})
</script>

<template>
  <DialogRoot v-bind="calculatedUI.root" v-model:open="open" data-slot="dialog">
    <DialogTrigger v-bind="calculatedUI.trigger" data-slot="dialog-trigger">
      <slot v-bind="dialogContext" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay v-bind="calculatedUI.overlay" data-slot="dialog-overlay" />
      <DialogContent v-bind="calculatedUI.content" data-slot="dialog-content">
        <template v-if="props.showCloseButton && !props.block">
          <slot name="close" v-bind="dialogContext">
            <DialogClose v-bind="calculatedUI.close" data-slot="dialog-close">
              <slot name="closeIcon" v-bind="dialogContext">
                <Icon
                  v-if="calculatedUI.closeIcon.name"
                  v-bind="calculatedUI.closeIcon"
                  :name="calculatedUI.closeIcon.name"
                />
              </slot>
            </DialogClose>
          </slot>
        </template>

        <div
          v-if="
            props.label || props.description || slots.header || slots.label || slots.description
          "
          v-bind="calculatedUI.header"
          data-slot="dialog-header"
        >
          <slot name="header" v-bind="dialogContext">
            <DialogTitle
              v-if="props.label || slots.label"
              v-bind="calculatedUI.label"
              data-slot="dialog-label"
            >
              <Icon
                v-if="calculatedUI.icon.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
              <slot name="label" v-bind="dialogContext">{{ props.label }}</slot>
            </DialogTitle>

            <DialogDescription
              v-if="props.description || slots.description"
              v-bind="calculatedUI.description"
              data-slot="dialog-description"
            >
              <slot name="description" v-bind="dialogContext">{{ props.description }}</slot>
            </DialogDescription>
          </slot>
        </div>

        <Separator />

        <div v-if="slots.content" v-bind="calculatedUI.body" data-slot="dialog-body">
          <slot name="content" v-bind="dialogContext" />
        </div>

        <Separator v-if="slots.footer" />

        <div v-if="slots.footer" v-bind="calculatedUI.footer" data-slot="dialog-footer">
          <slot name="footer" v-bind="dialogContext" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
