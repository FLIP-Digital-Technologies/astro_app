import React, { useState } from "react";
import { connect } from "react-redux";
import { LandingLayout } from "../../components/layout";
// import Input from "../../components/input";
// import Select from "../../components/select";
import Button from "../../components/button";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import {
  getGiftCardCodes,
  getGiftCardDetails,
} from "../../redux/actions/giftCard";
// import { BitcoinInput } from "../../assets/svg";
import AppFetch from "../../redux/services/FetchInterceptor";

import styles from "../styles.module.scss";
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from "../../redux/actions/Auths";
import { notification } from "antd";
import { BuySide, SellSide } from "./components";
// import { SellSection } from "../btc/components";

const AboutRates = ({
  btcRates,
  giftCardList,
  getBTCRates,
  getCards,
  getMainFiatCurrency,
  getMainCryptoCurrency,
  cryptoCurrency,
  fiatCurrency,
  getCardDetails,
  cardDetails,
}) => {
  // const { TabPane } = Tabs;
  // function callback(key) {
  //   console.log(key);
  // }
  // let b = giftCardList;
  // let list = sortData(b).map((i) => i[0]);
  React.useEffect(() => {
    getMainCryptoCurrency();
    getMainFiatCurrency();
    Coins();
    fetchTickers();
    // getBTCRates();
    // getCards({ cardCode: "all" });
  }, [getBTCRates, getCards, getMainCryptoCurrency, getMainFiatCurrency]);

  const [buy, setBuy] = useState(false);
  const [, setCoins] = useState([]);
  const [, setCoinsData] = useState([]);
  // const [meta, setMeta] = useState(null);
  // const [avaCurr, setAvaCurr] = useState([]);
  // const [avaCard, setAvaCard] = useState([]);
  // const [state, setState] = useState({
  //   btc: 0,
  //   usd: 0,
  //   ngn: 0,
  //   country: "",
  //   cardType: "",
  //   asset: "",
  //   amount: 0,
  //   total: 0,
  // });
  const fetchTickers = () => {
    AppFetch({
      url: `/coins/tickers`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    })
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => {
        notification.error({
          message: "erros",
        });
      });
  };
  const Coins = () => {
    AppFetch({
      url: `/coins`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    })
      .then((res) => {
        setCoinsData(res.data.crypto);
      })
      .catch((err) => {
        notification.error({
          message: "erros",
        });
        setCoinsData([]);
      });
  };

  // const onAssetChange = (value) => {
  //   if (value !== "BTC") {
  //     let a = DigitalAsset.find((item) => item.value === value)?.name;
  //     setAvaCurr(Object.keys(b[a]).map((key) => key));
  //   }
  //   setState((state) => ({
  //     ...state,
  //     asset: value,
  //     country: "",
  //     cardType: "",
  //     amount: 0,
  //     total: 0,
  //   }));
  //   setMeta(null);
  // };

  // const onCountryChange = (value) => {
  //   let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
  //   setAvaCard(Object.keys(b[a][value.toLowerCase()]).map((key) => key));
  //   setState((state) => ({
  //     ...state,
  //     country: value,
  //     cardType: "",
  //     amount: 0,
  //     total: 0,
  //   }));
  //   setMeta(null);
  // };

  // const onCardTypeChange = (value) => {
  //   let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
  //   setMeta(b[a][state.country.toLowerCase()][value][0]);
  //   setState((state) => ({ ...state, cardType: value, amount: 0, total: 0 }));
  // };
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.rates}>
          <div className={styles.rates__left}>
            <div className={styles.title}>Our rate</div>
            <div className={styles.sub}>Absolutely the best</div>
          </div>

          <div className={styles.rates__right}>
            <div className={styles.title}>Rates Calculator</div>
            <div className={styles.sub}>
              Get the current value of your transaction
            </div>
            <div className={styles.buttonHolder}>
              <Button
                className={`${styles.buttonLeft} ${buy && styles.rev}`}
                text="SELL"
                form="full"
                onClick={() => setBuy(false)}
              />
              <Button
                className={`${styles.buttonRight} ${!buy && styles.rev}`}
                text="BUY"
                form="full"
                onClick={() => setBuy(true)}
              />
            </div>
            {buy ? (
              <BuySide
                fiatCurrency={fiatCurrency}
                cardDetails={cardDetails}
                getCardDetails={getCardDetails}
                cryptoCurrency={cryptoCurrency}
                rates={btcRates}
              />
            ) : (
              <>
                <SellSide
                  fiatCurrency={fiatCurrency}
                  cardDetails={cardDetails}
                  getCardDetails={getCardDetails}
                  cryptoCurrency={cryptoCurrency}
                  rates={btcRates}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

const mapStateToProps = (state) => ({
  btcRates: state.btc.btcTicker,
  giftCardList: state.giftCard.giftCardList,
  fiatCurrency: state.user.fiatCurrency,
  cryptoCurrency: state.user.cryptoCurrency,
  cardDetails: state.giftCard.cardDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
  },
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
  getMainCryptoCurrency: () => {
    dispatch(getCryptoCurrencies());
  },
  getCardDetails: (data) => {
    dispatch(getGiftCardDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutRates);
