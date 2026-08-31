<template>
  <div>
    <PageHero eyebrow="Nos prestations" idx="01"
      title="Du diagnostic réglementaire à l'action de terrain"
      intro="PyroVigil couvre toute la chaîne : cartographier les obligations, étudier le risque, accompagner la collectivité, sécuriser un projet et former les équipes." />

    <!-- Les 8 fiches -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Nos expertises" title="Huit domaines d'intervention" />
        <div class="space-y-16 lg:space-y-24 mt-4">
          <article v-for="(f, i) in fiches" :key="f.titre" v-reveal
            class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            <!-- Illustration : viewer LiDAR / image / placeholder carte à intégrer -->
            <div class="lg:col-span-5" :class="i % 2 === 1 ? 'lg:order-2' : ''">
              <div class="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-cream border border-brand-dark/10">
                <ClientOnly v-if="f.map">
                  <PyroldMiniMap />
                  <template #fallback>
                    <div class="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-brand-mid">carte…</div>
                  </template>
                </ClientOnly>
                <iframe v-else-if="f.iframe" :src="asset(f.iframe)" :title="f.titre" loading="lazy"
                  class="absolute inset-0 w-full h-full border-0"></iframe>
                <img v-else-if="f.img && !f.imgError" :src="asset(f.img)" :alt="f.titre"
                  class="absolute inset-0 w-full h-full object-cover" @error="f.imgError = true" />
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <span class="text-2xl opacity-50">🗺</span>
                  <span class="font-mono text-[11px] uppercase tracking-wider text-brand-mid/70 leading-relaxed">{{ f.illustration }}</span>
                </div>
              </div>
            </div>

            <!-- Contenu -->
            <div class="lg:col-span-7" :class="i % 2 === 1 ? 'lg:order-1' : ''">
              <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-2 font-display font-bold text-2xl text-brand-dark leading-snug">{{ f.titre }}</h3>
              <p class="mt-3 text-brand-mid leading-relaxed">{{ f.desc }}</p>

              <dl class="mt-6 space-y-4">
                <div v-for="row in [['Problème', f.probleme], ['Méthode', f.methode], ['Livrable', f.livrable]]" :key="row[0]"
                  class="grid sm:grid-cols-[7rem_1fr] gap-1 sm:gap-4">
                  <dt class="font-mono text-[11px] uppercase tracking-wider text-brand-orange pt-0.5">{{ row[0] }}</dt>
                  <dd class="text-sm text-brand-dark leading-relaxed">{{ row[1] }}</dd>
                </div>
              </dl>

              <p v-if="f.atout" class="mt-5 border-l-2 border-brand-forest pl-4 text-sm text-brand-dark leading-relaxed">
                <span class="font-semibold">Notre atout — </span>{{ f.atout }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Focus notaires -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4" v-reveal>
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Focus</p>
          <h2 class="font-display font-extrabold text-3xl leading-tight">Notaires, vendeurs, bailleurs &amp; acquéreurs</h2>
        </div>
        <div class="lg:col-span-8" v-reveal="80">
          <p class="text-white/80 leading-relaxed">
            Depuis le 12 juillet 2023 (art. L.134-16 du Code forestier), la mutation d'un bien concerné par les OLD est conditionnée au respect de l'obligation, dans la limite de la propriété ; le cédant atteste sur l'honneur. S'y ajoutent la loi Climat et résilience (art. 236), le Code de l'environnement (L.121-5), le décret n° 2022-1289 du 1er octobre 2022 et l'obligation d'information du vendeur (art. 1602 du Code civil).
          </p>
          <ul class="mt-6 space-y-3">
            <li v-for="p in focusNotaires" :key="p" class="flex gap-3 text-white/70 leading-relaxed">
              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange-bright flex-none"></span>{{ p }}
            </li>
          </ul>
          <p class="mt-6 text-sm text-white/60"><span class="text-white font-semibold">Livrable — </span>plan de zonage OLD au droit de la parcelle, attestation sécurisée et estimation détaillée des travaux.</p>
        </div>
      </div>
    </section>

    <!-- Produit — Kit OLD -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div class="lg:col-span-5" v-reveal>
          <p class="eyebrow mb-3">— Produit</p>
          <h2 class="h-section">Kit OLD — particuliers &amp; petits propriétaires</h2>
          <p class="mt-5 text-brand-mid leading-relaxed">Un kit clé en main pour savoir exactement quoi débroussailler, où, et comment le justifier — sans se perdre dans la réglementation.</p>
          <div class="mt-6 space-y-1.5 font-mono text-sm">
            <p class="text-brand-dark"><span class="text-brand-orange font-bold">à partir de 99 € HT</span> · jusqu'à 1 ha (hors PPRIF)</p>
            <p class="text-brand-dark"><span class="text-brand-orange font-bold">199 € HT</span> · 1 à 5 ha (hors PPRIF)</p>
            <p class="text-brand-mid">sur devis au-delà de 5 ha ou en zones PPRIF</p>
          </div>
          <NuxtLink to="/contact" class="btn btn-primary mt-7">Commander mon Kit OLD</NuxtLink>
          <p class="mt-3 text-xs text-brand-mid">Joindre n° de parcelle, section et commune — ou écrire à contact@pyrovigil.fr.</p>
        </div>
        <div class="lg:col-span-7" v-reveal="80">
          <div class="grid sm:grid-cols-2 gap-px bg-brand-dark/10 border border-brand-dark/10">
            <div v-for="k in kitOld" :key="k" class="bg-white p-6 flex gap-3">
              <svg class="w-5 h-5 text-brand-orange flex-none mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span class="text-sm text-brand-dark leading-relaxed">{{ k }}</span>
            </div>
          </div>
          <p class="mt-4 font-mono text-[11px] text-brand-mid">Option — DEFENS'HAB : système automatique d'auto-protection de l'habitat face au feu (présenté sous NDA).</p>
        </div>
      </div>
    </section>

    <CtaBand title="Un projet, une commune, un site à sécuriser ?" cta="Parler de votre besoin" />
  </div>
</template>

<script setup>
const fiches = reactive([
  {
    titre: 'Études de « Défendabilité » & permis de construire',
    desc: "Nous accompagnons acheteurs, constructeurs et pétitionnaires pour démontrer qu'un projet est défendable face au feu et obtenir, sauver ou débloquer une autorisation d'urbanisme.",
    probleme: "100 % des communes varoises sont concernées par le risque incendie. À l'achat comme à l'instruction, un refus ou retrait de permis (R.111-2), un avis défavorable DDTM/SDIS ou des OLD non conformes sur les accès peuvent coûter de plusieurs dizaines à plusieurs centaines de milliers d'euros.",
    methode: "Analyse d'aléa (subi/induit, méthode CEMAGREF), LiDAR HD (houppiers, combustible), vérification OLD, pyrorésistance des constructions, accès des engins et giration, DECI (dimensionnement citerne/PEI), mobilisation de la jurisprudence R.111-2.",
    livrable: "Du diagnostic de faisabilité en amont au dossier de « Défendabilité » complet : étude de danger, avis motivé, prescriptions à intégrer au dossier d'urbanisme.",
    atout: "la jurisprudence de la CAA de Marseille (2026) : un zonage d'aléa ne vaut pas présomption irréfragable ; une démonstration technique quantifiée renverse la charge de la preuve.",
    illustration: 'Carte d\'aléa avant / après travaux (Parc de Cavalaire, « fort à très fort » → « modéré »)',
    img: '/img/prestations-01-defendabilite.jpg', imgError: false,
  },
  {
    titre: 'Plan communal de gestion des OLD (+ PyrOLD)',
    desc: "Nous cartographions et outillons les obligations légales de débroussaillement de toute une commune, de la parcelle au pilotage.",
    probleme: "Le maire exerce la police spéciale des OLD (loi du 10 juillet 2023) ; sans vision des zonages, le contrôle est ingérable et la responsabilité engagée.",
    methode: "Base de données communale, calcul des superpositions d'équidistances parcelle par parcelle, application web PyrOLD (hébergement + maintenance 12 mois inclus). Délais ≈ 5 semaines pour la cartographie, ≈ 3 mois pour l'analyse et la stratégie.",
    livrable: "Cartographie OLD géolocalisée, rapport de priorisation, application PyrOLD, exports PDF / Excel / KML, modèles de courriers automatisés.",
    atout: "l'aide de la Région PACA (50 %, plafonds 8 000 € en phase 1 / 18 000 € en phase 2), et notre transparence : le contrôle OLD n'est pas délégable à un prestataire privé — il relève du maire.",
    illustration: 'Aléa de superposition des OLD colorié par enjeu, avec fiches parcellaires',
    img: '/img/alea-priorisation.webp', imgError: false,
  },
  {
    titre: 'Servitudes DFCI (collectivités)',
    desc: "Nous créons, régularisons et cartographions les servitudes de passage et d'aménagement DFCI des réseaux intercommunaux.",
    probleme: "Réseaux de pistes stratégiques non sécurisés juridiquement, ouvrages non inventoriés, financements européens (FEADER) conditionnés à la régularisation à partir de 2028.",
    methode: "Analyse DFCI et foncière, reconnaissance terrain, notices techniques et environnementales (Natura 2000, PNA), concertation avec les propriétaires, présentation en sous-commission — en groupement avec un géomètre-expert.",
    livrable: "Atlas des servitudes, inventaire des ouvrages (pistes, citernes, aires), dossiers de servitude prêts pour l'arrêté préfectoral.",
    atout: "la chaîne complète — analyse DFCI + montage foncier + notice environnementale — que peu d'acteurs réunissent.",
    illustration: 'Tracé d\'un ouvrage DFCI avec citernes et aires de retournement (E706 « Les Brugassières »)',
    img: '/img/prestations-03-servitudes-dfci.jpg', imgError: false,
  },
  {
    titre: 'OLD des opérateurs de réseaux & grands comptes',
    desc: "Nous cadrons et pilotons les OLD des infrastructures implantées en massif forestier : points hauts télécoms, citernes et réservoirs d'eau, sites industriels.",
    probleme: "Une infrastructure détruite ou inaccessible pendant un feu, c'est un service interrompu au pire moment. L'obligation, lourde, a été étendue à 23 nouveaux départements au 31 mai 2025, sur des parcs souvent multi-sites et multi-départements.",
    methode: "Étude des OLD avec zonages réglementaires, préconisations techniques et environnementales, désignation et matérialisation in situ, guide de rédaction de CCTP en 5 phases, assistance technique / maîtrise d'œuvre.",
    livrable: "Étude par site, CCTP-type, cartographie OLD, planning et clauses administratives, suivi des travaux.",
    atout: "un positionnement grands comptes (gestionnaires nationaux de l'eau, opérateurs télécoms) rare sur le marché, avec un guide méthodologique CCTP dédié (2026).",
    illustration: 'Point haut télécom / réservoir d\'eau en massif avec zone débroussaillée de contention',
    img: '/img/prestation-04.png', imgError: false,
  },
  {
    titre: 'Assistance à maîtrise d\'ouvrage — travaux OLD',
    desc: "Nous accompagnons la collectivité ou le gestionnaire, de la consultation des entreprises jusqu'à la réception des travaux OLD.",
    probleme: "Des travaux mal spécifiés, des offres difficiles à comparer, un calendrier contraint par la réglementation d'accès aux massifs et par les enjeux écologiques.",
    methode: "Rédaction du CCTP de consultation, analyse des offres, mémo ERP / hébergements touristiques, planification de la fenêtre unique de travaux.",
    livrable: "CCTP, rapport d'analyse des offres, plan de phasage.",
    atout: null,
    illustration: 'Planning croisé des fenêtres réglementaires de travaux (accès massif + espèces protégées)',
    img: '/img/pyrold-showcase-4.webp', imgError: false,
  },
  {
    titre: 'Cartographie, SIG & LiDAR HD',
    desc: "Nous produisons la donnée géospatiale de haute précision qui fonde l'analyse du risque.",
    probleme: "Besoin d'une donnée fiable, à jour et reproductible pour décider et instruire.",
    methode: "QGIS, LiDAR HD (classification, hauteurs d'arbres, houppiers, biomasse par strate), télédétection, atlas automatisés, GeoPackages.",
    livrable: "GeoPackages, atlas QGIS, cartes d'aléa et d'accessibilité, exports KML / QField.",
    atout: null,
    illustration: 'Analyse LiDAR (19,4 M points classés ; biomasse arborée 245 947 m², arbustive 46 386 m²)',
    iframe: '/lidar/index.html',
  },
  {
    titre: 'Expertise réglementaire & analyses contradictoires',
    desc: "Nous apportons la contre-expertise et l'appui technique face aux avis de l'administration ou en contentieux.",
    probleme: "Contestation d'un contrôle OLD, d'un avis ONF/DDTM ou d'un classement PPRIF.",
    methode: "Relecture réglementaire, LiDAR HD, argumentaire technique opposable point par point.",
    livrable: "Rapport d'analyse contradictoire, note d'expertise mobilisable en instruction ou en recours.",
    atout: null,
    illustration: 'Superposition « avis de l\'administration vs relevé PyroVigil »',
    img: '/img/prestations-07-expertise-reglementaire.png', imgError: false,
  },
  {
    titre: '« Défendabilité » & plans d\'évacuation — domaines, ERP & sites professionnels',
    desc: "Nous sécurisons les grands domaines résidentiels, copropriétés, ERP et sites professionnels exposés au feu : golfs, campings, PRL, parcs photovoltaïques, ICPE, ASA/ASL, domaines.",
    probleme: "Voies uniques, mise à l'abri des populations, obligations renforcées des ERP et hébergements touristiques, responsabilité du gestionnaire, imbrication habitat-forêt.",
    methode: "Étude de « Défendabilité », cartographie des voies d'évacuation réelles, points de rassemblement, conformité des PEI, priorisation des travaux (QGIS).",
    livrable: "Plan de « Défendabilité », plan d'évacuation et cartographie opérationnelle.",
    atout: "l'articulation DFCI + biodiversité (Natura 2000, espèces protégées), démontrée sur le Domaine de Pont Royal.",
    illustration: 'Plan d\'évacuation d\'un domaine (voies, points de rassemblement, hydrants)',
    map: true,
  },
])

const focusNotaires = [
  'Notaires : sécuriser l\'acte en vérifiant le plan de zonage OLD et la liste des contrôles attestés.',
  'Vendeurs & bailleurs professionnels : obligation d\'information et de conseil ; responsabilité engagée en cas de manquement.',
  'Particuliers : une attestation erronée expose à l\'annulation de la vente ou à une baisse du prix, et jusqu\'à 45 000 € d\'amende et 3 ans de prison.',
]

const kitOld = [
  'Plan de zonage des superpositions réglementaires (OLD, PLU, PPRIF, servitudes, linéaires)',
  'Arrêté préfectoral départemental en vigueur',
  'Modèle de courrier de demande d\'autorisation aux propriétaires voisins',
  'Liste des parcelles impactées avec surfaces à traiter',
  'Fichier KML du zonage pour géolocalisation GPS sur smartphone',
  'Guide pratique OLD 2026',
]
</script>
