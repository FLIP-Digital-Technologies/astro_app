import * as actionTypes from "../constants";
import authService from "../services/AuthService";
import { history } from "../store";

const CheckEmailAvailability = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CHECK_EMAIL_AVAILABILITY_PENDING,
  });

  await authService
    .checkEmailAvailability(data)
    .then((response) => {
      dispatch({
        type: actionTypes.CHECK_EMAIL_AVAILABILITY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CHECK_EMAIL_AVAILABILITY_FAILED,
        payload: err,
      });
    });
}; // done

export const checkEmailAvailability = (data) => (dispatch) => {
  dispatch(CheckEmailAvailability(data));
}; // done

const RegisterUser = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.REGISTER_PENDING,
  });

  await authService
    .createAccount(data)
    .then((response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      localStorage.setItem("type", response.data.user.type);
      history.push("/verification");
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.REGISTER_FAILED,
        payload: err,
      });
    });
}; // done

export const registerUser = (data) => (dispatch) => {
  dispatch(RegisterUser(data));
}; // done

const LoginUser = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_PENDING,
  });

  await authService
    .loginAccount(data)
    .then((response) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      localStorage.setItem("type", response.data.user.type);
      localStorage.setItem("type", response.data.user.type);
      console.log(response.data.token);
      if (response.data.user.type === "NEW_USER") {
        history.push("/verification");
      } else {
        history.push("/app");
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
        payload: err,
      });
    });
}; // done

export const loginUser = (data) => (dispatch) => {
  dispatch(LoginUser(data));
}; // done

const LogOutUser = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_PENDING,
  });

  await localStorage.clear();
  window.location.href = "/";

  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
  });
}; // done

export const logOutUser = () => (dispatch) => {
  dispatch(LogOutUser());
}; // done

const VerifyEmailOTP = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.VERIFY_EMAIL_OTP_PENDING,
  });

  await authService
    .verifyEmail({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.VERIFY_EMAIL_OTP_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.updated_token);
      localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      localStorage.setItem("type", response.data.user.type);
      history.push("/app/onboarding");
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.VERIFY_EMAIL_OTP_FAILED,
        payload: err,
      });
    });
}; // done

export const verifyEmailOTP = (data) => (dispatch) => {
  dispatch(VerifyEmailOTP(data));
}; // done

const ResendEmailVerificationCode = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.RESEND_EMAIL_OTP_CODE_PENDING,
  });

  await authService
    .resendVerificationCode({ userId })
    .then((response) => {
      dispatch({
        type: actionTypes.RESEND_EMAIL_OTP_CODE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RESEND_EMAIL_OTP_CODE_FAILED,
        payload: err,
      });
    });
}; // done

export const resendEmailVerificationCode = () => (dispatch) => {
  dispatch(ResendEmailVerificationCode());
}; // done

const ChangePassword = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CHANGE_USER_PASSWORD_PENDING,
  });

  await authService
    .changePassword({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.CHANGE_USER_PASSWORD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CHANGE_USER_PASSWORD_FAILED,
        payload: err,
      });
    });
};

export const changePassword = (data) => (dispatch) => {
  dispatch(ChangePassword(data));
};

const ResetPassword = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_USER_PASSWORD_PENDING,
  });
  await authService
    .resetPassword(data)
    .then((response) => {
      dispatch({
        type: actionTypes.RESET_USER_PASSWORD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RESET_USER_PASSWORD_FAILED,
        payload: err,
      });
    });
};

export const resetPassword = (data) => (dispatch) => {
  dispatch(ResetPassword(data));
};

const CompleteResetPassword = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.COMPLETE_RESET_USER_PASSWORD_PENDING,
  });

  await authService
    .completePasswordReset({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.COMPLETE_RESET_USER_PASSWORD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.COMPLETE_RESET_USER_PASSWORD_FAILED,
        payload: err,
      });
    });
};

export const completeResetPassword = (data) => (dispatch) => {
  dispatch(CompleteResetPassword(data));
};
