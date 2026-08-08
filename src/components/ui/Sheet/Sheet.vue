<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
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
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { sheetVariants } from '.'
import type { SheetContext, SheetEmits, SheetProps, SheetSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<SheetSlots>()
const emit = defineEmits<SheetEmits>()

const props = withDefaults(defineProps<SheetProps>(), {
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
const modelOpen = defineModel<boolean>('open', { default: false })
const { t } = useI18n()

const open = computed<boolean>({
  get: () => modelOpen.value,
  set: (value) => {
    if (props.block && !value) return
    modelOpen.value = value
  },
})

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('show')
  else emit('close')
})

function close() {
  if (!props.block) open.value = false
}

const sheetContext = computed<SheetContext>(() => {
  const { ui, ...sheetProps } = props
  void ui

  return {
    props: sheetProps,
    open: open.value,
    close,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, sheetContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, sheetContext.value))
  const overlayUI = normalizeHTMLAttributes(useResolve(props.ui?.overlay, sheetContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, sheetContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const headerUI = normalizeHTMLAttributes(useResolve(props.ui?.header, sheetContext.value))
  const labelUI = normalizeHTMLAttributes(useResolve(props.ui?.label, sheetContext.value))
  const descriptionUI = normalizeHTMLAttributes(
    useResolve(props.ui?.description, sheetContext.value),
  )
  const bodyUI = normalizeHTMLAttributes(useResolve(props.ui?.body, sheetContext.value))
  const footerUI = normalizeHTMLAttributes(useResolve(props.ui?.footer, sheetContext.value))
  const closeUI = normalizeHTMLAttributes(useResolve(props.ui?.close, sheetContext.value))
  const side = props.content?.side ?? 'right'

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      modal: props.modal,
      unmountOnHide: props.unmountOnHide,
      'data-slot': 'sheet',
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      as: props.trigger?.as,
      asChild: props.trigger?.asChild ?? true,
      ...triggerUI,
      'data-slot': 'sheet-trigger',
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    overlay: {
      ...overlayUI,
      'data-slot': 'sheet-overlay',
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        overlayUI.class,
      ),
      style: overlayUI.style,
    },
    content: {
      as: props.content?.as,
      asChild: props.content?.asChild,
      forceMount: props.content?.forceMount,
      disableOutsidePointerEvents: props.content?.disableOutsidePointerEvents ?? props.modal,
      onOpenAutoFocus: props.content?.onOpenAutoFocus,
      onCloseAutoFocus: props.content?.onCloseAutoFocus,
      onEscapeKeyDown: props.content?.onEscapeKeyDown,
      onPointerDownOutside: props.content?.onPointerDownOutside,
      onFocusOutside: props.content?.onFocusOutside,
      onInteractOutside: props.content?.onInteractOutside,
      ...contentUI,
      'data-slot': 'sheet-content',
      class: cn(sheetVariants({ side }), contentUI.class),
      style: contentUI.style,
    },
    header: {
      ...headerUI,
      'data-slot': 'sheet-header',
      class: cn('flex flex-col gap-1.5 p-4', headerUI.class),
      style: headerUI.style,
    },
    label: {
      ...labelUI,
      'data-slot': 'sheet-label',
      class: cn('flex items-center gap-2 font-semibold text-foreground', labelUI.class),
      style: labelUI.style,
    },
    description: {
      ...descriptionUI,
      'data-slot': 'sheet-description',
      class: cn('text-sm text-muted-foreground', descriptionUI.class),
      style: descriptionUI.style,
    },
    body: {
      ...bodyUI,
      'data-slot': 'sheet-body',
      class: cn('min-h-0 overflow-y-auto px-4', bodyUI.class),
      style: bodyUI.style,
    },
    footer: {
      ...footerUI,
      'data-slot': 'sheet-footer',
      class: cn('mt-auto flex flex-col gap-2 p-4', footerUI.class),
      style: footerUI.style,
    },
    close: {
      as: props.close?.as,
      asChild: props.close?.asChild,
      ...closeUI,
      'aria-label': closeUI['aria-label'] ?? t('close'),
      'data-slot': 'sheet-close',
      class: cn(
        'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
        closeUI.class,
      ),
      style: closeUI.style,
    },
  }
})

const icon = computed(() => normalizeIconProps(props.icon))
const closeIcon = computed(() => normalizeIconProps(props.closeIcon))
</script>

<template>
  <DialogRoot v-bind="calculatedUI.root" v-model:open="open">
    <DialogTrigger v-bind="calculatedUI.trigger">
      <slot v-bind="sheetContext" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay v-bind="calculatedUI.overlay" />
      <DialogContent v-bind="calculatedUI.content">
        <template v-if="props.showCloseButton && !props.block">
          <slot name="close" v-bind="sheetContext">
            <DialogClose v-bind="calculatedUI.close">
              <slot name="closeIcon" v-bind="sheetContext">
                <Icon v-if="icon?.name" v-bind="icon" />
              </slot>
            </DialogClose>
          </slot>
        </template>

        <div
          v-if="
            props.label || props.description || slots.header || slots.label || slots.description
          "
          v-bind="calculatedUI.header"
        >
          <slot name="header" v-bind="sheetContext">
            <DialogTitle v-if="props.label || slots.label" v-bind="calculatedUI.label">
              <Icon v-if="closeIcon?.name" v-bind="closeIcon" />
              <slot name="label" v-bind="sheetContext">{{ props.label }}</slot>
            </DialogTitle>

            <DialogDescription
              v-if="props.description || slots.description"
              v-bind="calculatedUI.description"
            >
              <slot name="description" v-bind="sheetContext">{{ props.description }}</slot>
            </DialogDescription>
          </slot>
        </div>

        <div v-if="slots.content" v-bind="calculatedUI.body">
          <slot name="content" v-bind="sheetContext" />
        </div>

        <div v-if="slots.footer" v-bind="calculatedUI.footer">
          <slot name="footer" v-bind="sheetContext" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
