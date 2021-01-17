import React from "react";
import Button from "../button";
import { Link } from "react-router-dom";
import { LogoFooter, AppleIcon, AndroidIcon } from "../../assets/svg";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopSub}>
          ENJOY CONVENIENCE AT IT’S BEST
        </div>
        <div className={styles.footerTopMain}>
          Get started and explore our services
        </div>
        <Link to="/signin">
          <Button text="Get Started" form="full" />
        </Link>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.left}>
          <LogoFooter className={styles.logo} />
          <div className={styles.main}>Speed and convenience</div>
          <div className={styles.sub}>Available one web, coming soon for</div>
          <div className={styles.btnHolder}>
            <div className={styles.iosBtn}>
              <AppleIcon /> <span>ios</span>
            </div>
            <div className={`${styles.iosBtn} ${styles.android}`}>
              <AndroidIcon /> <span>Android</span>
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div>
            <Link to="/app">
              <div className={styles.link}>Account</div>
            </Link>
            <Link to="/signin">
              <div className={styles.link}>Get Started</div>
            </Link>
            <Link to="/rates">
              <div className={styles.link}>Rates</div>
            </Link>
          </div>
          <div>
            <Link to="/about">
              <div className={styles.link}>About</div>
            </Link>
            <Link to="/">
              <div className={styles.link}>Contact Us</div>
            </Link>
          </div>
          <div>
            <div className={styles.link}>Legal</div>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default Footer;
