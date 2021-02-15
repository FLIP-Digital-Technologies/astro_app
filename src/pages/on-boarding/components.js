import React, { useState, useEffect } from "react";
import styles from "../styles.module.scss";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { history } from "../../redux/store";

export const Step1 = ({ user, submitForm }) => {
  const INITIAL_STATE = {
    firstName: (user && user.firstName) || "",
    lastName: (user && user.lastName) || "",
    email: (user && user.email) || "",
    phoneNumber: (user && user.phoneNumber) || "",
    country: "NGN",
    username: (user && user.username) || "",
  };
  useEffect(() => {
    setState(INITIAL_STATE);
    // eslint-disable-next-line
  }, [user]);
  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    submitForm(state);
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      className={styles.onboarding__content}
    >
      <div className={styles.onboarding__section}>
        <h2 className={styles.onboarding__title}> Personal Information</h2>
        <div className={styles.onboarding__inputList1}>
          <Input
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            label="First Name"
            placeholder="Enter First Name here"
            required={true}
          />
          <Input
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            label="Last Name"
            placeholder="Enter Last Name here"
            required={true}
          />
        </div>
        <div className={styles.onboarding__inputList1}>
          <Input
            name="email"
            value={state.email}
            onChange={handleChange}
            type="email"
            label="Email Address"
            placeholder="Enter a valid email address"
            hint="This is the only way we can keep in touch with you"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
            required={true}
          />

          <Input
            name="phoneNumber"
            value={state.phoneNumber}
            onChange={handleChange}
            type="tel"
            pattern="^[0-9+]{14}$"
            label="Phone Number"
            placeholder="Enter a valid Phone number"
            errorMessage="phone number should be the right format. e.g. +234908XXXXXXX"
            required={true}
          />
        </div>
        <div
          className={styles.onboarding__inputList2}
        >
          <Input
            name="username"
            value={state.username}
            onChange={handleChange}
            type="text"
            label="Username"
            required={true}
            readOnly
          />
          <Select
            value={state.country}
            onSelect={(value) =>
              handleChange({ target: { name: "country", value } })
            }
            name="country"
            label="Country"
            placeholder="Nigeria"
            options={[
              { render: "Nigeria", value: "NGN" },
              { render: "Ghana", value: "GHS" },
            ]}
          />
        </div>
      </div>
      <div className={styles.btnPair}>
        <Button text="Save" type="submit" form="full" />{" "}
        <Button
          text="Cancel"
          onClick={() => history.push("/app")}
          form="outline"
        />
      </div>
    </form>
  );
};

