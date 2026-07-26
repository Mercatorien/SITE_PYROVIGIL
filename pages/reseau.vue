<template>
  <div>
    <PageHero eyebrow="Le Réseau" idx="04"
      title="Un réseau de référents au service des territoires"
      intro="Pour couvrir l'ensemble des départements soumis aux OLD, PyroVigil s'appuie sur des référents locaux — experts du feu de forêt, proches du terrain." />

    <!-- Couverture -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3">— Couverture</p>
          <h2 class="h-section">Un maillage en déploiement</h2>
          <p class="mt-5 text-brand-mid leading-relaxed max-w-lg">Nous étendons progressivement le réseau pour offrir, partout, la même exigence d'expertise et la proximité d'un interlocuteur local.</p>
          <div class="mt-8 grid grid-cols-3 gap-6">
            <div v-for="s in coverage" :key="s.label">
              <p class="font-display font-extrabold text-3xl text-brand-dark">{{ s.value }}</p>
              <p class="mt-1 text-xs text-brand-mid">{{ s.label }}</p>
            </div>
          </div>
        </div>
        <div v-reveal="120" class="aspect-[4/3] rounded-lg border border-brand-dark/10 bg-brand-cream flex items-center justify-center font-mono text-xs text-brand-mid">/* carte de couverture à intégrer */</div>
      </div>
    </section>

    <!-- Ce que le réseau apporte -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <SectionHeader eyebrow="Ce que le réseau apporte" title="La force d'un bureau d'études, la proximité d'un local" />
        <div class="grid md:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <div v-for="(a, i) in atouts" :key="a.title" v-reveal="i * 70" class="bg-white p-8">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-brand-dark">{{ a.title }}</h3>
            <p class="mt-2 text-sm text-brand-mid leading-relaxed">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Devenir référent -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7" v-reveal>
          <p class="eyebrow mb-3">— Rejoindre le réseau</p>
          <h2 class="h-section">Vous êtes un professionnel du feu de forêt ?</h2>
          <p class="mt-5 text-brand-mid leading-relaxed max-w-xl">Un département reste peut-être à couvrir près de chez vous. Rejoignez le réseau PyroVigil et bénéficiez des moyens du bureau d'études, à votre échelle.</p>
        </div>
        <div class="lg:col-span-5 lg:text-right" v-reveal="80">
          <NuxtLink to="/contact" class="btn btn-primary">Candidater comme référent</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand title="Votre territoire n'est pas encore couvert ?" cta="Nous contacter" />
  </div>
</template>

<script setup>
const coverage = [
  { value: '52', label: 'départements visés' },
  { value: '48', label: 'arrêtés intégrés' },
  { value: '—', label: 'référents (à compléter)' },
]
const atouts = [
  { title: 'Expertise mutualisée', desc: 'Méthodes, outils et veille réglementaire du bureau d\'études.' },
  { title: 'Proximité de terrain', desc: 'Un interlocuteur local qui connaît votre territoire.' },
  { title: 'Outils partagés', desc: 'Accès à PyrOLD et aux ressources cartographiques.' },
]
</script>
