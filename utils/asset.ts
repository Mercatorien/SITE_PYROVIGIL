// Préfixe un chemin d'asset public avec le baseURL de l'app.
// En local le baseURL vaut '/', en prod GitHub Pages '/SITE_PYROVIGIL/'.
// Sans ça, un chemin absolu comme '/img/x.webp' pointe vers la racine du
// domaine et renvoie un 404 quand le site est servi dans un sous-dossier.
export function asset(path: string): string {
  const base = useRuntimeConfig().app.baseURL || '/'
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : '/' + path
  return b + p
}
