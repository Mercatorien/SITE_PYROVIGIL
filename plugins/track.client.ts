// Envoie une visite à chaque changement de page (côté client uniquement).
// Un identifiant de session anonyme (sid) est conservé en sessionStorage.
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  function sid(): string {
    let s = sessionStorage.getItem('pv_sid')
    if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem('pv_sid', s) }
    return s
  }

  function track(path: string) {
    // sendBeacon si dispo (n'attend pas la réponse, robuste au changement de page)
    const payload = JSON.stringify({ path, sid: sid(), referrer: document.referrer || null })
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
        return
      }
    } catch { /* fallback ci-dessous */ }
    $fetch('/api/track', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' } }).catch(() => {})
  }

  // Première page + navigations suivantes
  nuxtApp.hook('app:mounted', () => track(router.currentRoute.value.fullPath))
  router.afterEach((to) => track(to.fullPath))
})
