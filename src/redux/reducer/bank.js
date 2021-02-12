import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  bankList: null,
  bankDetails: null,
  addBankDetails: false,
  bankAccounts: null,
  bankBranchList: null,
};
const key = actionTypes.KEY;

const bankReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_BANK_ACCOUNT_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
        bankAccounts: null,
      };
    case actionTypes.GET_BANKS_BRANCH_PENDING:
      return{
        ...state,
        bankBranchList: null,
        loading: true,
        error: null,
      }
    case actionTypes.GET_BANKS_BY_COUNTRY_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Getting Bank details",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
        bankDetails: null,
      };
    case actionTypes.DEL_BANK_ACCOUNT_PENDING:
      notification.info({
        message: "Loading.....",
        duration: 0,
        description: "Deleting Bank details",
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.DEL_BANK_ACCOUNT_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully deleted Bank details",
        key,
      });
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BANKS_BRANCH_SUCCESS:
      return {
        ...state,
        bankBranchList: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BANKS_BY_COUNTRY_SUCCESS:
      return {
        ...state,
        bankList: action.payload.banks,
        loading: false,
        error: null,
      };
    case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Bank details",
        key,
      });
      return {
        ...state,
        bankDetails: action.payload.bankDetails,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BANK_ACCOUNT_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Successfully Fetched Bank Accounts",
        key,
      });
      return {
        ...state,
        bankAccounts: action.payload.bankAccounts,
        loading: false,
        error: null,
      };
    case actionTypes.GET_BANKS_BRANCH_FAILED:
    case actionTypes.GET_BANK_ACCOUNT_FAILED:
    case actionTypes.GET_BANKS_BY_COUNTRY_FAILED:
    case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_FAILED:
    case actionTypes.DEL_BANK_ACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bankReducer;
