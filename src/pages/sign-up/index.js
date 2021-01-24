import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { registerUser } from "../../redux/actions/Auths";
import { notification } from "antd";

const SignUp = (props) => {
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [firstName, handleFirstName] = useState("");
  const [lastName, handleLastName] = useState("");
  const [confirmPassword, handleConfirmPassword] = useState("");

  const history = useHistory();

  const register = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (password !== confirmPassword) {
      notification.error({
        message: "Password does not match",
      });
      return;
    }
    props.submitRegister({
      email,
      password,
      firstName,
      lastName,
    });
  };
  return (
    <div>
      <AuthHeader form="signup">
        <form onSubmit={(e) => register(e)} className={styles.auth__content}>
          <h2 className={styles.auth__content__title}>Let's get started!</h2>
          <h3 className={styles.auth__content__subTitle}>
            Create your Flip account in a sec!
          </h3>
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleFirstName(e.target.value)}
            required={true}
            label="Firstname"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleLastName(e.target.value)}
            required={true}
            label="Last name"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Email"
            onChange={(e) => handleEmail(e.target.value)}
            required={true}
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
            type="email"
            label="Email"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Password"
            onChange={(e) => handlePassword(e.target.value)}
            required={true}
            minLength={"8"}
            pattern={"^[0-9A-Za-z]{8,30}$"}
            value={password}
            errorMessage={"Password must be a minimum of 8 characters"}
            type="password"
            label="Password"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Confirm Password"
            onChange={(e) => handleConfirmPassword(e.target.value)}
            required={true}
            minLength={"8"}
            pattern={"^[0-9A-Za-z]{8,30}$"}
            value={confirmPassword}
            error={password !== confirmPassword}
            errorMessage={"Password does not match"}
            type="password"
            label="Confirm password"
          />
          <div className={styles.auth__content__terms}>
            <span>By proceeding, you agree to </span>
            <span className={styles.auth__content__terms__link}>
              Flip's terms and conditions
            </span>
          </div>
          <Button
            className={styles.auth__content__button}
            form="full"
            text="Sign Up"
            type="submit"
          />

          <div
            onClick={() => {
              history.push("/signin");
            }}
            className={styles.auth__content__alt}
          >
            <span>Already have a Flip account? </span>
            <span className={styles.auth__content__alt__link}>Sign In</span>
          </div>
        </form>
      </AuthHeader>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  submitRegister: (data) => {
    dispatch(registerUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
