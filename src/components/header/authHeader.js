import React from "react";
import { useHistory, Link } from "react-router-dom";
import { LogogBlack } from "../../assets/svg";
import Button from "../button";
import styles from "./style.module.scss";

const AuthHeader = ({ form }) => {
  const history = useHistory();
  return (
    <div className={styles.header}>
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
    </div>
  );
};

export default AuthHeader;
