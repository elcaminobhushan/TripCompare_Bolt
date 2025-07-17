import { createClient } from '@supabase/supabase-js';

// Use placeholder values when environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we're using placeholder values
const usingPlaceholders = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');

if (usingPlaceholders) {
  console.error('Missing Supabase credentials. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly connected
export const isSupabaseConnected = () => {
  return !usingPlaceholders;
};
