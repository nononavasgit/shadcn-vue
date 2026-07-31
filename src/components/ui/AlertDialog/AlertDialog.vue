<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  AlertDialog as AlertDialogBase,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/primitives/AlertDialog'
import { Button, normalizeButtonProps } from '@/components/ui/Button'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeAlertDialogContentProps,
  normalizeAlertDialogTriggerProps,
  type AlertDialogEmits,
  type AlertDialogProps,
  type AlertDialogSlotProps,
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

function getSlotProps(slotProps: { open: boolean; close: () => void }): AlertDialogSlotProps {
  return {
    open: slotProps.open,
    close: slotProps.close,
  }
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
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
    content: {
      ...contentUI,
      ...content,
      disableOutsidePointerEvents: content?.disableOutsidePointerEvents ?? true,
      onOpenAutoFocus: (event: Event) => emit('openAutoFocus', event),
      onCloseAutoFocus: (event: Event) => emit('closeAutoFocus', event),
      onEscapeKeyDown: (event: Event) => emit('escapeKeyDown', event),
      onPointerDownOutside: (event: Event) => emit('pointerDownOutside', event),
      onFocusOutside: (event: Event) => emit('focusOutside', event),
      onInteractOutside: (event: Event) => emit('interactOutside', event),
      class: cn(contentUI.class),
    },
    header: {
      ...headerUI,
      class: cn(headerUI.class),
    },
    label: {
      ...labelUI,
      class: cn('flex items-center gap-2', labelUI.class),
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
  <AlertDialogBase v-slot="rootSlotProps" v-bind="calculatedUI.root" v-model:open="open">
    <AlertDialogTrigger v-bind="calculatedUI.trigger">
      <slot v-bind="getSlotProps(rootSlotProps)" />
    </AlertDialogTrigger>

    <AlertDialogContent v-bind="calculatedUI.content">
      <AlertDialogHeader
        v-if="props.label || props.description || slots.header || slots.label || slots.description"
        v-bind="calculatedUI.header"
      >
        <slot name="header" v-bind="getSlotProps(rootSlotProps)">
          <AlertDialogTitle v-if="props.label || slots.label" v-bind="calculatedUI.label">
            <Icon
              v-if="calculatedUI.icon.name"
              v-bind="calculatedUI.icon"
              :name="calculatedUI.icon.name"
            />
            <slot name="label" v-bind="getSlotProps(rootSlotProps)">
              {{ props.label }}
            </slot>
          </AlertDialogTitle>

          <AlertDialogDescription
            v-if="props.description || slots.description"
            v-bind="calculatedUI.description"
          >
            <slot name="description" v-bind="getSlotProps(rootSlotProps)">
              {{ props.description }}
            </slot>
          </AlertDialogDescription>
        </slot>
      </AlertDialogHeader>

      <div v-if="slots.content" v-bind="calculatedUI.body">
        <slot name="content" v-bind="getSlotProps(rootSlotProps)" />
      </div>

      <AlertDialogFooter v-bind="calculatedUI.footer">
        <slot name="footer" v-bind="getSlotProps(rootSlotProps)">
          <AlertDialogCancel as-child @click="emit('cancel', $event)">
            <slot name="cancel" v-bind="getSlotProps(rootSlotProps)">
              <Button v-bind="calculatedUI.cancel" />
            </slot>
          </AlertDialogCancel>

          <AlertDialogAction as-child @click="emit('action', $event)">
            <slot name="action" v-bind="getSlotProps(rootSlotProps)">
              <Button v-bind="calculatedUI.action" />
            </slot>
          </AlertDialogAction>
        </slot>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogBase>
</template>
