<template>
  <div>
    <!-- ══ HERO ══ -->
    <section class="relative overflow-hidden bg-brand-cream border-b border-brand-dark/10">
      <!-- Relief : courbes de niveau réelles, en fond pleine hauteur sur la droite
           (bord droit/haut/bas), estompées vers la gauche. Derrière le contenu. -->
      <img :src="asset('/img/courbes-niveau.webp')" alt="" aria-hidden="true"
        class="hero-contours hidden lg:block pointer-events-none select-none absolute inset-y-0 right-0 z-0 h-full w-[52%] object-cover object-right" />
      <div class="relative z-10 container-x pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7 hero-intro">
          <p class="eyebrow mb-6 fade-up" style="animation-delay:.05s">Experts en défense des forêts contre l'incendie</p>
          <h1 class="font-display font-extrabold text-4xl sm:text-[3.4rem] leading-[1.06] tracking-tight text-brand-dark">
            <span v-for="(t, i) in titreMots" :key="i" class="word-mask">
              <span class="word" :class="t.hl ? 'text-brand-orange' : ''"
                :style="{ animationDelay: (0.15 + i * 0.03) + 's' }">{{ t.w }}</span>
            </span>
          </h1>
          <p class="mt-7 text-lg text-brand-mid max-w-xl leading-relaxed fade-up" style="animation-delay:.62s">
            Bureau d'études spécialisé en défense des forêts contre l'incendie, PyroVigil développe des outils de pointe — obligations de débroussaillement, cartographie de l'aléa, analyse LiDAR — au service des <span class="text-brand-dark font-semibold">collectivités</span>, des <span class="text-brand-dark font-semibold">professionnels</span> et des <span class="text-brand-dark font-semibold">particuliers</span>.
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-6 fade-up" style="animation-delay:.76s">
            <NuxtLink to="/contact" class="btn btn-primary">Demander une démonstration</NuxtLink>
            <NuxtLink to="/prestations" class="link-arrow">Découvrir nos prestations
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Cône de propagation du feu sur relief -->
        <div class="lg:col-span-5 hidden lg:block">
          <div class="relative aspect-square">
            <HeroFireMap />
          </div>
        </div>
      </div>

      <!-- Bandeau de domaines défilant -->
      <div class="relative z-10">
        <MarqueeBand :items="motsCles" />
      </div>
    </section>

    <!-- ══ CHIFFRES CLÉS ══ -->
    <section class="border-b border-brand-dark/10">
      <div class="container-x grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-brand-dark/10">
        <div v-for="s in stats" :key="s.label" class="py-10 px-6 first:pl-0">
          <p class="font-display font-extrabold tracking-tight"
            :class="s.label2 ? 'text-2xl lg:text-[1.7rem] text-brand-orange' : 'text-4xl lg:text-[2.5rem] text-brand-dark'">
            {{ s.value }}
          </p>
          <p class="mt-2 text-sm text-brand-mid leading-snug">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- ══ LE BUREAU D'ÉTUDES ══ -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-5" v-reveal>
          <p class="eyebrow mb-3">— Le bureau d'études</p>
          <h2 class="h-section">Nous protégeons les personnes, les biens et les écosystèmes de l'incendie</h2>
          <div class="mt-10"><BurnedAreaChart /></div>
        </div>
        <div class="lg:col-span-7 lg:pl-2" v-reveal="80">
          <p class="text-xl sm:text-2xl leading-relaxed text-brand-dark font-display font-medium">
            Le réchauffement climatique augmente la sévérité et le nombre des feux, et allonge les périodes de risque.
          </p>
          <p class="mt-6 text-brand-mid leading-relaxed">
            À l'horizon 2050, la surface des forêts métropolitaines exposée à un risque incendie élevé pourrait progresser de près de <span class="text-brand-dark font-semibold">50 %</span> <span class="font-mono text-[11px] text-brand-mid">(Météo-France)</span>, avec une multiplication de feux « hors-normes » face auxquels le modèle français de lutte est jugé insuffisant, notamment au regard des enjeux humains, environnementaux et économiques.
          </p>
          <p class="mt-6 text-brand-mid leading-relaxed">
            <span class="text-brand-dark font-semibold">PyroVigil</span> est un bureau d'études spécialisé dans la résilience et la protection des personnes, des biens et des écosystèmes face aux feux de forêt. Composée de spécialistes issus de l'<span class="text-brand-dark font-semibold">ONF</span> et de la <span class="text-brand-dark font-semibold">DFCI</span>, notre équipe conseille et accompagne propriétaires et gestionnaires dans l'analyse du risque et la mise en sécurité, dans le respect des nombreuses réglementations en vigueur.
          </p>
          <p class="mt-4 text-brand-mid leading-relaxed">
            Nous intervenons depuis l'étude du zonage des <span class="text-brand-dark font-semibold">Obligations Légales de Débroussaillement</span> jusqu'à l'étude technique détaillée d'aménagements accroissant fortement la résilience au feu. Nous accompagnons également acquéreurs, vendeurs et professionnels dans le diagnostic de conformité réglementaire et les attestations obligatoires, et assurons la formation des entreprises de jardins et d'espaces verts aux OLD.
          </p>

          <!-- Engagement environnemental -->
          <div class="mt-10 border-l-2 border-brand-forest pl-5">
            <p class="text-brand-dark leading-relaxed">
              Toutes nos préconisations intègrent la <span class="font-semibold">protection de l'environnement et des paysages</span> : nous protégeons aussi votre cadre de vie et sa biodiversité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ NOS OUTILS EN LIGNE ══ -->
    <section class="section">
      <div class="container-x">
        <p class="eyebrow mb-3">— Nos outils en ligne</p>
        <h2 class="h-section max-w-2xl">Des applications métier, accessibles directement</h2>
        <div class="grid sm:grid-cols-2 gap-px bg-brand-dark/10 border border-brand-dark/10 mt-8">
          <a v-for="o in outils" :key="o.nom" :href="o.url" target="_blank" rel="noopener"
            class="group bg-white p-8 hover:bg-brand-cream/50 transition">
            <div class="flex items-center justify-between gap-4">
              <h3 class="font-display font-bold text-xl text-brand-dark group-hover:text-brand-orange transition">{{ o.nom }}</h3>
              <svg class="w-4 h-4 text-brand-mid group-hover:text-brand-orange transition flex-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9m8 0v8"/></svg>
            </div>
            <p class="mt-3 text-brand-mid leading-relaxed">{{ o.desc }}</p>
            <span class="mt-4 inline-block font-mono text-[11px] uppercase tracking-wider text-brand-orange">{{ o.lien }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ══ NOS PRESTATIONS ══ -->
    <section class="section">
      <div class="container-x">
        <div class="flex items-end justify-between gap-6 mb-10">
          <div>
            <p class="eyebrow mb-3">— Nos prestations</p>
            <h2 class="h-section max-w-2xl">Du diagnostic réglementaire à l'action de terrain</h2>
          </div>
          <NuxtLink to="/prestations" class="link-arrow hidden sm:inline-flex whitespace-nowrap">Tout voir
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
          </NuxtLink>
        </div>

        <!-- # à compléter avec Patrick -->
        <p class="mb-8 inline-block font-mono text-[11px] uppercase tracking-wider text-brand-orange border border-dashed border-brand-orange/40 bg-brand-orange/5 px-3 py-2">
          # Contenu des prestations à compléter avec Patrick
        </p>

        <NuxtLink v-for="(p, i) in prestations" :key="p.title" to="/prestations" v-reveal="i * 70"
          class="group grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 border-t border-brand-dark/10 hover:bg-brand-cream/60 transition -mx-6 px-6">
          <span class="idx md:col-span-1">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="md:col-span-4 font-display font-bold text-xl text-brand-dark group-hover:text-brand-orange transition">{{ p.title }}</h3>
          <p class="md:col-span-6 text-brand-mid leading-relaxed">{{ p.desc }}</p>
          <span class="md:col-span-1 text-right text-brand-orange opacity-0 group-hover:opacity-100 transition">
            <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
          </span>
        </NuxtLink>
        <div class="border-t border-brand-dark/10"></div>
      </div>
    </section>

    <!-- ══ NOTRE SUITE D'OUTILS (vitrine) ══ -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <div v-reveal class="mb-12 sm:mb-14 max-w-2xl">
          <p class="eyebrow mb-3">— Notre suite d'outils</p>
          <h2 class="h-section">Voir la donnée, pas seulement la lire</h2>
          <p class="mt-5 text-brand-mid leading-relaxed">
            Nos outils s'alimentent mutuellement : le moteur génère les OLD, la donnée LiDAR nourrit l'aléa, et PyrOLD restitue et pilote l'ensemble — de la parcelle au terrain.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <!-- 01 · PyrOLD : mini-carto live (ortho + parcelles + installations OLD) -->
          <div v-reveal class="bg-white p-7 flex flex-col">
            <div class="aspect-square overflow-hidden rounded-md border border-brand-dark/10 bg-brand-cream mb-6">
              <ClientOnly>
                <PyroldMiniMap />
                <template #fallback>
                  <div class="w-full h-full flex items-center justify-center font-mono text-[11px] text-brand-mid">carte…</div>
                </template>
              </ClientOnly>
            </div>
            <span class="idx">01</span>
            <h3 class="mt-3 font-display font-bold text-xl text-brand-dark">
              <a href="https://pyrold.fr/" target="_blank" rel="noopener"
                class="inline-flex items-center gap-1.5 hover:text-brand-orange transition group/link">PyrOLD.fr
                <svg class="w-4 h-4 opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M7 17L17 7M17 7H9m8 0v8"/></svg>
              </a>
            </h3>
            <p class="mt-3 text-brand-mid leading-relaxed">Cartographie et pilotage des OLD — du territoire communal à la parcelle.</p>
          </div>

          <!-- 02 · Cartographie de l'aléa (image existante) -->
          <div v-reveal="70" class="bg-white p-7 flex flex-col">
            <div class="aspect-square overflow-hidden rounded-md border border-brand-dark/10 bg-brand-cream mb-6">
              <img :src="asset('/img/old-cuers.webp')" alt="Cartographie de l'aléa — commune de Cuers"
                loading="lazy" decoding="async" class="w-full h-full object-cover" />
            </div>
            <span class="idx">02</span>
            <h3 class="mt-3 font-display font-bold text-xl text-brand-dark">Cartographie de l'aléa</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">Donnée fine à 50 m, méthode transparente, complémentaire de la donnée préfectorale.</p>
          </div>

          <!-- 03 · Analyse LiDAR : visualiseur interactif (iframe) -->
          <div v-reveal="140" class="bg-white p-7 flex flex-col">
            <div class="aspect-square overflow-hidden rounded-md border border-brand-dark/10 bg-brand-dark mb-6">
              <iframe :src="asset('/lidar/index.html')" class="w-full h-full block border-0" loading="lazy"
                title="Visualiseur LiDAR — nuage de points classé (Cuers)"></iframe>
            </div>
            <span class="idx">03</span>
            <h3 class="mt-3 font-display font-bold text-xl text-brand-dark">Analyse LiDAR</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">Biomasse par strate, structure verticale de la végétation et segmentation des houppiers des arbres.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FOCUS PyrOLD ══ -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="border-l-2 border-brand-orange pl-8" v-reveal>
          <p class="eyebrow mb-3">— Notre outil</p>
          <h2 class="h-section">PyrOLD — pilotez vos OLD en ligne</h2>
          <p class="mt-5 text-brand-mid leading-relaxed max-w-lg">
            Cartographie automatique parcelle par parcelle, suivi du débroussaillement, génération des courriers (mises en demeure, LRAR, saisines préfet), mode citoyen et exports en un clic. Hébergé en France, conforme RGPD.
          </p>
          <ul class="mt-7 space-y-3">
            <li v-for="f in pyroldFeatures" :key="f" class="flex items-start gap-3 text-brand-dark">
              <span class="mt-2 w-2 h-2 bg-brand-orange flex-none"></span>{{ f }}
            </li>
          </ul>
          <div class="mt-9 flex flex-wrap items-center gap-6">
            <a href="https://pyrold.fr/" target="_blank" rel="noopener" class="btn btn-primary">Tester la démo</a>
            <NuxtLink to="/pyrold" class="link-arrow">Page produit
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </NuxtLink>
          </div>
        </div>
        <!-- Carrousel des vues produit (desktop) + mockup mobile -->
        <div v-reveal="120" class="pr-3 sm:pr-5">
          <PyroldShowcase />
        </div>
      </div>
    </section>

    <!-- ══ À QUI L'ON S'ADRESSE ══ -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x">
        <p class="eyebrow mb-3 !text-brand-orange-bright">— À qui l'on s'adresse</p>
        <h2 class="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight max-w-2xl">
          Quatre publics, une même exigence de protection
        </h2>
        <div class="mt-14 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <div v-for="(a, i) in publics" :key="a.cat" v-reveal="(i % 2) * 90" class="bg-brand-dark flex flex-col p-7">
            <span class="font-mono text-[11px] uppercase tracking-wider text-brand-orange-bright">{{ a.cat }}</span>
            <h3 class="mt-2 font-display font-bold text-xl text-white">{{ a.sub }}</h3>
            <p class="mt-3 text-sm text-white/60 leading-relaxed flex-1">{{ a.desc }}</p>
            <p class="mt-6 font-mono text-[11px] uppercase tracking-wider text-white/45">{{ a.tags }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ NOS RÉFÉRENCES ══ -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <div class="flex items-end justify-between gap-6 mb-12">
          <div>
            <p class="eyebrow mb-3">— Ils nous font confiance</p>
            <h2 class="h-section max-w-2xl">Références &amp; réalisations</h2>
          </div>
          <NuxtLink to="/references" class="link-arrow hidden sm:inline-flex whitespace-nowrap">Toutes nos références
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
          </NuxtLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <article v-for="(r, i) in references" :key="r.title" v-reveal="(i % 3) * 70" class="bg-white p-7 flex flex-col">
            <div class="flex h-1.5 mb-6 overflow-hidden rounded-full">
              <span v-for="c in r.palette" :key="c" class="flex-1" :style="{ background: c }"></span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-brand-orange/10 text-brand-orange-deep">{{ r.dom }}</span>
              <span class="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-brand-dark/5 text-brand-mid">{{ r.ter }}</span>
            </div>
            <h3 class="font-display font-bold text-lg text-brand-dark leading-snug">{{ r.title }}</h3>
            <p class="mt-3 text-sm text-brand-mid leading-relaxed flex-1">{{ r.desc }}</p>
            <a v-if="r.link" :href="r.link" target="_blank" rel="noopener"
              class="group mt-3 inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-wider text-brand-orange-deep border border-brand-orange/40 hover:bg-brand-orange/10 transition px-2.5 py-1.5 rounded">
              {{ r.linkLabel || 'Voir l\'application' }}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9m8 0v8"/></svg>
            </a>
            <p v-else-if="r.note" class="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-brand-orange border border-dashed border-brand-orange/40 bg-brand-orange/5 px-2 py-1">{{ r.note }}</p>
            <div class="mt-5 pt-4 border-t border-brand-dark/10 flex items-center justify-between font-mono text-[11px] text-brand-mid">
              <span>{{ r.type }}</span><span>{{ r.year }}</span>
            </div>
          </article>
        </div>
        <p class="mt-8 font-mono text-[11px] text-brand-mid max-w-2xl leading-relaxed">
          Les dossiers de particuliers sont présentés de façon anonymisée. Références détaillées et contacts vérifiables sur demande.
        </p>
      </div>
    </section>

    <!-- ══ CTA FINAL ══ -->
    <section class="border-t border-brand-dark/10">
      <div class="container-x py-20 sm:py-28 text-center" v-reveal>
        <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-brand-dark">Parlons de votre commune</h2>
        <p class="mt-5 text-lg text-brand-mid max-w-xl mx-auto">Une démonstration gratuite et sans engagement de 30 minutes suffit à voir ce que PyroVigil peut changer.</p>
        <NuxtLink to="/contact" class="btn btn-primary mt-9">Demander une démonstration</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// Titre découpé en mots pour la révélation masquée (le segment orange est signalé)
const titreMots = [
  ...'Protéger ce qui compte,'.split(' ').map(w => ({ w })),
  ...'conformité et sécurité face aux feux de forêt.'.split(' ').map(w => ({ w, hl: true })),
]

// Bandeau défilant : domaines d'intervention et savoir-faire
const motsCles = [
  'Obligations de débroussaillement',
  'Cartographie de l\'aléa',
  'Analyse LiDAR',
  'Études DFCI',
  'Formations Qualiopi',
  'CCFF',
  'RCSC',
  'Défendabilité',
  'Concertation',
  'Conseil',
  'Volume de biomasse',
  'Aide à la décision',
  'Spatial machine learning & IA',
  'Géomatique',
  'Biodiversité',
  'Ingénierie forestière',
]

const stats = [
  { value: '44', label: 'ans de terrain forestier, dont 25 dédiés à la DFCI' },
  { value: '52', label: 'départements soumis aux OLD couverts' },
  { value: '+400', label: 'expertises de bâtiments incendiés' },
  { value: '+200 km', label: 'de servitudes DFCI traitées' },
  { value: 'Qualiopi', label: 'organisme de formation certifié', label2: true },
]

// Outils en ligne (liens externes) mis en avant sur l'accueil
const outils = [
  { nom: 'PyrOLD', url: 'https://pyrold.fr', lien: 'pyrold.fr',
    desc: "Cartographie, calcul et suivi des OLD à l'échelle communale — jusqu'à la parcelle." },
  { nom: 'CartOrange CCFF', url: 'https://ccff.alwaysdata.net', lien: 'ccff.alwaysdata.net',
    desc: 'Suivi en temps réel des patrouilles des Comités Communaux Feux de Forêts du Var.' },
]

const prestations = [
  { title: 'Cartographie & calcul des OLD', desc: 'Zonage réglementaire précis parcelle par parcelle, calcul des équidistances, exports exploitables.' },
  { title: 'Études DFCI & risque incendie', desc: 'Diagnostics de défendabilité, appui PPRIF, aménagement des interfaces habitat-forêt.' },
  { title: 'Accompagnement des collectivités', desc: 'Contrôles, courriers et mises en demeure, procédure préfectorale historisée.' },
  { title: 'Formations — certifiées Qualiopi', desc: 'Montée en compétence de vos équipes sur les OLD et la DFCI, finançable.' },
]

// Références (réalisations) — reprises de la maquette v21 ; palette = motif discret de la carte
const references = [
  { dom: 'Défendabilité', ter: 'Var', type: 'Collectivité', year: '2025–2026', palette: ['#F5EFEC', '#FCC2A6', '#E36C08'],
    title: 'Étude de défendabilité — Commune de Grimaud',
    desc: '97 zones analysées, 55,6 km de voies expertisées, plus de 8 200 logements évalués : cartographie complète de la défendabilité communale et priorisation des mises aux normes.' },
  { dom: 'Étude OLD', ter: 'Bouches-du-Rhône', type: 'Grand domaine', year: '2025', palette: ['#EDF6ED', '#AFC0AF', '#376436'],
    title: 'Dossier OLD — AFUL de Pont Royal, Mallemort',
    desc: "Étude complète des obligations de débroussaillement d'un domaine résidentiel et de loisirs de 183 hectares : zonage, superpositions, plans parcellaires et correspondances." },
  { dom: 'Outil numérique', ter: 'Var', type: 'Sécurité civile', year: '2026', palette: ['#EBF2F5', '#ABC0D5', '#375F91'],
    title: 'CartOrange — Application des CCFF du Var',
    desc: 'Application de patrouille mise gratuitement à disposition des Comités Communaux Feux de Forêts du Var pour la saison 2026, avec guide opérationnel dédié.',
    link: 'https://ccff.alwaysdata.net/', linkLabel: 'Ouvrir l\'application' },
  { dom: 'Outil numérique', ter: 'France entière', type: 'Accès public', year: '2026', palette: ['#EBF2F5', '#ABC0D5', '#375F91'],
    title: 'Météo des massifs forestiers',
    desc: 'Application de visualisation de la météo des massifs forestiers partout en France, pour anticiper le risque incendie au quotidien.',
    link: 'https://massifs.pyrovigil.fr/', linkLabel: 'Ouvrir l\'application' },
  { dom: 'Étude OLD', ter: 'Var · B.-du-Rhône', type: 'Collectivités', year: '2025–2026', palette: ['#EDF6ED', '#AFC0AF', '#376436'],
    title: 'Plans communaux OLD — Artigues & Mallemort',
    desc: "Études réglementaires et plans de zonage des obligations légales de débroussaillement à l'échelle communale, avec cartographie parcellaire interactive." },
  { dom: 'Défendabilité', ter: 'Var', type: 'Particuliers', year: '2025–2026', palette: ['#F5EFEC', '#FCC2A6', '#E36C08'],
    title: 'Défenses de permis de construire',
    desc: "Notes techniques et analyses contradictoires (défendabilité, PPRIF, accès DECI) à l'appui de dossiers de permis de construire de particuliers en zone exposée." },
]

const publics = [
  {
    cat: 'Collectivités',
    sub: 'Communes, EPCI & services',
    desc: "Pilotez OLD, PIDAF, PAC, PPRIF, RDDECI et défendabilité à l'échelle de votre territoire. Anticipez la mise aux normes des voies d'accès et formez vos équipes techniques, urbanisme et police municipale.",
    tags: 'Plan communal OLD · formation',
    img: 'Garrigue provençale',
  },
  {
    cat: 'Professionnels',
    sub: 'Gestionnaires de sites complexes',
    desc: 'Syndics, ASL, ASA, AFUL, campings, PRL, parcs de loisirs, bailleurs sociaux, exploitants de towercos, parcs photovoltaïques ou éoliens : sécurisez vos sites avec une approche multi-volets — OLD, défendabilité, environnement, paysage.',
    tags: 'Études complexes · DFCI · appui MOA',
    img: "Panache de fumée d'un feu de forêt",
  },
  {
    cat: 'Jardins & espaces verts',
    sub: 'Paysagistes, élagueurs, ETF',
    desc: "Formez-vous aux OLD (Qualiopi, e-learning ou présentiel), certifiez-vous ProCertif et rejoignez le Réseau PYROVIGIL : annuaire client, appui technique et juridique permanent, contrat d'apporteur d'affaires.",
    tags: 'Formations métier · réseau',
    img: '',
  },
  {
    cat: 'Particuliers',
    sub: 'Propriétaires & porteurs de projet',
    desc: "L'OLD protège les personnes, les biens — et la valeur de votre patrimoine : un bien en zonage rouge d'un PPRIF peut perdre une part très importante de sa valeur et se voir interdire extension ou reconstruction, sauf à satisfaire à sa défendabilité réglementaire.",
    tags: 'Étude OLD · diagnostic avant achat',
    img: "Boisement en lisière d'habitations",
  },
]

const pyroldFeatures = [
  'Cartographie automatique des OLD',
  'Suivi du débroussaillement & contrôles',
  'Courriers automatisés (LRAR, préfet)',
  'Mode citoyen et exports PDF / Excel / KML',
]
</script>

<style scoped>
/* Relief de fond du hero : courbes de niveau réelles, cantonnées à droite,
   estompées vers la gauche pour ne pas concurrencer le cône de propagation. */
.hero-contours {
  opacity: .4;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 42%);
  mask-image: linear-gradient(to right, transparent 0%, #000 42%);
  /* Promotion sur une couche GPU dédiée → les animations du hero ne
     re-rasterisent plus le SVG (évite le lag). */
  transform: translateZ(0);
  will-change: transform;
}
</style>
