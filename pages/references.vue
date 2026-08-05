<template>
  <div>
    <PageHero eyebrow="Expertise & Références"
      title="Une expertise du feu, exigeante et de terrain"
      intro="Des réalisations réelles, des collectivités aux grands domaines : servitudes DFCI intercommunales, plans communaux OLD, défendabilité et permis de construire." />

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

    <!-- Réalisations par catégorie -->
    <section v-for="(cat, ci) in categories" :key="cat.titre"
      class="section" :class="ci % 2 === 1 ? 'bg-brand-cream border-y border-brand-dark/10' : ''">
      <div class="container-x">
        <SectionHeader :eyebrow="cat.eyebrow" :title="cat.titre" :intro="cat.intro" />
        <div class="grid gap-px bg-brand-dark/10 border border-brand-dark/10 mt-4"
          :class="cat.cols2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'">
          <article v-for="(r, i) in cat.items" :key="r.titre" v-reveal="(i % 3) * 60" class="bg-white p-7 flex flex-col">
            <p v-if="r.dep" class="font-mono text-[10px] uppercase tracking-wider text-brand-orange">{{ r.dep }}</p>
            <h3 class="mt-2 font-display font-bold text-lg text-brand-dark leading-snug">{{ r.titre }}</h3>
            <p v-if="r.sub" class="text-xs text-brand-mid mt-0.5">{{ r.sub }}</p>
            <p class="mt-3 text-sm text-brand-mid leading-relaxed flex-1">{{ r.desc }}</p>
          </article>
        </div>
        <p v-if="cat.note" class="mt-4 text-sm text-brand-mid">{{ cat.note }}</p>
      </div>
    </section>

    <!-- Témoignage -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x max-w-3xl" v-reveal>
        <p class="eyebrow mb-6 !text-brand-orange-bright">— Témoignage</p>
        <blockquote class="font-display font-medium text-2xl sm:text-[1.7rem] leading-snug text-white/40 italic">
          « Témoignage à venir — en cours de validation par l'AFUL Générale de Pont Royal. »
        </blockquote>
        <p class="mt-6 text-white/40 text-sm">— [Prénom NOM], [fonction], AFUL Générale de Pont Royal (Mallemort)</p>
      </div>
    </section>

    <!-- Outils déployés -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Outils déployés" title="Nos applications sur le terrain" />
        <div class="grid sm:grid-cols-2 gap-px bg-brand-dark/10 border border-brand-dark/10 mt-4">
          <a v-for="o in outils" :key="o.nom" :href="o.url" target="_blank" rel="noopener" class="group bg-white p-7 hover:bg-brand-cream/50 transition">
            <div class="flex items-center justify-between gap-4">
              <h3 class="font-display font-bold text-lg text-brand-dark group-hover:text-brand-orange transition">{{ o.nom }}</h3>
              <svg class="w-4 h-4 text-brand-mid group-hover:text-brand-orange transition flex-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9m8 0v8"/></svg>
            </div>
            <p class="mt-2 text-sm text-brand-mid leading-relaxed">{{ o.desc }}</p>
          </a>
        </div>
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
        <p class="mt-6 font-mono text-[11px] text-brand-mid">Les dossiers de particuliers sont présentés de façon anonymisée. Références détaillées et contacts vérifiables sur demande.</p>
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

