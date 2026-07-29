<script setup lang="ts">
import { computed, useAttrs, useSlots, mergeProps } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/app/Button'
import type { LinkProps, LinkSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'link',
  replace: false,
})
defineSlots<LinkSlots>()

const attrs = useAttrs()
const slots = useSlots()
const slotNames = Object.keys(slots) as (keyof LinkSlots)[]

const isExternal = computed(
  () => typeof props.to === 'string' && /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(props.to),
)
const externalHref = computed(() => (typeof props.to === 'string' ? props.to : undefined))
const calculatedProps = computed(() => {
  const buttonProps: Partial<LinkProps> = { ...props }
  delete buttonProps.to
  delete buttonProps.replace

  return mergeProps(attrs, buttonProps, { as: 'a' })
})
</script>

<template>
  <Button v-if="isExternal" v-bind="calculatedProps" :href="externalHref">
    <template v-for="slotName in slotNames" #[slotName]>
      <slot :name="slotName" />
    </template>
  </Button>

  <RouterLink v-else v-slot="{ href, navigate }" :to="props.to" :replace="props.replace" custom>
    <Button v-bind="calculatedProps" :href="href" @click="navigate">
      <template v-for="slotName in slotNames" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Button>
  </RouterLink>
</template>
