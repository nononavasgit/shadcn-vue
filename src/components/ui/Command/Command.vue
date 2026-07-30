<script setup lang="ts">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'
import {
  Command as CommandBase,
  CommandGroup,
  CommandItem as CommandItemBase,
  CommandList,
  CommandSeparator,
} from '@/components/primitives/Command'
import { ListboxFilter } from '@/components/primitives/Listbox'
import { Icon } from '@/components/ui/Icon'
import { useFilter } from '@/composables'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type {
  CommandEmits,
  CommandGroup as CommandGroupData,
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
const search = ref('')
const attrs = useAttrs()
const slots = useSlots()
const { t } = useI18n()
const filter = useFilter({ sensitivity: 'base' })

function resolveUI<T, C>(value: CommandUIValue<T, C> | undefined, context: C): T | undefined {
  return typeof value === 'function' ? (value as (context: C) => T)(context) : value
}

function isCommandGroup(item: CommandItem | CommandGroupData): item is CommandGroupData {
  return 'items' in item && Array.isArray(item.items)
}

function handleSelect(item: CommandItem, group?: CommandGroupData) {
  emit('select', item, group)
}

watch(search, (value) => emit('search', value, filter))

const calculatedUI = computed(() => {
  let groupIndex = 0
  let headlessIndex = 0
  const sourceGroups = props.items.reduce<
    Array<{
      key: string
      data?: CommandGroupData
      groupIndex?: number
      items: CommandItem[]
    }>
  >((groups, entry) => {
    if (isCommandGroup(entry)) {
      groups.push({
        key: `group-${String(entry.id)}`,
        data: entry,
        groupIndex: groupIndex++,
        items: entry.items,
      })
      return groups
    }

    const previousGroup = groups.at(-1)
    if (previousGroup && !previousGroup.data) {
      previousGroup.items.push(entry)
    } else {
      groups.push({
        key: `items-${headlessIndex++}`,
        items: [entry],
      })
    }

    return groups
  }, [])

  const groupCount = groupIndex
  const renderedGroups = sourceGroups

  return {
    root: {
      ...attrs,
      defaultValue: props.defaultValue,
      multiple: props.multiple,
      disabled: props.disabled,
      dir: props.dir,
      orientation: props.orientation,
      highlightOnHover: props.highlightOnHover,
      selectionBehavior: props.selectionBehavior ?? (props.selectable ? 'toggle' : 'replace'),
      class: cn('rounded-lg border shadow-sm', attrs.class),
    },
    input: {
      ...props.ui?.input,
      placeholder: props.placeholder ?? t('commandPlaceholder'),
      class: cn(
        'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        props.ui?.input?.class,
      ),
    },
    list: {
      ...props.ui?.list,
      class: cn(props.ui?.list?.class),
    },
    footer: {
      ...props.ui?.footer,
      class: cn(props.ui?.footer?.class),
    },
    header: {
      ...props.ui?.header,
      class: cn(props.ui?.header?.class),
    },
    empty: {
      ...props.ui?.empty,
      class: cn('py-6 text-center text-sm', props.ui?.empty?.class),
    },
    emptyLabel: props.emptyLabel ?? t('noResults'),
    emptyState: Boolean(search.value) && !renderedGroups.some((group) => group.items.length > 0),
    groups: renderedGroups.map((group, sectionIndex, sections) => {
      const groupContext: CommandGroupContext | undefined = group.data
        ? {
            group: group.data,
            groupIndex: group.groupIndex!,
            first: group.groupIndex === 0,
            last: group.groupIndex === groupCount - 1,
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
          groupContext &&
          (group.data?.label || slots.heading || slots[`heading-${String(group.data?.id)}`]),
        ),
        showSeparator: Boolean(groupContext && sectionIndex < sections.length - 1),
        slotNames: {
          heading: `heading-${String(group.data?.id)}` as `heading-${string}`,
          separator: `separator-${String(group.data?.id)}` as `separator-${string}`,
        },
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
            selected:
              props.selectable &&
              (Array.isArray(model.value) ? model.value.includes(value) : model.value === value),
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
              item: `item-${itemKey}` as `item-${string}`,
              indicator: `indicator-${itemKey}` as `indicator-${string}`,
              icon: `icon-${itemKey}` as `icon-${string}`,
              label: `label-${itemKey}` as `label-${string}`,
            },
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
  }
})
</script>

<template>
  <CommandBase v-bind="calculatedUI.root" v-model="model">
    <div
      v-if="props.filter"
      data-slot="command-input-wrapper"
      class="flex h-9 items-center gap-2 border-b px-3"
    >
      <slot name="inputIcon" :search="search">
        <Icon name="search" class="size-4 shrink-0 opacity-50" />
      </slot>
      <ListboxFilter
        v-bind="calculatedUI.input"
        v-model="search"
        data-slot="command-input"
        auto-focus
      />
    </div>

    <div v-if="slots.header" v-bind="calculatedUI.header">
      <slot :name="'header'" :search="search" />
    </div>

    <CommandList v-bind="calculatedUI.list">
      <div v-if="calculatedUI.emptyState" v-bind="calculatedUI.empty" data-slot="command-empty">
        <slot name="empty">{{ calculatedUI.emptyLabel }}</slot>
      </div>

      <template v-for="group in calculatedUI.groups" :key="group.key">
        <CommandGroup
          v-bind="group.group"
          :heading="group.hasHeading ? group.data?.label : undefined"
        >
          <template v-if="group.hasHeading" #heading>
            <span v-bind="group.heading">
              <slot :name="group.slotNames?.heading" v-bind="group.context">
                <slot name="heading" v-bind="group?.context">
                  {{ group.data?.label }}
                </slot>
              </slot>
            </span>
          </template>

          <CommandItemBase
            v-for="item in group.items"
            :key="item.key"
            v-bind="item.item"
            @select="handleSelect(item.data, group.data)"
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
                  <span v-if="item.context.selected" v-bind="item.indicator" aria-hidden="true">
                    <slot name="indicator" v-bind="item.context">
                      <Icon name="check" class="size-4" />
                    </slot>
                  </span>
                </slot>
              </slot>
            </slot>
          </CommandItemBase>
        </CommandGroup>

        <template v-if="group.showSeparator">
          <CommandSeparator v-bind="group.separator" />
        </template>
      </template>
    </CommandList>

    <div v-if="slots.footer" v-bind="calculatedUI.footer">
      <slot :name="'footer'" :search="search" />
    </div>
  </CommandBase>
</template>
