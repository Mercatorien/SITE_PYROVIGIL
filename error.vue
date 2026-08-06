<template>
  <div class="min-h-screen bg-brand-cream flex flex-col">
    <!-- En-tête minimal (error.vue est autonome, hors layout) -->
    <header class="border-b border-brand-dark/10 bg-white/90 backdrop-blur">
      <div class="container-x h-20 flex items-center">
        <NuxtLink to="/" aria-label="Accueil PyroVigil">
          <img :src="asset('/logo-pyrovigil.png')" alt="PyroVigil — Forest Fire Protect" class="h-12 lg:h-14 w-auto" />
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 py-20">
      <div class="max-w-lg text-center">
        <p class="font-display font-extrabold text-7xl sm:text-8xl text-brand-orange tracking-tight">{{ error?.statusCode || 'Oups' }}</p>
        <h1 class="mt-4 font-display font-bold text-2xl sm:text-3xl text-brand-dark">{{ titre }}</h1>
        <p class="mt-4 text-brand-mid leading-relaxed">{{ message }}</p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-5">
          <button @click="retour" class="btn btn-primary">Retour à l'accueil</button>
          <NuxtLink to="/contact" class="link-arrow">Nous contacter
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
          </NuxtLink>
        </div>

        <div class="mt-10 pt-8 border-t border-brand-dark/10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <NuxtLink v-for="l in liens" :key="l.to" :to="l.to" class="text-brand-mid hover:text-brand-orange transition">{{ l.label }}</NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object })

const is404 = computed(() => props.error?.statusCode === 404)
const titre = computed(() => is404.value ? 'Page introuvable' : 'Une erreur est survenue')
const message = computed(() => is404.value
  ? "La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez l'adresse, ou repartez de l'accueil."
  : "Un incident technique est survenu. Réessayez dans un instant, ou contactez-nous si le problème persiste.")

const liens = [
  { to: '/prestations', label: 'Prestations' },
  { to: '/pyrold', label: 'PyrOLD' },
  { to: '/formations', label: 'Formations' },
  { to: '/references', label: 'Références' },
  { to: '/faq', label: 'FAQ' },
]

const retour = () => clearError({ redirect: '/' })
useHead({ title: `${props.error?.statusCode || 'Erreur'} — PyroVigil` })
</script>
