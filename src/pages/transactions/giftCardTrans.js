import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
// import { DashboardLayout } from "../../components/layout";
// import { TableSort } from "../../assets/svg";
// import { Money } from "../../utils/helper";
import styles from "../styles.module.scss";
import {
  // DepositsTab,
  // WithdrawalsTab,
  GiftCardTradesTab,
  // BillPaymentTab,
  // PTwoPTab,
  BuyGiftCardTab,
} from "./components";
import TransactionModalBig, {
  // TransactionModalBillPayment,
  TransactionModalBuyGiftCard,
  // TransactionModalP2P
} from "../../components/Modals/transaction-info-modal-big";
// import TransactionModal from "../../components/Modals/transaction-info-modal";
import {
  getGiftCardTransactionHistory,
  getGiftCardTransaction,
} from "../../redux/actions/giftCard";
import {
  getAllBuyCardTransaction,
  getBuyCardTransaction,
} from "../../redux/actions/buyGiftCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CommaFormatted } from "../../utils/helper";

const Transactions = ({
  goBack,
  giftCardTrans,
  getGiftCardTrans,
  getGiftCardById,
  viewGiftCardTrans,
  getBuyGiftCardTrans,
  getBuyGiftCardTransById,
  BuyGiftCardTrans,
  viewBuyGiftCardTrans,
  userWallets,
  fiatCurrency,
}) => {
  //   const [depositTransDetails, setDepositTransDetails] = React.useState(false);
  const [giftCardTransDetails, setGiftCardTransDetails] = React.useState(false);
  //   const [billPaymentDetails, setBillPaymentDetails] = React.useState(false);
  const [buyGiftCardDetails, setBuyGiftCardDetails] = React.useState(false);
  const [credit_wallet, setCredit_wallet] = useState({});
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    console.log("currency", fiatCurrency);
    let walletRate =
      fiatCurrency &&
      viewGiftCardTrans &&
      viewGiftCardTrans.credit_currency_id &&
      fiatCurrency.length > 0 &&
      fiatCurrency.filter(
        (item) => item.id === viewGiftCardTrans.credit_currency_id
      )[0];
    setCredit_wallet(walletRate);
    console.log("currency 1", walletRate);
  }, [viewGiftCardTrans, fiatCurrency]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 15,
        }}
      >
        <div onClick={() => goBack(true)} style={{ cursor: "pointer" }}>
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <span className={styles.gitcard__top__title}>
          {" "}
          Gift Card Transactions{" "}
        </span>
      </div>
      {/* <div onClick={()=> goBack(true)} style={{display:"flex", flexDirection:"row", alignItems:'center'}}>
      <ArrowLeftOutlined style={{fontSize:20}}/>
      <span className={styles.gitcard__top__title}> Gift Card Transactions</span>
    </div> */}
      {/* <span className={styles.gitcard__top__title}> Fiat Transactions</span> */}

      {viewBuyGiftCardTrans && (
        <TransactionModalBuyGiftCard
          dateData={viewBuyGiftCardTrans.created_at}
          amount={viewBuyGiftCardTrans.amount}
          status={viewBuyGiftCardTrans.status}
          cardValue={viewBuyGiftCardTrans?.card_detail?.value}
          reference={viewBuyGiftCardTrans.reference}
          referenceCurrency={viewBuyGiftCardTrans.description}
          quan={viewBuyGiftCardTrans?.card_detail?.quantity}
          setIsModalVisible={setBuyGiftCardDetails}
          isModalVisible={buyGiftCardDetails}
          cardCurrency={viewBuyGiftCardTrans?.card_detail?.currency}
          cardSlug={viewBuyGiftCardTrans.card_slug}
          estimatedUSDValue={
            viewBuyGiftCardTrans?.card_detail?.estimatedUSDValue
          }
        />
      )}

      {viewGiftCardTrans && (
        <TransactionModalBig
          title="Gift Card"
          rate={`${
            credit_wallet && credit_wallet.code && credit_wallet.code
          } ${CommaFormatted(
            credit_wallet &&
              credit_wallet.we_buy &&
              viewGiftCardTrans.rate * credit_wallet.we_buy
          )} / USD`}
          Qua={viewGiftCardTrans.comment}
          id={viewGiftCardTrans.id}
          cardCode={viewGiftCardTrans.GiftCard.name}
          images={viewGiftCardTrans.images}
          dateData={viewGiftCardTrans.created_at}
          amount={`${"USD"} ${CommaFormatted(viewGiftCardTrans.amount)}`}
          status={viewGiftCardTrans.status}
          reference={viewGiftCardTrans.reference}
          setIsModalVisible={setGiftCardTransDetails}
          isModalVisible={giftCardTransDetails}
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
                <div className={styles.transactions__tab__item}>
                  <span>Sell GiftCard Transactions</span>
                </div>
              }
              key="4"
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
              key="5"
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
          </Tabs>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  balance: state.btc.balance,
  giftCardTrans: state.giftCard.GiftCardTransaction,
  BuyGiftCardTrans: state.buyGiftCard.buyGiftCardTransaction,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
  viewGiftCardTrans: state.giftCard.giftCardDetails,
  viewBuyGiftCardTrans: state.buyGiftCard.buyGiftCardTransactionDetails,
});
const mapDispatchToProps = (dispatch) => ({
  getGiftCardTrans: (data) => {
    dispatch(getGiftCardTransactionHistory(data));
  },
  getBuyGiftCardTrans: (data) => {
    dispatch(getAllBuyCardTransaction(data));
  },
  getBuyGiftCardTransById: (data) => {
    dispatch(getBuyCardTransaction(data));
  },
  getGiftCardById: (data) => {
    dispatch(getGiftCardTransaction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
