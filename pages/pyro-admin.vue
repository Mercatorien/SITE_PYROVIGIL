<template>
  <div class="min-h-screen bg-brand-cream">
    <div class="container-x py-10">
      <h1 class="font-display font-bold text-2xl text-brand-dark mb-6">PyroVigil — Fréquentation</h1>

      <!-- Connexion -->
      <div v-if="!data" class="max-w-sm bg-white rounded-2xl border border-brand-border p-6">
        <p class="text-sm text-brand-mid mb-3">Accès réservé.</p>
        <input v-model="key" type="password" placeholder="Mot de passe" @keyup.enter="load"
          class="w-full px-3 py-2 rounded-lg border border-brand-border outline-none focus:border-brand-orange" />
        <p v-if="err" class="text-red-500 text-xs mt-2">{{ err }}</p>
        <button @click="load" class="btn btn-primary w-full mt-3">Entrer</button>
      </div>

      <!-- Tableau de bord -->
      <div v-else class="space-y-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-2xl border border-brand-border p-5">
            <p class="font-mono text-3xl font-semibold text-brand-orange">{{ data.total.visites }}</p>
            <p class="text-sm text-brand-mid">visites</p>
          </div>
          <div class="bg-white rounded-2xl border border-brand-border p-5">
            <p class="font-mono text-3xl font-semibold text-brand-dark">{{ data.total.sessions }}</p>
            <p class="text-sm text-brand-mid">sessions</p>
          </div>
          <div class="bg-white rounded-2xl border border-brand-border p-5">
            <p class="font-mono text-3xl font-semibold text-brand-mid">{{ data.total.bots }}</p>
            <p class="text-sm text-brand-mid">bots (exclus)</p>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl border border-brand-border p-5">
            <h2 class="font-display font-semibold text-brand-dark mb-3">Pages les plus vues</h2>
            <table class="w-full text-sm">
              <tr v-for="p in data.parPage" :key="p.path" class="border-b border-brand-border/50">
                <td class="py-1.5 font-mono text-brand-dark">{{ p.path }}</td>
                <td class="py-1.5 text-right text-brand-mid">{{ p.visites }}</td>
              </tr>
            </table>
          </div>
          <div class="bg-white rounded-2xl border border-brand-border p-5">
            <h2 class="font-display font-semibold text-brand-dark mb-3">Villes</h2>
            <table class="w-full text-sm">
              <tr v-for="c in data.parVille" :key="c.city" class="border-b border-brand-border/50">
                <td class="py-1.5 text-brand-dark">{{ c.city }}</td>
                <td class="py-1.5 text-right text-brand-mid">{{ c.visites }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-brand-border p-5">
          <h2 class="font-display font-semibold text-brand-dark mb-3">Visites récentes</h2>
          <table class="w-full text-sm">
            <thead><tr class="text-left text-brand-mid text-xs uppercase">
              <th class="py-1">Date</th><th>Page</th><th>Ville</th><th>Bot</th>
            </tr></thead>
            <tr v-for="(r, i) in data.recentes" :key="i" class="border-t border-brand-border/40">
              <td class="py-1.5 text-brand-mid">{{ new Date(r.created_at).toLocaleString('fr-FR') }}</td>
              <td class="py-1.5 font-mono text-brand-dark">{{ r.path }}</td>
              <td class="py-1.5 text-brand-mid">{{ r.city || '—' }}</td>
              <td class="py-1.5 text-brand-mid">{{ r.is_bot ? 'bot' : '' }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page non liée dans la navigation + non indexée
definePageMeta({ layout: false })
useHead({ title: 'PyroVigil — Admin', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const key = ref(sessionStorage?.getItem?.('pv_admin_key') || '')
const data = ref(null)
const err = ref('')

async function load() {
  err.value = ''
  try {
    data.value = await $fetch('/api/admin/stats', { headers: { 'x-admin-key': key.value } })
    sessionStorage.setItem('pv_admin_key', key.value)
  } catch {
    err.value = 'Mot de passe incorrect'
    data.value = null
  }
}

onMounted(() => { if (key.value) load() })
</script>
