<template>
  <div>
    <PageHero eyebrow="Organisme de formation" idx="02"
      title="Formations professionnelles"
      intro="Des formations courtes, denses et certifiantes, conçues par des praticiens du feu de forêt — pour les professionnels des espaces verts, de l'immobilier et les agents des collectivités." />

    <!-- Bandeau Qualiopi -->
    <section class="border-b border-brand-dark/10 bg-brand-cream">
      <div class="container-x py-10 flex flex-col sm:flex-row items-center sm:items-start gap-6" v-reveal>
        <div class="bg-white rounded-lg p-4 border border-brand-dark/10 flex-none">
          <img :src="asset('/img/qualiopi-logo.png')" alt="Certification Qualiopi — actions de formation" class="h-16 w-auto" />
        </div>
        <div>
          <p class="font-display font-bold text-brand-dark text-lg">Organisme certifié Qualiopi</p>
          <p class="text-sm text-brand-mid mt-1 leading-relaxed">PyroVigil est certifié Qualiopi — certificat I.Cert n° CPS RNCQ 7259, délivré le 10 juin 2026, valable jusqu'au 9 juin 2029. Organisme de formation n° 93830807483.</p>
          <p class="text-sm text-brand-dark/70 italic mt-2">« La certification qualité a été délivrée au titre de la catégorie d'action suivante : actions de formation. »</p>
        </div>
      </div>
    </section>

    <!-- Bandeau photo terrain -->
    <section class="pt-12 sm:pt-16">
      <div class="container-x" v-reveal>
        <figure class="relative aspect-[16/9] sm:aspect-[5/2] rounded-xl overflow-hidden bg-brand-cream border border-brand-dark/10">
          <img v-if="!photoError" :src="asset('/img/formations-terrain.jpg')"
            alt="Formation PyroVigil — mise en situation sur le terrain"
            class="absolute inset-0 w-full h-full object-cover" @error="photoError = true" />
          <figcaption v-if="!photoError" class="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-brand-dark/70 to-transparent">
            <span class="text-white text-sm sm:text-base font-display font-semibold">Des formations ancrées dans le terrain, animées par des praticiens du feu de forêt.</span>
          </figcaption>
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-brand-mid text-center px-4">
            <svg class="w-10 h-10 opacity-40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="9" cy="9" r="1.4"/></svg>
            <span class="font-mono text-[11px] uppercase tracking-wider">Photo terrain à venir — public/img/formations-terrain.jpg</span>
          </div>
        </figure>
      </div>
    </section>

    <!-- Financement -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4" v-reveal>
          <p class="eyebrow mb-3">— Financement</p>
          <h2 class="h-section">Faites financer votre formation</h2>
        </div>
        <div class="lg:col-span-8 lg:pl-8" v-reveal="80">
          <p class="text-brand-mid leading-relaxed">La certification Qualiopi de notre organisme conditionne l'accès aux financements mutualisés : selon votre situation, nos formations peuvent être prises en charge en tout ou partie par votre opérateur de compétences (OPCO) — nous sommes notamment référencés auprès d'<span class="text-brand-dark font-semibold">OCAPIAT</span>, l'OPCO des entreprises du paysage. Nous vous fournissons devis, programme détaillé et convention de formation pour monter votre dossier ; renseignez-vous auprès de votre OPCO sur vos droits.</p>
        </div>
      </div>
    </section>

    <!-- Formations certifiantes -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <SectionHeader eyebrow="Catalogue" title="Nos formations certifiantes" />
        <div class="space-y-px bg-brand-dark/10 border border-brand-dark/10 mt-4">
          <article v-for="f in formations" :key="f.titre" class="bg-white p-8 lg:p-10 grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div class="lg:col-span-3">
              <p class="font-display font-extrabold text-2xl text-brand-orange">{{ f.prix }}</p>
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-mid mt-1">{{ f.duree }}</p>
              <p class="mt-3 text-xs text-brand-mid leading-relaxed">{{ f.public }}</p>
            </div>
            <div class="lg:col-span-9">
              <h3 class="font-display font-bold text-xl text-brand-dark">{{ f.titre }}</h3>
              <p v-for="p in f.desc" :key="p" class="mt-3 text-brand-mid leading-relaxed">{{ p }}</p>

              <!-- Programme (formation 5 journées) -->
              <div v-if="f.programme" class="mt-6 bg-brand-cream border border-brand-dark/10 rounded-lg p-6">
                <p class="font-mono text-[11px] uppercase tracking-wider text-brand-mid mb-4">Le programme des cinq journées</p>
                <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  <li v-for="pr in f.programme" :key="pr" class="flex gap-2.5 text-sm text-brand-dark leading-relaxed">
                    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ pr }}
                  </li>
                </ul>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a href="#contact-prestation" class="link-arrow">{{ f.cta }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                </a>
                <a v-if="f.procertif" :href="f.procertif" target="_blank" rel="noopener" class="link-arrow">Nos formations sur PROCERTIF
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9m8 0v8"/></svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Inscriptions & sessions -->
    <section id="contact-prestation" class="section scroll-mt-24">
      <div class="container-x grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7" v-reveal>
          <p class="eyebrow mb-3">— Inscriptions & sessions</p>
          <h2 class="h-section">Organiser une session</h2>
          <p class="mt-5 text-brand-mid leading-relaxed max-w-xl">Sessions inter-entreprises programmées régulièrement, ou sessions dédiées dans vos locaux à partir de quelques participants. Dites-nous votre besoin, nous vous répondons avec les prochaines dates et les modalités.</p>
        </div>
        <div class="lg:col-span-5" v-reveal="80">
          <div class="border-t border-brand-dark/10 pt-6 space-y-5">
            <a href="tel:+33651378610" class="flex items-center gap-3 group">
              <span class="w-10 h-10 flex-none rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1 3a1 1 0 01-.24 1L7.8 9.2a13 13 0 007 7l1.5-1.2a1 1 0 011-.24l3 1a1 1 0 01.7.95V19a2 2 0 01-2 2A16 16 0 013 5z"/></svg>
              </span>
              <span>
                <span class="block font-mono text-[10px] uppercase tracking-wider text-brand-mid">Téléphone</span>
                <span class="font-display font-bold text-brand-dark group-hover:text-brand-orange transition">06 51 37 86 10</span>
              </span>
            </a>
            <a href="mailto:contact@pyrovigil.fr" class="flex items-center gap-3 group">
              <span class="w-10 h-10 flex-none rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l8.4 5.6a1 1 0 001.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </span>
              <span>
                <span class="block font-mono text-[10px] uppercase tracking-wider text-brand-mid">Email</span>
                <span class="font-display font-bold text-brand-dark group-hover:text-brand-orange transition">contact@pyrovigil.fr</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const photoError = ref(false)

const formations = [
  {
    prix: '700 € HT', duree: '/ personne · 1 journée',
    public: 'Professionnels des espaces verts expérimentés',
    titre: 'Opérateur spécialisé en travaux de débroussaillement réglementaire',
    desc: [
      "Réservée aux professionnels expérimentés des espaces verts, cette formation très dense transmet les compétences techniques et réglementaires indispensables pour réaliser des travaux conformes, plus efficaces, et qui conservent — voire améliorent — l'aspect paysager, dans les limites de la propriété bâtie et des terrains non bâtis en zone urbaine. Au-delà de ces limites, les travaux exigent un plan de zonage établi par une autorité ou un bureau d'études compétent.",
      "Évaluation finale par QCM (75 % de bonnes réponses requis) ; les compétences validées sont certifiées numériquement sur la plateforme sécurisée PROCERTIF — infalsifiable, valorisable en un clic sur les réseaux professionnels, et visible dans l'annuaire des entreprises certifiées.",
    ],
    cta: "S'inscrire ou demander une session",
  },
  {
    prix: '350 € HT', duree: '/ personne · ½ journée',
    public: "Professionnels de l'immobilier — agents, syndics, notaires, gestionnaires",
    titre: "Agent immobilier : maîtriser les obligations d'information sur le risque incendie",
    desc: [
      "Réservée aux professionnels de l'immobilier — agents, syndics, notaires, gestionnaires. Depuis le 1er janvier 2025, la loi du 10 juillet 2023 impose l'information des acquéreurs et locataires pour les biens en zone soumise aux OLD : mention sur l'annonce, fiche spécifique dans l'état des risques, attestation de débroussaillement annexée à la promesse et à l'acte. Cette formation courte donne la maîtrise des bases réglementaires, permet de diagnostiquer si un bien est soumis, et transforme la transparence totale en avantage concurrentiel : mieux vendre en développant une image de confiance et de sérieux.",
      'Évaluation finale par QCM (75 % requis), certification numérique PROCERTIF.',
    ],
    cta: "S'inscrire ou demander une session",
  },
  {
    prix: 'Sur devis', duree: '5 journées · nous consulter',
    public: 'Entreprises espaces verts & paysage',
    titre: 'Formation des entreprises espaces verts et paysage',
    desc: [
      "Dans l'attente du nouvel arrêté préfectoral réglementant le débroussaillement dans le Var, un arrêté ministériel devrait très prochainement préciser de nouvelles mesures de protection environnementales articulant les travaux avec les enjeux de protection des espèces et de leurs habitats. Cette formation approfondie de cinq journées permet de découvrir et d'assimiler les finalités du débroussaillement obligatoire et l'ensemble des modalités techniques à mettre en œuvre — le programme détaillé ci-dessous.",
    ],
    cta: 'Demander le programme et les dates',
    procertif: 'https://www.procertif.com/page_pyrovigil_66c7b12d379db',
    programme: [
      "Le respect des espèces végétales, animales et de leurs habitats — en anticipation du futur arrêté préfectoral aligné sur l'arrêté interministériel du 29 mars 2024",
      'Les réglementations applicables : Codes civil et forestier, arrêtés, DT/DICT à proximité des réseaux, emploi du feu, entretien et responsabilité des arbres',
      'Le repérage des défauts biomécaniques et phytosanitaires les plus courants, diagnosticables visuellement',
      'La sélection des essences les moins inflammables et combustibles',
      'Les périodes de réalisation des travaux, périodes réglementées, risque incendie et équipements obligatoires',
      'Les techniques de rupture verticale et horizontale de la continuité du couvert végétal',
      "L'élimination des rémanents de coupe et les bonnes pratiques d'élagage",
      "L'identification et la suppression des « mèches », « échelles » et « capteurs de feux »",
      "L'articulation avec le Code forestier et l'arrêté préfectoral du débroussaillement obligatoire dans le Var",
    ],
  },
]
</script>
