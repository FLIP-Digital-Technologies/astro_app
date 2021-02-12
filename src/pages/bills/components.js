import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer } from "antd";
import { AirtimeFlyout, CableFlyout, DiscoFlyout, InternetFlyout } from "../home/components";
import { getBillPaymentCategory, initialBillPaymentByUser } from "../../redux/actions/billPayment";

const Flyout = ({
  buyAirtime,
  billLoading,
  BillPaymentCategory,
  getBillPaymentCategory,
  state,
}) => {
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
    >
      {state?.title === "Airtime" && (
        <AirtimeFlyout
          BillPaymentCategory={BillPaymentCategory}
          buyAirtime={buyAirtime}
          loading={billLoading}
          getBillPaymentCategory={getBillPaymentCategory}
          state={AirtimeState}
          setState={setAirtimeState}
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
        />
      )}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
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
  getBillPaymentCategory: (data) =>  {
    dispatch(getBillPaymentCategory(data));
  },
  buyAirtime: (billCategory, data) => {
    dispatch(initialBillPaymentByUser(billCategory, data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Flyout);
