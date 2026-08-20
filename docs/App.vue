<script setup lang="ts">
import { RouterView } from 'vue-router'

const passed = {
  alert: true,
  avatar: true,
  announcer: true,
  aspectRadio: true,
  button: true,
  badge: true,
  card: true,
  icon: true,
  separator: true,
  splitter: true,
}
</script>

<template>
  <RouterView />
  <pre>{{passed}}</pre>
</template>
