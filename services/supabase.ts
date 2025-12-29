
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.43.0';

// Utilisation de l'URL spécifique fournie par l'utilisateur
const supabaseUrl = 'https://waxfwynckfivwpkpbayt.supabase.co';
// Note: La clé ANON doit être configurée dans les variables d'environnement pour la sécurité
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
