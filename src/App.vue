<script setup>
import { Icon, Button } from '@/components/ui'
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    <Icon
      name="warning"
      :ui="{
        root: (p) => {
          console.log(p)

          return {
            'aria-atomic': true,
          }
        },
      }"
    ></Icon>

    <Button label="adios" icon="info" color="#fff000" :trailing-icon="'chevronDown'">
      <template #trailing="slotProps"> {{ slotProps }} je</template>
    </Button>
  </main>
</template>
