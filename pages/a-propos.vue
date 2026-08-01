<template>
  <div>
    <PageHero eyebrow="À propos"
      title="Un bureau d'études à taille humaine, spécialiste du feu de forêt"
      intro="PyroVigil met la donnée et l'expertise au service de la protection des territoires et de leurs habitants." />

    <!-- Mission -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4" v-reveal>
          <p class="eyebrow mb-3">— Notre mission</p>
          <h2 class="h-section">Protéger, simplement</h2>
        </div>
        <div class="lg:col-span-8 lg:pl-8" v-reveal="80">
          <p class="text-xl sm:text-2xl leading-relaxed text-brand-dark font-display font-medium">
            Rendre la gestion du risque incendie et des Obligations Légales de Débroussaillement claire, fiable et accessible à tous les acteurs d'un territoire.
          </p>
          <p class="mt-6 prose-py">PLACEHOLDER — histoire et mission de PyroVigil à compléter (fondation, parcours, ancrage dans le Var).</p>
        </div>
      </div>
    </section>

    <!-- Le bureau d'études -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <SectionHeader eyebrow="Le bureau d'études" title="Des experts complémentaires"
          intro="Une équipe qui réunit l'expertise DFCI de terrain et la recherche & développement en géomatique, télédétection et modélisation du risque incendie." />
        <div class="space-y-14 lg:space-y-16 mt-2">
          <article v-for="(m, i) in membres" :key="m.slug" v-reveal
            class="grid md:grid-cols-12 gap-8 lg:gap-12 items-start"
            :class="i > 0 ? 'pt-14 lg:pt-16 border-t border-brand-dark/10' : ''">

            <!-- Photo (placeholder initiales tant que la vraie photo n'est pas déposée) -->
            <div class="md:col-span-4">
              <div class="relative aspect-[4/5] rounded-lg overflow-hidden bg-white border border-brand-dark/10">
                <img v-if="!m.imgError" :src="asset('/img/equipe/' + m.slug + '.jpg')" :alt="m.nom"
                  class="absolute inset-0 w-full h-full object-cover" @error="m.imgError = true" />
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span class="font-display font-extrabold text-5xl text-brand-dark/20">{{ initials(m.nom) }}</span>
                  <span class="font-mono text-[10px] uppercase tracking-wider text-brand-mid/60">Photo à venir</span>
                </div>
              </div>
            </div>

            <!-- Présentation -->
            <div class="md:col-span-8">
              <h3 class="font-display font-bold text-2xl text-brand-dark">{{ m.nom }}</h3>
              <p class="mt-1 text-brand-orange font-semibold text-sm">{{ m.role }}</p>
              <ul class="mt-5 space-y-2.5">
                <li v-for="b in m.bio" :key="b" class="flex gap-3 text-brand-mid leading-relaxed">
                  <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange/70 flex-none"></span>{{ b }}
                </li>
              </ul>
              <blockquote class="mt-6 border-l-2 border-brand-dark/15 pl-4 text-brand-dark/70 italic">
                « {{ m.citation }} »
              </blockquote>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Ce qui nous guide" title="Nos valeurs" />
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(v, i) in valeurs" :key="v.title" v-reveal="i * 80" class="border-t-2 border-brand-orange pt-5">
            <h3 class="font-display font-bold text-xl text-brand-dark">{{ v.title }}</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup>
const initials = (nom) => nom.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

// Photos attendues dans public/img/equipe/<slug>.jpg (sinon → placeholder initiales).
const membres = reactive([
  {
    slug: 'patrick-jeannot',
    nom: 'Patrick Jeannot',
    role: 'Expert DFCI · Directeur Général',
    bio: [
      '+ 40 ans de terrain forestier, dont 25 ans dédiés à la DFCI.',
      'Ex-Cadre Technique ONF Var (catégorie A), ex-coordonnateur DFCI du Var et chef du pôle DFCI/APFM — 72 agents encadrés.',
      "Cellule d'expertise tactique COS/COZ ; formateur FDF3/5, RCCI, habilité réseau.",
      "Représentant ONF au sein de l'interservices Var (préfecture, SDIS, DREAL, Région…).",
    ],
    citation: 'Citation à venir.',
    imgError: false,
  },
  {
    slug: 'nicolas-massot',
    nom: 'Nicolas Massot',
    role: 'Géomaticien · Directeur R&D',
    bio: [
      "Architecte de la suite d'outils PyroVigil et de la méthode de calcul et de priorisation des OLD.",
      'Traitement LiDAR massif : hauteur des arbres, segmentation des houppiers, biomasse, défendabilité.',
      "Modélisation de l'aléa feu de forêt (morphologie, météo, occupation du sol, structure du combustible).",
      'Spatial machine learning (U-Net, Random Forest, MaxEnt) et télédétection THRS (GEOBIA, indices spectraux).',
      'R, Python, QGIS, PostgreSQL/PostGIS, web-SIG. Master Géomatique (major) ; Université Laval, Québec.',
    ],
    citation: 'Citation à venir.',
    imgError: false,
  },
  {
    slug: 'frederic-plain',
    nom: 'Frédéric Plain',
    role: '— Fonction à préciser —',
    bio: ['Présentation à compléter.'],
    citation: 'Citation à venir.',
    imgError: false,
  },
  {
    slug: 'diannat-jeannot',
    nom: 'Diannat Jeannot',
    role: '— Fonction à préciser —',
    bio: ['Présentation à compléter.'],
    citation: 'Citation à venir.',
    imgError: false,
  },
])
const valeurs = [
  { title: 'Exigence', desc: 'Une donnée précise et une expertise de terrain, sans approximation.' },
  { title: 'Proximité', desc: 'À l\'écoute des territoires, au plus près de leurs réalités.' },
  { title: 'Utilité publique', desc: 'La protection des populations et des paysages comme boussole.' },
]
</script>
