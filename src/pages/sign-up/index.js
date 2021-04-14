import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import {
  checkEmailAvailability,
  registerUser,
} from "../../redux/actions/Auths";
import { notification } from "antd";

const SignUp = (props) => {
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [firstName, handleFirstName] = useState("");
  const [lastName, handleLastName] = useState("");
  const [username, handleUsername] = useState("");
  const [referralCode, handleReferralCode] = useState("");
  const [confirmPassword, handleConfirmPassword] = useState("");
  useEffect(() => {
    const url = new URL(window.location.href);
    const referralCode = url.searchParams.get("code"); // TODO: hhjj
    handleReferralCode(referralCode || " ");
  }, []);

  const history = useHistory();

  const register = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (password !== confirmPassword) {
      notification.error({
        message: "Password does not match",
      });
      return;
    }
    // console.log("resulted", result2);

    if(referralCode){
      props.checkEmailAvailable({ 
        referralCode,
        email,
        password,
        firstName,
        lastName,
        username
      })
    } else {
      props.checkEmailAvailable({
        email,
        password,
        firstName,
        lastName,
        username
      })
    }
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
            label="First name"
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
            placeholder="Username"
            value={username}
            onChange={(e) => handleUsername(e.target.value)}
            required={true}
            label="Username"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Email"
            onChange={(e) => handleEmail(e.target.value)}
            required={true}
            name="email"
            id="email"
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
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Referral Code"
            onChange={(e) => handleReferralCode(e.target.value)}
            required={false}
            value={referralCode}
            type="text"
            label="Referral code"
          />
          {/* <div className={styles.auth__content__terms}>
            <span>By proceeding, you agree to </span>
            <span className={styles.auth__content__terms__link}>
              Flip's terms and conditions
            </span>
          </div> */}
          <Button
            className={styles.auth__content__button}
            form="full"
            text="Sign Up"
            // onClick={(e) => register(e)}
            type="submit"
            disabled={
              !email ||
              !password ||
              !firstName ||
              !lastName ||
              !username ||
              props.loading
            }
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

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  submitRegister: (data) => {
    dispatch(registerUser(data));
  },
  checkEmailAvailable: (data) => {
    dispatch(checkEmailAvailability(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
