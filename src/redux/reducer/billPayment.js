import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  latestBillPaymentTransaction: null,
  billPayment: false,
  BillPaymentTransactionDetails: null,
  billPaymentDetails: null,
  BillPaymentCategory: null,
  BillPaymentTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const billPaymentReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
        BillPaymentCategory: null,
      };
    case actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_PENDING:
    case actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_BILL_PAYMENT_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        billPayment: false,
        billPaymentDetails: null,
      };
    case actionTypes.GET_BILL_PAYMENT_DETAILS_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   duration: 0,
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
        BillPaymentTransactionDetails: null,
      };
    case actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_SUCCESS:
      return {
        ...state,
        BillPaymentTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        BillPaymentCategory: action.payload.billItems,
        loading: false,
        error: null,
      };
    case actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_SUCCESS:
      return {
        ...state,
        latestBillPaymentTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BILL_PAYMENT_DETAILS_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:2.5,
      //   description: "Successfully fetched Bill Payment transaction.",
      //   key,
      // });
      return {
        ...state,
        BillPaymentTransactionDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_BILL_PAYMENT_SUCCESS:
      notification.success({
        message: "Successful",
        duration:2.5,
        // description: "Successfully",
        key,
      });
      return {
        ...state,
        billPayment: true,
        billPaymentDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BILL_PAYMENT_BY_CATEGORY_FAILED:
    case actionTypes.GET_ALL_BILL_PAYMENT_BY_USER_FAILED:
    case actionTypes.GET_LAST_BILL_PAYMENT_BY_USER_FAILED:
    case actionTypes.INITIAL_BILL_PAYMENT_FAILED:
    case actionTypes.GET_BILL_PAYMENT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default billPaymentReducer;
