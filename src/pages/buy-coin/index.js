import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import { DashboardLayout } from "../../components/layout";
import { ArrowLeftOutlined, BarChartOutlined } from "@ant-design/icons";
import { BitcoinInput } from "../../assets/svg";
import { SellSection, DetailsSection } from "./components";
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
  React.useEffect(() => {
    getBTCRates();
  }, [getBTCRates]);
  return (
    <DashboardLayout>
      <div className={styles.sellPage}>
        <div className={styles.sellPage__select}>
          <div className={`${styles.actionBtn} ${styles.btcButton}`}>
            <div className={`${styles.buy}`}>
              <ArrowLeftOutlined style={{ color: "#fff" }} />
            </div>
            <span>Buy</span>
          </div>
          <div
            className={`${styles.actionBtn} ${styles.btcButton} ${styles.active}`}
          >
            <div className={`${styles.sell}`}>
              <ArrowLeftOutlined style={{ color: "#fff" }} rotate={180} />
            </div>
            <span>Sell</span>
          </div>
        </div>

        <div className={styles.sellPage__rate}>
          <Button form="full">
            <span>Check rate</span> <BarChartOutlined />
          </Button>
        </div>
        <div className={styles.sellPage__top}>
          <SellSection
            balance={balance}
            rates={btcRates}
            {...{ state, setState }}
          />
          {/* <DetailsSection {...{state, setState, buyCoins, buyBTC}} /> */}
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
