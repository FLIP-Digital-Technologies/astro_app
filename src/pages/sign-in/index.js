import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { loginUser } from "../../redux/actions/Auths";

const SignIn = (props) => {
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  const history = useHistory();

  const login = (e) => {
    if (e) {
      e.preventDefault();
    }
    props.submitLogin({
      email,
      password,
    });
  };
  return (
    <div>
      <AuthHeader form="signin">
        <form className={styles.auth__content} onSubmit={(e) => login(e)}>
          <h2 className={styles.auth__content__title}>Welcome back!</h2>
          <h3 className={styles.auth__content__subTitle}>
            Sign in to your Flip account
          </h3>

          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Email"
            onChange={(e) => handleEmail(e.target.value)}
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
            type="email"
            required={true}
            label="Email"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Password"
            onChange={(e) => handlePassword(e.target.value)}
            value={password}
            type="password"
            required={true}
            label="Password"
          />
          <div className={styles.auth__content__forgot}>Forgot Password?</div>
          <Button
            className={styles.auth__content__button}
            form="full"
            type="submit"
            text="Login"
          />
          <div
            onClick={() => {
              history.push("/signup");
            }}
            className={styles.auth__content__alt}
          >
            <span>New to Flip? </span>
            <span className={styles.auth__content__alt__link}>Sign Up</span>
          </div>
        </form>
      </AuthHeader>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (data) => {
    dispatch(loginUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
