<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type {
  MeterGroupStatusContext,
  MeterGroupItemContext,
  MeterGroupProps,
  MeterGroupSlots,
} from '.'
import { meterGroupLeadingVariants, meterGroupMeterVariants, meterGroupVariants } from '.'
import { meterGroupDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<MeterGroupSlots>()

const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<MeterGroupProps>(), {
  ...meterGroupDefaults,
  items: () => [],
})

const max = computed(() => (props.max > 0 ? props.max : meterGroupDefaults.max))
const vertical = computed(() => props.orientation === 'vertical')
const hasStatus = computed(() => props.status || Boolean(slots.status))

const meters = computed(() =>
  props.items.map((item, index) => ({
    item,
    index,
    value: Math.max(0, item.value),
  })),
)

const total = computed(() => meters.value.reduce((sum, meter) => sum + meter.value, 0))
const value = computed(() => Math.min(max.value, total.value))
const percentage = computed(() => (value.value / max.value) * 100)
const scale = computed(() => (total.value > max.value ? max.value / total.value : 1))

const meterContexts = computed<MeterGroupItemContext[]>(() =>
  meters.value.map((meter) => ({
    item: meter.item,
    index: meter.index,
    percentage: Math.min(100, (meter.value / max.value) * 100),
  })),
)

const statusContext = computed<MeterGroupStatusContext>(() => ({
  total: value.value,
  percentage: percentage.value,
}))

const statusProps = computed(() => {
  const ui = useUi(props.ui?.status, statusContext.value)

  return {
    ...ui,
    class: cn('text-right font-medium tabular-nums', ui.class),
  }
})

function getItemProps(context: MeterGroupItemContext) {
  const ui = useUi(props.ui?.item, context)

  return {
    ...ui,
    class: cn('flex items-center justify-between gap-4', ui.class),
  }
}

function getLeadingProps(context: MeterGroupItemContext) {
  const ui = useUi(props.ui?.leading, context)

  return {
    ...ui,
    class: cn(meterGroupLeadingVariants({ size: props.size }), ui.class),
    style: [context.item.color ? { backgroundColor: context.item.color } : undefined, ui.style],
    'aria-hidden': true,
  }
}

function getIconProps(context: MeterGroupItemContext) {
  const icon = context.item.icon

  if (!icon) return {}

  return {
    ...icon,
    name: icon.name,
    color: context.item.color,
    class: icon.class,
    style: icon.style,
  }
}

function getLabelSlotProps(context: MeterGroupItemContext) {
  const ui = useUi(props.ui?.label, context)

  return {
    ...ui,
    class: cn('truncate', ui.class),
  }
}

function getTrailingProps(context: MeterGroupItemContext) {
  const ui = useUi(props.ui?.trailing, context)

  return {
    ...ui,
    class: cn('shrink-0 tabular-nums', ui.class),
  }
}

const listProps = computed(() => {
  const ui = useUi(props.ui?.list, undefined)

  return {
    ...ui,
    class: cn('grid gap-1 text-muted-foreground', vertical.value && 'gap-0', ui.class),
  }
})

const meterProps = computed(() => {
  const ui = useUi(props.ui?.meter, statusContext.value)

  return {
    ...ui,
    max: max.value,
    orientation: props.orientation,
    class: cn(
      meterGroupMeterVariants({ orientation: props.orientation, size: props.size }),
      vertical.value && 'self-center',
      ui.class,
    ),
    style: ui.style,
  }
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn(meterGroupVariants({ orientation: 'horizontal', size: props.size }), attrs.class),
  style: attrs.style,
}))

const groupProps = computed(() => ({
  class: meterGroupVariants({ orientation: props.orientation, size: props.size }),
}))
</script>

<template>
  <div v-bind="rootProps" data-test-meter-group-root>
    <div v-if="hasStatus" v-bind="statusProps" data-test-meter-group-status>
      <slot name="status" v-bind="statusContext">{{ Math.round(percentage) }}%</slot>
    </div>

    <div v-bind="groupProps">
      <ProgressRoot v-bind="meterProps" v-model="value" role="meter" data-test-meter-group-meter>
        <ProgressIndicator
          v-for="meter in meters"
          :key="meter.index"
          :class="
            cn(
              vertical
                ? 'w-full shrink-0 transition-[height] duration-300'
                : 'h-full shrink-0 transition-[width] duration-300',
              !meter.item.color && 'bg-primary',
            )
          "
          :style="{
            width: vertical ? '100%' : `${(meter.value / max) * 100 * scale}%`,
            height: vertical ? `${(meter.value / max) * 100 * scale}%` : '100%',
            ...(meter.item.color ? { backgroundColor: meter.item.color } : {}),
          }"
        />
      </ProgressRoot>

      <ul
        v-if="meters.some((meter) => meter.item.label)"
        v-bind="listProps"
        data-test-meter-group-list
      >
        <li
          v-for="meter in meterContexts"
          v-show="meter.item.label"
          :key="`label-${meter.index}`"
          v-bind="getItemProps(meter)"
          data-test-meter-group-item
        >
          <slot name="item" v-bind="meter">
            <span class="flex min-w-0 items-center gap-2">
              <slot name="item-leading" v-bind="meter">
                <Icon
                  v-if="meter.item.icon"
                  v-bind="getIconProps(meter)"
                  data-test-meter-group-icon
                />
                <span v-else data-test-meter-group-leading v-bind="getLeadingProps(meter)" />
              </slot>
              <slot name="item-label" v-bind="meter">
                <span data-test-meter-group-label v-bind="getLabelSlotProps(meter)">{{
                  meter.item.label
                }}</span>
              </slot>
            </span>
            <slot name="item-trailing" v-bind="meter">
              <span data-test-meter-group-trailing v-bind="getTrailingProps(meter)"
                >{{ Math.round(meter.percentage) }}%</span
              >
            </slot>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
