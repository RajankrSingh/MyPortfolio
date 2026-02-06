# Supabase Setup Guide

This guide will help you set up Supabase authentication and database for your portfolio.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Project Name: `my-portfolio`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Create Database Table for User Profiles

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create a `profiles` table:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under "Site URL", add your local development URL: `http://localhost:3000`
3. Under "Redirect URLs", add:
   - `http://localhost:3000/**`
   - `https://yourdomain.com/**` (for production)

## Step 6: Install Dependencies

Run the following command to install Supabase:

```bash
npm install
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Click the "Login" button in the navbar
3. Try signing up with a new account
4. Check your Supabase dashboard → **Authentication** → **Users** to see the new user

## Features Included

- ✅ User Sign Up
- ✅ User Sign In
- ✅ User Sign Out
- ✅ User Profile Management
- ✅ Protected Routes (can be added)
- ✅ Session Management
- ✅ Automatic Profile Creation

## Next Steps

- Customize the user profile fields in the database
- Add more user data fields as needed
- Implement protected routes for admin sections
- Add email verification if needed

## Troubleshooting

- **"Missing Supabase environment variables"**: Make sure your `.env.local` file exists and has the correct values
- **Authentication not working**: Check that your Supabase project is active and the API keys are correct
- **Database errors**: Make sure you've run the SQL script to create the profiles table

