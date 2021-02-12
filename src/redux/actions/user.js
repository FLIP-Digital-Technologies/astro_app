import { notification } from "antd";
import * as actionTypes from "../constants";
import generalService from "../services/GeneralService";
// import { history } from "../store";

const key = actionTypes.KEY;

const GetUserDetailsById = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_USER_DETAILS_BY_ID_PENDING,
  });

  await generalService
    .getUserDetails({ userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_USER_DETAILS_BY_ID_FAILED,
        payload: err,
      });
    });
  return;
}; // done

export const getUserDetailsById = () => (dispatch) => {
  dispatch(GetUserDetailsById());
}; // done

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
        key,
      });
      dispatch(getUserDetailsById());
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
