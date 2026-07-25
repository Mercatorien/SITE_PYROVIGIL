// Géolocalisation IP (niveau ville) avec cache mémoire pour éviter les appels répétés.
// ipinfo.io si IPINFO_TOKEN, repli sur ipwho.is. Renvoie toujours un objet.
type Geo = { city: string | null; region: string | null; country: string | null; lat: number | null; lon: number | null }

const cache = new Map<string, { geo: Geo; exp: number }>()
const TTL = 24 * 60 * 60 * 1000 // 24 h

export function getClientIp(event: any): string {
  const xff = getRequestHeader(event, 'x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return event.node?.req?.socket?.remoteAddress || 'unknown'
}

function isLocal(ip: string) {
  return !ip || ip === '::1' || ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')
}

export async function geolocate(ip: string): Promise<Geo> {
  if (isLocal(ip)) return { city: 'Local', region: null, country: null, lat: null, lon: null }
  const hit = cache.get(ip)
  if (hit && hit.exp > Date.now()) return hit.geo

  const token = process.env.IPINFO_TOKEN || ''
  let geo: Geo = { city: null, region: null, country: null, lat: null, lon: null }
  try {
    if (token) {
      const j: any = await $fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json?token=${token}`)
      if (j && !j.error) {
        const [lat, lon] = String(j.loc || '').split(',').map(Number)
        geo = { city: j.city || null, region: j.region || null, country: j.country || null, lat: isFinite(lat) ? lat : null, lon: isFinite(lon) ? lon : null }
      }
    } else {
      const j: any = await $fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,city,region,country,latitude,longitude`)
      if (j && j.success) geo = { city: j.city, region: j.region, country: j.country, lat: j.latitude, lon: j.longitude }
    }
  } catch { /* silencieux : géoloc best-effort */ }

  cache.set(ip, { geo, exp: Date.now() + TTL })
  return geo
}
