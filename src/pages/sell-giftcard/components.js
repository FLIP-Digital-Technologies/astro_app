import React, { useState } from "react";
import { Progress, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import Upload from "../../components/upload";
import * as SVG from "../../assets/svg";
import { SuccessfulModal } from "../transactions/components";
import { countryOptions, processImageToCloudinary } from "../../utils/helper";
import { history } from "../../redux/store";

import styles from "../styles.module.scss";

const getHumanForm = (name) =>
  name
    .replace("-", " ")
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");

const getTerm = (item) => {
  switch (item) {
    case "itunes":
      return (
        <div>
          <p>
            This trade is for itunes/apple $50 - $500 (Physical Gift Card and
            ecodes are accepted)
          </p>
          <p>iTunes gift card codes start with X and are 16-digits.</p>
          <p>
            $500 can be done as apple or itunes, Apple store rate is higher but
            takes longer time, please upload via apple store section if you
            would love to redeem $500 as apple.
          </p>
          <p>
            confirm that all info (Card value, Card quantity,country, etc.) are
            accurately uploaded before submission. You will not be able to
            update or modify this once a transaction has been submitted and
            confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete. You do not require a receipt for this trade, you
            can upload it if you have.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section.
          </p>
          <p>
            {" "}
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "walmart":
      return (
        <div>
          <p>
            This trade is for WALMART gift card physical cards only , NO ECODES
            ARE ACCEPTED
          </p>
          <p>All denominations from $100 - 1000 are accepted</p>
          <p>
            Please confirm that all info (Card value, Card quantity,country,
            etc.) are accurately uploaded before submission. You will not be
            able to update or modify this once a transaction has been submitted
            and confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete. You do not require a receipt for this trade, you
            can upload it if you have.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section.
          </p>
          <p>
            Walmart normally takes a while to load , pls be patient . a
            notification will be sent to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "apple":
      return (
        <div>
          <p>
            1. This trade is for USA Apple Store Gift Card Physical Card
            purchased from the store and NOT ecode.
          </p>
          <p>2. The minimum accepted value for this trade is $400. </p>
          <p>
            3 We start redeeming apple store cards at 8 am USA time , 1 pm
            Ghana, 2pm Nigerian time.
          </p>
          <p>Apple store gift card codes start with X and are 16-digits.</p>
          <p>
            confirm that all info (Card value, Card quantity,country, etc.) are
            accurately uploaded before submission. You will not be able to
            update or modify this once a transaction has been submitted and
            confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete. You do not require a receipt for this trade, you
            can upload it if you have.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section
          </p>
          <p>
            Apple store normally takes a while to load , pls be patient . a
            notification will be sent to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "nike":
      return (
        <div>
          <p>
            This Trade is for USA NIKE Gift Card Physical Card Only, Ecodes are
            not accepted.
          </p>
          <p>
            confirm that all info (Card value, Card quantity,country, etc.) are
            accurately uploaded before submission. You will not be able to
            update or modify this once a transacton has been submitted and
            confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete.You do not require a receipt for this trade, you
            can upload it if you have.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section.
          </p>
          <p>
            {" "}
            Nike gift cards normally takes a while to load , pls be patient . a
            notification will be sent to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "visa":
      return (
        <div>
          <p>
            This transaction is for physical VISA gift card starting with either
            of these 4 codes 4358,4034,5113,4912,4852.{" "}
          </p>
          <p>
            Please upload a receipt with the front and back photos of the cards
          </p>
          <p>
            confirm that all info (Card value, Card quantity,country, etc.) are
            accurately uploaded before submission. You will not be able to
            update or modify this once a transacton has been submitted and
            confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete. You do not require a receipt for this trade, you
            can upload it if you have.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section.
          </p>
          <p>
            {" "}
            This trade will take quite a while,pls be patient. a notification
            will be sent to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "amex-gold":
      return (
        <div>
          <p>1. This transaction is for USA American Express Gift Card Physical Card Gold color purchased from the store and NOT ecode. </p>
          <p>2. The acceptable denomination for this trade is between $50 - $500. The total amount can be more, but denomination of each gift card must not be less than $50 and more than $500</p>
          <p>3. Kindly upload receipts with the card front and back photos showing all codes</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take quite a while,pls be patient. a notification will be sent to you after confirmation</p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "amazon":
      return (
        <div>
          <p>1. This transaction is for USA Amazon Gift Card With ll reciepts. You are to upload pictures of receipt(s) and card(s).</p>
          <p>2. Ensure that your pictures are clear and the card number of your receipt and gift card correspond. If the payment receipt doesnt have serial number pls add the activation receipt.</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take only a few minutes. a notification will be sent to you after confirmation</p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "onevailla":
      return (
        <div>
          <p> This trade  is for USA OneVanilla Visa/Mastercard Gift Card Physical Card bought from the store   starting with either of the following 4 digits: 4847, 4358, 4941, 4097, 4142, 4118  5432, 5164, 5432 and 5113</p>
          <p>Pls upload front and back pictures of card showing all codes with the receipt too</p>
          <p>WE DO NOT ACCEPT MYVANILLA GIFT CARDS … ONLY ONEVANILLA IS ACCEPTED</p>
          <p>MYVANILLA TRADES WILL NOT BE PAID FOR</p>
          <p>Ecodes are not accepted</p>
          <p>Please upload receipts along with the cards.</p>
          <p>OneVanilla Visa/Mastercard gift cards transactions can take a while. Please be patient and wait for confirmation from our admin.</p>
          <p>A notification will be sent to you after confirmation</p>
          <p>If you need to ask a question, click the live chat button</p>
        </div>
      )
    case "nordstrom":
      return (
        <div>
          <p>1. This trade  is for USA Nordstrom Gift Card </p>
          <p>2. Make sure that the code is complete, correct and valid.</p>
          <p>3. Nordstrom gift cards have a 16 digit card number and 8 access number</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p> This trade will take quite a while,pls be patient. a notification will be sent to you after confirmation</p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "sephora":
      return (
        <div>
          <p>1. This trade is for USA Sephora and JC penney Gift Card Physical Card  physical and ecode</p>
          <p>2. All denominations accepted</p>
          <p>3.  Sephora gift cards have a 16 digit card number and 8 access number</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take only a few minutes. a notification will be sent to you after confirmation</p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "google-play":
      return (
        <div>
          <p>This trade is for  Google Play Cards (Physical Gift Card and  ecodes are accepted)</p>
          <p>We need more info to redeem your card’ is a possible error with google play cards. We cannot do anything about it if this happens with your card(s)</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take only a few minutes. a notification will be sent to you after confirmation</p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "ebay":
      return (
        <div>
          <p>This trade is for  ebay USD  (Physical Gift Card and  ecodes are accepted)</p>
          <p>“We cant find a gift card with that number”,  “No balance on this card” are common errors related to ebay gift cards, please we do not have a solution for issues like these as of now</p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take only a few minutes. a notification will be sent to you after confirmation</p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    case "steam":
      return (
        <div>
          <p>1. This trade  is for Steam Wallet  Physical Gift Card  and ecodes</p>
          <p>2. All denominations are accepted</p>
          <p>3. Steam Wallet  Physical Gift Card has 15-digits. </p>
          <p>confirm that all info (Card value, Card quantity,country, etc.) are accurately uploaded before submission. You will not be able to update or modify this once a transacton has been submitted and confirmed.</p>
          <p>Make sure that the gift card is properly scratched and the code is clear and complete. You do not require a receipt for this trade, you can upload it if you have.</p>
          <p>Giftcards uploaded in a wrong section will be forwarded to the right column and credited at the current rate in that section.</p>
          <p>This trade will take only a few minutes. a notification will be sent to you after confirmation</p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      )
    default:
      break;
  }
};

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
    wallet: "",
  };

  const [details, setDetails] = useState(INITIAL_STATE);
  const [rate, setRate] = useState({});
  const [progress, setProgress] = useState();
  const [open, setOpen] = useState(false);
  const [openTerm, setOpenTerm] = useState(true);

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

  const showModal = () => {
    setOpenTerm(true);
  };

  const handleOk = () => {
    setOpenTerm(false);
  };

  const handleCancel = () => {
    setOpenTerm(false);
  };

  return (
    <div className={styles.gitcard__form}>
      {open && soldGiftCard && (
        <SuccessfulModal title={"Sold"} onClick={() => history.push("/app")} />
      )}
      <Modal
        header={null}
        footer={null}
        visible={openTerm}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Trade Terms</h3>
        {getTerm(active.name)}
      </Modal>
      <div
        className={styles.gitcard__form__holder}
        style={{ alignItems: "flex-start" }}
      >
        <div onClick={handleBack} className={styles.gitcard__form__link}>
          <SVG.ArrowLeft /> Giftcard
        </div>
        <div
          className={styles.gitcard__form__body__image}
          style={{
            border: "1px solid #805b5b26",
            boxShadow: "-3px 4px 20px #00000026",
            position: "relative",
          }}
        >
          <active.Image />
        </div>
      </div>

      <div className={styles.gitcard__form__body}>
        <div className={styles.gitcard__form__body__holder}>
          <div className={styles.gitcard__form__left}>
            <h3>{active.displayName}</h3>
            <br />
            <div style={{ marginBottom: 20 }}>
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
            <br />
            <div style={{ marginBottom: 20 }}>
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
            <br />
            <div style={{ marginBottom: 20 }}>
              <Select
                options={
                  active[details.country.toLowerCase()] &&
                  active[details.country.toLowerCase()].map((i) => ({
                    value: i[0],
                    name: getHumanForm(i[0]),
                    render: (
                      <div
                        className={styles.countryOption}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <SVG.CardTypePhysical />
                        <span style={{ marginLeft: 10 }}>
                          {getHumanForm(i[0])}
                        </span>
                      </div>
                    ),
                  }))
                }
                value={details.cardType}
                onSelect={onCardTypeChange}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Card Type"
                labelClass={styles.label}
              />
            </div>
            <br />
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
            <br />
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
              {progress && (
                <span>{progress ? `uploading ${progress}%` : ""}</span>
              )}
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
                <strong>Rate</strong>&emsp;
                <span>
                  {rate && rate.rate && rate.rate[details.wallet]}{" "}
                  {details && details.wallet}
                </span>
              </div>
              <div>
                <strong>Value</strong>&emsp;
                <span>
                  {details && details.wallet} {details.total}
                </span>
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
