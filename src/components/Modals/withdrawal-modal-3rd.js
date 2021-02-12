import React, { useEffect } from "react";
import { connect } from "react-redux";
import ModalWrapper from "./index";
import styles from "./styles.module.scss";
import Input from "../input";
import Select from "../select";
import Button from "../button";
import { verifyBankAccountDetails } from "../../redux/actions/bank";
import { initialWithdrawalByUser } from "../../redux/actions/withdrawals";

const WithDrawModal3rd = ({
  setIsModalVisible,
  isModalVisible,
  showCloseAction,
  bankList,
  verifyBankAccount,
  bankName,
  submitBankDetails,
  loading,
}) => {
  const [state, setState] = React.useState({
    amount: "",
    save: false,
    narration: "",
  });
  const [bankAccount, setBankAccount] = React.useState({
    bankCode: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const handleBankDetailsChange = ({ target: { name, value } }) => {
    setBankAccount((bankAccount) => ({ ...bankAccount, [name]: value }));
  };
  const handleBankCode = (value) => {
    handleBankDetailsChange({
      target: { name: "bankCode", value: value.split(",")[0] },
    });
    handleBankDetailsChange({
      target: { name: "bankName", value: value.split(",")[1] },
    });
  };

  useEffect(() => {
    if (bankAccount.bankCode && bankAccount.accountNumber.length === 10) {
      verifyBankAccount({
        bankCode: bankAccount.bankCode,
        accountNumber: bankAccount.accountNumber,
      });
    }
  }, [bankAccount.bankCode, bankAccount.accountNumber, verifyBankAccount]);
  useEffect(() => {
    if (
      bankAccount.bankCode &&
      bankAccount.accountNumber.length === 10 &&
      bankName &&
      bankName.accountName
    ) {
      setBankAccount((bankAccount) => ({
        ...bankAccount,
        accountName: bankName && bankName.accountName,
      }));
    }
    // eslint-disable-next-line
  }, [bankName]);

  const handleSubmit = () => {
    let data = { bankAccount, ...state };
    submitBankDetails(data);
  };

  return (
    <ModalWrapper
      showCloseAction={showCloseAction}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      className={styles.slimModal}
    >
      <div className={styles.title}>Withdraw to 3rd party account</div>
      <Input
        className={styles.input}
        onChange={handleChange}
        type="text"
        value={state.narration}
        label="Narration"
        name="narration"
        placeholder="Enter narration here"
      />
      <Input
        className={styles.input}
        onChange={handleChange}
        type="number"
        min={500}
        name="amount"
        value={state.amount}
        label="Withdrawal amount"
        placeholder="Enter amount here"
      />
      <Input
        name="accountNumber"
        value={bankAccount.accountNumber}
        onChange={handleBankDetailsChange}
        className={styles.input}
        label="Account Number"
        placeholder="e.g 01236548"
        pattern="\d{10}$"
        maxLength="10"
        hint="Please ensure to input the correct account number"
      />
      <Select
        name="bankCode"
        value={bankAccount.bankCode}
        onSelect={(value) => handleBankCode(value)}
        className={styles.input}
        label="Bank"
        placeholder="Select your bank"
        options={bankList?.map((i) => ({
          value: `${i.code},${i.name}`,
          render: i.name,
        }))}
      />
      <Input
        name="accountName"
        className={styles.input}
        value={bankAccount.accountName}
        onChange={handleBankDetailsChange}
        label="Account Name"
        placeholder="Enter your account name"
        readOnly={true}
        disabled
      />
      <Input
        className={styles.input}
        onChange={(e) =>
          setState((state) => ({ ...state, save: e.target.checked }))
        }
        type="checkbox"
        value={state.save}
        label="Save this details."
        name="save"
      />
      <Button
        onClick={() => handleSubmit()}
        disabled={
          !bankAccount.accountNumber ||
          !bankAccount.accountName ||
          !bankAccount.bankCode ||
          state.amount < 500 ||
          loading
        }
        className={styles.button}
        text="Withdraw"
        form="full"
      />
    </ModalWrapper>
  );
};

const mapStateToProps = (state) => ({
  loading: state.withdrawals.loading,
  bankList: state.bank.bankList,
  bankName: state.bank.bankDetails,
});

const mapDispatchToProps = (dispatch) => ({
  verifyBankAccount: (data) => {
    dispatch(verifyBankAccountDetails(data));
  },
  submitBankDetails: (data) => {
    dispatch(initialWithdrawalByUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawModal3rd);
