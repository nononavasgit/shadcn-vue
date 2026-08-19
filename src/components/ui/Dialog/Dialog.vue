<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
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
import { Icon } from '@/components/ui/Icon'
import { Separator } from '@/components/ui/Separator'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { DialogContext, DialogEmits, DialogProps, DialogSlots } from '.'
import { dialogDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<DialogSlots>()
const emit = defineEmits<DialogEmits>()

const props = withDefaults(defineProps<DialogProps>(), dialogDefaults)

const slots = useSlots()
const attrs = useAttrs()
const portalTarget = ref<HTMLElement>()
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

const dialogContext = computed<DialogContext>(() => ({
  open: open.value,
  close,
}))

const rootProps = computed(() => {
  return {
    modal: props.modal,
    unmountOnHide: props.unmountOnHide,
  }
})

const triggerProps = computed(() => {
  return {
    asChild: true,
  }
})

const overlayProps = computed(() => {
  const overlayUI = useUi(props.ui?.overlay, dialogContext.value)

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
  const normalizedContentUI = useUi(props.ui?.content, dialogContext.value)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI

  void contentDirection

  return {
    forceMount: props.forceMount,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents ?? props.modal,
    onOpenAutoFocus: (event: DialogEmits['openAutoFocus'][0]) => emit('openAutoFocus', event),
    onCloseAutoFocus: (event: DialogEmits['closeAutoFocus'][0]) => emit('closeAutoFocus', event),
    onEscapeKeyDown: (event: DialogEmits['escapeKeyDown'][0]) => emit('escapeKeyDown', event),
    onPointerDownOutside: (event: DialogEmits['pointerDownOutside'][0]) =>
      emit('pointerDownOutside', event),
    onFocusOutside: (event: DialogEmits['focusOutside'][0]) => emit('focusOutside', event),
    onInteractOutside: (event: DialogEmits['interactOutside'][0]) => emit('interactOutside', event),
    ...contentUI,
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})

const headerProps = computed(() => {
  const ui = useUi(props.ui?.header, dialogContext.value)
  return {
    ...ui,
    class: cn('flex flex-col gap-2 text-center sm:text-left', ui.class),
    style: ui.style,
  }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, dialogContext.value)
  return {
    ...ui,
    class: cn('flex items-center gap-2 text-lg leading-none font-semibold', ui.class),
    style: ui.style,
  }
})

const descriptionProps = computed(() => {
  const ui = useUi(props.ui?.description, dialogContext.value)
  return {
    ...ui,
    class: cn('text-sm text-muted-foreground', ui.class),
    style: ui.style,
  }
})

const bodyProps = computed(() => {
  const ui = useUi(props.ui?.body, dialogContext.value)
  return {
    ...ui,
    class: cn('min-h-0 overflow-y-auto', ui.class),
    style: ui.style,
  }
})

const footerProps = computed(() => {
  const ui = useUi(props.ui?.footer, dialogContext.value)
  return {
    ...ui,
    class: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', ui.class),
    style: ui.style,
  }
})

const closeProps = computed(() => {
  const ui = useUi(props.ui?.close, dialogContext.value)
  return {
    ...ui,
    'aria-label': ui['aria-label'] ?? t('close'),
    class: cn(
      'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      ui.class,
    ),
    style: ui.style,
  }
})

const icon = computed(() => props.icon)
const closeIcon = computed(() => props.closeIcon)
</script>

<template>
  <div class="contents">
    <DialogRoot v-bind="rootProps" v-model:open="open" data-test-dialog-root>
      <DialogTrigger v-bind="triggerProps" data-test-dialog-trigger>
        <slot v-bind="dialogContext" />
      </DialogTrigger>

      <DialogPortal :to="portalTarget">
        <DialogOverlay v-bind="overlayProps" data-test-dialog-overlay />
        <DialogContent v-bind="contentProps" data-test-dialog-content>
          <template v-if="props.showCloseButton && !props.block">
            <slot name="close" v-bind="dialogContext">
              <DialogClose v-bind="closeProps" data-test-dialog-close>
                <slot name="closeIcon" v-bind="dialogContext">
                  <Icon v-if="closeIcon?.name" v-bind="closeIcon" data-test-dialog-close-icon />
                </slot>
              </DialogClose>
            </slot>
          </template>

          <div
            v-if="
              props.label || props.description || slots.header || slots.label || slots.description
            "
            v-bind="headerProps"
            data-test-dialog-header
          >
            <slot name="header" v-bind="dialogContext">
              <DialogTitle
                v-if="props.label || slots.label"
                v-bind="labelProps"
                data-test-dialog-label
              >
                <Icon v-if="icon?.name" v-bind="icon" :name="icon.name" data-test-dialog-icon />
                <slot name="label" v-bind="dialogContext">{{ props.label }}</slot>
              </DialogTitle>

              <DialogDescription
                v-if="props.description || slots.description"
                v-bind="descriptionProps"
                data-test-dialog-description
              >
                <slot name="description" v-bind="dialogContext">{{ props.description }}</slot>
              </DialogDescription>
            </slot>
          </div>

          <Separator />

          <div v-if="slots.content" v-bind="bodyProps" data-test-dialog-body>
            <slot name="content" v-bind="dialogContext" />
          </div>

          <Separator v-if="slots.footer" />

          <div v-if="slots.footer" v-bind="footerProps" data-test-dialog-footer>
            <slot name="footer" v-bind="dialogContext" />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
    <div ref="portalTarget" data-test-dialog-portal-target />
  </div>
</template>
