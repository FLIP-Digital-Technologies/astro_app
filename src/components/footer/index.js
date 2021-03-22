import React from "react";
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
          <div style={{ textAlign: "center" }}>
            <div className={styles.link} style={{display: "flex", justifyContent: "center"}}>
              <a class="nav-link" style={{color: "white", fontSize: 18, margin: 7}} href="https://twitter.com/FlipAfrika">
                <i class="fab text-dark fa-twitter"></i>
              </a>
              <a class="nav-link" style={{color: "white", fontSize: 18, margin: 7}} href="https://web.facebook.com/FlipAfrika">
                <i class="fab text-dark fa-facebook"></i>
              </a>
              <a class="nav-link" style={{color: "white", fontSize: 18, margin: 7}} href="https://www.instagram.com/FlipAfrika">
                <i class="fab text-dark fa-instagram"></i>
              </a>
            </div>
            <div style={{marginBottom: 8}} className={styles.link}>
              <a
                style={{ color: "white" }}
                href="mailto:support@Flipafrika.com"
              >
                Email Us: support@Flipafrika.com
              </a>
            </div>
            <div className={styles.link}>
              <address>Lagos Address - Magodo Lagos</address>
              <address>Accra Address - 2,Anumansa street, accra ghana.</address>
            </div>
            <div className={styles.link}>
              <p>All Rights Reserved. Flip 2020</p>
            </div>
          </div>
        </div>
        {/* <div className={styles.right}></div> */}
      </div>
    </div>
  );
};

export default Footer;
