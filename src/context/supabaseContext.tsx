import { ReactNode, useContext, useEffect, useState } from 'react';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';

type Props = {
    children: ReactNode;
};

// CORE CONTEXT

export const SupabaseContext = createContext<SupabaseClient>(createClient(process.env.REACT_APP_SUPABASE_URL!, process.env.REACT_APP_SUPABASE_ANON_KEY!));

const useSupabase = () => {
    return useContext(SupabaseContext);
};

// SESSION
export const SupabaseSession = createContext<Session | null>(null);


// PROVIDER

export const SupabaseProvider = ({ children }: Props) => {
    const supabase = useSupabase();
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    return (
        <SupabaseContext.Provider value={supabase}>
            <SupabaseSession.Provider value={session}>
                {children}
            </SupabaseSession.Provider>
        </SupabaseContext.Provider>
    );
};

/* 
// Exmaple usage in a component


import { useContext } from 'react';
import { SupabaseContext } from './SupabaseProvider';

const MyComponent = () => {
  const { supabase } = useContext(SupabaseContext);
  // You can now use the supabase client
};

*/
