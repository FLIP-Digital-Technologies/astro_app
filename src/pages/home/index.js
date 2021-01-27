import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import { PlusOutlined, PhoneOutlined } from "@ant-design/icons";
import { DashboardLayout } from "../../components/layout";
import Table from "../../components/table";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { Wave, ArrowRight } from "../../assets/svg";
import { TopUpCard } from "./components";
import styles from "../styles.module.scss";
import Png from "../../assets/png";
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
import { AirtimeFlyout, FundFlyout } from "./components";

const Home = ({
  user,
  balance,
  giftCardTrans,
  btcTrans,
  withdrawalTrans,
  getCurrentUser,
  getUserBankDetails,
  getBankList,
  getBalance,
  getLatestBTCTrans,
  getLatestGiftCardTrans,
  getLatestWithdrawalTrans,
}) => {
  const [wallet, setWallet] = useState("NGN");
  const [renderBalance, setRenderBalance] = useState("0");
  const [showAirtime, setShowAirtime] = useState(false);
  const [showFund, setShowFund] = useState(false);

  const [state, setState] = useState({});

  useEffect(() => {
    if (!balance) return;
    if (!wallet) return;
    setRenderBalance(balance[wallet]?.balance || 0);
  });

  useEffect(() => {
    getCurrentUser();
    getUserBankDetails();
    getBankList();
    getBalance();
    getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 0, limit: 5 });
    getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);
  return (
    <DashboardLayout>
      <span className={styles.gitcard__top__title}>Home </span>
      {showAirtime && (
        <Drawer
          title="Airtime purchase"
          width={400}
          placement="right"
          onClose={() => setShowAirtime(false)}
          visible={showAirtime}
        >
          <AirtimeFlyout state={state} setState={setState} />
        </Drawer>
      )}

      {showFund && (
        <Drawer
          title="Fund wallet"
          placement="right"
          width={400}
          onClose={() => setShowFund(false)}
          visible={showFund}
        >
          <FundFlyout state={state} setState={setState} />
        </Drawer>
      )}
      <div className={styles.home}>
        <div className={styles.home__welcome}>
          {/* <div className={styles.home__welcome__top}>
            <Wave />
            <span>Hi {`${user && user.firstName}`}</span>
          </div> */}
          {/* <div className={styles.home__welcome__sub}>
            Keep track of your activity and transacations,here
          </div> */}
          <div className={styles.home__top}>
            <div className={styles.balances}>
              <span className={styles.balances__title}>Wallet Balance</span>
              <div className={styles.balances__value}>
                {wallet !== "BTC" && <span>{wallet}</span>}{" "}
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
                  <PlusOutlined />
                </div>
              </div>
              <span className={styles.fund__text}>Fu-nd Wallet</span>
            </div>
          </div>
          <div className={styles.quick}>
            <div className={styles.quick__holder}>
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
              <div
                onClick={() => setShowAirtime(true)}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <PhoneOutlined rotate={90} />
                </div>
                <span>Buy Airtime</span>
              </div>
              <div
                onClick={() => history.push("/app/bills")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <img src="https://via.placeholder.com/20.png" alt="bill" />
                </div>
                <span>Pay a Bill</span>
              </div>
            </div>
          </div>

          <div className={styles.transactionHistory}>
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
          </div>
          {/* <div className={styles.home__welcome__details}>
            <TopUpCard
              curr="Naira"
              currency="NGN"
              topUpAction={() => history.push("/app/wallet/naira")}
              bal={balance && balance.NGN && balance.NGN.balance}
            />
            <TopUpCard
              curr="BTC"
              currency="BTC"
              topUpAction={() => history.push("/app/wallet/btc")}
              bal={balance && balance.BTC && balance.BTC.balance}
            />
            <ActivityChart />
          </div> */}

          {/* <div className={styles.quickAction}>
            <h2 className={styles.quickAction__title}>Quick Actions</h2>
            <div className={styles.quickAction__list}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/app/giftcard")}
                className={styles.card}
              >
                <div className={styles.card__image__holder}>
                  <img
                    src={Png.Amazon}
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <div className={styles.card__footer}>
                  <span>Trade giftcards</span> <ArrowRight />
                </div>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/app/coin/buy")}
                className={styles.card}
              >
                <div className={styles.card__image__holder}>
                  <img
                    src={Png.Bitcoin}
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>
                <div className={styles.card__footer}>
                  <span>Buy Coins</span> <ArrowRight />
                </div>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/app/coin/sell")}
                className={styles.card}
              >
                <div className={styles.card__image__holder}>
                  <img
                    src={Png.Bitcoin}
                    alt="amazon"
                    className={styles.card__image}
                  />
                </div>

                <div className={styles.card__footer}>
                  <span>Sell Coins</span> <ArrowRight />
                </div>
              </div>
            
            </div>
          </div> */}

          {/* <div>
            <Table
              type={"BTC"}
              keys={["createdAt", "amount", "transactionType", "status"]}
              data={btcTrans && btcTrans.transactions}
              onClickActionEmpty={() => history.push("/app/wallet/btc")}
            />
          </div>
          <div>
            <Table
              type={"GiftCard"}
              keys={["createdAt", "amount", "cardCode", "status"]}
              data={giftCardTrans && giftCardTrans.transactions}
              onClickActionEmpty={() => history.push("/app/wallet/naira")}
            />
          </div>
          <div>
            <Table
              type={"Withdrawal"}
              keys={["createdAt", "amount", "bankAccount", "status"]}
              data={withdrawalTrans && withdrawalTrans.transactions}
              action={false}
            />
          </div> */}
        </div>
        {/* quick action */}
        {/* recent transaction */}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
