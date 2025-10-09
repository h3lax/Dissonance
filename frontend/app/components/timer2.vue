<template>
    <div class="flex justify-end gap-5">
        <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2">
            <span class="countdown text-xl">
            <span style="--value:00;" aria-live="polite" aria-label="10">00</span>
            </span>
            hours
        </div>
        <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2">
            <span class="countdown text-xl">
            <span style="--value:Math.floor(remaining / 60);" aria-live="polite" aria-label="24">{{ Math.floor(remaining / 60) }}</span>
            </span>
            min
        </div>
        <div class="bg-warning rounded-box text-warning-content text-xs flex flex-col p-2">
            <span class="countdown text-xl">
            <span style="--value:remaining % 60 ;" aria-live="polite" aria-label="59">{{ remaining % 60 }}</span>
            </span>
            sec
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        remaining: number
    }>()
</script>