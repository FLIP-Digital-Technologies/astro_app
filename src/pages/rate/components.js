import React, { useState } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import styles from "../styles.module.scss";
// import { BitcoinInput } from "../../assets/svg";
import {
  Money,
  countryOptions,
  DigitalAsset,
  cardOptions,
} from "../../utils/helper";

export const RateSelector = ({
  isBuy,
  setIsBuy,
  balance,
  rates,
  state,
  setState,
  list,
  b,
  meta,
  setMeta,
}) => {
  const [avaCurr, setAvaCurr] = useState([]);
  const [avaCard, setAvaCard] = useState([]);
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

  const handleSellChange = ({ target: { name, value } }) => {
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

  const onAssetChange = (value) => {
    if (value !== "BTC") {
      let a = DigitalAsset.find((item) => item.value === value)?.name;
      setAvaCurr(Object.keys(b[a]).map((key) => key));
    }
    setState((state) => ({
      ...state,
      asset: value,
      country: "",
      cardType: "",
      amount: 0,
      total: 0,
    }));
    setMeta(null);
  };

  const onCountryChange = (value) => {
    let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
    setAvaCard(Object.keys(b[a][value.toLowerCase()]).map((key) => key));
    setState((state) => ({
      ...state,
      country: value,
      cardType: "",
      amount: 0,
      total: 0,
    }));
    setMeta(null);
  };

  const onCardTypeChange = (value) => {
    let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
    setMeta(b[a][state.country.toLowerCase()][value][0]);
    setState((state) => ({ ...state, cardType: value, amount: 0, total: 0 }));
  };

  const onAmountChange = (value) => {
    setState((state) => ({
      ...state,
      amount: value,
      total: meta.rate.NGN * value,
    }));
  };

  return (
    <div className={styles.rate__selector}>
      <div className={styles.rate__selector__top}>
        <div
          onClick={() => {
            setIsBuy(true);
          }}
          className={`${styles.rate__selector__top__option} ${
            isBuy && styles.full
          }`}
        >
          Buy
        </div>
        <div
          onClick={() => setIsBuy(false)}
          className={`${styles.rate__selector__top__option} ${
            !isBuy && styles.full
          }`}
        >
          Sell
        </div>
      </div>
      {isBuy ? (
        <div className={styles.rate__selector__content}>
          <Select
            labelClass={styles.rate__selector__content__label}
            className={styles.rate__selector__content__input}
            label="Select commodity"
            options={[]}
          />
          {/* <Input
            labelClass={styles.rate__selector__content__label}
            className={styles.rate__selector__content__input}
            label="Amount in BTC"
            value={state.btc}
            name="btc"
            onChange={handleChange}
            // hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcusd.buy, "USD")} / BTC`}
            hintClass={styles.largeMarginHint}
            placeholder="e.g 0.000011"
          /> */}
          <Input
            labelClass={styles.rate__selector__content__label}
            className={styles.rate__selector__content__input}
            label="Amount in USD"
            value={state.usd}
            name="usd"
            onChange={handleChange}
            placeholder="e.g $1"
          />
          <Input
            labelClass={styles.rate__selector__content__label}
            className={styles.rate__selector__content__input}
            label="Naira equivalence"
            value={state.ngn}
            name="ngn"
            onChange={handleChange}
            placeholder="₦5000"
            // hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcngn.buy, "NGN")} / BTC`}
          />
        </div>
      ) : (
        <div className={styles.rate__selector__content}>
          <Select
            options={DigitalAsset.filter(
              (it) => list.filter((i) => i === it.name || "btc").length > 0
            )}
            value={state.asset}
            onSelect={onAssetChange}
            label="Select Digital Asset"
            labelClass={styles.rate__selector__content__label}
            className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
          />
          {state.asset === "BTC" ? (
            <>
              <Input
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                label="Amount in BTC"
                value={state.btc}
                name="btc"
                onChange={handleSellChange}
                // hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcusd.buy, "USD")} / BTC`}
                hintClass={styles.largeMarginHint}
                placeholder="e.g 0.000011"
              />
              <Input
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                label="Amount in USD"
                value={state.usd}
                name="usd"
                onChange={handleSellChange}
                placeholder="e.g $1"
              />
              <Input
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                label="Naira equivalence"
                value={state.ngn}
                name="ngn"
                onChange={handleSellChange}
                placeholder="₦5000"
                // hint={`Current rate ${rates && rates.tickers && Money(rates.tickers.btcngn.buy, "NGN")} / BTC`}
              />
            </>
          ) : (
            <>
              <Select
                options={countryOptions.filter(
                  (it) =>
                    avaCurr &&
                    avaCurr.filter((i) => it.value.toLowerCase().includes(i))
                      .length > 0
                )}
                value={state.country}
                onSelect={onCountryChange}
                label="Select Country Currency"
                labelClass={styles.rate__selector__content__label}
                className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
              />
              <Select
                options={cardOptions.filter(
                  (it) =>
                    avaCard &&
                    avaCard.filter((i) => it.value.includes(i)).length > 0
                )}
                value={state.cardType}
                onSelect={onCardTypeChange}
                label="Select Card Type"
                labelClass={styles.rate__selector__content__label}
                className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
              />
              <Input
                label="Amount"
                placeholder="Enter amount here"
                value={state.amount}
                type="number"
                min={meta && meta.min}
                max={meta && meta.max}
                onChange={(e) => onAmountChange(e.target.value)}
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                disabled={!meta}
              />
              <Input
                label="Total ₦"
                value={state.total}
                readOnly
                disabled
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const RateDetails = ({ state, meta, isBuy, rates }) => {
  return (
    <div className={styles.rate__details}>
      <h2 className={styles.rate__details__title}>Details</h2>
      {isBuy || state.asset === "BTC" ? (
        <div className={styles.rate__details__list}>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Asset Type</span>
            <span className={styles.sub}>Bitcoin</span>
          </div>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Rate</span>
            <span className={`${styles.sub} `}>{` ${
              rates && rates.tickers && Money(rates.tickers.btcngn.buy, "NGN")
            } / BTC`}</span>
          </div>
        </div>
      ) : (
        <div className={styles.rate__details__list}>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Asset Type</span>
            <span className={styles.sub}>{state.asset}</span>
          </div>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Country Currency</span>
            <span className={styles.sub}>{state.country}</span>
          </div>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Card Type</span>
            <span className={`${styles.sub} `}>
              {cardOptions.find((i) => i.value === state.cardType)?.name}
            </span>
          </div>
          <div className={styles.rate__details__list__item}>
            <span className={styles.main}>Rate</span>
            <span className={`${styles.sub} `}>
              {Money((meta && meta.rate.NGN) || 0, "NGN")}/$
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
