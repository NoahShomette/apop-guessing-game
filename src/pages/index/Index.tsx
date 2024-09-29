import React from "react";
import styles from "./Index.module.css";
import Button, { LinkType } from "../../components/interface/Button";
import { ButtonSize } from "../../utils/options";

function Index() {
    return (
        <>
            <div className={styles.indexBody}>

                <div className={styles.indexHeader}>
                    <h1>Play Today!</h1>
                    <h2>How much do <strong>you</strong> know about the Idols?</h2>
                    <div className={styles.callOutButtons}>
                        <Button
                            buttonText={{ buttonText: "Play!", textSize: ButtonSize.medium }}
                            link={{ linkType: LinkType.internal, link: "/play" }}
                            background={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
