-- Base SÉPARÉE du site PyroVigil (ex. base "pyrovigil_site" sur le même cluster).
-- À créer une fois :
--   CREATE DATABASE pyrovigil_site;
--   CREATE USER pyrovigil_user WITH PASSWORD '...';
--   GRANT ALL PRIVILEGES ON DATABASE pyrovigil_site TO pyrovigil_user;
-- puis appliquer ce fichier (psql -d pyrovigil_site -f server/db/schema.sql).

CREATE TABLE IF NOT EXISTS visite (
  id         BIGSERIAL PRIMARY KEY,
  path       TEXT,
  referer    TEXT,
  sid        TEXT,                 -- session anonyme (sessionStorage)
  ip         TEXT,
  city       TEXT,
  region     TEXT,
  country    TEXT,
  lat        DOUBLE PRECISION,
  lon        DOUBLE PRECISION,
  user_agent TEXT,
  is_bot     BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_visite_time ON visite (created_at);
CREATE INDEX IF NOT EXISTS idx_visite_path ON visite (path);
CREATE INDEX IF NOT EXISTS idx_visite_sid  ON visite (sid);

-- Messages du formulaire de contact
CREATE TABLE IF NOT EXISTS contact_message (
  id           BIGSERIAL PRIMARY KEY,
  nom          TEXT,
  organisation TEXT,
  email        TEXT,
  telephone    TEXT,
  objet        TEXT,          -- demo | devis | question | autre
  message      TEXT,
  ip           TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_contact_time ON contact_message (created_at);
