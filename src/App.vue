<script setup>
import { ref } from 'vue'
import { Toolbar } from '@/components/ui/Toolbar'

const xd = ref(true)
const items = ref([
  {
    key: '1',
    button: {
      label: 'xd',
      variant: 'plain',
    },
  },
  {
    key: '2',
    link: {
      label: 'adios',
      to: '/adios',
    },
  },
  {
    key: '3',
    separator: {
      orientation: 'vertical',
    },
  },
  {
    key: '4',
    toggle: {
      label: 'e',
      modelValue: xd.value,
      'update:modelValue': (e) => {
        console.log(e)
      },
    },
  },
  {
    key: '5',
    toggleGroup: {
      items: [
        {
          label: 'e',
        },
        {
          label: 'b',
        },
      ],
      ui: {
        root: {
          'aria-label': 'Grup',
        },
      },
    },
  },
])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-2xl space-y-8 p-6 md:p-10">
    {{ xd }}
    <Toolbar aria-label="hola" :items="items"></Toolbar>
  </main>
</template>
