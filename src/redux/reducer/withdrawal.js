import { notification } from "antd";
import * as actionTypes from "../constants";
// import { joinArray } from "../../utils/helper";
// import { history } from "../store";

const initState = {
  loading: false,
  error: null,
  balance: null,
  settings: null,
  newWithdrawal: null,
  withdrawalDetails: null,
  latestWithdrawalTransaction: null,
  WithdrawalTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const withdrawalReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_WITHDRAWAL_BY_USER_PENDING:
    case actionTypes.GET_WITHDRAWAL_SETTINGS_PENDING:
    case actionTypes.GET_LAST_WITHDRAWAL_BY_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_WITHDRAWAL_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        newWithdrawal: null,
      };
    case actionTypes.GET_WITHDRAWAL_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        withdrawalDetails: null,
      };
    case actionTypes.GET_LAST_WITHDRAWAL_BY_USER_SUCCESS:
      return {
        ...state,
        latestWithdrawalTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_ALL_WITHDRAWAL_BY_USER_SUCCESS:
      return {
        ...state,
        WithdrawalTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_WITHDRAWAL_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful Fetch Withdrawal transaction",
        key,
      });
      return {
        ...state,
        withdrawalDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_WITHDRAWAL_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Withdrawal Transaction Successful",
        key,
      });
      window.location.href = "/app";
      return {
        ...state,
        newWithdrawal: action.payload.newWithdrawal,
        loading: false,
        error: null,
      };
    case actionTypes.GET_WITHDRAWAL_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload.settings,
        loading: false,
        error: null,
      };
    case actionTypes.GET_WITHDRAWAL_SETTINGS_FAILED:
    case actionTypes.INITIAL_WITHDRAWAL_FAILED:
    case actionTypes.GET_WITHDRAWAL_DETAILS_FAILED:
    case actionTypes.GET_ALL_WITHDRAWAL_BY_USER_FAILED:
    case actionTypes.GET_LAST_WITHDRAWAL_BY_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default withdrawalReducer;
