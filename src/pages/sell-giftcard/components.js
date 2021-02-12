import React, { useState } from "react";
import { Progress } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import Upload from "../../components/upload";
import * as SVG from "../../assets/svg";
import { SuccessfulModal } from "../transactions/components";
import {
  countryOptions,
  cardOptions,
  processImageToCloudinary,
} from "../../utils/helper";
import { history } from "../../redux/store";

import styles from "../styles.module.scss";

export const GiftCardForm = ({
  active,
  handleBack,
  SellGiftCard,
  soldGiftCard,
}) => {
  const INITIAL_STATE = {
    country: "",
    cardType: "",
    amount: 0,
    number: 1,
    total: 0,
    file: [],
    wallet: "ng"
  };

  const [details, setDetails] = useState(INITIAL_STATE);
  const [rate, setRate] = useState({});
  const [progress, setProgress] = useState();
  const [open, setOpen] = useState(false);

  const onCountryChange = (value) => {
    setDetails((details) => ({ ...details, country: value, cardType: "" }));
  };

  const onCardTypeChange = (value) => {
    setRate(
      active[details.country.toLowerCase()].filter((i) =>
        value.includes(i[0])
      )[0][1]
    );
    setDetails((details) => ({ ...details, cardType: value }));
  };

  const onAmountChange = (value) => {
    setDetails((details) => ({
      ...details,
      amount: value,
      total: rate.rate.NGN * value * details.number,
    }));
  };

  const onNumberChange = ({ target: { value } }) => {
    setDetails((details) => ({
      ...details,
      number: value,
      total: rate.rate.NGN * value * details.amount,
    }));
  };

  const onHandleFile = (file) => {
    setDetails((details) => ({ ...details, file: [...details.file, file] }));
  };

  const onWalletChange = (value) => {
    setDetails((details) => ({ ...details, wallet: value }));
  };

  const handleDelete = (index) => {
    let file = details.file;
    file = file.filter((f, i) => i !== index);
    setDetails((details) => ({ ...details, file }));
  };

  const handleSubmit = async () => {
    if (details.file.length === 0) {
      return;
    }
    const resFile = await Promise.all(
      details.file.map((i) =>
        processImageToCloudinary(
          i,
          console.log,
          setProgress,
          "biguncleyemi",
          "tejczmke"
        )
      )
    );
    const payload = {
      referenceCurrency: details && details.wallet,
      imageURLs: resFile,
      amount: details.amount,
      quantity: details.number,
      cardCode: `${active.name}.${details.country.toLowerCase()}.${
        details.cardType
      }`,
    };
    await SellGiftCard(payload);
    setOpen(true);
  };

  return (
    <div className={styles.gitcard__form}>
      {open && soldGiftCard && (
        <SuccessfulModal title={"Sold"} onClick={() => history.push("/app")} />
      )}
      <div className={styles.gitcard__form__holder}>
        <div onClick={handleBack} className={styles.gitcard__form__link}>
          <SVG.ArrowLeft /> Giftcard
        </div>
        <div className={styles.gitcard__form__body__image}>
          <active.Image />
        </div>
      </div>

      <div className={styles.gitcard__form__body}>
        <div className={styles.gitcard__form__body__holder}>
          <div className={styles.gitcard__form__left}>
            <div style={{marginBottom: 20}}>
              <Select
                options={[
                  { render: "NGN wallet", value: "NGN" },
                  { render: "GHS wallet", value: "GHS" },
                ]}
                value={details.wallet}
                onSelect={onWalletChange}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Select wallet to credit"
                labelClass={styles.label}
              />
            </div>
            <br/>
            <div style={{marginBottom: 20}}>
              <Select
                options={countryOptions.filter((i) => {
                  return (
                    active[active.name].filter((ki) =>
                      i.value.toLowerCase().includes(ki.name)
                    ).length > 0
                  );
                })}
                value={details.country}
                onSelect={onCountryChange}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Select Country"
                labelClass={styles.label}
              />
            </div>
            <br/>
            <div style={{marginBottom: 20}}>
              <Select
                options={cardOptions.filter((i) => {
                  return (
                    details.country.toLowerCase() &&
                    active[details.country.toLowerCase()].filter((ki) =>
                      i.value.toLowerCase().includes(ki[0])
                    ).length > 0
                  );
                })}
                value={details.cardType}
                onSelect={onCardTypeChange}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Card Type"
                labelClass={styles.label}
              />
            </div>
            <br/>
            <div>
              <Input
                label="Card value"
                placeholder="Enter card value"
                value={details.amount}
                type="number"
                min={rate && rate.min}
                max={rate && rate.max}
                onChange={(e) => onAmountChange(e.target.value)}
                labelClass={styles.label}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                disabled={!rate}
              />
            </div>
            <br/>
            <div>
              <Input
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                value={details.number}
                label="Quantity"
                placeholder="minimum is 1"
                labelClass={styles.label}
                onChange={onNumberChange}
                type="number"
              />
            </div>
              <div className={styles.gitcard__form__upload}>
              {progress && <span>{progress ? `uploading ${progress}%` : ""}</span>}
              {progress && <Progress percent={progress} status="active" />}
              <Upload handleFile={onHandleFile} />
              {details.file.length > 0 && (
                <div>
                  <p>Uploaded files</p>
                  <ul>
                    {details.file.map((file, index) => (
                      <li key={index}>
                        <span style={{ marginRight: 7 }}>{file.name}</span>
                        <CloseCircleOutlined
                          onClick={() => handleDelete(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className={styles.gitcard__form__right}>
            <div className={styles.gitcard__form__info}>
              <h3>Info</h3>
              <div>
                <strong>Rate</strong>&emsp;<span>{rate && rate.rate && rate.rate[details.wallet]} {details && details.wallet}</span>
              </div>
              <div>
                <strong>Value</strong>&emsp;
                <span>{details && details.wallet} {details.total}</span>
              </div>
            </div>
            <Button
              className={`${styles.gitcard__form__body__input}`}
              text="Submit"
              form="full"
              disabled={
                details.file.length === 0 ||
                !details.number ||
                !details.amount ||
                !details.total ||
                !details.cardType ||
                !details.country
              }
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
