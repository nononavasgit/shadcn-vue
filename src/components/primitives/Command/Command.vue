<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { ListboxRootEmits, ListboxRootProps } from 'reka-ui'
import { ListboxRoot, useFilter, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { provideCommandContext } from '.'

const props = withDefaults(defineProps<ListboxRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: '',
  highlightOnHover: true,
  class: undefined,
})
const emits = defineEmits<ListboxRootEmits>()

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const allItems = ref<Map<string, string>>(new Map())
const allGroups = ref<Map<string, Set<string>>>(new Map())
const { contains } = useFilter({ sensitivity: 'base' })
const filterState = reactive({
  search: '',
  filtered: {
    count: 0,
    items: new Map<string, number>(),
    groups: new Set<string>(),
  },
})

function filterItems() {
  if (!filterState.search) {
    filterState.filtered.count = allItems.value.size
    return
  }

  filterState.filtered.groups = new Set()
  let itemCount = 0

  for (const [id, value] of allItems.value) {
    const score = contains(value, filterState.search)
    filterState.filtered.items.set(id, score ? 1 : 0)
    if (score) itemCount++
  }

  for (const [groupId, group] of allGroups.value) {
    for (const itemId of group) {
      if ((filterState.filtered.items.get(itemId) ?? 0) > 0) {
        filterState.filtered.groups.add(groupId)
        break
      }
    }
  }

  filterState.filtered.count = itemCount
}

watch(() => filterState.search, filterItems)

provideCommandContext({
  allItems,
  allGroups,
  filterState,
})
</script>

<template>
  <ListboxRoot
    v-bind="forwarded"
    data-slot="command"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        props.class,
      )
    "
  >
    <slot />
  </ListboxRoot>
</template>
