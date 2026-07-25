<template>
  <section class="border-t border-brand-dark/10">
    <div class="container-x py-20 sm:py-28 text-center" v-reveal>
      <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-brand-dark">{{ title }}</h2>
      <p class="mt-5 text-lg text-brand-mid max-w-xl mx-auto">{{ text }}</p>
      <NuxtLink to="/contact" class="btn btn-primary mt-9">{{ cta }}</NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Parlons de votre projet' },
  text: { type: String, default: 'Une démonstration gratuite et sans engagement de 30 minutes suffit à en juger.' },
  cta: { type: String, default: 'Demander une démonstration' },
})
</script>
