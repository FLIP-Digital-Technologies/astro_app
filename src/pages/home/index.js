import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import { PlusOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";
import { history } from "../../redux/store";
import {
  getBTCWalletDetails,
  getLastBTCTransactionHistory,
} from "../../redux/actions/btc";
import { getLastGiftCardTransactionHistory } from "../../redux/actions/giftCard";
import {
  getUserBankAccount,
} from "../../redux/actions/user";
import { getBankListByCountry } from "../../redux/actions/bank";
import { getLastUserWithdrawalDetails } from "../../redux/actions/withdrawals";
import PTwoPFlyout, { AirtimeFlyout, FundFlyout, } from "./components";
import { initialPaymentByUser } from "../../redux/actions/payment";
import ModalWrapper from "../../components/Modals";
import WithdrawInitial from "../../components/Modals/withdraw-modal-Initial";
import { getBillPaymentCategory, initialBillPaymentByUser } from "../../redux/actions/billPayment";
import { Money } from "../../utils/helper";
import { getCryptoCurrencies, getFiatCurrencies, GetUserDetails } from "../../redux/actions/Auths";

const Home = ({
  user,
  balance,
  buyAirtime,
  billLoading,
  BillPaymentCategory,
  getCurrentUser,
  getUserBankDetails,
  getBillPaymentCategory,
  getBalance,
  getLatestBTCTrans,
  getLatestGiftCardTrans,
  getLatestWithdrawalTrans,
  Fund,
  loading,
  depositMoney,
  depositMoneyDetails,
  getMainCryptoCurrency,
  getMainFiatCurrency
}) => {
  const [wallet, setWallet] = useState("NGN");
  const [renderBalance, setRenderBalance] = useState("0");
  const [showAirtime, setShowAirtime] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const [showPTWOP, setShowPTWOP] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);

  const [dataPair, setDataPair] = useState({});
  const [state, setState] = useState({});
  const [AirtimeState, setAirtimeState] = useState({});

const getFiatCurrency = (wallet) => {
  let fiatCurrency = balance.fiatWallets
  switch (wallet) {
    case "NGN":
      return fiatCurrency.length > 0 && fiatCurrency.filter((item)=> item.Currency.code === "NGN")[0].balance
    case "GHS":
      return fiatCurrency.length > 0 && fiatCurrency.filter((item)=> item.Currency.code === "GHS")[0].balance
    default:
      return 0
  }
}

const getCryptoCurrency = (wallet) => {
  let cryptoCurrency = balance.cryptoWallets
  switch (wallet) {
    case "BTC":
      return cryptoCurrency.length > 0 && cryptoCurrency.filter((item) => item.Currency.code === "BTC")[0].balance
  
    default:
      return 0
  }
}


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (!balance) return;
    if (!wallet) return;
    console.log('currency')
    setRenderBalance(wallet !== "BTC" ? Money(getFiatCurrency(wallet) || 0 , wallet) : getCryptoCurrency(wallet) || 0);
  });

  useEffect(() => {
    getCurrentUser();
    getUserBankDetails();
    getBalance();
    getMainCryptoCurrency();
    getMainFiatCurrency();
    // getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 1, limit: 5 });
    // getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);
  return (
    <DashboardLayout>
      <WithdrawInitial
        setIsModalVisible={setOpenWithdrawal}
        isModalVisible={openWithdrawal}
      />
      {openModal && depositMoneyDetails && (
        <ModalWrapper
          className={styles.scanSell__body}
          style={{ height: 800, width: 300 }}
          isModalVisible={depositMoney ? openModal : false}
          setIsModalVisible={() => {
            setOpenModal(false);
            setShowFund(false);
            setState({})
          }}
        >
          <iframe
            id="frame"
            height="800"
            style={{
              border: "none",
              boxShadow: "none",
              width: "100%",
              paddingTop: 40,
            }}
            title="payment"
            src={depositMoneyDetails && depositMoneyDetails.fw_paymentLink}
            // src={"https://www.w3schools.com"}
          ></iframe>
        </ModalWrapper>
      )}
      <span className={styles.gitcard__top__title}>Home </span>
      {showAirtime && (
        <Drawer
          title="Airtime purchase"
          width={350}
          placement="right"
          onClose={() => {setShowAirtime(false); setAirtimeState({})}}
          visible={showAirtime}
        >
          <AirtimeFlyout BillPaymentCategory={BillPaymentCategory} buyAirtime={buyAirtime} loading={billLoading} getBillPaymentCategory={getBillPaymentCategory} state={AirtimeState} setState={setAirtimeState} />
        </Drawer>
      )}

      {showPTWOP && (
        <Drawer
          title="Pair 2 Pair (p2p) Transfer"
          placement="right"
          width={350}
          onClose={() => {setShowPTWOP(false); setDataPair({})}}
          visible={showPTWOP}
        >
          <PTwoPFlyout setOpenModal={setShowPTWOP} balance={balance} state={dataPair} setState={setDataPair} />
        </Drawer>
      )}
      {showFund && (
        <Drawer
          title="Fund wallet"
          placement="right"
          width={350}
          onClose={() => {setShowFund(false); setState({})}}
          visible={showFund}
        >
          <FundFlyout state={state} setState={setState} Fund={Fund} loading={loading} setOpenModal={setOpenModal} />
        </Drawer>
      )}
      <div className={styles.home}>
        <div className={styles.home__welcome}>
          <div className={styles.home__top}>
            <div className={styles.balances}>
              <span className={styles.balances__title}>Wallet Balance</span>
              <div className={styles.balances__value}>
                <span>{renderBalance}</span>{" "}
                {wallet === "BTC" && <span>{wallet}</span>}
              </div>
              <div className={styles.balances__btn__holder}>
                <div
                  onClick={() => setWallet("NGN")}
                  className={`${styles.balances__btn} ${
                    wallet === "NGN" && styles.active
                  }`}
                >
                  NGN
                </div>
                <div
                  onClick={() => setWallet("GHS")}
                  className={`${styles.balances__btn} ${
                    wallet === "GHS" && styles.active
                  }`}
                >
                  GHS
                </div>
                <div
                  onClick={() => setWallet("BTC")}
                  className={`${styles.balances__btn} ${
                    wallet === "BTC" && styles.active
                  }`}
                >
                  BTC
                </div>
              </div>
            </div>
            <div onClick={() => setShowFund(true)} className={styles.fund}>
              <div className={styles.fund__image}>
                <div>
                  <PlusOutlined style={{fontSize: 23}} />
                </div>
              </div>
              <span className={styles.fund__text}>Fund Wallet</span>
            </div>
            <div onClick={() => setOpenWithdrawal(true)} className={styles.fund}>
              <div className={styles.fund__image}>
                <div>
                  <i class="fas fa-wallet text-white" style={{fontSize: 22, color: "#ffffff"}} />
                </div>
              </div>
              <span className={styles.fund__text}>Withdrawal</span>
            </div>
          </div>
          <div className={styles.quick}>
            <div className={styles.quick__holder} style={{width: "100%", flexWrap: "wrap"}}>
              <div
                onClick={() => setShowPTWOP(true)}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <UserSwitchOutlined />
                </div>
                <span style={{textAlign: "center", lineHeight: 1}}>send money via P2P</span>
              </div>
              <div
                onClick={() => history.push("/app/sell-giftcard")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fas fa-gift"></i>
                </div>
                <span>Sell GiftCard</span>
              </div>
              <div
                onClick={() => history.push("/app/btc")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fab fa-btc"></i>
                </div>
                <span>Bitcoin</span>
              </div>
              <div
                onClick={() => setShowAirtime(true)}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="far fa-credit-card"></i>
                </div>
                <span>Buy Airtime</span>
              </div>
              <div
                onClick={() => history.push("/app/bills")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fas fa-file-invoice-dollar"></i>
                </div>
                <span>Bill Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  giftCardTrans: state.giftCard.latestGiftCardTransaction,
  withdrawalTrans: state.giftCard.latestWithdrawalTransaction,
  loading: state.payment.loading,
  depositMoney: state.payment.depositMoney,
  depositMoneyDetails: state.payment.depositMoneyDetails,
  BillPaymentCategory: state.billPayment.BillPaymentCategory,
  billLoading: state.billPayment.loading,
});

const mapDispatchToProps = (dispatch) => ({
  Fund: (data) => {
    dispatch(initialPaymentByUser(data));
  },
  getCurrentUser: () => {
    dispatch(GetUserDetails());
  },
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  getBankList: () => {
    dispatch(getBankListByCountry());
  },
  getMainFiatCurrency:() => {
    dispatch(getFiatCurrencies());
  },
  getMainCryptoCurrency: () => {
    dispatch(getCryptoCurrencies());
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
  getBillPaymentCategory: (data) =>  {
    dispatch(getBillPaymentCategory(data));
  },
  buyAirtime: (billCategory, data) => {
    dispatch(initialBillPaymentByUser(billCategory, data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
