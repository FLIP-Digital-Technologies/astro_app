import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { AuthHeader } from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { loginUser } from "../../redux/actions/Auths";

const SignIn = (props) => {
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  const login = (e) => {
    if(e){
      e.preventDefault();
    }
    props.submitLogin({
      email,
      password
    })
  };
  return (
    <div>
      <AuthHeader />
      <form className={styles.auth__content} onSubmit={e => login(e)}>
        <h2 className={styles.auth__content__title}>Welcome Back</h2>
        <Input
          className={styles.auth__content__input__body}
          inputClass={styles.auth__content__input}
          placeholder="Email"
          onChange={(e) => handleEmail(e.target.value)}
          value={email}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
          type="email"
          required={true}
        />
        <Input
          className={styles.auth__content__input__body}
          inputClass={styles.auth__content__input}
          placeholder="Password"
          onChange={(e) => handlePassword(e.target.value)}
          value={password}
          type="password"
          required={true}
        />
        <Button
          className={styles.auth__content__button}
          form="full"
          type="submit"
          text="Login"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps  = dispatch => ({
  submitLogin:  data => {
    dispatch(loginUser(data));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)