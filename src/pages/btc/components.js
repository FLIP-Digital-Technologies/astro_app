import React, { useState } from "react";
import { notification, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import styles from "../styles.module.scss";
import Clipboard from "react-clipboard.js";
import { Copy } from "../../assets/svg";
import { QRCode, Money } from "../../utils/helper";
import { BitcoinInput } from "../../assets/svg";
import { SuccessfulModal } from "../transactions/components";
import { history } from "../../redux/store";

const { confirm } = Modal;

export const BuySection = ({
  balance,
  rates,
  state,
  setState,
  buyCoins,
  buyBTC,
  loading,
}) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.BTCNGN.buy * value;
      usd = ticker && ticker.tickers.BTCUSD.buy * value;
      // usd = 26000 * value;
      ghs = ticker && ticker.BTCGHS.buy * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.BTCNGN.buy);
      usd = ticker && ticker.tickers.BTCUSD.buy * value;
      // usd = 26000 * btc;
      ghs = ticker && ticker.BTCGHS.buy * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / (ticker && ticker.BTCUSD.buy);
      // btc = value / 26000;
      ngn = ticker && ticker.BTCNGN.buy * btc;
      ghs = ticker && ticker.BTCGHS.buy * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / (ticker && ticker.BTCGHS.buy);
      usd = ticker && ticker.tickers.BTCUSD.buy * value;
      // usd = 26000 * btc;
      ngn = ticker && ticker.BTCNGN.buy * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0, ghs: 0 }));
    }
  };
  const [open, setOpen] = useState(false);
  const showPromiseConfirm = () => {
    confirm({
      title: `Buy ${state.btc} BTC`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the purchase of ${state.btc} BTC`,
      onOk() {
        setOpen(true);
        return buyCoins({ amount: state.btc, referenceCurrency: state.wallet });
      },
      onCancel() {},
    });
  };

  return (
    <div className={styles.transactionCard}>
      {open && buyBTC && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are Buying</span>
          <span className={styles.sub}>BTC {state.btc}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You will be debited</span>
          <span className={styles.sub}>
            {Money(state[state.wallet === "NGN" ? "ngn" : "ghs"], state.wallet)}
          </span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Fees</span>
          <span className={`${styles.sub} ${styles.light}`}>0</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Should arrive</span>
          <span className={`${styles.sub} ${styles.light}`}>In 5 Seconds</span>
        </div>
      </div>
      <hr />
      <br />
      <div className={styles.transactionCard__holder__sub}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Buy to"
          Dummy={{ text: "BTC wallet" }}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Pay from"
          placeholder="Choose wallet"
          value={state.wallet}
          name="wallet"
          onSelect={(value) =>
            setState((state) => ({ ...state, wallet: value }))
          }
          options={[
            { render: "NGN wallet", value: "NGN", disabled: rates?.availability?.buy?.value },
            { render: "GHS wallet", value: "GHS", disabled: rates?.availability?.buy?.value },
          ]}
          hint={`Current Balance ${
            balance &&
            balance[state.wallet] &&
            Money(balance[state.wallet].balance, state.wallet)
          } `}
        />

        <div className={styles.transactionCard__holder}>
          <Input
            label="Amount (BTC)"
            value={state.btc}
            name="btc"
            onChange={handleChange}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCUSD.buy, "USD")
            } / BTC`}
            placeholder="e.g 0.000011"
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in USD"
            value={state.usd}
            name="usd"
            onChange={handleChange}
          />
        </div>

        <div className={styles.transactionCard__holder}>
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in NGN"
            value={state.ngn}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCNGN.buy, "USD")
            } / BTC`}
            name="ngn"
            onChange={handleChange}
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in GHC"
            value={state.ghs}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCGHS.buy, "USD")
            } / BTC`}
            name="ghs"
            onChange={handleChange}
          />
        </div>
        <Button
          disabled={
            parseInt(state.ngn, 10) < 499
              ? true
              : false || loading || !state.wallet
          }
          onClick={() => showPromiseConfirm()}
          className={styles.sellPage__btn}
          form="full"
        >
          BUY
        </Button>
      </div>
    </div>
  );
};

