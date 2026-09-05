<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'
import { Icon, type IconConfig } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import {
  normalizeStepperDescriptionProps,
  normalizeStepperIndicatorProps,
  normalizeStepperItemProps,
  normalizeStepperLabelProps,
  normalizeStepperRootProps,
  normalizeStepperSeparatorProps,
  normalizeStepperTriggerProps,
} from '.'
import { stepperDefaults } from './defaults'
import type {
  StepperContext,
  StepperEmits,
  StepperItemContext,
  StepperProps,
  StepperSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), stepperDefaults)
defineSlots<StepperSlots>()
defineEmits<StepperEmits>()

const attrs = useAttrs()
const slots = useSlots()
const model = defineModel<number>('value')
const value = computed<number | undefined>({
  get: () => model.value ?? 1,
  set: (nextValue) => {
    model.value = nextValue
  },
})
const currentStepIndex = computed(() => props.steps.findIndex((item) => item.step === value.value))
const nextStepItem = computed(() => {
  if (currentStepIndex.value < 0) return undefined
  return props.steps[currentStepIndex.value + 1]
})
const prevStepItem = computed(() => {
  if (currentStepIndex.value < 0) return undefined
  return props.steps[currentStepIndex.value - 1]
})
const stepper = ref<StepperRootInstance>()
const { colorStyle } = useColor(
  computed(() => props.color),
  'stepper',
)

interface StepperRootInstance {
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

function goToStep(step: number) {
  const target = props.steps.find((item) => item.step === step)

  if (!target || target.disabled) return

  stepper.value?.goToStep(step)
}

function nextStep() {
  if (nextStepItem.value) goToStep(nextStepItem.value.step)
}

function prevStep() {
  if (prevStepItem.value) goToStep(prevStepItem.value.step)
}

function hasNext() {
  return Boolean(nextStepItem.value && !nextStepItem.value.disabled && stepper.value?.hasNext())
}

function hasPrev() {
  return Boolean(prevStepItem.value && !prevStepItem.value.disabled && stepper.value?.hasPrev())
}

const stepperContext = computed<StepperContext>(() => {
  return {
    value: value.value,
    totalSteps: props.steps.length,
    isNextDisabled:
      currentStepIndex.value < 0 ||
      currentStepIndex.value === props.steps.length - 1 ||
      Boolean(nextStepItem.value?.disabled),
    isPrevDisabled: currentStepIndex.value <= 0 || Boolean(prevStepItem.value?.disabled),
    isFirstStep: currentStepIndex.value >= 0 && currentStepIndex.value === 0,
    isLastStep: currentStepIndex.value >= 0 && currentStepIndex.value === props.steps.length - 1,
    goToStep,
    nextStep,
    prevStep,
    hasNext,
    hasPrev,
  }
})

const isVertical = computed(() => props.orientation === 'vertical')

const rootProps = computed(() => {
  const normalizedRootUI = useUi(props.ui?.root, stepperContext.value)
  const { dir: rootDirection, ...rootUI } = normalizedRootUI

  void rootDirection

  return {
    ...attrs,
    ...rootUI,
    ...normalizeStepperRootProps(props),
    'data-slot': 'stepper',
    'data-test-stepper-root': '',
    class: cn('block w-full', attrs.class, rootUI.class),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const listProps = computed(() => {
  const listUI = useUi(props.ui?.list, stepperContext.value)

  return {
    ...listUI,
    'data-slot': 'stepper-list',
    'data-test-stepper-list': '',
    class: cn('flex w-full', isVertical.value ? 'flex-col' : 'items-start gap-2', listUI.class),
    style: listUI.style,
  }
})

const triggerClass = computed(() =>
  cn(
    'z-10 border border-transparent outline-none focus-visible:ring-3',
    props.color
      ? 'focus-visible:border-(--stepper-color) focus-visible:ring-(--stepper-color)/50'
      : 'focus-visible:border-primary focus-visible:ring-primary/50',
    isVertical.value && 'w-full flex-row items-start gap-3 p-0 text-left',
  ),
)

const indicatorClass = computed(
  () =>
    props.color &&
    'group-data-[state=active]:bg-(--stepper-color) group-data-[state=active]:text-(--stepper-color-foreground) group-data-[state=completed]:bg-(--stepper-color) group-data-[state=completed]:text-(--stepper-color-foreground)',
)

const separatorClass = computed(() =>
  cn(
    isVertical.value
      ? 'absolute top-10 left-5 -bottom-5 w-0.5 -translate-x-1/2 rounded-full'
      : 'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] h-0.5 shrink-0 rounded-full',
    props.color && 'group-data-[state=completed]:bg-(--stepper-color)',
  ),
)

function getStepContext(
  step: NonNullable<StepperProps['steps']>[number],
  index: number,
): StepperItemContext {
  const currentStep = value.value
  const completed = Boolean(
    step.completed || (currentStep !== undefined && step.step < currentStep),
  )
  return {
    ...stepperContext.value,
    item: step,
    index,
    completed,
    active: !completed && step.step === currentStep,
    first: index === 0,
    last: index === props.steps.length - 1,
  }
}

function getSlotNames(context: StepperItemContext) {
  const slot = String(context.item.slot ?? context.item.step)
  return {
    indicator: `indicator-${slot}`,
    label: `label-${slot}`,
    description: `description-${slot}`,
    content: `content-${slot}`,
  } as const
}

function getItemProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    ...normalizeStepperItemProps(context.item),
    'data-slot': 'stepper-item',
    'data-test-stepper-item': context.item.slot ?? context.item.step,
    class: cn(
      'group flex items-center gap-2 data-[disabled]:pointer-events-none',
      isVertical.value
        ? 'relative flex w-full items-start gap-4 pb-6 last:pb-0'
        : 'relative flex min-w-0 flex-1 basis-0 flex-col items-center justify-start',
      ui.class,
    ),
    style: ui.style,
  }
}

function getTriggerProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.trigger, context)
  return {
    ...ui,
    ...normalizeStepperTriggerProps(context.item.trigger),
    'data-slot': 'stepper-trigger',
    'data-test-stepper-trigger': context.item.slot ?? context.item.step,
    class: cn(
      'flex min-w-0 flex-col items-center gap-1 rounded-md p-1 text-center',
      triggerClass.value,
      !isVertical.value && 'w-full',
      ui.class,
    ),
    style: ui.style,
  }
}

function getIndicatorProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.indicator, context)
  return {
    ...ui,
    ...normalizeStepperIndicatorProps(context.item.indicator),
    'data-slot': 'stepper-indicator',
    'data-test-stepper-indicator': context.item.slot ?? context.item.step,
    class: cn(
      'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground group-data-[disabled]:opacity-50',
      indicatorClass.value,
      ui.class,
    ),
    style: ui.style,
  }
}

function getWrapperProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.wrapper, context)
  return {
    ...ui,
    'data-slot': 'stepper-wrapper',
    'data-test-stepper-wrapper': context.item.slot ?? context.item.step,
    class: cn('flex min-w-0 flex-1 flex-col', !isVertical.value && 'w-full items-center', ui.class),
    style: ui.style,
  }
}

function getLabelProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    ...normalizeStepperLabelProps(context.item.labelProps),
    'data-slot': 'stepper-title',
    'data-test-stepper-title': context.item.slot ?? context.item.step,
    class: cn(
      'text-base font-semibold',
      isVertical.value ? 'whitespace-normal' : 'w-full break-words whitespace-normal text-center',
      ui.class,
    ),
    style: ui.style,
  }
}

function getDescriptionProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    ...normalizeStepperDescriptionProps(context.item.descriptionProps),
    'data-slot': 'stepper-description',
    'data-test-stepper-description': context.item.slot ?? context.item.step,
    class: cn(
      'text-sm text-muted-foreground',
      !isVertical.value && 'w-full break-words text-center',
      ui.class,
    ),
    style: ui.style,
  }
}

function getSeparatorProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.separator, context)
  return {
    ...ui,
    ...normalizeStepperSeparatorProps(context.item.separator),
    'data-slot': 'stepper-separator',
    'data-test-stepper-separator': context.item.slot ?? context.item.step,
    class: cn(
      'bg-muted transition-colors group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50 group-data-[state=completed]:bg-primary',
      separatorClass.value,
      ui.class,
    ),
    style: ui.style,
  }
}

function getContentProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.content, context)
  return {
    ...ui,
    'data-slot': 'stepper-content',
    'data-test-stepper-content': context.item.slot ?? context.item.step,
    class: cn('mt-6', isVertical.value && 'ml-14', ui.class),
    style: ui.style,
  }
}

function showWrapper(context: StepperItemContext) {
  const slotNames = getSlotNames(context)
  const step = context.item
  return Boolean(
    step.label ||
    step.description ||
    slots.label ||
    slots.description ||
    slots[slotNames.label] ||
    slots[slotNames.description],
  )
}

function showLabel(context: StepperItemContext) {
  return Boolean(context.item.label || slots.label || slots[getSlotNames(context).label])
}

function showDescription(context: StepperItemContext) {
  return Boolean(
    context.item.description || slots.description || slots[getSlotNames(context).description],
  )
}

function showContent(context: StepperItemContext) {
  return Boolean(context.item.content || slots.content || slots[getSlotNames(context).content])
}

function getKey(context: StepperItemContext) {
  return String(context.item.slot ?? context.item.step)
}

function getIconProps(context: StepperItemContext): IconConfig {
  return context.item.icon ?? { name: 'check' }
}

const stepContexts = computed(() => props.steps.map(getStepContext))
</script>

<template>
  <StepperRoot ref="stepper" v-bind="rootProps" v-model="value">
    <div v-bind="listProps">
      <StepperItem
        v-for="context in stepContexts"
        :key="getKey(context)"
        v-bind="getItemProps(context)"
      >
        <StepperTrigger v-bind="getTriggerProps(context)">
          <StepperIndicator v-bind="getIndicatorProps(context)">
            <slot :name="getSlotNames(context).indicator" v-bind="context">
              <slot name="indicator" v-bind="context">
                <Icon
                  v-if="context.item.icon || context.completed"
                  v-bind="getIconProps(context)"
                  data-slot="stepper-icon"
                  :data-test-stepper-icon="context.item.slot ?? context.item.step"
                />
                <span v-else>{{ context.item.step }}</span>
              </slot>
            </slot>
          </StepperIndicator>

          <div v-if="showWrapper(context)" v-bind="getWrapperProps(context)">
            <StepperTitle v-if="showLabel(context)" v-bind="getLabelProps(context)">
              <slot :name="getSlotNames(context).label" v-bind="context">
                <slot name="label" v-bind="context">
                  {{ context.item.label }}
                </slot>
              </slot>
            </StepperTitle>

            <StepperDescription
              v-if="showDescription(context)"
              v-bind="getDescriptionProps(context)"
            >
              <slot :name="getSlotNames(context).description" v-bind="context">
                <slot name="description" v-bind="context">
                  {{ context.item.description }}
                </slot>
              </slot>
            </StepperDescription>
          </div>
        </StepperTrigger>

        <template v-if="!context.last">
          <StepperSeparator v-bind="getSeparatorProps(context)" />
        </template>
      </StepperItem>
    </div>

    <template v-for="context in stepContexts" :key="`content-${getKey(context)}`">
      <div
        v-if="context.item.step === value && showContent(context)"
        v-bind="getContentProps(context)"
      >
        <slot :name="getSlotNames(context).content" v-bind="context">
          <slot name="content" v-bind="context">
            {{ context.item.content }}
          </slot>
        </slot>
      </div>
    </template>
  </StepperRoot>
</template>
