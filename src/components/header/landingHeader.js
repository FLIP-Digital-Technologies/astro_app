import React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { LogoNav } from "../../assets/svg";
import Button from "../button";
import styles from "./style.module.scss";

const LandingHeader = ({ form, type }) => {
  let location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  return (
    <div
      className={`${styles.landingHeader} ${form === "white" && styles.rev}`}
    >
      <div className={styles.landingHeaderLeft}>
        <Link to="/">
          <LogoNav className={styles.landingHeaderLeftLogo} />
        </Link>
      </div>

      <div className={styles.landingHeaderLeftLinks}>
        <div className={styles.landingHeaderLeftLinks}>
          <div
            className={`${styles.landingHeaderLeftLinksItem}  ${
              form === "white" && styles.rev
            } ${pathname === "/rates" && styles.active}`}
          >
            About
          </div>

          <div
            className={`${styles.landingHeaderLeftLinksItem}  ${
              form === "white" && styles.rev
            }  ${pathname === "/about" && styles.active}`}
          >
            Get Help
          </div>
        </div>
        {type === "signup" || !type ? (
          <Button
            onClick={() => history.push("/signin")}
            form="full"
            text="Login"
            className={`${styles.login} ${form === "white" && styles.rev}`}
          />
        ) : null}

        {type !== "signup" ? (
          <Button
            onClick={() => history.push("/signup")}
            form="full"
            text="Sign up"
            className={styles.signup}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LandingHeader;
