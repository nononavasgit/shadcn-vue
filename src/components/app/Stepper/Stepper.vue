<script setup lang="ts">
import type { HTMLAttributes, SVGAttributes } from 'vue'
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
import type {
  StepperEmits,
  StepperEntry,
  StepperProps,
  StepperRootSlotProps,
  StepperSlotProps,
  StepperState,
  StepperSeparatorUI,
  StepperUI,
  StepperUIContext,
  StepperUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  [name: string]: ((props: StepperSlotProps) => unknown) | undefined
  default?(props: StepperSlotProps): unknown
  item?(props: StepperSlotProps): unknown
  header?(props: StepperSlotProps): unknown
  indicator?(props: StepperSlotProps): unknown
  icon?(props: StepperSlotProps): unknown
  title?(props: StepperSlotProps): unknown
  description?(props: StepperSlotProps): unknown
  separator?(props: StepperSlotProps): unknown
  content?(props: StepperSlotProps): unknown
}>()

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: 'horizontal',
})
defineEmits<StepperEmits>()

const attrs = useAttrs()
const slots = useSlots()
const modelValue = defineModel<number>()

type ItemUINode = Exclude<keyof StepperUI, 'list' | 'separator'>
type ItemUIAttributes = HTMLAttributes | SVGAttributes

const uiCalculado = computed(() => ({
  root: {
    ...attrs,
    class: cn('block w-full', attrs.class),
  },
  list: {
    ...props.ui?.list,
    class: cn(
      'flex w-full',
      props.orientation === 'vertical' ? 'flex-col gap-6' : 'items-start gap-2',
      props.ui?.list?.class,
    ),
  },
}))

function slotKey(stepper: StepperEntry) {
  return String(stepper.key ?? stepper.step)
}

function slotName(name: string, stepper: StepperEntry) {
  return `${name}-${slotKey(stepper)}`
}

function uiContext(stepper: StepperEntry): StepperUIContext {
  const index = props.steppers.indexOf(stepper)
  const currentStep = modelValue.value ?? props.defaultValue ?? props.steppers[0]?.step
  const state: StepperState = stepper.completed
    ? 'completed'
    : stepper.step === currentStep
      ? 'active'
      : currentStep !== undefined && stepper.step < currentStep
        ? 'completed'
        : 'inactive'

  return {
    stepper,
    index,
    state,
    active: state === 'active',
    first: index === 0,
    last: index === props.steppers.length - 1,
  }
}

function resolveUi<T>(value: StepperUIValue<T> | undefined, stepper: StepperEntry) {
  return typeof value === 'function'
    ? (value as (context: StepperUIContext) => T)(uiContext(stepper))
    : value
}

function itemUi(stepper: StepperEntry, node: ItemUINode, base?: string) {
  const ui = resolveUi(props.ui?.[node] as StepperUIValue<ItemUIAttributes> | undefined, stepper)

  return {
    ...ui,
    class: cn(base, ui?.class),
    style: ui?.style,
  }
}

function iconCalculado(stepper: StepperEntry) {
  const ui = itemUi(stepper, 'icon')
  const icon = typeof stepper.icon === 'string' ? { name: stepper.icon } : stepper.icon

  return {
    ...ui,
    ...icon,
    name: icon?.name ?? 'check',
    class: cn(ui.class, icon?.class),
    style: [ui.style, icon?.style],
  }
}

function separatorUi(stepper: StepperEntry): StepperSeparatorUI {
  const ui = resolveUi(props.ui?.separator, stepper)

  return {
    ...ui,
    class: cn(separatorClasses(), ui?.class),
    style: ui?.style,
  }
}

function itemClasses() {
  return props.orientation === 'vertical'
    ? 'relative flex w-full items-start gap-4'
    : 'relative flex w-full flex-col items-center justify-center'
}

function triggerClasses() {
  return props.orientation === 'vertical' ? 'z-10 flex-row items-start gap-3 p-0 text-left' : 'z-10'
}

function separatorClasses() {
  return props.orientation === 'vertical'
    ? 'absolute top-10 left-5 h-[calc(100%+1.5rem)] w-0.5 -translate-x-1/2 rounded-full'
    : 'absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] h-0.5 shrink-0 rounded-full'
}

function slotProps(
  stepper: StepperEntry,
  index: number,
  state: StepperState,
  rootState: StepperRootSlotProps,
): StepperSlotProps {
  return {
    ...rootState,
    stepper,
    index,
    state,
    active: state === 'active',
    first: index === 0,
    last: index === props.steppers.length - 1,
  }
}

