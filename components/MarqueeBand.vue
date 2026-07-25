<template>
  <!-- Bandeau de mots-clés défilant lentement de droite à gauche -->
  <div class="marquee border-t border-brand-dark/10 overflow-hidden">
    <div class="marquee__track flex w-max items-center gap-x-8 py-4 font-mono text-[11px] uppercase tracking-wider text-brand-mid">
      <!-- Deux copies identiques → boucle sans couture -->
      <template v-for="copy in 2" :key="copy">
        <template v-for="(w, i) in items" :key="copy + '-' + i">
          <span class="whitespace-nowrap">{{ w }}</span>
          <span class="text-brand-orange" aria-hidden="true">/</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.marquee__track {
  animation: marquee 70s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee__track { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
