<script setup lang="ts">
import { RouterView } from 'vue-router'

const passed = {
  alert: true,
  alertDialog: true,
  avatar: true,
  announcer: true,
  aspectRatio: true,
  button: true,
  buttonGroup: true,
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