export const Step2 = ({
  bankList,
  verifyBankAccount,
  bankName,
  submitForm,
  getBankBranchList,
  branchList,
  getBankList,
}) => {
  const INITIAL_STATE = {
    accountNumber: "",
    bankCode: "",
    bvn: "",
    accountName: "",
    bankName: "",
    currency: "GH",
    bankBranchCode: "",
    bankBranchName: "",
  };

  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {
    if (state.bankCode && state.accountNumber.length === 10) {
      verifyBankAccount({
        bankCode: state.bankCode,
        accountNumber: state.accountNumber,
      });
    }
  }, [state.bankCode, state.accountNumber, verifyBankAccount]);
  useEffect(() => {
    if (branchList && branchList.length === 1) {
      setState((state) => ({
        ...state,
        bankBranchName: branchList && branchList[0].branch_name,
        bankBranchCode: branchList && branchList[0].branch_code,
      }));
    }
  }, [branchList]);
  useEffect(() => {
    if (bankName && bankName.accountName) {
      setState((state) => ({
        ...state,
        accountName: bankName && bankName.accountName,
      }));
    }
  }, [bankName]);

  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    submitForm({
      ...state,
      currency: state.currency === "GH" ? "GHS" : "NGN",
    });
  };

  const handleBankCode = (value) => {
    handleChange({ target: { name: "bankCode", value: value.split(",")[0] } });
    handleChange({ target: { name: "bankName", value: value.split(",")[1] } });
    handleChange({ target: { name: "accountName", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "bankBranchCode", value: "" } });
    if (state.currency === "GH") getBankBranchList({ id: value.split(",")[2] });
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      className={styles.onboarding__content__extra_margin}
    >
      <div className={styles.onboarding__section}>
        <h2 className={styles.onboarding__title}>Bank Account Details</h2>
        <div className={styles.onboarding__inputList1}>
          <Select
            labelClass={styles.profileBankInputLabel}
            className={styles.profileBankInput}
            label="Select currency"
            value={state.currency}
            onSelect={(value) => {
              setState((state) => ({
                ...state,
                currency: value,
                accountNumber: "",
                bankCode: "",
                bvn: "",
                accountName: "",
                bankName: "",
                bankBranchCode: "",
                bankBranchName: "",
              }));
              getBankList({ country: value });
            }}
            name="select payment currency"
            options={[
              { render: "NGN", value: "NG" },
              { render: "GHS", value: "GH" },
            ]}
          />
          <Select
            name="bankCode"
            value={state.bankCode}
            onSelect={(value) => handleBankCode(value)}
            label="Bank"
            placeholder="Select your bank"
            options={bankList?.map((i) => ({
              value: `${i.code},${i.name}`,
              render: i.name,
            }))}
          />
        </div>
        <div className={styles.onboarding__inputList1}>
          {state.currency === "GH" && (
            <Select
              name="bankBranchName"
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
              value={`${state.bankBranchCode},${state.bankBranchName}`}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  bankBranchName: value.split(",")[1],
                  bankBranchCode: value.split(",")[0],
                }));
              }}
              label="Bank Branch"
              placeholder="Select your bank branch"
              options={
                branchList &&
                branchList?.map((i) => ({
                  value: `${i.branch_code},${i.branch_name}`,
                  render: i.branch_name,
                }))
              }
            />
          )}
          {/* <Input
            name="bvn"
            value={state.bvn}
            onChange={handleChange}
            label="BVN"
            type="number"
            maxLength="11"
            pattern="\d{11}$"
            placeholder="Enter 10 digit BVN"
            hint="We cannot gain entry into your account"
          /> */}
          <Input
            name="accountNumber"
            value={state.accountNumber}
            onChange={handleChange}
            label="Account Number"
            placeholder="e.g 01236548"
            pattern="\d{10}$"
            maxLength="10"
            hint="Please ensure to input the correct account number"
          />
          {state.currency === "NG" && (
            <Input
              name="accountName"
              value={state.accountName}
              onChange={handleChange}
              label="Account Name"
              placeholder="Enter your account name"
              readOnly={true}
              disabled
            />
          )}
        </div>
        <div className={styles.onboarding__inputList2}>
          {state.currency === "GH" && (
            <Input
              name="accountName"
              value={state.accountName}
              onChange={handleChange}
              label="Account Name"
              placeholder="Enter your account name"
              readOnly={true}
              disabled
            />
          )}
        </div>
      </div>
      <div className={styles.btnPair}>
        <Button text="Save" type="submit" form="full" />{" "}
        <Button
          text="Cancel"
          onClick={() => history.push("/app")}
          form="outline"
          disabled={
            !state.currency ||
            !state.customerNumber ||
            !state.itemCode ||
            !state.amount
          }
        />
      </div>
    </form>
  );
};

export const Step3 = ({ submitForm }) => {
  const INITIAL_STATE = {
    pin: "",
  };
  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    submitForm(state);
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      className={styles.onboarding__content__extra_margin}
    >
      <div className={styles.onboarding__section}>
        <h2 className={styles.onboarding__title}>Set Transaction Pin</h2>
        <div className={styles.onboarding__inputList1}>
          <Input
            name="pin"
            value={state.pin}
            onChange={handleChange}
            label="Transaction Pin"
            placeholder="1234"
            required={true}
            maxLength="4"
            max={9999}
            type="number"
            pattern="\d{4}$"
            errorMessage={"PIn must be 4 numbers"}
          />
        </div>
      </div>
      <div className={styles.btnPair}>
        <Button text="Save" type="submit" form="full" />{" "}
        <Button
          text="Cancel"
          onClick={() => history.push("/app")}
          form="outline"
        />
      </div>
    </form>
  );
};
