<script setup lang="ts">
import { computed, mergeProps, useAttrs, useSlots } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/Button'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import type { LinkProps, LinkSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
  replace: false,
  ui: undefined,
})
defineSlots<LinkSlots>()

const attrs = useAttrs()
const slots = useSlots()
const slotNames = Object.keys(slots) as (keyof LinkSlots)[]

const isExternal = computed(
  () => typeof props.to === 'string' && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(props.to),
)
const externalHref = computed(() => (typeof props.to === 'string' ? props.to : undefined))
const calculatedUI = computed(() => {
  const buttonProps: Partial<LinkProps> = { ...props }
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
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
</script>

<template>
  <Button v-if="isExternal" v-bind="calculatedUI.root" :href="externalHref">
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </Button>

  <RouterLink v-else v-slot="{ href, navigate }" :to="props.to" :replace="props.replace" custom>
    <Button v-bind="calculatedUI.root" :href="href" @click="navigate">
      <template v-for="slotName in slotNames" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Button>
  </RouterLink>
</template>
