import * as actionTypes from "../constants";
import bankService from "../services/BankService";
// import { history } from "../store";


const GetBankListByCountry = (data = {country: 'NG'}) => async dispatch => {
  dispatch({
    type: actionTypes.GET_BANKS_BY_COUNTRY_PENDING,
  })

  await bankService
    .getCountryBankList(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_BANKS_BY_COUNTRY_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_BANKS_BY_COUNTRY_FAILED,
        payload: err
      });
    });
}

export const getBankListByCountry = data => dispatch => {
  dispatch(GetBankListByCountry(data));
};

const VerifyBankAccountDetails = data => async dispatch => {
  dispatch({
    type: actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_PENDING,
  })

  await bankService
    .validateBankAccountDetails(data)
    .then((response) => {
      dispatch({
        type: actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_FAILED,
        payload: err
      });
    });
    return;
}

export const verifyBankAccountDetails = data => dispatch => {
  dispatch(VerifyBankAccountDetails(data));
};
