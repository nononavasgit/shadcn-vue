<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { ListboxItemEmits, ListboxItemProps } from 'reka-ui'
import { ListboxItem, useForwardPropsEmits, useId } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useCommand, useCommandGroup } from '.'

const props = defineProps<ListboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ListboxItemEmits>()
const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const id = useId()
const { filterState, allItems, allGroups } = useCommand()
const groupContext = useCommandGroup()
const isRender = computed(() => {
  if (!filterState.search) return true

  const filteredCurrentItem = filterState.filtered.items.get(id)
  return filteredCurrentItem === undefined || filteredCurrentItem > 0
})

onMounted(() => {
  const element = document.getElementById(id)
  if (!element) return

  allItems.value.set(id, element.textContent ?? props.value?.toString() ?? '')

  const groupId = groupContext?.id
  if (!groupId) return

  if (!allGroups.value.has(groupId)) allGroups.value.set(groupId, new Set())
  allGroups.value.get(groupId)?.add(id)
})
onUnmounted(() => {
  allItems.value.delete(id)
})
</script>

<template>
  <ListboxItem
    v-if="isRender"
    v-bind="forwarded"
    :id="id"
    data-slot="command-item"
    :class="
      cn(
        `relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground`,
        props.class,
      )
    "
    @select="filterState.search = ''"
  >
    <slot />
  </ListboxItem>
</template>
