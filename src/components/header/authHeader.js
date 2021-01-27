import React from "react";
import { useHistory, Link } from "react-router-dom";
import { LogogBlack, MidCards } from "../../assets/svg";
import Button from "../button";
import styles from "./style.module.scss";
import LandingHeader from "./landingHeader";

const AuthHeader = ({ form, children }) => {
  const history = useHistory();
  return (
    <>
      {/* <div className={styles.header}>
        <Link to="/">
          <LogogBlack />
        </Link>
        {form === "signup" ? (
          <Button
            onClick={() => history.push("/signin")}
            form="full"
            text="Login"
          />
        ) : (
          <Button
            onClick={() => history.push("/signup")}
            form="full"
            text="Get Started"
          />
        )}
      </div> */}

      <LandingHeader type={form} />

      <div className={styles.auth}>
        <div className={styles.auth__left}>
          <img
            className={styles.auth__left__image}
            src="https://via.placeholder.com/500X500.png"
            alt=""
          />
        </div>
        <div className={styles.auth__right}>
          <div className={styles.auth__right__content}>{children}</div>{" "}
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
