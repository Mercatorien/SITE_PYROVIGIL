<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-brand-dark/10">
    <div class="container-x flex items-center gap-6 h-20 lg:h-24">
      <NuxtLink to="/" class="flex items-center flex-none" aria-label="Accueil PyroVigil">
        <img :src="asset('/logo-pyrovigil.png')" alt="PyroVigil — Forest Fire Protect" class="h-14 lg:h-[72px] w-auto" />
      </NuxtLink>

      <!-- Bloc droit : menu, filet, puis contacts tout à droite -->
      <div class="hidden lg:flex items-center gap-5 ml-auto self-stretch">
        <nav class="flex items-center gap-1 self-center" aria-label="Navigation principale">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
            class="px-3 py-1.5 rounded-lg text-sm font-display font-semibold text-brand-dark hover:text-brand-orange hover:bg-brand-cream transition"
            active-class="text-brand-orange">
            {{ l.label }}
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn-primary ml-2 !py-2">Demander une démo</NuxtLink>
        </nav>

        <!-- Filet vertical léger séparant le menu des contacts -->
        <span class="w-px self-stretch my-5 bg-brand-dark/15" aria-hidden="true"></span>

        <div class="flex flex-col items-end leading-tight self-center">
          <a href="tel:+33651378610"
            class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-dark hover:text-brand-orange transition">
            <svg class="w-3.5 h-3.5 text-brand-orange" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1 3a1 1 0 01-.24 1L7.8 9.2a13 13 0 007 7l1.5-1.2a1 1 0 011-.24l3 1a1 1 0 01.7.95V19a2 2 0 01-2 2A16 16 0 013 5z"/>
            </svg>
            06 51 37 86 10
          </a>
          <a href="mailto:contact@pyrovigil.fr"
            class="inline-flex items-center gap-1.5 text-[13px] text-brand-mid hover:text-brand-orange transition mt-0.5">
            <svg class="w-3.5 h-3.5 text-brand-orange" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l8.4 5.6a1 1 0 001.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            contact@pyrovigil.fr
          </a>
        </div>

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
  { to: '/', label: 'Accueil' },
  { to: '/prestations', label: 'Prestations' },
  { to: '/formations', label: 'Formations' },
  { to: '/pyrold', label: 'PyrOLD' },
  { to: '/reseau', label: 'Le Réseau' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
