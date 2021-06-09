import React, { useState } from "react";
import { connect } from "react-redux";
import { LandingLayout } from "../../components/layout";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import {
  getGiftCardCodes,
  getGiftCardDetails,
} from "../../redux/actions/giftCard";
import { BitcoinInput } from "../../assets/svg";
import AppFetch from "../../redux/services/FetchInterceptor";
import {
  Money,
  countryOptions,
  DigitalAsset,
  cardOptions,
  sortData,
} from "../../utils/helper";
import styles from "../styles.module.scss";
import {
  getCryptoCurrencies,
  getFiatCurrencies,
} from "../../redux/actions/Auths";
import { notification, Row, Col, Tabs } from "antd";
import { BuySide, SellSide } from "./components";
import { SellSection } from "../btc/components";

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
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  let b = giftCardList;
  let list = sortData(b).map((i) => i[0]);
  React.useEffect(() => {
    getMainCryptoCurrency();
    getMainFiatCurrency();
    Coins();
    fetchTickers();
    // getBTCRates();
    // getCards({ cardCode: "all" });
  }, [getBTCRates, getCards, getMainCryptoCurrency, getMainFiatCurrency]);

  const [buy, setBuy] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coinsData, setCoinsData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [avaCurr, setAvaCurr] = useState([]);
  const [avaCard, setAvaCard] = useState([]);
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    country: "",
    cardType: "",
    asset: "",
    amount: 0,
    total: 0,
  });
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
  return (
    <LandingLayout>
      <div className={styles.landing}>
        {/* <div className={styles.ratecontainer}>
          <Row>
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.ratesleft}>
                <h3>Our Rates</h3>
                <span>
                  We give you good value for your cards every time you choose
                  Astro
                </span>
              </div>
            </Col>
            <Col
              span={12}
              style={{
                // backgroundColor: "white",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <span>Rate Calculator</span>
              <Tabs onChange={callback} defaultActiveKey="1" style={{height:600}}>
                <TabPane key="1" tab={<div>SELL</div>}>
                  <SellSide
                    fiatCurrency={fiatCurrency}
                    getCardDetails={getCardDetails}
                    cardDetails={cardDetails}
                  />
                </TabPane>
                <TabPane key="2" tab={<div>BUY</div>}>
                  <BuySide fiatCurrency={fiatCurrency} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div> */}
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
                {/* <Select
                  // options={DigitalAsset.filter(
                  //   (it) =>
                  //     list.filter((i) => i === it.name || "btc").length > 0
                  // )}
                  options={coinsData && coinsData.map((item) => ({
                    render:`${item.name}`,
                    value:item
                  }))}
                  value={state.asset}
                  onSelect={onAssetChange}
                  label="How much are you willing to sell?"
                  labelClass={styles.label}
                />
                {state.asset !== "BTC" && (
                  <>
                    <Select
                      options={countryOptions.filter(
                        (it) =>
                          avaCurr &&
                          avaCurr.filter((i) =>
                            it.value.toLowerCase().includes(i)
                          ).length > 0
                      )}
                      value={state.country}
                      onSelect={onCountryChange}
                      label="Select Country Currency"
                      labelClass={styles.label}
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
                      labelClass={styles.label}
                    />
                  </>
                )} */}
              </>
            )}
            {/* {buy || state.asset === "BTC" ? (
              <>
                <div className={styles.rate}>
                  <span>Rate</span>
                  <span>{` ${
                    buy
                      ? btcRates &&
                        btcRates.tickers &&
                        Money(btcRates.tickers.btcngn.sell, "NGN")
                      : btcRates &&
                        btcRates.tickers &&
                        Money(btcRates.tickers.btcngn.buy, "NGN")
                  } / BTC`}</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.range}>
                  <span>Regular Range</span>
                  <span>$1+</span>
                </div>
                <div className={styles.rate}>
                  <span>Rate</span>
                  <span>{Money((meta && meta.rate.NGN) || 0, "NGN")}/$</span>
                </div>
              </>
            )} */}
            {/* <Button className={styles.button} text="Check Rates" form="full" /> */}
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
