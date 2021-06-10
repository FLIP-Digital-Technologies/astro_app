import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AuthHeader, AnotherHeader } from "../../components/header";
import { useHistory } from "react-router-dom";
import styles from "../styles.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { verifyEmailToken } from "../../redux/actions/Auths";

function VerifyEmail({ loading, verifyEmail }) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const userId = url.searchParams.get("userId");
    verifyEmail({ userId: "4", token: "345435353434r4fsdcsdcsdc" });
    // setOtp_code(token);
    // setUserId(userIds)
  }, []);

  const history = useHistory();

  const [otp_code, setOtp_code] = useState("");
  const [userId, setUserId] = useState("");
  return (
    <div>
      <AnotherHeader>
        <div>
          <h2 className={styles.auth__content__title}>Email Verification!</h2>
          {loading && (
            <h3 className={styles.auth__content__subTitle}>Please wait ...</h3>
          )}
          {!loading && (
            <h3 className={styles.auth__content__subTitle}>Successful !!!</h3>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && (
              <LoadingOutlined style={{ fontSize: 50, color: "#921946" }} />
            )}
            {!loading && (
              <img
                src={
                  "https://cdn.dribbble.com/users/452635/screenshots/8215076/media/9178cc623b1d395f6e87da128bf63d49.png?compress=1&resize=1600x1200"
                }
                width="380"
                height="260"
              />
            )}
          </div>
        </div>
      </AnotherHeader>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (data) => {
    dispatch(verifyEmailToken(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
