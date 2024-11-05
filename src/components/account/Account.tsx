import { useContext, useState } from "react";
import styles from "./Account.module.css";
import { AccountDataContext, SupabaseContext, SupabaseSession } from "../../context/supabaseContext";

export default function AccountManager() {
    const supabase = useContext(SupabaseContext);
    const session = useContext(SupabaseSession);
    const accountInfo = useContext(AccountDataContext);
    const [username, setUsername] = useState<string | null>()
    const [loading, setLoading] = useState(false)


    async function updateProfile(event: { preventDefault: () => void; }) {
        event.preventDefault()
        setLoading(true)
        if (session == null) {
            return (
                < div className={styles.accountBody} >
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
        setLoading(false)
        accountInfo?.UpdatedUsername();
    }


    if (session == null) {
        return (
            < div className={styles.accountBody} >
                Not Signed in
            </div >
        )
    }

    return (
        <div className={styles.accountBody}>
            <div className={styles.accountInfo}>
                <p>{accountInfo?.accountInfo.admin ? "Admin" : ""}</p>
            </div>
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
