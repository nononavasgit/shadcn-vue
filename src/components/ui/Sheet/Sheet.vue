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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, sheetContext.value))

  return {
    ...attrs,
    ...rootUI,
    modal: props.modal,
    unmountOnHide: props.unmountOnHide,
    'data-slot': 'sheet',
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, sheetContext.value))

  return {
    as: props.trigger?.as,
    asChild: props.trigger?.asChild ?? true,
    ...triggerUI,
    'data-slot': 'sheet-trigger',
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const overlayProps = computed(() => {
  const overlayUI = normalizeHTMLAttributes(useResolve(props.ui?.overlay, sheetContext.value))

  return {
    ...overlayUI,
    'data-slot': 'sheet-overlay',
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      overlayUI.class,
    ),
    style: overlayUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, sheetContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const side = props.content?.side ?? 'right'

  void contentDirection

  return {
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
  }
})

const headerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.header, sheetContext.value))
  return {
    ...ui,
    'data-slot': 'sheet-header',
    class: cn('flex flex-col gap-1.5 p-4', ui.class),
    style: ui.style,
  }
})

const labelProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.label, sheetContext.value))
  return {
    ...ui,
    'data-slot': 'sheet-label',
    class: cn('flex items-center gap-2 font-semibold text-foreground', ui.class),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.description, sheetContext.value))
  return {
    ...ui,
    'data-slot': 'sheet-description',
    class: cn('text-sm text-muted-foreground', ui.class),
    style: ui.style,
  }
})

const bodyProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.body, sheetContext.value))
  return {
    ...ui,
    'data-slot': 'sheet-body',
    class: cn('min-h-0 overflow-y-auto px-4', ui.class),
    style: ui.style,
  }
})

const footerProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.footer, sheetContext.value))
  return {
    ...ui,
    'data-slot': 'sheet-footer',
    class: cn('mt-auto flex flex-col gap-2 p-4', ui.class),
    style: ui.style,
  }
})

const closeProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.close, sheetContext.value))
  return {
    as: props.close?.as,
    asChild: props.close?.asChild,
    ...ui,
    'aria-label': ui['aria-label'] ?? t('close'),
    'data-slot': 'sheet-close',
    class: cn(
      'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      ui.class,
    ),
    style: ui.style,
  }
})

const icon = computed(() => normalizeIconProps(props.icon))
const closeIcon = computed(() => normalizeIconProps(props.closeIcon))
</script>

<template>
  <DialogRoot v-bind="rootProps" v-model:open="open">
    <DialogTrigger v-bind="triggerProps">
      <slot v-bind="sheetContext" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay v-bind="overlayProps" />
      <DialogContent v-bind="contentProps">
        <template v-if="props.showCloseButton && !props.block">
          <slot name="close" v-bind="sheetContext">
            <DialogClose v-bind="closeProps">
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
          v-bind="headerProps"
        >
          <slot name="header" v-bind="sheetContext">
            <DialogTitle v-if="props.label || slots.label" v-bind="labelProps">
              <Icon v-if="closeIcon?.name" v-bind="closeIcon" />
              <slot name="label" v-bind="sheetContext">{{ props.label }}</slot>
            </DialogTitle>

            <DialogDescription
              v-if="props.description || slots.description"
              v-bind="descriptionProps"
            >
              <slot name="description" v-bind="sheetContext">{{ props.description }}</slot>
            </DialogDescription>
          </slot>
        </div>

        <div v-if="slots.content" v-bind="bodyProps">
          <slot name="content" v-bind="sheetContext" />
        </div>

        <div v-if="slots.footer" v-bind="footerProps">
          <slot name="footer" v-bind="sheetContext" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
