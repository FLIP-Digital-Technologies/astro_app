import React from "react";
import styles from "./style.module.scss";
import LandingHeader from "./landingHeader";
import AuthBG from "../../assets/svg/authbg.svg";

const AuthHeader = ({ form, children }) => {
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
            src={AuthBG}
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
