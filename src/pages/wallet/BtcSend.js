import React, {useState} from "react";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { SendSection, DetailsSection } from "./components";
import styles from "../styles.module.scss";
import { getBTCCurrentMarketTicker, initialBTCSellToExternalWalletTransaction } from "../../redux/actions/btc";

const BtcSend = ({getBTCRates, balance, btcRates, sellCoinsExternal, sellBTCExternal}) => {
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    btcAddress: "",
  });
  React.useEffect(() => {
    getBTCRates();
  }, [getBTCRates]);
  return (
    <DashboardLayout>
      <div className={styles.sellPage__top}>
        <SendSection balance={balance} rates={btcRates} {...{state, setState, sellBTCExternal}} />
        <DetailsSection {...{state, setState, sellCoinsExternal, sellBTCExternal}} />
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  btcRates: state.btc.btcTicker,
  sellBTCExternal: state.btc.sellBTCExternal,
});

const mapDispatchToProps = (dispatch) => ({
  getBTCRates: () => {
    dispatch(getBTCCurrentMarketTicker())
  },
  sellCoinsExternal:  (data) => {
    dispatch(initialBTCSellToExternalWalletTransaction(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BtcSend);
