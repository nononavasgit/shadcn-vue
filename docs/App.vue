<script setup lang="ts">
import { RouterView } from 'vue-router'

const passed = {
  accordion: true,
  alert: true,
  alertDialog: true,
  attachment: true,
  avatar: true,
  announcer: true,
  aspectRatio: true,
  button: true,
  buttonGroup: true,
  badge: true,
  breadcrumb: true,
  card: true,
  checkbox: true,
  chip: true,
  dialog: true,
  empty: true,
  fieldSet: true,
  icon: true,
  input: true,
  inputTime: true,
  label: true,
  loading: true,
  link: true,
  meterGruop: true,
  progress: true,
  popover: true,
  separator: true,
  splitter: true,
  switch: true,
  tooltip: true,
}

</script>

<template>
  <RouterView />
  <pre>{{ passed }}</pre>
</template>
