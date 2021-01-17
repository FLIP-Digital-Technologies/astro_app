import React, {useState} from "react";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { SellSection, DetailsSection } from "./components";
import styles from "../styles.module.scss";
import { getBTCCurrentMarketTicker, initialBTCSellTransaction } from "../../redux/actions/btc";

const SellCoin = ({getBTCRates, balance, btcRates, sellCoins, sellBTC}) => {
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0
  });
  React.useEffect(() => {
    getBTCRates();
  }, [getBTCRates]);
  return (
    <DashboardLayout>
      <div className={styles.sellPage__top}>
        <SellSection balance={balance} rates={btcRates} {...{state, setState}} />
        <DetailsSection {...{state, setState, sellCoins, sellBTC}} />
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  btcRates: state.btc.btcTicker,
  sellBTC: state.btc.sellBTC,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker())
  },
  sellCoins:  (data) => {
    dispatch(initialBTCSellTransaction(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SellCoin);
