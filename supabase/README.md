# Odyssea — registration backend

Everything a team registration touches, and nothing else.

```
browser (anon key)
   │  supabase.functions.invoke("odyssea-register")
   ▼
edge function  odyssea-register          ← CORS allow-list, validation,
   │  service role                          honeypot, IP rate limit
   ▼
public.odyssea_submit_registration(jsonb) ← EXECUTE: service_role only
   │
   ▼
odyssea.submit_registration(jsonb)        ← SECURITY DEFINER, atomic
   ▼
odyssea.registrations + odyssea.participants
```

## Why this is safe

| Risk | What stops it |
| --- | --- |
| Anon key read/write of registrations | Tables live in the private `odyssea` schema, which PostgREST does not expose. There is no REST route to them. |
| Schema accidentally exposed later | RLS is **enabled and forced** on every table with **zero policies** — every role except `service_role` is denied on every row. |
| Leaked anon key calling the RPC | `EXECUTE` is revoked from `anon`/`authenticated`/`public` and granted only to `service_role`. |
| Service-role key in the browser | It never leaves the edge function. The browser only ever holds the anon key. |
| Forged/oversized payloads | Content-type, 24 KB body cap, per-field type, length, email, phone and URL validation in the function **and** as CHECK constraints in the database. |
| Spam floods | Honeypot field + 5 submissions per hour per hashed IP, enforced in `odyssea.rate_limits`. |
| Cross-site calls | `ODYSSEA_ALLOWED_ORIGINS` allow-list; other origins get 403. |
| IP addresses stored in the clear | Only an HMAC-SHA256 of the address with a server-side pepper is stored. |
| Partial writes | The team and all of its members are written inside one function call; any failure rolls the whole thing back. |
| The same person registering twice | Unique index on `participants.email`; unique index on `registrations.team_name`. |
| SQL injection through the definer function | Fixed `search_path`, JSONB parameters only, no dynamic SQL. |

## Deploy

```bash
# 1. schema
supabase db push

# 2. secrets
supabase secrets set \
  RESEND_API_KEY=re_xxxxxxxxxxxx \
  ODYSSEA_FROM_EMAIL="Odyssea by Skill&Tell <odyssea@your-verified-domain.dz>" \
  ODYSSEA_REPLY_TO="skill.and.tell@ensia.edu.dz" \
  ODYSSEA_SITE_URL="https://your-site.dz" \
  ODYSSEA_ALLOWED_ORIGINS="https://your-site.dz,https://www.your-site.dz" \
  ODYSSEA_IP_PEPPER="$(openssl rand -hex 32)"

# 3. function
supabase functions deploy odyssea-register --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by the platform —
do not set them yourself, and never put the service-role key in `.env` files
that the Vite build can read.

The front end only needs what it already has:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Email

`functions/odyssea-register/email.ts` holds the confirmation email in the
Odyssea palette (Aegean Night, Olympian Gold, Parchment), with a plain-text
alternative. It is sent to the team leader only, right after the row is
written. A failing mailbox never cancels a registration — the row stays and
`confirmation_sent_at` is simply left null, so you can retry later.

Resend needs your sending domain verified (SPF + DKIM) before
`ODYSSEA_FROM_EMAIL` will deliver.

## Running the club

```sql
-- close registrations
update odyssea.settings set registrations_open = false;

-- raise the cap
update odyssea.settings set max_registrations = 200;

-- everything, one row per participant
select * from odyssea.v_export;

-- who has not been emailed yet
select reference, team_name, created_at
from odyssea.registrations
where confirmation_sent_at is null
order by created_at;

-- confirm a crew
update odyssea.registrations set status = 'confirmed' where reference = 'ODY-XXXXXX';
```

Run these as the service role — from the Supabase SQL editor, or any
server-side job. They will not work from the browser, by design.
