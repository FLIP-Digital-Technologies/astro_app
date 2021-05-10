import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { Area, Tooltip, AreaChart } from "recharts";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { ArrowRight } from "../../assets/svg";
import styles from "../styles.module.scss";
import { Money } from "../../utils/helper";
import {
  convertCurrency,
  getCurrentFiatTransferRate,
  initialBTCP2PTransferByUser,
  initialFiatP2PByUser,
} from "../../redux/actions/pairTwoPair";
import { getBTCWalletDetails } from "../../redux/actions/btc";
import { getFiatCurrencies } from "../../redux/actions/Auths";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const TopUpCard = ({ curr = "", bal = 0, currency, topUpAction }) => {
  return (
    <div className={styles.topUp}>
      <div className={styles.topUp__top}>Your {curr} Balance</div>
      <div className={styles.topUp__price}>{Money(bal, currency)}</div>
      <div
        className={styles.topUp__action}
        style={{ cursor: "pointer" }}
        onClick={topUpAction}
      >
        <span>Top Up </span> <ArrowRight />
      </div>
    </div>
  );
};

export const DiscoFlyout = ({
  state,
  setState,
  getBillPaymentCategory,
  BillPaymentCategory = [],
  loading,
  fiatCurrency,
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      currencyId: state.currencyId,
      amount: state.amount,
      customerNumber: state.customerNumber,
      itemCode: state.itemCode,
    };
    buyAirtime(
      `discos-${state.currency.toLowerCase().substring(0, 2)}`,
      payload
    );
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select Wallet"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value.code,
              currencyId: value._id,
              itemCode: "",
              amount: 0,
              fee: 0,
              customerNumber: "",
            }));
            // console.log("lopsd", value);
            if (value.code === "NGN") {
              getBillPaymentCategory({
                billCategory: `discos-${value.code
                  .toLowerCase()
                  .substring(0, 2)}`,
              });
            } else {
              BillPaymentCategory = [];
            }
          }}
          name="select payment currency"
          options={fiatCurrency.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: {
              code: item.Currency.code,
              _id: item.id,
            },
            _id: item.id,
          }))}
        />
        
        {state.currency in { NGN: "0" } && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select Disco"
            value={state.itemCode}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                itemCode: value.split(".")[0],
                fee: value.split(".")[1],
                amount: 0,
                customerNumber: "",
              }));
            }}
            placeholder="Select Disco"
            options={
              BillPaymentCategory &&
              BillPaymentCategory.data &&
              BillPaymentCategory.data.map((item) => ({
                render: item.name,
                value: `${item.item_code}.${item.fee}`,
              }))
            }
          />
        )}
        {state.itemCode && (
          <React.Fragment>
            <Input
              labelClass={styles.largeMarginLabel}
              label="Meter Number"
              value={state.customerNumber}
              name="Customer Meter Number"
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  customerNumber: e.target.value,
                }))
              }
            />
            <Input
              labelClass={styles.largeMarginLabel}
              label="Amount"
              value={state.amount}
              name="amount"
              onChange={(e) =>
                setState((state) => ({ ...state, amount: e.target.value }))
              }
              hint={`Fee:  ${Money(state.fee, "NGN")}`}
            />
          </React.Fragment>
        )}
        <Button
          loading={
            loading || !state.currency || !state.itemCode || !state.amount
          }
          className={styles.airttime__button}
          onClick={handleAirtime}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export const InternetFlyout = ({
  state,
  setState,
  getBillPaymentCategory,
  BillPaymentCategory = [],
  loading,
  fiatCurrency,
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      currencyId: state.currencyId,
      customerNumber: state.customerNumber,
      amount: state.amount,
      itemCode: state.plan,
    };
    buyAirtime(`data-${state.itemCode}`, payload);
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select Wallet"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value.code,
              currencyId: value._id,
              itemCode: "",
              customerNumber: "",
              amount: 0,
              plan: "",
            }));
          }}
          name="select payment currency"
          // options={[
          //   { render: "NGN", value: "ng" },
          //   // { render: "GHS", value: "gh" },
          // ]}
          options={fiatCurrency.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: {
              code: item.Currency.code,
              _id: item.id,
            },
            _id: item.id,
          }))}
        />
        {state.currency in { NGN: "0" } && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select provider"
            value={state.itemCode}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                itemCode: value,
                customerNumber: "",
                amount: 0,
                plan: "",
              }));
              getBillPaymentCategory({ billCategory: `data-${value}` });
            }}
            placeholder="Sealect a provider"
            options={[
              { render: "MTN", value: "mtn" },
              { render: "Glo", value: "glo" },
              { render: "9Mobile", value: "9mobile" },
              { render: "Airtel", value: "airtel" },
            ]}
          />
        )}
        {state.itemCode && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select Plan"
            value={`${state.plan}.${state.amount}`}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                plan: value.split(".")[0],
                customerNumber: "",
                amount: value.split(".")[1],
              }));
            }}
            placeholder="Select a Plan"
            options={
              BillPaymentCategory &&
              BillPaymentCategory.data &&
              BillPaymentCategory.data.map((item) => ({
                render: item.biller_name,
                value: `${item.item_code}.${item.amount}`,
              }))
            }
          />
        )}
        {state.plan && (
          <React.Fragment>
            <Input
              labelClass={styles.largeMarginLabel}
              label="Phone Number"
              value={state.customerNumber}
              name="Customer Phone Number"
              placeholder="+23***********"
              type="tel"
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  customerNumber: e.target.value,
                }))
              }
            />
            <Input
              labelClass={styles.largeMarginLabel}
              label="Amount"
              value={state.amount}
              readOnly={true}
              name="amount"
              onChange={(e) =>
                setState((state) => ({ ...state, amount: e.target.value }))
              }
            />
          </React.Fragment>
        )}
        <Button
          loading={
            loading ||
            !state.currency ||
            !state.customerNumber ||
            !state.itemCode ||
            !state.amount
          }
          className={styles.airttime__button}
          onClick={handleAirtime}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export const CableFlyout = ({
  state,
  setState,
  getBillPaymentCategory,
  BillPaymentCategory = [],
  loading,
  fiatCurrency,
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      currencyId: state.currencyId,
      customerNumber: state.customerNumber,
      amount: state.amount,
      itemCode: state.itemCode,
    };
    buyAirtime(
      `airtime-${state.currency.toLowerCase().substring(0, 2)}`,
      payload
    );
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select Wallet"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value.code,
              currencyId: value._id,
              plan: "",
              itemCode: "",
              customerNumber: "",
              amount: 0,
            }));
          }}
          name="select payment currency"
          // options={[
          //   { render: "NGN", value: "ng" },
          //   { render: "GHS", value: "gh" },
          // ]}
          options={fiatCurrency.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: {
              code: item.Currency.code,
              _id: item.id,
            },
            _id: item.id,
          }))}
        />
        {state.currency in { NGN: "0", GHS: "1" } && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select Cable TV"
            value={state.plan}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                plan: value,
                itemCode: "",
                customerNumber: "",
                amount: 0,
              }));
              getBillPaymentCategory({ billCategory: value });
            }}
            placeholder="Sealect Cable TV"
            options={
              state.currency === "NGN"
                ? [
                    { render: "DSTV", value: "dstv-ng" },
                    { render: "Gotv", value: "gotv" },
                    { render: "Startimes", value: "startimes" },
                  ]
                : [{ render: "DSTV", value: "dstv-gh" }]
            }
          />
        )}
        {state.plan && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select Plan"
            value={state.itemCode}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                itemCode: value.split(".")[0],
                fee: value.split(".")[1],
                amount: 0,
                customerNumber: "",
              }));
            }}
            placeholder="Select Plan"
            options={
              BillPaymentCategory &&
              BillPaymentCategory.data &&
              BillPaymentCategory.data.map((item) => ({
                render: item.name,
                value: `${item.item_code}.${item.fee}`,
              }))
            }
          />
        )}
        {state.itemCode && (
          <React.Fragment>
            <Input
              labelClass={styles.largeMarginLabel}
              label="Smart Card Number"
              value={state.customerNumber}
              name="Customer Smart Card Number"
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  customerNumber: e.target.value,
                }))
              }
            />
            <Input
              labelClass={styles.largeMarginLabel}
              label="Amount"
              value={state.amount}
              name="amount"
              onChange={(e) =>
                setState((state) => ({ ...state, amount: e.target.value }))
              }
            />
          </React.Fragment>
        )}
        <Button
          loading={
            loading ||
            !state.currency ||
            !state.customerNumber ||
            !state.itemCode ||
            !state.amount
          }
          className={styles.airttime__button}
          onClick={handleAirtime}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export const AirtimeFlyout = ({
  state,
  setState,
  getBillPaymentCategory,
  BillPaymentCategory = [],
  loading,
  fiatCurrency,
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      currencyId: state.currencyId,
      customerNumber: state.customerNumber,
      amount: state.amount,
      itemCode: state.itemCode,
    };
    buyAirtime(
      `airtime-${state.currency.toLowerCase().substring(0, 2)}`,
      payload
    );
    setState({});
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select Wallet"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value.code,
              currencyId: value._id,
              itemCode: "",
              customerNumber: "",
              amount: 0,
            }));
            if (value.code === "GHS") {
              getBillPaymentCategory({
                billCategory: `airtime-${value.code
                  .toLowerCase()
                  .substring(0, 2)}`,
              });
            }
          }}
          name="select payment currency"
          // options={[
          //   { render: "NGN", value: "ng" },
          //   { render: "GHS", value: "gh" },
          // ]}
          options={fiatCurrency.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: {
              code: item.Currency.code,
              _id: item.id,
            },
            _id: item.id,
          }))}
        />
        {state.currency in { NGN: "0", GHS: "1" } && (
          <Select
            labelClass={styles.largeMarginLabel}
            label="Select provider"
            value={state.itemCode}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                itemCode: value,
                customerNumber: "",
                amount: 0,
              }));
            }}
            placeholder="Sealect a provider"
            options={
              state.currency === "NGN"
                ? [
                    { render: "MTN", value: "mtn" },
                    { render: "Glo", value: "glo" },
                    { render: "9Mobile", value: "9mobile" },
                    { render: "Airtel", value: "airtel" },
                  ]
                : BillPaymentCategory &&
                  BillPaymentCategory.data &&
                  BillPaymentCategory.data.map((item) => ({
                    render: item.name,
                    value: item.item_code,
                  }))
            }
          />
        )}
        {state.itemCode && (
          <React.Fragment>
            <Input
              labelClass={styles.largeMarginLabel}
              label="Phone Number"
              value={state.customerNumber}
              name="Customer Phone Number"
              placeholder="+23***********"
              type="tel"
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  customerNumber: e.target.value,
                }))
              }
            />
            <Input
              labelClass={styles.largeMarginLabel}
              label="Amount"
              value={state.amount}
              name="amount"
              onChange={(e) =>
                setState((state) => ({ ...state, amount: e.target.value }))
              }
            />
          </React.Fragment>
        )}
        <Button
          loading={
            loading ||
            !state.currency ||
            !state.customerNumber ||
            !state.itemCode ||
            !state.amount
          }
          className={styles.airttime__button}
          onClick={handleAirtime}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export const FundFlyout = ({
  state,
  setState,
  Fund,
  loading,
  setOpenModal,
  fiatCurrency,
}) => {
  const handleDeposit = () => {
    Fund({ amount: state.amount, currencyId: state.currencyId });
    setOpenModal(true);
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select wallet"
          value={state.currency}
          onSelect={(value) =>
            setState((state) => ({
              ...state,
              currency: value.code,
              currencyId: value.id,
            }))
          }
          name="ngn"
          placeholder="Select Wallet"
          options={fiatCurrency.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: item.Currency,
            _id: item.id,
          }))}
        />
        {state.currency && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount in ${state.currency}`}
            value={state.amount}
            name="amount"
            onChange={(e) =>
              setState((state) => ({ ...state, amount: e.target.value }))
            }
          />
        )}
        <Button
          loading={loading || !state.amount || !state.currency}
          onClick={handleDeposit}
          className={styles.airttime__button}
          form="full"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

const PTwoPFlyout = ({
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
  convertedAmount,
  convertedCurrency,
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

  const onConfirm = (data) => {
    
    return convertedCurrency({
      amount: data,
      from: state.referenceCurrency,
      to: state.recipientCurrency,
    });
  }

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
      // {
      //   "amount": 200,
      //   "email": "address@example.com",
      //   "debitCurrencyId": 1,
      //   "recipientCurrencyId": 1,
      //   "transferNote": "Happy birthday"
      // }
      let data = {};
      data.amount = state.amount;
      data.debitWalletId = state.debitWalletId;
      data.recipientCurrencyId = state.recipientCurrencyId;
      data.transferNote = state.transferNote;
      if (validateEmail(state.recipientUsername)) {
        data.email = state.recipientUsername;
      } else {
        return alert("Please enter a valid email address");
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
              debitWalletId: value.id,
              walletBalance: value.balance,
              recipientCurrency: "",
              recipientUsername: "",
              amount: "",
              transferNote: "",
            }))
          }
          name="referenceCurrency"
          placeholder="Select Wallet"
          // options={[
          //   { render: "NGN wallet", value: "NGN" },
          //   { render: "GHS wallet", value: "GHS" },
          //   { render: "BTC wallet", value: "BTC" },
          // ]}
          options={balance.fiatWallets.map((item) => ({
            render: `${item.Currency.code} wallet`,
            value: item,
          }))}
          hint={
            state.recipientCurrency && state.referenceCurrency === "BTC"
              ? `
            Current Balance : ${
              balance[state.referenceCurrency]?.balanceMoney
            } BTC
          `
              : `
            Current Balance : ${Money(
              state.walletBalance,
              state.referenceCurrency
            )}
          `
          }
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
                recipientCurrencyId: value.id,
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
            type={"number"}
            name="amount"
            onChange={(e) => {
              onConfirm(e.target.value)
              setState((state) => ({ ...state, amount: e.target.value }));
            }}
            hint={
              state.referenceCurrency === "BTC" ? (
                ``
              ) : (
                <p>
                  Estimated Total amount Recipient will receive:{" "}
                  <strong>{`${Money(
                    convertedAmount || 0,
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
            label={`Transfer Note(optional)`}
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
  convertedAmount: state.pairTwoPair.convertedAmount,
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
  convertedCurrency: (data) => {
    dispatch(convertCurrency(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PTwoPFlyout);
