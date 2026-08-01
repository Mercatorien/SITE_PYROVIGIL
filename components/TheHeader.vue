<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-brand-dark/10">
    <div class="container-x flex items-center gap-6 h-20 lg:h-24">
      <NuxtLink to="/" class="flex items-center flex-none" aria-label="Accueil PyroVigil">
        <img :src="asset('/logo-pyrovigil.png')" alt="PyroVigil — Forest Fire Protect" class="h-14 lg:h-[72px] w-auto" />
      </NuxtLink>

      <!-- Bloc droit : menu principal + CTA -->
      <div class="hidden lg:flex items-center ml-auto self-stretch">
        <nav class="flex items-center gap-0.5 self-center" aria-label="Navigation principale">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
            class="px-2.5 py-1.5 rounded-lg text-sm font-display font-semibold text-brand-dark hover:text-brand-orange hover:bg-brand-cream transition"
            active-class="text-brand-orange">
            {{ l.label }}
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn-primary ml-3 !py-2 whitespace-nowrap">Demander une démo</NuxtLink>
        </nav>
      </div>

      <button class="lg:hidden ml-auto p-2 text-brand-dark" @click="open = !open" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-width="2" :d="open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
        </svg>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="fade">
      <nav v-if="open" class="lg:hidden border-t border-brand-dark/10 bg-white">
        <div class="container-x py-3 flex flex-col">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" @click="open = false"
            class="py-2.5 text-sm font-display font-semibold text-brand-dark hover:text-brand-orange">
            {{ l.label }}
          </NuxtLink>
          <NuxtLink to="/contact" @click="open = false" class="btn btn-primary mt-2">Demander une démo</NuxtLink>
          <div class="mt-4 pt-4 border-t border-brand-dark/10 flex flex-col gap-2 text-sm">
            <a href="tel:+33651378610" class="text-brand-dark hover:text-brand-orange font-semibold">06 51 37 86 10</a>
            <a href="mailto:contact@pyrovigil.fr" class="text-brand-mid hover:text-brand-orange">contact@pyrovigil.fr</a>
          </div>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
const open = ref(false)
const links = [
  { to: '/prestations', label: 'Prestations' },
  { to: '/formations', label: 'Formations' },
  { to: '/pyrold', label: 'PyrOLD' },
  { to: '/reseau', label: 'Le Réseau' },
  { to: '/references', label: 'Références' },
  { to: '/a-propos', label: 'Notre équipe' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
