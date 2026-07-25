import pg from 'pg'

// Pool Postgres unique (base SÉPARÉE de PyrOLD, sur le même cluster/VPS, localhost).
// Config via process.env (chargé depuis .env en dev par Nuxt ; via pm2 en prod).
let pool: pg.Pool | null = null

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new pg.Pool({
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT || '5432'),
      database: process.env.PGDATABASE || 'pyrovigil_site',
      user: process.env.PGUSER || 'pyrovigil_user',
      password: process.env.PGPASSWORD || '',
      max: 5,
      idleTimeoutMillis: 30000,
    })
    pool.on('error', (e) => console.error('[db] pool error:', e.message))
  }
  return pool
}
