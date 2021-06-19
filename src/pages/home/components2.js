import React, { useEffect } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { connect } from "react-redux";
import { getFiatCurrencies } from "../../redux/actions/Auths";
import { getBTCWalletDetails } from "../../redux/actions/btc";
import {
  getCurrentFiatTransferRate,
  initialBTCP2PTransferByUser,
  initialFiatP2PByUser,
} from "../../redux/actions/pairTwoPair";
import styles from "../styles.module.scss";
import { Money } from "../../utils/helper";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const PTwoPCrypto = ({
  state,
  setState,
  setOpenModal,
  balance,
  loading,
  pairTwoPairFiatTicker,
  pairTwoPairFiat,
  pairTwoPairFiatDetails,
  pairTwoPairBTC,
  pairTwoPairBTCDetails,
  getFiatP2PRate,
  initializeBTCPair2PairTransaction,
  initializeFiatPairTwoPairTransaction,
  getCurrentUserBal,
  fiatCurrency,
}) => {
  useEffect(() => {
    getFiatP2PRate();
  }, [getFiatP2PRate]);
  useEffect(() => {
    if (pairTwoPairBTC && state.amount) {
      setState({});
      setOpenModal(false);
      getCurrentUserBal();
    }
    // eslint-disable-next-line
  }, [pairTwoPairBTCDetails]);
  useEffect(() => {
    if (pairTwoPairFiat && state.amount) {
      setState({});
      setOpenModal(false);
      getCurrentUserBal();
    }
    // eslint-disable-next-line
  }, [pairTwoPairFiatDetails]);

  const handleP2PTransfer = () => {
    if (state.referenceCurrency === "BTC") {
      let data = {};
      data.amount = state.amount;
      if (validateEmail(state.recipientUsername)) {
        data.recipientEmail = state.recipientUsername;
      } else {
        data.recipientUsername = state.recipientUsername;
      }
      data.transferNote = state.transferNote;
      initializeBTCPair2PairTransaction(data);
    } else {
      let data = {};
      data.amount = state.amount;
      data.referenceCurrency = state.referenceCurrency;
      data.recipientCurrency = state.recipientCurrency;
      data.transferNote = state.transferNote;
      if (validateEmail(state.recipientUsername)) {
        data.recipientEmail = state.recipientUsername;
      } else {
        data.recipientUsername = state.recipientUsername;
      }
      initializeFiatPairTwoPairTransaction(data);
    }
    // setOpenModal(false);
    // setState({});
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select wallet to transfer from."
          value={state.referenceCurrency}
          onSelect={(value) =>
            setState((state) => ({
              ...state,
              referenceCurrency: value.Currency.code,
              walletBalance: value.balance,
              recipientCurrency: "",
              recipientUsername: "",
              amount: "",
              transferNote: "",
            }))
          }
          name="referenceCurrency"
          placeholder="Select Wallet"
          //   options={[
          //     { render: "NGN wallet", value: "NGN" },
          //     { render: "GHS wallet", value: "GHS" },
          //     { render: "BTC wallet", value: "BTC" },
          //   ]}
          options={balance.cryptoWallets.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: item,
          }))}
          hint={`
              Current Balance : ${state.walletBalance ?? 0}
            `}
        />
        {state.referenceCurrency && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select wallet to transfer to."
            value={state.recipientCurrency}
            onSelect={(value) =>
              setState((state) => ({
                ...state,
                recipientCurrency: value.code,
                recipientUsername: "",
              }))
            }
            name="recipientCurrency"
            // options={
            //   state.referenceCurrency === "BTC"
            //     ? [{ render: "BTC wallet", value: "BTC" }]
            //     : [
            //         { render: "NGN wallet", value: "NGN" },
            //         { render: "GHS wallet", value: "GHS" },
            //       ]
            // }
            options={fiatCurrency.map((item) => ({
              render: `${item.code} wallet`,
              value: item,
            }))}
          />
        )}
        {state.recipientCurrency && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Enter Recipient Username or Email`}
            value={state.recipientUsername}
            name="recipientUsername"
            onChange={(e) =>
              setState((state) => ({
                ...state,
                recipientUsername: e.target.value,
                amount: "",
              }))
            }
          />
        )}
        {state.recipientUsername && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount in ${state.referenceCurrency}`}
            value={state.amount}
            name="amount"
            onChange={(e) =>
              setState((state) => ({ ...state, amount: e.target.value }))
            }
            hint={
              state.referenceCurrency === "BTC" ? (
                ``
              ) : (
                <p>
                  Estimated Total amount Recipient will receive:{" "}
                  <strong>{`${Money(
                    pairTwoPairFiatTicker?.tickers[
                      `${state.referenceCurrency}${state.recipientCurrency}`
                    ] * state.amount,
                    state.recipientCurrency
                  )}`}</strong>{" "}
                </p>
              )
            }
          />
        )}
        {state.recipientUsername && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Transfer Note (optional)`}
            value={state.transferNote}
            name="transferNote"
            onChange={(e) =>
              setState((state) => ({ ...state, transferNote: e.target.value }))
            }
          />
        )}
        <Button
          loading={
            loading ||
            !state.amount ||
            !state.recipientUsername ||
            !state.recipientCurrency ||
            !state.referenceCurrency
          }
          onClick={handleP2PTransfer}
          className={styles.airttime__button}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.pairTwoPair.loading,
  pairTwoPairFiatTicker: state.pairTwoPair.pairTwoPairFiatTicker,
  pairTwoPairFiat: state.pairTwoPair.pairTwoPairFiat,
  pairTwoPairFiatDetails: state.pairTwoPair.pairTwoPairFiatDetails,
  pairTwoPairBTC: state.pairTwoPair.pairTwoPairBTC,
  pairTwoPairBTCDetails: state.pairTwoPair.pairTwoPairBTCDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getFiatP2PRate: () => {
    dispatch(getCurrentFiatTransferRate());
  },
  initializeBTCPair2PairTransaction: (data) => {
    dispatch(initialBTCP2PTransferByUser(data));
  },
  initializeFiatPairTwoPairTransaction: (data) => {
    dispatch(initialFiatP2PByUser(data));
  },
  getCurrentUserBal: () => {
    dispatch(getBTCWalletDetails());
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PTwoPCrypto);
