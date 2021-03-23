import * as actionTypes from "../constants";
import giftCardService from "../services/GiftCardService";
// import { history } from "../store";

const GetGiftCardCodes = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CARD_CODES_PENDING,
  });

  await giftCardService
    .getGiftCardCodes(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CARD_CODES_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CARD_CODES_FAILED,
        payload: err,
      });
    });
  return;
};

export const getGiftCardCodes = (data) => (dispatch) => {
  dispatch(GetGiftCardCodes(data));
};

const InitialGiftCardSale = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIATE_SELL_GIFTCARD_PENDING,
  });

  await giftCardService
    .initialSellGiftCard({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIATE_SELL_GIFTCARD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIATE_SELL_GIFTCARD_FAILED,
        payload: err,
      });
    });
};

export const initialGiftCardSale = (data) => (dispatch) => {
  dispatch(InitialGiftCardSale(data));
};

const CancelGiftCardSale = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CANCEL_SELL_GIFTCARD_TRANSACTION_PENDING,
  });

  await giftCardService
    .cancelSellGiftCardTransaction({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.CANCEL_SELL_GIFTCARD_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CANCEL_SELL_GIFTCARD_TRANSACTION_FAILED,
        payload: err,
      });
    });
};

export const cancelGiftCardSale = (data) => (dispatch) => {
  dispatch(CancelGiftCardSale(data));
};

const GetGiftCardTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_PENDING,
  });

  await giftCardService
    .getTransactionDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_TRANSACTION_DETAILS_GIFTCARD_FAILED,
        payload: err,
      });
    });
};

export const getGiftCardTransaction = (data) => (dispatch) => {
  dispatch(GetGiftCardTransaction(data));
};

const GetGiftCardTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_PENDING,
  });

  await giftCardService
    .getTransactionHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS,
        payload: response.data,
        new: data.new,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_TRANSACTIONS_HISTORY_GIFTCARD_FAILED,
        payload: err,
      });
    });
};

export const getGiftCardTransactionHistory = (data) => (dispatch) => {
  dispatch(GetGiftCardTransactionHistory(data));
};

const GetLastGiftCardTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_PENDING,
  });

  await giftCardService
    .getTransactionHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_LAST_TRANSACTIONS_HISTORY_GIFTCARD_FAILED,
        payload: err,
      });
    });
};

export const getLastGiftCardTransactionHistory = (data) => (dispatch) => {
  dispatch(GetLastGiftCardTransactionHistory(data));
};
