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
import { computed, ref } from 'vue'
import { Icon } from '@/components/ui/Icon'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { AutocompleteProps } from '.'
import type { AutocompleteSlots } from '.'
import { autocompleteDefaults } from './defaults'

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

const props = withDefaults(defineProps<AutocompleteProps>(), autocompleteDefaults)
defineSlots<AutocompleteSlots>()
const value = defineModel<AutocompleteProps['value']>('value')

const rootProps = computed(() => {
  const ui = useUi(props.ui?.root, undefined)
  return { ...ui, disabled: props.disabled, class: cn('relative', ui.class), style: ui.style }
})

const anchorProps = computed(() => {
  const ui = useUi(props.ui?.anchor, undefined)
  return {
    ...ui,
    class: cn(
      'text-grass11 data-[placeholder]:text-grass9 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 inline-flex h-[35px] min-w-[160px] items-center justify-between gap-[5px] rounded-lg border bg-white px-[15px] text-xs leading-none shadow-sm outline-none hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black',
      ui.class,
    ),
    style: ui.style,
  }
})

const inputProps = computed(() => {
  const ui = useUi(props.ui?.input, undefined)
  return {
    ...ui,
    autofocus: props.autoFocus,
    placeholder: props.placeholder,
    disabled: props.disabled,
    class: cn(
      'text-grass11 selection:bg-grass5 h-full !bg-transparent placeholder-stone-400 outline-none',
      ui.class,
    ),
    style: ui.style,
  }
})

const triggerProps = computed(() => {
  const ui = useUi(props.ui?.trigger, undefined)
  return { ...ui, disabled: props.disabled, style: ui.style }
})

const contentProps = computed(() => {
  const ui = useUi(props.ui?.content, undefined)
  return {
    ...ui,
    class: cn(
      'absolute z-10 mt-1 w-full min-w-[160px] overflow-hidden rounded-lg border bg-white shadow-sm will-change-[opacity,transform]',
      ui.class,
    ),
    style: ui.style,
  }
})

const viewportProps = computed(() => {
  const ui = useUi(props.ui?.viewport, undefined)
  return { ...ui, class: cn('p-[5px]', ui.class), style: ui.style }
})

const emptyProps = computed(() => {
  const ui = useUi(props.ui?.empty, undefined)
  return {
    ...ui,
    class: cn('text-mauve8 py-2 text-center text-xs font-medium', ui.class),
    style: ui.style,
  }
})

const separatorProps = computed(() => {
  const ui = useUi(props.ui?.separator, undefined)
  return { ...ui, class: cn('bg-grass6 m-[5px] h-[1px]', ui.class), style: ui.style }
})

const itemProps = computed(() => {
  const ui = useUi(props.ui?.item, undefined)
  return {
    ...ui,
    class: cn(
      'text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-xs leading-none select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
      ui.class,
    ),
    style: ui.style,
  }
})

const groupProps = computed(() => {
  const ui = useUi(props.ui?.group, undefined)
  return { ...ui, style: ui.style }
})

const labelProps = computed(() => {
  const ui = useUi(props.ui?.label, undefined)
  return {
    ...ui,
    class: cn('text-mauve11 px-[25px] text-xs leading-[25px]', ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <AutocompleteRoot v-model="value" v-bind="rootProps" data-test-autocomplete-root>
    <AutocompleteAnchor v-bind="anchorProps" data-test-autocomplete-anchor>
      <slot name="leading">
        <Icon v-if="props.icon" v-bind="props.icon" data-test-autocomplete-icon />
      </slot>
      <AutocompleteInput v-bind="inputProps" data-test-autocomplete-input />
      <AutocompleteTrigger v-bind="triggerProps" data-test-autocomplete-trigger>
        <slot name="trailing">
          <Icon
            v-if="props.trailingIcon"
            v-bind="props.trailingIcon"
            data-test-autocomplete-trailing-icon
          />
          <Icon v-else name="chevronDown" />
        </slot>
      </AutocompleteTrigger>
    </AutocompleteAnchor>
    <AutocompleteContent v-bind="contentProps" data-test-autocomplete-content>
      <AutocompleteViewport v-bind="viewportProps" data-test-autocomplete-viewport>
        <AutocompleteEmpty v-bind="emptyProps" data-test-autocomplete-empty />
        <template v-for="(group, index) in options" :key="group.name">
          <AutocompleteGroup v-bind="groupProps" data-test-autocomplete-group>
            <AutocompleteSeparator
              v-if="index !== 0"
              v-bind="separatorProps"
              data-test-autocomplete-separator
            />
            <AutocompleteLabel v-bind="labelProps" data-test-autocomplete-label>{{
              group.name
            }}</AutocompleteLabel>
            <AutocompleteItem
              v-bind="itemProps"
              data-test-autocomplete-item
              v-for="option in group.children"
              :key="option.name"
              :value="option.name"
            >
              <span>{{ option.name }}</span>
            </AutocompleteItem>
          </AutocompleteGroup>
        </template>
      </AutocompleteViewport>
    </AutocompleteContent>
  </AutocompleteRoot>
</template>
