import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { DashboardLayout } from "../../components/layout";
// import { TableSort } from "../../assets/svg";
import styles from "../styles.module.scss";
import {
  DepositsTab,
  WithdrawalsTab,
  GiftCardTradesTab,
  BTCTradesTab,
  BillPaymentTab,
  PTwoPTab,
} from "./components";
import TransactionModalBig, {
  TransactionModalBTC,
  TransactionModalBillPayment,
} from "../../components/Modals/transaction-info-modal-big";
import TransactionModal from "../../components/Modals/transaction-info-modal";
import {
  getBTCTransactionHistory,
  getBTCWalletDetailsById,
} from "../../redux/actions/btc";
import {
  getGiftCardTransactionHistory,
  getGiftCardTransaction,
} from "../../redux/actions/giftCard";
import {
  getAllUserWithdrawalDetails,
  getWithdrawalDetailsById,
} from "../../redux/actions/withdrawals";
import {
  getAllUserPaymentDetails,
  getPaymentDetailsById,
} from "../../redux/actions/payment";
import {
  getAllUserBillPaymentDetails,
  getBillPaymentDetailsById,
} from "../../redux/actions/billPayment";
import {
  getAllUserFiatP2PTransferDetails,
  getFiatP2PTransferById,
} from "../../redux/actions/pairTwoPair";

