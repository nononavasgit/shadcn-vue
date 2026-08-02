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
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeDialogCloseProps,
  normalizeDialogContentProps,
  normalizeDialogTriggerProps,
  type DialogEmits,
  type DialogProps,
  type DialogSlotProps,
  type DialogSlots,
} from '.'

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
  showCloseButton: true,
  trigger: undefined,
  content: undefined,
  close: undefined,
  ui: undefined,
})

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const calculatedOpen = computed({
  get: () => open.value,
  set: (value: boolean | undefined) => {
    if (props.block && value === false) return
    open.value = value
  },
})
const { t } = useI18n()

function getSlotProps(slotProps: { open: boolean; close: () => void }): DialogSlotProps {
  return {
    open: slotProps.open,
    close: props.block ? () => {} : slotProps.close,
  }
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const headerUI = normalizeHTMLAttributes(props.ui?.header)
  const titleUI = normalizeHTMLAttributes(props.ui?.title)
  const iconUI = normalizeHTMLAttributes(props.ui?.icon)
  const descriptionUI = normalizeHTMLAttributes(props.ui?.description)
  const bodyUI = normalizeHTMLAttributes(props.ui?.body)
  const footerUI = normalizeHTMLAttributes(props.ui?.footer)
  const closeUI = normalizeHTMLAttributes(props.ui?.close)
  const trigger = normalizeDialogTriggerProps(props.trigger)
  const content = normalizeDialogContentProps(props.content)
  const close = normalizeDialogCloseProps(props.close)

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      defaultOpen: props.defaultOpen,
      modal: props.modal,
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
    content: {
      ...contentUI,
      ...content,
      forceMount: props?.forceMount,
      disableOutsidePointerEvents: props?.disableOutsidePointerEvents ?? props.modal,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
        'max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden',
        contentUI.class,
      ),
    },
    header: {
      ...headerUI,
      class: cn('flex flex-col gap-2 text-center sm:text-left', headerUI.class),
    },
    title: {
      ...titleUI,
      class: cn('text-lg leading-none font-semibold flex items-center gap-2', titleUI.class),
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
    close: {
      ...closeUI,
      ...close,
      'aria-label': closeUI['aria-label'] ?? t('close'),
      class: cn(
        'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        closeUI.class,
      ),
    },
  }
})
</script>

<template>
  <DialogRoot
    v-slot="rootSlotProps"
    v-bind="calculatedUI.root"
    v-model:open="calculatedOpen"
    data-slot="dialog"
  >
    <DialogTrigger v-bind="calculatedUI.trigger" data-slot="dialog-trigger">
      <slot v-bind="getSlotProps(rootSlotProps)" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        data-slot="dialog-overlay"
        class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
      />
      <DialogContent v-bind="calculatedUI.content" data-slot="dialog-content">
        <template v-if="props.showCloseButton && !props.block">
          <slot name="close" v-bind="getSlotProps(rootSlotProps)">
            <DialogClose v-bind="calculatedUI.close">
              <slot name="closeIcon" v-bind="getSlotProps(rootSlotProps)">
                <Icon name="x" />
              </slot>
            </DialogClose>
          </slot>
        </template>

        <div v-bind="calculatedUI.header" data-slot="dialog-header">
          <slot name="header" v-bind="getSlotProps(rootSlotProps)">
            <DialogTitle v-if="props.label || slots.title" v-bind="calculatedUI.title">
              <Icon
                v-if="calculatedUI.icon.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
              <slot name="title" v-bind="getSlotProps(rootSlotProps)">
                {{ props.label }}
              </slot>
            </DialogTitle>

            <DialogDescription
              v-if="props.description || slots.description"
              v-bind="calculatedUI.description"
            >
              <slot name="description" v-bind="getSlotProps(rootSlotProps)">
                {{ props.description }}
              </slot>
            </DialogDescription>
          </slot>
        </div>

        <Separator />

        <div v-if="slots.content" v-bind="calculatedUI.body">
          <slot name="content" v-bind="getSlotProps(rootSlotProps)" />
        </div>

        <Separator v-if="slots.footer" />

        <div v-if="slots.footer" v-bind="calculatedUI.footer" data-slot="dialog-footer">
          <slot name="footer" v-bind="getSlotProps(rootSlotProps)" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
