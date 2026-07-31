<template>
  <div>
    <PageHero eyebrow="Nos prestations" idx="01"
      title="Du diagnostic réglementaire à l'action de terrain"
      intro="PyroVigil couvre toute la chaîne : cartographier les obligations, étudier le risque, accompagner la collectivité et former vos équipes." />

    <!-- Domaines alternés -->
    <section class="section">
      <div class="container-x space-y-24 sm:space-y-32">
        <div v-for="(d, i) in domains" :key="d.title" class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div v-reveal :class="i % 2 ? 'lg:order-2' : ''">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="h-section mt-3">{{ d.title }}</h2>
            <p class="mt-5 text-brand-mid leading-relaxed max-w-lg">{{ d.intro }}</p>
            <dl class="mt-8">
              <div v-for="b in d.blocks" :key="b.k" class="border-t border-brand-dark/10 py-4">
                <dt class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">{{ b.k }}</dt>
                <dd class="mt-1 text-brand-dark leading-relaxed">{{ b.v }}</dd>
              </div>
            </dl>
          </div>
          <div v-reveal="120" :class="i % 2 ? 'lg:order-1' : ''"
            class="aspect-[4/3] rounded-lg border border-brand-dark/10 bg-brand-cream flex items-center justify-center font-mono text-xs text-brand-mid">
            /* {{ d.visual }} */
          </div>
        </div>
      </div>
    </section>

    <!-- Citation -->
    <section class="border-y border-brand-dark/10 bg-brand-cream">
      <figure class="container-x py-16 sm:py-20 max-w-3xl" v-reveal>
        <svg class="w-9 h-9 text-brand-orange mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A2.67 2.67 0 0 1 8.17 8.5V6zm11 0A5.17 5.17 0 0 0 13 11.17V18h6.83v-6.83H16.5a2.67 2.67 0 0 1 2.67-2.67V6z"/>
        </svg>
        <blockquote class="font-display font-semibold text-2xl sm:text-[2rem] leading-snug text-brand-dark">
          Des outils conçus de l'intérieur : chaque algorithme est calibré sur 40 ans d'expertise DFCI terrain.
        </blockquote>
      </figure>
    </section>

    <!-- Secteurs -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x">
        <div v-reveal class="mb-14 max-w-2xl">
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Secteurs</p>
          <h2 class="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight">Nous adaptons nos prestations à chaque public</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          <div v-for="(a, i) in publics" :key="a.title" v-reveal="i * 80" class="bg-brand-dark p-7">
            <span class="font-mono text-sm text-brand-orange-bright">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-4 font-display font-bold text-lg">{{ a.title }}</h3>
            <p class="mt-2 text-sm text-white/60 leading-relaxed">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup>
const domains = [
  {
    title: 'Cartographie & calcul des OLD', visual: 'Carte interactive des OLD',
    intro: 'Un zonage réglementaire précis, parcelle par parcelle, sur l\'ensemble du territoire communal.',
    blocks: [
      { k: 'Problème', v: 'Calculer un zonage complexe (équidistances entre parcelles) sur des milliers de parcelles, en conformité avec les textes.' },
      { k: 'Méthode', v: 'Traitement du cadastre, du PLU et des arrêtés préfectoraux ; calcul automatisé des emprises et des équidistances.' },
      { k: 'Livrables', v: 'Cartes, couches SIG, tableaux de parcelles, exports PDF / Excel / KML.' },
    ],
  },
  {
    title: 'Études DFCI & risque incendie', visual: 'Profil LiDAR / modèle de terrain',
    intro: 'Évaluer la défendabilité et le risque à l\'interface habitat-forêt.',
    blocks: [
      { k: 'Problème', v: 'Comprendre le risque réel : végétation, pente, accès, continuités.' },
      { k: 'Méthode', v: 'Analyse du terrain par télédétection et LiDAR, de la végétation et des voies d\'accès.' },
      { k: 'Livrables', v: 'Diagnostic de défendabilité, préconisations d\'aménagement, appui PPRIF.' },
    ],
  },
  {
    title: 'Accompagnement des collectivités', visual: 'Tableau de bord de suivi',
    intro: 'Piloter les contrôles, les relances et la procédure préfectorale, avec traçabilité.',
    blocks: [
      { k: 'Problème', v: 'Suivre des milliers de parcelles, relancer, répondre à la préfecture et prouver son action.' },
      { k: 'Méthode', v: 'Suivi structuré, courriers types, historisation de chaque démarche.' },
      { k: 'Livrables', v: 'Mises en demeure, LRAR, saisines préfet, tableau de bord d\'avancement.' },
    ],
  },
  {
    title: 'Formations — certifiées Qualiopi', visual: 'Programme de formation',
    intro: 'Rendre vos équipes autonomes sur les OLD et la DFCI.',
    blocks: [
      { k: 'Problème', v: 'Monter en compétence sur une réglementation technique et évolutive.' },
      { k: 'Méthode', v: 'Formations sur mesure, présentiel ou distanciel, cas pratiques de terrain.' },
      { k: 'Livrables', v: 'Attestations, supports pédagogiques. Organisme certifié Qualiopi (finançable).' },
    ],
  },
]

const publics = [
  { title: 'Collectivités & institutions', desc: 'Communes, EPCI, SDIS.' },
  { title: 'Tiers de confiance', desc: 'Notaires, agences immobilières, assureurs.' },
  { title: 'Gestionnaires & professionnels', desc: 'Propriétaires fonciers, entreprises paysagères.' },
  { title: 'Particuliers', desc: 'Propriétaires soumis aux OLD.' },
]
</script>
