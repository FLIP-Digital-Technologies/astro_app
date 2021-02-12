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

const { confirm } = Modal;

const WithDrawModalPersonal = ({
  setIsModalVisible,
  isModalVisible,
  showCloseAction,
  getUserBankDetails,
  bankAccounts,
  submitBankDetails,
  loading,
}) => {
  React.useEffect(() => {
    getUserBankDetails();
    // eslint-disable-next-line
  }, []);
  const [acc, setAcc] = React.useState({
    bankAccountId: "",
    narration: "",
    amount: "",
  });

  const showPromiseConfirm = () => {
    const data =
      bankAccounts &&
      bankAccounts.filter((item) => item.id === acc.bankAccountId)[0];
    confirm({
      title: `Withdrawing ${Money(acc.amount, "NGN")}`,
      icon: <ExclamationCircleOutlined style={{ color: "#19a9de" }} />,
      content: `Confirm the withdrawal of ${Money(acc.amount, "NGN")} into ${
        data.accountName
      } ${data.accountNumber} ${data.bankName}`,
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
      <div className={styles.title}>Withdraw to personal account</div>
      <Select
        options={
          bankAccounts &&
          bankAccounts.map((item) => ({
            value: item.id,
            render: `${item.accountNumber} - ${item.bankName} - ${item.accountName}`,
          }))
        }
        value={acc.bankAccountId}
        onSelect={(e) => setAcc({ ...acc, bankAccountId: e })}
        className={styles.input}
        label="Select Account to Transfer to"
      />
      <Input
        className={styles.input}
        label="Narration"
        placeholder="Enter narration here"
        type="text"
        value={acc.narration}
        onChange={(e) => setAcc({ ...acc, narration: e.target.value })}
      />
      <Input
        className={styles.input}
        label="Withdrawal amount"
        placeholder="Enter amount here"
        type="number"
        value={acc.amount}
        min={500}
        onChange={(e) => setAcc({ ...acc, amount: e.target.value })}
      />
      <Button
        onClick={() => showPromiseConfirm()}
        className={styles.button}
        disabled={
          !acc.bankAccountId || !acc.amount || acc.amount < 500 || loading
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
});

const mapDispatchToProps = (dispatch) => ({
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  submitBankDetails: (data) => {
    dispatch(initialWithdrawalByUser(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithDrawModalPersonal);
