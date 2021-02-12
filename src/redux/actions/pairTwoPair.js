import * as actionTypes from "../constants";
import PairTwoPairService from "../services/PairTwoPairService";
// import { history } from "../store";

const InitialBTCP2PTransferByUser = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_BTC_P2P_TRANSFER_PENDING,
  });

  await PairTwoPairService
    .initialBTCP2P({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_BTC_P2P_TRANSFER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_BTC_P2P_TRANSFER_FAILED,
        payload: err,
      });
    });
};

export const initialBTCP2PTransferByUser = (data) => (dispatch) => {
  dispatch(InitialBTCP2PTransferByUser(data));
};

const InitialFiatP2PByUser = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_FIAT_P2P_TRANSFER_PENDING,
  });

  await PairTwoPairService
    .initialFiatP2P({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_FIAT_P2P_TRANSFER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_FIAT_P2P_TRANSFER_FAILED,
        payload: err,
      });
    });
};

export const initialFiatP2PByUser = (data) => (dispatch) => {
  dispatch(InitialFiatP2PByUser(data));
};

const GetCurrentFiatTransferRate = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_PENDING,
  });

  await PairTwoPairService
    .getCurrentFiatTransferRate()
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CURRENT_MARKET_FIAT_P2P_TICKERS_FAILED,
        payload: err,
      });
    });
    return;
};

export const getCurrentFiatTransferRate = () => (dispatch) => {
  dispatch(GetCurrentFiatTransferRate());
};

const GetFiatP2PTransferById = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_PENDING,
  });

  await PairTwoPairService
    .getTransactionDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_FIAT_P2P_TRANSFER_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getFiatP2PTransferById = (data) => (dispatch) => {
  dispatch(GetFiatP2PTransferById(data));
};

const GetAllUserFiatP2PTransferDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_PENDING,
  });

  await PairTwoPairService
    .getTransactionHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_ALL_FIAT_P2P_TRANSFER_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getAllUserFiatP2PTransferDetails = (data) => (dispatch) => {
  dispatch(GetAllUserFiatP2PTransferDetails(data));
};

const GetLastUserFiatP2PTransferDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_PENDING,
  });

  await PairTwoPairService
    .getTransactionHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_LAST_FIAT_P2P_TRANSFER_BY_USER_FAILED,
        payload: err,
      });
    });
};

export const getLastUserFiatP2PTransferDetails = (data) => (dispatch) => {
  dispatch(GetLastUserFiatP2PTransferDetails(data));
};
