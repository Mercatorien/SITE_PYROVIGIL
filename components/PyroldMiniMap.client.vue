<template>
  <div class="relative w-full h-full">
    <div ref="el" class="w-full h-full pyro-minimap" aria-label="Carte de démonstration PyrOLD — commune de Cuers (extrait)"></div>

    <!-- Invitation à interagir : s'estompe dès la première manipulation -->
    <Transition name="hint">
      <div v-if="showHint" class="pyro-hint" aria-hidden="true">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
        </svg>
        <span>Explorez la carte</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Emprise de démonstration : Cuers (Var). Vue verrouillée autour de ce centre.
const CENTER = [6.056850411428712, 43.249112930041576]
const BOUNDS = [[6.0428, 43.2381], [6.0708, 43.2601]] // [SO, NE] — empêche de trop s'éloigner

// URLs calculées ICI (contexte Nuxt dispo) : asset() ne peut pas être appelé
// plus tard dans le callback map.on('load') (hors contexte → useRuntimeConfig échoue).
const PARCELLES_URL = asset('/data/cuers-demo/parcelles.geojson')
const BATIMENTS_URL = asset('/data/cuers-demo/batiments.geojson')
const OLD_URL = asset('/data/cuers-demo/old.geojson')
const ROUTES_URL = asset('/data/cuers-demo/routes.geojson')

const el = ref(null)
const showHint = ref(true)
let map = null

// Motif hachuré 45° (pour les OLD générées par les routes) — rendu en canvas
function makeHatch(size = 8, color = '#CC0000') {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  ctx.strokeStyle = color
  ctx.lineWidth = 1.3
  for (const off of [-size, 0, size]) {
    ctx.beginPath()
    ctx.moveTo(0 + off, size)
    ctx.lineTo(size + off, 0)
    ctx.stroke()
  }
  return ctx.getImageData(0, 0, size, size)
}

onMounted(async () => {
  // Import dynamique (exports nommés — maplibre-gl v5 n'a pas d'export default).
  // MapLibre reste hors du bundle serveur et du bundle principal.
  const { Map: MlMap } = await import('maplibre-gl')
  await import('maplibre-gl/dist/maplibre-gl.css')
  if (!el.value) return

  map = new MlMap({
    container: el.value,
    center: CENTER,
    zoom: 16,
    minZoom: 14,
    maxZoom: 19,
    maxBounds: BOUNDS,
    attributionControl: false,
    style: {
      version: 8,
      sources: {
        ortho: {
          type: 'raster',
          tiles: [
            'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
            '&LAYER=HR.ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM' +
            '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
          ],
          tileSize: 256,
        },
      },
      layers: [{ id: 'ortho', type: 'raster', source: 'ortho' }],
    },
  })

  // L'indice disparaît à la première manipulation (pan ou zoom)
  map.once('movestart', () => { showHint.value = false })

  map.on('load', async () => {
    try {
      if (!map.hasImage('hatch-old-route')) {
        map.addImage('hatch-old-route', makeHatch(), { pixelRatio: 1 })
      }

      const [parcelles, batiments, old, routes] = await Promise.all([
        fetch(PARCELLES_URL).then(r => r.json()),
        fetch(BATIMENTS_URL).then(r => r.json()),
        fetch(OLD_URL).then(r => r.json()),
        fetch(ROUTES_URL).then(r => r.json()),
      ])

      map.addSource('old', { type: 'geojson', data: old })
      map.addSource('parcelles', { type: 'geojson', data: parcelles })
      map.addSource('routes', { type: 'geojson', data: routes })
      map.addSource('batiments', { type: 'geojson', data: batiments })

      const GEN = ['!=', ['get', 'id_parc'], 'route']
      const ROUTE = ['==', ['get', 'id_parc'], 'route']

      // OLD des parcelles génératrices : remplissage catégoriel par id_parc
      map.addLayer({
        id: 'old-fill', type: 'fill', source: 'old', filter: GEN,
        paint: { 'fill-color': ['get', '_color'], 'fill-opacity': 0.45 },
      })
      map.addLayer({
        id: 'old-line', type: 'line', source: 'old', filter: GEN,
        paint: { 'line-color': ['get', '_color'], 'line-width': 1, 'line-opacity': 0.85 },
      })
      // OLD des routes : hachures rouges 45° + contour rouge
      map.addLayer({
        id: 'old-route-fill', type: 'fill', source: 'old', filter: ROUTE,
        paint: { 'fill-pattern': 'hatch-old-route', 'fill-opacity': 0.9 },
      })
      map.addLayer({
        id: 'old-route-line', type: 'line', source: 'old', filter: ROUTE,
        paint: { 'line-color': '#CC0000', 'line-width': 0.9, 'line-opacity': 0.9 },
      })
      // Parcelles : contour fin sombre
      map.addLayer({
        id: 'parcelles-line', type: 'line', source: 'parcelles',
        paint: { 'line-color': '#232323', 'line-width': 0.8, 'line-opacity': 0.55 },
      })
      // Routes : lignes noires
      map.addLayer({
        id: 'routes-line', type: 'line', source: 'routes',
        paint: { 'line-color': '#232323', 'line-width': 2, 'line-opacity': 0.9 },
      })
      // Installations soumises à débroussaillement : contour jaune, sans remplissage
      map.addLayer({
        id: 'batiments-line', type: 'line', source: 'batiments',
        paint: { 'line-color': '#F5CF27', 'line-width': 1.6 },
      })
    } catch (e) {
      // silencieux : la carte reste utilisable avec l'ortho seule
    }
  })
})

onBeforeUnmount(() => { map?.remove(); map = null })
</script>

<style scoped>
.pyro-minimap :deep(.maplibregl-ctrl-attrib) {
  display: none;
}

/* Indice d'interaction */
.pyro-hint {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border-radius: 999px;
  background: rgba(27, 42, 59, 0.72);
  color: #fff;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
  pointer-events: none;
  white-space: nowrap;
  animation: hint-float 2.6s ease-in-out infinite;
}

@keyframes hint-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(-4px); }
}

.hint-enter-active, .hint-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.hint-enter-from, .hint-leave-to { opacity: 0; transform: translateX(-50%) translateY(6px); }

@media (prefers-reduced-motion: reduce) {
  .pyro-hint { animation: none; }
}
</style>
