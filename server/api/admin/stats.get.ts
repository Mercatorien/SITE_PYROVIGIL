// Statistiques de fréquentation — protégées par un mot de passe partagé
// (en-tête x-admin-key). À utiliser derrière HTTPS uniquement.
export default defineEventHandler(async (event) => {
  const key = getRequestHeader(event, 'x-admin-key')
  if (!key || key !== (process.env.ADMIN_PASSWORD || 'changeme')) {
    throw createError({ statusCode: 401, message: 'Non autorisé' })
  }
  const pool = getPool()
  const [total, parJour, parPage, parVille, recentes] = await Promise.all([
    pool.query(`SELECT
        count(*) FILTER (WHERE NOT is_bot)::int AS visites,
        count(DISTINCT sid) FILTER (WHERE NOT is_bot)::int AS sessions,
        count(*) FILTER (WHERE is_bot)::int AS bots
      FROM visite`),
    pool.query(`SELECT created_at::date AS jour, count(*) FILTER (WHERE NOT is_bot)::int AS visites
      FROM visite WHERE created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 1`),
    pool.query(`SELECT path, count(*) FILTER (WHERE NOT is_bot)::int AS visites
      FROM visite GROUP BY path ORDER BY visites DESC LIMIT 20`),
    pool.query(`SELECT city, count(*) FILTER (WHERE NOT is_bot)::int AS visites, avg(lat) AS lat, avg(lon) AS lon
      FROM visite WHERE city IS NOT NULL AND NOT is_bot GROUP BY city ORDER BY visites DESC LIMIT 50`),
    pool.query(`SELECT path, city, ip, is_bot, created_at
      FROM visite ORDER BY created_at DESC LIMIT 50`),
  ])
  return {
    total: total.rows[0],
    parJour: parJour.rows,
    parPage: parPage.rows,
    parVille: parVille.rows,
    recentes: recentes.rows,
  }
})
