<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import {
  Stepper as StepperBase,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/Stepper'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type {
  StepperUIContext,
  StepperState,
  StepperProps,
  StepperSlotProps,
  StepperSlots,
  StepperUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: 'horizontal',
  steps: () => [],
})
defineSlots<StepperSlots>()

const attrs = useAttrs()
const slots = useSlots()
const model = defineModel<number>()
const { colorStyle } = useColor(
  computed(() => props.color),
  'stepper',
)

interface StepperRootState {
  modelValue: number | undefined
  totalSteps: number
  isNextDisabled: boolean
  isPrevDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  hasNext: () => boolean
  hasPrev: () => boolean
}

const calculatedUI = computed(() => {
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
      as: props.as,
      asChild: props.asChild,
      orientation: props.orientation,
      dir: props.dir,
      linear: props.linear,
      class: cn('block w-full', attrs.class),
      style: [colorStyle.value, attrs.style],
    },
    list: {
      ...props.ui?.list,
      class: cn(
        'flex w-full',
        isVertical ? 'flex-col gap-6' : 'items-start gap-2',
        props.ui?.list?.class,
      ),
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
        step,
        index,
        state,
        active: state === 'active',
        first: index === 0,
        last: index === props.steps.length - 1,
      }
      const resolveUI = <T,>(value: StepperUIValue<T> | undefined): T | undefined =>
        typeof value === 'function' ? (value as (context: StepperUIContext) => T)(context) : value
      const itemUI = resolveUI(props.ui?.item)
      const triggerUI = resolveUI(props.ui?.trigger)
      const indicatorUI = resolveUI(props.ui?.indicator)
      const headerUI = resolveUI(props.ui?.header)
      const iconUI = resolveUI(props.ui?.icon)
      const titleUI = resolveUI(props.ui?.title)
      const descriptionUI = resolveUI(props.ui?.description)
      const separatorUI = resolveUI(props.ui?.separator)
      const contentUI = resolveUI(props.ui?.content)
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
      const icon = typeof step.icon === 'string' ? { name: step.icon } : step.icon

      return {
        key,
        data: step,
        context,
        slotNames,
        item: {
          ...itemUI,
          step: step.step,
          disabled: step.disabled,
          completed: step.completed,
          class: cn(
            isVertical
              ? 'relative flex w-full items-start gap-4'
              : 'relative flex w-full flex-col items-center justify-center',
            itemUI?.class,
          ),
          style: itemUI?.style,
        },
        trigger: {
          ...triggerUI,
          class: cn(triggerClass, triggerUI?.class),
          style: triggerUI?.style,
        },
        indicator: {
          ...indicatorUI,
          class: cn(indicatorClass, indicatorUI?.class),
          style: indicatorUI?.style,
        },
        header: {
          ...headerUI,
          class: cn('flex min-w-0 flex-col', headerUI?.class),
          style: headerUI?.style,
        },
        icon: {
          ...iconUI,
          ...icon,
          name: icon?.name ?? 'check',
          class: cn(iconUI?.class, icon?.class),
          style: [iconUI?.style, icon?.style],
        },
        title: {
          ...titleUI,
          class: cn(titleUI?.class),
          style: titleUI?.style,
        },
        description: {
          ...descriptionUI,
          class: cn(descriptionUI?.class),
          style: descriptionUI?.style,
        },
        separator: {
          ...separatorUI,
          class: cn(separatorClass, separatorUI?.class),
          style: separatorUI?.style,
        },
        content: {
          ...contentUI,
          class: cn('mt-6', contentUI?.class),
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
        getSlotProps: (root: StepperRootState): StepperSlotProps => ({
          value: root.modelValue,
          totalSteps: root.totalSteps,
          isNextDisabled: root.isNextDisabled,
          isPrevDisabled: root.isPrevDisabled,
          isFirstStep: root.isFirstStep,
          isLastStep: root.isLastStep,
          goToStep: root.goToStep,
          nextStep: root.nextStep,
          prevStep: root.prevStep,
          hasNext: root.hasNext,
          hasPrev: root.hasPrev,
          ...context,
        }),
      }
    }),
  }
})
</script>

<template>
  <StepperBase v-slot="rootState" v-bind="calculatedUI.root" v-model="model">
    <div v-bind="calculatedUI.list" data-slot="stepper-list">
      <StepperItem v-for="item in calculatedUI.steps" :key="item.key" v-bind="item.item">
        <slot :name="item.slotNames.item" v-bind="item.getSlotProps(rootState)">
          <slot name="item" v-bind="item.getSlotProps(rootState)">
            <StepperTrigger v-bind="item.trigger">
              <slot :name="item.slotNames.header" v-bind="item.getSlotProps(rootState)">
                <slot name="header" v-bind="item.getSlotProps(rootState)">
                  <StepperIndicator v-bind="item.indicator">
                    <slot :name="item.slotNames.indicator" v-bind="item.getSlotProps(rootState)">
                      <slot name="indicator" v-bind="item.getSlotProps(rootState)">
                        <slot :name="item.slotNames.icon" v-bind="item.getSlotProps(rootState)">
                          <slot name="icon" v-bind="item.getSlotProps(rootState)">
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
                    <StepperTitle v-if="item.showTitle" v-bind="item.title">
                      <slot :name="item.slotNames.title" v-bind="item.getSlotProps(rootState)">
                        <slot name="title" v-bind="item.getSlotProps(rootState)">
                          {{ item.data.label }}
                        </slot>
                      </slot>
                    </StepperTitle>

                    <StepperDescription v-if="item.showDescription" v-bind="item.description">
                      <slot
                        :name="item.slotNames.description"
                        v-bind="item.getSlotProps(rootState)"
                      >
                        <slot name="description" v-bind="item.getSlotProps(rootState)">
                          {{ item.data.description }}
                        </slot>
                      </slot>
                    </StepperDescription>
                  </div>
                </slot>
              </slot>
            </StepperTrigger>

            <template v-if="!item.context.last">
              <slot :name="item.slotNames.separator" v-bind="item.getSlotProps(rootState)">
                <slot name="separator" v-bind="item.getSlotProps(rootState)">
                  <StepperSeparator v-bind="item.separator" />
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
        <slot :name="item.slotNames.content" v-bind="item.getSlotProps(rootState)">
          <slot name="content" v-bind="item.getSlotProps(rootState)">
            <slot v-bind="item.getSlotProps(rootState)">
              {{ item.data.content }}
            </slot>
          </slot>
        </slot>
      </div>
    </template>
  </StepperBase>
</template>
