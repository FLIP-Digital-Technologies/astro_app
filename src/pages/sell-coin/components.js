import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Input from "../../components/input";
import Button from "../../components/button";
import { BitcoinInput, NairaInput } from "../../assets/svg";
import styles from "../styles.module.scss";
import {Money} from "../../utils/helper";
import { SuccessfulModal } from "../transactions/components";
import { history } from "../../redux/store";

const { confirm } = Modal;

export const SellSection = ({balance, rates, state, setState}) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd;
    if(name  === "btc"){
      btc = value;
      ngn = ticker && ticker.btcngn.sell * value;
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * value;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name  === "ngn"){
      ngn = value;
      btc = value / (ticker && ticker.btcngn.sell);
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name  === "usd"){
      usd = value;
      // btc = value / (ticker && ticker.btcusd.sell);
      btc = value / 26000;
      ngn = ticker && ticker.btcngn.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    }
    if(!value){
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0 }));
    }
  };
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Sell bitcoin from"
          Dummy={{ Icon: BitcoinInput, text: "BTC wallet" }}
          hint={`Current Balance ${balance &&  balance.BTC &&  Money(balance.BTC.balance,  "BTC")} `}
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Deposit to"
          Dummy={{ Icon: NairaInput, text: "NGN wallet" }}
        />
      </div>
      <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in BTC"
          value={state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcusd.sell, "USD")} / BTC`}
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
      </div>
      <div className={styles.transactionCard__holder__sub}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Naira equivalence"
          value={state.ngn}
          name="ngn"
          onChange={handleChange}
          placeholder="₦5000"
          hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcngn.sell, "NGN")} / BTC`}
        />
      </div>
    </div>
  );
};

export const DetailsSection = ({state, sellCoins, sellBTC}) => {
  const showPromiseConfirm  = () => {
    confirm({
      title: `Sell ${state.btc} BTC`,
      icon: <ExclamationCircleOutlined style={{color: "#19a9de"}} />,
      content: `Confirm the sales of ${state.btc} BTC`,
      onOk() {
        return sellCoins({amount: state.btc})
      },
      onCancel() {},
    });
  }
  return (
    <div className={styles.detailsCard}>
      {sellBTC && <SuccessfulModal onClick={() => history.push("/app")} />}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are selling</span>
          <span className={styles.sub}>{Money(state.btc, "BTC")}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You will receive</span>
          <span className={styles.sub}>{Money(state.ngn, "NGN")}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Fees</span>
          <span className={`${styles.sub} ${styles.light}`}>₦0</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Should arrive</span>
          <span className={`${styles.sub} ${styles.light}`}>In 5 Seconds</span>
        </div>
      </div>
      <Button text="Sell" disabled={parseInt(state.ngn, 10) < 499 ? true : false} onClick={() => showPromiseConfirm()} form="full" />
    </div>
  );
};
