import { supabase } from './supabase';
import { User, UserRole, AuthState } from '../types';

export const AuthService = {
  async register(email: string, password: string, firstName: string, lastName: string, role: UserRole, firmName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
          firm_name: firmName
        }
      }
    });
    if (error) throw error;
    return data.user;
  },

  async login(email: string, password: string) {
    // ÉTAPE 1 : Se connecter à Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // ÉTAPE 2 : Récupérer le user
    const user = data.user;
    if (!user) throw new Error('Impossible de récupérer les données utilisateur');

    // ÉTAPE 3 : Chercher le profil dans profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // ÉTAPE 4 : Retourner les données enrichies
    if (profile) {
      return {
        user: {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          joinedDate: new Date(profile.created_at)
        },
        session: data.session
      };
    }

    // ÉTAPE 5 : Fallback si pas de profil
    return {
      user: {
        id: user.id,
        email: user.email
      },
      session: data.session
    };
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async updateProfile(userId: string, profile: { firstName: string, lastName: string, firmName: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.firstName,
        last_name: profile.lastName,
        firm_name: profile.firmName
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      joinedDate: new Date(data.created_at),
      status: 'actif' as const,
      firmName: data.firm_name
    };
  },

  async getAuthState(): Promise<AuthState> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { user: null, token: null, isAuthenticated: false };

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !profile) return { user: null, token: null, isAuthenticated: false };

    return {
      user: {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role,
        joinedDate: new Date(profile.created_at),
        status: 'actif',
        firmName: profile.firm_name
      },
      token: session.access_token,
      isAuthenticated: true
    };
  }
};
import { supabase } from './supabase';
import { User, UserRole, AuthState } from '../types';

export const AuthService = {
  async register(email: string, password: string, firstName: string, lastName: string, role: UserRole, firmName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
          firm_name: firmName
        }
      }
    });
    if (error) throw error;
    return data.user;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async updateProfile(userId: string, profile: { firstName: string, lastName: string, firmName: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.firstName,
        last_name: profile.lastName,
        firm_name: profile.firmName
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      joinedDate: new Date(data.created_at),
      status: 'actif' as const,
      firmName: data.firm_name
    };
  },

  async getAuthState(): Promise<AuthState> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { user: null, token: null, isAuthenticated: false };

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !profile) return { user: null, token: null, isAuthenticated: false };

    return {
      user: {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role,
        joinedDate: new Date(profile.created_at),
        status: 'actif',
        firmName: profile.firm_name
      },
      token: session.access_token,
      isAuthenticated: true
    };
  }
};
