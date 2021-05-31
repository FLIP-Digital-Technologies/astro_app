import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
// import { DashboardLayout } from "../../components/layout";
// import { TableSort } from "../../assets/svg";
import { Money } from "../../utils/helper";
import styles from "../styles.module.scss";
import {
  DepositsTab,
  WithdrawalsTab,
  // GiftCardTradesTab,
  BillPaymentTab,
  PTwoPTab,
  // BuyGiftCardTab,
} from "./components";
import 
// TransactionModalBig
 {
  TransactionModalBillPayment,
  TransactionModalBuyGiftCard,
  TransactionModalP2P,
} from "../../components/Modals/transaction-info-modal-big";
import TransactionModal from "../../components/Modals/transaction-info-modal";
// import {
//   getGiftCardTransactionHistory,
//   getGiftCardTransaction,
// } from "../../redux/actions/giftCard";
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
import {
  ArrowLeftOutlined,
  // LoadingOutlined,
  // ReloadOutlined,
} from "@ant-design/icons";

const Transactions = ({
  goBack,
  depositTransaction,
  BillPaymentTrans,
  pairTwoPairFiatTrans,
  withdrawalTrans,
  getWithdrawalTrans,
  getDepositTrans,
  getBillPaymentTrans,
  getP2PTrans,
  getP2PTransById,
  getDepositById,
  getBillPaymentById,
  getWithdrawalById,
  viewWithdrawalTrans,
  viewDepositTrans,
  viewBillPaymentTrans,
  viewP2PTrans,
  viewBuyGiftCardTrans,
  fiatLoading,
}) => {
  const [depositTransDetails, setDepositTransDetails] = React.useState(false);
  // const [giftCardTransDetails, setGiftCardTransDetails] = React.useState(false);
  const [billPaymentDetails, setBillPaymentDetails] = React.useState(false);
  const [buyGiftCardDetails, setBuyGiftCardDetails] = React.useState(false);
  const [pairTwoPairFiatTransDetails, setPairTwoPairFiatTransDetails] =
    React.useState(false);
  const [withdrawalTransDetails, setWithdrawalTransDetails] =
    React.useState(false);
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft:15
          }}
        >
          <div onClick={() => goBack(true)} style={{cursor:'pointer'}}>
          <ArrowLeftOutlined style={{ fontSize: 25 }} />

          </div>
          <span className={styles.gitcard__top__title}>
            {" "}
            Fiat Transactions{" "}
          </span>
        </div>
        {/* <div style={{display:'flex', alignItems:'center', marginLeft:20}}>
          {" "}
          {!fiatLoading ? (
            <ReloadOutlined
              onClick={() => getWithdrawalTrans({ skip: 0, limit: 10 })}
              style={{ fontSize: 25 }}
            />
          ) : (
            <LoadingOutlined style={{ fontSize: 25 }} />
          )}
        </div> */}
      </div>

      {/* <span className={styles.gitcard__top__title}> Fiat Transactions</span> */}
      {viewP2PTrans && (
        <TransactionModalP2P
          dateData={viewP2PTrans.createdAt}
          amountSent={Money(
            viewP2PTrans?.amount_sent_object?.value,
            viewP2PTrans?.amountSent?.currency
          )}
          amountReceived={Money(
            viewP2PTrans?.amount_received_object?.value,
            viewP2PTrans?.amountReceived?.currency
          )}
          status={viewP2PTrans.status}
          reference={viewP2PTrans.reference}
          rate={`Transfer at ${viewP2PTrans.rate.value}`}
          transferNote={viewP2PTrans?.note}
          setIsModalVisible={setPairTwoPairFiatTransDetails}
          isModalVisible={pairTwoPairFiatTransDetails}
        />
      )}
      {viewBuyGiftCardTrans && (
        <TransactionModalBuyGiftCard
          dateData={viewBuyGiftCardTrans.createdAt}
          amount={viewBuyGiftCardTrans.amount}
          status={viewBuyGiftCardTrans.status}
          cardValue={viewBuyGiftCardTrans?.cardDetails?.cardValue}
          reference={viewBuyGiftCardTrans.reference}
          referenceCurrency={viewBuyGiftCardTrans.referenceCurrency}
          quan={viewBuyGiftCardTrans?.cardDetails?.quantity}
          setIsModalVisible={setBuyGiftCardDetails}
          isModalVisible={buyGiftCardDetails}
          cardCurrency={viewBuyGiftCardTrans?.cardDetails?.cardCurrency}
          cardSlug={viewBuyGiftCardTrans.cardSlug}
          estimatedUSDValue={
            viewBuyGiftCardTrans?.cardDetails?.estimatedUSDValue
          }
        />
      )}
      {viewDepositTrans && (
        <TransactionModal
          title={"Deposit"}
          dateData={viewDepositTrans.created_at}
          amount={viewDepositTrans.amount}
          status={viewDepositTrans.status}
          reference={viewDepositTrans.reference}
          setIsModalVisible={setDepositTransDetails}
          isModalVisible={depositTransDetails}
        />
      )}
      {viewWithdrawalTrans && (
        <TransactionModal
          title={"Withdrawal"}
          dateData={viewWithdrawalTrans.created_at}
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
          dateData={viewBillPaymentTrans.created_at}
          amount={viewBillPaymentTrans.amount}
          status={viewBillPaymentTrans.status}
          reference={viewBillPaymentTrans.reference}
          title={"Bill Payment"}
          transactionFee={viewBillPaymentTrans.transactionFee}
          id={viewBillPaymentTrans.id}
          referenceCurrency={viewBillPaymentTrans.FiatCurrency.code}
          details={viewBillPaymentTrans.detail}
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
                  <span>Bill Payment</span>
                </div>
              }
              key="3"
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
                  <span>P2P Fiat Transactions</span>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  btcRates: state.btc.btcTicker,
  balance: state.btc.balance,
  btcTrans: state.btc.BTCTransaction,
  buyTrans: state.btc.buyTransaction,
  sellTrans: state.btc.sellTransaction,
  sendTrans: state.btc.sendTransaction,
  p2pTrans: state.btc.p2pTransaction,
  BillPaymentTrans: state.billPayment.BillPaymentTransaction,
  pairTwoPairFiatTrans: state.pairTwoPair.pairTwoPairFiatTransaction,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
  fiatLoading: state.withdrawals.loading,
  depositTransaction: state.payment.DepositTransaction,
  viewP2PTrans:
    state.pairTwoPair.pairTwoPairFiatTransactionDetails &&
    state.pairTwoPair.pairTwoPairFiatTransactionDetails.transaction,
  viewGiftCardTrans: state.giftCard.giftCardDetails,
  viewWithdrawalTrans: state.withdrawals.withdrawalDetails,
  viewDepositTrans: state.payment.depositTransactionDetails,
  viewBillPaymentTrans: state.billPayment.BillPaymentTransactionDetails,
});

// viewBTCTrans,
//   viewBuyTrans,
//   viewSellTrans,
//   viewSendTrans,
//   viewP2PCryptoTrans,
const mapDispatchToProps = (dispatch) => ({
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
  getWithdrawalById: (data) => {
    dispatch(getWithdrawalDetailsById(data));
  },
  getDepositById: (data) => {
    dispatch(getPaymentDetailsById(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
