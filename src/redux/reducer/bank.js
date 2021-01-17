import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  bankList: null,
  bankDetails: null,
  addBankDetails: false,
}
const key = actionTypes.KEY;

const bankReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_BANKS_BY_COUNTRY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Getting Bank details",
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
        bankDetails: null,
      }
    case actionTypes.GET_BANKS_BY_COUNTRY_SUCCESS:
      return{
        ...state,
        bankList: action.payload.banks,
        loading: false,
        error: null,
      }
    case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Bank details",
        key,
      })
      return{
        ...state,
        bankDetails: action.payload.bankDetails,
        loading: false,
        error: null,
      }
		default:
			return state;
	}
}

export default bankReducer;