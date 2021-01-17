import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import { BitcoinInput, NairaInput } from "../../assets/svg";
import styles from "../styles.module.scss";
import { Money } from "../../utils/helper";
import { SuccessfulModal } from "../transactions/components";
import { history } from "../../redux/store";

const { confirm } = Modal;

export const BuySection = ({ balance, rates, state, setState }) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.btcngn.buy * value;
      // usd = ticker && ticker.tickers.btcusd.buy * value;
      usd = 26000 * value;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.btcngn.buy);
      // usd = ticker && ticker.tickers.btcusd.buy * value;
      usd = 26000 * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "usd") {
      usd = value;
      // btc = value / (ticker && ticker.btcusd.buy);
      btc = value / 26000;
      ngn = ticker && ticker.btcngn.buy * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0 }));
    }
  };
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__holder}>
        {/* <Input
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Pay from"
          placeholder="Choose wallet"
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Deposit to"
          Dummy={{ text: "BTC wallet" }}
        /> */}
      </div>

      {/* <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in BTC"
          value={state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.btcusd.buy, "USD")
          } / BTC`}
          hintClass={styles.largeMarginHint}
          placeholder="e.g 0.000011"
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in USD"
          value={state.usd}
          name="usd"
          onChange={handleChange}
          placeholder="e.g $1"
        />
      </div> */}
      <div className={styles.transactionCard__holder__sub}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Deposit to"
          Dummy={{ text: "BTC wallet" }}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Pay from"
          placeholder="Choose wallet"
          options={[]}
        />

        <Input
          label="BTC amount needed"
          value={state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.btcusd.buy, "USD")
          } / BTC`}
          placeholder="e.g 0.000011"
        />
        {/* <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in USD"
          value={state.usd}
          name="usd"
          onChange={handleChange}
          placeholder="e.g $1"
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Naira equivalence"
          value={state.ngn}
          name="ngn"
          onChange={handleChange}
          placeholder="₦5000"
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.btcngn.buy, "NGN")
          } / BTC`}
        /> */}
      </div>
    </div>
  );
};

export const SellSection = ({ balance, rates, state, setState }) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.btcngn.sell * value;
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * value;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.btcngn.sell);
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "usd") {
      usd = value;
      // btc = value / (ticker && ticker.btcusd.sell);
      btc = value / 26000;
      ngn = ticker && ticker.btcngn.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0 }));
    }
  };
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__holder__sub}>
        <Input
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Sell from"
          Dummy={{ text: "BTC wallet" }}
          hint={`Current Balance ${
            balance && balance.BTC && Money(balance.BTC.balance, "BTC")
          } `}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          label="Recieve payment to"
          options={[]}
        />

        <Input
          labelClass={styles.largeMarginLabel}
          label="BTC amount for sale"
          value={state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.btcusd.sell, "USD")
          } / BTC`}
          hintClass={styles.largeMarginHint}
          placeholder="e.g 0.000011"
        />
        {/* <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in USD"
          value={state.usd}
          name="usd"
          onChange={handleChange}
          placeholder="e.g $1"
        />

        <Input
          labelClass={styles.largeMarginLabel}
          label="Naira equivalence"
          value={state.ngn}
          name="ngn"
          onChange={handleChange}
          placeholder="₦5000"
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.btcngn.sell, "NGN")
          } / BTC`}
        /> */}
      </div>
    </div>
  );
};
