<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button } from '@/components/app/Button'
import { Collapsible } from '@/components/app/Collapsible'
import { Icon, useNormalizeIconProps } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { panelVariants, type PanelEmits, type PanelProps, type PanelSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PanelSlots>()

const props = withDefaults(defineProps<PanelProps>(), {
  variant: 'solid',
  severity: 'primary',
  collapsible: true,
})
defineEmits<PanelEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
const { colorStyle } = useColor(
  computed(() => props.color),
  'panel',
)
const calculatedIcon = useNormalizeIconProps(() => props.icon)
const calculatedOpen = computed({
  get: () => (props.collapsible ? open.value : true),
  set: (value: boolean) => {
    if (props.collapsible) open.value = value
  },
})

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    class: cn(attrs.class),
    style: [colorStyle.value, attrs.style],
  },
  header: {
    ...props.ui?.header,
  },
  trigger: {
    as: props.collapsible ? undefined : 'span',
    color: props.color,
    severity: props.severity,
    variant: props.variant,
    class: cn(
      'w-full',
      calculatedOpen.value && 'rounded-br-none rounded-bl-none',
      !props.collapsible && 'justify-start',
    ),
  },
  icon: {
    ...props.ui?.icon,
    ...calculatedIcon.value,
    class: cn(props.ui?.icon?.class, calculatedIcon.value?.class),
  },
  label: props.ui?.label,
  arrows: {
    ...props.ui?.arrows,
    class: cn('ml-auto shrink-0', props.ui?.arrows?.class),
  },
  content: {
    ...props.ui?.content,
    class: cn(
      panelVariants({
        severity: props.severity,
        variant: props.variant,
        color: Boolean(props.color),
      }),
      'rounded-t-none border-t-0 p-[15px] text-card-foreground shadow-none',
      props.ui?.content?.class,
    ),
  },
}))
</script>

<template>
  <Collapsible v-model:open="calculatedOpen" v-bind="calculatedUI.root">
    <template #default="{ open: isOpen }">
      <div v-bind="calculatedUI?.header">
        <Button v-bind="calculatedUI.trigger">
          <span class="flex min-w-0 items-center gap-2">
            <slot name="icon" :open="isOpen">
              <Icon
                v-if="calculatedUI.icon.name"
                v-bind="calculatedUI.icon"
                :name="calculatedUI.icon.name"
              />
            </slot>

            <span v-if="props.label || $slots.label" v-bind="calculatedUI.label">
              <slot name="label" :open="isOpen">{{ props.label }}</slot>
            </span>
          </span>

          <span v-if="props.collapsible" v-bind="calculatedUI.arrows">
            <slot name="arrows" :open="isOpen">
              <Icon :name="isOpen ? 'chevronUp' : 'chevronDown'" size="sm" />
            </slot>
          </span>
        </Button>
      </div>
    </template>

    <template v-if="$slots.default" #content>
      <div v-bind="calculatedUI.content">
        <slot />
      </div>
    </template>
  </Collapsible>
</template>
