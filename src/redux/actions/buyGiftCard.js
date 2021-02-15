import * as actionTypes from "../constants";
import buyGiftCardService from "../services/BuyGiftCard";
// import { history } from "../store";

const InitialBuyGiftCard = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_BUY_GIFT_CARD_PENDING,
  });

  await buyGiftCardService
    .initialBuy({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_BUY_GIFT_CARD_SUCCESS,
        payload: response,
      });
      // dispatch(getBTCWalletDetails()); TODO: jkdhjdk
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_BUY_GIFT_CARD_FAILED,
        payload: err,
      });
    });
};

export const initialBuyGiftCard = (data) => (dispatch) => {
  dispatch(InitialBuyGiftCard(data));
};

const GetBuyCardsByCountries = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CARD_COUNTRIES_PENDING,
  });

  await buyGiftCardService
    .getBuyCardsByCountries()
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CARD_COUNTRIES_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CARD_COUNTRIES_FAILED,
        payload: err,
      });
    });
};

export const getBuyCardsByCountries = () => (dispatch) => {
  dispatch(GetBuyCardsByCountries());
};

const GetBuyCardsBySearch = (data = {}) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CARD_SEARCH_PENDING,
  });

  await buyGiftCardService
    .getBuyCardsBySearch(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CARD_SEARCH_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CARD_SEARCH_FAILED,
        payload: err,
      });
    });
};

export const getBuyCardsBySearch = (data) => (dispatch) => {
  dispatch(GetBuyCardsBySearch(data));
};

const GetBuyCardsCardDetail = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_SINGLE_CARD_DETAILS_PENDING,
  });

  await buyGiftCardService
    .getBuyCardsCardDetail(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_SINGLE_CARD_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_SINGLE_CARD_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getBuyCardsCardDetail = (data) => (dispatch) => {
  dispatch(GetBuyCardsCardDetail(data));
};

const GetBuyCardTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_PENDING,
  });

  await buyGiftCardService
    .getBuyCardTransaction({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTION_DETAIL_FAILED,
        payload: err,
      });
    });
};

export const getBuyCardTransaction = (data) => (dispatch) => {
  dispatch(GetBuyCardTransaction(data));
};

const GetAllBuyCardTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_PENDING,
  });

  await buyGiftCardService
    .getAllBuyCardsTransactions({ ...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BUY_GIFT_CARD_TRANSACTIONS_FAILED,
        payload: err,
      });
    });
};

export const getAllBuyCardTransaction = (data) => (dispatch) => {
  dispatch(GetAllBuyCardTransaction(data));
};

const CancelBuyCardTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CANCEL_BUY_GIFT_CARD_TRANSACTION_PENDING,
  });

  await buyGiftCardService
    .cancelBuyCardTransaction({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.CANCEL_BUY_GIFT_CARD_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.CANCEL_BUY_GIFT_CARD_TRANSACTION_FAILED,
        payload: err,
      });
    });
};

export const cancelBuyCardTransaction = (data) => (dispatch) => {
  dispatch(CancelBuyCardTransaction(data));
};