import React, { useContext } from "react";
import styles from "./Admin.module.css";
import Button, { LinkType } from "../../components/interface/Button";
import { ButtonSize } from "../../utils/options";
import { AccountDataContext, SupabaseSession } from "../../context/supabaseContext";

function Index() {
    const session = useContext(SupabaseSession);
    const accountInfo = useContext(AccountDataContext);

    if (accountInfo?.accountInfo.admin === false) {
        return (
            < div className={styles.accountBody} >
                Restricted Page
            </div >
        )
    }
    return (
        <>
            <div className={styles.indexBody}>
                <div className={styles.indexHeader}>
                    <h1>Do Adminy Things</h1>
                </div>
            </div>
        </>
    );
};

export default Index;
