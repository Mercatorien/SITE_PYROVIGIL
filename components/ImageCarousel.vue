<template>
  <div class="relative" @mouseenter="paused = true" @mouseleave="paused = false">
    <div class="rounded-lg overflow-hidden border border-brand-dark/15 shadow-2xl bg-white">
      <div class="h-9 bg-brand-dark flex items-center gap-1.5 px-4">
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-white/25"></span>
        <span class="ml-3 font-mono text-[10px] text-white/40">pyrold.fr</span>
      </div>
      <div class="relative bg-brand-cream" :class="aspect">
        <img v-for="(s, i) in slides" :key="s.src" :src="asset(s.src)" :alt="s.alt || s.label"
          loading="lazy" decoding="async"
          class="absolute inset-0 w-full h-full transition-opacity duration-700"
          :class="[i === current ? 'opacity-100' : 'opacity-0', contain ? 'object-contain' : 'object-cover']" />
        <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-brand-dark/70 to-transparent">
          <p class="font-mono text-[11px] uppercase tracking-wider text-white">{{ slides[current].label }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center gap-2.5">
      <button v-for="(s, i) in slides" :key="'d' + i" type="button" @click="current = i"
        :aria-label="'Voir : ' + s.label" :aria-current="i === current"
        class="h-2 rounded-full transition-all"
        :class="i === current ? 'w-6 bg-brand-orange' : 'w-2 bg-brand-dark/20 hover:bg-brand-dark/40'"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  contain: { type: Boolean, default: false },
  interval: { type: Number, default: 5000 },
  aspect: { type: String, default: 'aspect-[16/10]' },
})

const current = ref(0)
const paused = ref(false)
let timer = null

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  timer = setInterval(() => { if (!paused.value) current.value = (current.value + 1) % props.slides.length }, props.interval)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>
