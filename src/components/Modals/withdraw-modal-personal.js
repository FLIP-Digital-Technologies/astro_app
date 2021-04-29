import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ModalWrapper from "./index";
import styles from "./styles.module.scss";
import Input from "../input";
import Select from "../select";
import Button from "../button";
import { getUserBankAccount } from "../../redux/actions/user";
import { initialWithdrawalByUser } from "../../redux/actions/withdrawals";
import { Money } from "../../utils/helper";
import fetch from "../../redux/services/FetchInterceptor";
import { getBTCWalletDetails } from "../../redux/actions/btc";

const { confirm } = Modal;

const WithDrawModalPersonal = ({
  setIsModalVisible,
  isModalVisible,
  showCloseAction,
  getUserBankDetails,
  bankAccounts,
  submitBankDetails,
  loading,
  getBalance,
  balance
}) => {
  React.useEffect(() => {
    getUserBankDetails();
    getBalance()
    // eslint-disable-next-line
  }, []);
  const [fee, setFee] = React.useState(0);
  const [acc, setAcc] = React.useState({
    bankAccountId: "",
    narration: "",
    amount: "",
    currency: "",
    pin: "",
  });
  React.useEffect(() => {
    if (acc.currency && acc.amount && acc.amount >= 500) {
      function api() {
        setFee(0)
        return fetch({
          url: `/payments/outwards/get-transaction-fee`,
          method: "get",
          params: {
            amount: acc.amount,
            currencyId: acc.currencyId,
          },
        });
      }
      api().then((res) => {
        setFee(res.data.fee);
      });
    }
  }, [acc.currencyId, acc.amount, acc.currency]);

  const showPromiseConfirm = () => {
    const data =
      bankAccounts &&
      bankAccounts.filter((item) => item.id === acc.bankAccountId)[0];
    confirm({
      title: `Withdrawing ${Money(acc.amount, "NGN")}`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the withdrawal of ${Money(acc.amount, acc.currency)} into ${
        data.account_name
      } ${data.account_number} ${data.bank_name}`,
      onOk() {
        return submitBankDetails({ ...acc });
      },
      onCancel() {},
    });
  };

  return (
    <ModalWrapper
      showCloseAction={showCloseAction}
      className={styles.slimModal}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <div className={styles.title}>Withdraw</div>
      <Select
        options={
          bankAccounts &&
          bankAccounts.map((item) => ({
            value: item.id,
            render: `${item.account_number} - ${item.bank_name} - ${item.account_name}`,
          }))
        }
        value={acc.bankAccountId}
        onSelect={(e) => setAcc({ ...acc, bankAccountId: e })}
        className={styles.largeMarginLabel}
        label="Select Account to Transfer to"
      />
      <Select
        labelClass={styles.largeMarginLabel}
        label="Select currency"
        value={acc.currency}
        onSelect={(value) => {
          setAcc((acc) => ({
            ...acc,
            currency: value.Currency.code,
            currencyId:value.Currency.id,
            pin: "",
            narration: "",
            amount: 0,
          }));
        }}
        name="select payment currency"
        // options={[
        //   { render: "NGN", value: "NGN" },
        //   { render: "GHS", value: "GHS" },
        // ]}
        options={balance.fiatWallets.map((item)=> ({
          render:`${item.Currency.name}`,
          value:item
        }))}
      />
      <Input
        className={styles.largeMarginLabel}
        label="Withdrawal amount"
        placeholder="Enter amount here"
        type="number"
        value={acc.amount}
        min={500}
        onChange={(e) => setAcc({ ...acc, amount: e.target.value, pin: "", narration: "" })}
        hint={acc.currency && acc.amount ?
          <span>
            You will be charged <strong>{Money(fee, acc.currency || "")}</strong> for this withdrawal.
          </span> : null
        }
      />
      <Input
        className={styles.largeMarginLabel}
        label="Narration"
        placeholder="Enter narration here"
        type="text"
        value={acc.narration}
        onChange={(e) => setAcc({ ...acc, narration: e.target.value })}
      />
      <Input
        className={styles.largeMarginLabel}
        label="Enter Transaction Pin"
        placeholder="Enter Transaction Pin"
        type="password"
        maxlength={4}
        value={acc.pin}
        onChange={(e) => setAcc({ ...acc, pin: e.target.value })}
      />
      <Button
        onClick={() => showPromiseConfirm()}
        className={styles.button}
        disabled={
          !acc.bankAccountId || !acc.pin || !acc.amount || acc.amount < 500 || loading || !fee
        }
        text="Withdraw"
        form="full"
      />
    </ModalWrapper>
  );
};

const mapStateToProps = (state) => ({
  loading: state.withdrawals.loading,
  bankAccounts: state.bank.bankAccounts,
  balance:state.btc.balance
});

const mapDispatchToProps = (dispatch) => ({
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  submitBankDetails: (data) => {
    dispatch(initialWithdrawalByUser(data));
  },
  getBalance: ()=> {
    dispatch(getBTCWalletDetails())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithDrawModalPersonal);
