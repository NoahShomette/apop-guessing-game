import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import styles from "./Layout.module.css";

const Layout = () => {

    return (
        <>
            <div className={styles.pageBody}>
                <Navbar />
                <div className={styles.outletBody}>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
