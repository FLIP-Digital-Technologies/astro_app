import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { WalletCarrdBG, ArrowRight } from "../../assets/svg";
import Input from "../../components/input";
import Button from "../../components/button";
import { BitcoinInput } from "../../assets/svg";
import styles from "../styles.module.scss";
import { Money } from "../../utils/helper";
import { SuccessfulModal } from "../transactions/components";
import { history } from "../../redux/store";

const { confirm } = Modal;

export const WalletCard = ({
  walletName,
  handleView,
  name,
  amount,
  rate,
  action = true,
}) => {
  return (
    <div className={styles.walletHolder}>
      <div className={styles.walletCard}>
        <WalletCarrdBG className={styles.walletCard__bg} />
        <div className={styles.walletCard__content}>
          <div className={styles.walletCard__content__top}>
            {action && (
              <>
                <span onClick={handleView}> View Details </span> <ArrowRight />
              </>
            )}
          </div>
          <div className={styles.walletCard__content__main}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>{amount}</div>
            {rate ||
              (typeof rate === "number" && (
                <div className={styles.rate}>Rates: {rate}/$</div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.walletCard__name}>{walletName}</div>
    </div>
  );
};

export const SendSection = ({ balance, rates, state, setState }) => {
  const handleChange = ({ target: { name, value } }) => {
    let ticker = rates && rates.tickers;
    let btc, ngn, usd;
    if (name === "btc") {
      btc = value;
      ngn = ticker && ticker.btcngn.sell * value;
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * value;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "ngn") {
      ngn = value;
      btc = value / (ticker && ticker.btcngn.sell);
      // usd = ticker && ticker.tickers.btcusd.sell * value;
      usd = 26000 * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    } else if (name === "usd") {
      usd = value;
      // btc = value / (ticker && ticker.btcusd.sell);
      btc = value / 26000;
      ngn = ticker && ticker.btcngn.sell * btc;
      setState((state) => ({ ...state, btc, usd, ngn }));
    }
    if (!value) {
      setState((state) => ({ ...state, btc: 0, usd: 0, ngn: 0 }));
    }
  };

  const handleAddress = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  return (
    <div className={styles.transactionCard}>
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
            rates && rates.tickers && Money(rates.tickers.btcngn.sell, "NGN")
          } / BTC`}
          hintClass={styles.largeMarginHint}
          placeholder=""
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          onChange={handleChange}
          placeholder="e.g 500"
        />
      </div>
      {/* <div className={styles.transactionCard__holder__sub}>
        <Button text="Send" form="full" />
      </div> */}
    </div>
  );
};

export const DetailsSection = ({
  state,
  sellCoinsExternal,
  sellBTCExternal,
}) => {
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
    <div className={styles.detailsCard}>
      {sellBTCExternal && (
        <SuccessfulModal onClick={() => history.push("/app")} />
      )}
      <h2 className={styles.detailsCard__title}>Details</h2>
      <div className={styles.detailsCard__list}>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>You are sending</span>
          <span className={styles.sub}>{Money(state.btc, "BTC")}</span>
        </div>
        <div className={styles.detailsCard__list__item}>
          <span className={styles.main}>Amount in NGN</span>
          <span className={styles.sub}>{Money(state.ngn, "NGN")}</span>
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
      <Button
        text="Send"
        disabled={
          !state.btcAddress || parseInt(state.ngn, 10) < 499 ? true : false
        }
        onClick={() => showPromiseConfirm()}
        form="full"
      />
    </div>
  );
};
