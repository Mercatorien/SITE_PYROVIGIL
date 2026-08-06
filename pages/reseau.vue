<template>
  <div>
    <!-- Hero -->
    <PageHero eyebrow="Réseau national PyroVigil" idx="04"
      title="Les référents du réseau"
      intro="Un interlocuteur unique par département, formé et appuyé en permanence par le bureau d'études central : voici les référents PyroVigil en poste sur votre territoire." />
    <div class="container-x pt-8 flex flex-wrap gap-3">
      <a href="#contact-reseau" class="btn btn-primary">Joindre le référent de mon secteur</a>
      <a href="#candidater" class="inline-flex items-center px-5 py-2.5 rounded-lg border border-brand-dark/20 font-display font-semibold text-brand-dark hover:border-brand-orange hover:text-brand-orange transition">Candidater au réseau</a>
    </div>

    <!-- Le réseau aujourd'hui -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Le réseau aujourd'hui" title="Le réseau existant"
          intro="Le réseau PyroVigil est déjà opérationnel sur cinq départements. Chaque référent est votre interlocuteur unique sur son territoire : il connaît le terrain, les arrêtés préfectoraux locaux et les services de l'État de son secteur, avec l'appui permanent du bureau d'études central." />

        <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-4">
          <!-- Carte des départements couverts -->
          <div class="lg:col-span-5" v-reveal>
            <img :src="asset('/img/carte-reseau.svg')" alt="Carte des départements couverts par le réseau PyroVigil"
              class="w-full max-w-md mx-auto" />
            <ul class="mt-6 space-y-2 text-sm text-brand-dark">
              <li class="flex items-center gap-2.5"><span class="w-3.5 h-3.5 rounded-sm flex-none" style="background:#c44a00"></span> Siège du réseau — Var</li>
              <li class="flex items-center gap-2.5"><span class="w-3.5 h-3.5 rounded-sm flex-none" style="background:#E8651A"></span> Département avec référent en poste</li>
              <li class="flex items-center gap-2.5"><span class="w-3.5 h-3.5 rounded-sm flex-none bg-brand-dark/10 border border-brand-dark/15"></span> À couvrir — intervention directe du bureau d'études</li>
            </ul>
          </div>

          <!-- Référents par département -->
          <div class="lg:col-span-7 space-y-8" v-reveal="100">
            <article v-for="d in departements" :key="d.code" class="flex gap-5">
              <span class="flex-none w-14 h-14 rounded-lg bg-brand-dark text-white font-display font-extrabold text-xl flex items-center justify-center">{{ d.code }}</span>
              <div>
                <h3 class="font-display font-bold text-lg text-brand-dark">
                  {{ d.dep }}
                  <span v-if="d.tag" class="ml-2 font-mono text-[10px] uppercase tracking-wider text-brand-orange align-middle">{{ d.tag }}</span>
                </h3>
                <p class="mt-0.5 text-sm font-semibold text-brand-dark/80">{{ d.referent }}</p>
                <p class="mt-2 text-sm text-brand-mid leading-relaxed">{{ d.bio }}</p>
              </div>
            </article>

            <!-- Votre département -->
            <article class="flex gap-5 border-t border-dashed border-brand-dark/20 pt-8">
              <span class="flex-none w-14 h-14 rounded-lg border-2 border-dashed border-brand-orange/50 text-brand-orange font-display font-extrabold text-2xl flex items-center justify-center">?</span>
              <div>
                <h3 class="font-display font-bold text-lg text-brand-dark">
                  Votre département
                  <span class="ml-2 font-mono text-[10px] uppercase tracking-wider text-brand-mid align-middle">Plus de 50 départements concernés par les OLD</span>
                </h3>
                <p class="mt-2 text-sm text-brand-mid leading-relaxed">Aucun référent n'est encore en poste sur votre secteur ? Le bureau d'études central intervient en direct partout en France — et les candidatures de professionnels confirmés sont bienvenues pour ouvrir ce territoire.</p>
                <a href="#candidater" class="link-arrow mt-3 inline-flex">Devenir référent de ce département
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                </a>
              </div>
            </article>
          </div>
        </div>

        <p class="mt-10 text-sm text-brand-mid">
          Pour joindre le référent de votre secteur :
          <a href="#contact-reseau" class="text-brand-orange font-semibold hover:underline">contactez PyroVigil</a>, nous vous mettons en relation directement.
        </p>
      </div>
    </section>

    <!-- Candidater + ce que vous recevez -->
    <section id="candidater" class="section bg-brand-cream border-y border-brand-dark/10 scroll-mt-24">
      <div class="container-x">
        <SectionHeader eyebrow="Rejoindre le réseau" title="Candidater au réseau"
          intro="Techniciens forestiers confirmés, sapeurs-pompiers FDF3 à FDF5, professionnels DFCI : devenez le référent PyroVigil de votre département, avec les moyens du bureau d'études central derrière vous." />

        <p class="font-mono text-[11px] uppercase tracking-wider text-brand-mid mt-4 mb-6">Ce que vous recevez — les moyens du bureau d'études, à votre échelle</p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <div v-for="(a, i) in avantages" :key="a.titre" v-reveal="(i % 3) * 70" class="bg-white p-7">
            <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-brand-dark">{{ a.titre }}</h3>
            <p class="mt-2 text-sm text-brand-mid leading-relaxed">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Profil des partenaires -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Qui recherchons-nous" title="Le profil des partenaires"
          intro="Nous recrutons des professionnels expérimentés du feu de forêt et de la gestion forestière, capables de porter des études réglementaires exigeantes et une relation client de qualité." />
        <div class="grid md:grid-cols-2 gap-10 lg:gap-16 mt-4">
          <div v-reveal>
            <h3 class="font-display font-bold text-lg text-brand-dark border-b border-brand-orange pb-3">Les profils</h3>
            <ul class="mt-5 space-y-3">
              <li v-for="p in profils" :key="p" class="flex gap-3 text-brand-mid leading-relaxed">
                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
              </li>
            </ul>
          </div>
          <div v-reveal="80">
            <h3 class="font-display font-bold text-lg text-brand-dark border-b border-brand-orange pb-3">Les qualités attendues</h3>
            <ul class="mt-5 space-y-3">
              <li v-for="q in qualites" :key="q" class="flex gap-3 text-brand-mid leading-relaxed">
                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ q }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Étapes -->
    <section class="section bg-brand-dark text-white">
      <div class="container-x">
        <p class="eyebrow mb-3 !text-brand-orange-bright">— Comment nous rejoindre</p>
        <h2 class="font-display font-extrabold text-3xl sm:text-[2.4rem] leading-tight mb-12">Quatre étapes vers le partenariat</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(e, i) in etapes" :key="e.titre" v-reveal="i * 80">
            <span class="font-display font-extrabold text-3xl text-brand-orange-bright">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 font-display font-bold text-lg">{{ e.titre }}</h3>
            <p class="mt-2 text-sm text-white/70 leading-relaxed">{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact réseau -->
    <section id="contact-reseau" class="scroll-mt-24">
      <div class="container-x py-20 sm:py-24 text-center" v-reveal>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark">Un référent près de chez vous ?</h2>
        <p class="mt-5 text-lg text-brand-mid max-w-xl mx-auto">Dites-nous votre département : nous vous mettons en relation avec le référent de votre secteur, ou intervenons en direct depuis le bureau d'études central.</p>
        <NuxtLink to="/contact" class="btn btn-primary mt-9">Contacter le réseau</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// Référents en poste (5 départements opérationnels). Les [placeholders] seront
// remplacés par les fiches réelles des référents.
const departements = [
  {
    code: '83', dep: 'Var', tag: 'Siège du réseau',
    referent: 'Patrick Jeannot · Fondateur & directeur général · La Crau',
    bio: "44 ans d'expertise ONF et DFCI, ancien coordonnateur DFCI du Var et coordinateur sur les grands feux du département dont Gonfaron en 2021. Patrick Jeannot pilote le bureau d'études central : études complexes, marchés publics, appui juridique et formation de l'ensemble des référents du réseau.",
  },
  {
    code: '13', dep: 'Bouches-du-Rhône',
    referent: '[Nom du référent · Titre ou spécialité · Secteur]',
    bio: "[Texte de présentation du référent : parcours, spécialités — OLD, « Défendabilité », DFCI —, secteur d'intervention et références locales. Trois à quatre lignes suffisent.]",
  },
  {
    code: '06', dep: 'Alpes-Maritimes',
    referent: '[Nom du référent · Titre ou spécialité · Secteur]',
    bio: "[Texte de présentation du référent : parcours, spécialités, secteur d'intervention de la bande côtière au moyen-pays, références locales.]",
  },
  {
    code: '33', dep: 'Gironde',
    referent: '[Nom du référent · Titre ou spécialité · Secteur]',
    bio: "[Texte de présentation du référent : parcours, spécialités et connaissance du massif des Landes de Gascogne, fortement exposé depuis les feux de 2022.]",
  },
  {
    code: '40', dep: 'Landes',
    referent: '[Nom du référent · Titre ou spécialité · Secteur]',
    bio: "[Texte de présentation du référent : parcours, spécialités et ancrage dans le plus grand massif forestier cultivé d'Europe occidentale.]",
  },
]

const avantages = [
  { titre: 'Formation & montée en compétence', desc: "Formation initiale complète puis formation continue par PyroVigil, organisme certifié Qualiopi au titre des actions de formation : réglementation OLD, « Défendabilité », DFCI, méthodologie d'étude et relation client." },
  { titre: 'Outils cartographiques exclusifs', desc: 'Accès aux outils professionnels du réseau : application PyrOLD de gestion des OLD à la parcelle, Programme OLD couvrant 48 départements, Kit OLD et modèles de livrables éprouvés.' },
  { titre: 'Appui technique & juridique permanent', desc: "Le bureau d'études central répond à vos questions, relit vos livrables sensibles et prend en charge les études complexes : vous vous concentrez sur le terrain, PyroVigil sécurise le réglementaire." },
  { titre: 'Une marque et une crédibilité', desc: "Vous intervenez sous la marque PyroVigil, portée par 44 ans d'expertise ONF/DFCI, des références nationales et une présence documentée auprès des collectivités et des professionnels." },
  { titre: "Apport d'affaires", desc: 'Les demandes entrantes de votre département (site web, outils en ligne, notoriété du réseau) vous sont orientées. Vous développez en parallèle votre propre portefeuille local.' },
  { titre: 'Un territoire réservé', desc: "Un seul partenaire d'études par département : vous construisez votre activité sur un secteur défini, sans concurrence interne au réseau." },
]

const profils = [
  "Techniciens forestiers confirmés (ONF, coopératives, experts forestiers, bureaux d'études)",
  'Sapeurs-pompiers titulaires des qualifications feux de forêts FDF3 à FDF5',
  'Professionnels DFCI, gestionnaires PIDAF ou équivalents',
]
const qualites = [
  "Solide culture réglementaire (Code forestier, OLD, PPRIF, DECI) ou volonté de l'acquérir via notre formation",
  'Aisance terrain et bases SIG — nos outils font le reste',
  'Autonomie entrepreneuriale : le partenaire exerce en indépendant sur son département',
]
const etapes = [
  { titre: 'Candidature', desc: 'Envoyez-nous votre parcours et le département visé via le formulaire de contact.' },
  { titre: 'Échange & sélection', desc: 'Entretien avec la direction, présentation détaillée du modèle et du contrat de partenariat.' },
  { titre: 'Formation initiale', desc: 'Formation complète à la méthodologie, aux outils et à la réglementation, au siège et à distance.' },
  { titre: 'Lancement', desc: 'Ouverture de votre territoire, premiers dossiers en binôme avec le bureau d\'études central.' },
]
</script>
