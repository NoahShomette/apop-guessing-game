import React from "react";
import Authenticate from "../components/auth/Authenticate";
import styles from "./Authenticate.module.css";
import AccountManager from "../components/account/Account";

function ManageAuthenticate() {

    return (
        <>
            <h1>Authenticate</h1>
            <div className={styles.authenticationHolder}>
                <Authenticate></Authenticate>
                <AccountManager></AccountManager>
            </div>
        </>
    );
};

export default ManageAuthenticate;
