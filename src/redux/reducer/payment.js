import { notification } from "antd";
import * as actionTypes from "../constants";
// import { joinArray } from "../../utils/helper";

const initState = {
  loading: false,
  error: null,
  latestDepositTransaction: null,
  depositMoney: false,
  depositTransactionDetails: null,
  depositMoneyDetails: null,
  DepositTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PAYMENT_BY_USER_PENDING:
    case actionTypes.GET_LAST_PAYMENT_BY_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_PAYMENT_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        depositMoney: false,
        depositMoneyDetails: null,
      };
    case actionTypes.GET_PAYMENT_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        depositTransactionDetails: null,
      };
    // case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS:
    //   return{
    //     ...state,
    //     latestGiftCardTransaction: action.payload,
    //     loading: false,
    //     error: null,
    //   }
    case actionTypes.GET_ALL_PAYMENT_BY_USER_SUCCESS:
      return {
        ...state,
        DepositTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_LAST_PAYMENT_BY_USER_SUCCESS:
      return {
        ...state,
        latestDepositTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_PAYMENT_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetched deposit transaction.",
        key,
      });
      return {
        ...state,
        depositTransactionDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_PAYMENT_SUCCESS:
      notification.success({
        message: "Successful",
        // description: "Successfully",
        key,
      });
      return {
        ...state,
        depositMoney: true,
        depositMoneyDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.GET_ALL_PAYMENT_BY_USER_FAILED:
    case actionTypes.GET_LAST_PAYMENT_BY_USER_FAILED:
    case actionTypes.INITIAL_PAYMENT_FAILED:
    case actionTypes.GET_PAYMENT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
