<template>
  <div>
    <PageHero eyebrow="Formations" idx="02"
      title="Rendez vos équipes autonomes sur les OLD et la DFCI"
      intro="Des formations conçues et animées par des experts de terrain, adaptées aux collectivités comme aux professionnels." />

    <!-- Bandeau Qualiopi -->
    <section class="border-b border-brand-dark/10 bg-brand-cream">
      <div class="container-x py-10 flex flex-col sm:flex-row items-center gap-6 justify-between" v-reveal>
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-full border-2 border-brand-orange flex items-center justify-center font-display font-extrabold text-brand-orange text-xs text-center leading-tight">QUALI<br>OPI</div>
          <div>
            <p class="font-display font-bold text-brand-dark text-lg">Organisme certifié Qualiopi</p>
            <p class="text-sm text-brand-mid">Nos actions de formation sont finançables (OPCO, plans de développement des compétences).</p>
          </div>
        </div>
        <NuxtLink to="/contact" class="link-arrow whitespace-nowrap">Demander le programme
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Catalogue -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Catalogue" title="Nos formations" />
        <div class="grid md:grid-cols-2 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <article v-for="(f, i) in catalogue" :key="f.title" v-reveal="i * 70" class="bg-white p-8 hover:bg-brand-cream/50 transition">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-xl text-brand-dark">{{ f.title }}</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">{{ f.desc }}</p>
            <p class="mt-4 font-mono text-[11px] uppercase tracking-wider text-brand-orange">{{ f.public }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Modalités -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x grid lg:grid-cols-3 gap-10">
        <div v-reveal class="lg:col-span-1">
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Modalités</p>
          <h2 class="font-display font-extrabold text-3xl leading-tight">Un format adapté à votre organisation</h2>
        </div>
        <dl class="lg:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          <div v-for="(m, i) in modalites" :key="m.k" v-reveal="i * 60" class="border-t border-white/15 pt-4">
            <dt class="font-display font-semibold text-white">{{ m.k }}</dt>
            <dd class="mt-1 text-sm text-white/60 leading-relaxed">{{ m.v }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <CtaBand title="Une formation sur mesure ?" cta="Demander le programme" />
  </div>
</template>

<script setup>
const catalogue = [
  { title: 'Comprendre et appliquer les OLD', desc: 'Cadre réglementaire, calcul des zonages, mise en œuvre concrète pour les agents.', public: 'Collectivités · agents' },
  { title: 'Contrôle et procédure de mise en demeure', desc: 'Réaliser les contrôles, rédiger les courriers, sécuriser la procédure préfectorale.', public: 'Collectivités · police municipale' },
  { title: 'Débroussaillement : les bonnes pratiques', desc: 'Techniques, sécurité et conformité pour les intervenants de terrain.', public: 'Paysagistes · gestionnaires' },
  { title: 'DFCI & défendabilité', desc: 'Lecture du risque incendie et principes d\'aménagement à l\'interface habitat-forêt.', public: 'Techniciens · aménageurs' },
]

const modalites = [
  { k: 'Présentiel ou distanciel', v: 'Sur site, dans vos locaux, ou à distance selon vos contraintes.' },
  { k: 'Sur mesure', v: 'Contenus adaptés à votre territoire et à votre niveau.' },
  { k: 'Cas pratiques', v: 'Exercices sur données réelles et exemples de terrain.' },
  { k: 'Finançable', v: 'Certification Qualiopi : prise en charge OPCO possible.' },
]
</script>
