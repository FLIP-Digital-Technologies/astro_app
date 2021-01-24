import React from "react";
import { Area, Tooltip, AreaChart } from "recharts";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { ArrowRight } from "../../assets/svg";
import styles from "../styles.module.scss";
import { Money } from "../../utils/helper";

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

const getIntroOfPage = (label) => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div style={{ backgroundColor: "#232323", padding: 10, color: "#fff" }}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export const ActivityChart = () => {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 4000, pv: 2400, amt: 2210 },
    { name: "Page C", uv: 4000, pv: 2400, amt: 2290 },
    { name: "Page D", uv: 4000, pv: 2400, amt: 2000 },
    { name: "Page E", uv: 4000, pv: 2400, amt: 2181 },
    { name: "Page F", uv: 4000, pv: 2400, amt: 2500 },
    { name: "Page G", uv: 4000, pv: 2400, amt: 2100 },
  ];
  return (
    <div className={styles.activity}>
      <span>Wallet Activity Summary</span>
      <AreaChart
        height={65}
        width={500}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#A3F2FD" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#A3F2FD" stopOpacity={0} />
        </linearGradient> */}
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A3F2FD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#A3F2FD" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip position={{ y: -70 }} content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="null"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export const AirtimeFlyout = ({ state, setState }) => {
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select provider"
          value={state.ngn}
          name="ngn"
          placeholder="Sealect a provider"
          options={[]}
        />
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select currency"
          value={state.ngn}
          name="select payment currency"
          placeholder="₦5000"
          options={[]}
        />
        <Input
          labelClass={styles.largeMarginLabel}
          label="Amount"
          value={state.usd}
          name="usd"
          placeholder="e.g ₦200"
        />
        {/* <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
        />

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        />

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        /> */}
        <Button loading={true} className={styles.airttime__button} form="full">
          Proceed
        </Button>
      </div>
    </div>
  );
};

export const FundFlyout = ({ state, setState }) => {
  return (
    <div>
      <div className={styles.airttime}>
        <Select
          labelClass={styles.largeMarginLabel}
          label="Select wallet"
          value={state.wallet}
          onSelect={(value) =>
            setState((state) => ({ ...state, wallet: value }))
          }
          name="ngn"
          placeholder="Select a network provider"
          options={[
            { render: "NGN wallet", value: "NGN" },
            { render: "GHS wallet", value: "GHS" },
          ]}
        />
        {state.wallet && (
          <Input
            labelClass={styles.largeMarginLabel}
            label={`Amount in ${state.wallet}`}
            value={state.amount}
            name="usd"
            placeholder="e.g $1"
            hint="@150/usd"
            onChange={(e) =>
              setState((state) => ({ ...state, amount: e.target.value }))
            }
          />
        )}
        {/* <Input
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
        />

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        />

        <Select
          labelClass={styles.largeMarginLabel}
          label="Amount in NGN"
          value={state.ngn}
          name="ngn"
          placeholder="₦5000"
          hint="@500/usd"
          options={[]}
        /> */}
        <Button loading={true} className={styles.airttime__button} form="full">
          Proceed
        </Button>
      </div>
    </div>
  );
};
