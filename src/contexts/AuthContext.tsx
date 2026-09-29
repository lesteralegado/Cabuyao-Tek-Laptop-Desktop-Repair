import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { StaffProfile } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  profile: StaffProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let generation = 0;
    let pendingTimer: number | undefined;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const currentGeneration = ++generation;
      window.clearTimeout(pendingTimer);
      setUser(session?.user ?? null);
      setProfile(null);

      if (!session?.user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      // Supabase calls inside this callback can deadlock. Run the profile query after it returns.
      pendingTimer = window.setTimeout(() => {
        void (async () => {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('id, name, role, created_at, updated_at')
              .eq('id', session.user.id)
              .single();
            if (error) throw error;
            if (active && currentGeneration === generation) {
              setProfile({
                id: data.id,
                name: data.name,
                role: data.role,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
              });
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
            if (active && currentGeneration === generation) setProfile(null);
          } finally {
            if (active && currentGeneration === generation) setLoading(false);
          }
        })();
      }, 0);
    });

    return () => {
      active = false;
      window.clearTimeout(pendingTimer);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
