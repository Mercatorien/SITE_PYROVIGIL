<template>
  <footer class="bg-brand-dark text-white/80">
    <div class="container-x py-14 grid gap-10 md:grid-cols-4">
      <!-- Marque -->
      <div class="md:col-span-1">
        <img :src="asset('/logo-pyrovigil.png')" alt="PyroVigil" class="h-10 w-auto bg-white rounded-lg p-1.5" />
        <p class="mt-4 text-sm leading-relaxed text-white/60">
          Bureau d'études spécialisé en protection contre les feux de forêt et Obligations Légales de Débroussaillement.
        </p>
        <a href="https://www.linkedin.com/company/pyrovigil" target="_blank" rel="noopener"
          class="inline-flex items-center gap-2 mt-4 text-sm text-white/70 hover:text-brand-orange-bright transition">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.3 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21H9z"/></svg>
          LinkedIn
        </a>
      </div>

      <!-- Navigation -->
      <div>
        <h3 class="font-display font-semibold text-white text-sm mb-4">Explorer</h3>
        <ul class="space-y-2.5 text-sm">
          <li v-for="l in nav" :key="l.to"><NuxtLink :to="l.to" class="hover:text-brand-orange-bright transition">{{ l.label }}</NuxtLink></li>
        </ul>
      </div>

      <!-- Ressources / légal -->
      <div>
        <h3 class="font-display font-semibold text-white text-sm mb-4">Ressources &amp; légal</h3>
        <ul class="space-y-2.5 text-sm">
          <li><NuxtLink to="/ressources" class="hover:text-brand-orange-bright transition">Ressources &amp; actualités</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales" class="hover:text-brand-orange-bright transition">Mentions légales</NuxtLink></li>
          <li><NuxtLink to="/confidentialite" class="hover:text-brand-orange-bright transition">Confidentialité (RGPD)</NuxtLink></li>
          <li><NuxtLink to="/cgv" class="hover:text-brand-orange-bright transition">CGV</NuxtLink></li>
          <li><NuxtLink to="/accessibilite" class="hover:text-brand-orange-bright transition">Accessibilité (RGAA)</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="font-display font-semibold text-white text-sm mb-4">Contact</h3>
        <ul class="space-y-2.5 text-sm text-white/70">
          <li><a href="tel:+33651378610" class="hover:text-brand-orange-bright">06 51 37 86 10</a></li>
          <li><a href="mailto:contact@pyrovigil.fr" class="hover:text-brand-orange-bright">contact@pyrovigil.fr</a></li>
          <li>49 Rue des Tournesols<br>83260 La Crau</li>
        </ul>
        <NuxtLink to="/contact" class="btn btn-primary mt-4 !py-2 text-xs">Demander une démo</NuxtLink>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-x py-5 flex flex-col gap-2.5 text-xs text-white/50">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {{ new Date().getFullYear() }} PyroVigil — Forest Fire Protect. Tous droits réservés.</span>
          <span class="font-mono">Certifié Qualiopi — OF n° 93830807483 · Hébergement France/UE · Conforme RGPD</span>
        </div>
        <div class="font-mono text-white/40 text-center sm:text-left">
          SIRET 98765885300013 · RCS Toulon · TVA intracom. FR21987658853
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const nav = [
  { to: '/prestations', label: 'Prestations' },
  { to: '/formations', label: 'Formations' },
  { to: '/pyrold', label: 'PyrOLD' },
  { to: '/reseau', label: 'Le Réseau' },
  { to: '/references', label: 'Expertise & Références' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]
</script>
