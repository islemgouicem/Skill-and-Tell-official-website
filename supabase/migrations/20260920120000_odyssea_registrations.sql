-- =====================================================================
--  ODYSSEA — registration storage
--  Skill&Tell Scientific Club, ENSIA
--
--  Security model
--  --------------
--  1. Everything lives in the private `odyssea` schema. Supabase only
--     exposes `public` and `graphql_public` through PostgREST, so the
--     browser's anon key cannot reach these tables at all — there is no
--     REST route to them.
--  2. On top of that, RLS is enabled AND forced with zero policies, so
--     even if the schema were ever exposed, every row is denied.
--  3. All privileges are revoked from `anon`, `authenticated` and
--     `public`. Only `service_role` (used exclusively by the edge
--     function, never shipped to the browser) may execute the writer.
--  4. The single writer is `odyssea.submit_registration(jsonb)`, a
--     SECURITY DEFINER function with a pinned search_path. It validates
--     every field, enforces the rate limit and writes the team and its
--     members in one transaction.
--
--  Run with:  supabase db push
-- =====================================================================

create extension if not exists "pgcrypto" with schema extensions;
create extension if not exists "citext"   with schema extensions;

create schema if not exists odyssea;

revoke all on schema odyssea from public, anon, authenticated;
grant usage on schema odyssea to service_role;

-- ---------------------------------------------------------------------
-- enums
-- ---------------------------------------------------------------------
do $$ begin
  create type odyssea.registration_kind as enum ('team', 'individual');
exception when duplicate_object then null; end $$;

do $$ begin
  create type odyssea.participation_mode as enum ('onsite', 'online');
exception when duplicate_object then null; end $$;

