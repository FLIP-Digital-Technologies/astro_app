import React, { useState } from "react";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { RateDetails, RateSelector } from "./components";
import styles from "../styles.module.scss";
import {
  getBTCCurrentMarketTicker,
  initialBTCBuyTransaction,
} from "../../redux/actions/btc";
import { getGiftCardCodes } from "../../redux/actions/giftCard";
import { sortData } from "../../utils/helper";

const Rate = ({ getBTCRates, balance, btcRates, giftCardList, getCards }) => {
  let b = giftCardList;
  let list = sortData(b).map((i) => i[0]);
  const [isBuy, setIsBuy] = useState(true);
  const [meta, setMeta] = useState(null);
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    country: "",
    cardType: "",
    asset: "",
    amount: 0,
    total: 0,
  });
  React.useEffect(() => {
    getBTCRates();
    getCards({ cardCode: "all" });
  }, [getBTCRates, getCards]);
  return (
    <DashboardLayout>
      <div className={styles.rate}>
        <RateSelector
          balance={balance}
          rates={btcRates}
          {...{ state, setState, isBuy, setIsBuy, list, b, meta, setMeta }}
        />
        {/* <RateDetails  rates={btcRates} {...{state, setState,isBuy, setIsBuy, meta, setMeta}} /> */}
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  balance: state.btc.balance,
  btcRates: state.btc.btcTicker,
  buyBTC: state.btc.buyBTC,
  giftCardList: state.giftCard.giftCardList,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker());
  },
  buyCoins: (data) => {
    dispatch(initialBTCBuyTransaction(data));
  },
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
