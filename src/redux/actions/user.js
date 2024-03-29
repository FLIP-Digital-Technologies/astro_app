import { notification } from "antd";
import * as actionTypes from "../constants";
import generalService from "../services/GeneralService";
import referralService from "../services/Referral";
import { GetUserDetails } from "./Auths";
import { history } from "../store";

const key = actionTypes.KEY;

// const GetUserDetailsById = () => async (dispatch) => {
//   const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
//   dispatch({
//     type: actionTypes.GET_USER_DETAILS_BY_ID_PENDING,
//   });

//   await generalService
//     .getUserDetails({ userId })
//     .then((response) => {
//       dispatch({
//         type: actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS,
//         payload: response.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: actionTypes.GET_USER_DETAILS_BY_ID_FAILED,
//         payload: err,
//       });
//     });
//   return;
// }; // done

// export const getUserDetailsById = () => (dispatch) => {
//   dispatch(GetUserDetailsById());
// }; // done

const UpdateUserDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.UPDATE_USER_DETAILS_PENDING,
  });

  await generalService
    .updateUserDetails({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.UPDATE_USER_DETAILS_SUCCESS,
        payload: response.data,
      });
      notification.success({
        message: "Successful updated user details.",
        duration: 2.5,
        key,
      });
      dispatch(GetUserDetails());
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.UPDATE_USER_DETAILS_FAILED,
        payload: err,
      });
    });
  return;
};

export const updateUserDetails = (data) => (dispatch) => {
  dispatch(UpdateUserDetails(data));
};

const SetTransactionPin = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.SET_TRANSACTION_PIN_PENDING,
  });

  await generalService
    .setTransactionPin({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.SET_TRANSACTION_PIN_SUCCESS,
        payload: response.data,
      });
      // GetUserDetails()
      history.push("/app")
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_TRANSACTION_PIN_FAILED,
        payload: err,
      });
    });
};

export const setTransactionPin = (data) => (dispatch) => {
  dispatch(SetTransactionPin(data));
};

const ResetTransactionPin = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.RESET_TRANSACTION_PIN_PENDING,
  });

  await generalService
    .resetTransactionPin({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.RESET_TRANSACTION_PIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RESET_TRANSACTION_PIN_FAILED,
        payload: err,
      });
    });
};

export const resetTransactionPin = (data) => (dispatch) => {
  dispatch(ResetTransactionPin(data));
};

const CompleteResetTransactionPin = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.COMPLETE_RESET_TRANSACTION_PIN_PENDING,
  });

  await generalService
    .completeTransactionPinReset({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.COMPLETE_RESET_TRANSACTION_PIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.COMPLETE_RESET_TRANSACTION_PIN_FAILED,
        payload: err,
      });
    });
};

export const completeResetTransactionPin = (data) => (dispatch) => {
  dispatch(CompleteResetTransactionPin(data));
};

const AddUserBankAccount = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.ADD_BANK_ACCOUNT_PENDING,
  });

  await generalService
    .addBankAccount({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.ADD_BANK_ACCOUNT_SUCCESS,
        payload: response.data,
      });
      dispatch(getUserBankAccount());
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.ADD_BANK_ACCOUNT_FAILED,
        payload: err,
      });
    });
};

export const addUserBankAccount = (data) => (dispatch) => {
  dispatch(AddUserBankAccount(data));
};

const GetUserBankAccount = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_BANK_ACCOUNT_PENDING,
  });

  await generalService
    .getBankDetails({ userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BANK_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BANK_ACCOUNT_FAILED,
        payload: err,
      });
    });
};

export const getUserBankAccount = () => (dispatch) => {
  dispatch(GetUserBankAccount());
};

const RemoveUserBankAccount = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.DEL_BANK_ACCOUNT_PENDING,
  });

  await generalService
    .removeBankDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.DEL_BANK_ACCOUNT_SUCCESS,
        payload: response.data,
      });
      dispatch(getUserBankAccount());
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.DEL_BANK_ACCOUNT_FAILED,
        payload: err,
      });
    });
};

export const removeUserBankAccount = (data) => (dispatch) => {
  dispatch(RemoveUserBankAccount(data));
};

const RedeemUserReferralBonus = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.REDEEM_USER_REFERRAL_PENDING,
  });

  await referralService
    .redeemUserReferralBonus({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.REDEEM_USER_REFERRAL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.REDEEM_USER_REFERRAL_FAILED,
        payload: err,
      });
    });
};

export const redeemUserReferralBonus = (data) => (dispatch) => {
  dispatch(RedeemUserReferralBonus(data));
};

const GetUserReferrals = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_USER_REFERRALS_PENDING,
  });

  await referralService
    .getUserReferrals({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_REFERRALS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_USER_REFERRALS_FAILED,
        payload: err,
      });
    });
};

export const getUserReferrals = (data) => (dispatch) => {
  dispatch(GetUserReferrals(data));
};

const GetCurrencyConversions = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CURRENCY_CONVERSIONS_PENDING,
  });

  await generalService
    .getCurrencyConversions(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CURRENCY_CONVERSIONS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CURRENCY_CONVERSIONS_FAILED,
        payload: err,
      });
    });
};

export const getCurrencyConversions = (data) => (dispatch) => {
  dispatch(GetCurrencyConversions(data));
};
