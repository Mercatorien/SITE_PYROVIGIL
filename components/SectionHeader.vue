<template>
  <div v-reveal class="mb-12 sm:mb-14 max-w-2xl">
    <p class="eyebrow mb-3">— {{ eyebrow }}</p>
    <h2 class="h-section">{{ title }}</h2>
    <p v-if="intro" class="mt-5 text-brand-mid leading-relaxed">{{ intro }}</p>
  </div>
</template>

<script setup>
defineProps({ eyebrow: String, title: String, intro: String })
</script>
