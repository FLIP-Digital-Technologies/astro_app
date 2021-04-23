import { notification } from "antd";
// import { joinArray } from "../../utils/helper";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  balance: null,
  latestBTCTransaction: null,
  btcTicker: null,
  btcDetails: null,
  buyDetails:null,
  sellDetails:null,
  sendDetails:null,
  p2pDetails:null,
  buyBTC: false,
  buyBTCDetails: null,
  sellBTC: false,
  sellBTCDetails: null,
  sellBTCExternal: false,
  sellBTCExternalDetails: null,
  btcWalletAddress: null,
  BTCTransaction: {
    transactions: [],
    meta: {},
  },
  buyTransaction: {
    transactions: [],
    meta: {},
  },
  sellTransaction: {
    transactions: [],
    meta: {},
  },
  sendTransaction: {
    transactions: [],
    meta: {},
  },
  p2pTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const btcReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_PENDING:
    case actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_PENDING:
    case actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_PENDING:
    case actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting transaction details",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_PENDING:
    case actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_PENDING:
    case actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_PENDING:
    case actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_PENDING:
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
    case actionTypes.GET_WALLET_DETAILS_PENDING:
    case actionTypes.GET_TRANSACTION_HISTORY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.RECEIVE_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting wallet details",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        btcWalletAddress: null,
      };
    case actionTypes.GET_CURRENT_MARKET_TICKERS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting Current BTC rates",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_BUY_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Buying BTC",
        key,
      });
      return {
        ...state,
        buyBTC: false,
        buyBTCDetails: null,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Sending BTC",
        key,
      });
      return {
        ...state,
        sellBTCExternal: false,
        sellBTCExternalDetails: null,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_SELL_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Selling BTC",
        key,
      });
      return {
        ...state,
        sellBTC: false,
        sellBTCDetails: null,
        loading: true,
        error: null,
      };
    case actionTypes.GET_WALLET_DETAILS_BY_ID_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        btcDetails: null,
        loading: true,
        error: null,
      };
    case actionTypes.GET_LAST_TRANSACTION_HISTORY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_LAST_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        latestBTCTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        BTCTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_SUCCESS:
      notification.success({
        message:"Successful",
        duration:0,
        key,
      })
      return {
        ...state,
        buyTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_SUCCESS:
      notification.success({
        message:"Successful",
        duration:0,
        key,
      })
      return {
        ...state,
        sellTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_SUCCESS:
      notification.success({
        message:"Successful",
        duration:0,
        key,
      })
      return {
        ...state,
        sendTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_SUCCESS:
      notification.success({
        message:"Successful",
        duration:0,
        key,
      })
      return {
        ...state,
        p2pTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_WALLET_DETAILS_SUCCESS:
      return {
        ...state,
        balance: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.RECEIVE_BTC_SUCCESS:
      return {
        ...state,
        btcWalletAddress: action.payload.paymentAddress,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC sent.",
        key,
      });
      return {
        ...state,
        sellBTCExternal: true,
        sellBTCExternalDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.INITIAL_SELL_BTC_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC sales.",
        key,
      });
      return {
        ...state,
        sellBTC: true,
        sellBTCDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_WALLET_DETAILS_BY_ID_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetch btc transaction.",
        key,
      });
      return {
        ...state,
        btcDetails: action.payload.transaction,
        loading: true,
        error: null,
      };
    case actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetch btc transaction.",
        key,
      });
      return {
        ...state,
        buyDetails: action.payload.transaction,
        loading: true,
        error: null,
      };
    case actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetch btc transaction.",
        key,
      });
      return {
        ...state,
        sellDetails: action.payload.transaction,
        loading: true,
        error: null,
      };
    case actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetch btc transaction.",
        key,
      });
      return {
        ...state,
        sendDetails: action.payload.transaction,
        loading: true,
        error: null,
      };
    case actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully fetch btc transaction.",
        key,
      });
      return {
        ...state,
        p2pDetails: action.payload.transaction,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_BUY_BTC_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC purchase.",
        key,
      });
      return {
        ...state,
        buyBTC: true,
        buyBTCDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CURRENT_MARKET_TICKERS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Current BTC rates",
        key,
      });
      return {
        ...state,
        btcTicker: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_FAILED:
    case actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_FAILED:
    case actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_FAILED:
    case actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_FAILED:
    case actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_FAILED:
    case actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_FAILED:
    case actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_FAILED:
    case actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_FAILED:
    case actionTypes.GET_WALLET_DETAILS_FAILED:
    case actionTypes.GET_TRANSACTION_HISTORY_FAILED:
    case actionTypes.RECEIVE_BTC_FAILED:
    case actionTypes.GET_CURRENT_MARKET_TICKERS_FAILED:
    case actionTypes.INITIAL_BUY_BTC_FAILED:
    case actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_FAILED:
    case actionTypes.INITIAL_SELL_BTC_FAILED:
    case actionTypes.GET_WALLET_DETAILS_BY_ID_FAILED:
    case actionTypes.GET_LAST_TRANSACTION_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default btcReducer;
