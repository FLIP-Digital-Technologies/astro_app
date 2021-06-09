import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from "../../redux/actions/Auths";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import Select from "../../components/select";
import Input from "../../components/input";
import styles from "../styles.module.scss";
import { CommaFormatted } from "../../utils/helper";

function BuyCrypto({
  getBTCRates,
  fiatCurrency,
  cryptoCurrency,
  rates,
  state,
  setState,
}) {
  const INITIAL_STATE2 = {
    currency: "",
    creditCurrency: "",
    category: "",
    fiat: "",
    btc: "",
    ngn: "",
  };
  const [crypto, setCrypto] = useState(INITIAL_STATE2);
  const [wallet_btc_rate, setWallet_btc_rate] = useState(0);
  const [sell_btc_usd_rate, setSell_btc_usd_rate] = useState(0);
  useEffect(() => {
    crypto.currency && getBTCRates({ coin: crypto.currency });
    console.log(crypto.currency);
  }, [crypto.currency]);

  useEffect(() => {
      console.log('rates',rates)
    rates && rates.ticker && setSell_btc_usd_rate(rates.ticker.sell);
    let walletRate =
      state.wallet &&
      fiatCurrency &&
      fiatCurrency.length > 0 &&
      fiatCurrency.filter((item) => item.code === state.wallet)[0];
    walletRate &&
      walletRate.we_buy &&
      setWallet_btc_rate((walletRate.we_buy ?? 0) * sell_btc_usd_rate);
    // eslint-disable-next-line
  }, [rates, state.wallet]);

  const onCryptoWalletChange = (value) => {
    let cryptoCurrencyUsed = cryptoCurrency.filter(
      (item) => item.code === value.code
    )[0];

    setCrypto((crypto) => ({
      ...crypto,
      currency: value.code,
    }));
    setState((state) => ({
        ...state,
        // wallet: value.code,
        ngn:""
      }));
  };

  const onFiatWalletChange = (value) => {
    let fiatCurrencyUsed = fiatCurrency.filter(
      (item) => item.code === value.code
    )[0];

    setState((state) => ({
      ...state,
      wallet: value.code,
      ngn:""
    }));
  };
  useEffect(() => {
      
  }, [state.wallet, state.ngn])
  const handleChange = ({ target: { name, value } }) => {
    // let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = wallet_btc_rate * btc;
      usd = sell_btc_usd_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / wallet_btc_rate;
      usd = value / (wallet_btc_rate / sell_btc_usd_rate);
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / sell_btc_usd_rate;

      ngn = wallet_btc_rate * btc;

      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / wallet_btc_rate;

      usd = value / (wallet_btc_rate / sell_btc_usd_rate);

      ngn = wallet_btc_rate * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: "", usd: "", ngn: "", ghs: "" }));
    }
  };

  return (
    <div>
      <div>
        <div style={{ marginBottom: 20 }}>
          <Select
            options={cryptoCurrency.map((item) => ({
              render: item.name,
              value: item,
            }))}
            label="Select Crypto"
            placeholder="Select Crypto"
            value={crypto.currency}
            onSelect={onCryptoWalletChange}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Select
            options={fiatCurrency.map((item) => ({
              render: item.name,
              value: item,
            }))}
            label="Select Currency"
            placeholder="Select Currency"
            value={state.wallet}
            onSelect={onFiatWalletChange}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Input
            labelClass={styles.largeMarginLabel}
            label={crypto.currency ? `Amount (${crypto.currency})` : `Amount`}
            value={isFinite(state.btc) ? state.btc : 0}
            name="btc"
            onChange={handleChange}
            hint={
              crypto.currency &&
              `Current rate USD ${CommaFormatted(sell_btc_usd_rate)} / ${
                crypto.currency
              }`
            }
            hintClass={styles.largeMarginHint}
            placeholder="e.g 0.000011"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Input
            labelClass={styles.largeMarginLabel}
            label={state.wallet? `Amount in ${state.wallet}` : `Amount`}
            value={isNaN(state.ngn) ? 0 : state.ngn.toLocaleString()}
            hint={state.wallet &&
                `Current rate ${state.wallet ?? ""} ${CommaFormatted(
              wallet_btc_rate
            )} / ${crypto.currency}`}
            name="ngn"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  btcRates: state.btc.btcTicker,
  giftCardList: state.giftCard.giftCardList,
  fiatCurrency: state.user.fiatCurrency,
  cryptoCurrency: state.user.cryptoCurrency,
  cardDetails: state.giftCard.cardDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: (data) => {
    dispatch(getBTCCurrentMarketTicker(data));
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
  getMainCryptoCurrency: () => {
    dispatch(getCryptoCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyCrypto);
