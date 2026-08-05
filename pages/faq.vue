<template>
  <div>
    <PageHero eyebrow="FAQ" idx="?"
      title="Vos questions sur les OLD"
      intro="Obligations de débroussaillement, contrôle, vente d'un bien, environnement : les réponses claires et sourcées de PyroVigil." />

    <section class="section">
      <div class="container-x max-w-4xl">

        <!-- Recherche -->
        <div class="relative mb-6">
          <svg class="w-5 h-5 text-brand-mid absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.3-4.3"/></svg>
          <input v-model="search" type="text" placeholder="Rechercher une question…"
            class="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-dark/15 bg-white text-brand-dark focus:outline-none focus:border-brand-orange transition" />
        </div>

        <!-- Puces de navigation par catégorie -->
        <div v-if="!search" class="flex flex-wrap gap-2 mb-12">
          <a v-for="(c, ci) in faq" :key="c.titre" :href="'#cat-' + ci"
            class="px-3 py-1.5 rounded-full border border-brand-dark/15 text-sm text-brand-dark hover:border-brand-orange hover:text-brand-orange transition">
            {{ c.titre }}
          </a>
        </div>

        <!-- Catégories + accordéon -->
        <div v-if="visibleCats.length" class="space-y-14">
          <div v-for="(c, ci) in visibleCats" :key="c.titre" :id="'cat-' + c._i" class="scroll-mt-24">
            <h2 class="flex items-center gap-3 font-display font-bold text-xl text-brand-dark mb-4">
              <span class="w-1.5 h-6 bg-brand-orange rounded-full"></span>{{ c.titre }}
            </h2>
            <div class="border-t border-brand-dark/10">
              <div v-for="q in c.items" :key="q._id" class="border-b border-brand-dark/10">
                <button @click="toggle(q._id)"
                  class="w-full flex items-start justify-between gap-4 py-5 text-left group">
                  <span class="font-display font-semibold text-brand-dark group-hover:text-brand-orange transition">{{ q.q }}</span>
                  <svg class="w-5 h-5 flex-none mt-0.5 text-brand-mid transition-transform duration-300"
                    :class="open[q._id] ? 'rotate-180 text-brand-orange' : ''"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="grid transition-all duration-300 ease-out"
                  :class="open[q._id] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                  <div class="overflow-hidden">
                    <p class="pb-5 text-brand-mid leading-relaxed">{{ q.a }}</p>
                    <NuxtLink v-if="q.link" :to="q.link.to" class="link-arrow -mt-1 mb-5 inline-flex">
                      {{ q.link.label }}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aucun résultat -->
        <p v-else class="text-brand-mid py-8">Aucune question ne correspond à « {{ search }} ». Reformulez votre recherche ou <NuxtLink to="/contact" class="text-brand-orange font-semibold hover:underline">posez-nous directement la question</NuxtLink>.</p>

        <!-- CTA -->
        <div class="mt-16 border-t border-brand-dark/10 pt-10 text-center">
          <h2 class="font-display font-bold text-2xl text-brand-dark">Votre question n'est pas là ?</h2>
          <p class="mt-3 text-brand-mid max-w-xl mx-auto">Chaque situation est particulière. Décrivez-nous la vôtre : nous vous répondons précisément, sur vos données réelles.</p>
          <NuxtLink to="/contact" class="btn btn-primary mt-6">Poser ma question</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const search = ref('')
const open = reactive({})
function toggle(id) { open[id] = !open[id] }

