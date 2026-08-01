<template>
  <div>
    <PageHero eyebrow="Contact"
      title="Parlons de votre projet"
      intro="Une démonstration, un devis ou une simple question : nous vous répondons rapidement." />

    <section class="section">
      <div class="container-x grid lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- Formulaire -->
        <div class="lg:col-span-7" v-reveal>
          <form v-if="!sent" @submit.prevent="submit" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <label class="block">
                <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Nom *</span>
                <input v-model="form.nom" required class="field" />
              </label>
              <label class="block">
                <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Organisation</span>
                <input v-model="form.organisation" class="field" placeholder="Commune, entreprise…" />
              </label>
            </div>
            <div class="grid sm:grid-cols-2 gap-5">
              <label class="block">
                <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Email *</span>
                <input v-model="form.email" type="email" required class="field" />
              </label>
              <label class="block">
                <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Téléphone</span>
                <input v-model="form.telephone" class="field" />
              </label>
            </div>
            <label class="block">
              <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Objet</span>
              <select v-model="form.objet" class="field">
                <option value="demo">Demander une démonstration</option>
                <option value="devis">Demander un devis</option>
                <option value="question">Une question</option>
                <option value="reseau">Rejoindre le réseau</option>
              </select>
            </label>
            <label class="block">
              <span class="block text-sm font-display font-semibold text-brand-dark mb-1.5">Message *</span>
              <textarea v-model="form.message" required rows="5" class="field resize-y"></textarea>
            </label>
            <!-- honeypot -->
            <input v-model="form.website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
            <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
            <button type="submit" :disabled="loading" class="btn btn-primary disabled:opacity-60">
              {{ loading ? 'Envoi…' : 'Envoyer' }}
            </button>
          </form>

          <div v-else class="border border-brand-orange/40 bg-brand-cream rounded-lg p-8" v-reveal>
            <h3 class="font-display font-bold text-xl text-brand-dark">Message envoyé</h3>
            <p class="mt-2 text-brand-mid">Merci, nous revenons vers vous rapidement. Pour une demande urgente, appelez-nous au 06 51 37 86 10.</p>
          </div>
        </div>

        <!-- Coordonnées -->
        <aside class="lg:col-span-5" v-reveal="100">
          <div class="border-t border-brand-dark/10 pt-5 space-y-6">
            <div>
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">Téléphone</p>
              <a href="tel:0651378610" class="mt-1 block font-display font-bold text-xl text-brand-dark hover:text-brand-orange">06 51 37 86 10</a>
            </div>
            <div>
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand-orange">Adresse</p>
              <p class="mt-1 text-brand-dark">49 Rue des Tournesols<br>83260 La Crau</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({ title: 'Contact — PyroVigil' })
const form = reactive({ nom: '', organisation: '', email: '', telephone: '', objet: 'demo', message: '', website: '' })
const loading = ref(false), sent = ref(false), error = ref('')

async function submit() {
  loading.value = true; error.value = ''
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e) {
    error.value = e?.data?.message || 'Une erreur est survenue. Réessayez ou appelez-nous.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.field {
  @apply w-full px-4 py-2.5 rounded-md border border-brand-dark/20 bg-white text-brand-dark outline-none transition;
}
.field:focus { @apply border-brand-orange ring-2 ring-brand-orange/30; }
</style>
