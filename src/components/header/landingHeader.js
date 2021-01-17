import React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { LogoWhiteBig, LogogBlack } from "../../assets/svg";
import Button from "../button";
import styles from "./style.module.scss";

const LandingHeader = ({ form }) => {
  let location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  return (
    <div
      className={`${styles.landingHeader} ${form === "white" && styles.rev}`}
    >
      <div className={styles.landingHeaderLeft}>
        {console.log({ pathname })}
        <Link to="/">
          {form === "white" ? <LogogBlack /> : <LogoWhiteBig />}{" "}
        </Link>
        <div className={styles.landingHeaderLeftLinks}>
          <Link to="/rates">
            <div
              className={`${styles.landingHeaderLeftLinksItem}  ${
                form === "white" && styles.rev
              } ${pathname === "/rates" && styles.active}`}
            >
              Rates
            </div>
          </Link>
          <Link to="/about">
            <div
              className={`${styles.landingHeaderLeftLinksItem}  ${
                form === "white" && styles.rev
              }  ${pathname === "/about" && styles.active}`}
            >
              About
            </div>
          </Link>
        </div>
      </div>

      <div>
        <Button
          onClick={() => history.push("/signin")}
          form="full"
          text="Login"
          className={`${styles.login} ${form === "white" && styles.rev}`}
        />
        <Button
          onClick={() => history.push("/signup")}
          form="full"
          text="Get Started"
        />
      </div>
    </div>
  );
};

export default LandingHeader;
