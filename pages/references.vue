<template>
  <div>
    <PageHero eyebrow="Expertise & Références"
      title="Une expertise du feu, exigeante et de terrain"
      intro="Vingt-six ans d'expérience en DFCI et OLD, une méthode éprouvée et des réalisations sur l'ensemble des territoires à risque." />

    <!-- Méthode -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Notre méthode" title="Écouter, cartographier, prouver" />
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(m, i) in methode" :key="m.title" v-reveal="i * 80" class="border-t-2 border-brand-orange pt-5">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-2 font-display font-bold text-xl text-brand-dark">{{ m.title }}</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Zone d'intervention -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Zone d'intervention</p>
          <h2 class="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-[1.1]">52 départements couverts</h2>
          <p class="mt-5 text-white/70 leading-relaxed max-w-md">Une réglementation déjà intégrée pour la plupart des communes des territoires méditerranéens et du grand quart sud-ouest.</p>
        </div>
        <div v-reveal="120" class="aspect-[4/3] rounded-lg border border-white/15 bg-white/5 flex items-center justify-center font-mono text-xs text-white/40">/* carte des réalisations à intégrer */</div>
      </div>
    </section>

    <!-- Études de cas -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Études de cas" title="Nos réalisations" />
        <div class="space-y-px bg-brand-dark/10 border-y border-brand-dark/10">
          <article v-for="c in cas" :key="c.commune" v-reveal class="bg-white grid md:grid-cols-12 gap-4 md:gap-8 items-center p-6">
            <div class="md:col-span-3">
              <h3 class="font-display font-bold text-lg text-brand-dark">{{ c.commune }}</h3>
              <p class="font-mono text-[11px] text-brand-mid">{{ c.dep }}</p>
            </div>
            <p class="md:col-span-6 text-brand-mid leading-relaxed">{{ c.desc }}</p>
            <div class="md:col-span-3 md:text-right">
              <span class="font-display font-extrabold text-2xl text-brand-orange">{{ c.chiffre }}</span>
              <span class="block text-xs text-brand-mid">{{ c.chiffreLabel }}</span>
            </div>
          </article>
        </div>
        <p class="font-mono text-[10px] text-brand-mid mt-3">/* chiffres à confirmer */</p>
      </div>
    </section>

    <!-- Certifications -->
    <section class="section bg-brand-cream border-t border-brand-dark/10">
      <div class="container-x">
        <SectionHeader eyebrow="Confiance" title="Certifications & garanties" />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <div v-for="(g, i) in garanties" :key="g" v-reveal="i * 60" class="bg-white p-7 flex items-start gap-3">
            <span class="mt-1.5 w-2 h-2 bg-brand-orange flex-none"></span>
            <span class="text-sm text-brand-dark leading-relaxed">{{ g }}</span>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup>
const methode = [
  { title: 'Écouter', desc: 'Comprendre le territoire, ses enjeux et ses contraintes avant d\'agir.' },
  { title: 'Cartographier', desc: 'Produire une donnée précise, réglementaire et exploitable.' },
  { title: 'Prouver', desc: 'Documenter et historiser chaque étape pour démontrer la conformité.' },
]
const cas = [
  { commune: 'Velaux', dep: 'Bouches-du-Rhône (13)', desc: 'Cartographie complète des OLD et déploiement de PyrOLD pour le suivi communal.', chiffre: '—', chiffreLabel: 'parcelles OLD' },
  { commune: 'Cuers', dep: 'Var (83)', desc: 'Zonage réglementaire, mode citoyen et accompagnement de la collectivité.', chiffre: '—', chiffreLabel: 'parcelles OLD' },
]
const garanties = [
  'Organisme de formation certifié Qualiopi',
  'Hébergement des données en France / UE',
  'Conformité RGPD',
  'Assurance responsabilité civile professionnelle',
]
</script>
