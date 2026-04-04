/** Minimal schema for typed Supabase client; extend when you add tables. */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
