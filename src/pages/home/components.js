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
  getCurrentFiatTransferRate,
  initialBTCP2PTransferByUser,
  initialFiatP2PByUser,
} from "../../redux/actions/pairTwoPair";

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
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      referenceCurrency: state.currency === "ng" ? "NGN" : "GHS",
      amount: state.amount,
      customerNumber: state.customerNumber,
      itemCode: state.itemCode,
    };
    buyAirtime(`discos-${state.currency}`, payload);
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select currency"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value,
              itemCode: "",
              amount: 0,
              fee: 0,
              customerNumber: "",
            }));
            getBillPaymentCategory({ billCategory: `discos-${value}` });
          }}
          name="select payment currency"
          options={[
            { render: "NGN", value: "ng" },
            // { render: "GHS", value: "gh" },
          ]}
        />
        {state.currency && (
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
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      referenceCurrency: state.currency === "ng" ? "NGN" : "GHS",
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
          label="Select currency"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value,
              itemCode: "",
              customerNumber: "",
              amount: 0,
              plan: "",
            }));
          }}
          name="select payment currency"
          options={[
            { render: "NGN", value: "ng" },
            // { render: "GHS", value: "gh" },
          ]}
        />
        {state.currency && (
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
              minlength={"14"}
              maxlength={14}
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
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      referenceCurrency: state.currency === "ng" ? "NGN" : "GHS",
      customerNumber: state.customerNumber,
      amount: state.amount,
      itemCode: state.itemCode,
    };
    buyAirtime(`airtime-${state.currency}`, payload);
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select currency"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value,
              plan: "",
              itemCode: "",
              customerNumber: "",
              amount: 0,
            }));
          }}
          name="select payment currency"
          options={[
            { render: "NGN", value: "ng" },
            { render: "GHS", value: "gh" },
          ]}
        />
        {state.currency && (
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
              state.currency === "ng"
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
  buyAirtime = () => {},
}) => {
  const handleAirtime = () => {
    let payload = {
      referenceCurrency: state.currency === "ng" ? "NGN" : "GHS",
      customerNumber: state.customerNumber,
      amount: state.amount,
      itemCode: state.itemCode,
    };
    buyAirtime(`airtime-${state.currency}`, payload);
    setState({});
  };
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select currency"
          value={state.currency}
          onSelect={(value) => {
            setState((state) => ({
              ...state,
              currency: value,
              itemCode: "",
              customerNumber: "",
              amount: 0,
            }));
            if (value === "gh")
              getBillPaymentCategory({ billCategory: `airtime-${value}` });
          }}
          name="select payment currency"
          options={[
            { render: "NGN", value: "ng" },
            { render: "GHS", value: "gh" },
          ]}
        />
        {state.currency && (
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
              state.currency === "ng"
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
              minlength={"14"}
              maxlength={14}
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
}) => {
  const handleDeposit = () => {
    Fund(state);
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
            setState((state) => ({ ...state, currency: value }))
          }
          name="ngn"
          placeholder="Select a network provider"
          options={[
            { render: "NGN wallet", value: "NGN" },
            { render: "GHS wallet", value: "GHS" },
          ]}
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
}) => {
  useEffect(() => {
    getFiatP2PRate();
  }, [getFiatP2PRate]);
  const handleP2PTransfer = () => {
    if (state.referenceCurrency === "BTC") {
      let data = {};
      data.amount = state.amount;
      data.recipientUsername = state.recipientUsername;
      data.transferNote = state.transferNote;
      initializeBTCPair2PairTransaction(data);
    } else {
      let data = {};
      data.amount = state.amount;
      data.recipientUsername = state.recipientUsername;
      data.referenceCurrency = state.referenceCurrency;
      data.recipientCurrency = state.recipientCurrency;
      data.transferNote = state.transferNote;
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
              referenceCurrency: value,
              recipientCurrency: "",
              recipientUsername: "",
              amount: "",
              transferNote: "",
            }))
          }
          name="referenceCurrency"
          placeholder="Select a network provider"
          options={[
            { render: "NGN wallet", value: "NGN" },
            { render: "GHS wallet", value: "GHS" },
            { render: "BTC wallet", value: "BTC" },
          ]}
          hint={
            state.recipientCurrency &&
            `
            Current Balance : ${Money(
              balance[state.referenceCurrency]?.balance,
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
                recipientCurrency: value,
                recipientUsername: "",
              }))
            }
            name="recipientCurrency"
            options={
              state.referenceCurrency === "BTC"
                ? [{ render: "BTC wallet", value: "BTC" }]
                : [
                    { render: "NGN wallet", value: "NGN" },
                    { render: "GHS wallet", value: "GHS" },
                  ]
            }
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
        )}{console.log(pairTwoPairFiatTicker)}
        {state.recipientUsername && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount in ${state.referenceCurrency}`}
            value={state.amount}
            name="amount"
            onChange={(e) =>
              setState((state) => ({ ...state, amount: e.target.value }))
            }
            hint={state.referenceCurrency === "BTC" ? `` : <p>Estimated Total amount Recipient will receive: <strong>{`${Money(pairTwoPairFiatTicker?.tickers[`${state.referenceCurrency}${state.recipientCurrency}`] * state.amount, state.recipientCurrency)}`}</strong> </p>}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PTwoPFlyout);
