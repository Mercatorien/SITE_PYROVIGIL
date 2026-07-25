<template>
  <section class="bg-brand-cream border-b border-brand-dark/10 overflow-hidden">
    <div class="container-x pt-16 pb-16 sm:pt-24 sm:pb-20 grid lg:grid-cols-12 gap-8 items-end">
      <div class="lg:col-span-8" v-reveal>
        <p class="eyebrow mb-5">{{ eyebrow }}</p>
        <h1 class="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight text-brand-dark">{{ title }}</h1>
        <p v-if="intro" class="mt-6 text-lg text-brand-mid max-w-2xl leading-relaxed">{{ intro }}</p>
      </div>
      <div v-if="idx" class="lg:col-span-4 hidden lg:flex justify-end">
        <span class="font-mono font-extrabold leading-none text-brand-orange/15" style="font-size:9rem">{{ idx }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ eyebrow: String, title: String, intro: String, idx: String })
useHead({ title: `${props.title} — PyroVigil` })
</script>