const categories = [
  {
    eyebrow: 'Servitudes DFCI', titre: 'Réseaux intercommunaux',
    intro: 'Création, régularisation et cartographie des servitudes de passage et d\'aménagement DFCI.',
    items: [
      { titre: 'CC du Golfe de Saint-Tropez', dep: '12 communes · Var', desc: "Dossier de servitude de la piste DFCI E706 « Les Brugassières », pour pérenniser un réseau de plus de 234 km de pistes et 116 citernes protégeant plus de 3 000 habitations en interface. La régularisation foncière sécurise l'entretien, l'accès des secours et l'éligibilité au FEADER à l'horizon 2028." },
      { titre: 'CC du Pays de Fayence', dep: 'Var', desc: "Procédure et dossiers de servitudes DFCI du réseau PIDAF : analyse DFCI, concertation avec les propriétaires, présentation en sous-commission. Chaque ouvrage fait l'objet d'une notice technique et environnementale (Natura 2000, PNA Tortue d'Hermann et Lézard ocellé)." },
      { titre: 'CC Cœur du Var', dep: 'Var', desc: "Études de servitudes DFCI sur le réseau de pistes stratégiques : mise en conformité, aires de croisement et reprise d'ouvrages anciens, en lien avec le SDIS. La plus importante référence servitudes de PyroVigil, en accord-cadre." },
    ],
  },
  {
    eyebrow: 'Études communales & domaines', titre: 'Collectivités & grands domaines',
    items: [
      { titre: 'Domaine de Pont Royal — Mallemort', dep: 'Bouches-du-Rhône', sub: 'AFUL Générale de Pont Royal', desc: "Défendabilité sur 198,3 ha et 1 424 parcelles : ~150 ha d'OLD cartographiés au LiDAR HD, une conformité initiale < 10 %, un déficit de points d'eau et 67 virages non conformes, puis un plan d'action et un plan d'évacuation exploitables. L'étude articule défense contre le feu et biodiversité (ZPS Natura 2000 à 74 %, habitat de l'Outarde canepetière)." },
      { titre: 'Grimaud', dep: 'Var', desc: "Diagnostic d'accessibilité des voies de desserte au titre du porter à connaissance risque incendie, intégrant PLU, règlement DECI et PPRIF pour rationaliser les accès et organiser les interfaces habitat-forêt." },
      { titre: 'Artigues', dep: 'Var', desc: "Plan OLD communal et données géospatiales exploitables, remises aux services de la commune sous forme de couches SIG prêtes à l'emploi." },
    ],
    note: 'Également : Velaux et Manosque (SIG réglementaire communal) · GÉOSEL / GÉOMÉTHANE (Alpes-de-Haute-Provence, sites industriels sensibles) · un gestionnaire national de l\'eau (OLD des citernes et réservoirs).',
  },
  {
    eyebrow: 'Permis de construire & défendabilité', titre: 'Dossiers de particuliers (anonymisés)',
    intro: 'Analyses contradictoires et diagnostics de défendabilité pour débloquer, sauver ou obtenir une autorisation d\'urbanisme.',
    cols2: true,
    items: [
      { titre: 'Maison en interface forêt', dep: 'Cavalaire-sur-Mer (83)', desc: "Après deux refus de permis modificatif en zone d'aléa très fort, un diagnostic de synthèse de la défendabilité a posé les bases d'un dossier renégocié avec l'administration, pour ramener le projet dans le cadre de l'article R.111-2 et rouvrir l'instruction." },
      { titre: 'Division parcellaire (3 villas)', dep: 'Six-Fours-les-Plages (83)', desc: "Pré-analyse de faisabilité chiffrant la probabilité d'obtention du permis au regard du risque incendie (R.111-2), appuyée sur l'analyse LiDAR HD des houppiers et la jurisprudence récente de la CAA de Marseille." },
      { titre: 'Villa individuelle', dep: 'Saint-Mandrier-sur-Mer (83)', desc: "Face à une procédure de retrait de permis après avis défavorable du SDIS, réponse point par point aux six motifs et dimensionnement d'une citerne DFCI de 120 m³ : avis motivé favorable, sans extension du linéaire à défendre." },
      { titre: 'Permis d\'aménager « Parc de Cavalaire »', dep: 'Cavalaire-sur-Mer (83)', desc: "Étude de danger incendie avec calcul fin de l'aléa projeté (méthode CEMAGREF), faisant passer le secteur de « fort à très fort » à « modéré » après travaux et OLD. Voirie, DECI et mesures constructives dimensionnées pour un avis favorable." },
    ],
  },
]

const outils = [
  { nom: 'PyrOLD', url: 'https://pyrold.fr', desc: 'Gestion communale des OLD à la parcelle, déployée sur 52 départements.' },
  { nom: 'CartOrange CCFF', url: 'https://ccff.alwaysdata.net', desc: 'Suivi en temps réel des patrouilles des Comités Communaux Feux de Forêts du Var.' },
]

const garanties = [
  'Organisme de formation certifié Qualiopi',
  'Hébergement des données en France / UE',
  'Conformité RGPD',
  'Assurance responsabilité civile professionnelle',
]
</script>
