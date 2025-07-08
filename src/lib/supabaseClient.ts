import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://PLACEHOLDER.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'PLACEHOLDER'
) 