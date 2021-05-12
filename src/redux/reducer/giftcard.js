import { notification } from "antd";
// // import { joinArray } from "../../utils/helper";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  balance: null,
  latestGiftCardTransaction: null,
  giftCardList: [],
  sellGiftCard: false,
  cardDetails:{},
  giftCardDetails: null,
  sellGiftCardDetails: null,
  fileUrl:"",
  GiftCardTransaction: {
    transactions: [],
    meta: {},
  },
};
const key = actionTypes.KEY;

const giftCardReducers = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INITIATE_SELL_GIFTCARD_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Selling Gift Card",
        key,
      });
      return {
        ...state,
        sellGiftCard: false,
        sellGiftCardDetails: null,
        loading: true,
        error: null,
      };
    case actionTypes.UPLOAD_FILE_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Uploading File",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_CARD_DETAILS_PENDING:
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
    case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        giftCardDetails: null,
      };
    case actionTypes.GET_CARD_CODES_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting Gift Cards",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS:
      return {
        ...state,
        latestGiftCardTransaction: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.INITIATE_SELL_GIFTCARD_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful Sold GiftCard.",
        key,
      });
      return {
        ...state,
        sellGiftCard: true,
        sellGiftCardDetails: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.UPLOAD_FILE_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful Uploaded file",
        key,
      });
      return {
        ...state,
        fileUrl:action.payload.publicUrl,
        loading: false,
        error: null,
      };
    case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS:
      return {
        ...state,
        GiftCardTransaction: {
          transactions: action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      };
    case actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful Fetch GiftCard transaction",
        key,
      });
      return {
        ...state,
        giftCardDetails: action.payload.transaction,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_CODES_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Gift Cards",
        key,
      });
      return {
        ...state,
        giftCardList: action.payload.cardRateDetails,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Card Details",
        key,
      });
      return {
        ...state,
        cardDetails: action.payload.cardRateDetails,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CARD_DETAILS_FAILED:
    case actionTypes.UPLOAD_FILE_FAILED:
    case actionTypes.INITIATE_SELL_GIFTCARD_FAILED:
    case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_FAILED:
    case actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_FAILED:
    case actionTypes.GET_CARD_CODES_FAILED:
    case actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default giftCardReducers;
