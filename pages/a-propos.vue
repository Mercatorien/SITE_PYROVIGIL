<template>
  <div>
    <PageHero eyebrow="À propos"
      title="Un bureau d'études à taille humaine, spécialiste du feu de forêt"
      intro="PyroVigil met la donnée et l'expertise au service de la protection des territoires et de leurs habitants." />

    <!-- Mission -->
    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4" v-reveal>
          <p class="eyebrow mb-3">— Notre mission</p>
          <h2 class="h-section">Protéger, simplement</h2>
        </div>
        <div class="lg:col-span-8 lg:pl-8" v-reveal="80">
          <p class="text-xl sm:text-2xl leading-relaxed text-brand-dark font-display font-medium">
            Rendre la gestion du risque incendie et des Obligations Légales de Débroussaillement claire, fiable et accessible à tous les acteurs d'un territoire.
          </p>
          <p class="mt-6 prose-py">PLACEHOLDER — histoire et mission de PyroVigil à compléter (fondation, parcours, ancrage dans le Var).</p>
        </div>
      </div>
    </section>

    <!-- Équipe -->
    <section class="section bg-brand-cream border-y border-brand-dark/10">
      <div class="container-x">
        <SectionHeader eyebrow="L'équipe" title="Des experts complémentaires" intro="PLACEHOLDER — présentation à compléter à partir des CV." />
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-dark/10 border border-brand-dark/10">
          <article v-for="(m, i) in team" :key="m.name" v-reveal="i * 70" class="bg-white p-7">
            <div class="aspect-square rounded-lg bg-brand-cream border border-brand-dark/10 mb-5 flex items-center justify-center font-mono text-[10px] text-brand-border">/* photo */</div>
            <h3 class="font-display font-bold text-brand-dark">{{ m.name }}</h3>
            <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange mt-1">{{ m.role }}</p>
            <p class="mt-3 text-sm text-brand-mid leading-relaxed">{{ m.bio }}</p>
          </article>
        </div>
        <p class="font-mono text-[10px] text-brand-border mt-3">/* noms, rôles et bios à compléter depuis les CV */</p>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="section">
      <div class="container-x">
        <SectionHeader eyebrow="Ce qui nous guide" title="Nos valeurs" />
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(v, i) in valeurs" :key="v.title" v-reveal="i * 80" class="border-t-2 border-brand-orange pt-5">
            <h3 class="font-display font-bold text-xl text-brand-dark">{{ v.title }}</h3>
            <p class="mt-3 text-brand-mid leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup>
// PLACEHOLDER — à compléter depuis les CV. Diana Jeannot confirmée (back-office).
const team = [
  { name: '[Prénom Nom]', role: 'Direction', bio: 'PLACEHOLDER — parcours et expertise.' },
  { name: '[Prénom Nom]', role: 'Expert DFCI / OLD', bio: 'PLACEHOLDER — parcours et expertise.' },
  { name: 'Diana Jeannot', role: 'Pôle back-office', bio: 'PLACEHOLDER — mission au sein du pôle back-office.' },
]
const valeurs = [
  { title: 'Exigence', desc: 'Une donnée précise et une expertise de terrain, sans approximation.' },
  { title: 'Proximité', desc: 'À l\'écoute des territoires, au plus près de leurs réalités.' },
  { title: 'Utilité publique', desc: 'La protection des populations et des paysages comme boussole.' },
]
</script>
