<template>
  <div>
    <PageHero eyebrow="PyrOLD.fr — notre plateforme" idx="03"
      title="Rendre les Obligations Légales de Débroussaillement lisibles"
      intro="Une plateforme qui calcule, cartographie et pilote les OLD de façon reproductible — du territoire communal à la parcelle, jusqu'au terrain." />

    <!-- Aperçu -->
    <section class="section">
      <div class="container-x">
        <div v-reveal class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl max-w-4xl mx-auto">
          <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
            <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
            <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
          </div>
          <img :src="asset('/img/pyrold-carte.webp')" alt="PyrOLD — carte des OLD communales avec couches métier"
            loading="lazy" decoding="async" class="w-full block" />
        </div>
        <div class="text-center mt-8" v-reveal>
          <a href="https://pyrold.fr/" target="_blank" rel="noopener" class="btn btn-primary">Voir la démonstration</a>
        </div>
      </div>
    </section>

    <!-- L'enjeu -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4" v-reveal>
          <p class="eyebrow mb-3">— L'enjeu</p>
          <h2 class="h-section">Un risque qui progresse, une responsabilité qui s'affirme</h2>
        </div>
        <div class="lg:col-span-8 lg:pl-8" v-reveal="80">
          <div class="grid sm:grid-cols-2 gap-8 mb-8">
            <div v-for="k in enjeu" :key="k.value" class="border-t-2 border-brand-orange pt-4">
              <p class="font-display font-extrabold text-3xl text-brand-dark">{{ k.value }}</p>
              <p class="mt-1.5 text-brand-mid leading-relaxed">{{ k.label }}</p>
            </div>
          </div>
          <p class="font-mono text-[11px] text-brand-border mb-8">Source : Observatoire des forêts françaises, BDIFF</p>

          <p class="text-brand-mid leading-relaxed max-w-2xl">
            Face à ce constat, les Obligations Légales de Débroussaillement sont un levier de prévention majeur. Depuis la <span class="text-brand-dark font-semibold">loi du 10 juillet 2023</span>, leur contrôle relève de la compétence du maire : informer, contrôler, mettre en demeure. Un défaut de contrôle peut engager sa <span class="text-brand-dark font-semibold">responsabilité juridique</span> en cas de sinistre.
          </p>
        </div>
      </div>
    </section>

    <!-- La complexité -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Le problème" title="Établir un zonage OLD fiable est loin d'être simple" />
        <div class="grid md:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <div v-for="(o, i) in obstacles" :key="o.title" v-reveal="i * 70" class="bg-white p-8">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-brand-dark">{{ o.title }}</h3>
            <p class="mt-2 text-brand-mid leading-relaxed">{{ o.desc }}</p>
          </div>
        </div>
        <p class="mt-8 text-xl leading-relaxed text-brand-dark font-display font-medium max-w-3xl" v-reveal>
          Résultat pour les communes, EPCI, SDIS et propriétaires fonciers : une information dispersée, difficile à opérationnaliser sur le terrain.
        </p>
      </div>
    </section>

    <!-- La réponse : les modules -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x">
        <div v-reveal class="mb-14 max-w-3xl">
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Notre réponse</p>
          <h2 class="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight">
            Un calcul reproductible, paramétrable selon chaque arrêté préfectoral
          </h2>
          <p class="mt-5 text-white/70 leading-relaxed">
            PyrOLD.fr calcule et cartographie les OLD de façon homogène et rejouable, paramétrée selon les arrêtés préfectoraux en vigueur — puis vous donne les outils pour agir.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <article v-for="(m, i) in modules" :key="m.title" v-reveal="i * 70" class="bg-brand-dark p-7">
            <div class="aspect-[16/9] overflow-hidden rounded-md border border-white/10 mb-6 bg-white/5">
              <img :src="asset(m.img)" :alt="m.alt" loading="lazy" decoding="async" class="w-full h-full object-cover" />
            </div>
            <span class="font-mono text-sm text-brand-orange-bright">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-lg">{{ m.title }}</h3>
            <p class="mt-2 text-sm text-white/60 leading-relaxed">{{ m.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Mode citoyen + terrain -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3">— Mode citoyen &amp; terrain</p>
          <h2 class="h-section">De la mairie au terrain, et jusqu'à l'administré</h2>
          <div class="mt-8 space-y-6">
            <div class="border-t border-brand-dark/10 pt-4">
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">Mode citoyen</p>
              <p class="mt-2 text-brand-dark leading-relaxed">
                La commune met <span class="font-semibold">gratuitement</span> à disposition de ses administrés le zonage réglementaire qui les concerne : chacun consulte sa parcelle et imprime son plan.
              </p>
            </div>
            <div class="border-t border-brand-dark/10 pt-4">
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">Ordinateur &amp; mobile</p>
              <p class="mt-2 text-brand-dark leading-relaxed">
                Une application accessible sur ordinateur comme sur mobile, avec <span class="font-semibold">géolocalisation</span> pour le suivi de terrain, sans ressaisie.
              </p>
            </div>
          </div>
        </div>
        <div v-reveal="120" class="flex justify-center">
          <img :src="asset('/img/pyrold-mobile.webp')" alt="PyrOLD sur mobile : consultation des OLD et relevés géolocalisés sur le terrain"
            loading="lazy" decoding="async"
            class="max-h-[520px] w-auto rounded-2xl border border-brand-dark/10 shadow-2xl" />
        </div>
      </div>
    </section>

    <!-- Sécurité -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3">— Sécurité &amp; conformité</p>
          <h2 class="h-section">Vos données protégées</h2>
        </div>
        <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          <li v-for="(s, i) in security" :key="s" v-reveal="i * 60" class="flex items-start gap-3 border-t border-brand-dark/10 pt-4">
            <span class="mt-1.5 w-2 h-2 bg-brand-orange flex-none"></span>
            <span class="text-brand-dark">{{ s }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Punchline -->
    <section class="section">
      <div class="container-x max-w-3xl text-center" v-reveal>
        <p class="font-display font-extrabold text-3xl sm:text-[2.4rem] leading-snug text-brand-dark">
          Transformer une obligation réglementaire complexe en <span class="text-brand-orange">plan d'action opérationnel</span>.
        </p>
        <a href="https://pyrold.fr/" target="_blank" rel="noopener" class="btn btn-primary mt-9">Voir la démonstration</a>
      </div>
    </section>

    <!-- Témoignage -->
    <section class="section bg-brand-cream border-t border-brand-dark/10">
      <figure class="container-x max-w-3xl" v-reveal>
        <svg class="w-10 h-10 text-brand-orange mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A2.67 2.67 0 0 1 8.17 8.5V6zm11 0A5.17 5.17 0 0 0 13 11.17V18h6.83v-6.83H16.5a2.67 2.67 0 0 1 2.67-2.67V6z"/></svg>
        <blockquote class="font-display font-semibold text-2xl sm:text-3xl leading-snug text-brand-dark">« PLACEHOLDER — témoignage d'une commune utilisatrice de PyrOLD, à intégrer. »</blockquote>
        <figcaption class="mt-6 text-sm text-brand-mid">Maire de [commune] — [département]</figcaption>
      </figure>
    </section>

    <CtaBand title="Voir PyrOLD sur votre commune" text="Une démonstration de 30 minutes, sur vos données réelles, gratuite et sans engagement." cta="Demander une démonstration" />
  </div>
</template>

<script setup>
const enjeu = [
  { value: '~60 000 ha', label: 'brûlés en 2022, année record' },
  { value: '47 %', label: 'des départs de feu à l\'interface habitat-forêt' },
]

const obstacles = [
  { title: 'Un cadre général', desc: 'Le Code forestier pose le cadre, mais ne descend pas au niveau opérationnel.' },
  { title: '48 arrêtés différents', desc: 'Chaque préfecture fixe ses propres modalités — distances, zones concernées, cas particuliers — sur les 52 départements couverts.' },
  { title: 'Un croisement de données', desc: 'Le calcul implique de croiser cadastre, bâti, réseaux, PLU, PPRIF… à l\'échelle de milliers de parcelles.' },
]

const modules = [
  { title: 'Cartographie des OLD communales', desc: 'Enjeux ponctuels et linéaires : ce qui incombe réellement à la commune.', img: '/img/pyrold-carte.webp', alt: 'Carte des OLD communales' },
  { title: 'Suivi du débroussaillement', desc: 'Statut horodaté par parcelle chez les administrés, commentaires et preuves d\'action.', img: '/img/pyrold-parcelle.webp', alt: 'Analyse et suivi d\'une parcelle génératrice' },
  { title: 'Courriers sur fonds d\'autrui', desc: 'Génération et suivi des courriers : information, demande d\'accès (LRAR), saisine du préfet.', img: '/img/pyrold-courrier.webp', alt: 'Module de gestion des courriers' },
  { title: 'Plan de priorisation', desc: 'Croisement aléa × OLD : traiter d\'abord les secteurs où le risque est maximal.', img: '/img/alea-priorisation.webp', alt: 'Croisement aléa et OLD pour la priorisation' },
]

const security = [
  'Hébergement en France et en Union européenne',
  'Sauvegardes sécurisées quotidiennes',
  'Conforme au RGPD',
  'Accès par rôles (agents, élus, citoyens)',
]
</script>