const Transactions = ({
  btcTrans,
  depositTransaction,
  BillPaymentTrans,
  pairTwoPairFiatTrans,
  withdrawalTrans,
  giftCardTrans,
  getBTCTrans,
  getGiftCardTrans,
  getWithdrawalTrans,
  getDepositTrans,
  getBillPaymentTrans,
  getP2PTrans,
  getP2PTransById,
  getGiftCardById,
  getDepositById,
  getBTCById,
  getBillPaymentById,
  getWithdrawalById,
  viewWithdrawalTrans,
  viewDepositTrans,
  viewGiftCardTrans,
  viewBTCTrans,
  viewBillPaymentTrans,
  viewP2PTrans,
}) => {
  const [depositTransDetails, setDepositTransDetails] = React.useState(false);
  const [btcTransDetails, setBtcTransDetails] = React.useState(false);
  const [giftCardTransDetails, setGiftCardTransDetails] = React.useState(false);
  const [billPaymentDetails, setBillPaymentDetails] = React.useState(true);
  const [
    pairTwoPairFiatTransDetails,
    setPairTwoPairFiatTransDetails,
  ] = React.useState(true);
  const [withdrawalTransDetails, setWithdrawalTransDetails] = React.useState(
    false
  );
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <DashboardLayout>
      <span className={styles.gitcard__top__title}>Transactions</span>
      {viewDepositTrans && (
        <TransactionModal
          title={"Deposit"}
          dateData={viewDepositTrans.createdAt}
          amount={viewDepositTrans.amount}
          status={viewDepositTrans.status}
          reference={viewDepositTrans.trxReference}
          setIsModalVisible={setDepositTransDetails}
          isModalVisible={depositTransDetails}
        />
      )}
      {viewBTCTrans && (
        <TransactionModalBTC
          setIsModalVisible={setBtcTransDetails}
          isModalVisible={btcTransDetails}
          type={viewBTCTrans.type}
          status={viewBTCTrans.status}
          dateData={viewBTCTrans.createdAt}
          transactionType={viewBTCTrans.transactionType}
          reference={viewBTCTrans.reference}
          rate={viewBTCTrans.rate.amount}
          amount={viewBTCTrans.amount}
          address={viewBTCTrans.address}
          quidaxTransactionId={viewBTCTrans.quidaxTransactionId}
          txid={viewBTCTrans.txid}
          transactionFee={viewBTCTrans.transactionFee}
        />
      )}
      {viewGiftCardTrans && (
        <TransactionModalBig
          title="Gift Card"
          rate={viewGiftCardTrans.rate.amount}
          Qua={viewGiftCardTrans.quantity}
          id={viewGiftCardTrans.id}
          cardCode={viewGiftCardTrans.cardCode}
          images={viewGiftCardTrans.images}
          dateData={viewGiftCardTrans.createdAt}
          amount={viewGiftCardTrans.amount}
          status={viewGiftCardTrans.status}
          reference={viewGiftCardTrans.reference}
          setIsModalVisible={setGiftCardTransDetails}
          isModalVisible={giftCardTransDetails}
        />
      )}
      {viewWithdrawalTrans && (
        <TransactionModal
          title={"Withdrawal"}
          dateData={viewWithdrawalTrans.createdAt}
          amount={viewWithdrawalTrans.amount}
          status={viewWithdrawalTrans.status}
          reference={viewWithdrawalTrans.reference}
          setIsModalVisible={setWithdrawalTransDetails}
          isModalVisible={withdrawalTransDetails}
        />
      )}
      {viewBillPaymentTrans && (
        <TransactionModalBillPayment
          setIsModalVisible={setBillPaymentDetails}
          isModalVisible={billPaymentDetails}
          dateData={viewBillPaymentTrans.createdAt}
          amount={viewBillPaymentTrans.amount}
          status={viewBillPaymentTrans.status}
          reference={viewBillPaymentTrans.reference}
          title={"Bill Payment"}
          transactionFee={viewBillPaymentTrans.transactionFee}
          id={viewBillPaymentTrans.id}
          referenceCurrency={viewBillPaymentTrans.referenceCurrency}
          details={viewBillPaymentTrans.details}
        />
      )}
      <div className={styles.transactions}>
        <div className={styles.transactions__top}>
          <div className={styles.transactions__top__sort}></div>
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
              <DepositsTab
                fetchTrans={getDepositTrans}
                transaction={depositTransaction}
                handleAction={(id) => {
                  getDepositById({ transactionId: id });
                  setDepositTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Withdrawals</span>
                </div>
              }
              key="2"
            >
              <WithdrawalsTab
                fetchTrans={getWithdrawalTrans}
                transaction={withdrawalTrans}
                handleAction={(id) => {
                  getWithdrawalById({ transactionId: id });
                  setWithdrawalTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Bitcoin Trades</span>
                </div>
              }
              key="3"
            >
              <BTCTradesTab
                fetchTrans={getBTCTrans}
                transaction={btcTrans}
                handleAction={(id) => {
                  getBTCById({ transactionId: id });
                  setBtcTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Bill Payment</span>
                </div>
              }
              key="4"
            >
              <BillPaymentTab
                fetchTrans={getBillPaymentTrans}
                transaction={BillPaymentTrans}
                handleAction={(id) => {
                  getBillPaymentById({ transactionId: id });
                  setBillPaymentDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>GiftCard Trades</span>
                </div>
              }
              key="5"
            >
              <GiftCardTradesTab
                fetchTrans={getGiftCardTrans}
                transaction={giftCardTrans}
                handleAction={(id) => {
                  getGiftCardById({ transactionId: id });
                  setGiftCardTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>P2P Transactions</span>
                </div>
              }
              key="6"
            >
              <PTwoPTab
                fetchTrans={getP2PTrans}
                transaction={pairTwoPairFiatTrans}
                handleAction={(id) => {
                  getP2PTransById({ transactionId: id });
                  setPairTwoPairFiatTransDetails(true);
                }}
              />
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
  BillPaymentTrans: state.billPayment.BillPaymentTransaction,
  pairTwoPairFiatTrans: state.pairTwoPair.pairTwoPairFiatTransaction,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
  depositTransaction: state.payment.DepositTransaction,
  viewP2PTrans: state.pairTwoPair.pairTwoPairFiatTransactionDetails,
  viewBTCTrans: state.btc.btcDetails,
  viewGiftCardTrans: state.giftCard.giftCardDetails,
  viewWithdrawalTrans: state.withdrawals.withdrawalDetails,
  viewDepositTrans: state.payment.depositTransactionDetails,
  viewBillPaymentTrans: state.billPayment.billPaymentDetails,
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
  getBillPaymentTrans: (data) => {
    dispatch(getAllUserBillPaymentDetails(data));
  },
  getP2PTrans: (data) => {
    dispatch(getAllUserFiatP2PTransferDetails(data));
  },
  getP2PTransById: (data) => {
    dispatch(getFiatP2PTransferById(data));
  },
  getBillPaymentById: (data) => {
    dispatch(getBillPaymentDetailsById(data));
  },
  getBTCById: (data) => {
    dispatch(getBTCWalletDetailsById(data));
  },
  getGiftCardById: (data) => {
    dispatch(getGiftCardTransaction(data));
  },
  getWithdrawalById: (data) => {
    dispatch(getWithdrawalDetailsById(data));
  },
  getDepositById: (data) => {
    dispatch(getPaymentDetailsById(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
