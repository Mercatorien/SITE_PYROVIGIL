<template>
  <div>
    <PageHero eyebrow="Informations légales" :title="title" />
    <section class="section">
      <div class="container-x">
        <!-- Pas de v-reveal ici : les pages légales sont de longs blocs de texte
             plus hauts que l'écran ; l'animation d'apparition (opacity 0 tant que
             l'élément n'a pas atteint le seuil d'intersection) les laisserait
             invisibles. Le contenu doit toujours s'afficher. -->
        <div class="prose-py">
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>
