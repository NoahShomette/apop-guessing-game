import { useContext, useEffect, useState } from "react";
import styles from "./Account.module.css";
import { SupabaseContext, SupabaseSession } from "../../context/supabaseContext";

export default function AccountManager() {
    const supabase = useContext(SupabaseContext);
    const session = useContext(SupabaseSession);
    const [oldUsername, setOldUsername] = useState<string | null>()
    const [username, setUsername] = useState<string | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            if (session == null) {
                return (
                    < div className={styles.spacerHolder} >
                        Not Signed in
                    </div >
                )
            }
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select(`username`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setOldUsername(data.username)
                    setUsername(data.username)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session, supabase])

    async function updateProfile(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setLoading(true)
        if (session == null) {
            return (
                < div className={styles.spacerHolder} >
                    Not Signed in
                </div >
            )
        }
        const { user } = session

        const updates = {
            id: user.id,
            username,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        }
        setOldUsername(username)

        setLoading(false)
    }

    if (session == null) {
        return (
            < div className={styles.spacerHolder} >
                Not Signed in
            </div >
        )
    }

    return (
        <div className={styles.spacerHolder}>
            {oldUsername}
            <form onSubmit={updateProfile} className="form-widget">
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={session.user.email} disabled />
                </div>
                <div>
                    <label htmlFor="username">Name</label>
                    <input
                        id="username"
                        type="text"
                        required
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <button className="button block primary" type="submit" disabled={loading}>
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    )
}
