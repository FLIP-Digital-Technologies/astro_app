import * as actionTypes from "../constants";
import withdrawalsService from "../services/WithdrawalsService";
// import { history } from "../store";

const InitialWithdrawalByUser = data => async dispatch => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_WITHDRAWAL_PENDING,
  })

  await withdrawalsService
    .initialWithdrawalRequest({userId}, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_WITHDRAWAL_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.INITIAL_WITHDRAWAL_FAILED,
        payload: err
      });
    });
}

export const initialWithdrawalByUser = data => dispatch => {
  dispatch(InitialWithdrawalByUser(data));
};

const CancelWithdrawalByUser = data => async dispatch => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.CANCEL_WITHDRAWAL_PENDING,
  })

  await withdrawalsService
    .cancelWithdrawalRequest({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.CANCEL_WITHDRAWAL_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.CANCEL_WITHDRAWAL_FAILED,
        payload: err
      });
    });
}

export const cancelWithdrawalByUser = data => dispatch => {
  dispatch(CancelWithdrawalByUser(data));
};

const GetWithdrawalDetailsById = data => async dispatch => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_WITHDRAWAL_DETAILS_PENDING,
  })

  await withdrawalsService
    .getWithdrawalRequestDetails({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_WITHDRAWAL_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_WITHDRAWAL_DETAILS_FAILED,
        payload: err
      });
    });
}

export const getWithdrawalDetailsById = data => dispatch => {
  dispatch(GetWithdrawalDetailsById(data));
};

const GetAllUserWithdrawalDetails = data => async dispatch => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_ALL_WITHDRAWAL_BY_USER_PENDING,
  })

  await withdrawalsService
    .getWithdrawalRequestByUser({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_WITHDRAWAL_BY_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ALL_WITHDRAWAL_BY_USER_FAILED,
        payload: err
      });
    });
}

export const getAllUserWithdrawalDetails = data => dispatch => {
  dispatch(GetAllUserWithdrawalDetails(data));
};

const GetLastUserWithdrawalDetails = data => async dispatch => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_WITHDRAWAL_BY_USER_PENDING,
  })

  await withdrawalsService
    .getWithdrawalRequestByUser({...data, userId})
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_WITHDRAWAL_BY_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_LAST_WITHDRAWAL_BY_USER_FAILED,
        payload: err
      });
    });
}

export const getLastUserWithdrawalDetails = data => dispatch => {
  dispatch(GetLastUserWithdrawalDetails(data));
};
