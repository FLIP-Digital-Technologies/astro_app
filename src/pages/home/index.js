import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Drawer, notification, Row, Col, Timeline, Empty } from "antd";
import {
  PlusOutlined,
  // UserSwitchOutlined,
  // ArrowRightOutlined,
  // RightOutlined,
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
  // RightCircleOutlined,
  // LeftCircleOutlined,
  DownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import TimeAgo from 'react-timeago'
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
  getWithdrawalSettings,
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
import capitalizeFirstLetter, {
  CommaFormatted,
  CurrencyFormatted,
  date,
} from "../../utils/helper";
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
  pairTwoPairLoading,
  withdrawalLoading,
  getWithdrawSettings,
  withdrawalSettings,
}) => {
  function getWindowDimensions() {
    const { screen } = window;
    let width = screen.width;
    let height = screen.height;
    return {
      width,
      height,
    };
  }
  const [windowDimensions] = useState(getWindowDimensions());
  const [pinCheck, setPinCheck] = useState(false);
  // const [wallet, setWallet] = useState("NGN");
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
  const [, setHeaderId] = useState("1");
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
            `${
              balance &&
              balance.fiatWallets &&
              balance.fiatWallets[fiatIndex].Currency.code
            } ${CommaFormatted(
              CurrencyFormatted(
                balance &&
                  balance.fiatWallets &&
                  balance.fiatWallets[fiatIndex].balance
              )
            )}`
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
    getWithdrawSettings();
    try {
      const pinCheck = localStorage.getItem("pinCheck");
      setPinCheck(pinCheck);
    } catch (error) {}
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
          duration: 1,
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
        fiatCurrency={fiatCurrency}
        settings={withdrawalSettings}
        balance={balance}
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
      <span className={styles.gitcard__top__title} style={{ marginBottom: 20 }}>
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
          width={windowDimensions.width > 866 ? 350 : 256}
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
          width={windowDimensions.width > 866 ? 350 : 256}
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
          width={windowDimensions.width > 866 ? 350 : 256}
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
          width={windowDimensions.width > 866 ? 350 : 256}
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
      <div className={styles.home}>
        <Row style={{}} gutter={[8, 8]}>
          <Col
            span={17}
            xs={24}
            sm={24}
            md={24}
            lg={17}
            xl={17}
            xxl={17}
            style={{ marginLeft: 15, marginBottom: 28 }}
          >
            {/* <Col span={6} xs={24} sm={12} md={8} lg={8} xl={6} xxl={6}></Col> */}
            {windowDimensions.width > 866 && (
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
                {/* <div
                  className={homeStyles.topbox__inner}
                  onClick={() => history.push("/app/settings")}
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
                  <div className={homeStyles.topbox__info}>Settings</div>
                  <div className={homeStyles.topbox__description}>
                    Go to Settings
                  </div>
                </div> */}
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
            )}
            <Row gutter={[8, 8]} style={{}}>
              <Col
                span={12}
                xs={24}
                sm={24}
                lg={12}
                md={24}
                xxl={12}
                xl={12}
                // style={{ marginRight: 25, marginBottom: 28 }}
              >
                <div className={homeStyles.charts}>
                  <div className={homeStyles.charts__title__container}>
                    <Dropdown
                      trigger={["click", "hover"]}
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
                                fiatIndex < 1
                                  ? "rgb(236, 233, 233)"
                                  : "#921946",
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
                              color:
                                cryptoIndex < 1 ? "rgb(236, 233, 233)" : "",
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
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              // onClick={() => setOpencryptoAddWallet(true)}
                              className={`${homeStyles.balances__btn} ${homeStyles.active}`}
                            >
                              {balance.cryptoWallets &&
                                balance.cryptoWallets[cryptoIndex].Currency
                                  .code}
                            </div>
                            {cryptoIndex + 1 ===
                              balance.cryptoWallets.length && (
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
                            <PlusOutlined />
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
                      onClick={() => {
                        balance && balance.fiatWallets.length > 0
                          ? setShowFund(true)
                          : notification.info({
                              message: "Please wait",
                              duration: 2.5,
                            });
                      }}
                    >
                      {"Deposit Funds"}
                      {/* <DoubleRightOutlined /> */}
                    </div>
                    <div
                      className={homeStyles.extras__text}
                      onClick={() => {
                        user &&
                        user.boarded
                          ? balance && balance.fiatWallets.length > 0
                            ? setOpenWithdrawal(true)
                            : notification.info({
                                message: "Please try again",
                                duration: 2.5,
                              })
                          : notification.info({
                              placement: "bottomLeft",
                              message: "Go to Settings to Set Your Pin",
                              onClick: () => {
                                history.push("/app/settings");
                              },
                              duration: 2,
                            });
                      }}
                    >
                      {"Withdraw Funds"}
                      
                      {/* <DoubleRightOutlined />{" "} */}
                    </div>
                    <div
                      className={homeStyles.extras__text}
                      onClick={() => {
                        balance && balance.fiatWallets.length > 0
                          ? setShowAirtime(true)
                          : notification.info({
                              message: "Please wait",
                              duration: 2.5,
                            });
                      }}
                    >
                      {"Buy Airtime"}
                      {/* <DoubleRightOutlined />{" "} */}
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} lg={12} md={24} xxl={12} xl={12}>
                <Row gutter={[8, 25]}>
                  <Col
                    span={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    md={12}
                    xxl={12}
                    xl={12}
                  >
                    <div
                      className={homeStyles.widgets__inner}
                      onClick={() => history.push("/app/sell-giftcard")}
                    >
                      <div className={homeStyles.widgets__image}>
                        <img
                          src={png.SellGiftCard}
                          className={homeStyles.widgets__images}
                          style={{ marginRight: 5 }}
                          alt="wallet"
                        />
                      </div>
                      <div className={homeStyles.widgets__info}>
                        Sell Gift Cards
                      </div>
                      <div className={homeStyles.widgets__description}>
                        We buy Gift Cards at a good price
                      </div>
                      <div className={homeStyles.widgets__arrow}>
                        <DoubleRightOutlined
                          className={homeStyles.widgets__arrow__inner}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col
                    span={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    md={12}
                    xxl={12}
                    xl={12}
                  >
                    <div
                      className={homeStyles.widgets__inner}
                      onClick={() => history.push("/app/crypto")}
                    >
                      <div className={homeStyles.widgets__image}>
                        <img
                          src={png.SellBitcoin}
                          className={homeStyles.widgets__images}
                          style={{ marginRight: 5 }}
                          alt="wallet"
                        />
                      </div>
                      <div className={homeStyles.widgets__info}>
                        Trade Crypto
                      </div>
                      <div className={homeStyles.widgets__description}>
                        Convert bitcoin to your preferred currency
                      </div>
                      <div className={homeStyles.widgets__arrow}>
                        <DoubleRightOutlined
                          className={homeStyles.widgets__arrow__inner}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[8, 25]}>
                  <Col
                    span={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    md={12}
                    xxl={12}
                    xl={12}
                  >
                    <div
                      className={homeStyles.widgets__inner}
                      onClick={() => {
                        balance && balance.fiatWallets.length > 0
                          ? setShowPTWOP(true)
                          : notification.info({
                              message: "Please wait",
                              duration: 2.5,
                            });
                      }}
                    >
                      <div className={homeStyles.widgets__image}>
                        <img
                          src={png.P2P}
                          className={homeStyles.widgets__images}
                          style={{ marginRight: 5 }}
                          alt="wallet"
                        />
                      </div>
                      <div className={homeStyles.widgets__info}>
                        Astro Send
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
                  <Col
                    span={12}
                    xs={12}
                    sm={12}
                    lg={12}
                    md={12}
                    xxl={12}
                    xl={12}
                  >
                    <div
                      className={homeStyles.widgets__inner}
                      // onClick={() => {
                      //   // balance && balance.cryptoWallets.length > 0
                      //   //   ? setShowPTWOPcrypto(true)
                      //   //   : notification.info({
                      //   //       message: "No crypto wallet",
                      //   //       duration: 2.5,
                      //   //     });
                      // }}
                      onClick={() => history.push("/app/settings")}
                    >
                      <div className={homeStyles.widgets__image}>
                        <img
                          src={png.Settings}
                          className={homeStyles.widgets__images}
                          style={{ marginRight: 5 }}
                          alt="wallet"
                        />
                      </div>
                      <div className={homeStyles.widgets__info}>Settings</div>
                      <div className={homeStyles.widgets__description}>
                        Go to Settings
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
            // span={1}
            span={1}
            xs={0}
            sm={0}
            lg={1}
            md={0}
            xxl={1}
            xl={1}
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
            // span={5}
            span={5}
            xs={24}
            sm={24}
            lg={5}
            md={24}
            xxl={5}
            xl={5}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row style={{ marginBottom: 15 }}>
              <Col>
                <div className={homeStyles.rightbody__headercontainer}>
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
                    {!withdrawalLoading ? (
                      <ReloadOutlined
                        onClick={() =>
                          getWithdrawalTrans({ skip: 0, limit: 4 })
                        }
                      />
                    ) : (
                      <LoadingOutlined />
                    )}
                  </div>
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
                              item.BankAccount.details.currencyId === 1
                                ? `NGN ${item.amount}`
                                : `GHS ${item.amount}`
                            } `}
                            <TimeAgo date={item.created_at} />
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
                <div className={homeStyles.rightbody__headercontainer}>
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
                  <div className={homeStyles.rightbody__headeright}>
                    {!pairTwoPairLoading ? (
                      <ReloadOutlined
                        onClick={() => getP2PTrans({ skip: 0, limit: 4 })}
                      />
                    ) : (
                      <LoadingOutlined />
                    )}
                  </div>
                </div>
                <div>
                  <Timeline mode={"left"}>
                    {pairTwoPairFiatTrans &&
                    pairTwoPairFiatTrans.transactions &&
                    pairTwoPairFiatTrans.transactions.length > 0 ? (
                      pairTwoPairFiatTrans.transactions.map((item) => (
                        <>
                          <Timeline.Item>
                            {` ${item.amount_sent_object.currency} ${
                              item.amount_sent_object.value
                            } sent `}
                            <TimeAgo date={item.created_at} />
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
      </div>

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
  pairTwoPairLoading: state.pairTwoPair.loading,
  withdrawalTrans: state.withdrawals.WithdrawalTransaction,
  withdrawalLoading: state.withdrawals.loading,
  withdrawalSettings: state.withdrawals.settings,
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
  getWithdrawSettings:() => {
    dispatch(getWithdrawalSettings())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
