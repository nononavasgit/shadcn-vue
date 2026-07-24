<script setup lang="ts">

import { Separator } from '@/components/app/Separator'

</script>

<template>
  <div class="w-full max-w-[300px] mx-[15px]">
    <div class="text-stone-700 dark:text-white text-sm leading-5 font-semibold">
      Reka UI
    </div>
    <div class="text-stone-700 dark:text-white text-sm leading-5">
      An open-source UI component library.
    </div>
    <Separator class="my-1" />
    <div class="flex h-5 gap-1 items-center">
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Blog
      </div>
      <Separator decorative orientation="vertical" />
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Docs
      </div>
      <Separator decorative orientation="vertical" />
      <div class="text-stone-700 dark:text-white text-sm leading-5">
        Source
      </div>
    </div>
  </div>
</template>
