import React, { useState } from "react";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
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
  initialBTCSellToExternalWalletTransaction
} from "../../redux/actions/btc";

const BuyCoin = ({
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
}) => {
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    ghs: 0,
  });
  const [mode, setMode] = useState("buy");
  React.useEffect(() => {
    receiveBTC();
    getBTCRates();
  }, [getBTCRates, receiveBTC]);
  return (
    <DashboardLayout>
      <span className={styles.gitcard__top__title}>Bitcoin</span>
      <br/>
      <br/>
      <div className={styles.sellPage}>
        <div className={styles.sellPage__left}>
          <div className={styles.sellPage__select}>
            <div
              onClick={() => {
                setMode("buy");
                setState({ btc: 0, usd: 0, ngn: 0, ghs: 0 });
              }}
              className={`${styles.actionBtn} ${styles.btcButton} ${
                mode === "buy" && styles.active
              }`}
            >
              <div className={`${styles.sell}`}>
                <ArrowLeftOutlined style={{ color: "#fff" }} />
              </div>
              <span>Buy</span>
            </div>
            <div
              onClick={() => {
                setMode("sell");
                setState({ btc: 0, usd: 0, ngn: 0, ghs: 0 });
              }}
              className={`${styles.actionBtn} ${styles.btcButton} ${
                mode === "sell" && styles.active
              }`}
            >
              <div className={`${styles.buy}`}>
                <ArrowLeftOutlined style={{ color: "#fff" }} rotate={180} />
              </div>
              <span>Sell</span>
            </div>

            <div
              onClick={() => {
                setMode("recieve");
                setState({ btc: 0, usd: 0, ngn: 0, ghs: 0 });
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
                setMode("send");
                setState({ btc: 0, usd: 0, ngn: 0, ghs: 0 });
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
                {...{ state, setState, buyCoins, buyBTC, loading }}
              />
            )}

            {mode === "sell" && (
              <SellSection
                balance={balance}
                rates={btcRates}
                {...{ state, setState, sellCoins, sellBTC, loading }}
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
                }}
              />
            )}

            {mode === "recieve" && (
              <RecieveSection
                btcWalletAddress={btcWalletAddress}
                btcRates={btcRates}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
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
});

const mapDispatchToProps = (dispatch) => ({
  receiveBTC: () => {
    dispatch(receiveBTCIntoWallet());
  },
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyCoin);
