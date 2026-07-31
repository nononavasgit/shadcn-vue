<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Dialog as DialogBase,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/primitives/Dialog'
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
const emit = defineEmits<DialogEmits>()

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
      disableOutsidePointerEvents: content?.disableOutsidePointerEvents ?? props.modal,
      onOpenAutoFocus: (event: Event) => emit('openAutoFocus', event),
      onCloseAutoFocus: (event: Event) => emit('closeAutoFocus', event),
      onEscapeKeyDown: (event: Event) => {
        if (props.block) event.preventDefault()
        emit('escapeKeyDown', event)
      },
      onPointerDownOutside: (event: Event) => {
        if (props.block) event.preventDefault()
        emit('pointerDownOutside', event)
      },
      onFocusOutside: (event: Event) => {
        if (props.block) event.preventDefault()
        emit('focusOutside', event)
      },
      onInteractOutside: (event: Event) => {
        if (props.block) event.preventDefault()
        emit('interactOutside', event)
      },
      class: cn(contentUI.class),
    },
    header: {
      ...headerUI,
      class: cn(headerUI.class),
    },
    title: {
      ...titleUI,
      class: cn('flex items-center gap-2', titleUI.class),
    },
    icon: {
      'aria-hidden': true,
      ...iconUI,
      ...normalizeIconProps(props.icon),
      class: cn(iconUI.class),
    },
    description: {
      ...descriptionUI,
      class: cn(descriptionUI.class),
    },
    body: {
      ...bodyUI,
      class: cn('min-h-0 overflow-y-auto', bodyUI.class),
    },
    footer: {
      ...footerUI,
      class: cn(footerUI.class),
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
  <DialogBase v-slot="rootSlotProps" v-bind="calculatedUI.root" v-model:open="calculatedOpen">
    <DialogTrigger v-bind="calculatedUI.trigger">
      <slot v-bind="getSlotProps(rootSlotProps)" />
    </DialogTrigger>

    <DialogContent v-bind="calculatedUI.content">
      <template v-if="props.showCloseButton && !props.block" #close>
        <slot name="close" v-bind="getSlotProps(rootSlotProps)">
          <DialogClose v-bind="calculatedUI.close">
            <slot name="closeIcon" v-bind="getSlotProps(rootSlotProps)">
              <Icon name="x" />
            </slot>
          </DialogClose>
        </slot>
      </template>

      <DialogHeader v-bind="calculatedUI.header">
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
      </DialogHeader>

      <Separator />

      <div v-if="slots.content" v-bind="calculatedUI.body">
        <slot name="content" v-bind="getSlotProps(rootSlotProps)" />
      </div>

      <Separator v-if="slots.footer" />

      <DialogFooter v-if="slots.footer" v-bind="calculatedUI.footer">
        <slot name="footer" v-bind="getSlotProps(rootSlotProps)" />
      </DialogFooter>
    </DialogContent>
  </DialogBase>
</template>
