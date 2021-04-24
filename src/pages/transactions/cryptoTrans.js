import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { DashboardLayout } from "../../components/layout";
// import { TableSort } from "../../assets/svg";
import { Money } from "../../utils/helper";
import styles from "../styles.module.scss";
import {
  DepositsTab,
  WithdrawalsTab,
  GiftCardTradesTab,
  BTCTradesTab,
  BillPaymentTab,
  PTwoPTab,
  BuyGiftCardTab,
} from "./components";
import TransactionModalBig, {
  TransactionModalBTC,
  TransactionModalBillPayment,
  TransactionModalBuyGiftCard,
  TransactionModalP2P
} from "../../components/Modals/transaction-info-modal-big";
import TransactionModal from "../../components/Modals/transaction-info-modal";
import {
  getBTCTransactionHistory,
  getBTCWalletDetailsById,
  getCryptoBuyTransactionDetails,
  getCryptoBuyTransactionHistory,
  getCryptoP2PTransactionDetails,
  getCryptoP2PTransactionHistory,
  getCryptoSellTransactionDetails,
  getCryptoSellTransactionHistory,
  getCryptoSendTransactionDetails,
  getCryptoSendTransactionHistory,
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
import {
  getAllBuyCardTransaction,
  getBuyCardTransaction,
} from "../../redux/actions/buyGiftCard";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Transactions = ({
  goBack,
  btcTrans,
  buyTrans,
  sellTrans,
  sendTrans,
  p2pTrans,
  depositTransaction,
  BillPaymentTrans,
  pairTwoPairFiatTrans,
  withdrawalTrans,
  giftCardTrans,
  getBTCTrans,
  getBuyCryptoTrans,
  getSellCryptoTrans,
  getSendCryptoTrans,
  getP2PCryptoTrans,
  getBuyCryptoById,
  getSellCryptoById,
  getSendCryptoById,
  getP2PCryptoById,
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
  viewBuyTrans,
  viewSellTrans,
  viewSendTrans,
  viewP2PCryptoTrans,
  viewBillPaymentTrans,
  viewP2PTrans,
  getBuyGiftCardTrans,
  getBuyGiftCardTransById,
  BuyGiftCardTrans,
  viewBuyGiftCardTrans,
}) => {
  const [depositTransDetails, setDepositTransDetails] = React.useState(false);
  const [btcTransDetails, setBtcTransDetails] = React.useState(false);
  const [buyCryptoTransDetails, setBuyCryptoTransDetails] = React.useState(false);
  const [sellCryptoTransDetails, setSellCryptoTransDetails] = React.useState(false);
  const [sendCryptoTransDetails, setSendCryptoTransDetails] = React.useState(false);
  const [p2pCryptoTransDetails, setP2PCryptoTransDetails] = React.useState(false);
  const [giftCardTransDetails, setGiftCardTransDetails] = React.useState(false);
  const [billPaymentDetails, setBillPaymentDetails] = React.useState(false);
  const [buyGiftCardDetails, setBuyGiftCardDetails] = React.useState(false);
  const [
    pairTwoPairFiatTransDetails,
    setPairTwoPairFiatTransDetails,
  ] = React.useState(false);
  const [withdrawalTransDetails, setWithdrawalTransDetails] = React.useState(
    false
  );
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <>
    <div onClick={()=> goBack(true)} style={{display:"flex", flexDirection:"row", alignItems:'center'}}>
    <ArrowLeftOutlined style={{fontSize:20}}/>
      <span className={styles.gitcard__top__title}>Crypto Transactions</span>
    </div>
      {/* <span className={styles.gitcard__top__title}> Fiat Transactions</span> */}
      {viewP2PTrans && (
        <TransactionModalP2P
          dateData={viewP2PTrans.createdAt}
          amountSent={Money(viewP2PTrans?.amount_sent_object?.value, viewP2PTrans?.amountSent?.currency)}
          amountReceived={Money(viewP2PTrans?.amount_received_object?.value, viewP2PTrans?.amountReceived?.currency)}
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
          estimatedUSDValue={viewBuyGiftCardTrans?.cardDetails?.estimatedUSDValue}
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
      {viewBuyTrans && (
        <TransactionModalBTC
          setIsModalVisible={setBuyCryptoTransDetails}
          isModalVisible={buyCryptoTransDetails}
          type={viewBuyTrans.type}
          status={viewBuyTrans.status}
          dateData={viewBuyTrans.createdAt}
          transactionType={viewBuyTrans.transactionType}
          reference={viewBuyTrans.reference}
          rate={viewBuyTrans.rate.amount}
          amount={viewBuyTrans.amount}
          address={viewBuyTrans.address}
          quidaxTransactionId={viewBuyTrans.quidaxTransactionId}
          txid={viewBuyTrans.txid}
          transactionFee={viewBuyTrans.transactionFee}
        />
      )}
      {viewSellTrans && (
        <TransactionModalBTC
          setIsModalVisible={setSellCryptoTransDetails}
          isModalVisible={sellCryptoTransDetails}
          type={viewSellTrans.type}
          status={viewSellTrans.status}
          dateData={viewSellTrans.createdAt}
          transactionType={viewSellTrans.transactionType}
          reference={viewSellTrans.reference}
          rate={viewSellTrans.rate.amount}
          amount={viewSellTrans.amount}
          address={viewSellTrans.address}
          quidaxTransactionId={viewSellTrans.quidaxTransactionId}
          txid={viewSellTrans.txid}
          transactionFee={viewSellTrans.transactionFee}
        />
      )}
       {viewSendTrans && (
        <TransactionModalBTC
          setIsModalVisible={setSendCryptoTransDetails}
          isModalVisible={sendCryptoTransDetails}
          type={viewSendTrans.type}
          status={viewSendTrans.status}
          dateData={viewSendTrans.createdAt}
          transactionType={viewSendTrans.transactionType}
          reference={viewSendTrans.reference}
          rate={viewSendTrans.rate.amount}
          amount={viewSendTrans.amount}
          address={viewSendTrans.address}
          quidaxTransactionId={viewSendTrans.quidaxTransactionId}
          txid={viewSendTrans.txid}
          transactionFee={viewSendTrans.transactionFee}
        />
      )}
      {viewP2PCryptoTrans && (
        <TransactionModalBTC
          setIsModalVisible={setP2PCryptoTransDetails}
          isModalVisible={p2pCryptoTransDetails}
          type={viewP2PCryptoTrans.type}
          status={viewP2PCryptoTrans.status}
          dateData={viewP2PCryptoTrans.createdAt}
          transactionType={viewP2PCryptoTrans.transactionType}
          reference={viewP2PCryptoTrans.reference}
          rate={viewP2PCryptoTrans.rate.amount}
          amount={viewP2PCryptoTrans.amount}
          address={viewP2PCryptoTrans.address}
          quidaxTransactionId={viewP2PCryptoTrans.quidaxTransactionId}
          txid={viewP2PCryptoTrans.txid}
          transactionFee={viewP2PCryptoTrans.transactionFee}
        />
      )}
      {viewGiftCardTrans && (
        <TransactionModalBig
          title="Gift Card"
          rate={viewGiftCardTrans.rate.amount}
          Qua={viewGiftCardTrans.comments}
          id={viewGiftCardTrans.id}
          cardCode={viewGiftCardTrans.cardCode}
          images={viewGiftCardTrans.images}
          dateData={viewGiftCardTrans.created_at}
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
            {/* <TabPane
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
            </TabPane> */}
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Buy Crypto Transactions</span>
                </div>
              }
              key="4"
            >
              <BTCTradesTab
                fetchTrans={getBuyCryptoTrans}
                transaction={buyTrans}
                handleAction={(id) => {
                  getBuyCryptoById({ transactionId: id });
                  setBuyCryptoTransDetails(true);
                }}
              />
            </TabPane>

            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Sell Crypto Transactions</span>
                </div>
              }
              key="5"
            >
              <BTCTradesTab
                fetchTrans={getSellCryptoTrans}
                transaction={sellTrans}
                handleAction={(id) => {
                  getSellCryptoById({ transactionId: id });
                  setSellCryptoTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Send Crypto Transactions</span>
                </div>
              }
              key="6"
            >
              <BTCTradesTab
                fetchTrans={getSendCryptoTrans}
                transaction={sendTrans}
                handleAction={(id) => {
                  getSendCryptoById({ transactionId: id });
                  setSendCryptoTransDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>P2P Crypto Transactions</span>
                </div>
              }
              key="7"
            >
              <BTCTradesTab
                fetchTrans={getP2PCryptoTrans}
                transaction={p2pTrans}
                handleAction={(id) => {
                  getP2PCryptoById({ transactionId: id });
                  setP2PCryptoTransDetails(true);
                }}
              />
            </TabPane>
            
            {/* <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>Sell GiftCard Transactions</span>
                </div>
              }
              key="8"
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
                  <span>Buy GiftCard Transactions</span>
                </div>
              }
              key="9"
            >
              <BuyGiftCardTab
                fetchTrans={getBuyGiftCardTrans}
                transaction={BuyGiftCardTrans}
                handleAction={(id) => {
                  getBuyGiftCardTransById({ transactionId: id });
                  setBuyGiftCardDetails(true);
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>P2P Fiat Transactions</span>
                </div>
              }
              key="10"
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
            <TabPane
              tab={
                <div className={styles.transactions__tab__item}>
                  <span>P2P Crypto Transactions</span>
                </div>
              }
              key="11"
            >
              <PTwoPTab
                fetchTrans={getP2PTrans}
                transaction={pairTwoPairFiatTrans}
                handleAction={(id) => {
                  getP2PTransById({ transactionId: id });
                  setPairTwoPairFiatTransDetails(true);
                }}
              />
            </TabPane> */}
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
  giftCardTrans: state.giftCard.GiftCardTransaction,
  BillPaymentTrans: state.billPayment.BillPaymentTransaction,
  BuyGiftCardTrans: state.buyGiftCard.buyGiftCardTransaction,
  pairTwoPairFiatTrans: state.pairTwoPair.pairTwoPairFiatTransaction,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
  depositTransaction: state.payment.DepositTransaction,
  viewP2PTrans: state.pairTwoPair.pairTwoPairFiatTransactionDetails && state.pairTwoPair.pairTwoPairFiatTransactionDetails.transaction,
  viewBTCTrans: state.btc.btcDetails,
  viewBuyTrans: state.btc.buyDetails,
  viewSellTrans: state.btc.sellDetails,
  viewSendTrans: state.btc.sendDetails,
  viewP2PCryptoTrans: state.btc.p2pDetails,
  viewGiftCardTrans: state.giftCard.giftCardDetails,
  viewWithdrawalTrans: state.withdrawals.withdrawalDetails,
  viewDepositTrans: state.payment.depositTransactionDetails,
  viewBillPaymentTrans: state.billPayment.billPaymentDetails,
  viewBuyGiftCardTrans: state.buyGiftCard.buyGiftCardTransactionDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCTrans: (data) => {
    dispatch(getBTCTransactionHistory(data));
  },
  getBuyCryptoTrans: (data) => {
    dispatch(getCryptoBuyTransactionHistory(data))
  },
  getSellCryptoTrans:(data) => {
    dispatch(getCryptoSellTransactionHistory(data))
  },
  getSendCryptoTrans:(data) => {
    dispatch(getCryptoSendTransactionHistory(data))
  },
  getP2PCryptoTrans:(data) => {
    dispatch(getCryptoP2PTransactionHistory(data))
  },
  getBuyCryptoById:(data) => {
    dispatch(getCryptoBuyTransactionDetails(data))
  },
  getSellCryptoById:(data) => {
    dispatch(getCryptoSellTransactionDetails(data))
  },
  getSendCryptoById:(data) => {
    dispatch(getCryptoSendTransactionDetails(data))
  },
  getP2PCryptoById:(data)=>{
    dispatch(getCryptoP2PTransactionDetails(data))
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
  getBuyGiftCardTrans: (data) => {
    dispatch(getAllBuyCardTransaction(data));
  },
  getBuyGiftCardTransById: (data) => {
    dispatch(getBuyCardTransaction(data));
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
