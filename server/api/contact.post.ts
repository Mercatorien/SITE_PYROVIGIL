// Réception du formulaire de contact → enregistrement en base.
// (L'envoi d'email pourra être ajouté plus tard.)
export default defineEventHandler(async (event) => {
  const b = await readBody(event).catch(() => ({}))
  const nom = String(b?.nom || '').trim().slice(0, 200)
  const email = String(b?.email || '').trim().slice(0, 200)
  const message = String(b?.message || '').trim().slice(0, 5000)

  if (!nom || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Merci de renseigner nom, email valide et message.' })
  }
  if (b?.website) return { ok: true } // honeypot anti-spam : champ caché rempli → on ignore

  try {
    await getPool().query(
      `INSERT INTO contact_message (nom, organisation, email, telephone, objet, message, ip)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [nom, String(b?.organisation || '').slice(0, 200) || null, email,
       String(b?.telephone || '').slice(0, 40) || null,
       String(b?.objet || 'question').slice(0, 20), message, getClientIp(event)]
    )
  } catch (e: any) {
    console.error('[contact]', e.message)
    throw createError({ statusCode: 500, message: 'Erreur lors de l\'envoi. Réessayez ou appelez-nous.' })
  }
  return { ok: true }
})
