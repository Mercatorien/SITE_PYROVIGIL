// Directive v-reveal : apparition douce au scroll (fade + léger translate).
// Robuste : si l'IntersectionObserver n'est pas disponible OU si l'utilisateur
// préfère les animations réduites, le contenu s'affiche normalement (jamais caché).
// SSR-safe (getSSRProps) → le contenu reste dans le HTML pour le SEO.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  const canAnimate = import.meta.client
    && typeof IntersectionObserver !== 'undefined'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (canAnimate) {
    document.documentElement.classList.add('reveal-ready')
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io!.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      if (io) io.observe(el)
      else el.classList.add('is-visible')   // pas d'animation → visible immédiatement
    },
    getSSRProps() { return {} },
  })
})
