import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";
import {
  getBTCCurrentMarketTicker,
  initialBTCBuyTransaction,
} from "../../redux/actions/btc";

const Airtime = ({ getBTCRates, balance, btcRates, buyCoins, buyBTC }) => {
  const [state] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
  });
  React.useEffect(() => {
    getBTCRates();
  }, [getBTCRates]);
  return (
    <DashboardLayout>
      <div className={styles.airttime}>
        <h3 className={styles.airttime__title}>airtime</h3>
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

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        />

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        />
        <Button className={styles.airttime__button} form="full">
          Proceed
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Airtime);
