import React, { useState, useEffect } from "react";
import Select from "../../components/select";
import { notification } from "antd";
import labelStyles from "../../components/select/styles.module.scss";
import styles from "../styles.module.scss";
import Input from "../../components/input";
import { CommaFormatted } from "../../utils/helper";
import SellCrypto from "./SellCrypto";
// import BuyCrypto from "./BuyCrypto";
import AppFetch from "../../redux/services/FetchInterceptor";

export const BuySide = ({
  rates,
  fiatCurrency,
  getCardDetails,
  cardDetails,
  cryptoCurrency,
}) => {
  // const [, setCurrencyType] = useState(true);
  // const [state, setState] = useState({
  //   btc: "",
  //   usd: 0,
  //   ngn: "",
  //   ghs: 0,
  //   walletBalance: 0,
  //   // creditCoinsWalletId:
  // });
  // const onRadioChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setCurrencyType(e.target.value);
  // };
  return (
    <div>
      {/* <div
        style={{ marginBottom: 20, display: "flex", flexDirection: "column" }}
      >
        <label
          className={`${labelStyles.input__label} ${styles.label}`}
          style={{ marginTop: 10 }}
        >
          {"Select Transaction type"}
        </label>
        <Radio.Group
          onChange={onRadioChange}
          value={currencyType}
          style={{ marginTop: 10, color:"#921946" }}
        >
          <Radio value={true}>Gift Card</Radio>
          <Radio value={false}>Cryptocurrency</Radio>
        </Radio.Group>
      </div> */}
      {/* {currencyType && (
        
      )} */}
      {/* {!currencyType && ( */}
        {/* <BuyCrypto 
        rates={rates}
        state={state} 
        setState={setState}
        /> */}
      {/* )} */}
    </div>
  );
};

export const SellSide = ({
  rates,
  fiatCurrency,
  getCardDetails,
  cardDetails,
  cryptoCurrency,
}) => {
  useEffect(() => {
    getCards()
  }, [])
  const INITIAL_STATE = {
    card: "",
    creditCurrency: "",
    category: "",
    cardCategory: {},
    cardType: "",
    fiatCurrencyId: "",
    value: null,
    amount: "",
    number: 1,
    total: 0,
    file: [],
    wallet: "",
    remark: "",
  };
  // const INITIAL_STATE2 = {
  //   currency: "",
  //   creditCurrency: "",
  //   category: "",
  // };

  const [details, setDetails] = useState(INITIAL_STATE);
  const [cards, setCards] = useState([])
  // const [crypto, setCrypto] = useState(INITIAL_STATE2);
  const [total, setTotal] = useState(0);
  const [currencyType, ] = useState(true);
  const [, setRate_selected] = useState("");
  const [rate_conv, setRate_conv] = useState(0)
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    ghs: 0,
    walletBalance: 0,
    // creditCoinsWalletId:
  });
  const getCards = () => {
    AppFetch({
      url: `/cards`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    })
      .then((res) => {
        setCards(res.data.cards);
      })
      .catch((err) => {
        notification.error({
          message: "erros",
        });
        setCards([]);
      });
  };

  // const onRadioChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setCurrencyType(e.target.value);
  // };
  useEffect(() => {
    let walletRate =
      fiatCurrency &&
      fiatCurrency.length > 0 &&
      fiatCurrency.filter((item) => item.code === details.creditCurrency)[0];
    // console.log(details.creditCurrency);
    walletRate &&
      walletRate.we_buy &&
      details &&
      details.category &&
      setTotal(details.amount * walletRate.we_buy * details.category.rate);

      walletRate &&
      walletRate.we_buy &&
      details &&
      details.category &&
      setRate_conv(details.category.rate * walletRate.we_buy)
      // eslint-disable-next-line
  }, [fiatCurrency, details.creditCurrency, details.category, details.amount]);

  const onWalletChange = (value) => {
    let fiatCurrencyUsed = fiatCurrency.filter(
      (item) => item.code === value.code
    )[0];
    setDetails((details) => ({
      ...details,
      creditCurrency: value.code,
      amount: "",
    }));
    setRate_selected(fiatCurrencyUsed.we_buy);
  };
  // const onCryptoWalletChange = (value) => {
  //   let cryptoCurrencyUsed = cryptoCurrency.filter(
  //     (item) => item.code === value.code
  //   )[0];

  //   setCrypto((crypto) => ({
  //     ...crypto,
  //     currency: value.code,
  //   }));
  // };
  const onCardChange = (value) => {
    // console.log(value);
    getCardDetails({ cardCode: value });
    setDetails((state) => ({
      ...state,
      card: value,
      // category: value,
    }));
  };
  return (
    <div style={{}}>
      <div
        style={{ marginBottom: 20, display: "flex", flexDirection: "column" }}
      >
        <label
          className={`${labelStyles.input__label} ${styles.label}`}
          style={{ marginTop: 10, fontSize:25 }}
        >
          {"Gift Card Sale"}
        </label>
        {/* <Radio.Group
          onChange={onRadioChange}
          value={currencyType}
          style={{ marginTop: 10, color:"#921946" }}
        >
          <Radio value={true}>Gift Card</Radio>
          <Radio value={false}>Cryptocurrency</Radio>
        </Radio.Group> */}
      </div>
      {currencyType && (
        <>
          <div style={{ marginBottom: 20 }}>
            <Select
              options={fiatCurrency.map((item) => ({
                render: item.name,
                value: item,
              }))}
              label="Select Currency"
              placeholder="Select Currency"
              value={details.creditCurrency}
              onSelect={onWalletChange}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Select
              options={cards.map((item) => ({
                render: item.name,
                value: item.uid,
              }))}
              label="Select Card"
              placeholder="Select Card"
              value={details.card}
              onSelect={onCardChange}
              //   className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <Select
              options={
                cardDetails
                  ? cardDetails.map((item) => ({
                      render: item.description,
                      value: item,
                    }))
                  : []
              }
              value={details.category}
              onSelect={(value) => {
                // console.log(value);
                setDetails((state) => ({
                  ...state,
                  cardCategory: value,
                  category: value,
                }));
              }}
              //   className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
              label="Select Card Category"
              placeholder="Select Card Category"
              labelClass={styles.label}
              
            />
          </div>
          {/* <br /> */}
          <div style={{ marginBottom: 20 }}>
            <Input
              label="Amount in USD"
              placeholder="Amount in USD"
              value={details.amount}
              type="number"
              onChange={(e) =>
                setDetails((details) => ({
                  ...details,
                  amount: e.target.value,
                }))
              }
              labelClass={styles.label}
              className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
            />
          </div>
          <br />
          <div style={{ marginTop: 20 }}>
            {/* <div className={styles.rate}>
              <span>{`Currency Rate`}</span>
              <span>
                {`${
                  details.creditCurrency && details.creditCurrency
                } ${CommaFormatted(rate_selected)} / $`}
              </span>
            </div> */}
            <div className={styles.rate}>
              <span>{`Card Rate`}</span>
              <span>
                {`${
                  details.creditCurrency && details.creditCurrency
                } ${CommaFormatted(rate_conv)} / $`}
              </span>
            </div>
            <div className={styles.rate}>
              <span>{`Rate`}</span>
              <span>
                {`${
                  details.creditCurrency && details.creditCurrency
                } ${CommaFormatted(total)}`}
              </span>
            </div>
            {/* <div>{CommaFormatted(total)}</div> */}
          </div>
          <br />
        </>
      )}
      {!currencyType && (
        <SellCrypto rates={rates} state={state} setState={setState} />
      )}
    </div>
  );
};
