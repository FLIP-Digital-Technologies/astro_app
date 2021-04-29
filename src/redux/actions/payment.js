import * as actionTypes from "../constants";
import paymentService from "../services/PaymentService";
import { getBTCWalletDetails } from "./btc";
// import { history } from "../store";

const InitialPaymentByUser = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_PAYMENT_PENDING,
  });

  await paymentService
    .initialPayment({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_PAYMENT_SUCCESS,
        payload: response.data,
      });
      dispatch(getBTCWalletDetails());
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_PAYMENT_FAILED,
        payload: err,
      });
    });
};

export const initialPaymentByUser = (data) => (dispatch) => {
  dispatch(InitialPaymentByUser(data));
};

const CancelPaymentByUser = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CANCEL_PAYMENT_PENDING,
  });

  await paymentService
    .cancelPayment({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.CANCEL_PAYMENT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CANCEL_PAYMENT_FAILED,
        payload: err,
      });
    });
};

export const cancelPaymentByUser = (data) => (dispatch) => {
  dispatch(CancelPaymentByUser(data));
};

const GetPaymentDetailsById = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_PAYMENT_DETAILS_PENDING,
  });

  await paymentService
    .getPaymentDetails({ ...data, userId })
    .then((response) => {
     
      dispatch({
        type: actionTypes.GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_PAYMENT_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getPaymentDetailsById = (data) => (dispatch) => {
  dispatch(GetPaymentDetailsById(data));
};

const GetAllUserPaymentDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_ALL_PAYMENT_BY_USER_PENDING,
  });

  await paymentService
    .getAllPaymentByUser({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_PAYMENT_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_ALL_PAYMENT_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getAllUserPaymentDetails = (data) => (dispatch) => {
  dispatch(GetAllUserPaymentDetails(data));
};

const GetLastUserPaymentDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_PAYMENT_BY_USER_PENDING,
  });

  await paymentService
    .getAllPaymentByUser({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_PAYMENT_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_LAST_PAYMENT_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getLastUserPaymentDetails = (data) => (dispatch) => {
  dispatch(GetLastUserPaymentDetails(data));
};
