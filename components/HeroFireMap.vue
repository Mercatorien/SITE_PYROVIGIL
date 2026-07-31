<template>
  <!-- Illustration : courbes de niveau fictives + cône de propagation du feu.
       Au chargement : le relief se trace, l'éclosion apparaît, puis le feu se propage. -->
  <!-- viewBox recadré : contenu décalé vers la droite (marge à gauche) et bord droit
       élargi à 398 pour ne pas couper les courbes de niveau (max x ≈ 396) -->
  <svg viewBox="28 4 370 370" class="w-full h-full" role="img" aria-labelledby="heroFireTitle">
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

    <!-- Le relief (courbes de niveau) est désormais une couche de fond à droite
         (public/img/courbes-niveau.svg), posée derrière ce cône dans index.vue. -->

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
// Le relief (courbes de niveau réelles) est intégré en couche de fond dans le
// hero (index.vue → public/img/courbes-niveau.svg). Ce composant ne dessine plus
// que le cône de propagation, l'axe, l'éclosion et la réponse PyroVigil.
</script>

<style scoped>
/* État final par défaut → en « animations réduites », tout s'affiche directement. */
@media (prefers-reduced-motion: no-preference) {
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
