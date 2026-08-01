<template>
  <div>
    <PageHero eyebrow="Notre équipe"
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

        <div v-for="(g, gi) in groupes" :key="g.titre" :class="gi > 0 ? 'mt-16 lg:mt-24' : 'mt-2'">
          <h3 class="font-display font-bold text-xl text-brand-dark pb-3 mb-10 border-b border-brand-dark/15">{{ g.titre }}</h3>

          <div class="space-y-14 lg:space-y-16">
            <article v-for="(m, i) in g.membres" :key="m.slug" v-reveal
              class="grid md:grid-cols-12 gap-8 lg:gap-12 items-start"
              :class="i > 0 ? 'pt-14 lg:pt-16 border-t border-brand-dark/10' : ''">

              <!-- Photo — alterne gauche (pairs) / droite (impairs) -->
              <div class="md:col-span-4" :class="i % 2 === 1 ? 'md:order-2' : 'md:order-1'">
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
              <div class="md:col-span-8" :class="i % 2 === 1 ? 'md:order-1' : 'md:order-2'">
                <h4 class="font-display font-bold text-2xl text-brand-dark">{{ m.nom }}</h4>
                <p class="mt-1 text-brand-orange font-semibold text-sm">{{ m.role }}</p>

                <ul v-if="m.bio.length > 1" class="mt-5 space-y-2.5">
                  <li v-for="b in m.bio" :key="b" class="flex gap-3 text-brand-mid leading-relaxed">
                    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange/70 flex-none"></span>{{ b }}
                  </li>
                </ul>
                <p v-else class="mt-5 text-brand-mid leading-relaxed">{{ m.bio[0] }}</p>

                <blockquote class="mt-6 border-l-2 border-brand-dark/15 pl-4 text-brand-dark/70 italic">
                  « {{ m.citation }} »
                </blockquote>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Autour du noyau : réseau & partenaires -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Autour du noyau" title="Le réseau et les partenaires" />
        <div class="grid md:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <div v-for="(r, i) in reseau" :key="r.titre" v-reveal="i * 70" class="bg-white p-7 flex flex-col">
            <h3 class="font-display font-bold text-lg text-brand-dark">{{ r.titre }}</h3>
            <p class="mt-3 text-brand-mid leading-relaxed flex-1">{{ r.desc }}</p>
            <NuxtLink v-if="r.lien" :to="r.lien" class="link-arrow mt-4 self-start">
              {{ r.lienLabel }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </NuxtLink>
          </div>
        </div>
        <NuxtLink to="/reseau" class="link-arrow mt-8 inline-flex">
          Découvrir Le Réseau
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
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

// Photos dans public/img/equipe/<slug>.jpg (sinon → placeholder initiales).
const groupes = reactive([
  {
    titre: 'Direction',
    membres: [
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
        slug: 'diana-jeannot',
        nom: 'Diana Jeannot',
        role: '— Fonction à préciser —',
        bio: ['Présentation à compléter.'],
        citation: 'Citation à venir.',
        imgError: false,
      },
    ],
  },
  {
    titre: 'Les associés experts',
    membres: [
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
        slug: 'jean-labadie',
        nom: 'Jean Labadie',
        role: 'Ingénieur forestier spécialisé DFCI — conseiller technique',
        bio: [
          "Ingénieur forestier de formation, il débute comme cadre de l'Office National des Forêts dans l'Est de la France, puis se spécialise dès 1987 dans la défense des forêts contre l'incendie (brevet feux de forêt de la Sécurité civile). Devenu chef du service DFCI du département du Var, spécialiste de la protection des zones urbanisées, il a formé forestiers-sapeurs et personnels de la Sécurité civile jusqu'en 2020, et signe de nombreuses publications de référence sur le feu, l'urbanisme et la forêt méditerranéenne. Associé de PyroVigil, il est conseiller technique et chef de projet sur les études complexes.",
        ],
        citation: 'Citation à venir.',
        imgError: false,
      },
      {
        slug: 'richard-ciappara',
        nom: 'Richard Ciappara',
        role: 'Technicien forestier principal honoraire ONF — formation',
        bio: [
          "Ancien agent assermenté de l'ONF du Var, fort de 43 années d'expérience : gestionnaire de patrimoine spécialisé DFCI et police de l'environnement, chef de projet responsable de formations internes et externes dans plusieurs départements. Associé de PyroVigil, il pilote la formation et le volet contrôle des OLD — et forme toujours bénévolement les comités communaux feux de forêts du Var.",
        ],
        citation: 'Citation à venir.',
        imgError: false,
      },
      {
        slug: 'harry-botbol',
        nom: 'Harry Botbol',
        role: 'Architecte — conseil aux architectes et constructeurs',
        bio: [
          "Architecte diplômé (DAA, Londres) et titulaire d'un DESS en aménagement du territoire et gestion de l'espace (IAR, Aix-en-Provence). Associé de PyroVigil, il conseille les architectes, les maîtres d'œuvre et les constructeurs pour intégrer le risque feu dès la conception des projets.",
        ],
        citation: 'Citation à venir.',
        imgError: false,
      },
    ],
  },
])
const reseau = [
  {
    titre: 'Les référents départementaux',
    desc: "Techniciens forestiers confirmés et professionnels du feu, ils portent la méthodologie PyroVigil sur leur territoire, avec l'appui permanent du bureau d'études central.",
    lien: '/reseau', lienLabel: 'Découvrir les référents',
  },
  {
    titre: 'Les partenaires techniques',
    desc: "Développeurs de nos applications cartographiques, écologues et spécialistes associés selon les besoins des missions : PyroVigil s'entoure de compétences éprouvées, sous sa responsabilité et son contrôle qualité.",
    lien: null,
  },
  {
    titre: 'Les entreprises certifiées',
    desc: 'Les entreprises de travaux formées et certifiées ProCertif prolongent nos études sur le terrain, pour des chantiers de débroussaillement conformes.',
    lien: '/reseau', lienLabel: "Voir l'annuaire",
  },
]
const valeurs = [
  { title: 'Le terrain d\'abord', desc: 'Aucune étude sans aller voir. La carte renseigne, le terrain décide — c\'est là que se jugent la végétation réelle, les accès et la défendabilité.' },
  { title: 'La rigueur réglementaire', desc: 'Des livrables opposables, des références textuelles exactes, des préconisations dimensionnées à l\'obligation réelle — ni plus, ni moins.' },
  { title: 'La transmission', desc: 'Former les entreprises, les agents des collectivités et les référents du réseau : la protection contre le feu progresse quand la compétence se diffuse.' },
]
</script>
