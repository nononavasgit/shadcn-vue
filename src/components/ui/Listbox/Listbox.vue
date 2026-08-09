<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxRoot } from 'reka-ui'
import { Input, normalizeInputProps } from '@/components/ui/Input'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import ListboxOption from './ListboxOption.vue'
import type {
  ListboxContext,
  ListboxGroupContext,
  ListboxItemContext,
  ListboxProps,
  ListboxSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ListboxProps>(), {
  orientation: 'vertical',
  selectionBehavior: 'toggle',
  highlightOnHover: true,
  filter: false,
  ignoreFilter: false,
  items: () => [],
  groups: () => [],
  ui: undefined,
})
defineSlots<ListboxSlots>()
const emit = defineEmits<{
  valueChange: [value: ListboxProps['value']]
  searchChange: [value: string]
}>()

const attrs = useAttrs()
const { t } = useI18n()
const value = defineModel<ListboxProps['value']>('value')
const search = defineModel<string>('search', { default: '' })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

watch(search, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('searchChange', nextValue)
})

const listboxContext = computed<ListboxContext>(() => {
  const { ui, ...listboxProps } = props
  void ui

  return { props: listboxProps, value: value.value, search: search.value }
})

const rootProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.root, listboxContext.value))

  return {
    ...ui,
    as: props.as,
    asChild: props.asChild,
    by: props.by,
    dir: props.dir,
    disabled: props.disabled,
    highlightOnHover: props.highlightOnHover,
    multiple: props.multiple,
    name: props.name,
    orientation: props.orientation,
    required: props.required,
    selectionBehavior: props.selectionBehavior,
    class: cn(
      'min-w-40 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-[color,box-shadow] focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50',
      (attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true') &&
        'border-destructive ring-3 ring-destructive/20 focus-within:border-destructive focus-within:ring-destructive/20 dark:ring-destructive/40 dark:focus-within:ring-destructive/40',
      attrs.class,
      ui.class,
    ),
    style: [attrs.style, ui.style],
  }
})

const contentProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.content, listboxContext.value))

  return {
    ...attrs,
    ...ui,
    class: cn('outline-none', ui.class),
    style: ui.style,
  }
})

const filterProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.filter, listboxContext.value))
  
  return {
    ...ui,
    ...normalizeInputProps(props.filterInput),
    disabled: props.disabled || props.filterInput?.disabled,
    class: cn(
      'mb-1 focus-visible:border-input focus-visible:ring-0',
      props.filterInput?.class,
      ui.class,
    ),
    style: [props.filterInput?.style, ui.style],
  }
})

const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase())

function filterItems(items: ListboxItemContext['item'][]) {
  if (!props.filter || props.ignoreFilter || !normalizedSearch.value) return items

  return items.filter((item) => item.label.toLocaleLowerCase().includes(normalizedSearch.value))
}

const itemContexts = computed<ListboxItemContext[]>(() =>
  filterItems(props.items).map((item, index) => ({
    ...listboxContext.value,
    item,
    index,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  })),
)

const groupContexts = computed<ListboxGroupContext[]>(() =>
  props.groups
    .map((group) => ({ ...group, items: filterItems(group.items) }))
    .filter((group) => group.items.length)
    .map((group, index) => ({
      ...listboxContext.value,
      group,
      index,
    })),
)

const usesGroups = computed(() => props.groups.length > 0)
const hasRecords = computed(() =>
  usesGroups.value ? props.groups.some((group) => group.items.length > 0) : props.items.length > 0,
)
const hasVisibleRecords = computed(() =>
  usesGroups.value ? groupContexts.value.length > 0 : itemContexts.value.length > 0,
)
const showEmpty = computed(() => !hasRecords.value)
const showNoResults = computed(
  () =>
    props.filter && Boolean(normalizedSearch.value) && hasRecords.value && !hasVisibleRecords.value,
)

const emptyProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.empty, listboxContext.value))
  return {
    role: 'status',
    'aria-live': 'polite',
    ...ui,
    class: cn('px-2 py-6 text-center text-sm text-muted-foreground', ui.class),
    style: ui.style,
  }
})

const noResultsProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.noResults, listboxContext.value))
  return {
    role: 'status',
    'aria-live': 'polite',
    ...ui,
    class: cn('px-2 py-6 text-center text-sm text-muted-foreground', ui.class),
    style: ui.style,
  }
})

function getGroupItemContexts(context: ListboxGroupContext): ListboxItemContext[] {
  return context.group.items.map((item, index) => ({
    ...listboxContext.value,
    item,
    index,
    group: context.group,
    groupIndex: context.index,
    selected: Array.isArray(value.value)
      ? value.value.some((selectedValue) => Object.is(selectedValue, item.value))
      : Object.is(value.value, item.value),
  }))
}

function getGroupProps(context: ListboxGroupContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.group, context))
  return {
    ...ui,
    class: cn('py-1 first:pt-0 last:pb-0 [&:not(:first-child)]:border-t', ui.class),
    style: ui.style,
  }
}

function getGroupLabelProps(context: ListboxGroupContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.groupLabel, context))
  return {
    ...ui,
    class: cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', ui.class),
    style: ui.style,
  }
}

function getGroupSlotNames(context: ListboxGroupContext) {
  return {
    group: `group-${context.group.id}` as `group-${string}`,
    label: `group-label-${context.group.id}` as `group-label-${string}`,
  }
}
</script>

<template>
  <ListboxRoot v-model="value" v-bind="rootProps" data-slot="listbox">
    <Input
      v-if="props.filter"
      v-model:value="search"
      v-bind="filterProps"
      data-slot="listbox-filter"
    />

    <ListboxContent v-bind="contentProps" data-slot="listbox-content">
      <div v-if="showEmpty" v-bind="emptyProps" data-slot="listbox-empty">
        <slot name="empty" v-bind="listboxContext">
          {{ props.emptyText ?? t('empty') }}
        </slot>
      </div>

      <div v-else-if="showNoResults" v-bind="noResultsProps" data-slot="listbox-no-results">
        <slot name="no-results" v-bind="listboxContext">
          {{ props.noResultsText ?? t('noResults') }}
        </slot>
      </div>

      <slot v-else v-bind="listboxContext">
        <template v-if="usesGroups">
          <ListboxGroup
            v-for="groupContext in groupContexts"
            :key="groupContext.group.id"
            v-bind="getGroupProps(groupContext)"
            data-slot="listbox-group"
          >
            <slot :name="getGroupSlotNames(groupContext).group" v-bind="groupContext">
              <slot name="group" v-bind="groupContext">
                <ListboxGroupLabel
                  v-if="groupContext.group.label"
                  v-bind="getGroupLabelProps(groupContext)"
                  data-slot="listbox-group-label"
                >
                  <slot :name="getGroupSlotNames(groupContext).label" v-bind="groupContext">
                    <slot name="group-label" v-bind="groupContext">
                      {{ groupContext.group.label }}
                    </slot>
                  </slot>
                </ListboxGroupLabel>

                <ListboxOption
                  v-for="itemContext in getGroupItemContexts(groupContext)"
                  :key="itemContext.item.id ?? String(itemContext.item.value)"
                  :context="itemContext"
                  :ui="props.ui"
                >
                  <template v-for="(_, name) in $slots" #[name]="slotProps">
                    <slot :name="name" v-bind="slotProps" />
                  </template>
                </ListboxOption>
              </slot>
            </slot>
          </ListboxGroup>
        </template>

        <template v-else>
          <ListboxOption
            v-for="itemContext in itemContexts"
            :key="itemContext.item.id ?? String(itemContext.item.value)"
            :context="itemContext"
            :ui="props.ui"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </ListboxOption>
        </template>
      </slot>
    </ListboxContent>
  </ListboxRoot>
</template>
