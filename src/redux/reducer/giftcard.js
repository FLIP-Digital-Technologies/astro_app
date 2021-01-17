import { notification } from "antd";
// import { joinArray } from "../../utils/helper";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  balance: null,
  latestGiftCardTransaction: null,
  giftCardList: null,
  sellGiftCard: false,
  sellGiftCardDetails: null,
  GiftCardTransaction: {
    transactions: [],
    meta: {}
  }
}
const key = actionTypes.KEY;

const giftCardReducers = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.INITIATE_SELL_GIFTCARD_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Selling Gift Card",
        key,
      })
      return {
        ...state,
        sellGiftCard: false,
        sellGiftCardDetails: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_CARD_CODES_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Getting Gift Cards",
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS:
      return{
        ...state,
        latestGiftCardTransaction: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.INITIATE_SELL_GIFTCARD_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successful Sold GiftCard.",
        key,
      })
      return{
        ...state,
        sellGiftCard: true,
        sellGiftCardDetails: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS:
      return{
        ...state,
        GiftCardTransaction: {
          transactions:  action.payload.transactions,
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      }
    case actionTypes.GET_CARD_CODES_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Gift Cards",
        key,
      })
      return{
        ...state,
        giftCardList: action.payload.cardRateDetails,
        loading: false,
        error: null,
      }
		default:
			return state;
	}
}

export default giftCardReducers;