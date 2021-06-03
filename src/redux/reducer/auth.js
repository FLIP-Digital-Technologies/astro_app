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
  createWallet:null,
  fiatCurrency:[],
  cryptoCurrency:[],
  userWallets:{},
  conversions:{},
  userReferralTransaction: {
    referrals: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_EMAIL_AVAILABILITY_PENDING:
    case actionTypes.CREATE_USER_WALLET_PENDING:
    case actionTypes.GET_FIAT_CURRENCY_PENDING:
    case actionTypes.GET_USER_WALLETS_PENDING:
    case actionTypes.GET_CRYPTO_CURRENCY_PENDING:
    case actionTypes.GET_USER_REFERRALS_PENDING:
    case actionTypes.REDEEM_USER_REFERRAL_PENDING:
    case actionTypes.LOGIN_PENDING:
    case actionTypes.REGISTER_PENDING:
    case actionTypes.VERIFY_EMAIL_OTP_PENDING:
    case actionTypes.GET_USER_DETAILS_BY_ID_PENDING:
    case actionTypes.CHANGE_USER_PASSWORD_PENDING:
    case actionTypes.CHANGE_USER_PIN_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   duration: 0,
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CURRENCY_CONVERSIONS_PENDING:
      return {
        ...state,
        // loading: true,
        error: null,
      };
    case actionTypes.CHECK_EMAIL_AVAILABILITY_FAILED:
      // notification.warn({
      //   message: "Email exists",
      //   duration: 0,
      //   key,
      // });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_USER_DETAILS_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   duration: 0,
      //   description: "Updating user details",
      //   key,
      // });
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
    case actionTypes.VERIFY_EMAIL_OTP_SUCCESS:
      notification.success({
        message: "Successful",
        duration:1,
        key,
      });
      return {
        ...state,
        // user: action.payload.user,
        loading: false,
        error: null,
      };
    case actionTypes.GET_USER_WALLETS_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:1,
      //   key,
      // });
      return {
        ...state,
        userWallets: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CRYPTO_CURRENCY_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:1,
      //   key,
      // });
      return {
        ...state,
        // user: action.payload.user,
        loading: false,
        error: null,
        cryptoCurrency:action.payload.crypto
      };
    case actionTypes.GET_FIAT_CURRENCY_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:1,
      //   key,
      // });
      return {
        ...state,
        // user: action.payload.user,
        loading: false,
        error: null,
        fiatCurrency:action.payload.fiat
      };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   key,
      // });
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:1,
      //   key,
      // });
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
        duration:1,
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
        duration:1,
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.CHANGE_USER_PIN_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Pin Changed Successfully",
        duration:1,
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
        duration:1,
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
        // description: "Redeemed referral bonus successfully",
        duration:1,
        key,
      });
      return {
        ...state,
        userReferral: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_USER_REFERRALS_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   duration:1,
      //   key,
      // });
      return {
        ...state,
        userReferralTransaction: {
          transactions: action.payload.referrals,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.COMPLETE_RESET_USER_PASSWORD_SUCCESS:
      notification.success({
        message: "Successful",
        description: "You can now Login with your new password.",
        duration:1,
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.COMPLETE_RESET_USER_PIN_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Pin Reset Complete",
        duration:1,
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_USER_WALLET_SUCCESS:
      notification.success({
        message: "Successful",
        // description: "You can now Login with your new password.",
        duration:1,
        key,
      });
      return {
        ...state,
        createWallet:action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CURRENCY_CONVERSIONS_SUCCESS:
      return {
        ...state,
        conversions:action.payload.tickers,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_USER_WALLET_FAILED:
    case actionTypes.GET_CURRENCY_CONVERSIONS_FAILED:
    case actionTypes.GET_CRYPTO_CURRENCY_FAILED:
    case actionTypes.GET_FIAT_CURRENCY_FAILED:
    case actionTypes.GET_USER_WALLETS_FAILED:
    case actionTypes.GET_USER_REFERRALS_FAILED:
    case actionTypes.REDEEM_USER_REFERRAL_FAILED:
    case actionTypes.LOGIN_FAILED:
    case actionTypes.REGISTER_FAILED:
    case actionTypes.VERIFY_EMAIL_OTP_FAILED:
    case actionTypes.GET_USER_DETAILS_BY_ID_FAILED:
    case actionTypes.CHANGE_USER_PASSWORD_FAILED:
    case actionTypes.CHANGE_USER_PIN_FAILED:
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
