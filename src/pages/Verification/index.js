import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import OtpInput from "react-otp-input";
import { AuthHeader } from "../../components/header";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import {
  resendEmailVerificationCode,
  verifyEmailOTP,
} from "../../redux/actions/Auths";

const VerifyOtp = (props) => {
  const [otp, setOtp] = useState("");

  const login = (e) => {
    if (e) {
      e.preventDefault();
    }
    props.submitEmailOtp({
      otpCode: otp,
    });
  };
  return (
    <div>
      <AuthHeader>
        <form className={styles.auth__content} onSubmit={(e) => login(e)}>
          <h2 className={styles.auth__content__title}>Verify Your Email.</h2>
          <p style={{ textAlign: "center" }}>
            Please enter the OTP code sent to your email address provided.
          </p>
          <OtpInput
            onChange={(otp) => setOtp(otp)}
            numInputs={6}
            value={otp}
            containerStyle={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: 30,
              maxWidth: 300,
              margin: "auto",
            }}
            inputStyle={{
              width: 45,
              height: 45,
              margin: 8,
              border: "1px solid #777777",
              background: "#f6f7f9",
            }}
            separator={<span>-</span>}
          />
          <Button
            className={styles.auth__content__button}
            form="full"
            type="submit"
            text="Submit"
          />
          <div
            style={{ paddingTop: 10 }}
            className={styles.auth__content__terms}
          >
            <span>Resend verification Code.</span>
            <span
              onClick={() => props.resendOTP()}
              className={styles.auth__content__terms__link}
            >
              Click here.
            </span>
          </div>
        </form>
      </AuthHeader>
    </div>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  submitEmailOtp: (data) => {
    dispatch(verifyEmailOTP(data));
  },
  resendOTP: () => {
    dispatch(resendEmailVerificationCode());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
