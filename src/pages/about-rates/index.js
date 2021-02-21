import React, { useState } from "react";
import { connect } from "react-redux";
import { LandingLayout } from "../../components/layout";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { getBTCCurrentMarketTicker } from "../../redux/actions/btc";
import { getGiftCardCodes } from "../../redux/actions/giftCard";
import { BitcoinInput } from "../../assets/svg";
import {
  Money,
  countryOptions,
  DigitalAsset,
  cardOptions,
  sortData,
} from "../../utils/helper";
import styles from "../styles.module.scss";

const AboutRates = ({ btcRates, giftCardList, getBTCRates, getCards }) => {
  let b = giftCardList;
  let list = sortData(b).map((i) => i[0]);
  React.useEffect(() => {
    getBTCRates();
    getCards({ cardCode: "all" });
  }, [getBTCRates, getCards]);

  const [buy, setBuy] = useState(false);
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
              <Input
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                label="Buy bitcoin"
                Dummy={{ Icon: BitcoinInput, text: "Bitcoin" }}
              />
            ) : (
              <>
                <Select
                  options={DigitalAsset.filter(
                    (it) =>
                      list.filter((i) => i === it.name || "btc").length > 0
                  )}
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
                )}
              </>
            )}
            {buy || state.asset === "BTC" ? (
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
            )}
            <Button className={styles.button} text="Check Rates" form="full" />
          </div>
        </div>
        {/* <div className={`${styles.landing__steps} ${styles.rev} ${styles.two}`}>
          <div className={styles.title}>How we are different</div>
          <div className={styles.stepHolder}>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidRocket />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Speed redefined
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Our payment process has been simplified and made hassle free for
                your convenience.
              </div>
            </div>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidChart />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Reports that matter
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Get reports on your activity to help you keep track and stay
                updated.
              </div>
            </div>

            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidMoney />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Modern payout intergation
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                All payments are processed with a modern and secure third party
                partner.
              </div>
            </div>
          </div>
        </div>
       */}
      </div>
    </LandingLayout>
  );
};

const mapStateToProps = (state) => ({
  btcRates: state.btc.btcTicker,
  giftCardList: state.giftCard.giftCardList,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
  },
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutRates);
