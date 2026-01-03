import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.43.0';

// Configuration Supabase avec variables d'environnement Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erreur critique: Variables d\'environnement Supabase manquantes');
  console.error('Vérifiez: VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
