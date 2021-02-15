import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  token: localStorage.getItem(actionTypes.AUTH_TOKEN),
  userId: localStorage.getItem(actionTypes.AUTH_TOKEN_ID),
  user: null,
  updatedUser: false,
  updatedUserBank: false,
  updatedTransactionPin: false,
  userReferral: null,
  userReferralTransaction: {
    referrals: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REFERRALS_PENDING:
    case actionTypes.REDEEM_USER_REFERRAL_PENDING:
    case actionTypes.LOGIN_PENDING:
    case actionTypes.REGISTER_PENDING:
    case actionTypes.VERIFY_EMAIL_OTP_PENDING:
    case actionTypes.GET_USER_DETAILS_BY_ID_PENDING:
    case actionTypes.CHANGE_USER_PASSWORD_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_USER_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Updating user details",
        key,
      });
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      };
    case actionTypes.ADD_BANK_ACCOUNT_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Adding Account details",
        key,
      });
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      };
    case actionTypes.SET_TRANSACTION_PIN_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Setting Transaction Pin",
        key,
      });
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.VERIFY_EMAIL_OTP_SUCCESS:
    case actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case actionTypes.ADD_BANK_ACCOUNT_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Added Bank details",
        key,
      });
      return {
        ...state,
        updatedUser: false,
        updatedTransactionPin: false,
        updatedUserBank: true,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updatedUser: true,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: false,
        error: null,
      };
    case actionTypes.CHANGE_USER_PASSWORD_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Password Changed Successfully",
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.SET_TRANSACTION_PIN_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Transaction Pin Set",
        key,
      });
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: true,
        loading: false,
        error: null,
      };
    case actionTypes.REDEEM_USER_REFERRAL_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Redeemed referral bonus successfully",
        key,
      });
      return {
        ...state,
        userReferral: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_USER_REFERRALS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        userReferralTransaction: {
          transactions: action.payload.referrals,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_USER_REFERRALS_FAILED:
    case actionTypes.REDEEM_USER_REFERRAL_FAILED:
    case actionTypes.LOGIN_FAILED:
    case actionTypes.REGISTER_FAILED:
    case actionTypes.VERIFY_EMAIL_OTP_FAILED:
    case actionTypes.GET_USER_DETAILS_BY_ID_FAILED:
    case actionTypes.CHANGE_USER_PASSWORD_FAILED:
    case actionTypes.UPDATE_USER_DETAILS_FAILED:
    case actionTypes.ADD_BANK_ACCOUNT_FAILED:
    case actionTypes.SET_TRANSACTION_PIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
