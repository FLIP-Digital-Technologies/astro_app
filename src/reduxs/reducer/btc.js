import { notification } from "antd";
import { joinArray } from "../../utils/helper";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  balance: null,
  latestBTCTransaction: null,
  btcTicker: null,
  buyBTC: false,
  buyBTCDetails: null,
  sellBTC: false,
  sellBTCDetails: null,
  sellBTCExternal: false,
  sellBTCExternalDetails: null,
  btcWalletAddress: null,
  BTCTransaction: {
    transactions: [],
    meta: {}
  }
}
const key = actionTypes.KEY;

const btcReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_WALLET_DETAILS_PENDING:
    case actionTypes.GET_TRANSACTION_HISTORY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.RECEIVE_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Getting wallet details",
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
        btcWalletAddress: null,
      }
    case actionTypes.GET_CURRENT_MARKET_TICKERS_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Getting Current BTC rates",
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.INITIAL_BUY_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Buying BTC",
        key,
      })
      return {
        ...state,
        buyBTC: false,
        buyBTCDetails: null,
        loading: true,
        error: null,
      }
    case actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Sending BTC",
        key,
      })
      return {
        ...state,
        sellBTCExternal: false,
        sellBTCExternalDetails: null,
        loading: true,
        error: null,
      }
    case actionTypes.INITIAL_SELL_BTC_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Selling BTC",
        key,
      })
      return {
        ...state,
        sellBTC: false,
        sellBTCDetails: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_LAST_TRANSACTION_HISTORY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_LAST_TRANSACTION_HISTORY_SUCCESS:
      return{
        ...state,
        latestBTCTransaction: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
      return{
        ...state,
        BTCTransaction: {
          transactions:  action.new ? action.payload.transactions : joinArray(action.payload.transactions,  state.BTCTransaction.transactions),
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      }
    case actionTypes.GET_WALLET_DETAILS_SUCCESS:
      return{
        ...state,
        balance: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.RECEIVE_BTC_SUCCESS:
      return{
        ...state,
        btcWalletAddress: action.payload.paymentAddress,
        loading: false,
        error: null,
      }
    case actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC sent.",
        key,
      })
      return{
        ...state,
        sellBTCExternal: true,
        sellBTCExternalDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.INITIAL_SELL_BTC_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC sales.",
        key,
      })
      return{
        ...state,
        sellBTC: true,
        sellBTCDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.INITIAL_BUY_BTC_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful BTC purchase.",
        key,
      })
      return{
        ...state,
        buyBTC: true,
        buyBTCDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_CURRENT_MARKET_TICKERS_SUCCESS:
      // notification.success({
      //   message: "Successful",
      //   description: "Successfully Fetched Current BTC rates",
      //   key,
      // })
      return{
        ...state,
        btcTicker: action.payload,
        loading: false,
        error: null,
      }
		default:
			return state;
	}
}

export default btcReducer;