<template>
  <div>
    <!-- Intro -->
    <section class="section pb-4 sm:pb-6">
      <div class="container-x max-w-3xl" v-reveal>
        <p class="eyebrow mb-3">— Notre réponse</p>
        <h2 class="h-section">Cinq modules pour piloter vos OLD, du bureau au terrain</h2>
        <p class="mt-5 text-brand-mid leading-relaxed">
          PyrOLD.fr calcule et cartographie les OLD de façon homogène et rejouable, paramétrée selon les
          arrêtés préfectoraux en vigueur — puis vous donne les outils pour agir.
        </p>
      </div>
    </section>

    <!-- Navigation sticky des modules -->
    <nav class="sticky top-20 lg:top-24 z-30 bg-white/85 backdrop-blur border-y border-brand-dark/10">
      <div class="container-x flex gap-1.5 overflow-x-auto no-scrollbar py-3">
        <button v-for="m in nav" :key="m.id" type="button" @click="scrollTo(m.id)"
          class="flex-none px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition whitespace-nowrap"
          :class="active === m.id ? 'bg-brand-orange text-white' : 'text-brand-mid hover:text-brand-dark hover:bg-brand-cream'">
          <span class="opacity-60">{{ m.num }}</span> · {{ m.short }}
        </button>
      </div>
    </nav>

    <!-- 01 · MODE CARTE -->
    <section id="carte" class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3">01 — Mode Carte</p>
          <h3 class="h-section">Visualiser d'un coup d'œil les OLD communales</h3>
          <ul class="mt-7 space-y-3.5">
            <li v-for="p in carte.points" :key="p" class="flex items-start gap-3 text-brand-dark leading-relaxed">
              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
            </li>
          </ul>
          <div class="mt-8 border-l-2 border-brand-orange bg-brand-orange/5 pl-5 py-4">
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mb-2">Réponse au besoin métier</p>
            <ul class="space-y-2">
              <li v-for="b in carte.besoin" :key="b" class="flex gap-2 text-brand-dark leading-relaxed">
                <span class="text-brand-orange">→</span>{{ b }}
              </li>
            </ul>
          </div>
        </div>
        <div v-reveal="100">
          <div class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl">
            <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
            </div>
            <img :src="asset('/img/pyrold-showcase-1.webp')" alt="PyrOLD — carte des OLD communales de Cuers"
              loading="lazy" decoding="async" class="w-full block" />
          </div>
        </div>
      </div>
    </section>

    <!-- 02 · MODE PARCELLE (schéma interactif) -->
    <section id="parcelle" class="section bg-brand-cream/50 border-y border-brand-dark/10">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal="100" class="lg:order-last">
          <p class="eyebrow mb-3">02 — Mode Parcelle</p>
          <h3 class="h-section">Analyser les OLD d'une parcelle génératrice</h3>
          <ul class="mt-7 space-y-3.5">
            <li v-for="p in parcelle.points" :key="p" class="flex items-start gap-3 text-brand-dark leading-relaxed">
              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
            </li>
          </ul>
          <div class="mt-8 border-l-2 border-brand-orange bg-brand-orange/5 pl-5 py-4">
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mb-2">Réponse au besoin métier</p>
            <ul class="space-y-2">
              <li v-for="b in parcelle.besoin" :key="b" class="flex gap-2 text-brand-dark leading-relaxed">
                <span class="text-brand-orange">→</span>{{ b }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Schéma : génératrice + anneau OLD 50 m + parcelles tierces -->
        <div v-reveal class="parc-schema">
          <svg viewBox="0 0 440 340" class="w-full">
            <!-- Zone OLD (disque 50 m) -->
            <circle class="old-disc" cx="215" cy="170" r="128" fill="#E8651A" fill-opacity="0.16" />
            <!-- Trame parcellaire (contours seulement, l'orange transparaît) -->
            <g fill="none" stroke="#232323" stroke-width="1.4">
              <rect v-for="(c, i) in cells" :key="i" :x="c.x" :y="c.y" :width="c.w" :height="c.h"
                class="parc" :class="{ gen: c.gen }" />
            </g>
            <!-- Anneau OLD 50 m -->
            <circle class="old-ring" cx="215" cy="170" r="128" fill="none" stroke="#E8651A"
              stroke-width="2" stroke-dasharray="6 5" pathLength="1" />
            <!-- Maison sur la génératrice -->
            <g transform="translate(215,170)" fill="none" stroke="#c44a00" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M -11,4 L -11,-4 L 0,-13 L 11,-4 L 11,4 Z" fill="#c44a00" fill-opacity="0.12" />
              <path d="M -3,4 L -3,-3 L 3,-3 L 3,4" />
            </g>
            <!-- Légendes -->
            <g font-family="'IBM Plex Mono', monospace" font-size="11">
              <text x="215" y="150" text-anchor="middle" fill="#c44a00" font-weight="600">Génératrice</text>
              <text x="215" y="316" text-anchor="middle" fill="#6b6b6b">Anneau OLD — 50 m (réglementaire)</text>
              <text x="70" y="70" text-anchor="middle" fill="#6b6b6b">Parcelle tierce</text>
              <text x="70" y="84" text-anchor="middle" fill="#6b6b6b">impactée</text>
            </g>
          </svg>
          <p class="mt-4 text-center font-mono text-[11px] text-brand-border">Survolez les parcelles</p>
        </div>
      </div>
    </section>

    <!-- 03 · MODE DASHBOARD -->
    <section id="dashboard" class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal>
          <p class="eyebrow mb-3">03 — Mode Dashboard</p>
          <h3 class="h-section">Piloter le débroussaillement à l'échelle communale</h3>
          <ul class="mt-7 space-y-3.5">
            <li v-for="p in dashboard.points" :key="p" class="flex items-start gap-3 text-brand-dark leading-relaxed">
              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
            </li>
          </ul>
          <div class="mt-8 border-l-2 border-brand-orange bg-brand-orange/5 pl-5 py-4">
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mb-2">Réponse au besoin métier</p>
            <ul class="space-y-2">
              <li v-for="b in dashboard.besoin" :key="b" class="flex gap-2 text-brand-dark leading-relaxed">
                <span class="text-brand-orange">→</span>{{ b }}
              </li>
            </ul>
          </div>
        </div>
        <div v-reveal="100">
          <div class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl">
            <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
              <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
            </div>
            <img :src="asset('/img/pyrold-showcase-4.webp')" alt="PyrOLD — tableau de bord et statistiques communales"
              loading="lazy" decoding="async" class="w-full block" />
          </div>
        </div>
      </div>
    </section>

    <!-- PREUVE PAR L'EXEMPLE — VELAUX (compteurs animés) -->
    <section id="velaux-band" class="section bg-brand-dark text-white">
      <div class="container-x">
        <div v-reveal class="max-w-3xl">
          <p class="eyebrow mb-3 !text-brand-orange-bright">— Preuve par l'exemple</p>
          <h2 class="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight">
            Velaux (13) — toute la commune analysée
          </h2>
        </div>
        <div class="mt-12 grid lg:grid-cols-3 gap-10 items-center">
          <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <div v-for="s in velauxStats" :key="s.label" class="bg-brand-dark p-6">
              <p class="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-brand-orange-bright">{{ s.value }}</p>
              <p class="mt-1.5 text-sm text-white/60 leading-snug">{{ s.label }}</p>
            </div>
          </div>
          <!-- Donut suivi -->
          <figure class="flex flex-col items-center">
            <svg viewBox="0 0 120 120" class="w-40 h-40 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="14" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#2E9E3A" stroke-width="14"
                :stroke-dasharray="`${0.56 * circ} ${circ}`" stroke-dashoffset="0" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E8651A" stroke-width="14"
                :stroke-dasharray="`${0.22 * circ} ${circ}`" :stroke-dashoffset="`${-0.56 * circ}`" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#8a94a3" stroke-width="14"
                :stroke-dasharray="`${0.22 * circ} ${circ}`" :stroke-dashoffset="`${-0.78 * circ}`" />
            </svg>
            <figcaption class="mt-5 space-y-1.5 font-mono text-[11px]">
              <p class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background:#2E9E3A"></span>Réalisé — 56 %</p>
              <p class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background:#E8651A"></span>En cours — 22 %</p>
              <p class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background:#8a94a3"></span>À faire — 22 %</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- 04 · TERRAIN -->
    <section id="terrain" class="section">
      <div class="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div v-reveal="100" class="flex justify-center order-last lg:order-first">
          <img :src="asset('/img/pyrold-showcase-mobile.webp')" alt="PyrOLD sur mobile — relevés de terrain géolocalisés"
            loading="lazy" decoding="async" class="w-48 sm:w-56 drop-shadow-2xl" />
        </div>
        <div v-reveal>
          <p class="eyebrow mb-3">04 — Terrain (mobile &amp; tablette)</p>
          <h3 class="h-section">Des relevés de terrain, sans ressaisie</h3>
          <ul class="mt-7 space-y-3.5">
            <li v-for="p in terrain.points" :key="p" class="flex items-start gap-3 text-brand-dark leading-relaxed">
              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
            </li>
          </ul>
          <div class="mt-8 border-l-2 border-brand-orange bg-brand-orange/5 pl-5 py-4">
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mb-2">Réponse au besoin métier</p>
            <ul class="space-y-2">
              <li v-for="b in terrain.besoin" :key="b" class="flex gap-2 text-brand-dark leading-relaxed">
                <span class="text-brand-orange">→</span>{{ b }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 · MODULE COURRIERS -->
    <section id="courriers" class="section bg-brand-cream/50 border-y border-brand-dark/10">
      <div class="container-x">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div v-reveal>
            <p class="eyebrow mb-3">05 — Module Courriers</p>
            <h3 class="h-section">De la génération du courrier au suivi de la procédure</h3>
            <p class="mt-4 text-brand-mid leading-relaxed">
              L'OLD sur les fonds d'autrui impose une procédure écrite formalisée. PyrOLD la génère et la pilote de bout en bout.
            </p>
            <ul class="mt-6 space-y-3.5">
              <li v-for="p in courriers.points" :key="p" class="flex items-start gap-3 text-brand-dark leading-relaxed">
                <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange flex-none"></span>{{ p }}
              </li>
            </ul>
            <div class="mt-8 border-l-2 border-brand-orange bg-brand-orange/5 pl-5 py-4">
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mb-2">Réponse au besoin métier</p>
              <ul class="space-y-2">
                <li v-for="b in courriers.besoin" :key="b" class="flex gap-2 text-brand-dark leading-relaxed">
                  <span class="text-brand-orange">→</span>{{ b }}
                </li>
              </ul>
            </div>
          </div>
          <div v-reveal="100">
            <div class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl">
              <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
                <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
                <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
              </div>
              <img :src="asset('/img/pyrold-showcase-5.webp')" alt="PyrOLD — suivi et génération des courriers"
                loading="lazy" decoding="async" class="w-full block" />
            </div>
          </div>
        </div>

        <!-- Frise interactive de la procédure -->
        <div v-reveal class="mt-16">
          <p class="font-mono text-[11px] uppercase tracking-wider text-brand-mid mb-5">La procédure, pas à pas</p>
          <div class="flex items-stretch gap-2 overflow-x-auto no-scrollbar pb-2">
            <template v-for="(s, i) in statuts" :key="s.label">
              <button type="button" @mouseenter="stepIdx = i" @focus="stepIdx = i" @click="stepIdx = i"
                class="flex-none w-36 text-left p-3 rounded-md border transition"
                :class="stepIdx === i ? 'border-transparent text-white shadow-lg' : 'bg-white border-brand-dark/10 hover:border-brand-dark/25'"
                :style="stepIdx === i ? { background: s.color } : {}">
                <span class="font-mono text-[10px] uppercase tracking-wider"
                  :class="stepIdx === i ? 'text-white/80' : 'text-brand-border'">Étape {{ s.n }}</span>
                <span class="block mt-1 font-display font-bold text-sm leading-snug"
                  :class="stepIdx === i ? 'text-white' : 'text-brand-dark'">{{ s.label }}</span>
              </button>
              <div v-if="i < statuts.length - 1" class="flex-none self-center text-brand-dark/25 font-mono">→</div>
            </template>
          </div>
          <!-- Description de l'étape survolée -->
          <div class="mt-5 flex items-start gap-3 bg-white border border-brand-dark/10 rounded-md p-5">
            <span class="mt-1 w-3 h-3 rounded-full flex-none" :style="{ background: statuts[stepIdx].color }"></span>
            <p class="text-brand-dark leading-relaxed">{{ statuts[stepIdx].desc }}</p>
          </div>
          <!-- Alertes de délai -->
          <div class="mt-5 grid sm:grid-cols-2 gap-3">
            <div v-for="a in alertes" :key="a" class="flex items-center gap-2.5 bg-brand-orange/5 border border-dashed border-brand-orange/40 rounded-md px-4 py-3">
              <svg class="w-4 h-4 text-brand-orange flex-none" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v4l2.5 1.5"/></svg>
              <p class="font-mono text-[11px] text-brand-dark">{{ a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

const nav = [
  { id: 'carte', num: '01', short: 'Carte' },
  { id: 'parcelle', num: '02', short: 'Parcelle' },
  { id: 'dashboard', num: '03', short: 'Dashboard' },
  { id: 'terrain', num: '04', short: 'Terrain' },
  { id: 'courriers', num: '05', short: 'Courriers' },
]

const carte = {
  points: [
    'Couches métier : zonage OLD, parcelles cadastrales (DGFiP), tronçons de route et voies d\'accès, installations soumises (IGN), PLU (GPU), PPRIF (préfets), zonage informatif du débroussaillement (IGN).',
    'Mesure de distances et de superficies, géo-notes (annotations géolocalisées).',
    'Recherche d\'une parcelle, d\'une adresse ou de coordonnées (compatible Google Maps).',
    'Classement de voirie : identifier les OLD linéaires qui incombent à la commune.',
  ],
  besoin: [
    'Une vue globale et immédiate du territoire et de ses obligations réglementaires.',
    'Afficher uniquement les OLD communales (ponctuelles et linéaires) → débroussailler là où c\'est nécessaire, et économiser temps et argent.',
  ],
}
const parcelle = {
  points: [
    'Distinction claire entre la parcelle génératrice et les parcelles tierces impactées.',
    'Superficie, nombre de parcelles traversées, distance réglementaire ; décomposition des surfaces à débroussailler, parcelle par parcelle.',
    'Statut de suivi horodaté (À faire · En cours · Terminé · Non concerné) et commentaires synchronisés.',
    'Export .kml (Google Earth) et fiche .pdf imprimable.',
  ],
  besoin: [
    'Identifier précisément qui doit débroussailler quoi, et sur quelle surface.',
    'Un suivi opérationnel, partagé et traçable — et une preuve des actions réalisées.',
  ],
}
const dashboard = {
  points: [
    'Chiffres clés : parcelles génératrices, parcelles impactées, surfaces OLD.',
    'Distribution des OLD par zone du PLU et par taille.',
    'Suivi global du débroussaillement et consultation des notes.',
    'Téléchargement en lot des fiches .pdf et des .kml.',
  ],
  besoin: [
    'Un véritable tableau de bord de gestion pour décider, prioriser et rendre compte.',
  ],
}
const terrain = {
  points: [
    'Application pensée pour le mobile et la tablette, avec géolocalisation GPS en temps réel.',
    'Consultation des OLD et saisie directe du statut sur site.',
    'Géo-notes et observations synchronisées dans le cloud en temps réel.',
  ],
  besoin: [
    'Faire le lien entre le bureau et le terrain — sans aucune ressaisie.',
  ],
}
const courriers = {
  points: [
    'Génère automatiquement les courriers Word à partir des données SIG (parcelle, surface, axe, PR).',
    'Suit l\'avancement de chaque dossier via 7 statuts de procédure.',
    'Alerte quand un délai est dépassé, et colorise la carte selon l\'avancement.',
    'Export Excel du suivi complet.',
  ],
  besoin: [
    'Gain de temps : plus aucune saisie manuelle des données parcellaires.',
    'Sécurité juridique : historique horodaté de chaque transition de statut (preuve de procédure).',
  ],
}

// Schéma parcelle : trame 3×3, cellule centrale = génératrice
const cells = [
  { x: 20, y: 20, w: 120, h: 90 }, { x: 155, y: 20, w: 120, h: 90 }, { x: 290, y: 20, w: 120, h: 90 },
  { x: 20, y: 125, w: 120, h: 90 }, { x: 155, y: 125, w: 120, h: 90, gen: true }, { x: 290, y: 125, w: 120, h: 90 },
  { x: 20, y: 230, w: 120, h: 90 }, { x: 155, y: 230, w: 120, h: 90 }, { x: 290, y: 230, w: 120, h: 90 },
]

// Frise procédure
const statuts = [
  { n: '1', label: 'À traiter', color: '#8a94a3', desc: 'Dossier identifié dans le SIG, aucun courrier encore envoyé.' },
  { n: '2', label: 'Courrier 1 — Information', color: '#3b82c4', desc: 'Information du propriétaire riverain concerné par l\'OLD.' },
  { n: '3', label: 'Courrier 2 — LRAR', color: '#E8651A', desc: 'Demande d\'autorisation d\'accès au foncier, en lettre recommandée avec accusé de réception.' },
  { n: '4', label: 'Autorisation', color: '#2E9E3A', desc: 'Le propriétaire autorise l\'accès : le débroussaillement peut être réalisé.' },
  { n: '4b', label: 'Refus', color: '#c0392b', desc: 'Le propriétaire refuse — la procédure se poursuit vers la saisine du préfet.' },
  { n: '5', label: 'Saisine préfet', color: '#7d3c98', desc: 'Saisine du préfet (DDT / DDTM) en l\'absence de réponse ou en cas de refus.' },
  { n: '6', label: 'Projet clos', color: '#1B2A3B', desc: 'Procédure terminée et archivée, avec son historique horodaté.' },
]
const stepIdx = ref(0)
const alertes = [
  '60 j sans réponse au courrier 1 → relance en LRAR',
  '30 j sans réponse du propriétaire → saisine du préfet',
]

// Donut Velaux
const circ = 2 * Math.PI * 52

// Compteurs animés Velaux
const targets = { gen: 2378, imp: 5674, old: 931.69, routes: 364.26, lignes: 15.74 }
const c = reactive({ gen: 0, imp: 0, old: 0, routes: 0, lignes: 0 })
const nb = (n) => Math.round(n).toLocaleString('fr-FR')
const nb2 = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const velauxStats = computed(() => [
  { value: nb(c.gen), label: 'parcelles génératrices' },
  { value: nb(c.imp), label: 'parcelles impactées' },
  { value: nb2(c.old) + ' ha', label: 'surface OLD totale' },
  { value: nb2(c.routes) + ' ha', label: 'OLD routes' },
  { value: nb2(c.lignes) + ' ha', label: 'OLD lignes élec.' },
])

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' })
}

const active = ref('carte')
let io = null

function runCounters() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { Object.assign(c, targets); return }
  const t0 = performance.now(), dur = 1500
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3)
    c.gen = targets.gen * e; c.imp = targets.imp * e
    c.old = targets.old * e; c.routes = targets.routes * e; c.lignes = targets.lignes * e
    if (p < 1) requestAnimationFrame(step)
    else Object.assign(c, targets)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting && nav.some(n => n.id === e.target.id)) active.value = e.target.id })
  }, { rootMargin: '-45% 0px -50% 0px' })
  nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })

  const vx = document.getElementById('velaux-band')
  if (vx) {
    const co = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { runCounters(); co.disconnect() } })
    }, { threshold: 0.3 })
    co.observe(vx)
  }
})
onBeforeUnmount(() => { io && io.disconnect() })
</script>

<style scoped>
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* Schéma parcelle : survol des parcelles tierces */
.parc-schema .parc { transition: fill .2s; fill: transparent; }
.parc-schema .parc:not(.gen):hover { fill: rgba(232, 101, 26, 0.18); }
.parc-schema .gen { stroke: #c44a00; stroke-width: 2.6; }

@media (prefers-reduced-motion: no-preference) {
  .parc-schema .old-ring { animation: drawRing 1s ease-out both; }
  .parc-schema .old-disc { transform-origin: 215px 170px; animation: popDisc .8s cubic-bezier(.22,1,.36,1) both; }
}
@keyframes drawRing { from { stroke-dashoffset: 1; stroke-dasharray: 1; } to { stroke-dashoffset: 0; } }
@keyframes popDisc { from { transform: scale(.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>
