'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string, userData?: { full_name?: string; phone?: string }) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: { full_name?: string; avatar_url?: string; phone?: string }) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)
  
  const supabase = isSupabaseConfigured ? createClient() : null

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [isSupabaseConfigured, supabase])

  const signIn = async (email: string, password: string, userData?: { full_name?: string; phone?: string }) => {
    if (!supabase) {
      return { error: { message: 'Supabase is not configured. Please set up your environment variables.' } as AuthError }
    }
    
    if (!userData?.full_name || !userData?.phone) {
      return { error: { message: 'Please provide your name and phone number.' } as AuthError }
    }
    
    // First, try to create account (this will work if user doesn't exist)
    const signUpResult = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
        },
      },
    })
    
    let data = signUpResult.data
    let error = signUpResult.error
    
    // If signup fails because user already exists, try to sign in instead
    if (error && (
      error.message.includes('already registered') ||
      error.message.includes('already exists') ||
      error.message.includes('User already registered') ||
      error.code === 'signup_disabled'
    )) {
      // User exists, try to sign in
      const signInResult = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      data = signInResult.data
      error = signInResult.error
    }
    
    // If sign in/signup successful, save/update user data in database
    if (!error && data?.user) {
      try {
        // Wait a bit for profile to be created by trigger (if new user)
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()
        
        const profileData: { full_name?: string; phone?: string } = {
          full_name: userData.full_name,
          phone: userData.phone,
        }
        
        if (existingProfile) {
          // Update existing profile (type assertion: client has no generated DB types)
          const { error: updateError } = await supabase
            .from('profiles')
            .update(profileData as never)
            .eq('id', data.user.id)
          
          if (updateError) {
            console.error('Error updating profile:', updateError)
          }
        } else {
          // Create new profile if it doesn't exist (type assertion: client has no generated DB types)
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              full_name: userData.full_name,
              phone: userData.phone,
            } as never)
          
          if (insertError) {
            console.error('Error creating profile:', insertError)
          }
        }
      } catch (profileError) {
        // Log error but don't fail the sign in
        console.error('Error saving user data:', profileError)
      }
    }
    
    return { error }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string; phone?: string }) => {
    if (!supabase || !user) {
      return { error: { message: 'Supabase is not configured or user is not logged in.' } }
    }
    const { error } = await supabase
      .from('profiles')
      .update(updates as never)
      .eq('id', user.id)

    if (!error) {
      // Refresh user data
      const { data: { user: updatedUser } } = await supabase.auth.getUser()
      setUser(updatedUser)
    }

    return { error }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

