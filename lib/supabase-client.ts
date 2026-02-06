'use client'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  // Return a mock client if env vars are not set (for development)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Authentication will not work.')
    // Return a mock client that won't crash the app
    supabaseClient = createSupabaseClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
    return supabaseClient
  }

  supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

