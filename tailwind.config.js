/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8651A',      // orange PyrOLD (primaire = braise)
          'orange-deep': '#c44a00',
          'orange-bright': '#ff9d07',
          dark: '#1B2A3B',        // encre / header
          ink: '#232323',
          cream: '#f5f3ee',       // fond clair
          forest: '#2E9E3A',      // vert du logo (accent secondaire)
          'forest-deep': '#1c5e1e',
          mid: '#6b6b6b',
          border: '#e5e0d8',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'Segoe UI', 'sans-serif'],
        body: ['Lato', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      maxWidth: { container: '1180px' },
    },
  },
  plugins: [],
}
