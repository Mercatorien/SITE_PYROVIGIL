<template>
  <section class="section">
    <div class="container-x text-center py-24 sm:py-32">
      <p class="eyebrow mb-3">PyroVigil</p>
      <h1 class="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 text-lg text-brand-mid max-w-xl mx-auto">{{ subtitle }}</p>
      <p class="mt-6 inline-block px-4 py-1.5 rounded-full bg-brand-cream border border-brand-border text-sm font-mono text-brand-mid">
        Page en cours de préparation
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <NuxtLink to="/" class="btn btn-ghost">← Accueil</NuxtLink>
        <NuxtLink to="/contact" class="btn btn-primary">Nous contacter</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ title: String, subtitle: String })
useHead({ title: `${props.title} — PyroVigil` })
</script>
