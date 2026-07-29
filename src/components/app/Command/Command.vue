<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import type { ListboxItemSelectEvent } from 'reka-ui'
import {
  Command as CommandBase,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem as CommandItemBase,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command'
import { Icon } from '@/components/app/Icon'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type {
  CommandEmits,
  CommandGroupContext,
  CommandItem,
  CommandItemContext,
  CommandProps,
  CommandSlots,
  CommandUIValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CommandProps>(), {
  items: () => [],
  groups: () => [],
  placeholder: undefined,
  emptyLabel: undefined,
  filter: true,
  selectable: false,
  multiple: false,
  disabled: false,
  orientation: 'vertical',
  highlightOnHover: true,
  selectionBehavior: undefined,
  ui: undefined,
})
const emit = defineEmits<CommandEmits>()
defineSlots<CommandSlots>()

const model = defineModel<string | string[]>()
const attrs = useAttrs()
const slots = useSlots()
const { t } = useI18n()

function resolveUI<T, C>(value: CommandUIValue<T, C> | undefined, context: C): T | undefined {
  return typeof value === 'function' ? (value as (context: C) => T)(context) : value
}

function handleSelect(
  item: CommandItem,
  group: CommandGroupContext['group'] | undefined,
  event: ListboxItemSelectEvent<string>,
) {
  emit('select', item, group, event)
}

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    defaultValue: props.defaultValue,
    multiple: props.multiple,
    disabled: props.disabled,
    dir: props.dir,
    orientation: props.orientation,
    highlightOnHover: props.highlightOnHover,
    selectionBehavior: props.selectionBehavior ?? (props.multiple ? 'toggle' : 'replace'),
    class: cn('rounded-lg border shadow-sm', attrs.class),
  },
  input: {
    ...props.ui?.input,
    placeholder: props.placeholder ?? t('commandPlaceholder'),
    class: cn(props.ui?.input?.class),
  },
  list: {
    ...props.ui?.list,
    class: cn(props.ui?.list?.class),
  },
  empty: {
    ...props.ui?.empty,
    class: cn(props.ui?.empty?.class),
  },
  emptyLabel: props.emptyLabel ?? t('noResults'),
  groups: [
    ...(props.items.length
      ? [{ key: '__command-items', data: undefined, groupIndex: undefined, items: props.items }]
      : []),
    ...props.groups.map((group, groupIndex) => ({
      key: String(group.id),
      data: group,
      groupIndex,
      items: group.items,
    })),
  ].map((group, sectionIndex, sections) => {
    const groupContext: CommandGroupContext | undefined = group.data
      ? {
          group: group.data,
          groupIndex: group.groupIndex!,
          first: group.groupIndex === 0,
          last: group.groupIndex === props.groups.length - 1,
        }
      : undefined
    const groupUI = groupContext ? resolveUI(props.ui?.group, groupContext) : undefined
    const headingUI = groupContext ? resolveUI(props.ui?.heading, groupContext) : undefined
    const separatorUI = groupContext ? resolveUI(props.ui?.separator, groupContext) : undefined
    const groupKey = group.key

    return {
      key: groupKey,
      data: group.data,
      context: groupContext,
      hasHeading: Boolean(
        groupContext && (group.data?.label || slots.heading || slots[`heading-${groupKey}`]),
      ),
      slotNames: {
        heading: `heading-${groupKey}`,
        separator: `separator-${groupKey}`,
      } as const,
      group: {
        ...groupUI,
        class: cn(groupUI?.class),
      },
      heading: {
        ...headingUI,
        class: cn(headingUI?.class),
      },
      separator: {
        ...separatorUI,
        class: cn(separatorUI?.class),
      },
      items: group.items.map((item, itemIndex) => {
        const value = item.value ?? String(item.id)
        const context: CommandItemContext = {
          item,
          itemIndex,
          value,
          selected: Array.isArray(model.value)
            ? model.value.includes(value)
            : model.value === value,
          firstItem: itemIndex === 0,
          lastItem: itemIndex === group.items.length - 1,
          group: group.data,
          groupIndex: group.groupIndex,
          first: sectionIndex === 0,
          last: sectionIndex === sections.length - 1,
        }
        const itemUI = resolveUI(props.ui?.item, context)
        const indicatorUI = resolveUI(props.ui?.indicator, context)
        const iconUI = resolveUI(props.ui?.icon, context)
        const labelUI = resolveUI(props.ui?.label, context)
        const itemKey = String(item.id)
        const icon = typeof item.icon === 'string' ? { name: item.icon } : item.icon

        return {
          key: itemKey,
          data: item,
          context,
          slotNames: {
            item: `item-${itemKey}`,
            indicator: `indicator-${itemKey}`,
            icon: `icon-${itemKey}`,
            label: `label-${itemKey}`,
          } as const,
          item: {
            ...itemUI,
            value,
            disabled: item.disabled,
            class: cn(itemUI?.class),
          },
          indicator: {
            ...indicatorUI,
            class: cn(
              'ml-auto flex size-4 shrink-0 items-center justify-center',
              indicatorUI?.class,
            ),
          },
          icon: {
            ...iconUI,
            ...icon,
            class: cn(iconUI?.class, icon?.class),
          },
          label: {
            ...labelUI,
            class: cn(labelUI?.class),
          },
        }
      }),
    }
  }),
}))
</script>

<template>
  <CommandBase v-bind="calculatedUI.root" v-model="model">
    <CommandInput v-if="props.filter" v-bind="calculatedUI.input" />

    <CommandList v-bind="calculatedUI.list">
      <CommandEmpty v-bind="calculatedUI.empty">
        <slot name="empty">{{ calculatedUI.emptyLabel }}</slot>
      </CommandEmpty>

      <template v-for="group in calculatedUI.groups" :key="group.key">
        <CommandGroup v-bind="group.group" :heading="group.data?.label">
          <template v-if="group.hasHeading" #heading>
            <slot :name="group.slotNames.heading" v-bind="group.context">
              <slot name="heading" v-bind="group.context">
                <span v-bind="group.heading">{{ group.data.label }}</span>
              </slot>
            </slot>
          </template>

          <CommandItemBase
            v-for="item in group.items"
            :key="item.key"
            v-bind="item.item"
            @select="handleSelect(item.data, group.data, $event)"
          >
            <slot :name="item.slotNames.item" v-bind="item.context">
              <slot name="item" v-bind="item.context">
                <slot :name="item.slotNames.icon" v-bind="item.context">
                  <slot name="icon" v-bind="item.context">
                    <Icon v-if="item.icon.name" v-bind="item.icon" :name="item.icon.name" />
                  </slot>
                </slot>

                <slot :name="item.slotNames.label" v-bind="item.context">
                  <slot name="label" v-bind="item.context">
                    <span v-bind="item.label">{{ item.data.label }}</span>
                  </slot>
                </slot>

                <slot
                  v-if="props.selectable"
                  :name="item.slotNames.indicator"
                  v-bind="item.context"
                >
                  <slot name="indicator" v-bind="item.context">
                    <span v-if="item.context.selected" v-bind="item.indicator" aria-hidden="true">
                      <Icon name="check" class="size-4" />
                    </span>
                  </slot>
                </slot>
              </slot>
            </slot>
          </CommandItemBase>
        </CommandGroup>

        <template v-if="group.context && !group.context.last">
          <slot :name="group.slotNames.separator" v-bind="group.context">
            <slot name="separator" v-bind="group.context">
              <CommandSeparator v-bind="group.separator" />
            </slot>
          </slot>
        </template>
      </template>
    </CommandList>
  </CommandBase>
</template>