const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const faq = [
  {
    titre: 'Comprendre les OLD',
    items: [
      { q: 'Que veut dire OLD ?', a: "Obligations Légales de Débroussaillement : l'obligation, issue du Code forestier (art. L.131-1 et suivants), de réduire le combustible végétal autour des constructions et des voies en zone exposée au feu." },
      { q: "Qu'est-ce que le débroussaillement ?", a: "Un ensemble d'opérations — coupe des broussailles, élagage, mise à distance et discontinuité des houppiers, élimination des rémanents — visant à réduire l'intensité et la propagation d'un feu, sans transformer le terrain en sol nu." },
      { q: "Qui est concerné par l'obligation de débroussaillement ?", a: "Les propriétaires de terrains bâtis ou à bâtir et les gestionnaires d'installations en zone exposée ; le maire exerce la police spéciale des OLD (contrôle et mise en demeure)." },
      { q: 'Quelles constructions et installations sont concernées ?', a: "Habitations et annexes, piscines, locaux techniques, réservoirs, antennes, transformateurs et postes électriques, postes de pompage, bâtiments publics, campings, chantiers… toute construction ou installation en zone exposée." },
    ],
  },
  {
    titre: 'Où, quand et comment débroussailler',
    items: [
      { q: 'Quand dois-je débroussailler mon terrain ?', a: "Le terrain doit être maintenu en état débroussaillé toute l'année. L'été, les travaux mécaniques sont encadrés jour par jour par les arrêtés d'accès aux massifs (souvent 5 h – 13 h, voire interdits en risque rouge)." },
      { q: 'Où débroussailler ? Sur quelle surface ?', a: "50 m autour des constructions (extensible à 100 m sur décision du maire) et 10 m de part et d'autre des voies d'accès dans le Var ; en zone U du PLU, la totalité de la parcelle." },
      { q: 'Cas particulier si ma parcelle est en zone urbaine (zone U) ?', a: "En zone U du document d'urbanisme, l'obligation porte sur la totalité de la parcelle, et non sur un simple rayon de 50 m." },
      { q: "Faut-il débroussailler ma voie d'accès ?", a: "Oui : le débroussaillement s'applique de part et d'autre des voies d'accès (10 m dans le Var), pour sécuriser l'intervention des secours et l'évacuation." },
      { q: 'Puis-je conserver un arbre à moins de 3 mètres de ma maison ?', a: "Pas en l'état : les houppiers doivent être mis à distance des constructions et entre eux, sans continuité verticale du combustible ; l'arbre doit être élagué, écarté ou supprimé selon l'arrêté." },
    ],
  },
  {
    titre: 'Responsabilité, voisins & superpositions',
    items: [
      { q: 'Pourquoi la loi impose-t-elle de débroussailler chez un voisin ?', a: "Parce que le feu ignore les limites de propriété : quand l'OLD d'une construction déborde sur la parcelle voisine, elle reste obligatoire et à la charge du propriétaire de la construction (art. L.131-10 et suivants)." },
      { q: 'À qui incombe le débroussaillement : au propriétaire ou au locataire ?', a: "Au propriétaire du terrain (ou de l'installation) concerné, y compris lorsque l'OLD s'étend sur une parcelle voisine — sauf stipulation contractuelle transférant la charge." },
      { q: "Que faire en cas de superposition d'obligations ?", a: "Quand plusieurs OLD se chevauchent, les règles de priorité fixées par le Code forestier et l'arrêté préfectoral déterminent qui débroussaille quoi ; PyrOLD calcule ces superpositions parcelle par parcelle.", link: { to: '/pyrold', label: 'Découvrir PyrOLD' } },
      { q: 'Faut-il débroussailler un terrain agricole ?', a: "Les terrains agricoles régulièrement exploités relèvent de règles spécifiques et peuvent être traités différemment ; se référer à l'arrêté préfectoral du département." },
    ],
  },
  {
    titre: 'Environnement & paysage',
    items: [
      { q: 'Le débroussaillement va-t-il transformer mon environnement en désert ?', a: "Non : bien conduit, il conserve les arbres en les espaçant et en les élaguant. PyroVigil privilégie un débroussaillement alvéolaire et différencié, préservant paysage et biodiversité." },
      { q: 'Pourquoi ne débroussaille-t-on pas partout ?', a: "Parce que l'obligation vise la protection des personnes et des biens en zone exposée ; débroussailler l'ensemble du massif serait contre-productif pour les écosystèmes." },
    ],
  },
  {
    titre: 'Vente, notaires & obligations légales',
    items: [
      { q: "Que se passe-t-il à la vente d'un bien ?", a: "Dans le Var, depuis le 31/03/2024, la vente d'un bien situé à moins de 200 m d'un massif est conditionnée au respect des OLD. Pour une maison isolée, la surface minimale est d'1 ha (jusqu'à 4 ha en présence d'un PPRIF) ; une non-conformité peut coûter plus de 10 000 €/ha. Depuis le 1er janvier 2025, l'état des risques doit mentionner la zone OLD.", link: { to: '/prestations', label: 'Sécuriser une vente' } },
      { q: 'Notaires, vendeurs et bailleurs : quelles obligations ?', a: "La loi Climat et résilience (art. 236) et le Code de l'environnement (L.121-5) imposent une information renforcée des acquéreurs et locataires dès la première visite pour les biens en zone à risque (OLD/PPRIF), annexée à la promesse et à l'acte (décret n° 2022-1289 du 1er octobre 2022 ; Code forestier L.131-16-1, décret du 29 mars 2024). Une attestation erronée ou fausse expose à l'annulation de la vente ou à une baisse du prix, et jusqu'à 45 000 € d'amende et 3 ans de prison. PyroVigil fournit le plan de zonage OLD qui sécurise la transaction et l'estimation des travaux." },
    ],
  },
]

// Identifiants stables pour l'état d'ouverture
faq.forEach((c, ci) => c.items.forEach((q, ii) => { q._id = ci + '-' + ii }))

// Filtrage par recherche (insensible aux accents), catégories vides masquées
const visibleCats = computed(() => {
  const s = norm(search.value.trim())
  return faq
    .map((c, i) => ({
      ...c, _i: i,
      items: s ? c.items.filter(q => norm(q.q).includes(s) || norm(q.a).includes(s)) : c.items,
    }))
    .filter(c => c.items.length)
})
</script>
