import React, { useEffect, useState } from "react";
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
import AppFetch from "../../redux/services/FetchInterceptor";
// import { isNum } from "react-toastify/dist/utils";

const { confirm } = Modal;

export const BuySection = ({
  balance,
  rates,
  state,
  setState,
  buyCoins,
  buyBTC,
  loading,
  active,
}) => {
  useEffect(() => {
    state.wallet = undefined
  }, []);

  useEffect(() => {
    rates && rates.ticker && setBtc_usd_rate(rates.ticker.buy);
    // rates && rates.tickers && setBtc_ngn_rate(rates.tickers.BTCNGN.buy);
    // rates && rates.tickers && setBtc_ghs_rate(rates.tickers.BTCGHS.buy);
  }, [rates]);
  const handleChange = ({ target: { name, value } }) => {
    // let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = wallet_btc_rate * value;
      usd = buy_btc_usd_rate * value;
      // usd = 26000 * value;
      // ghs = buy_btc_ghs_rate * value;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / wallet_btc_rate;
      usd = value / (wallet_btc_rate / buy_btc_usd_rate);
      // usd = 26000 * btc;
      // ghs = buy_btc_ghs_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "usd") {
      usd = value;
      btc = value / buy_btc_usd_rate;
      // btc = value / 26000;
      ngn = wallet_btc_rate * btc;
      // ghs = buy_btc_ghs_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: "", usd: "", ngn: "", ghs: "" }));
    }
  };
  // const [current_balance, setCurrent_balance] = useState(0);
  const [buy_btc_usd_rate, setBtc_usd_rate] = useState(0);
  const [buy_btc_ghs_rate, setBtc_ghs_rate] = useState(0);
  const [buy_btc_ngn_rate, setBtc_ngn_rate] = useState(0);
  const [wallet_btc_rate, setWallet_btc_rate] = useState(0);
  const [open, setOpen] = useState(false);
  const showPromiseConfirm = () => {
    confirm({
      title: `Buy ${state.btc} ${active.Currency.code}`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the purchase of ${state.btc} ${active.Currency.code}`,
      onOk() {
        setOpen(true);
        return buyCoins({
          amount: state.btc,
          debitFiatWalletId: state.debitFiatWalletId,
          creditCoinsWalletId: active.id,
        });
      },
      onCancel() {},
    });
  };
  const currencyTicker = async (data) => {
    AppFetch({
      url: `/coins/tickers/${active.Currency.code.toLowerCase()}${data}`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    })
      .then((response) => {
        setWallet_btc_rate(response.data.ticker.buy);
      })
      .catch((err) => {
        notification.error({
          message: "Could not fetch tickers",
          duration:2.5,
        });
      });
  };

  return (
    <div className={styles.transactionCard}>
      {console.log('buy', active)}
      {open && buyBTC && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are Buying</span>
          <span className={styles.sub}>
            {active.Currency.code} {state.btc}
          </span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You will be debited</span>
          <span className={styles.sub}>
            {`${state.wallet ?? ""} `}{state[state.wallet === "NGN" ? "ngn" : "ghs"].toLocaleString()}
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
          Dummy={{ text: `${active.Currency.code} wallet` }}
        />

        <Select
          labelClass={styles.largeMarginLabel}
          hintClass={styles.largeMarginHint}
          label="Pay from"
          placeholder="Choose wallet"
          value={state.wallet}
          name="wallet"
          onSelect={(value) => {
            currencyTicker(value.Currency.code.toLowerCase());
            setState((state) => ({
              ...state,
              wallet: value.Currency.code,
              walletBalance: value.balance,
              debitFiatWalletId: value.id,
              walletInfo: value,
            }));
          }}
          // options={[
          //   {
          //     render: "NGN wallet",
          //     value: "NGN",
          //     disabled: rates?.availability?.buy?.value,
          //   },
          //   {
          //     render: "GHS wallet",
          //     value: "GHS",
          //     disabled: rates?.availability?.buy?.value,
          //   },
          // ]}
          options={balance.fiatWallets
            .filter((item) => item.Currency.code !== "USD")
            .map((item) => ({
              render: `${item.Currency.code} wallet`,
              value: item,
            }))}
          hint={`Current Balance ${Money(state.walletBalance, state.wallet)} `}
        />

        <div className={styles.transactionCard__holder}>
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount (${active.Currency.code})`}
            type="number"
            value={isFinite(state.btc) ? state.btc : 0}
            name="btc"
            onChange={handleChange}
            hint={`Current rate ${Money(buy_btc_usd_rate, "USD")} / ${
              active.Currency.code
            }`}
            placeholder="e.g 0.000011"
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in USD"
            value={state.usd}
            type="number"
            name="usd"
            onChange={handleChange}
          />
        </div>

        <div className={styles.transactionCard__holder}>
          {state?.wallet == "NGN" && (
            <Input
              labelClass={styles.largeMarginLabel}
              label={`Amount in ${state.wallet}`}
              type="number"
              value={isNaN(state.ngn) ? "" : state.ngn}
              hint={`Current rate ${Money(wallet_btc_rate, state.wallet)} / ${
                active.Currency.code
              }`}
              name="ngn"
              onChange={handleChange}
            />
          )}
          {state?.wallet == "GHS" && (
            <Input
              labelClass={styles.largeMarginLabel}
              label={`Amount in ${state.wallet}`}
              type="number"
              value={isNaN(state.ngn) ? "" : state.ngn}
              hint={`Current rate ${Money(wallet_btc_rate, state.wallet)} / ${
                active.Currency.code
              }`}
              name="ngn"
              onChange={handleChange}
            />
          )}
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
  active,
}) => {
  useEffect(() => {
    state.wallet = undefined
  }, []);
  // useEffect(() => {
  //   // balance && balance.BTC && setBtc_current_balance(balance.BTC.balance);
  //   balance &&
  //     balance[state.wallet] &&
  //     setWallet_current_balance(balance[state.wallet].balance);
  // }, [balance, state.wallet]);
  useEffect(() => {
    rates && rates.ticker && setSell_btc_usd_rate(rates.ticker.sell);
    rates && rates.tickers && setSell_btc_ngn_rate(rates.tickers.BTCNGN.sell);
    rates && rates.tickers && setSell_btc_ghs_rate(rates.tickers.BTCGHS.sell);
  }, [rates]);
  const handleChange = ({ target: { name, value } }) => {
    // let ticker = rates && rates.tickers;
    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = wallet_btc_rate * btc;
      usd = sell_btc_usd_rate * btc;
      // usd = 26000 * value;
      ghs = sell_btc_ghs_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / wallet_btc_rate;
      // usd = sell_btc_usd_rate * value;
      usd = value / (wallet_btc_rate / sell_btc_usd_rate);
      // usd = 26000 * btc;
      ghs = sell_btc_ghs_rate * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / sell_btc_usd_rate;
      // btc = value / 26000;
      ngn = wallet_btc_rate * btc;
      ghs = wallet_btc_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / wallet_btc_rate;
      // usd = sell_btc_usd_rate * value;
      usd = value / (wallet_btc_rate / sell_btc_usd_rate);
      // usd = 26000 * btc;
      ngn = wallet_btc_rate * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: "", usd: "", ngn: "", ghs: "" }));
    }
  };
  // const [btc_current_balance, setBtc_current_balance] = useState(0);
  // const [wallet_current_balance, setWallet_current_balance] = useState(0);
  const [sell_btc_usd_rate, setSell_btc_usd_rate] = useState(0);
  const [sell_btc_ghs_rate, setSell_btc_ghs_rate] = useState(0);
  const [sell_btc_ngn_rate, setSell_btc_ngn_rate] = useState(0);
  const [wallet_btc_rate, setWallet_btc_rate] = useState(0);
  const [open, setOpen] = useState(false);
  const showPromiseConfirm = () => {
    confirm({
      title: `Sell ${isFinite(state.btc) ? state.btc : 0} ${
        active.Currency.code
      }`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the sales of ${state.btc} ${active.Currency.code}`,
      onOk() {
        setOpen(true);
        return sellCoins({
          amount: isFinite(state.btc) ? state.btc : 0,
          cryptoWalletId: active.id,
          fiatWalletId: state.fiatWalletId,
        });
      },
      onCancel() {},
    });
  };
  const currencyTicker = async (data) => {
    AppFetch({
      url: `/coins/tickers/${active.Currency.code.toLowerCase()}${data}`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    })
      .then((response) => {
        setWallet_btc_rate(response.data.ticker.sell);
      })
      .catch((err) => {
        notification.error({
          message: "Could not fetch tickers",
          duration:2.5,
        });
      });
  };
  return (
    <div className={styles.transactionCard}>
      {console.log('sell', state.wallet)}
      {open && sellBTC && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are selling</span>
          <span className={styles.sub}>
            {Money(
              isFinite(state.btc) ? state.btc : 0,
              `${active.Currency.code}`
            )}
          </span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You will receive</span>
          <span className={styles.sub}>
          {`${state.wallet ?? ""} `}{state[state.wallet === "NGN" ? "ngn" : "ghs"]}
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
          hintClass={styles.largeMarginHint}
          label="Sell from"
          Dummy={{ text: `${active.Currency.code} wallet` }}
          hint={`Current Balance ${active.balance} `}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          label="Recieve payment to"
          placeholder="Choose wallet"
          value={state.wallet}
          name="wallet"
          onSelect={(value) => {
            currencyTicker(value.Currency.code.toLowerCase());
            // setState((state) => ({ ...state, wallet: value }))
            setState((state) => ({
              ...state,
              wallet: value.Currency.code,
              walletBalance: value.balance,
              fiatWalletId: value.id,
              walletInfo: value,
            }));
          }}
          // options={[
          //   {
          //     render: "NGN wallet",
          //     value: "NGN",
          //     disabled: rates?.availability?.sell?.value,
          //   },
          //   {
          //     render: "GHS wallet",
          //     value: "GHS",
          //     disabled: rates?.availability?.sell?.value,
          //   },
          // ]}
          // hint={`Current Balance ${Money(
          //   wallet_current_balance,
          //   state.wallet
          // )} `}
          options={balance.fiatWallets
            .filter((item) => item.Currency.code !== "USD")
            .map((item) => ({
              render: `${item.Currency.code} wallet`,
              value: item,
            }))}
          hint={`Current Balance ${Money(state.walletBalance, state.wallet)} `}
        />

        <div className={styles.transactionCard__holder}>
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount (${active.Currency.code})`}
            value={isFinite(state.btc) ? state.btc : 0}
            name="btc"
            onChange={handleChange}
            hint={`Current rate ${Money(sell_btc_usd_rate, "USD")} / ${
              active.Currency.code
            }`}
            hintClass={styles.largeMarginHint}
            placeholder="e.g 0.000011"
          />
          <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in USD"
            value={isNaN(state.usd) ? 0 : state.usd.toLocaleString()}
            name="usd"
            onChange={handleChange}
          />
        </div>
        <div className={styles.transactionCard__holder}>
          {state.wallet === "NGN" && (
            <Input
              labelClass={styles.largeMarginLabel}
              label="Amount in NGN"
              value={isNaN(state.ngn) ? 0 : state.ngn.toLocaleString()}
              hint={`Current rate ${Money(wallet_btc_rate, state.wallet)} / ${
                active.Currency.code
              }`}
              name="ngn"
              onChange={handleChange}
            />
          )}
          {state?.wallet == "GHS" && (
            <Input
              labelClass={styles.largeMarginLabel}
              label={`Amount in ${state.wallet}`}
              type="number"
              value={isNaN(state.ngn) ? "" : state.ngn}
              hint={`Current rate ${Money(wallet_btc_rate, state.wallet)} / ${
                active.Currency.code
              }`}
              name="ngn"
              onChange={handleChange}
            />
          )}
          {/* <Input
            labelClass={styles.largeMarginLabel}
            label="Amount in GHC"
            value={isNaN(state.ghs) ? 0 : state.ghs.toLocaleString()}
            hint={`Current rate ${Money(sell_btc_ghs_rate, "USD")} / ${
              active.Currency.code
            }`}
            name="ghs"
            onChange={handleChange}
          /> */}
        </div>
        <Button
          disabled={
            // state.btc > 0
            //   ? true
            //   : false 
              // || 
              loading 
              || !state.wallet
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
  active,
}) => {
  // const [current_balance, setCurrent_balance] = useState(0);
  const [sell_btc_usd_rate, setSell_btc_usd_rate] = useState(0);
  const [sell_btc_ghs_rate, setSell_btc_ghs_rate] = useState(0);
  const [sell_btc_ngn_rate, setSell_btc_ngn_rate] = useState(0);

  // useEffect(() => {
  //   balance && balance.BTC && setCurrent_balance(balance.BTC.balance);
  // }, [balance]);

  useEffect(() => {
    rates && rates.ticker && setSell_btc_usd_rate(rates.ticker.buy);
    rates && rates.tickers && setSell_btc_ngn_rate(rates.tickers.BTCNGN.sell);
    rates && rates.tickers && setSell_btc_ghs_rate(rates.tickers.BTCGHS.sell);
  }, [rates]);

  const handleChange = ({ target: { name, value } }) => {
    // let ticker = rates && rates.tickers;

    let btc, ngn, usd, ghs;
    if (name === "btc") {
      btc = value;
      ngn = sell_btc_ngn_rate * value;
      usd = sell_btc_usd_rate * value;
      // usd = 26000 * value;
      ghs = sell_btc_ghs_rate * value;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / sell_btc_ngn_rate;
      usd = sell_btc_usd_rate * value;
      // usd = 26000 * btc;
      ghs = value / sell_btc_ghs_rate;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "usd") {
      usd = value;
      btc = value / sell_btc_usd_rate;
      // btc = value / 26000;
      ngn = sell_btc_ngn_rate * btc;
      ghs = sell_btc_ghs_rate * btc;
      setState((state) => ({ ...state, btc, usd, ngn, ghs }));
    } else if (name === "ghs") {
      ghs = value;
      btc = value / sell_btc_ghs_rate;
      usd = sell_btc_usd_rate * value;
      // usd = 26000 * btc;
      ngn = sell_btc_ngn_rate * btc;
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
          cryptoWalletId: active.id,
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
          <span className={styles.sub}>
            {state.btc} {active.Currency.code}
          </span>
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
          Dummy={{ Icon: BitcoinInput, text: `${active.Currency.code} wallet` }}
          hint={`Current Balance ${active.balance} `}
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
          label={`Amount in ${active.Currency.code}`}
          type="number"
          value={isNaN(state.btc) ? 0 : state.btc}
          name="btc"
          onChange={handleChange}
          hint={`Current rate ${Money(sell_btc_usd_rate, "USD")} / ${
            active.Currency.code
          }`}
          hintClass={styles.largeMarginHint}
          placeholder=""
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in USD"
          type="number"
          value={isNaN(state.usd) ? 0 : state.usd}
          name="usd"
          onChange={handleChange}
          placeholder="e.g 500"
        />
      </div>
      {/* <div className={styles.transactionCard__holder}>
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          type="number"
          value={isNaN(state.ngn) ? 0 : state.ngn.toLocaleString()}
          hint={`Current rate ${Money(sell_btc_ngn_rate, "USD")} / ${
            active.Currency.code
          }`}
          name="ngn"
          onChange={handleChange}
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in GHC"
          type="number"
          value={isNaN(state.ghs) ? 0 : state.ghs.toLocaleString()}
          hint={`Current rate ${Money(sell_btc_ghs_rate, "USD")} / ${
            active.Currency.code
          }`}
          name="ghs"
          onChange={handleChange}
        />
      </div> */}
      <Button
        text="Send"
        disabled={
          !state.btcAddress || state.btc <= active.balance
            ? true
            : false 
        }
        onClick={() => showPromiseConfirm()}
        form="full"
      />
    </div>
  );
};

export const RecieveSection = ({
  btcRates,
  active,
  btcWalletAddress = "",
  error = false,
  title = "Scan to copy BTC wallet address",
}) => {
  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__holder__sub}>
        <div className={styles.scanSell} style={{ textAlign: "center" }}>
          <h3 style={{ textTransform: "capitalize" }} className={styles.title}>
            {`Scan to copy ${active.Currency.code} wallet address`}
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
                  message: `${active.Currency.code} address copied`,
                  duration: 2.5,
                })
              }
            >
              <Copy title="copy btc address" />
            </Clipboard>
          </div>
          <br />
          {/* <div className={styles.info}>
            Current exchange rate:{" "}
            {Money(
              (btcRates && btcRates.tickers && btcRates.tickers.BTCNGN.sell) ||
                0,
              "NGN"
            )}
            /1{active.Currency.code}
          </div> */}
          {error && <div className={styles.error}>error message</div>}
        </div>
      </div>
    </div>
  );
}; // done
