import React from "react";
import { connect } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Wallet from "./wallet";
import BtcWallet from "./BtcWallet";
import NairaWallet from "./NairaWallet";
import BtcSend from "./BtcSend";
import {
  getLastBTCTransactionHistory,
  getBTCWalletDetails,
} from "../../redux/actions/btc";
import { getLastGiftCardTransactionHistory } from "../../redux/actions/giftCard";
import { getLastUserWithdrawalDetails } from "../../redux/actions/withdrawals";
import {
  getUserBankAccount,
  getUserDetailsById,
} from "../../redux/actions/user";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import { getBankListByCountry } from "../../redux/actions/bank";
import { getLastUserPaymentDetails } from "../../redux/actions/payment";

const WalletIndex = ({
  user,
  balance,
  btcTrans,
  btcRates,
  withdrawalTrans,
  getCurrentUser,
  getUserBankDetails,
  getBankList,
  getBalance,
  getLatestBTCTrans,
  getLatestGiftCardTrans,
  getLatestWithdrawalTrans,
  getBTCRates,
  getLastDepositTrans,
  depositTransaction
}) => {
  React.useEffect(() => {
    getCurrentUser();
    getUserBankDetails();
    getBankList();
    getBalance();
    getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 0, limit: 5 });
    getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    getLastDepositTrans({ skip: 0, limit: 5 });
    getBTCRates();
    // eslint-disable-next-line
  }, []);
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <Wallet btcRates={btcRates} user={user} balance={balance} depositTransaction={depositTransaction} withdrawalTrans={withdrawalTrans} btcTrans={btcTrans} />
      </Route>
      <Route exact path={`${match.url}/btc`}>
        <BtcWallet btcTrans={btcTrans} btcRates={btcRates} user={user} balance={balance} />
      </Route>
      <Route path={`${match.url}/btc/send`}>
        <BtcSend btcRates={btcRates} user={user} balance={balance} />
      </Route>
      <Route path={`${match.url}/naira`}>
        <NairaWallet depositTransaction={depositTransaction} withdrawalTrans={withdrawalTrans} btcRates={btcRates} user={user} balance={balance} />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  btcRates: state.btc.btcTicker,
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  giftCardTrans: state.giftCard.latestGiftCardTransaction,
  withdrawalTrans: state.giftCard.latestWithdrawalTransaction,
  depositTransaction: state.payment.latestDepositTransaction
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => {
    dispatch(getUserDetailsById());
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
    dispatch(getLastBTCTransactionHistory(data));
  },
  getLatestGiftCardTrans: (data) => {
    dispatch(getLastGiftCardTransactionHistory(data));
  },
  getLatestWithdrawalTrans: (data) => {
    dispatch(getLastUserWithdrawalDetails(data));
  },
  getLastDepositTrans: (data) => {
    dispatch(getLastUserPaymentDetails(data));
  },
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletIndex);
