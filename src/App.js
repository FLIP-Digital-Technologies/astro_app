import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { getUserBankAccount } from "./redux/actions/user";
import { getBankListByCountry } from "./redux/actions/bank";

import {
  Home,
  SellGiftcard,
 
  Transactions,
 
  OnBoarding,
  BuyGiftCard,
  Bills,
  Settings,
} from "./pages";
import {
  getBTCTransactionHistory,
  getBTCWalletDetails,
} from "./redux/actions/btc";
import { getLastGiftCardTransactionHistory } from "./redux/actions/giftCard";
import { getAllUserPaymentDetails } from "./redux/actions/payment";
import { GetUserDetails } from "./redux/actions/Auths";
import CustomRoute from "./utils/CustomRoute";

function App(props) {
  useEffect(() => {
    props.getCurrentUser();
    props.getUserBankDetails();
    // props.getBankList();
    props.getBalance();
    props.getLatestBTCTrans({ skip: 0, limit: 5 });
    props.getLatestGiftCardTrans({ skip: 0, limit: 5 });
    props.getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path="/app">
        <Home />
      </Route>
      <Route path="/app/onboarding">
        <OnBoarding />
      </Route>
      <CustomRoute
        condition="completeRegistration"
        path="/app/sell-giftcard"
        component={SellGiftcard}
      />
      {/* <Route path="/app/sell-giftcard">
        <SellGiftcard />
      </Route> */}
      <CustomRoute
        condition="completeRegistration"
        path="/app/buy-giftcard"
        component={BuyGiftCard}
      />
      {/* <Route path="/app/buy-giftcard">
        <BuyGiftCard />
      </Route> */}
      {/* <CustomRoute
        condition="completeRegistration"
        path="/app/crypto"
        component={Home}
        // component={CryptoView}
      /> */}

     
      <Route path="/app/transactions">
        <Transactions />
      </Route>
      <CustomRoute
        condition="completeRegistration"
        path="/app/bills"
        component={Bills}
      />
      {/* <Route path="/app/bills">
        <Bills />
      </Route> */}

      <Route path="/app/settings">
        <Settings />
      </Route>
      {/* <Redirect to="/" /> */}
    </Switch>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => {
    dispatch(GetUserDetails());
  },
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  getBankList: () => {
    dispatch(getBankListByCountry());
  },
  getBalance: () => {
    dispatch(getBTCWalletDetails());
  },
  getLatestBTCTrans: (data) => {
    dispatch(getBTCTransactionHistory(data));
  },
  getLatestGiftCardTrans: (data) => {
    dispatch(getLastGiftCardTransactionHistory(data));
  },
  getLatestWithdrawalTrans: (data) => {
    dispatch(getAllUserPaymentDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
