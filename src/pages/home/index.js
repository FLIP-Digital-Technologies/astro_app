import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Drawer, notification } from "antd";
import { PlusOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";
import { history } from "../../redux/store";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import {
  getBTCWalletDetails,
  getLastBTCTransactionHistory,
} from "../../redux/actions/btc";
import { getLastGiftCardTransactionHistory } from "../../redux/actions/giftCard";
import { getUserBankAccount } from "../../redux/actions/user";
import { getBankListByCountry } from "../../redux/actions/bank";
import { getLastUserWithdrawalDetails } from "../../redux/actions/withdrawals";
import PTwoPFlyout, { AirtimeFlyout, FundFlyout } from "./components";
import PTwoPCrypto from "./components2";
import { initialPaymentByUser } from "../../redux/actions/payment";
import ModalWrapper from "../../components/Modals";
import WithdrawInitial from "../../components/Modals/withdraw-modal-Initial";
import {
  getBillPaymentCategory,
  initialBillPaymentByUser,
} from "../../redux/actions/billPayment";
import { Money } from "../../utils/helper";
import {
  createFiatWallet,
  getCryptoCurrencies,
  getFiatCurrencies,
  GetUserDetails,
} from "../../redux/actions/Auths";
import AddWallet from "../../components/Modals/addWalletModal";
import AddCryptoWallet from "../../components/Modals/addCryptoWallet";
import * as actionTypes from "../../redux/constants"


const Home = ({
  // user,
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
  const [openAddWallet, setOpenAddWallet] = useState(false)
  const [opencryptoAddWallet, setOpencryptoAddWallet] = useState(false)

  const [dataPair, setDataPair] = useState({});
  const [state, setState] = useState({});
  const [AirtimeState, setAirtimeState] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!balance) return;
    // if (!wallet) return;
    console.log("currency");
    if (!balance) {
      return
    } else {
      console.log('balance', balance)
      if (balance.fiatWallets.length === 0) {
        setRenderBalance(0)
      } else {
        
        balance && balance.fiatWallets &&
        setRenderBalance(
          Money(
            balance &&
              balance.fiatWallets &&
              balance.fiatWallets[fiatIndex].balance,
            balance &&
              balance.fiatWallets &&
              balance.fiatWallets[fiatIndex].Currency.code
          )
        )
      }
       
    }
    
  }, [balance, fiatIndex]);

  useEffect(() => {
    if (!balance) return;
    // if (!wallet) return;
    if (!balance) {
      return
    } else {
      if (balance.cryptoWallets.length === 0) {
        setRenderCryptoBalance(0)
      } else {
        balance && balance.cryptoWallets &&
        setRenderCryptoBalance(
          balance &&
              balance.cryptoWallets &&
              balance.cryptoWallets[cryptoIndex] &&
              balance.cryptoWallets[cryptoIndex].balance
          // Money(
          //   balance &&
          //     balance.cryptoWallets &&
          //     balance.cryptoWallets[cryptoIndex] &&
          //     balance.cryptoWallets[cryptoIndex].balance,
          //   balance &&
          //     balance.cryptoWallets &&
          //     balance.cryptoWallets[cryptoIndex] &&
          //     balance.cryptoWallets[cryptoIndex].Currency.code
          // )
        );  
      }
      
    }
    console.log("currency");
    
  }, [balance, cryptoIndex]);

 // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getBalance();
  }, [createWallets, getBalance])

  useEffect(() => {
    getBalance();
    
    getCurrentUser();
    getUserBankDetails();
    
    getMainCryptoCurrency();
    getMainFiatCurrency();
    // getLatestBTCTrans({ skip: 0, limit: 5 });
    getLatestGiftCardTrans({ skip: 1, limit: 5 });
    // getLatestWithdrawalTrans({ skip: 0, limit: 5 });
    // eslint-disable-next-line
  }, []);

  const handleMenuClick = (e) => {
    console.log("press", e.key);
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

  const CompletionHandler = async (event) => {
    const key = actionTypes.KEY
    const message = event.data;
    if (message.type === "payment_ack") {
      console.log('payment seen')
      if (message.status === "successful") {
        console.log('payment success', event)
        // await HandleSuccess();
        setOpenModal(false);
        notification.success({
          message:"Payment Successful",
          duration:0,
          key,
        })
      } else {
        console.log('payment failed', event)
        setOpenModal(false);
        notification.error({
          message:"Payment Failed",
          duration:0,
          key,
        })
      }
      
      window.removeEventListener("message", CompletionHandler);
    } else {
      console.log('asdfggg')
    }
  }

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
      {console.log('tert',fiatCurrency)}
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
      {openModal && depositMoneyDetails && window.addEventListener("message", CompletionHandler)}
      {openModal && depositMoneyDetails && (
        <ModalWrapper
          className={styles.scanSell__body}
          style={{ height: 800, width: 300 }}
          isModalVisible={depositMoney ? openModal : false}
          setIsModalVisible={() => {
            setOpenModal(false);
            setShowFund(false);
            console.log('opened money')
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
      <span className={styles.gitcard__top__title}>Home </span>
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
      <div className={styles.home}>
        <div className={styles.home__welcome}>
          <div className={styles.home__top}>
            {headerId === "1"
              ? balance &&
                balance.fiatWallets && ( balance.fiatWallets.length > 0 ? (
                  <div className={styles.balances}>
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
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: fiatIndex < 1 ? "#08c" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.balances__value}>
                        <span>{renderBalance}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setWallet("NGN")}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          {balance &&
                            balance.fiatWallets &&
                            balance.fiatWallets[fiatIndex].Currency.code}
                        </div>
                       {fiatIndex + 1 === balance.fiatWallets.length && ( 
                       <>
                       <div
                          onClick={() => setOpenAddWallet(true)}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          <PlusOutlined />
                        </div>
                        </>
                        )}
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (fiatIndex + 1 === balance.fiatWallets.length) {
                          return;
                        } else {
                          setFiatIndex(++fiatIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            fiatIndex + 1 === balance.fiatWallets.length
                              ? "#08c"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ) :(
                  <div className={styles.balances}>
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
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: fiatIndex < 1 ? "#08c" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.balances__value}>
                        <span>{"Add Wallet"}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setOpenAddWallet(true)}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          <PlusOutlined />
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        console.log(balance.fiatWallets.length);
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
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            balance.fiatWallets.length === 0
                              ? "#08c"
                              : fiatIndex + 1 === balance.fiatWallets.length
                              ? "#08c"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ) )
              : balance &&
                balance.cryptoWallets &&
                (balance.cryptoWallets.length > 0 ? (
                  <div className={styles.balances}>
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
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: cryptoIndex < 1 ? "#08c" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.balances__value}>
                        <span>{renderCryptoBalance}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          // onClick={() => setWallet("NGN")}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          {balance &&
                            balance.cryptoWallets &&
                            balance.cryptoWallets[cryptoIndex].Currency.code}
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (cryptoIndex + 1 === balance.cryptoWallets.length) {
                          return;
                        } else {
                          setCryptoIndex(++cryptoIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            cryptoIndex + 1 === balance.cryptoWallets.length
                              ? "#08c"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.balances}>
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
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: cryptoIndex < 1 ? "#08c" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.balances__value}>
                        <span>{"Add Wallet"}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setOpencryptoAddWallet(true)}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          <PlusOutlined />
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        console.log(balance.cryptoWallets.length);
                        if (balance.cryptoWallets.length === 0) {
                          return;
                        }
                        if (cryptoIndex + 1 === balance.cryptoWallets.length) {
                          return;
                        } else {
                          setCryptoIndex(++cryptoIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            balance.cryptoWallets.length === 0
                              ? "#08c"
                              : cryptoIndex + 1 === balance.cryptoWallets.length
                              ? "#08c"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ))}

            {/* <div className={styles.balances}>
              <div className={styles.tops}>A</div>
              <div className={styles.balances__top}>
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

              </div> */}
            {/* <div
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
                </div> */}
            {/* </div>
              <div>A</div>
            </div> */}
            <div onClick={() => setShowFund(true)} className={styles.fund}>
              <div className={styles.fund__image}>
                <div>
                  <PlusOutlined style={{ fontSize: 23 }} />
                </div>
              </div>
              <span className={styles.fund__text}>Fund Wallet</span>
            </div>
            <div
              onClick={() => setOpenWithdrawal(true)}
              className={styles.fund}
            >
              <div className={styles.fund__image}>
                <div>
                  <i
                    class="fas fa-wallet text-white"
                    style={{ fontSize: 22, color: "#ffffff" }}
                  />
                </div>
              </div>
              <span className={styles.fund__text}>Withdrawal</span>
            </div>
          </div>
          <div className={styles.quick}>
            <div
              className={styles.quick__holder}
              style={{ width: "100%", flexWrap: "wrap" }}
            >
              <div
                onClick={() => setShowPTWOP(true)}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <UserSwitchOutlined />
                </div>
                <span style={{ textAlign: "center", lineHeight: 1 }}>
                  send money via P2P
                </span>
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
                // onClick={() => history.push("/app/crypto")}
                onClick={()=> setShowPTWOPcrypto(true)}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                <i class="fas fa-coins"/>
                </div>
                <span style={{ textAlign: "center", lineHeight: 1 }}>
                  send Crypto via P2P
                </span>
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
  createWallets:state.user.createWallet,
  fiatCurrency:state.user.fiatCurrency,
  cryptoCurrency:state.user.cryptoCurrency,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
