import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Input as AntInput } from "antd";
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { loginUser, resetPassword, completeResetPassword } from "../../redux/actions/Auths";

const SignIn = (props) => {
  const history = useHistory();
  const [resetCode, setResetCode] = useState("");
  const [resetEmail, handleResetEmail] = useState("");
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [newPassword, handleNewPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [switchReset, setSwitch] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const login = (e) => {
    if (e) {
      e.preventDefault();
    }
    props.submitLogin({
      email,
      password,
    });
  };

  const resetPassword = (e) => {
    props.ResetPasswordViaEmail({
      email: resetEmail,
    });
    setSwitch(false)
  };

  const completeResetPassword = (e) => {
    props.completeResetPassword({
      email: resetEmail,
      resetCode,
      newPassword
    });
    handleCancel();
    setSwitch(true);
  };

  return (
    <div className={styles.allFont}>
      <Modal
        footer={null}
        title="Reset Password"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        {switchReset ? (
          <div>
            <Input
              className={styles.auth__content__input__body}
              inputClass={styles.auth__content__input}
              placeholder="Email"
              onChange={(e) => handleResetEmail(e.target.value)}
              value={resetEmail}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
              required={true}
              label="Please enter your registered email."
            />
            <Button
              className={styles.auth__content__button}
              form="full"
              onClick={(e) => resetPassword(e)}
              text="Submit"
            />
          </div>
        ) : (
          <div>
            
            <Input
              className={styles.auth__content__input__body}
              inputClass={styles.auth__content__input}
              placeholder="123456"
              onChange={(e) => setResetCode(e.target.value)}
              value={resetCode}
              type="number"
              required={true}
              label="Please enter the OTP sent to your email."
            />
            <Input
              className={styles.auth__content__input__body}
              inputClass={styles.auth__content__input}
              placeholder="New Password"
              onChange={(e) => handleNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              required={true}
              label="New Password"
            />
            <Button
              className={styles.auth__content__button}
              form="full"
              onClick={(e) => completeResetPassword(e)}
              text="Submit"
            />
          </div>
        )}
      </Modal>
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
            style={{borderRadius:10}}
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
            style={{borderRadius:10}}
          />
          <div  onClick={showModal} style={{cursor: "pointer"}} className={styles.auth__content__forgot}>Forgot Password?</div>
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
            <span>New to Astro? </span>
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
  ResetPasswordViaEmail: (data) => {
    dispatch(resetPassword(data));
  },
  completeResetPassword: (data) => {
    dispatch(completeResetPassword(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
