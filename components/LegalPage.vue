<template>
  <div>
    <PageHero eyebrow="Informations légales" :title="title" />
    <section class="section">
      <div class="container-x">
        <div class="prose-py" v-reveal>
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>
