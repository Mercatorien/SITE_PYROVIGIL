// Reçoit une visite (appelé à chaque page vue par le plugin client) et la
// journalise dans la base séparée du site. Best-effort : ne casse jamais la nav.
const BOT_RE = /bot|crawl|spider|slurp|preview|scan(ner)?|monitor|proofpoint|barracuda|mimecast|safelinks|googleimageproxy|facebookexternalhit|whatsapp|telegram|curl|wget|python-requests|axios|headless|lighthouse/i

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const path = typeof body?.path === 'string' ? body.path.slice(0, 300) : null
  const sid = typeof body?.sid === 'string' ? body.sid.slice(0, 64) : null
  if (!path) return { ok: false }

  const ip = getClientIp(event)
  const ua = getRequestHeader(event, 'user-agent') || null
  const ref = getRequestHeader(event, 'referer') || body?.referrer || null
  const isBot = !!ua && BOT_RE.test(ua)

  try {
    const geo = await geolocate(ip)
    await getPool().query(
      `INSERT INTO visite (path, referer, sid, ip, city, region, country, lat, lon, user_agent, is_bot)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [path, ref, sid, ip, geo.city, geo.region, geo.country, geo.lat, geo.lon, ua, isBot]
    )
  } catch (e: any) {
    console.error('[track]', e.message)
  }
  return { ok: true }
})
