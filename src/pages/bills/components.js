import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import {
  AirtimeFlyout,
  CableFlyout,
  DiscoFlyout,
  InternetFlyout,
} from "../home/components";
import {
  getBillPaymentCategory,
  initialBillPaymentByUser,
} from "../../redux/actions/billPayment";
import { getFiatCurrencies } from "../../redux/actions/Auths";

const Flyout = ({
  buyAirtime,
  billLoading,
  BillPaymentCategory,
  getBillPaymentCategory,
  state,
  fiatCurrency,
  getMainFiatCurrency,
}) => {
  useEffect(() => {
    getMainFiatCurrency()
    // eslint-disable-next-line
  }, [])
  const [AirtimeState, setAirtimeState] = useState({});
  const [InternetState, setInternetState] = useState({});
  const [DiscosState, setDiscosState] = useState({});
  const [CableState, setCableState] = useState({});

  return (
    <Drawer
      title={state?.title}
      placement="right"
      onClose={state?.close}
      visible={state?.show}
      width={500}
    >
      {state?.title === "Airtime" && (
        <AirtimeFlyout
          BillPaymentCategory={BillPaymentCategory}
          buyAirtime={buyAirtime}
          loading={billLoading}
          getBillPaymentCategory={getBillPaymentCategory}
          state={AirtimeState}
          setState={setAirtimeState}
          fiatCurrency={fiatCurrency}
        />
      )}
      {state?.title === "Internet" && (
        <InternetFlyout
          BillPaymentCategory={BillPaymentCategory}
          buyAirtime={buyAirtime}
          loading={billLoading}
          getBillPaymentCategory={getBillPaymentCategory}
          state={InternetState}
          setState={setInternetState}
          fiatCurrency={fiatCurrency}
        />
      )}
      {state?.title === "Electricity" && (
        <DiscoFlyout
          BillPaymentCategory={BillPaymentCategory}
          buyAirtime={buyAirtime}
          loading={billLoading}
          getBillPaymentCategory={getBillPaymentCategory}
          state={DiscosState}
          setState={setDiscosState}
          fiatCurrency={fiatCurrency}
        />
      )}
      {state?.title === "Cable" && (
        <CableFlyout
          BillPaymentCategory={BillPaymentCategory}
          buyAirtime={buyAirtime}
          loading={billLoading}
          getBillPaymentCategory={getBillPaymentCategory}
          state={CableState}
          setState={setCableState}
          fiatCurrency={fiatCurrency}
        />
      )}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  fiatCurrency: state.user.fiatCurrency,
  cryptoCurrency: state.user.cryptoCurrency,
  balance: state.btc.balance,
  btcTrans: state.btc.latestBTCTransaction,
  giftCardTrans: state.giftCard.latestGiftCardTransaction,
  withdrawalTrans: state.giftCard.latestWithdrawalTransaction,
  loading: state.payment.loading,
  depositMoney: state.payment.depositMoney,
  depositMoneyDetails: state.payment.depositMoneyDetails,
  BillPaymentCategory: state.billPayment.BillPaymentCategory,
  billLoading: state.billPayment.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getBillPaymentCategory: (data) => {
    dispatch(getBillPaymentCategory(data));
  },
  buyAirtime: (billCategory, data) => {
    dispatch(initialBillPaymentByUser(billCategory, data));
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Flyout);
