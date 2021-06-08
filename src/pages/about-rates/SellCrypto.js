import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from "../../redux/actions/Auths";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import Select from "../../components/select";
import Input from "../../components/input";

function SellCrypto({ getBTCRates, fiatCurrency, cryptoCurrency }) {
  const INITIAL_STATE2 = {
    currency: "BTC",
    creditCurrency: "",
    category: "",
    fiat:"",
    btc:0,
    ngn:0
  };
  const [crypto, setCrypto] = useState(INITIAL_STATE2);
  useEffect(() => {
    getBTCRates({ coin: crypto.currency ?? "BTC" });
    console.log(crypto.currency)
  }, [crypto.currency]);
  const onCryptoWalletChange = (value) => {
    let cryptoCurrencyUsed = cryptoCurrency.filter(
      (item) => item.code === value.code
    )[0];

    setCrypto((crypto) => ({
      ...crypto,
      currency: value.code,
    }));
  };

  const onFiatWalletChange = (value) => {
    let fiatCurrencyUsed = fiatCurrency.filter(
      (item) => item.code === value.code
    )[0];

    setCrypto((crypto) => ({
      ...crypto,
      fiat: value.code,
    }));
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
            value={crypto.fiat}
            onSelect={onFiatWalletChange}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Input 
          value={crypto.btc}
        //   hint={}
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

export default connect(mapStateToProps, mapDispatchToProps)(SellCrypto);
