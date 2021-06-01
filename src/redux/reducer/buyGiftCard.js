import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  buyCardCountries: null,
  buyGiftCards: [],
  buyGiftCardDetails: null,
  buyGiftCardTransactionDetails: null,
  initBuyGiftCardTransaction: null,
  buyGiftCardTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const buyGiftCardReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARD_COUNTRIES_PENDING:
      return {
        ...state,
        buyCardCountries: null,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_BUY_GIFT_CARD_PENDING:
      notification.info({
        message: "Loading.....",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        initBuyGiftCardTransaction: null,
      };
    case actionTypes.GET_CARD_SEARCH_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
        buyGiftCards: [],
      };
    case actionTypes.GET_SINGLE_CARD_DETAILS_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
        buyGiftCardDetails: null,
      };
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
        buyGiftCardTransactionDetails: null,
      };
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_PENDING:
      // notification.info({
      //   message: "Loading.....",
      //   key,
      // });
      return {
        ...state,
        loading: true,
        error: null,
        buyGiftCardTransaction: null,
      };
    case actionTypes.GET_CARD_COUNTRIES_SUCCESS:
      return {
        ...state,
        buyCardCountries: action.payload.countries,
        loading: true,
        error: null,
      };
    case actionTypes.INITIAL_BUY_GIFT_CARD_SUCCESS:
      notification.success({
        message: "Successful",
        description: `${action.payload.message}. Please check your mail and transactions tab to monitor the progress.`,
        key,
      });
      return {
        ...state,
        initBuyGiftCardTransaction: action.payload.data,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_SEARCH_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        buyGiftCards: action.payload.cards,
        loading: false,
        error: null,
      };
    case actionTypes.GET_SINGLE_CARD_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        buyGiftCardDetails: action.payload.card,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        buyGiftCardTransactionDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      });
      return {
        ...state,
        buyGiftCardTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_COUNTRIES_FAILED:
    case actionTypes.GET_CARD_SEARCH_FAILED:
    case actionTypes.GET_SINGLE_CARD_DETAILS_FAILED:
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_FAILED:
    case actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_FAILED:
    case actionTypes.INITIAL_BUY_GIFT_CARD_FAILED:
    case actionTypes.CANCEL_BUY_GIFT_CARD_TRANSACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default buyGiftCardReducer;
