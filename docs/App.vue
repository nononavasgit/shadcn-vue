<script setup lang="ts">
import { RouterView } from 'vue-router'

const passed = {
  button: true,
  badge: true,
  card: true,
  icon: true,
  separator: true
}
</script>

<template>
  <RouterView />
  <pre>{{passed}}</pre>
</template>
