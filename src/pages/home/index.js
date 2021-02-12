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
  getUserDetailsById,
} from "../../redux/actions/user";
import { getBankListByCountry } from "../../redux/actions/bank";
import { getLastUserWithdrawalDetails } from "../../redux/actions/withdrawals";
import PTwoPFlyout, { AirtimeFlyout, FundFlyout, } from "./components";
import { initialPaymentByUser } from "../../redux/actions/payment";
import ModalWrapper from "../../components/Modals";
import { getBillPaymentCategory, initialBillPaymentByUser } from "../../redux/actions/billPayment";
import { Money } from "../../utils/helper";

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
  depositMoneyDetails
}) => {
  const [wallet, setWallet] = useState("NGN");
  const [renderBalance, setRenderBalance] = useState("0");
  const [showAirtime, setShowAirtime] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const [showPTWOP, setShowPTWOP] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [dataPair, setDataPair] = useState({});
  const [state, setState] = useState({});
  const [AirtimeState, setAirtimeState] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!balance) return;
    if (!wallet) return;
    setRenderBalance(wallet !== "BTC" ? Money(balance[wallet]?.balance, wallet) : balance[wallet]?.balance || 0);
  });

  useEffect(() => {
    getCurrentUser();
    getUserBankDetails();
    getBalance();
    getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 0, limit: 5 });
    getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);
  return (
    <DashboardLayout>
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
          ></iframe>
        </ModalWrapper>
      )}
      <span className={styles.gitcard__top__title}>Home </span>
      {showAirtime && (
        <Drawer
          title="Airtime purchase"
          width={400}
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
          width={400}
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
          width={400}
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
            <div onClick={() => setShowPTWOP(true)} className={styles.fund}>
              <div className={styles.fund__image}>
                <div>
                  <UserSwitchOutlined style={{fontSize: 23}} />
                </div>
              </div>
              <span className={styles.fund__text}>P2P Trade</span>
            </div>
          </div>
          <div className={styles.quick}>
            <div className={styles.quick__holder} style={{flexWrap: "wrap"}}>
              <div className={styles.quick__trade}>
                <div className={styles.quick__trade__image}>
                  <img
                    src="https://via.placeholder.com/60.png"
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <span className={styles.quick__trade__text}>Withdrawal</span>
                <div
                  onClick={() => history.push("/app/giftcard")}
                  className={styles.quick__trade__btn}
                >
                  Cash Out
                </div>
              </div>
              <div className={styles.quick__trade}>
                <div className={styles.quick__trade__image}>
                  <img
                    src="https://via.placeholder.com/60.png"
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <span className={styles.quick__trade__text}>GiftCard</span>
                <div
                  onClick={() => history.push("/app/giftcard")}
                  className={styles.quick__trade__btn}
                >
                  Trade
                </div>
              </div>
              <div className={styles.quick__trade}>
                <div className={styles.quick__trade__image}>
                  <img
                    src="https://via.placeholder.com/60.png"
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <span className={styles.quick__trade__text}>Bitcoin</span>
                <div
                  onClick={() => history.push("/app/btc")}
                  className={styles.quick__trade__btn}
                >
                  Trade
                </div>
              </div>
            </div>
            <div className={styles.quick__holder}>
              <div className={styles.quick__trade}>
                <div className={styles.quick__trade__image}>
                  <img
                    src="https://via.placeholder.com/60.png"
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <span className={styles.quick__trade__text}>Buy Airtime</span>
                <div
                  onClick={() => setShowAirtime(true)}
                  className={styles.quick__trade__btn}
                >
                  Buy
                </div>
              </div>
              <div className={styles.quick__trade}>
                <div className={styles.quick__trade__image}>
                  <img
                    src="https://via.placeholder.com/60.png"
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <span className={styles.quick__trade__text}>Pay a Bill</span>
                <div
                  onClick={() => history.push("/app/bills")}
                  className={styles.quick__trade__btn}
                >
                  Pay
                </div>
              </div>
            </div>
          </div>

          {/* <div className={styles.transactionHistory}>
            <span className={styles.transactionHistory__title}>
              Transactions History
            </span>
            <div className={styles.transactionHistory__content}>
              <div className={styles.transactionHistory__content__column}>
                <div className={styles.transactionHistory__item}>
                  <div className={styles.transactionHistory__item__image}>
                    <img src="https://via.placeholder.com/20.png" alt="bill" />
                  </div>
                  <div className={styles.transactionHistory__item__text}>
                    <span
                      className={styles.transactionHistory__item__text__mian}
                    >
                      iTunes
                    </span>
                    <span
                      className={styles.transactionHistory__item__text__sub}
                    >
                      01/09/2020
                    </span>
                  </div>
                  <div
                    className={styles.transactionHistory__item__separator}
                  ></div>
                  <div className={styles.transactionHistory__item__amount}>
                    $250.00
                  </div>
                </div>
                <div className={styles.transactionHistory__item}>
                  <div className={styles.transactionHistory__item__image}>
                    <img src="https://via.placeholder.com/20.png" alt="bill" />
                  </div>
                  <div className={styles.transactionHistory__item__text}>
                    <span
                      className={styles.transactionHistory__item__text__mian}
                    >
                      iTunes
                    </span>
                    <span
                      className={styles.transactionHistory__item__text__sub}
                    >
                      01/09/2020
                    </span>
                  </div>
                  <div
                    className={styles.transactionHistory__item__separator}
                  ></div>
                  <div className={styles.transactionHistory__item__amount}>
                    $250.00
                  </div>
                </div>
                <div className={styles.transactionHistory__item}>
                  <div className={styles.transactionHistory__item__image}>
                    <img src="https://via.placeholder.com/20.png" alt="bill" />
                  </div>
                  <div className={styles.transactionHistory__item__text}>
                    <span
                      className={styles.transactionHistory__item__text__mian}
                    >
                      iTunes
                    </span>
                    <span
                      className={styles.transactionHistory__item__text__sub}
                    >
                      01/09/2020
                    </span>
                  </div>
                  <div
                    className={styles.transactionHistory__item__separator}
                  ></div>
                  <div className={styles.transactionHistory__item__amount}>
                    $250.00
                  </div>
                </div>
                <div className={styles.transactionHistory__item}>
                  <div className={styles.transactionHistory__item__image}>
                    <img src="https://via.placeholder.com/20.png" alt="bill" />
                  </div>
                  <div className={styles.transactionHistory__item__text}>
                    <span
                      className={styles.transactionHistory__item__text__mian}
                    >
                      iTunes
                    </span>
                    <span
                      className={styles.transactionHistory__item__text__sub}
                    >
                      01/09/2020
                    </span>
                  </div>
                  <div
                    className={styles.transactionHistory__item__separator}
                  ></div>
                  <div className={styles.transactionHistory__item__amount}>
                    $250.00
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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
  getBillPaymentCategory: (data) =>  {
    dispatch(getBillPaymentCategory(data));
  },
  buyAirtime: (billCategory, data) => {
    dispatch(initialBillPaymentByUser(billCategory, data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
