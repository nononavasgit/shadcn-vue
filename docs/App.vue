<script setup lang="ts">
import { RouterView } from 'vue-router'

const passed = {
  accordion: true,
  alert: true,
  alertDialog: true,
  avatar: true,
  announcer: true,
  aspectRatio: true,
  button: true,
  buttonGroup: true,
  badge: true,
  card: true,
  empty: true,
  fieldSet: true,
  icon: true,
  separator: true,
  splitter: true,
  tooltip: true,
}
</script>

<template>
  <RouterView />
  <pre>{{passed}}</pre>
</template>
