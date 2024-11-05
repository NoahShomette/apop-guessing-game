import React, { useContext } from "react";
import Authenticate from "../components/auth/Authenticate";
import styles from "./Authenticate.module.css";
import AccountManager from "../components/account/Account";
import { AccountDataContext, SupabaseSession } from "../context/supabaseContext";

function ManageAuthenticate() {
    const accountInfo = useContext(AccountDataContext);
    const session = useContext(SupabaseSession);


    var greetingsText = session ? "Hi " + accountInfo?.accountInfo.username + "!" : "Sign In or Create an Account!"

    return (
        <>
            <div className={styles.authBody}>
                <h1>{greetingsText}</h1>
                <div className={styles.authenticationHolder}>
                    <Authenticate></Authenticate>
                    {session ? <AccountManager></AccountManager> : ""}

                </div>
            </div >
        </>
    );
};

export default ManageAuthenticate;
