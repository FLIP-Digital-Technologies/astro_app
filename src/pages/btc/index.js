import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import Input from "../../components/input";
import { DashboardLayout } from "../../components/layout";
import { ArrowLeftOutlined, BarChartOutlined } from "@ant-design/icons";
import { BitcoinInput } from "../../assets/svg";
import { SellSection, BuySection } from "./components";
import styles from "../styles.module.scss";
import {
  getBTCCurrentMarketTicker,
  initialBTCBuyTransaction,
} from "../../redux/actions/btc";

const BuyCoin = ({ getBTCRates, balance, btcRates, buyCoins, buyBTC }) => {
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
  });
  const [isBuy, setIsBuy] = useState(true);
  React.useEffect(() => {
    getBTCRates();
  }, [getBTCRates]);
  return (
    <DashboardLayout>
      <div className={styles.sellPage}>
        <div className={styles.sellPage__left}>
          <div className={styles.sellPage__select}>
            <div
              onClick={() => setIsBuy(true)}
              className={`${styles.actionBtn} ${styles.btcButton} ${
                isBuy && styles.active
              }`}
            >
              <div className={`${styles.buy}`}>
                <ArrowLeftOutlined style={{ color: "#fff" }} />
              </div>
              <span>Buy</span>
            </div>
            <div
              onClick={() => setIsBuy(false)}
              className={`${styles.actionBtn} ${styles.btcButton} ${
                !isBuy && styles.active
              }`}
            >
              <div className={`${styles.sell}`}>
                <ArrowLeftOutlined style={{ color: "#fff" }} rotate={180} />
              </div>
              <span>Sell</span>
            </div>
          </div>

          <div className={styles.sellPage__rate}></div>
          <div className={styles.sellPage__top}>
            {isBuy ? (
              <BuySection
                balance={balance}
                rates={btcRates}
                {...{ state, setState }}
              />
            ) : (
              <SellSection
                balance={balance}
                rates={btcRates}
                {...{ state, setState }}
              />
            )}
          </div>
        </div>
        <div className={styles.sellPage__right}>
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in USD"
            value={state.usd}
            name="usd"
            placeholder="e.g $1"
            hint="@150/usd"
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in NGN"
            value={state.ngn}
            name="ngn"
            placeholder="₦5000"
            hint="@500/usd"
          />

          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in GHC"
            value={state.ngn}
            name="ngn"
            placeholder="₦5000"
            hint="@500/usd"
          />
          <Button className={styles.sellPage__btn} form="full">
            Buy
          </Button>
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
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
  },
  buyCoins: (data) => {
    dispatch(initialBTCBuyTransaction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyCoin);
