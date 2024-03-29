import React, { useState } from "react";
import { connect } from "react-redux";
// import { DashboardLayout } from "../../components/layout";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  SellSection,
  BuySection,
  SendSection,
  RecieveSection,
} from "./components";
import styles from "../styles.module.scss";
import {
  getBTCCurrentMarketTicker,
  initialBTCBuyTransaction,
  receiveBTCIntoWallet,
  initialBTCSellTransaction,
  initialBTCSellToExternalWalletTransaction,
} from "../../redux/actions/btc";
import { getFiatCurrencies, getUserWallets } from "../../redux/actions/Auths";
import * as SVG from "../../assets/svg";
import { getCurrencyConversions } from "../../redux/actions/user";

const BuyCoin = ({
  active,
  handleBack,
  getBTCRates,
  balance,
  btcRates,
  buyCoins,
  buyBTC,
  btcWalletAddress = "",
  receiveBTC,
  loading,
  sellCoins,
  sellBTC,
  sellCoinsExternal,
  sellBTCExternal,
  fiatWallets,
  conversions,
  getConversions,
  fiatCurrency,
  getMainFiatCurrency,
}) => {
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    ghs: 0,
    walletBalance: 0,
    creditCoinsWalletId:active.id
  });
  const [mode, setMode] = useState("buy");
  React.useEffect(() => {
    getConversions()
    getMainFiatCurrency()
    // eslint-disable-next-line
  }, [])
  React.useEffect(() => {
    const interval = setInterval(async () => {
      getBTCRates({coin:active.Currency.code});
      getConversions();
    }, 60000);
    return () => clearInterval(interval);
  }, [getBTCRates, getConversions, active.Currency.code]);
  React.useEffect(() => {
    receiveBTC({cryptoWalletId:active.id});
    getBTCRates({coin:active.Currency.code});
  }, [receiveBTC, getBTCRates, active.Currency.code, active.id]);
  return (
    <>
      <div className={styles.gitcard__form}>
        <div
          className={styles.gitcard__form__holder}
          style={{ alignItems: "flex-start" }}
        >{console.log({active})}
          <div onClick={handleBack} className={styles.gitcard__form__link}>
            <SVG.ArrowLeft /> {active.Currency.name}
          </div>
          <div
            className={styles.gitcard__form__body__image}
            style={{
              border: "1px solid #fff",
              // boxShadow: "-3px 4px 20px #00000026",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {active.icon}
          </div>
        </div>
        {/* <div onClick={handleBack} className={styles.gitcard__form__link}>
     <SVG.ArrowLeft /> Bitcoin
     </div> */}
        {/* <span className={styles.gitcard__top__title}></span> */}
      
        <div className={styles.sellPage}>
          <div className={styles.sellPage__left}>
            <div className={styles.sellPage__select}>
              <div
                onClick={() => {
                  setMode("buy");
                  setState({
                    ...state,
                    btc: "",
                    usd: "",
                    ngn: "",
                    ghs: "",
                    walletBalance: 0,
                  });
                }}
                className={`${styles.actionBtn} ${styles.btcButton} ${
                  mode === "buy" && styles.active
                }`}
              >
                <div className={`${styles.selling}`}>
                  <ArrowLeftOutlined style={{ color: "#fff" }} />
                </div>
                <span>Buy</span>
              </div>
              <div
                onClick={() => {
                  setMode("sell");
                  setState({
                    ...state,
                    btc: "",
                    usd: "",
                    ngn: "",
                    ghs: "",
                    walletBalance: 0,
                  });
                }}
                className={`${styles.actionBtn} ${styles.btcButton} ${
                  mode === "sell" && styles.active
                }`}
              >
                <div className={`${styles.buying}`}>
                  <ArrowLeftOutlined style={{ color: "#fff" }} rotate={180} />
                </div>
                <span>Sell</span>
              </div>

              <div
                onClick={() => {
                  setMode("recieve");
                  setState({
                    ...state,
                    btc: "",
                    usd: "",
                    ngn: "",
                    ghs: "",
                    walletBalance: 0,
                  });
                }}
                className={`${styles.actionBtn} ${styles.btcButton} ${
                  mode === "recieve" && styles.active
                }`}
              >
                <div className={`${styles.sell}`}>
                  <DownloadOutlined style={{ color: "#fff" }} />
                </div>
                <span>Recieve</span>
              </div>
              <div
              
                onClick={() => {
                  // alert('Service Unavailable')
                  setMode("send");
                  setState({
                    ...state,
                    btc: "",
                    usd: "",
                    ngn: "",
                    ghs: "",
                    walletBalance: 0,
                  });
                }}
                className={`${styles.actionBtn} ${styles.btcButton} ${
                  mode === "send" && styles.active
                }`}
              >
                <div className={`${styles.buy}`}>
                  <UploadOutlined style={{ color: "#fff" }} />
                </div>
                <span>Send</span>
              </div>
            </div>

            <div className={styles.sellPage__top}>
              {mode === "buy" && (
                <BuySection
                  balance={balance}
                  rates={btcRates}
                  fiatWallets={fiatWallets}
                  conversions={conversions}
                  fiatCurrency={fiatCurrency}
                  {...{ state, setState, buyCoins, buyBTC, loading, active }}
                />
              )}

              {mode === "sell" && (
                <SellSection
                  balance={balance}
                  rates={btcRates}
                  fiatWallets={fiatWallets}
                  conversions={conversions}
                  fiatCurrency={fiatCurrency}
                  {...{ state, setState, sellCoins, sellBTC, loading, active }}
                />
              )}
              {mode === "send" && (
                <SendSection
                  balance={balance}
                  rates={btcRates}
                  {...{
                    state,
                    setState,
                    sellCoinsExternal,
                    sellBTCExternal,
                    loading,
                    active
                  }}
                />
              )}

              {mode === "recieve" && (
                <RecieveSection
                  btcWalletAddress={btcWalletAddress}
                  btcRates={btcRates}
                  active={active}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  btcRates: state.btc.btcTicker,
  buyBTC: state.btc.buyBTC,
  btcWalletAddress: state.btc.btcWalletAddress,
  loading: state.btc.loading,
  sellBTC: state.btc.sellBTC,
  sellBTCExternal: state.btc.sellBTCExternal,
  btcTicker: state.btc.btcTicker,
  conversions:state.user.conversions,
  fiatCurrency: state.user.fiatCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  receiveBTC: (data) => {
    dispatch(receiveBTCIntoWallet(data));
  },
  getBTCRates: (data) => {
    dispatch(getBTCCurrentMarketTicker(data));
  },
  getConversions: () => {
    dispatch(getCurrencyConversions())
  },
  buyCoins: (data) => {
    dispatch(initialBTCBuyTransaction(data));
  },
  sellCoins: (data) => {
    dispatch(initialBTCSellTransaction(data));
  },
  sellCoinsExternal: (data) => {
    dispatch(initialBTCSellToExternalWalletTransaction(data));
  },
  getBalance: () => {
    dispatch(getUserWallets());
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyCoin);
