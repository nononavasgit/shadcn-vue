<script setup lang="ts">
import {
  AutocompleteAnchor,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteRoot,
  AutocompleteSeparator,
  AutocompleteTrigger,
  AutocompleteViewport,
} from 'reka-ui'
import { ref } from 'vue'
import { Icon } from '@/components/ui/Icon'

const v = ref('')

const options = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Honeydew' },
      { name: 'Grapes' },
      { name: 'Watermelon' },
      { name: 'Cantaloupe' },
      { name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { name: 'Cabbage' },
      { name: 'Broccoli' },
      { name: 'Carrots' },
      { name: 'Lettuce' },
      { name: 'Spinach' },
      { name: 'Bok Choy' },
      { name: 'Cauliflower' },
      { name: 'Potatoes' },
    ],
  },
]
</script>

<template>
  <AutocompleteRoot v-model="v" class="relative">
    <AutocompleteAnchor
      class="text-grass11 data-[placeholder]:text-grass9 inline-flex h-[35px] min-w-[160px] items-center justify-between gap-[5px] rounded-lg border bg-white px-[15px] text-xs leading-none shadow-sm outline-none hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
    >
      <AutocompleteInput
        class="text-grass11 selection:bg-grass5 h-full !bg-transparent placeholder-stone-400 outline-none"
        placeholder="Type or select an option..."
      />
      <AutocompleteTrigger
        ><Icon name="chevronDown" size="sm" class="text-grass11"
      /></AutocompleteTrigger>
    </AutocompleteAnchor>
    <AutocompleteContent
      class="absolute z-10 mt-1 w-full min-w-[160px] overflow-hidden rounded-lg border bg-white shadow-sm will-change-[opacity,transform]"
    >
      <AutocompleteViewport class="p-[5px]">
        <AutocompleteEmpty class="text-mauve8 py-2 text-center text-xs font-medium" />
        <template v-for="(group, index) in options" :key="group.name">
          <AutocompleteGroup>
            <AutocompleteSeparator v-if="index !== 0" class="bg-grass6 m-[5px] h-[1px]" />
            <AutocompleteLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">{{
              group.name
            }}</AutocompleteLabel>
            <AutocompleteItem
              v-for="option in group.children"
              :key="option.name"
              :value="option.name"
              class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-xs leading-none select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
            >
              <span>{{ option.name }}</span>
            </AutocompleteItem>
          </AutocompleteGroup>
        </template>
      </AutocompleteViewport>
    </AutocompleteContent>
  </AutocompleteRoot>
</template>
