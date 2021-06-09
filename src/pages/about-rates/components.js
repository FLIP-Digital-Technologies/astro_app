import React, { useState, useEffect } from "react";
import Select from "../../components/select";
import { Radio } from "antd";
import labelStyles from "../../components/select/styles.module.scss";
import styles from "../styles.module.scss";
import Input from "../../components/input";
import { CommaFormatted } from "../../utils/helper";
import SellCrypto from "./SellCrypto";

export const BuySide = () => {
  const [currencyType, setCurrencyType] = useState(true);
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setCurrencyType(e.target.value);
  };
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <label
          className={`${labelStyles.input__label} ${styles.label}`}
          style={{ marginTop: 10 }}
        >
          {"Select Wallet type to credit"}
        </label>
        <Radio.Group
          onChange={onRadioChange}
          value={currencyType}
          style={{ marginTop: 10 }}
        >
          <Radio value={true}>Gift Card</Radio>
          <Radio disabled value={false}>
            Cryptocurrency
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export const SellSide = ({ rates, fiatCurrency, getCardDetails, cardDetails, cryptoCurrency }) => {
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
  const INITIAL_STATE2 = {
    currency: "",
    creditCurrency: "",
    category: "",
  };

  const [details, setDetails] = useState(INITIAL_STATE);
  const [crypto, setCrypto] = useState(INITIAL_STATE2)
  const [total, setTotal] = useState(0);
  const [currencyType, setCurrencyType] = useState(true);
  const [rate_selected, setRate_selected] = useState("");
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    ghs: 0,
    walletBalance: 0,
    // creditCoinsWalletId:
  });

  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setCurrencyType(e.target.value);
  };
  useEffect(() => {
    let walletRate =
      fiatCurrency &&
      fiatCurrency.length > 0 &&
      fiatCurrency.filter((item) => item.code === details.creditCurrency)[0];
      console.log(details.creditCurrency)
    walletRate &&
      walletRate.we_buy &&
      details &&
      details.category &&
      setTotal(details.amount * walletRate.we_buy * details.category.rate);
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
  const onCryptoWalletChange = (value) => {
    let cryptoCurrencyUsed = cryptoCurrency.filter(
      (item) => item.code === value.code
    )[0];

setCrypto((crypto) => ({
  ...crypto,
  currency:value.code
}))    
  };
  const onCardChange = (value) => {
    console.log(value);
    getCardDetails({ cardCode: value });
    setDetails((state) => ({
        ...state,
        card: value,
        // category: value,
      }));
  };
  let data = [
    {
      id: 1,
      name: "Amazon",
      uid: "amazon",
      image: "https/img.com/img",
      created_at: "2021-04-12T11:05:27.000Z",
      updated_at: "2021-04-12T11:05:27.000Z",
    },
    {
      id: 2,
      name: "Amex Gold",
      uid: "amex-gold",
      image: "https/img.com/img",
      created_at: "2021-04-12T11:05:27.000Z",
      updated_at: "2021-04-12T11:05:27.000Z",
    },
    {
      id: 3,
      name: "Ebay",
      uid: "ebay",
      image: "https/img.com/img",
      created_at: "2021-04-12T11:05:27.000Z",
      updated_at: "2021-04-12T11:05:27.000Z",
    },
  ];
  return (
    <div style={{}}>
      <div
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
          style={{ marginTop: 10 }}
        >
          <Radio value={true}>Gift Card</Radio>
          <Radio value={false}>Cryptocurrency</Radio>
        </Radio.Group>
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
              options={data.map((item) => ({
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
                  console.log(value)
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
              placeholder={"Card Category"}
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
              <div className={styles.rate}>
                   <span>{`Rate `}
                   </span>
                   <span>{`${details.creditCurrency && details.creditCurrency} ${CommaFormatted(total)}`}
                   </span>
                   </div>
              {/* <div>{CommaFormatted(total)}</div> */}
            
          </div>
          <br />
        </>
      )}
      {!currencyType && (
          <SellCrypto
          rates={rates}
          state={state}
          setState={setState}
          />
      )}
    </div>
  );
};
