import { notification } from "antd";
import * as actionTypes from "../constants";

const initState = {
  loading: false,
  error: null,
  token: localStorage.getItem(actionTypes.AUTH_TOKEN),
  userId: localStorage.getItem(actionTypes.AUTH_TOKEN_ID),
  user: null,
  updatedUser: false,
  updatedUserBank: false,
  updatedTransactionPin: false,
}
const key = actionTypes.KEY;

const authReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.LOGIN_PENDING:
    case actionTypes.REGISTER_PENDING:
    case actionTypes.VERIFY_EMAIL_OTP_PENDING:
    case actionTypes.GET_USER_DETAILS_BY_ID_PENDING:
      notification.info({
        message: "Loading.....",
        key,
      })
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.UPDATE_USER_DETAILS_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Updating user details",
        key,
      })
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      }
    case actionTypes.ADD_BANK_ACCOUNT_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Adding Account details",
        key,
      })
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      }
    case actionTypes.SET_TRANSACTION_PIN_PENDING:
      notification.info({
        message: "Loading.....",
        description: "Setting Transaction Pin",
        key,
      })
      return {
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: true,
        error: null,
      }
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.VERIFY_EMAIL_OTP_SUCCESS:
    case actionTypes.GET_USER_DETAILS_BY_ID_SUCCESS:
      notification.success({
        message: "Successful",
        key,
      })
      return{
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      }
    case actionTypes.ADD_BANK_ACCOUNT_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Added Bank details",
        key,
      })
      return{
        ...state,
        updatedUser: false,
        updatedTransactionPin: false,
        updatedUserBank: true,
        loading: false,
        error: null,
      }
    case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
      return{
        ...state,
        updatedUser: true,
        updatedUserBank: false,
        updatedTransactionPin: false,
        loading: false,
        error: null,
      }
    case actionTypes.SET_TRANSACTION_PIN_SUCCESS:
      notification.success({
        message: "Successful",
        description: "Transaction Pin Set",
        key,
      })
      return{
        ...state,
        updatedUser: false,
        updatedUserBank: false,
        updatedTransactionPin: true,
        loading: false,
        error: null,
      }
		default:
			return state;
	}
}

export default authReducer;