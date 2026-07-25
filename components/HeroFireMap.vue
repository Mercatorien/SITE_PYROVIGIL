<template>
  <!-- Illustration : courbes de niveau fictives + cône de propagation du feu.
       Au chargement : le relief se trace, l'éclosion apparaît, puis le feu se propage. -->
  <!-- viewBox recadré : agrandissement ×1.2 (420 → 350) et contenu décalé vers la droite -->
  <svg viewBox="40 14 350 350" class="w-full h-full" role="img" aria-labelledby="heroFireTitle">
    <title id="heroFireTitle">Schéma d'un cône de propagation d'incendie sur un relief</title>
    <defs>
      <linearGradient id="coneGrad" gradientUnits="userSpaceOnUse" x1="120" y1="320" x2="288" y2="120">
        <stop offset="0%"   stop-color="#E8651A" stop-opacity="0.45" />
        <stop offset="55%"  stop-color="#E8651A" stop-opacity="0.17" />
        <stop offset="100%" stop-color="#E8651A" stop-opacity="0" />
      </linearGradient>

      <!-- Zone débroussaillée : le trou du masque découpe le cône, qui ne peut
           donc pas y pénétrer. Le rayon s'ouvre par animation. -->
      <mask id="protectMask">
        <rect x="0" y="0" width="500" height="500" fill="#fff" />
        <circle class="protect-hole" cx="268" cy="150" r="54" fill="#000" />
      </mask>
    </defs>

    <!-- Relief : courbes de niveau (tracées de l'extérieur vers les sommets) -->
    <g fill="none" stroke="#2E9E3A" stroke-linejoin="round" stroke-linecap="round">
      <path v-for="(c, i) in contours" :key="i" :d="c.d" :opacity="c.o" stroke-width="1.4"
        pathLength="1" class="contour" :style="{ animationDelay: (0.15 + i * 0.05) + 's' }" />
    </g>

    <!-- Cône de propagation, découpé par la zone débroussaillée -->
    <g mask="url(#protectMask)">
      <path class="cone" style="animation-delay:.95s"  d="M 120,320 L 200,73 A 260,260 0 0 1 350,198 Z" fill="url(#coneGrad)" />
      <path class="cone" style="animation-delay:1.05s" d="M 120,320 L 172,158 A 170,170 0 0 1 270,240 Z" fill="#E8651A" opacity="0.15" />
      <path class="cone" style="animation-delay:1.15s" d="M 120,320 L 148,234 A 90,90 0 0 1 199,278 Z"  fill="#E8651A" opacity="0.2" />
    </g>

    <!-- Axe de propagation, arrêté au bord de la zone protégée -->
    <path class="axis" d="M 159,274 L 222,199" pathLength="1" stroke="#E8651A" stroke-width="1.5"
      stroke-dasharray="6 5" opacity="0.7" stroke-linecap="round" fill="none" />
    <path class="arrowhead" d="M 0,0 L -13,4.5 L -13,-4.5 Z" transform="translate(228,191) rotate(-50)" fill="#E8651A" opacity="0.85" />

    <!-- Point d'éclosion -->
    <circle class="spark" cx="120" cy="320" r="13" fill="#E8651A" opacity="0.16" />
    <circle class="spark" cx="120" cy="320" r="5.5" fill="#E8651A" />

    <!-- ── Réponse PyroVigil : l'enjeu et son périmètre débroussaillé ── -->
    <!-- Zone débroussaillée (50 m) : le feu s'arrête à sa limite -->
    <circle class="protect-zone" cx="268" cy="150" r="54" fill="#2E9E3A" fill-opacity="0.07" />
    <circle class="protect-ring" cx="268" cy="150" r="54" pathLength="1"
      fill="none" stroke="#2E9E3A" stroke-width="2.4" stroke-opacity="0.85" />

    <!-- Maison (reprise du logo PyroVigil : toit, cheminée, fenêtre 4 carreaux) -->
    <g transform="translate(268,150)">
      <g class="house">
        <g fill="none" stroke="#2E9E3A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M -25,2 L -10,2" />
          <path d="M -10,2 L -2,-6" />
          <path d="M -5,-3 L 5,-13 L 15,-3" />
          <path d="M 10,-8 L 10,-14 L 13,-14 L 13,-11" />
        </g>
        <g fill="#2E9E3A">
          <rect x="1.4" y="-7.6" width="2.6" height="2.6" rx=".4" />
          <rect x="5.2" y="-7.6" width="2.6" height="2.6" rx=".4" />
          <rect x="1.4" y="-3.8" width="2.6" height="2.6" rx=".4" />
          <rect x="5.2" y="-3.8" width="2.6" height="2.6" rx=".4" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup>
// Courbes de niveau cohérentes : les courbes basses enferment TOUT le massif,
// se resserrent en col, puis se scindent en deux boucles (un sommet chacune).
const contours = [
  { o: 0.15, d: 'M 62,142 C 58,88 100,50 152,48 C 194,46 224,66 242,92 C 268,72 306,68 338,86 C 380,110 396,164 378,212 C 358,264 302,288 254,272 C 232,296 194,304 160,292 C 106,274 66,204 62,142 Z' },
  { o: 0.19, d: 'M 80,140 C 77,95 113,66 156,64 C 192,62 218,80 234,102 C 258,86 290,84 316,100 C 350,122 362,166 347,204 C 331,246 286,264 248,251 C 229,271 197,277 169,267 C 124,251 83,192 80,140 Z' },
  { o: 0.24, d: 'M 98,138 C 96,102 126,80 160,79 C 190,78 211,94 224,113 C 245,101 271,101 292,115 C 319,133 328,168 316,197 C 303,228 268,241 238,230 C 222,246 196,250 173,242 C 138,229 100,178 98,138 Z' },
  { o: 0.30, d: 'M 232,140 C 246,120 274,114 296,126 C 316,137 324,163 314,186 C 303,211 274,221 250,211 C 229,202 220,176 226,156 C 228,149 230,144 232,140 Z' },
  { o: 0.30, d: 'M 114,134 C 114,108 138,90 164,92 C 187,94 202,112 200,134 C 198,158 176,173 152,169 C 130,166 114,152 114,134 Z' },
  { o: 0.38, d: 'M 246,151 C 256,138 276,134 291,143 C 304,151 308,169 301,185 C 293,202 273,208 257,201 C 243,195 238,177 242,163 C 243,158 245,154 246,151 Z' },
  { o: 0.38, d: 'M 128,133 C 128,115 145,103 163,105 C 179,107 189,119 188,134 C 186,150 171,160 155,157 C 140,155 128,145 128,133 Z' },
  { o: 0.48, d: 'M 259,163 C 266,155 279,153 288,159 C 296,164 298,175 293,184 C 288,194 275,197 265,192 C 257,188 255,177 257,169 C 258,166 258,164 259,163 Z' },
  { o: 0.48, d: 'M 141,132 C 141,122 151,115 162,116 C 172,117 178,124 177,133 C 176,143 167,149 157,147 C 148,146 141,140 141,132 Z' },
]
</script>

<style scoped>
/* État final par défaut → en « animations réduites », tout s'affiche directement. */
@media (prefers-reduced-motion: no-preference) {
  /* Le relief se dessine (pathLength=1 rend l'animation indépendante de la longueur) */
  .contour {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: drawPath 1s ease-out both;
  }
  /* Le cône se déploie depuis le point d'éclosion */
  .cone {
    transform-box: view-box;
    transform-origin: 120px 320px;
    animation: growCone .75s cubic-bezier(.22, 1, .36, 1) both;
  }
  .axis {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: drawAxis .6s ease-out both;
    animation-delay: 1.3s;
  }
  .arrowhead { animation: fadeIn .4s ease-out both; animation-delay: 1.8s; }
  .spark     { animation: spark .6s cubic-bezier(.22, 1, .36, 1) both; animation-delay: .8s; }
  /* Réponse PyroVigil : l'enjeu apparaît, puis le débroussaillement repousse le feu */
  .house        { animation: popHouse .55s cubic-bezier(.22, 1, .36, 1) both; animation-delay: 1.9s; }
  /* Le débroussaillement se propage : trou du masque + remplissage vert grandissent ensemble */
  .protect-hole { animation: openHole .65s cubic-bezier(.22, 1, .36, 1) both; animation-delay: 2.1s; }
  .protect-zone { animation: openHole .65s cubic-bezier(.22, 1, .36, 1) both; animation-delay: 2.1s; }
  /* Le contour vert ne se trace QU'APRÈS la fin de la propagation (2.1 + 0.65 = 2.75 s) */
  .protect-ring { animation: drawRing .6s ease-out both; animation-delay: 2.75s; }
}

@keyframes popHouse { from { opacity: 0; transform: scale(.35) } to { opacity: 1; transform: scale(1) } }
/* r est animable en CSS (propriétés géométriques SVG2) ; si non supporté,
   le rayon final de l'attribut s'applique — l'état final reste correct. */
@keyframes openHole { from { r: 0 } to { r: 54 } }
/* Dessin en pointillé (pathLength=1) puis bascule en trait plein → fermeture parfaite */
@keyframes drawRing {
  0%   { stroke-dasharray: 1; stroke-dashoffset: 1; }
  99%  { stroke-dasharray: 1; stroke-dashoffset: 0; }
  100% { stroke-dasharray: none; stroke-dashoffset: 0; }
}
.house { transform-origin: 0px 0px; }

@keyframes drawPath { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes drawAxis { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes growCone { from { transform: scale(.12); opacity: 0 } to { transform: scale(1) } }
@keyframes fadeIn   { from { opacity: 0 } to { opacity: .85 } }
@keyframes spark {
  0%   { transform: scale(0); opacity: 0 }
  60%  { transform: scale(1.35) }
  100% { transform: scale(1) }
}
.spark { transform-box: view-box; transform-origin: 120px 320px; }
</style>