do $$ begin
  create type odyssea.registration_status as enum ('pending', 'confirmed', 'waitlisted', 'rejected', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type odyssea.participant_role as enum ('leader', 'member');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- settings: one row, lets the club close registrations without a deploy
-- ---------------------------------------------------------------------
create table if not exists odyssea.settings (
  id                boolean primary key default true,
  registrations_open boolean not null default true,
  opens_at          timestamptz,
  closes_at         timestamptz,
  max_registrations integer not null default 120 check (max_registrations > 0),
  updated_at        timestamptz not null default now(),
  constraint settings_singleton check (id)
);

insert into odyssea.settings (id) values (true) on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- registrations
-- ---------------------------------------------------------------------
create table if not exists odyssea.registrations (
  id                  uuid primary key default extensions.gen_random_uuid(),
  kind                odyssea.registration_kind   not null default 'team',
  team_name           extensions.citext           not null,
  team_size           smallint                    not null,
  participation_mode  odyssea.participation_mode  not null default 'onsite',
  discovery           text,
  motivation          text                        not null,
  status              odyssea.registration_status not null default 'pending',
  reference           text                        not null,
  confirmation_sent_at timestamptz,
  ip_hash             text,
  user_agent          text,
  created_at          timestamptz                 not null default now(),
  updated_at          timestamptz                 not null default now(),

  constraint registrations_team_name_len  check (char_length(team_name) between 2 and 60),
  constraint registrations_team_size_rng  check (team_size between 1 and 6),
  constraint registrations_kind_size      check (
    (kind = 'individual' and team_size = 1) or (kind = 'team' and team_size between 2 and 6)
  ),
  constraint registrations_motivation_len check (char_length(motivation) between 40 and 1500),
  constraint registrations_discovery_len  check (discovery is null or char_length(discovery) <= 500),
  constraint registrations_reference_fmt  check (reference ~ '^ODY-[0-9A-Z]{6}$')
);

create unique index if not exists registrations_team_name_key
  on odyssea.registrations (team_name);
create unique index if not exists registrations_reference_key
  on odyssea.registrations (reference);
create index if not exists registrations_created_at_idx
  on odyssea.registrations (created_at desc);
create index if not exists registrations_status_idx
  on odyssea.registrations (status);

-- ---------------------------------------------------------------------
-- participants
-- ---------------------------------------------------------------------
create table if not exists odyssea.participants (
  id              uuid primary key default extensions.gen_random_uuid(),
  registration_id uuid not null references odyssea.registrations (id) on delete cascade,
  role            odyssea.participant_role not null,
  position        smallint not null,
  full_name       text not null,
  email           extensions.citext not null,
  university      text not null,
  linkedin        text not null,
  phone           text not null,
  portfolio       text not null,
  year_of_study   text,
  field_of_study  text not null,
  created_at      timestamptz not null default now(),

  constraint participants_position_rng check (position between 1 and 6),
  constraint participants_name_len     check (char_length(full_name) between 3 and 120),
  constraint participants_email_fmt    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[a-z]{2,}$'),
  constraint participants_email_len    check (char_length(email) <= 160),
  constraint participants_university   check (char_length(university) between 2 and 160),
  constraint participants_phone_fmt    check (phone ~ '^\+?[0-9[:space:]().-]{8,20}$'),
  constraint participants_linkedin_len check (char_length(linkedin) between 4 and 240),
  constraint participants_portfolio_len check (char_length(portfolio) between 4 and 240),
  constraint participants_year_len     check (year_of_study is null or char_length(year_of_study) <= 40),
  constraint participants_field_len    check (char_length(field_of_study) between 2 and 120)
);

-- one seat per human, and one leader per registration
create unique index if not exists participants_email_key
  on odyssea.participants (email);
create unique index if not exists participants_registration_position_key
  on odyssea.participants (registration_id, position);
create unique index if not exists participants_single_leader_key
  on odyssea.participants (registration_id) where role = 'leader';
create index if not exists participants_registration_idx
  on odyssea.participants (registration_id);

-- ---------------------------------------------------------------------
-- rate limiting (per hashed IP, sliding hour)
-- ---------------------------------------------------------------------
create table if not exists odyssea.rate_limits (
  ip_hash      text primary key,
  window_start timestamptz not null default now(),
  attempts     integer     not null default 0
);

create index if not exists rate_limits_window_idx on odyssea.rate_limits (window_start);

-- ---------------------------------------------------------------------
-- lock everything down
-- ---------------------------------------------------------------------
alter table odyssea.settings      enable row level security;
alter table odyssea.registrations enable row level security;
alter table odyssea.participants  enable row level security;
alter table odyssea.rate_limits   enable row level security;

alter table odyssea.settings      force row level security;
alter table odyssea.registrations force row level security;
alter table odyssea.participants  force row level security;
alter table odyssea.rate_limits   force row level security;

-- no policies are created on purpose: every role except service_role
-- (which bypasses RLS) is denied on every row.

revoke all on all tables    in schema odyssea from public, anon, authenticated;
revoke all on all sequences in schema odyssea from public, anon, authenticated;
revoke all on all functions in schema odyssea from public, anon, authenticated;

alter default privileges in schema odyssea
  revoke all on tables from public, anon, authenticated;
alter default privileges in schema odyssea
  revoke all on functions from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- helpers
-- ---------------------------------------------------------------------
create or replace function odyssea.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = odyssea, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists registrations_touch_updated_at on odyssea.registrations;
create trigger registrations_touch_updated_at
  before update on odyssea.registrations
  for each row execute function odyssea.touch_updated_at();

create or replace function odyssea.new_reference()
returns text
language plpgsql
security definer
set search_path = odyssea, extensions, pg_temp
as $$
declare
  alphabet constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  candidate text;
  i integer;
begin
  loop
    candidate := 'ODY-';
    for i in 1..6 loop
      candidate := candidate || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from odyssea.registrations r where r.reference = candidate);
  end loop;
  return candidate;
end;
$$;

