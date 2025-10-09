<template>
  <div class="flex justify-end gap-3">
    <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2 items-center">
      <span class="countdown text-lg">{{ hours }}</span>
      <span>h</span>
    </div>
    <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2 items-center">
      <span class="countdown text-lg">{{ minutes }}</span>
      <span>min</span>
    </div>
    <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2 items-center">
      <span class="countdown text-lg">{{ seconds }}</span>
      <span>sec</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ remaining: number }>()

const hours = computed(() => Math.floor(props.remaining / 3600))
const minutes = computed(() => Math.floor((props.remaining % 3600) / 60))
const seconds = computed(() => props.remaining % 60)
</script>
