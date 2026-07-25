# Site PyroVigil (Nuxt 3)

Site vitrine du bureau d'études PyroVigil, avec suivi de fréquentation (base séparée) et admin discret.

## Stack
- **Nuxt 3** (Vue + SSR/SSG → SEO)
- **Tailwind CSS** — charte PyrOLD (orange `#E8651A`, encre `#1B2A3B`, crème, vert forêt du logo)
- Polices **Montserrat / Lato / IBM Plex Mono** (auto-hébergées au build)
- **PostgreSQL** (base `pyrovigil_site`, séparée de PyrOLD) pour le tracking

## Démarrer en local
```bash
cp .env.example .env       # renseigner PGPASSWORD + ADMIN_PASSWORD
npm install
npm run dev                # http://localhost:3000
```

## Base de données (une fois)
```sql
CREATE DATABASE pyrovigil_site;
CREATE USER pyrovigil_user WITH PASSWORD '...';
GRANT ALL PRIVILEGES ON DATABASE pyrovigil_site TO pyrovigil_user;
```
puis :
```bash
psql -d pyrovigil_site -f server/db/schema.sql
```

## Tracking
- Chaque page vue appelle `POST /api/track` (plugin `plugins/track.client.ts`, via `sendBeacon`).
- Table `visite` : path, referer, sid (session anonyme), ip, ville/région/pays (géoloc IP), user-agent, is_bot.
- Les scanners de messagerie / bots sont marqués `is_bot` et exclus des stats.

## Admin discret
- Page **non liée** dans la navigation et **`noindex`** : `/pyro-admin`.
- Protégée par `ADMIN_PASSWORD` (en-tête `x-admin-key`). **À utiliser derrière HTTPS.**

## Déploiement (VPS)
Le build est gourmand → **builder hors VPS** puis déployer la sortie :
```bash
npm run build              # génère .output/
# copier .output/ sur le VPS, puis :
node .output/server/index.mjs   # (via pm2, port 3000 par défaut → PORT=3002 conseillé)
```
- nginx : virtualhost `pyrovigil.fr` → proxy `127.0.0.1:3002`.
- pm2 : process séparé de PyrOLD.

## RGPD
Le tracking stocke l'IP (donnée personnelle). À mentionner dans la politique de confidentialité, prévoir une purge (ex. > 12 mois) et éventuellement une anonymisation.

## À compléter (placeholders dans le code)
- Chiffres clés (`pages/index.vue` — `stats`)
- Textes définitifs, visuels/captures, logos références, témoignage commune
- **Équipe / CV** (dont Diana Jeannot, back-office) et **liste des outils** — depuis la plaquette
- Pages restantes : /prestations, /formations, /pyrold, /reseau, /references, /a-propos, /contact + pages légales