-- ---------------------------------------------------------------------
-- the one and only writer
-- ---------------------------------------------------------------------
create or replace function odyssea.submit_registration(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = odyssea, extensions, pg_temp
as $$
declare
  v_settings      odyssea.settings%rowtype;
  v_kind          odyssea.registration_kind;
  v_mode          odyssea.participation_mode;
  v_team_name     text;
  v_team_size     smallint;
  v_motivation    text;
  v_discovery     text;
  v_ip_hash       text;
  v_user_agent    text;
  v_people        jsonb;
  v_person        jsonb;
  v_count         integer;
  v_total         integer;
  v_reference     text;
  v_registration  uuid;
  v_attempts      integer;
  v_position      integer := 0;
  v_emails        text[] := '{}';
  v_email         text;
begin
  -- ---- 0. gate -------------------------------------------------------
  select * into v_settings from odyssea.settings where id limit 1;

  if not found or not v_settings.registrations_open
     or (v_settings.opens_at  is not null and now() < v_settings.opens_at)
     or (v_settings.closes_at is not null and now() > v_settings.closes_at) then
    return jsonb_build_object('ok', false, 'code', 'registrations_closed');
  end if;

  select count(*) into v_total
    from odyssea.registrations
   where status <> 'cancelled';

  if v_total >= v_settings.max_registrations then
    return jsonb_build_object('ok', false, 'code', 'registrations_closed');
  end if;

  -- ---- 1. rate limit: 5 submissions per hour per address -------------
  v_ip_hash    := nullif(payload ->> 'ip_hash', '');
  v_user_agent := left(coalesce(payload ->> 'user_agent', ''), 400);

  if v_ip_hash is not null then
    insert into odyssea.rate_limits (ip_hash, window_start, attempts)
         values (v_ip_hash, now(), 1)
    on conflict (ip_hash) do update
       set attempts     = case when odyssea.rate_limits.window_start < now() - interval '1 hour'
                               then 1 else odyssea.rate_limits.attempts + 1 end,
           window_start = case when odyssea.rate_limits.window_start < now() - interval '1 hour'
                               then now() else odyssea.rate_limits.window_start end
    returning attempts into v_attempts;

    if v_attempts > 5 then
      return jsonb_build_object('ok', false, 'code', 'rate_limited');
    end if;
  end if;

  -- ---- 2. shape ------------------------------------------------------
  begin
    v_kind := coalesce(payload ->> 'registration_kind', 'team')::odyssea.registration_kind;
    v_mode := coalesce(payload ->> 'participation_mode', 'onsite')::odyssea.participation_mode;
  exception when others then
    return jsonb_build_object('ok', false, 'code', 'invalid_payload');
  end;

  v_team_name  := btrim(coalesce(payload ->> 'team_name', ''));
  v_team_size  := coalesce((payload ->> 'team_size')::smallint, 0);
  v_motivation := btrim(coalesce(payload ->> 'motivation', ''));
  v_discovery  := nullif(btrim(coalesce(payload ->> 'discovery', '')), '');
  v_people     := coalesce(payload -> 'people', '[]'::jsonb);

  if jsonb_typeof(v_people) <> 'array' then
    return jsonb_build_object('ok', false, 'code', 'invalid_payload');
  end if;

  v_count := jsonb_array_length(v_people);

  if v_count <> v_team_size or v_count < 1 or v_count > 6 then
    return jsonb_build_object('ok', false, 'code', 'invalid_payload');
  end if;

  -- no duplicate addresses inside the same submission
  for v_person in select * from jsonb_array_elements(v_people) loop
    v_email := lower(btrim(coalesce(v_person ->> 'email', '')));
    if v_email = any (v_emails) then
      return jsonb_build_object('ok', false, 'code', 'duplicate_email');
    end if;
    v_emails := array_append(v_emails, v_email);
  end loop;

  -- ---- 3. write ------------------------------------------------------
  v_reference := odyssea.new_reference();

  begin
    insert into odyssea.registrations (
      kind, team_name, team_size, participation_mode,
      discovery, motivation, reference, ip_hash, user_agent
    ) values (
      v_kind, v_team_name, v_team_size, v_mode,
      v_discovery, v_motivation, v_reference, v_ip_hash, nullif(v_user_agent, '')
    )
    returning id into v_registration;

    for v_person in select * from jsonb_array_elements(v_people) loop
      v_position := v_position + 1;
      insert into odyssea.participants (
        registration_id, role, position, full_name, email, university,
        linkedin, phone, portfolio, year_of_study, field_of_study
      ) values (
        v_registration,
        case when v_position = 1 then 'leader'::odyssea.participant_role
             else 'member'::odyssea.participant_role end,
        v_position,
        btrim(v_person ->> 'full_name'),
        lower(btrim(v_person ->> 'email')),
        btrim(v_person ->> 'university'),
        btrim(v_person ->> 'linkedin'),
        btrim(v_person ->> 'phone'),
        btrim(v_person ->> 'portfolio'),
        nullif(btrim(coalesce(v_person ->> 'year_of_study', '')), ''),
        btrim(v_person ->> 'field_of_study')
      );
    end loop;
  exception
    when unique_violation then
      if sqlerrm ilike '%team_name%' then
        return jsonb_build_object('ok', false, 'code', 'duplicate_team_name');
      end if;
      return jsonb_build_object('ok', false, 'code', 'duplicate_email');
    when check_violation or not_null_violation or invalid_text_representation then
      return jsonb_build_object('ok', false, 'code', 'invalid_payload');
  end;

  return jsonb_build_object(
    'ok', true,
    'registration_id', v_registration,
    'reference', v_reference,
    'team_name', v_team_name,
    'kind', v_kind,
    'team_size', v_team_size
  );
end;
$$;

create or replace function odyssea.mark_confirmation_sent(p_registration uuid)
returns void
language plpgsql
security definer
set search_path = odyssea, pg_temp
as $$
begin
  update odyssea.registrations
     set confirmation_sent_at = now()
   where id = p_registration;
end;
$$;

revoke all on function odyssea.submit_registration(jsonb)   from public, anon, authenticated;
revoke all on function odyssea.mark_confirmation_sent(uuid) from public, anon, authenticated;
revoke all on function odyssea.new_reference()              from public, anon, authenticated;

grant execute on function odyssea.submit_registration(jsonb)   to service_role;
grant execute on function odyssea.mark_confirmation_sent(uuid) to service_role;

-- ---------------------------------------------------------------------
-- organiser export (service_role only — read it from the SQL editor,
-- the dashboard, or a server-side job; never from the browser)
-- ---------------------------------------------------------------------
create or replace view odyssea.v_export as
select r.reference,
       r.kind,
       r.team_name,
       r.team_size,
       r.participation_mode,
       r.status,
       r.created_at,
       p.role,
       p.position,
       p.full_name,
       p.email,
       p.university,
       p.field_of_study,
       p.year_of_study,
       p.phone,
       p.linkedin,
       p.portfolio,
       r.motivation,
       r.discovery
  from odyssea.registrations r
  join odyssea.participants  p on p.registration_id = r.id
 order by r.created_at desc, p.position asc;

revoke all on odyssea.v_export from public, anon, authenticated;
grant select on odyssea.v_export to service_role;

comment on schema odyssea is
  'Odyssea (Skill&Tell) registrations. Not exposed through PostgREST: all writes go through odyssea.submit_registration, called only by the odyssea-register edge function with the service role.';

-- ---------------------------------------------------------------------
-- PostgREST bridge
--
-- PostgREST only exposes `public`, so the edge function cannot call
-- odyssea.submit_registration directly. These two thin wrappers are the
-- only doors into the schema, and EXECUTE on them is granted to
-- service_role alone — anon and authenticated are explicitly revoked,
-- so a leaked anon key still cannot call them.
-- ---------------------------------------------------------------------
create or replace function public.odyssea_submit_registration(payload jsonb)
returns jsonb
language sql
security definer
set search_path = public, odyssea, pg_temp
as $$
  select odyssea.submit_registration(payload);
$$;

create or replace function public.odyssea_mark_confirmation_sent(p_registration uuid)
returns void
language sql
security definer
set search_path = public, odyssea, pg_temp
as $$
  select odyssea.mark_confirmation_sent(p_registration);
$$;

revoke all on function public.odyssea_submit_registration(jsonb)        from public, anon, authenticated;
revoke all on function public.odyssea_mark_confirmation_sent(uuid)      from public, anon, authenticated;
grant execute on function public.odyssea_submit_registration(jsonb)     to service_role;
grant execute on function public.odyssea_mark_confirmation_sent(uuid)   to service_role;

notify pgrst, 'reload schema';
