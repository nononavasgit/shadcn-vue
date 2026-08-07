<script setup lang="ts">
import { computed, mergeProps, useAttrs, useSlots } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/Button'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import type { LinkContext, LinkEmits, LinkProps, LinkSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
  replace: false,
  ui: undefined,
})
const emit = defineEmits<LinkEmits>()
defineSlots<LinkSlots>()

const attrs = useAttrs()
const slots = useSlots()
const slotNames = Object.keys(slots) as (keyof LinkSlots)[]

const linkContext = computed<LinkContext>(() => {
  const { ui, ...linkProps } = props
  void ui

  return {
    props: linkProps,
  }
})

const isExternal = computed(
  () => typeof props.to === 'string' && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(props.to),
)
const externalHref = computed(() => (typeof props.to === 'string' ? props.to : undefined))
const calculatedUI = computed(() => {
  const buttonProps: Partial<LinkProps> = { ...props }
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, linkContext.value))
  delete buttonProps.to
  delete buttonProps.replace

  buttonProps.ui = {
    ...props.ui,
    root: rootUI,
  }

  return {
    root: mergeProps(attrs, buttonProps, { as: 'a' }),
  }
})

type Navigate = (event?: MouseEvent) => void | Promise<void>

function handleClick(event: PointerEvent, navigate?: Navigate) {
  emit('click', event)
  void navigate?.(event)
}
</script>

<template>
  <Button
    v-if="isExternal"
    v-bind="calculatedUI.root"
    :href="externalHref"
    @click="emit('click', $event)"
  >
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" v-bind="linkContext" />
    </template>
  </Button>

  <RouterLink v-else v-slot="{ href, navigate }" :to="props.to" :replace="props.replace" custom>
    <Button v-bind="calculatedUI.root" :href="href" @click="handleClick($event, navigate)">
      <template v-for="slotName in slotNames" #[slotName]>
        <slot :name="slotName" v-bind="linkContext" />
      </template>
    </Button>
  </RouterLink>
</template>
