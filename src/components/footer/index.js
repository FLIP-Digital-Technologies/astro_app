import React from "react";
import Button from "../button";
import { Link } from "react-router-dom";
import { LogoNav, AppleIcon, AndroidIcon } from "../../assets/svg";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerBottom}>
        {/* <div className={styles.left}>
          <LogoNav className={styles.logo} />
          <div className={styles.btnHolder}>
            <div className={`${styles.iosBtn} ${styles.android}`}>
              <AndroidIcon /> <span>Android</span>
            </div>
          </div>
        </div> */}
        <div className={styles.center}>
          {/* <div>
            <Link to="/app">
              <div className={styles.link}>Account</div>
            </Link>
            <Link to="/signin">
              <div className={styles.link}>Get Started</div>
            </Link>
            <Link to="/rates">
              <div className={styles.link}>Rates</div>
            </Link>
          </div> */}
          {/* <div>
            <Link to="/about">
              <div className={styles.link}>About</div>
            </Link>
            <Link to="/">
              <div className={styles.link}>Contact Us</div>
            </Link>
          </div> */}
          <div>
            <div className={styles.link}>All Rights Reserved. Flip 2020</div>
          </div>
        </div>
        {/* <div className={styles.right}></div> */}
      </div>
    </div>
  );
};

export default Footer;
