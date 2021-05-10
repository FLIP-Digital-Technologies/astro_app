import React, { useState, useEffect } from "react";
import { Progress, Modal, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import Upload from "../../components/upload";
import * as SVG from "../../assets/svg";
import { SuccessfulModal } from "../transactions/components";
import {
  // countryOptions,
  processImageToCloudinary,
  Money,
} from "../../utils/helper";
import { history } from "../../redux/store";

import styles from "../styles.module.scss";
import { connect } from "react-redux";
import {
  getGiftCardCodes,
  getGiftCardDetails,
  initialGiftCardSale,
  uploadFileToBucket,
} from "../../redux/actions/giftCard";

// const getHumanForm = (name) =>
//   name
//     .replace("-", " ")
//     .split(" ")
//     .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
//     .join(" ");

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
          <p>
            1. This transaction is for USA American Express Gift Card Physical
            Card Gold color purchased from the store and NOT ecode.{" "}
          </p>
          <p>
            2. The acceptable denomination for this trade is between $50 - $500.
            The total amount can be more, but denomination of each gift card
            must not be less than $50 and more than $500
          </p>
          <p>
            3. Kindly upload receipts with the card front and back photos
            showing all codes
          </p>
          <p>
            confirm that all info (Card value, Card quantity,country, etc.) are
            accurately uploaded before submission. You will not be able to
            update or modify this once a transacton has been submitted and
            confirmed.
          </p>
          <p>
            Make sure that the gift card is properly scratched and the code is
            clear and complete.
          </p>
          <p>
            Giftcards uploaded in a wrong section will be forwarded to the right
            column and credited at the current rate in that section.
          </p>
          <p>
            This trade will take quite a while,pls be patient. a notification
            will be sent to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "amazon":
      return (
        <div>
          <p>
            1. This transaction is for USA Amazon Gift Card With ll reciepts.
            You are to upload pictures of receipt(s) and card(s).
          </p>
          <p>
            2. Ensure that your pictures are clear and the card number of your
            receipt and gift card correspond. If the payment receipt doesnt have
            serial number pls add the activation receipt.
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
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "onevanilla":
      return (
        <div>
          <p>
            {" "}
            This trade is for USA OneVanilla Visa/Mastercard Gift Card Physical
            Card bought from the store starting with either of the following 4
            digits: 4847, 4358, 4941, 4097, 4142, 4118 5432, 5164, 5432 and 5113
          </p>
          <p>
            Pls upload front and back pictures of card showing all codes with
            the receipt too
          </p>
          <p>
            WE DO NOT ACCEPT MYVANILLA GIFT CARDS … ONLY ONEVANILLA IS ACCEPTED
          </p>
          <p>MYVANILLA TRADES WILL NOT BE PAID FOR</p>
          <p>Ecodes are not accepted</p>
          <p>Please upload receipts along with the cards.</p>
          <p>
            OneVanilla Visa/Mastercard gift cards transactions can take a while.
            Please be patient and wait for confirmation from our admin.
          </p>
          <p>A notification will be sent to you after confirmation</p>
          <p>If you need to ask a question, click the live chat button</p>
        </div>
      );
    case "nordstrom":
      return (
        <div>
          <p>1. This trade is for USA Nordstrom Gift Card </p>
          <p>2. Make sure that the code is complete, correct and valid.</p>
          <p>
            3. Nordstrom gift cards have a 16 digit card number and 8 access
            number
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
    case "sephora":
      return (
        <div>
          <p>
            1. This trade is for USA Sephora and JC penney Gift Card Physical
            Card physical and ecode
          </p>
          <p>2. All denominations accepted</p>
          <p>
            3. Sephora gift cards have a 16 digit card number and 8 access
            number
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
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "google-play":
      return (
        <div>
          <p>
            This trade is for Google Play Cards (Physical Gift Card and ecodes
            are accepted)
          </p>
          <p>
            We need more info to redeem your card’ is a possible error with
            google play cards. We cannot do anything about it if this happens
            with your card(s)
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
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p> If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "ebay":
      return (
        <div>
          <p>
            This trade is for ebay USD (Physical Gift Card and ecodes are
            accepted)
          </p>
          <p>
            “We cant find a gift card with that number”, “No balance on this
            card” are common errors related to ebay gift cards, please we do not
            have a solution for issues like these as of now
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
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    case "steam":
      return (
        <div>
          <p>1. This trade is for Steam Wallet Physical Gift Card and ecodes</p>
          <p>2. All denominations are accepted</p>
          <p>3. Steam Wallet Physical Gift Card has 15-digits. </p>
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
            This trade will take only a few minutes. a notification will be sent
            to you after confirmation
          </p>
          <p>If you need to ask a question, pls reach us via the live chat.</p>
        </div>
      );
    default:
      break;
  }
};

const GiftCardForm = ({
  active,
  handleBack,
  SellGiftCard,
  soldGiftCard,
  loading,
  getCardDetails,
  cardDetails,
  userWallets,
  fiatCurrency,
}) => {
  const INITIAL_STATE = {
    country: "",
    cardCurrencyId: "",
    giftCardId: "",
    cardType: "",
    fiatCurrencyId: "",
    value: null,
    amount: 0,
    number: 1,
    total: 0,
    file: [],
    wallet: "",
    remark: "",
  };
  // const INITIAL_STATE2 = {};

  const [details, setDetails] = useState(INITIAL_STATE);
  // const [state, setState] = useState(INITIAL_STATE2);
  // const [rate, setRate] = useState({});
  const [progress, setProgress] = useState();
  const [open, setOpen] = useState(false);
  const [openTerm, setOpenTerm] = useState(true);
  // const [canTrade, SetCanTrade] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [rate_selected, setRate_selected] = useState("");

  useEffect(() => {
    getCardDetails({ cardCode: active.uid });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let fiatCurrencyUsed = fiatCurrency.filter(
      (item) => item.code === details.wallet
    )[0];
    details && details.cardType && details.cardType === "physical"
      ? setTotal(
          details.amount &&
            details.value.physical[details.amount] *
              details.amount *
              parseFloat(fiatCurrencyUsed.we_buy, 10)
        )
      : details.cardType === "ecode"
      ? setTotal(
          details.amount &&
            details.value.ecode[details.amount] *
              details.amount *
              parseFloat(fiatCurrencyUsed.we_buy, 10)
        )
      : setTotal(0);

    // getCardDetails({ cardCode: active.uid });
    // eslint-disable-next-line
  }, [details]);

  // React.useEffect(() => {
  //   if (rate.rate) {
  //     setDetails((details) => ({
  //       ...details,
  //       total: rate.rate[details.wallet] * details.amount,
  //     }));
  //   }
  // }, [rate, details.wallet, details.country, details.cardType]);

  // const onCountryChange = (value) => {
  //   setDetails((details) => ({
  //     ...details,
  //     country: value,
  //     cardType: "",
  //     amount: "",
  //   }));
  // };

  // const onCardTypeChange = (value) => {
  //   SetCanTrade(
  //     active[details.country.toLowerCase()].filter((i) =>
  //       value.includes(i[0])
  //     )[0][1]?.isAvailable
  //   );
  //   if (
  //     !active[details.country.toLowerCase()].filter((i) =>
  //       value.includes(i[0])
  //     )[0][1]?.isAvailable
  //   ) {
  //     return notification.error({
  //       message: "Unavailable Card Type",
  //       description: `${getHumanForm(value)} is currently unavailable`,
  //     });
  //   }
  //   setRate(
  //     active[details.country.toLowerCase()].filter((i) =>
  //       value.includes(i[0])
  //     )[0][1]
  //   );
  //   setDetails((details) => ({ ...details, cardType: value, amount: 0 }));
  // };

  // const onAmountChange = (value) => {
  //   setDetails((details) => ({
  //     ...details,
  //     amount: value,
  //     total: rate.rate[details.wallet] * value,
  //   }));
  // };

  // const onNumberChange = ({ target: { value } }) => {
  //   setDetails((details) => ({
  //     ...details,
  //     number: value,
  //     total: rate.rate.NGN * value * details.amount,
  //   }));
  // };

  const onHandleFile = (file) => {
    setDetails((details) => ({ ...details, file: [...details.file, file] }));
  };

  const onWalletChange = (value) => {
    let fiatCurrencyUsed = fiatCurrency.filter(
      (item) => item.code === value.Currency.code
    )[0];
    setDetails((details) => ({
      ...details,
      wallet: value.Currency.code,
      fiatCurrencyId: value.id,
      country: "",
      cardType: "",
      amount: "",
    }));
    setRate_selected(fiatCurrencyUsed.we_buy);
  };

  const handleDelete = (index) => {
    let file = details.file;
    file = file.filter((f, i) => i !== index);
    setDetails((details) => ({ ...details, file }));
  };

  const handleSubmit = async () => {
    setUploadLoading(true);
    if (details.file.length === 0) {
      return;
    }
    const resFile = await Promise.all(
      details.file.map((i) =>
        processImageToCloudinary(i, console.log, setProgress)
      )
    );
    const payload = {
      sellerRemarks: details.remark,
      imageURLs: resFile,
      amount: parseInt(details.amount),
      fiatCurrencyId: details.fiatCurrencyId,
      cardType: details.cardType,
      cardCurrencyId: details.cardCurrencyId,
      giftCardId: active._id,
    };
    if (resFile[0] === "error") {
      return notification.error({
        message: "Could not upload Image",
      });
    } else {
      await SellGiftCard(payload);
    }

    // console.log('payloads',payload)

    setOpen(true);
    setUploadLoading(false);
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
        <SuccessfulModal
          title={
            "Your card has been received, kindly wait 10-15 minutes, check the progress of trade on the 'Transactions' tab"
          }
          onClick={() => history.push("/app")}
        />
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
          <img src={active.image} height="151.692" width="241" alt="card" />
        </div>
      </div>

      <div className={styles.gitcard__form__body}>
        <div className={styles.gitcard__form__body__holder}>
          <div className={styles.gitcard__form__left}>
            <h2>
              <strong>{active.displayName}</strong>
            </h2>
            <br />
            <div style={{ marginBottom: 20 }}>
              <Select
                // options={[
                //   { render: "NGN wallet", value: "NGN" },
                //   { render: "GHS wallet", value: "GHS" },
                // ]}
                options={userWallets.fiatWallets.map((item) => ({
                  render: `${item.Currency.code} wallet`,
                  value: item,
                }))}
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
                options={
                  cardDetails[0] &&
                  cardDetails.map((item) => ({
                    render: item.GiftCardCurrency.name,
                    value: item,
                  }))
                }
                value={details.country}
                onSelect={(value) => {
                  setDetails((state) => ({
                    ...state,
                    country: value.GiftCardCurrency.name,
                    cardCurrencyId: value.card_currency_id,
                    giftCardId: value.GiftCard.id,
                    value,
                    cardType: "",
                    amount: "",
                    number: 1,
                    total: 0,
                    file: [],
                    // wallet: "",
                    remark: "",
                  }));
                }}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Select Card Currency"
                labelClass={styles.label}
              />
            </div>
            <br />
            <div style={{ marginBottom: 20 }}>
              <Select
                options={
                  [
                    {
                      render: (
                        <div
                          className={styles.countryOption}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <SVG.CardTypePhysical />
                          <span style={{ marginLeft: 10 }}>{"Physical"}</span>
                        </div>
                      ),
                      value: "physical",
                    },
                    {
                      render: (
                        <div
                          className={styles.countryOption}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <SVG.CardTypePhysical />
                          <span style={{ marginLeft: 10 }}>{"Ecode"}</span>
                        </div>
                      ),
                      value: "ecode",
                    },
                  ]

                  // active[details.country.toLowerCase()].map((i) => ({
                  //   value: i[0],
                  //   name: getHumanForm(i[0]),
                  //   render: (
                  //     <div
                  //       className={styles.countryOption}
                  //       style={{ display: "flex", alignItems: "center" }}
                  //     >
                  //       <SVG.CardTypePhysical />
                  //       <span style={{ marginLeft: 10 }}>
                  //         {getHumanForm(i[0])}
                  //       </span>
                  //     </div>
                  //   ),
                  // }))
                }
                value={details.cardType}
                onSelect={(value) => {
                  setDetails((state) => ({
                    ...state,
                    cardType: value,
                    // fiatCurrencyId: "",
                    amount: "",
                    number: 1,
                    total: 0,
                    file: [],
                    // wallet: "",
                    remark: "",
                  }));
                }}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                label="Card Type"
                labelClass={styles.label}
              />
            </div>
            <br />
            <div>
              {details && details.cardType && (
                <Select
                  labelClass={styles.largeMarginLabel}
                  hintClass={styles.largeMarginHint}
                  label="Select amount"
                  value={details.amount}
                  name="amount"
                  onSelect={(value) => {
                    setDetails((state) => ({
                      ...state,
                      amount: value,
                      remark: "",
                    }));
                  }}
                  // options={props?.buyGiftCardDetails?.packages.map((item) => ({
                  //   render: `${props?.buyGiftCardDetails?.currency} ${
                  //     item.value
                  //   } - Price: ${Money(item.usdPrice, "USD")}`,
                  //   value: `${item.value}.${item.amount}`,
                  // }))}
                  options={
                    details.cardType === "physical"
                      ? Object.keys(details.value.physical).map((item) => ({
                          render: `${
                            details.value.GiftCardCurrency.code
                          } ${item} - Price ${Money(
                            details.value.physical[item] * item,
                            "USD"
                          )}`,
                          value: item,
                        }))
                      : Object.keys(details.value.ecode).map((item) => ({
                          render: `${
                            details.value.GiftCardCurrency.code
                          } ${item} - Price ${Money(
                            details.value.physical[item] * item,
                            "USD"
                          )}`,
                          value: item,
                        }))
                  }

                  // hint={<p dangerouslySetInnerHTML={extraInfo()} />}
                />
              )}
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
            <div>
              <Input
                label="Image Remark"
                placeholder="Enter image remark"
                value={details.remark}
                type="text"
                onChange={(e) =>
                  setDetails((details) => ({
                    ...details,
                    remark: e.target.value,
                  }))
                }
                labelClass={styles.label}
                className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
              />
            </div>
            <br />
            <br />
          </div>
          <div className={styles.gitcard__form__right}>
            <div className={styles.gitcard__form__info}>
              <h3>Info</h3>
              <div>
                <strong>Rate</strong>&emsp;
                <span>
                  {details && details.wallet} {rate_selected}
                </span>
              </div>
              <div>
                <strong>Value</strong>&emsp;
                <span>
                  {details && details.wallet} {total}
                </span>
              </div>
            </div>
            <Button
              className={`${styles.gitcard__form__body__input}`}
              text="Submit"
              form="full"
              disabled={
                details.file.length === 0 ||
                !details.amount ||
                // !details.total ||
                !details.cardType ||
                !details.country ||
                // loading ||
                // !canTrade ||
                uploadLoading
              }
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // loading: state.giftCard.loading,
  cardDetails: state.giftCard.cardDetails,
  fileUrl: state.giftCard.fileUrl,
});

const mapDispatchToProps = (dispatch) => ({
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
  SellGiftCard: (data) => {
    dispatch(initialGiftCardSale(data));
  },
  getCardDetails: (data) => {
    dispatch(getGiftCardDetails(data));
  },
  uploadFile: (data) => {
    dispatch(uploadFileToBucket(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardForm);
