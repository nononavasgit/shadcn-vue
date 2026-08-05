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
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { normalizeStepperItemProps, resolveStepperUIValue } from '.'
import type { StepperUIContext, StepperState, StepperProps, StepperSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: 'horizontal',
  steps: () => [],
  ui: undefined,
})
defineSlots<StepperSlots>()

const attrs = useAttrs()
const slots = useSlots()
const model = defineModel<number>()
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
  stepper.value?.goToStep(step)
}

function nextStep() {
  stepper.value?.nextStep()
}

function prevStep() {
  stepper.value?.prevStep()
}

function hasNext() {
  return stepper.value?.hasNext() ?? false
}

function hasPrev() {
  return stepper.value?.hasPrev() ?? false
}

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const listUI = normalizeHTMLAttributes(props.ui?.list)
  const currentStep = model.value
  const isVertical = props.orientation === 'vertical'
  const triggerClass = cn(
    'z-10 border border-transparent outline-none focus-visible:ring-3',
    props.color
      ? 'focus-visible:border-(--stepper-color) focus-visible:ring-(--stepper-color)/50'
      : 'focus-visible:border-primary focus-visible:ring-primary/50',
    isVertical && 'flex-row items-start gap-3 p-0 text-left',
  )
  const indicatorClass =
    props.color &&
    'group-data-[state=active]:bg-(--stepper-color) group-data-[state=active]:text-(--stepper-color-foreground) group-data-[state=completed]:bg-(--stepper-color) group-data-[state=completed]:text-(--stepper-color-foreground)'
  const separatorClass = cn(
    isVertical
      ? 'absolute top-10 left-5 h-[calc(100%+1.5rem)] w-0.5 -translate-x-1/2 rounded-full'
      : 'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] h-0.5 shrink-0 rounded-full',
    props.color && 'group-data-[state=completed]:bg-(--stepper-color)',
  )

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      orientation: props.orientation,
      dir: props.dir,
      linear: props.linear,
      class: cn('block w-full', attrs.class, rootUI.class),
      style: [colorStyle.value, attrs.style, rootUI.style],
    },
    list: {
      ...listUI,
      class: cn('flex w-full', isVertical ? 'flex-col gap-6' : 'items-start gap-2', listUI.class),
      style: listUI.style,
    },
    steps: props.steps.map((step, index) => {
      const state: StepperState = step.completed
        ? 'completed'
        : step.step === currentStep
          ? 'active'
          : currentStep !== undefined && step.step < currentStep
            ? 'completed'
            : 'inactive'
      const context: StepperUIContext = {
        value: currentStep,
        totalSteps: props.steps.length,
        step,
        index,
        state,
        active: state === 'active',
        first: index === 0,
        last: index === props.steps.length - 1,
        isNextDisabled:
          index === props.steps.length - 1 || Boolean(props.steps[index + 1]?.disabled),
        isPrevDisabled: index === 0 || Boolean(props.steps[index - 1]?.disabled),
        isFirstStep: currentStep === props.steps[0]?.step,
        isLastStep: currentStep === props.steps.at(-1)?.step,
        goToStep,
        nextStep,
        prevStep,
        hasNext,
        hasPrev,
      }
      const itemUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.item, context))
      const triggerUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.trigger, context))
      const indicatorUI = normalizeHTMLAttributes(
        resolveStepperUIValue(props.ui?.indicator, context),
      )
      const headerUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.header, context))
      const iconUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.icon, context))
      const titleUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.title, context))
      const descriptionUI = normalizeHTMLAttributes(
        resolveStepperUIValue(props.ui?.description, context),
      )
      const separatorUI = normalizeHTMLAttributes(
        resolveStepperUIValue(props.ui?.separator, context),
      )
      const contentUI = normalizeHTMLAttributes(resolveStepperUIValue(props.ui?.content, context))
      const itemProps = normalizeStepperItemProps(step)
      const key = String(step.key ?? step.step)
      const slotNames = {
        item: `item-${key}`,
        header: `header-${key}`,
        indicator: `indicator-${key}`,
        icon: `icon-${key}`,
        title: `title-${key}`,
        description: `description-${key}`,
        separator: `separator-${key}`,
        content: `content-${key}`,
      } as const
      const icon = normalizeIconProps(step.icon)

      return {
        key,
        data: step,
        context,
        slotNames,
        item: {
          ...itemUI,
          ...itemProps,
          class: cn(
            'group flex items-center gap-2 data-[disabled]:pointer-events-none',
            isVertical
              ? 'relative flex w-full items-start gap-4'
              : 'relative flex w-full flex-col items-center justify-center',
            itemUI.class,
          ),
          style: itemUI?.style,
        },
        trigger: {
          ...triggerUI,
          class: cn(
            'flex flex-col items-center gap-1 rounded-md p-1 text-center',
            triggerClass,
            triggerUI.class,
          ),
          style: triggerUI?.style,
        },
        indicator: {
          ...indicatorUI,
          class: cn(
            'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground group-data-[disabled]:opacity-50',
            indicatorClass,
            indicatorUI.class,
          ),
          style: indicatorUI?.style,
        },
        header: {
          ...headerUI,
          class: cn('flex min-w-0 flex-col', headerUI.class),
          style: headerUI?.style,
        },
        icon: {
          ...iconUI,
          ...icon,
          name: icon?.name ?? 'check',
          class: cn(iconUI.class),
          style: iconUI.style,
        },
        title: {
          ...titleUI,
          class: cn('text-base font-semibold whitespace-nowrap', titleUI.class),
          style: titleUI?.style,
        },
        description: {
          ...descriptionUI,
          class: cn('text-sm text-muted-foreground', descriptionUI.class),
          style: descriptionUI?.style,
        },
        separator: {
          ...separatorUI,
          class: cn(
            'bg-muted transition-colors group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50 group-data-[state=completed]:bg-primary',
            separatorClass,
            separatorUI.class,
          ),
          style: separatorUI?.style,
        },
        content: {
          ...contentUI,
          class: cn('mt-6', contentUI.class),
          style: contentUI?.style,
        },
        showHeader: Boolean(
          step.label ||
          step.description ||
          slots.header ||
          slots.title ||
          slots.description ||
          slots[slotNames.header] ||
          slots[slotNames.title] ||
          slots[slotNames.description],
        ),
        showTitle: Boolean(step.label || slots.title || slots[slotNames.title]),
        showDescription: Boolean(
          step.description || slots.description || slots[slotNames.description],
        ),
        showContent: Boolean(
          step.content || slots.default || slots.content || slots[slotNames.content],
        ),
      }
    }),
  }
})
</script>

