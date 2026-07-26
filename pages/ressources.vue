<template>
  <div>
    <PageHero eyebrow="Ressources & actualités"
      title="Comprendre les OLD et le risque incendie"
      intro="Guides, plaquettes et regards d'experts pour anticiper la saison feu et sécuriser vos démarches." />

    <section class="section">
      <div class="container-x">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <a v-for="(r, i) in ressources" :key="r.title" :href="r.href" v-reveal="i * 60"
            class="group bg-white p-8 hover:bg-brand-cream/60 transition block">
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">{{ r.type }}</p>
            <h3 class="mt-3 font-display font-bold text-lg text-brand-dark group-hover:text-brand-orange transition">{{ r.title }}</h3>
            <p class="mt-2 text-sm text-brand-mid leading-relaxed">{{ r.desc }}</p>
            <span class="link-arrow mt-4 text-sm">{{ r.cta }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </span>
          </a>
        </div>
        <p class="font-mono text-[10px] text-brand-mid mt-3">/* ressources et articles à compléter */</p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup>
const ressources = [
  { type: 'Plaquette', title: 'La suite d\'outils PyroVigil', desc: 'Présentation de nos outils et services.', href: '/PyroVigil_Presentation_Outils.pdf', cta: 'Télécharger le PDF' },
  { type: 'Guide', title: 'Comprendre les OLD', desc: 'Le B.A.-BA des Obligations Légales de Débroussaillement.', href: '#', cta: 'Lire le guide' },
  { type: 'Article', title: 'À lire avant la saison feu', desc: 'PLACEHOLDER — regard d\'expert à intégrer.', href: '#', cta: 'Lire l\'article' },
]
</script>