export const SellSection = ({
  balance,
  rates,
  state,
  setState,
  sellCoins,
  sellBTC,
  loading,
}) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.BTCNGN.sell * value;
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * value;
      ghs = ticker && ticker.BTCGHS.sell * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.BTCNGN.sell);
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * btc;
      ghs = (ticker && ticker.BTCGHS.sell) * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / (ticker && ticker.BTCUSD.sell);
      // btc = value / 26000;
      ngn = ticker && ticker.BTCNGN.sell * btc;
      ghs = ticker && ticker.BTCGHS.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / (ticker && ticker.BTCGHS.sell);
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * btc;
      ngn = ticker && ticker.BTCNGN.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0, ghs: 0 }));
    }
  };
  const [open, setOpen] = useState(false);
  const showPromiseConfirm = () => {
    confirm({
      title: `Sell ${state.btc} BTC`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the sales of ${state.btc} BTC`,
      onOk() {
        setOpen(true);
        return sellCoins({
          amount: state.btc,
          referenceCurrency: state.wallet,
        });
      },
      onCancel() {},
    });
  };
  return (
    <div className={styles.transactionCard}>
      {open && sellBTC && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are selling</span>
          <span className={styles.sub}>{Money(state.btc, "BTC")}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You will receive</span>
          <span className={styles.sub}>
            {Money(state[state.wallet === "NGN" ? "ngn" : "ghs"], state.wallet)}
          </span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Fees</span>
          <span className={`${styles.sub} ${styles.light}`}>₦0</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Should arrive</span>
          <span className={`${styles.sub} ${styles.light}`}>In 5 Seconds</span>
        </div>
      </div>
      <hr />
      <br />
      <div className={styles.transactionCard__holder__sub}>
        <Input
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Sell from"
          Dummy={{ text: "BTC wallet" }}
          hint={`Current Balance ${
            balance && balance.BTC && Money(balance.BTC.balance, "BTC")
          } `}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          label="Recieve payment to"
          placeholder="Choose wallet"
          value={state.wallet}
          name="wallet"
          onSelect={(value) =>
            setState((state) => ({ ...state, wallet: value }))
          }
          options={[
            { render: "NGN wallet", value: "NGN", disabled: rates?.availability?.sell?.value },
            { render: "GHS wallet", value: "GHS", disabled: rates?.availability?.sell?.value },
          ]}
          hint={`Current Balance ${
            balance &&
            balance[state.wallet] &&
            Money(balance[state.wallet].balance, state.wallet)
          } `}
        />

        <div className={styles.transactionCard__holder}>
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount (BTC)"
            value={state.btc}
            name="btc"
            onChange={handleChange}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCUSD.sell, "USD")
            } / BTC`}
            hintClass={styles.largeMarginHint}
            placeholder="e.g 0.000011"
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in USD"
            value={state.usd}
            name="usd"
            onChange={handleChange}
          />
        </div>
        <div className={styles.transactionCard__holder}>
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in NGN"
            value={state.ngn}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCNGN.sell, "USD")
            } / BTC`}
            name="ngn"
            onChange={handleChange}
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in GHC"
            value={state.ghs}
            hint={`Current rate ${
              rates && rates.tickers && Money(rates.tickers.BTCGHS.sell, "USD")
            } / BTC`}
            name="ghs"
            onChange={handleChange}
          />
        </div>
        <Button
          disabled={
            parseInt(state.ngn, 10) < 499
              ? true
              : false || loading || !state.wallet
          }
          onClick={() => showPromiseConfirm()}
          className={styles.sellPage__btn}
          form="full"
        >
          SELL
        </Button>
      </div>
    </div>
  );
};

export const SendSection = ({
  balance,
  rates,
  state,
  setState,
  sellCoinsExternal,
  sellBTCExternal,
  loading,
}) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.BTCNGN.sell * value;
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * value;
      ghs = ticker && ticker.BTCGHS.sell * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.BTCNGN.sell);
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * btc;
      ghs = value / (ticker && ticker.BTCGHS.sell);
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / (ticker && ticker.BTCUSD.sell);
      // btc = value / 26000;
      ngn = ticker && ticker.BTCNGN.sell * btc;
      ghs = ticker && ticker.BTCGHS.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / (ticker && ticker.BTCGHS.sell);
      usd = ticker && ticker.tickers.BTCUSD.sell * value;
      // usd = 26000 * btc;
      ngn = ticker && ticker.BTCNGN.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0, ghs: 0 }));
    }
  };

  const handleAddress = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const showPromiseConfirm = () => {
    confirm({
      title: `Transferring ${state.btc} BTC`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the transfer of ${state.btc} BTC to ${state.btcAddress}`,
      onOk() {
        return sellCoinsExternal({
          amount: state.btc,
          address: state.btcAddress,
        });
      },
      onCancel() {},
    });
  };

  return (
    <div className={styles.transactionCard}>
      {sellBTCExternal && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are sending</span>
          <span className={styles.sub}>{state.btc} BTC</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Amount in USD</span>
          <span className={styles.sub}>{Money(state.usd, "USD")}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Fees</span>
          <span className={`${styles.sub} ${styles.light}`}>US$ 0</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Should arrive</span>
          <span className={`${styles.sub} ${styles.light}`}>In 5 Seconds</span>
        </div>
      </div>
      <hr />
      <br />
      <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Send bitcoin from"
          Dummy={{ Icon: BitcoinInput, text: "BTC wallet" }}
          hint={`Current Balance ${
            balance && balance.BTC && Money(balance.BTC.balance, "BTC")
          } `}
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="To"
          value={state.btcAddress}
          name="btcAddress"
          onChange={handleAddress}
          hint={"Enter the wallet address to send to."}
          hintClass={styles.largeMarginHint}
          placeholder="Enter the wallet address"
        />
      </div>
      <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in BTC"
          value={state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.BTCNGN.sell, "NGN")
          } / BTC`}
          hintClass={styles.largeMarginHint}
          placeholder=""
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in USD"
          value={state.usd}
          name="usd"
          onChange={handleChange}
          placeholder="e.g 500"
        />
      </div>
      <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.BTCNGN.sell, "USD")
          } / BTC`}
          name="ngn"
          onChange={handleChange}
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in GHC"
          value={state.ghs}
          hint={`Current rate ${
            rates && rates.tickers && Money(rates.tickers.BTCGHS.sell, "USD")
          } / BTC`}
          name="ghs"
          onChange={handleChange}
        />
      </div>
      <Button
        text="Send"
        disabled={
          !state.btcAddress || parseInt(state.ngn, 10) < 499
            ? true
            : false || loading || !state.wallet
        }
        onClick={() => showPromiseConfirm()}
        form="full"
      />
    </div>
  );
};

