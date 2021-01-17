// import { notification } from "antd";
import * as actionTypes from "../constants";
import { joinArray } from "../../utils/helper";

const initState = {
  loading: false,
  error: null,
  balance: null,
  latestWithdrawalTransaction: null,
  WithdrawalTransaction: {
    transactions: [],
    meta: {}
  },
}
// const key = actionTypes.KEY;

const withdrawalReducer = (state = initState, action) => {
	switch (action.type) {
    case actionTypes.GET_ALL_WITHDRAWAL_BY_USER_PENDING:
    case actionTypes.GET_LAST_WITHDRAWAL_BY_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    // case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_PENDING:
    //   notification.info({
    //     message: "Loading.....",
    //     description: "Getting Bank details",
    //     key,
    //   })
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //     bankDetails: null,
    //   }
    case actionTypes.GET_LAST_WITHDRAWAL_BY_USER_SUCCESS:
      return{
        ...state,
        latestWithdrawalTransaction: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.GET_ALL_WITHDRAWAL_BY_USER_SUCCESS:
      return{
        ...state,
        WithdrawalTransaction: {
          transactions:  action.new ? action.payload.transactions : joinArray(action.payload.transactions,  state.WithdrawalTransaction.transactions),
          meta: action.payload.meta,
        },
        loading: false,
        error: null,
      }
    // case actionTypes.VERIFY_BANK_ACCOUNT_DETAILS_SUCCESS:
    //   notification.success({
    //     message: "Successful",
    //     description: "Successfully Fetched Bank details",
    //     key,
    //   })
    //   return{
    //     ...state,
    //     bankDetails: action.payload.bankDetails,
    //     loading: false,
    //     error: null,
    //   }
		default:
			return state;
	}
}

export default withdrawalReducer;