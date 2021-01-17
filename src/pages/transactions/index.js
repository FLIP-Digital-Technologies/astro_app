import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { DashboardLayout } from "../../components/layout";
// import { TableSort } from "../../assets/svg";
import styles from "../styles.module.scss";
import { DepositsTab, WithdrawalsTab, GiftCardTradesTab, BTCTradesTab } from "./components";
import {
  getBTCTransactionHistory,
} from "../../redux/actions/btc";
import { getGiftCardTransactionHistory } from "../../redux/actions/giftCard";
import { getAllUserWithdrawalDetails } from "../../redux/actions/withdrawals";
import { getAllUserPaymentDetails } from "../../redux/actions/payment";

const Transactions = ({
  btcTrans,
  depositTransaction,
  withdrawalTrans,
  giftCardTrans,
  getBTCTrans,
  getGiftCardTrans,
  getWithdrawalTrans,
  getDepositTrans,
}) => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <DashboardLayout>
      <div className={styles.transactions}>
        <div className={styles.transactions__top}>
          {/* <span className={styles.transactions__top__title}>
            You have a total of 1 transaction(s)
          </span> */}

          <div className={styles.transactions__top__sort}>
            {/* <TableSort />
            <span>SORT BY</span> */}
          </div>
        </div>
        <div className={styles.transactions__tab}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item__first}>
                  <span>Deposits</span>
                </div>
              }
              key="1"
            >
              <DepositsTab fetchTrans={getDepositTrans} transaction={depositTransaction} />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Withdrawals</span>
                </div>
              }
              key="2"
            >
              <WithdrawalsTab fetchTrans={getWithdrawalTrans} transaction={withdrawalTrans} />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Bitcoin Trades</span>
                </div>
              }
              key="3"
            >
              <BTCTradesTab fetchTrans={getBTCTrans} transaction={btcTrans} />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>GiftCard Trades</span>
                </div>
              }
              key="4"
            >
              <GiftCardTradesTab fetchTrans={getGiftCardTrans} transaction={giftCardTrans} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  btcRates: state.btc.btcTicker,
  balance: state.btc.balance,
  btcTrans: state.btc.BTCTransaction,
  giftCardTrans: state.giftCard.GiftCardTransaction,
  withdrawalTrans: state.giftCard.WithdrawalTransaction,
  depositTransaction: state.payment.DepositTransaction
});

const mapDispatchToProps = (dispatch) => ({
  getBTCTrans: (data) => {
    dispatch(getBTCTransactionHistory(data));
  },
  getGiftCardTrans: (data) => {
    dispatch(getGiftCardTransactionHistory(data));
  },
  getWithdrawalTrans: (data) => {
    dispatch(getAllUserWithdrawalDetails(data));
  },
  getDepositTrans: (data) => {
    dispatch(getAllUserPaymentDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
