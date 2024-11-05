import { ReactNode, useContext, useEffect, useState } from 'react';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';
import { AccountInfo } from '../definitions/account';

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

// ACCOUNT

export interface AccountContext {
    accountInfo: AccountInfo
    UpdatedUsername: () => void,
}

export const AccountDataContext = createContext<AccountContext | null>(null);


// PROVIDER

export const SupabaseProvider = ({ children }: Props) => {
    const supabase = useSupabase();
    const [session, setSession] = useState<Session | null>(null)
    const [username, setUsername] = useState<string>("Loading Username")
    const [admin, setAdmin] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [requestingAccount, setRequestAccount] = useState(false)

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


    useEffect(() => {
        let ignore = false
        setLoading(true)

        async function getProfile() {
            if (session != null) {
                const { user } = session

                const { data, error } = await supabase
                    .from('profiles')
                    .select(`username, admin`)
                    .eq('id', user.id)
                    .single()

                if (!ignore) {
                    if (error) {
                        console.warn(error)
                    } else if (data) {
                        setUsername(data.username)
                        setAdmin(data.admin)
                        setLoading(false)
                        setRequestAccount(false);
                    }
                }
            }

        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session, supabase, requestingAccount])


    const updateUsername = () => {
        setRequestAccount(true);
    }

    return (
        <SupabaseContext.Provider value={supabase}>
            <SupabaseSession.Provider value={session}>
                <AccountDataContext.Provider value={loading ? null : { accountInfo: { username: username, admin: admin }, UpdatedUsername: updateUsername }}>
                    {children}
                </AccountDataContext.Provider>
            </SupabaseSession.Provider>
        </SupabaseContext.Provider >
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