<template>
  <StepperRoot
    ref="stepper"
    v-slot="rootState"
    v-bind="calculatedUI.root"
    v-model="model"
    data-slot="stepper"
  >
    <div v-bind="calculatedUI.list" data-slot="stepper-list">
      <StepperItem
        v-for="item in calculatedUI.steps"
        :key="item.key"
        v-bind="item.item"
        data-slot="stepper-item"
      >
        <slot :name="item.slotNames.item" v-bind="item.context">
          <slot name="item" v-bind="item.context">
            <StepperTrigger v-bind="item.trigger" data-slot="stepper-trigger">
              <slot :name="item.slotNames.header" v-bind="item.context">
                <slot name="header" v-bind="item.context">
                  <StepperIndicator v-bind="item.indicator" data-slot="stepper-indicator">
                    <slot :name="item.slotNames.indicator" v-bind="item.context">
                      <slot name="indicator" v-bind="item.context">
                        <slot :name="item.slotNames.icon" v-bind="item.context">
                          <slot name="icon" v-bind="item.context">
                            <Icon
                              v-if="item.data.icon || item.context.state === 'completed'"
                              v-bind="item.icon"
                            />
                            <span v-else>{{ item.data.step }}</span>
                          </slot>
                        </slot>
                      </slot>
                    </slot>
                  </StepperIndicator>

                  <div v-if="item.showHeader" v-bind="item.header">
                    <StepperTitle
                      v-if="item.showTitle"
                      v-bind="item.title"
                      data-slot="stepper-title"
                    >
                      <slot :name="item.slotNames.title" v-bind="item.context">
                        <slot name="title" v-bind="item.context">
                          {{ item.data.label }}
                        </slot>
                      </slot>
                    </StepperTitle>

                    <StepperDescription
                      v-if="item.showDescription"
                      v-bind="item.description"
                      data-slot="stepper-description"
                    >
                      <slot :name="item.slotNames.description" v-bind="item.context">
                        <slot name="description" v-bind="item.context">
                          {{ item.data.description }}
                        </slot>
                      </slot>
                    </StepperDescription>
                  </div>
                </slot>
              </slot>
            </StepperTrigger>

            <template v-if="!item.context.last">
              <slot :name="item.slotNames.separator" v-bind="item.context">
                <slot name="separator" v-bind="item.context">
                  <StepperSeparator v-bind="item.separator" data-slot="stepper-separator" />
                </slot>
              </slot>
            </template>
          </slot>
        </slot>
      </StepperItem>
    </div>

    <template v-for="item in calculatedUI.steps" :key="`content-${item.key}`">
      <div
        v-if="item.data.step === rootState.modelValue && item.showContent"
        v-bind="item.content"
        data-slot="stepper-content"
      >
        <slot :name="item.slotNames.content" v-bind="item.context">
          <slot name="content" v-bind="item.context">
            <slot v-bind="item.context">
              {{ item.data.content }}
            </slot>
          </slot>
        </slot>
      </div>
    </template>
  </StepperRoot>
</template>
