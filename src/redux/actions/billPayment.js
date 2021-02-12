import * as actionTypes from "../constants";
import billPayment from "../services/BillPayment";
// import { history } from "../store";

const InitialBillPaymentByUser = (billCategory, data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_BILL_PAYMENT_PENDING,
  });

  await billPayment
    .initialBillPayment({ userId, billCategory }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_BILL_PAYMENT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_BILL_PAYMENT_FAILED,
        payload: err,
      });
    });
};

export const initialBillPaymentByUser = (billCategory, data) => (dispatch) => {
  dispatch(InitialBillPaymentByUser(billCategory, data));
};

const GetBillPaymentCategory = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_PENDING,
  });

  await billPayment
    .getBillPaymentCategory({ ...data })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_FAILED,
        payload: err,
      });
    });
};

export const getBillPaymentCategory = (data) => (dispatch) => {
  dispatch(GetBillPaymentCategory(data));
};

const GetBillPaymentDetailsById = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_BILL_PAYMENT_DETAILS_PENDING,
  });

  await billPayment
    .getBillPaymentTransactionDetail({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BILL_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BILL_PAYMENT_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getBillPaymentDetailsById = (data) => (dispatch) => {
  dispatch(GetBillPaymentDetailsById(data));
};

const GetAllUserBillPaymentDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_PENDING,
  });

  await billPayment
    .getAllBillPaymentTransactionByUser({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getAllUserBillPaymentDetails = (data) => (dispatch) => {
  dispatch(GetAllUserBillPaymentDetails(data));
};

const GetLastUserBillPaymentDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_PENDING,
  });

  await billPayment
    .getAllBillPaymentTransactionByUser({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getLastUserBillPaymentDetails = (data) => (dispatch) => {
  dispatch(GetLastUserBillPaymentDetails(data));
};
