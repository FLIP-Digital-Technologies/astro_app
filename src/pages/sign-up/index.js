import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
// import { Input as AntInput, } from "antd";
import {
  checkEmailAvailability,
  registerUser,
} from "../../redux/actions/Auths";
import { notification } from "antd";
import Footer from "../../components/footer";

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
    handleReferralCode(referralCode);
  }, []);

  const history = useHistory();

  const register = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (password !== confirmPassword) {
      notification.error({
        message: "Password does not match",
        duration: 2.5,
      });
      return;
    }
  

    if (referralCode === null) {
      props.checkEmailAvailable({
        email,
        password,
        firstName,
        lastName,
        username,
      });
    } else {
      props.checkEmailAvailable({
        referralCode,
        email,
        password,
        firstName,
        lastName,
        username,
      });
    }
  };
  return (
    <div>
      <AuthHeader form="signup">
        <form onSubmit={(e) => register(e)} className={styles.auth__content}>
          <h2 className={styles.auth__content__title}>Let's get started!</h2>
          <h3 className={styles.auth__content__subTitle}>
            Create your Astro account in a sec!
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
            inputMode={"email"}
            id="email"
            value={email}
            // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,9}$"
            type="email"
            label="Email"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Password"
            onChange={(e) => handlePassword(e.target.value)}
            required={true}
            minLength={"6"}
            // pattern={"^\S{6,}$"}
            value={password}
            // error={password.trim() < 6 }
            errorMessage={"Password must be a minimum of 6 characters"}
            type="password"
            label="Password"
          />
          {/* <>
          
          <AntInput.Password
          className={styles.auth__content__input__body}

          placeholder="Password"
          onChange={(e) => handlePassword(e.target.value)}
          required={true}
          minLength={'6'}
          value={password}
          />
          </> */}
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Confirm Password"
            onChange={(e) => handleConfirmPassword(e.target.value)}
            required={true}
            // minLength={"6"}
            // pattern={"^(?=.*[a-z])\S{6,}$"}
            value={confirmPassword}
            error={password !== confirmPassword}
            errorMessage={"Password does not match"}
            type="password"
            label="Confirm password"
          />
          <Input
            className={styles.auth__content__input__body}
            inputClass={styles.auth__content__input}
            placeholder="Referral Code (Optional)"
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
            <span>Already have a Astro account? </span>
            <span className={styles.auth__content__alt__link}>Sign In</span>
          </div>
        </form>
      </AuthHeader>
      <Footer />
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