export const RecieveSection = ({
  btcRates,
  btcWalletAddress = "",
  error = false,
  title = "Scan to copy BTC wallet address",
}) => {
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__holder__sub}>
        <div className={styles.scanSell} style={{ textAlign: "center" }}>
          <h3 style={{ textTransform: "capitalize" }} className={styles.title}>
            {title}
          </h3>
          <br />
          <div className={styles.barcode}>
            {QRCode({ text: btcWalletAddress, size: 300 })}
          </div>
          <br />
          <div
            className={styles.copy}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span style={{ border: "1px  solid grey", padding: 8 }}>
              <small>{btcWalletAddress}</small>
            </span>
            <Clipboard
              style={{ padding: 8 }}
              component="div"
              data-clipboard-text={btcWalletAddress}
              onSuccess={() =>
                notification.success({
                  message: "BTC address copied",
                  duration: 3,
                })
              }
            >
              <Copy title="copy btc address" />
            </Clipboard>
          </div>
          <br />
          <div className={styles.info}>
            Current exchange rate:{" "}
            {Money(
              (btcRates && btcRates.tickers && btcRates.tickers.BTCNGN.sell) ||
                0,
              "NGN"
            )}
            /1BTC
          </div>
          {error && <div className={styles.error}>error message</div>}
        </div>
      </div>
    </div>
  );
}; // done
