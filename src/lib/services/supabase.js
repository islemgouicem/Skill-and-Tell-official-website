import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * True only when both env vars are present at build time.
 * createClient() throws when the url is missing, and because this module is
 * imported at the top of several pages that would blank the whole route, so
 * we fall back to an inert client and let the call sites report the problem.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing. " +
      "Pages still render, but any request will fail until a .env is provided.",
  );
}

export const supabase = createClient(
  SUPABASE_URL || "https://unconfigured.supabase.co",
  SUPABASE_ANON_KEY || "unconfigured-anon-key",
);
