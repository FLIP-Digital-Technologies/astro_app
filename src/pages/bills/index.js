import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import Input from "../../components/input";
import { DashboardLayout } from "../../components/layout";
import { ArrowLeftOutlined, BarChartOutlined } from "@ant-design/icons";
import { BitcoinInput } from "../../assets/svg";
import { Flyout } from "./components";
import styles from "../styles.module.scss";
import {
  getBTCCurrentMarketTicker,
  initialBTCBuyTransaction,
} from "../../redux/actions/btc";

const Bills = ({ getBTCRates, balance, btcRates, buyCoins, buyBTC }) => {
  const INITIAL_STATE = {
    title: "Cable",
    close: () => setFormState(INITIAL_STATE),
    show: false,
    inputs: [
      {
        type: "text",
        name: "email",
        placeholder: "your email addresss",
        label: "Email",
      },
      {
        type: "text",
        name: "email",
        placeholder: "your email addresss",
        label: "Email",
      },
      {
        type: "select",
        name: "email",
        placeholder: "your email addresss",
        options: [],
        label: "Country",
      },
    ],
    creds: {},
  };
  const [formState, setFormState] = useState(INITIAL_STATE);

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
      <span className={styles.gitcard__top__title}>Bills </span>
      <Flyout state={formState} setState={setFormState} />
      <div className={styles.bills}>
        <div className={styles.bills__content}>
          <div
            onClick={() => setFormState((state) => ({ ...state, show: true }))}
            className={`${styles.actionBtn} ${styles.quickBtn}`}
          >
            <div></div>
            <span>Cable Tv</span>
          </div>
          <div className={`${styles.actionBtn} ${styles.quickBtn}`}>
            <div></div>
            <span>Internet</span>
          </div>
          <div className={`${styles.actionBtn} ${styles.quickBtn}`}>
            <div></div>
            <span>Electricity</span>
          </div>
        </div>

        <div className={styles.bills__content}>
          <div className={`${styles.actionBtn} ${styles.quickBtn}`}>
            <div></div>
            <span>Detting</span>
          </div>
          <div className={`${styles.actionBtn} ${styles.quickBtn}`}>
            <div></div>
            <span>Transport</span>
          </div>
          <div className={`${styles.actionBtn} ${styles.quickBtn}`}>
            <div></div>
            <span>Tickets</span>
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
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
  },
  buyCoins: (data) => {
    dispatch(initialBTCBuyTransaction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
