import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.{{PUBLIC_VAR_PREFIX}}_SUPABASE_URL!
const supabaseAnonKey = process.env.{{PUBLIC_VAR_PREFIX}}_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
