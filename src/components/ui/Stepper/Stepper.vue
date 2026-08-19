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
import { Icon } from '@/components/ui/Icon'
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
import type {
  StepperContext,
  StepperEmits,
  StepperItemContext,
  StepperProps,
  StepperSlots,
  StepperState,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: 'horizontal',
  steps: () => [],
  ui: undefined,
})
defineSlots<StepperSlots>()
defineEmits<StepperEmits>()

const attrs = useAttrs()
const slots = useSlots()
const model = defineModel<number>()
const value = computed<number | undefined>({
  get: () => model.value ?? props.defaultValue ?? 1,
  set: (nextValue) => {
    model.value = nextValue
  },
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
  goToStep((value.value ?? 1) + 1)
}

function prevStep() {
  goToStep((value.value ?? 1) - 1)
}

function hasNext() {
  return stepper.value?.hasNext() ?? false
}

function hasPrev() {
  return stepper.value?.hasPrev() ?? false
}

const stepperContext = computed<StepperContext>(() => {
  const { ui, ...stepperProps } = props
  const currentIndex = props.steps.findIndex((item) => item.step === value.value)
  void ui

  return {
    props: stepperProps,
    value: value.value,
    totalSteps: props.steps.length,
    isNextDisabled:
      currentIndex < 0 ||
      currentIndex === props.steps.length - 1 ||
      Boolean(props.steps[currentIndex + 1]?.disabled),
    isPrevDisabled: currentIndex <= 0 || Boolean(props.steps[currentIndex - 1]?.disabled),
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === props.steps.length - 1,
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
    class: cn('block w-full', attrs.class, rootUI.class),
    style: [colorStyle.value, attrs.style, rootUI.style],
  }
})

const listProps = computed(() => {
  const listUI = useUi(props.ui?.list, stepperContext.value)

  return {
    ...listUI,
    class: cn(
      'flex w-full',
      isVertical.value ? 'flex-col gap-6' : 'items-start gap-2',
      listUI.class,
    ),
    style: listUI.style,
  }
})

const triggerClass = computed(() =>
  cn(
    'z-10 border border-transparent outline-none focus-visible:ring-3',
    props.color
      ? 'focus-visible:border-(--stepper-color) focus-visible:ring-(--stepper-color)/50'
      : 'focus-visible:border-primary focus-visible:ring-primary/50',
    isVertical.value && 'flex-row items-start gap-3 p-0 text-left',
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
      ? 'absolute top-10 left-5 h-[calc(100%+1.5rem)] w-0.5 -translate-x-1/2 rounded-full'
      : 'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] h-0.5 shrink-0 rounded-full',
    props.color && 'group-data-[state=completed]:bg-(--stepper-color)',
  ),
)

function getStepContext(
  step: NonNullable<StepperProps['steps']>[number],
  index: number,
): StepperItemContext {
  const currentStep = value.value
  const state: StepperState = step.completed
    ? 'completed'
    : step.step === currentStep
      ? 'active'
      : currentStep !== undefined && step.step < currentStep
        ? 'completed'
        : 'inactive'
  return {
    ...stepperContext.value,
    item: step,
    index,
    state,
    active: state === 'active',
    first: index === 0,
    last: index === props.steps.length - 1,
  }
}

function getSlotNames(context: StepperItemContext) {
  const key = String(context.item.key ?? context.item.step)
  return {
    item: `item-${key}`,
    header: `header-${key}`,
    indicator: `indicator-${key}`,
    icon: `icon-${key}`,
    label: `label-${key}`,
    description: `description-${key}`,
    separator: `separator-${key}`,
    content: `content-${key}`,
  } as const
}

function getItemProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.item, context)
  return {
    ...ui,
    ...normalizeStepperItemProps(context.item),
    class: cn(
      'group flex items-center gap-2 data-[disabled]:pointer-events-none',
      isVertical.value
        ? 'relative flex w-full items-start gap-4'
        : 'relative flex w-full flex-col items-center justify-center',
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
    class: cn(
      'flex flex-col items-center gap-1 rounded-md p-1 text-center',
      triggerClass.value,
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
    class: cn(
      'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground group-data-[disabled]:opacity-50',
      indicatorClass.value,
      ui.class,
    ),
    style: ui.style,
  }
}

function getHeaderProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.header, context)
  return { ...ui, class: cn('flex min-w-0 flex-col', ui.class), style: ui.style }
}

function getLabelProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.label, context)
  return {
    ...ui,
    ...normalizeStepperLabelProps(context.item.labelProps),
    class: cn('text-base font-semibold whitespace-nowrap', ui.class),
    style: ui.style,
  }
}

function getDescriptionProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.description, context)
  return {
    ...ui,
    ...normalizeStepperDescriptionProps(context.item.descriptionProps),
    class: cn('text-sm text-muted-foreground', ui.class),
    style: ui.style,
  }
}

function getSeparatorProps(context: StepperItemContext) {
  const ui = useUi(props.ui?.separator, context)
  return {
    ...ui,
    ...normalizeStepperSeparatorProps(context.item.separator),
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
  return { ...ui, class: cn('mt-6', ui.class), style: ui.style }
}

function showHeader(context: StepperItemContext) {
  const slotNames = getSlotNames(context)
  const step = context.item
  return Boolean(
    step.label ||
    step.description ||
    slots.header ||
    slots.label ||
    slots.description ||
    slots[slotNames.header] ||
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
  return Boolean(
    context.item.content || slots.default || slots.content || slots[getSlotNames(context).content],
  )
}

function getKey(context: StepperItemContext) {
  return String(context.item.key ?? context.item.step)
}

function getIconProps(context: StepperItemContext) {
  return context.item.icon
}

const stepContexts = computed(() => props.steps.map(getStepContext))
</script>

<template>
  <StepperRoot
    ref="stepper"
    v-slot="rootState"
    v-bind="rootProps"
    v-model="value"
    data-slot="stepper"
  >
    <div v-bind="listProps" data-slot="stepper-list">
      <StepperItem
        v-for="context in stepContexts"
        :key="getKey(context)"
        v-bind="getItemProps(context)"
        data-slot="stepper-item"
      >
        <slot :name="getSlotNames(context).item" v-bind="context">
          <slot name="item" v-bind="context">
            <StepperTrigger v-bind="getTriggerProps(context)" data-slot="stepper-trigger">
              <slot :name="getSlotNames(context).header" v-bind="context">
                <slot name="header" v-bind="context">
                  <StepperIndicator
                    v-bind="getIndicatorProps(context)"
                    data-slot="stepper-indicator"
                  >
                    <slot :name="getSlotNames(context).indicator" v-bind="context">
                      <slot name="indicator" v-bind="context">
                        <slot :name="getSlotNames(context).icon" v-bind="context">
                          <slot name="icon" v-bind="context">
                            <Icon
                              v-if="context.item.icon || context.state === 'completed'"
                              :name="'check'"
                              v-bind="getIconProps(context)"
                            />
                            <span v-else>{{ context.item.step }}</span>
                          </slot>
                        </slot>
                      </slot>
                    </slot>
                  </StepperIndicator>

                  <div v-if="showHeader(context)" v-bind="getHeaderProps(context)">
                    <StepperTitle
                      v-if="showLabel(context)"
                      v-bind="getLabelProps(context)"
                      data-slot="stepper-title"
                    >
                      <slot :name="getSlotNames(context).label" v-bind="context">
                        <slot name="label" v-bind="context">
                          {{ context.item.label }}
                        </slot>
                      </slot>
                    </StepperTitle>

                    <StepperDescription
                      v-if="showDescription(context)"
                      v-bind="getDescriptionProps(context)"
                      data-slot="stepper-description"
                    >
                      <slot :name="getSlotNames(context).description" v-bind="context">
                        <slot name="description" v-bind="context">
                          {{ context.item.description }}
                        </slot>
                      </slot>
                    </StepperDescription>
                  </div>
                </slot>
              </slot>
            </StepperTrigger>

            <template v-if="!context.last">
              <slot :name="getSlotNames(context).separator" v-bind="context">
                <slot name="separator" v-bind="context">
                  <StepperSeparator
                    v-bind="getSeparatorProps(context)"
                    data-slot="stepper-separator"
                  />
                </slot>
              </slot>
            </template>
          </slot>
        </slot>
      </StepperItem>
    </div>

    <template v-for="context in stepContexts" :key="`content-${getKey(context)}`">
      <div
        v-if="context.item.step === rootState.modelValue && showContent(context)"
        v-bind="getContentProps(context)"
        data-slot="stepper-content"
      >
        <slot :name="getSlotNames(context).content" v-bind="context">
          <slot name="content" v-bind="context">
            <slot v-bind="context">
              {{ context.item.content }}
            </slot>
          </slot>
        </slot>
      </div>
    </template>
  </StepperRoot>
</template>
