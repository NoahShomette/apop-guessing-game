import { useContext, useEffect, useState } from 'react'
import { SupabaseContext, SupabaseSession } from '../../context/supabaseContext';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';

import styles from "./Authenticate.module.css";
import Button from '../interface/Button';
import { ButtonSize } from '../../utils/options';

export default function Authenticate() {
    const supabase = useContext(SupabaseContext);
    const session = useContext(SupabaseSession);

    if (session == null) {
        return (
            <div className={styles.authMain}>
                <div className={styles.authHolder}>
                    <Auth
                        supabaseClient={supabase}
                        providers={[]}
                        appearance={{ theme: ThemeSupa }}
                    />
                </div>
            </div>
        )
    } else {
        const handleSignOut = () => {
            supabase.auth.signOut();
        };
        return (
            <div className={styles.authMain}>
                <Button
                    buttonText={{ buttonText: "Sign Out", textSize: ButtonSize.medium }}
                    buttonOnClick={handleSignOut}
                    background={true}
                />
            </div>
        )
    }
}
