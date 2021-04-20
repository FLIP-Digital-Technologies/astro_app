import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  latestPairTwoPairFiatTransaction: null,
  pairTwoPairFiat: false,
  pairTwoPairFiatTransactionDetails: null,
  pairTwoPairFiatDetails: null,
  pairTwoPairFiatTicker: null,
  pairTwoPairBTC: false,
  pairTwoPairBTCDetails: null,
  convertedAmount:0,
  pairTwoPairFiatTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const pairTwoPairReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
        pairTwoPairFiatTicker: null,
      };
    case actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_PENDING:
    case actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_FIAT_P2P_TRANSFER_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        pairTwoPairFiat: false,
        pairTwoPairFiatDetails: null,
      };
    case actionTypes.CONVERT_CURRENCY_PENDING:
      notification.info({
        message: "Loading....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.INITIAL_BTC_P2P_TRANSFER_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        pairTwoPairBTC: false,
        pairTwoPairBTCDetails: null,
      };
    case actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        pairTwoPairFiatTransactionDetails: null,
      };
    case actionTypes.CONVERT_CURRENCY_SUCCESS:
      notification.success({
        message: "Suuccessful",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
        convertedAmount:action.payload.to.amount
      };
    case actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_SUCCESS:
      return {
        ...state,
        pairTwoPairFiatTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_SUCCESS:
      return {
        ...state,
        pairTwoPairFiatTicker: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_SUCCESS:
      return {
        ...state,
        latestpairTwoPairFiatTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetched Fiat P2P Transfer detail transaction.",
        key,
      });
      return {
        ...state,
        pairTwoPairFiatTransactionDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_FIAT_P2P_TRANSFER_SUCCESS:
      notification.success({
        message: "Successful",
        // description: "Successfully",
        key,
      });
      return {
        ...state,
        pairTwoPairFiat: true,
        pairTwoPairFiatDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_BTC_P2P_TRANSFER_SUCCESS:
      notification.success({
        message: "Successful",
        // description: "Successfully",
        key,
      });
      return {
        ...state,
        pairTwoPairBTC: true,
        pairTwoPairBTCDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_FIAT_P2P_TRANSFER_FAILED:
    case actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_FAILED:
    case actionTypes.CONVERT_CURRENCY_FAILED:
    case actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_FAILED:
    case actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_FAILED:
    case actionTypes.INITIAL_BTC_P2P_TRANSFER_FAILED:
    case actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_FAILED:
      notification.error({
        message: action?.payload?.response?.data?.message || "Failed",
        // description: "Successfully",
        key,
      });
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pairTwoPairReducer;