function hasContent(stepper: StepperEntry) {
  return Boolean(
    stepper.content || slots.default || slots.content || slots[slotName('content', stepper)],
  )
}
</script>

<template>
  <StepperBase
    v-slot="rootState"
    v-bind="uiCalculado.root"
    v-model="modelValue"
    :as="props.as"
    :as-child="props.asChild"
    :default-value="props.defaultValue ?? props.steppers[0]?.step"
    :orientation="props.orientation"
    :dir="props.dir"
    :linear="props.linear"
  >
    <div v-bind="uiCalculado.list" data-slot="stepper-list">
      <StepperItem
        v-for="(stepper, index) in props.steppers"
        :key="stepper.key ?? stepper.step"
        v-slot="{ state }"
        v-bind="itemUi(stepper, 'item', itemClasses())"
        :step="stepper.step"
        :disabled="stepper.disabled"
        :completed="stepper.completed"
      >
        <slot
          :name="slotName('item', stepper)"
          v-bind="slotProps(stepper, index, state, rootState)"
        >
          <slot name="item" v-bind="slotProps(stepper, index, state, rootState)">
            <StepperTrigger v-bind="itemUi(stepper, 'trigger', triggerClasses())">
              <slot
                :name="slotName('header', stepper)"
                v-bind="slotProps(stepper, index, state, rootState)"
              >
                <slot name="header" v-bind="slotProps(stepper, index, state, rootState)">
                  <StepperIndicator v-bind="itemUi(stepper, 'indicator')">
                    <slot
                      :name="slotName('indicator', stepper)"
                      v-bind="slotProps(stepper, index, state, rootState)"
                    >
                      <slot name="indicator" v-bind="slotProps(stepper, index, state, rootState)">
                        <slot
                          :name="slotName('icon', stepper)"
                          v-bind="slotProps(stepper, index, state, rootState)"
                        >
                          <slot name="icon" v-bind="slotProps(stepper, index, state, rootState)">
                            <Icon v-if="stepper.icon" v-bind="iconCalculado(stepper)" />
                            <Icon
                              v-else-if="state === 'completed'"
                              v-bind="itemUi(stepper, 'icon')"
                              name="check"
                            />
                            <span v-else>{{ stepper.step }}</span>
                          </slot>
                        </slot>
                      </slot>
                    </slot>
                  </StepperIndicator>

                  <div
                    v-if="stepper.title || stepper.description || slots.title || slots.description"
                    v-bind="itemUi(stepper, 'header', 'flex min-w-0 flex-col')"
                  >
                    <StepperTitle
                      v-if="stepper.title || slots.title"
                      v-bind="itemUi(stepper, 'title')"
                    >
                      <slot
                        :name="slotName('title', stepper)"
                        v-bind="slotProps(stepper, index, state, rootState)"
                      >
                        <slot name="title" v-bind="slotProps(stepper, index, state, rootState)">
                          {{ stepper.title }}
                        </slot>
                      </slot>
                    </StepperTitle>

                    <StepperDescription
                      v-if="stepper.description || slots.description"
                      v-bind="itemUi(stepper, 'description')"
                    >
                      <slot
                        :name="slotName('description', stepper)"
                        v-bind="slotProps(stepper, index, state, rootState)"
                      >
                        <slot
                          name="description"
                          v-bind="slotProps(stepper, index, state, rootState)"
                        >
                          {{ stepper.description }}
                        </slot>
                      </slot>
                    </StepperDescription>
                  </div>
                </slot>
              </slot>
            </StepperTrigger>

            <template v-if="index < props.steppers.length - 1">
              <slot
                :name="slotName('separator', stepper)"
                v-bind="slotProps(stepper, index, state, rootState)"
              >
                <slot name="separator" v-bind="slotProps(stepper, index, state, rootState)">
                  <StepperSeparator v-bind="separatorUi(stepper)" />
                </slot>
              </slot>
            </template>
          </slot>
        </slot>
      </StepperItem>
    </div>

    <template
      v-for="(stepper, index) in props.steppers"
      :key="`content-${stepper.key ?? stepper.step}`"
    >
      <div
        v-if="stepper.step === rootState.modelValue && hasContent(stepper)"
        v-bind="itemUi(stepper, 'content', 'mt-6')"
        data-slot="stepper-content"
      >
        <slot
          :name="slotName('content', stepper)"
          v-bind="slotProps(stepper, index, 'active', rootState)"
        >
          <slot name="content" v-bind="slotProps(stepper, index, 'active', rootState)">
            <slot v-bind="slotProps(stepper, index, 'active', rootState)">
              {{ stepper.content }}
            </slot>
          </slot>
        </slot>
      </div>
    </template>
  </StepperBase>
</template>
