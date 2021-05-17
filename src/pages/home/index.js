import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Drawer, notification, Row, Col, Timeline, Empty } from "antd";
import {
  PlusOutlined,
  UserSwitchOutlined,
  ArrowRightOutlined,
  RightOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";
import homeStyles from "./styles.module.scss";
import png from "../../assets/png";
import { history } from "../../redux/store";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  DownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import {
  getBTCWalletDetails,
  getLastBTCTransactionHistory,
} from "../../redux/actions/btc";
import { getLastGiftCardTransactionHistory } from "../../redux/actions/giftCard";
import { getUserBankAccount } from "../../redux/actions/user";
import { getBankListByCountry } from "../../redux/actions/bank";
import {
  getAllUserWithdrawalDetails,
  getLastUserWithdrawalDetails,
} from "../../redux/actions/withdrawals";
import PTwoPFlyout, { AirtimeFlyout, FundFlyout } from "./components";
import PTwoPCrypto from "./components2";
import { initialPaymentByUser } from "../../redux/actions/payment";
import ModalWrapper from "../../components/Modals";
import WithdrawInitial from "../../components/Modals/withdraw-modal-Initial";
import {
  getBillPaymentCategory,
  initialBillPaymentByUser,
} from "../../redux/actions/billPayment";
import capitalizeFirstLetter, { date, Money } from "../../utils/helper";
import {
  createFiatWallet,
  getCryptoCurrencies,
  getFiatCurrencies,
  GetUserDetails,
} from "../../redux/actions/Auths";
import AddWallet from "../../components/Modals/addWalletModal";
import AddCryptoWallet from "../../components/Modals/addCryptoWallet";
import * as actionTypes from "../../redux/constants";
import { getAllUserFiatP2PTransferDetails } from "../../redux/actions/pairTwoPair";

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
  // getLatestBTCTrans,
  getLatestGiftCardTrans,
  // getLatestWithdrawalTrans,
  Fund,
  loading,
  depositMoney,
  depositMoneyDetails,
  getMainCryptoCurrency,
  getMainFiatCurrency,
  createWallets,
  fiatCurrency,
  cryptoCurrency,
  btcTicker,
  userLoading,
  balanceLoading,
  getWithdrawalTrans,
  getP2PTrans,
  withdrawalTrans,
  pairTwoPairFiatTrans,
}) => {
  const [wallet, setWallet] = useState("NGN");
  let [fiatIndex, setFiatIndex] = useState(0);
  let [cryptoIndex, setCryptoIndex] = useState(0);
  const [renderBalance, setRenderBalance] = useState("0");
  const [renderCryptoBalance, setRenderCryptoBalance] = useState("0");
  const [showAirtime, setShowAirtime] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const [showPTWOP, setShowPTWOP] = useState(false);
  const [showPTWOPcrypto, setShowPTWOPcrypto] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const [currencyHeader, setCurrencyHeader] = useState("Fiat Wallet Balance");
  const [headerId, setHeaderId] = useState("1");
  const [visible, setVisible] = useState(false);
  const [openAddWallet, setOpenAddWallet] = useState(false);
  const [opencryptoAddWallet, setOpencryptoAddWallet] = useState(false);

  const [dataPair, setDataPair] = useState({});
  const [state, setState] = useState({});
  const [AirtimeState, setAirtimeState] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!balance) return;
    // if (!wallet) return;

    if (!balance) {
      return;
    } else {
      if (balance.fiatWallets.length === 0) {
        setRenderBalance(0);
      } else {
        balance &&
          balance.fiatWallets &&
          setRenderBalance(
            Money(
              balance &&
                balance.fiatWallets &&
                balance.fiatWallets[fiatIndex].balance,
              balance &&
                balance.fiatWallets &&
                balance.fiatWallets[fiatIndex].Currency.code
            )
          );
      }
    }
  }, [balance, fiatIndex]);

  useEffect(() => {
    if (!balance) return;
    // if (!wallet) return;
    if (!balance) {
      return;
    } else {
      if (balance.cryptoWallets.length === 0) {
        setRenderCryptoBalance(0);
      } else {
        balance &&
          balance.cryptoWallets &&
          setRenderCryptoBalance(
            balance &&
              balance.cryptoWallets &&
              balance.cryptoWallets[cryptoIndex] &&
              balance.cryptoWallets[cryptoIndex].balance
          );
      }
    }
  }, [balance, cryptoIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getBalance();
  }, [createWallets, getBalance]);

  useEffect(() => {
    getBalance();
    getCurrentUser();
    getUserBankDetails();
    getMainCryptoCurrency();
    getMainFiatCurrency();
    getWithdrawalTrans({ skip: 0, limit: 4 });
    getP2PTrans({ skip: 0, limit: 4 });
    // getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 1, limit: 5 });
    // getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      setHeaderId(e.key);
      setCurrencyHeader("Crypto Wallet Balance");
      setVisible(false);
    } else if (e.key === "1") {
      setHeaderId(e.key);
      setCurrencyHeader("Fiat Wallet Balance");
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const HandleSuccess = () => {
    getBalance();
    setOpenModal(false);
    setShowFund(false);
  };

  const CompletionHandler = async (event) => {
    const key = actionTypes.KEY;
    const message = event.data;
    if (message.type === "payment_ack") {
      if (message.status === "successful") {
        await HandleSuccess();
        setOpenModal(false);
        notification.success({
          message: "Payment Successful",
          duration: 0,
          key,
        });
      } else {
        setOpenModal(false);
        notification.error({
          message: "Payment Failed",
          duration: 0,
          key,
        });
      }

      window.removeEventListener("message", CompletionHandler);
    } else {
      // console.log('mat')
    }
  };

  const menu = () => {
    return (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Fiat Wallet Balance</Menu.Item>
        <Menu.Item key="2">Crypto Wallet Balance</Menu.Item>
      </Menu>
    );
  };

  return (
    <DashboardLayout>
      <WithdrawInitial
        setIsModalVisible={setOpenWithdrawal}
        isModalVisible={openWithdrawal}
      />

      <AddWallet
        setIsModalVisible={setOpenAddWallet}
        isModalVisible={openAddWallet}
        wallets={fiatCurrency}
      />
      <AddCryptoWallet
        setIsModalVisible={setOpencryptoAddWallet}
        isModalVisible={opencryptoAddWallet}
        wallets={cryptoCurrency}
      />
      {openModal &&
        depositMoneyDetails &&
        window.addEventListener("message", CompletionHandler)}
      {openModal && depositMoneyDetails && (
        <ModalWrapper
          className={styles.scanSell__body}
          style={{ height: 800, width: 300 }}
          isModalVisible={depositMoney ? openModal : false}
          setIsModalVisible={() => {
            setOpenModal(false);
            setShowFund(false);

            setState({});
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
            src={depositMoneyDetails && depositMoneyDetails.link}
            // src={"https://www.w3schools.com"}
          ></iframe>
        </ModalWrapper>
      )}
      <span className={styles.gitcard__top__title}>
        {" "}
        {(user &&
          user.username &&
          ` Hi ${capitalizeFirstLetter(user.username)}`) ||
          "Hello"}
        ,{" "}
      </span>
      {showAirtime && (
        <Drawer
          title="Airtime purchase"
          width={350}
          placement="right"
          onClose={() => {
            setShowAirtime(false);
            setAirtimeState({});
          }}
          visible={showAirtime}
        >
          <AirtimeFlyout
            BillPaymentCategory={BillPaymentCategory}
            buyAirtime={buyAirtime}
            loading={billLoading}
            getBillPaymentCategory={getBillPaymentCategory}
            state={AirtimeState}
            setState={setAirtimeState}
            fiatCurrency={balance.fiatWallets}
          />
        </Drawer>
      )}

      {showPTWOP && (
        <Drawer
          title="Pair 2 Pair (p2p) Transfer"
          placement="right"
          width={350}
          onClose={() => {
            setShowPTWOP(false);
            setDataPair({});
          }}
          visible={showPTWOP}
        >
          <PTwoPFlyout
            setOpenModal={setShowPTWOP}
            balance={balance}
            state={dataPair}
            setState={setDataPair}
            fiatCurrency={fiatCurrency}
          />
        </Drawer>
      )}
      {showPTWOPcrypto && (
        <Drawer
          title="Pair 2 Pair (p2p) Crypto Transfer"
          placement="right"
          width={350}
          onClose={() => {
            setShowPTWOPcrypto(false);
            setDataPair({});
          }}
          visible={showPTWOPcrypto}
        >
          <PTwoPCrypto
            setOpenModal={setShowPTWOPcrypto}
            balance={balance}
            state={dataPair}
            setState={setDataPair}
            fiatCurrency={cryptoCurrency}
          />
        </Drawer>
      )}
      {showFund && (
        <Drawer
          title="Fund wallet"
          placement="right"
          width={350}
          onClose={() => {
            setShowFund(false);
            setState({});
          }}
          visible={showFund}
        >
          <FundFlyout
            state={state}
            setState={setState}
            Fund={Fund}
            loading={loading}
            setOpenModal={setOpenModal}
            fiatCurrency={balance.fiatWallets}
          />
        </Drawer>
      )}
      <Row>
        <Col
          span={17}
          md={24}
          xs={24}
          xl={17}
          xxl={17}
          lg={17}
          style={{ marginLeft: 15, marginBottom: 28 }}
        >
          <div className={homeStyles.topbox}>
            <div
              className={homeStyles.topbox__inner}
              onClick={() => history.push("/app/crypto")}
            >
              <div className={homeStyles.topbox__topic}>
                <img
                  src={png.QuickAction}
                  height="24"
                  width="24"
                  style={{ marginRight: 5 }}
                  alt="wallet"
                />
                Quick Action
              </div>
              <div className={homeStyles.topbox__info}>Crypto</div>
              <div className={homeStyles.topbox__description}>
                Manage your crypto wallets
              </div>
            </div>
            <div
              className={homeStyles.topbox__inner}
              onClick={() => history.push("/app/bills")}
            >
              <div className={homeStyles.topbox__topic}>
                <img
                  src={png.QuickAction}
                  height="24"
                  width="24"
                  style={{ marginRight: 5 }}
                  alt="wallet"
                />
                Quick Action
              </div>
              <div className={homeStyles.topbox__info}>Bills</div>
              <div className={homeStyles.topbox__description}>
                Handle Your Bills
              </div>
            </div>
            <div className={homeStyles.topbox__inner}>
              <div className={homeStyles.topbox__topic}>
                <img
                  src={png.Referrals}
                  height="24"
                  width="24"
                  style={{ marginRight: 5 }}
                  alt="wallet"
                />
                Referrals
              </div>
              <div className={homeStyles.topbox__info}>0</div>
              <div className={homeStyles.topbox__description}>
                Invite your guys
              </div>
            </div>
          </div>
          <Row>
            <Col style={{ marginRight: 25, marginBottom: 28 }}>
              <div className={homeStyles.charts}>
                {/* <div className={homeStyles.charts__title}> */}
                <div className={homeStyles.charts__title__container}>
                  <Dropdown
                    trigger={["hover"]}
                    overlay={menu}
                    onVisibleChange={handleVisibleChange}
                    visible={visible}
                  >
                    <span
                      className={homeStyles.charts__title__text}
                      style={{ cursor: "pointer" }}
                      // onClick={(e) => e.preventDefault()}
                    >
                      {currencyHeader} {"  "}
                      <DownOutlined />
                    </span>
                  </Dropdown>
                  {!balanceLoading ? (
                    <ReloadOutlined
                      className={homeStyles.charts__title__text}
                      onClick={() => getBalance()}
                    />
                  ) : (
                    <LoadingOutlined
                      className={homeStyles.charts__title__text}
                    />
                  )}
                </div>
                {balance ? (
                  currencyHeader === "Fiat Wallet Balance" ? (
                    balance &&
                    balance.fiatWallets &&
                    balance.fiatWallets.length > 0 ? (
                      <div className={homeStyles.balances__value}>
                        <span>{renderBalance}</span>{" "}
                      </div>
                    ) : (
                      <div className={homeStyles.balances__value}>
                        <span>{"Add Wallet"}</span>{" "}
                      </div>
                    )
                  ) : balance &&
                    balance.cryptoWallets &&
                    balance.cryptoWallets.length > 0 ? (
                    <div className={homeStyles.balances__value}>
                      <span>
                        {balance &&
                          balance.cryptoWallets &&
                          balance.cryptoWallets[cryptoIndex].Currency.code}
                        {"    "}
                      </span>
                      <span>{renderCryptoBalance}</span>{" "}
                    </div>
                  ) : (
                    <div className={homeStyles.balances__value}>
                      <span>{"Add Wallet"}</span>{" "}
                    </div>
                  )
                ) : (
                  <div className={homeStyles.balances__value}>
                    <span>{"Please Wait"}</span>{" "}
                  </div>
                )}

                <div className={homeStyles.balancefooter}>
                  {/* left side */}
                  <div>
                    {currencyHeader === "Fiat Wallet Balance" ? (
                      <div
                        className={styles.balances__ta}
                        onClick={() => {
                          if (fiatIndex < 1) {
                            return;
                          } else {
                            setFiatIndex(--fiatIndex);
                          }
                        }}
                      >
                        <DoubleLeftOutlined
                          style={{
                            fontSize: 24,
                            color:
                              fiatIndex < 1 ? "rgb(236, 233, 233)" : "#921946",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.balances__ta}
                        onClick={() => {
                          if (cryptoIndex < 1) {
                            return;
                          } else {
                            setCryptoIndex(--cryptoIndex);
                          }
                        }}
                      >
                        <DoubleLeftOutlined
                          style={{
                            fontSize: 24,
                            color: cryptoIndex < 1 ? "rgb(236, 233, 233)" : "",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* end of left side */}
                  <div>
                    {balance ? (
                      currencyHeader === "Fiat Wallet Balance" ? (
                        balance && balance.fiatWallets.length > 0 ? (
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              // onClick={() => setOpencryptoAddWallet(true)}
                              className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                            >
                              {balance.fiatWallets &&
                                balance.fiatWallets[fiatIndex].Currency.code}
                            </div>
                            {fiatIndex + 1 === balance.fiatWallets.length && (
                              <>
                                <div
                                  onClick={() => setOpenAddWallet(true)}
                                  className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                                >
                                  <PlusOutlined />
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div
                            onClick={() => setOpenAddWallet(true)}
                            className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                          >
                            <PlusOutlined />
                          </div>
                        )
                      ) : balance && balance.cryptoWallets.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            // onClick={() => setOpencryptoAddWallet(true)}
                            className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                          >
                            {balance.cryptoWallets &&
                              balance.cryptoWallets[cryptoIndex].Currency.code}
                          </div>
                          {cryptoIndex + 1 === balance.cryptoWallets.length && (
                            <>
                              <div
                                onClick={() => setOpencryptoAddWallet(true)}
                                className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                              >
                                <PlusOutlined />
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => setOpencryptoAddWallet(true)}
                          className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                        >
                          <PlusOutlined
                          />
                        </div>
                      )
                    ) : (
                      <div className={styles.balances__btn__holder}>
                        <LoadingOutlined style={{ fontSize: 40 }} />
                      </div>
                    )}
                  </div>
                  {/* right side */}
                  <div>
                    {currencyHeader === "Fiat Wallet Balance" ? (
                      <div
                        className={styles.balances__ta}
                        onClick={() => {
                          if (balance.fiatWallets.length === 0) {
                            return;
                          }
                          if (fiatIndex + 1 === balance.fiatWallets.length) {
                            return;
                          } else {
                            setFiatIndex(++fiatIndex);
                          }
                        }}
                      >
                        <DoubleRightOutlined
                          style={{
                            fontSize: 24,
                            color: balance
                              ? balance.fiatWallets &&
                                balance.fiatWallets.length === 0
                                ? "rgb(236, 233, 233)"
                                : fiatIndex + 1 === balance.fiatWallets.length
                                ? "rgb(236, 233, 233)"
                                : "#921946"
                              : "",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.balances__ta}
                        onClick={() => {
                          if (balance.cryptoWallets.length === 0) {
                            return;
                          }
                          if (
                            cryptoIndex + 1 ===
                            balance.cryptoWallets.length
                          ) {
                            return;
                          } else {
                            setCryptoIndex(++cryptoIndex);
                          }
                        }}
                      >
                        <DoubleRightOutlined
                          style={{
                            fontSize: 24,
                            color: balance
                              ? balance.cryptoWallets &&
                                balance.cryptoWallets.length === 0
                                ? "rgb(236, 233, 233)"
                                : cryptoIndex + 1 ===
                                  balance.cryptoWallets.length
                                ? "rgb(236, 233, 233)"
                                : "#921946"
                              : "",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* end of right side */}
                </div>
                <div className={homeStyles.extras}>
                  <div
                    className={homeStyles.extras__text}
                    onClick={() => history.push("/app/sell-giftcard")}
                  >
                    {"Sell Gift Cards"} <DoubleRightOutlined />
                  </div>
                  <div
                    className={homeStyles.extras__text}
                    onClick={() => history.push("/app/buy-giftcard")}
                  >
                    {"Buy Gift Cards"} <DoubleRightOutlined />
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <Row style={{ marginBottom: 25 }}>
                <Col>
                  <div
                    className={homeStyles.widgets__inner}
                    onClick={() => {
                      userLoading
                        ? notification.info({
                            message: "Please wait",
                          })
                        : setShowFund(true);
                    }}
                  >
                    <div className={homeStyles.widgets__image}>
                      <img
                        src={png.Fund}
                        height="40"
                        width="40"
                        style={{ marginRight: 5 }}
                        alt="wallet"
                      />
                    </div>
                    <div className={homeStyles.widgets__info}>Fund Wallet</div>
                    <div className={homeStyles.widgets__description}>
                      Fund your Astro Fiat Wallets
                    </div>
                    <div className={homeStyles.widgets__arrow}>
                      <DoubleRightOutlined
                        className={homeStyles.widgets__arrow__inner}
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className={homeStyles.widgets__inner}
                    onClick={() => {
                      userLoading
                        ? notification.info({
                            message: "Please wait",
                          })
                        : setOpenWithdrawal(true);
                    }}
                  >
                    <div className={homeStyles.widgets__image}>
                      <img
                        src={png.Withdrawal}
                        height="40"
                        width="40"
                        style={{ marginRight: 5 }}
                        alt="wallet"
                      />
                    </div>
                    <div className={homeStyles.widgets__info}>Withdrawal</div>
                    <div className={homeStyles.widgets__description}>
                      Transfer to your bank accounts
                    </div>
                    <div className={homeStyles.widgets__arrow}>
                      <DoubleRightOutlined
                        className={homeStyles.widgets__arrow__inner}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    className={homeStyles.widgets__inner}
                    onClick={() => {
                      userLoading
                        ? notification.info({
                            message: "Please wait",
                          })
                        : setShowPTWOP(true);
                    }}
                  >
                    <div className={homeStyles.widgets__image}>
                      <img
                        src={png.P2P}
                        height="40"
                        width="40"
                        style={{ marginRight: 5 }}
                        alt="wallet"
                      />
                    </div>
                    <div className={homeStyles.widgets__info}>
                      Astro Transfer
                    </div>
                    <div className={homeStyles.widgets__description}>
                      Send Money to another Astro user
                    </div>
                    <div className={homeStyles.widgets__arrow}>
                      <DoubleRightOutlined
                        className={homeStyles.widgets__arrow__inner}
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className={homeStyles.widgets__inner}
                    onClick={() => {
                      userLoading
                        ? notification.info({
                            message: "Please wait",
                          })
                        : setShowPTWOPcrypto(true);
                    }}
                  >
                    <div className={homeStyles.widgets__image}>
                      <img
                        src={png.CryptoPeer}
                        height="40"
                        width="40"
                        style={{ marginRight: 5 }}
                        alt="wallet"
                      />
                    </div>
                    <div className={homeStyles.widgets__info}>
                      Crypto Transfer
                    </div>
                    <div className={homeStyles.widgets__description}>
                      Send crypto to another Astro user
                    </div>
                    <div className={homeStyles.widgets__arrow}>
                      <DoubleRightOutlined
                        className={homeStyles.widgets__arrow__inner}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          span={1}
          style={{
            // border: 3,
            paddingLeft: 2,
            // backgroundColor: "white",
            borderColor: "green",
            // borderRadius: 10,
            borderWidth: 2,
            borderRightWidth: 1,
          }}
        >
          <div className={homeStyles.divider} />
        </Col>
        <div
          style={{ borderLeftWidth: 4, borderWidth: 5, borderColor: "black" }}
        />
        <Col
          span={5}
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row style={{marginBottom:15}}>
            <Col>
              <div className={homeStyles.rightbody__header}>
                <img
                  src={png.Withdrawal}
                  height="30"
                  width="30"
                  style={{ marginRight: 5 }}
                  alt="wallet"
                />
                Recent Withdrawals
              </div>
              <div>
                <Timeline mode={"left"}>
                  {withdrawalTrans &&
                  withdrawalTrans.transactions &&
                  withdrawalTrans.transactions.length > 0 ? (
                    withdrawalTrans.transactions.map((item) => (
                      <>
                        <Timeline.Item>
                          {`${
                            item.bank_account.details.currencyId === 1
                              ? Money(item.amount, "NGN")
                              : Money(item.amount, "GHS")
                          } ${date(item.created_at)}`}
                        </Timeline.Item>
                      </>
                    ))
                  ) : (
                    <Empty description={<span>No recent Withdrawal</span>} />
                  )}
                </Timeline>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={homeStyles.rightbody__header}>
                <img
                  src={png.P2P}
                  height="30"
                  width="30"
                  style={{ marginRight: 5 }}
                  alt="wallet"
                />
                Recent Astro Transfers
              </div>
              <div>
                <Timeline mode={"left"}>
                  {pairTwoPairFiatTrans &&
                  pairTwoPairFiatTrans.transactions &&
                  pairTwoPairFiatTrans.transactions.length > 0 ? (
                    pairTwoPairFiatTrans.transactions.map((item) => (
                      <>
                        <Timeline.Item>
                          {`${Money(
                            item.amount_sent_object.value,
                            item.amount_sent_object.currency
                          )} sent by ${date(item.created_at)}`}
                        </Timeline.Item>
                      </>
                    ))
                  ) : (
                    <Empty
                      description={<span>No recent Astro Transfer</span>}
                    />
                  )}
                </Timeline>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {console.log("withdraw", pairTwoPairFiatTrans)}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  userLoading: state.user.loading,
  balance: state.btc.balance,
  balanceLoading: state.btc.loading,
  createWallets: state.user.createWallet,
  fiatCurrency: state.user.fiatCurrency,
  cryptoCurrency: state.user.cryptoCurrency,
  btcTrans: state.btc.latestBTCTransaction,
  giftCardTrans: state.giftCard.latestGiftCardTransaction,
  loading: state.payment.loading,
  depositMoney: state.payment.depositMoney,
  depositMoneyDetails: state.payment.depositMoneyDetails,
  BillPaymentCategory: state.billPayment.BillPaymentCategory,
  billLoading: state.billPayment.loading,
  btcTicker: state.btc.btcTicker,
  pairTwoPairFiatTrans: state.pairTwoPair.pairTwoPairFiatTransaction,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
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
  getMainFiatCurrency: () => {
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
  getBillPaymentCategory: (data) => {
    dispatch(getBillPaymentCategory(data));
  },
  buyAirtime: (billCategory, data) => {
    dispatch(initialBillPaymentByUser(billCategory, data));
  },
  createWallet: (data) => {
    dispatch(createFiatWallet(data));
  },
  getWithdrawalTrans: (data) => {
    dispatch(getAllUserWithdrawalDetails(data));
  },
  getP2PTrans: (data) => {
    dispatch(getAllUserFiatP2PTransferDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
