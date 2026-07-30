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
import { Button, useNormalizeButtonProps } from '@/components/ui/Button'
import { Icon, useNormalizeIconProps } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { AlertDialogEmits, AlertDialogProps, AlertDialogSlotProps, AlertDialogSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AlertDialogSlots>()
const emit = defineEmits<AlertDialogEmits>()

const props = withDefaults(defineProps<AlertDialogProps>(), {
  unmountOnHide: true,
})

const slots = useSlots()
const attrs = useAttrs()
const open = defineModel<boolean>('open')
const calculatedIcon = useNormalizeIconProps(() => props.icon)
const calculatedActionButton = useNormalizeButtonProps(() => props.actionButton)
const calculatedCancelButton = useNormalizeButtonProps(() => props.cancelButton)
const { t } = useI18n()

function getSlotProps(slotProps: { open: boolean; close: () => void }): AlertDialogSlotProps {
  return {
    open: slotProps.open,
    close: slotProps.close,
  }
}

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    defaultOpen: props.defaultOpen,
    unmountOnHide: props.unmountOnHide,
  },
  trigger: {
    ...props.ui?.trigger,
    asChild: props.ui?.trigger?.asChild ?? true,
  },
  content: {
    ...props.ui?.content,
    forceMount: props.forceMount,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents ?? true,
    onOpenAutoFocus: (event: Event) => emit('openAutoFocus', event),
    onCloseAutoFocus: (event: Event) => emit('closeAutoFocus', event),
    onEscapeKeyDown: (event: Event) => emit('escapeKeyDown', event),
    onPointerDownOutside: (event: Event) => emit('pointerDownOutside', event),
    onFocusOutside: (event: Event) => emit('focusOutside', event),
    onInteractOutside: (event: Event) => emit('interactOutside', event),
  },
  header: {
    ...props.ui?.header,
  },
  label: {
    ...props.ui?.label,
    class: cn('flex items-center gap-2', props.ui?.label?.class),
  },
  icon: {
    'aria-hidden': true,
    ...props.ui?.icon,
    ...calculatedIcon.value,
    class: cn(props.ui?.icon?.class, calculatedIcon.value?.class),
  },
  description: {
    ...props.ui?.description,
  },
  body: {
    ...props.ui?.body,
    class: cn('min-h-0 overflow-y-auto', props.ui?.body?.class),
  },
  footer: {
    ...props.ui?.footer,
  },
  cancel: {
    label: t('cancel'),
    variant: 'outline' as const,
    severity: 'secondary' as const,
    ...props.ui?.cancel,
    ...calculatedCancelButton.value,
    class: cn(props.ui?.cancel?.class, calculatedCancelButton.value?.class),
  },
  action: {
    label: t('continue'),
    ...props.ui?.action,
    ...calculatedActionButton.value,
    class: cn(props.ui?.action?.class, calculatedActionButton.value?.class),
  },
}))
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
