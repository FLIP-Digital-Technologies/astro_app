import * as actionTypes from "../constants";
import authService from "../services/AuthService";
import generalService from "../services/GeneralService"
import { history } from "../store";

const CheckEmailAvailability = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CHECK_EMAIL_AVAILABILITY_PENDING,
  });
  let payload = {};
  payload.email = data.email;
  console.log(authService);
  await authService
    .checkEmailAvailability(payload)
    .then((response) => {
      console.log("response", response);
      if (response.message === "Email does not exist'}") {
      }
      dispatch({
        type: actionTypes.CHECK_EMAIL_AVAILABILITY_SUCCESS,
        payload: response.data,
      });
      dispatch(RegisterUser(data));
    })
    .catch((err) => {
      console.log("response", err);
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
      history.push({
        pathname: "/verification",
        state: { detail: "register" },
      });
    })
    .catch((err) => {
      console.log("errors", err);
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
      // console.log(response.data.token);
      if (!response.data.user.is_verified) {
        history.push({
          pathname: "/verification",
          state: { detail: "login" },
        });
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

const getUserDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_USER_DETAILS_BY_ID_PENDING,
  });
  let data = {}
  data.userId = userId

  await authService
    .getUserDetails(data)
    .then((response) => {
      console.log('response success', response)
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS,
        payload: response.data,
      });
      // localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      // localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      // localStorage.setItem("type", response.data.user.type);
      // history.push("/app/onboarding");
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_FAILED,
        payload: err,
      });
    });
};

export const GetUserDetails = (data) => (dispatch) => {
  dispatch(getUserDetails(data));
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

const VerifyEmailOTP = (payload) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  const reference = localStorage.getItem("reference");
  let data = { ...payload, reference };
  dispatch({
    type: actionTypes.VERIFY_EMAIL_OTP_PENDING,
    payload: data,
  });

  await authService
    .verifyEmail({ userId }, data)
    .then((response) => {
      console.log("email success", response);
      dispatch({
        type: actionTypes.VERIFY_EMAIL_OTP_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem(actionTypes.AUTH_TOKEN, response.data.token);
      // localStorage.setItem(actionTypes.AUTH_TOKEN_ID, response.data.user.id);
      // localStorage.setItem("type", response.data.user.type);
      history.push("/app/onboarding");
    })
    .catch((err) => {
      console.log("error email", err);
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
      localStorage.setItem("reference", response.data.reference);
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
      localStorage.setItem("reference", response.data.reference);
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

const CompleteResetPassword = (payload) => async (dispatch) => {
  const reference = localStorage.getItem("reference");
  let data = {...payload, reference}
  dispatch({
    type: actionTypes.COMPLETE_RESET_USER_PASSWORD_PENDING,
    payload:data
  });
  

  await authService
    .completePasswordReset(data)
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

const GetFiatCurrencies = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_FIAT_CURRENCY_PENDING,
  });

  await generalService
    .getFiatCurrency()
    .then((response) => {
      dispatch({
        type: actionTypes.GET_FIAT_CURRENCY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("errors", err);
      dispatch({
        type: actionTypes.GET_FIAT_CURRENCY_FAILED,
        payload: err,
      });
    });
}; // done

export const getFiatCurrencies = (data) => (dispatch) => {
  dispatch(GetFiatCurrencies(data));
};

const GetCryptoCurrencies = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CRYPTO_CURRENCY_PENDING,
  });

  await generalService
    .getCryptoCurrency()
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CRYPTO_CURRENCY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("errors", err);
      dispatch({
        type: actionTypes.GET_CRYPTO_CURRENCY_FAILED,
        payload: err,
      });
    });
}; // done

export const getCryptoCurrencies = (data) => (dispatch) => {
  dispatch(GetCryptoCurrencies(data));
};

const GetUserWallets = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_USER_WALLETS_PENDING,
  });

  await generalService
    .getUserWallets({userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_WALLETS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("errors", err);
      dispatch({
        type: actionTypes.GET_USER_WALLETS_FAILED,
        payload: err,
      });
    });
}; // done

export const getUserWallets = () => (dispatch) => {
  dispatch(GetUserWallets());
};

const CreateFiatWallet = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CREATE_USER_WALLET_PENDING,
  });

  await generalService
    .createFiatWallet({userId}, data)
    .then((response) => {
      dispatch({
        type: actionTypes.CREATE_USER_WALLET_SUCCESS,
        payload: response.data,
      });
      dispatch(GetUserWallets());
    })
    .catch((err) => {
      console.log("errors", err);
      dispatch({
        type: actionTypes.CREATE_USER_WALLET_FAILED,
        payload: err,
      });
    });
}; // done

export const createFiatWallet = (data) => (dispatch) => {
  dispatch(CreateFiatWallet(data));
};

const CreateCryptoWallet = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CREATE_USER_WALLET_PENDING,
  });

  await generalService
    .createCryptoWallet({userId}, data)
    .then((response) => {
      dispatch({
        type: actionTypes.CREATE_USER_WALLET_SUCCESS,
        payload: response.data,
      });
      dispatch(GetUserWallets());
    })
    .catch((err) => {
      console.log("errors", err);
      dispatch({
        type: actionTypes.CREATE_USER_WALLET_FAILED,
        payload: err,
      });
    });
}; // done

export const createCryptoWallet = (data) => (dispatch) => {
  dispatch(CreateCryptoWallet(data));
};