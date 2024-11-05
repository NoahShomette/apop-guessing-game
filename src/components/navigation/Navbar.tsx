import styles from "./Navbar.module.css";
import {
  faBars,
  faUpRightFromSquare,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Button, { LinkType } from "../interface/Button";
import React, { useContext, useEffect, useState } from "react";
import { useColors } from "../../context/colorsContext";
import { ButtonSize } from "../../utils/options";
import Spacer from "../design/spacers/Spacer";
import { Link } from "react-router-dom";
import { AccountDataContext } from "../../context/supabaseContext";

export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuIsVisible] = useState(false);
  const [mQuery, setMQuery] = useState({ matches: window.innerWidth > 1200 });
  const accountInfo = useContext(AccountDataContext);

  const handleMobileNavClick = () => {
    setMobileMenuIsVisible(!mobileMenuVisible);
  };

  let mobileMenuEnabled = "";
  if (mobileMenuVisible) {
    mobileMenuEnabled = styles.mobileMenuEnabled;
  }

  let gradient = "";

  var elements = document.getElementsByClassName(styles.mobileMenu);

  if (elements[0] instanceof HTMLElement) {
    elements[0].classList.remove(styles.gradient);
  }


  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 1200px)");
    mediaQuery.addEventListener("change", setMQuery);

    return () => mediaQuery.removeEventListener("change", setMQuery);
  }, []);

  let buttonSize: ButtonSize;

  if (mQuery.matches) {
    buttonSize = ButtonSize.small;
  } else {
    buttonSize = ButtonSize.extraSmall;
  }

  return (
    <nav className={[styles.navbar].join(" ")}>
      <Link className={styles.name} to="/">
        <div>A-POP</div>
        <div>Guessing Game</div>
      </Link>
      <div className={styles.rightNav}>
        <div className={styles.buttons}>
          {accountInfo?.accountInfo.admin ? <Button
            buttonText={{ buttonText: "Admin", textSize: buttonSize, textColor: "#dfdfdf", textHover: "#1c1c1c" }}
            link={{ linkType: LinkType.internal, link: "/admin" }}
            backgroundColor="#2274a5"
            backgroundHover="#44a7e0"

            background={true}
          /> : ""}
          <Button
            buttonText={{ buttonText: "Home", textSize: buttonSize }}
            link={{ linkType: LinkType.internal, link: "/" }}
            background={true}
          />
          <Button
            buttonText={{ buttonText: "Play", textSize: buttonSize }}
            link={{ linkType: LinkType.internal, link: "/play" }}
            background={true}
          />
          <Button
            buttonIcon={{ iconDefinition: faUser, iconSize: "lg" }}
            link={{ linkType: LinkType.internal, link: "/account" }}
            background={true}
          />
        </div>
      </div>

      <div
        onClick={handleMobileNavClick}
        className={[styles.mobileBackgroundBlur, mobileMenuEnabled].join(" ")}
      ></div>

      <div className={styles.mobileRightSide}>
        <div className={styles.hamburger}>
          <Button
            buttonIcon={{ iconDefinition: faBars, iconSize: "xl" }}
            buttonOnClick={handleMobileNavClick}
            background={false}
          />
        </div>
      </div>

      <div
        className={[styles.mobileMenu, mobileMenuEnabled, gradient].join(" ")}
      >
        <div className={styles.mobileButtons}>
          {accountInfo?.accountInfo.admin ? <Button
            buttonText={{ buttonText: "Admin", textSize: ButtonSize.medium }}
            link={{ linkType: LinkType.internal, link: "/admin" }}
            buttonOnClick={handleMobileNavClick}
          /> : ""}
          <Button
            buttonText={{ buttonText: "Home", textSize: ButtonSize.medium }}
            link={{ linkType: LinkType.internal, link: "/" }}
            buttonOnClick={handleMobileNavClick}
          />
          <Button
            buttonText={{ buttonText: "Play", textSize: ButtonSize.medium }}
            link={{ linkType: LinkType.internal, link: "/play" }}
            buttonOnClick={handleMobileNavClick}
          />
        </div>
        <div className={styles.mobileMenuNavigation}>
          <div className={styles.mobileMenuLineHolder}>
            <div className={styles.mobileMenuLine}></div>
          </div>
          <div className={styles.mobileMenuTopButtons}>

            <Button
              buttonIcon={{ iconDefinition: faUser, iconSize: "lg" }}
              link={{ linkType: LinkType.internal, link: "/account" }}
              buttonOnClick={handleMobileNavClick}
              background={true}
            />
            <Button
              buttonIcon={{ iconDefinition: faX, iconSize: "lg" }}
              buttonOnClick={handleMobileNavClick}
              background={true}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
