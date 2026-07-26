<template>
  <div>
    <PageHero eyebrow="Informations légales" :title="title" />
    <section class="section">
      <div class="container-x">
        <div class="prose-py" v-reveal>
          <p class="font-mono text-xs text-brand-mid mb-8">/* contenu à compléter avec vos informations légales définitives */</p>
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>
