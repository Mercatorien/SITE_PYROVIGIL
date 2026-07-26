<template>
  <div class="relative" @mouseenter="paused = true" @mouseleave="paused = false">
    <!-- Fenêtre navigateur : carrousel des vues desktop -->
    <div class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl bg-white">
      <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
      </div>
      <div class="relative aspect-[1536/783] bg-brand-cream">
        <img v-for="(s, i) in slides" :key="s.src" :src="asset(s.src)" :alt="s.alt"
          loading="lazy" decoding="async"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          :class="i === current ? 'opacity-100' : 'opacity-0'" />
        <!-- Légende de la vue courante -->
        <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-brand-dark/70 to-transparent">
          <p class="font-mono text-[11px] uppercase tracking-wider text-white">{{ slides[current].label }}</p>
        </div>
      </div>
    </div>

    <!-- Mockup mobile incrusté (le cadre du téléphone est déjà dans l'image) -->
    <div class="absolute -bottom-8 -right-1 sm:-right-3 w-28 sm:w-32 drop-shadow-2xl pointer-events-none">
      <img :src="asset(mobile)" alt="PyrOLD sur mobile — mode citoyen"
        loading="lazy" decoding="async" class="w-full block" />
    </div>

    <!-- Contrôles : puces -->
    <div class="mt-7 flex items-center gap-2.5">
      <button v-for="(s, i) in slides" :key="'dot' + i" type="button" @click="go(i)"
        :aria-label="'Voir : ' + s.label" :aria-current="i === current"
        class="h-2 rounded-full transition-all"
        :class="i === current ? 'w-6 bg-brand-orange' : 'w-2 bg-brand-dark/20 hover:bg-brand-dark/40'"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Vues du produit (captures Cuers démo) — ordre défini par l'utilisateur.
const slides = [
  { src: '/img/pyrold-showcase-1.webp', label: 'Cartographie des OLD & suivi de terrain', alt: 'PyrOLD — carte des OLD communales de Cuers' },
  { src: '/img/pyrold-showcase-2.webp', label: 'Fiche parcelle : obligations & surfaces', alt: 'PyrOLD — fiche d’une parcelle génératrice' },
  { src: '/img/pyrold-showcase-3.webp', label: 'Répartition & suivi du débroussaillement', alt: 'PyrOLD — répartition des surfaces et suivi du débroussaillement' },
  { src: '/img/pyrold-showcase-4.webp', label: 'Tableau de bord communal', alt: 'PyrOLD — tableau de bord et statistiques communales' },
  { src: '/img/pyrold-showcase-5.webp', label: 'Suivi des courriers (LRAR, préfet)', alt: 'PyrOLD — suivi et génération des courriers' },
]
const mobile = '/img/pyrold-showcase-mobile.webp'

const current = ref(0)
const paused = ref(false)
let timer = null

function go(i) { current.value = i }
function next() { current.value = (current.value + 1) % slides.length }

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  timer = setInterval(() => { if (!paused.value) next() }, 4500)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>
