import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import bankReducer from "./bank";
import btcReducer from "./btc";
import giftCardReducers from "./giftcard";
import withdrawalReducer from "./withdrawal";
import paymentReducer from "./payment";
import billPaymentReducer from "./billPayment";
import pairTwoPairReducer from "./pairTwoPair";
// main reducers

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: authReducer,
    bank: bankReducer,
    btc: btcReducer,
    giftCard: giftCardReducers,
    withdrawals: withdrawalReducer,
    payment: paymentReducer,
    billPayment: billPaymentReducer,
    pairTwoPair: pairTwoPairReducer,
    // your reducer here
  });

export default rootReducer;
