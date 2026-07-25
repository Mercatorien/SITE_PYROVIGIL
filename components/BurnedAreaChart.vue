<template>
  <figure v-reveal>
    <figcaption class="flex flex-wrap items-baseline justify-between gap-3 mb-6">
      <h3 class="font-display font-bold text-lg text-brand-dark">Surfaces brûlées par les feux de forêt en France métropolitaine</h3>
      <span class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">hectares / an</span>
    </figcaption>

    <div>
      <svg :viewBox="`0 0 ${W} ${H}`" class="w-full" @mouseleave="hover = null" role="img"
        aria-label="Graphique des surfaces brûlées par les feux de forêt en France métropolitaine, par année.">
        <!-- Grille + axe Y -->
        <g>
          <line v-for="t in yTicks" :key="'g' + t" :x1="padL" :x2="W - padR" :y1="y(t)" :y2="y(t)"
            stroke="#e5e0d8" stroke-width="1" />
          <text v-for="t in yTicks" :key="'y' + t" :x="padL - 8" :y="y(t) + 3" text-anchor="end" class="ax">{{ t }} k</text>
        </g>

        <!-- Barres -->
        <g v-for="(d, i) in data" :key="d.year" @mouseenter="hover = i" @focusin="hover = i" tabindex="0"
          :aria-label="`${d.year} : ${fmt(d.v)} hectares`" class="outline-none">
          <rect :x="bx(i)" :y="y(d.v)" :width="bw" :height="y0 - y(d.v)" :fill="color(d)"
            :opacity="hover === null || hover === i ? 1 : 0.45" rx="2.5"
            class="bar" :style="{ transitionDelay: i * 0.04 + 's' }" />
          <text :x="bx(i) + bw / 2" :y="H - padB + 18" text-anchor="middle" class="xl">{{ d.year }}</text>
          <text v-if="hover === i" :x="bx(i) + bw / 2" :y="y(d.v) - 9" text-anchor="middle" class="val">{{ fmt(d.v) }} ha</text>
        </g>

        <!-- Ligne de moyenne (au-dessus des barres) -->
        <line :x1="padL" :x2="W - padR" :y1="y(avg)" :y2="y(avg)" stroke="#1c5e1e" stroke-width="1.5" stroke-dasharray="5 4" />
        <text :x="padL + 6" :y="y(avg) - 6" class="avg">Moyenne 2006-2021 · {{ avg }} 000 ha</text>
      </svg>
    </div>

    <figcaption class="mt-3 font-mono text-[11px] text-brand-mid">
      Sources : ONF / PROMÉTHÉE · rapports annuels ONF-DGPR.
    </figcaption>
  </figure>
</template>

<script setup>
// Valeurs en milliers d'hectares (à ajuster avec vos chiffres définitifs).
const data = [
  { year: 2015, v: 16 },
  { year: 2016, v: 7.5 },
  { year: 2017, v: 21 },
  { year: 2018, v: 13 },
  { year: 2019, v: 11 },
  { year: 2020, v: 17.5 },
  { year: 2021, v: 31 },
  { year: 2022, v: 60, record: true },
  { year: 2023, v: 9 },
  { year: 2024, v: 14.5 },
  { year: 2025, v: 29 },
]
const avg = 15   // moyenne 2006-2021 (en milliers d'ha)

// Géométrie
const W = 760, H = 360, padL = 46, padR = 16, padT = 18, padB = 34
const y0 = H - padB
const yMax = 65
const yTicks = [0, 10, 20, 30, 40, 50, 60]
const plotW = W - padL - padR
const slot = plotW / data.length
const bw = slot * 0.6

const y = (v) => y0 - (v / yMax) * (y0 - padT)
const bx = (i) => padL + i * slot + (slot - bw) / 2
const fmt = (v) => Math.round(v * 1000).toLocaleString('fr-FR')
const color = (d) => (d.record ? '#c44a00' : d.v < avg ? '#2E9E3A' : '#E8651A')

const hover = ref(null)
</script>

<style scoped>
.ax  { fill: #8a8a8a; font-size: 11px; font-family: 'IBM Plex Mono', monospace; }
.xl  { fill: #6b6b6b; font-size: 11px; font-family: 'IBM Plex Mono', monospace; }
.avg { fill: #1c5e1e; font-size: 11px; font-family: 'IBM Plex Mono', monospace; }
.val { fill: #232323; font-size: 13px; font-weight: 700; font-family: 'Montserrat', sans-serif; }

.bar { transform-box: fill-box; transform-origin: bottom; cursor: default; transition: opacity .2s; }

/* Croissance des barres à l'apparition (uniquement si animations autorisées et
   observer actif). Sinon : barres pleines d'emblée → jamais de graphique vide. */
:global(.reveal-ready) .reveal .bar {
  transform: scaleY(0);
  transition: transform .7s cubic-bezier(.22, 1, .36, 1), opacity .2s;
}
:global(.reveal-ready) .reveal.is-visible .bar { transform: scaleY(1); }
</style>
