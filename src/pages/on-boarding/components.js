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
    country: "Nigeria",
    city: "",
    address: "",
  };
  useEffect(() => {
    setState(INITIAL_STATE)
    // eslint-disable-next-line
  }, [user]);
  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    if (e){
      e.preventDefault();
    }
    submitForm(state);
  }

  return (
    <form onSubmit={e => handleFormSubmit(e)} className={styles.onboarding__content}>{console.log(user, state)}
      <div className={styles.onboarding__image}>
        <div className={styles.onboarding__image__avavtar}>{`${user && user.firstName[0]} ${user && user.lastName[0]}`}</div>
        <div className={styles.onboarding__image__upload}>
          Add Account Photo
        </div>
      </div>
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
        <div className={styles.onboarding__inputList2}>
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
            pattern="^[0]\d{10}$"
            label="Phone Number"
            placeholder="Enter a valid Phone number"
            errorMessage="phone number should be the right format. e.g. 0908XXXXXXX"
            required={true}
          />
        </div>
      </div>

      <div className={styles.onboarding__section}>
        <h2 className={styles.onboarding__title}>Address</h2>
        <div className={styles.onboarding__inputList1}>
          <Input
            name="country"
            value={state.country}
            onChange={handleChange}
            label="Country"
            placeholder="Nigeria"
          />
          <Input
            name="city"
            value={state.city}
            onChange={handleChange}
            label="City"
            placeholder="Lagos"
          />
        </div>
        <div
          className={`${styles.onboarding__inputList2} ${styles.onboarding__inputListSub}`}
        >
          <Input
            name="address"
            value={state.address}
            onChange={handleChange}
            label="Street Address"
            placeholder="Enter address here"
            type="address"
          />
        </div>
      </div>

      <div className={styles.btnPair}>
        <Button text="Save" type="submit" form="full" />{" "}
        <Button text="Cancel" onClick={() => history.push("/app")} form="outline" />
      </div>
    </form>
  );
};

export const Step2 = ({bankList, verifyBankAccount, bankName, submitForm}) => {
  const INITIAL_STATE = {
    accountNumber: "",
    bankCode: "",
    bvn: "",
    accountName: "",
    bankName: ""
  };

  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {
    if(state.bankCode && state.accountNumber.length === 10){
      verifyBankAccount({
        bankCode: state.bankCode,
        accountNumber: state.accountNumber
      })
    }
  }, [state.bankCode, state.accountNumber, verifyBankAccount]);
  useEffect(() => {
    if(bankName && bankName.accountName){
      setState((state) => ({ ...state, accountName: bankName && bankName.accountName }))
    }
  }, [bankName]);

  const handleFormSubmit = (e) => {
    if (e){
      e.preventDefault();
    }
    submitForm(state);
  }
  const handleBankCode  = (value) => {
    handleChange({target: {name: "bankCode",  value: value.split(",")[0]}})
    handleChange({target: {name: "bankName",  value: value.split(",")[1]}})
  }

  return (
    <form onSubmit={e => handleFormSubmit(e)} className={styles.onboarding__content__extra_margin}>
      <div className={styles.onboarding__section}>
        <h2 className={styles.onboarding__title}>Bank Account Details</h2>
        <div className={styles.onboarding__inputList1}>
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
          <Select
            name="bankCode"
            value={state.bankCode}
            onSelect={(value) => handleBankCode(value)}
            label="Bank"
            placeholder="Select your bank"
            options={
              bankList?.map(i => ({
                value: `${i.code},${i.name}`,
                render: i.name
              }))
            }
          />
        </div>
        <div className={styles.onboarding__inputList2}>
          <Input
            name="bvn"
            value={state.bvn}
            onChange={handleChange}
            label="BVN"
            type="number"
            maxLength="11"
            pattern="\d{11}$"
            placeholder="Enter 10 digit BVN"
            hint="We cannot gain entry into your account"
          />
          <Input
            name="accountName"
            value={state.accountName}
            onChange={handleChange}
            label="Account Name"
            placeholder="Enter your account name"
            readOnly={true}
            disabled
          />
        </div>
      </div>
      <div className={styles.btnPair}>
        <Button text="Save" type="submit" form="full" />{" "}
        <Button text="Cancel" onClick={() => history.push("/app")} form="outline" />
      </div>
    </form>
  );
};

export const Step3 = ({submitForm}) => {
  const INITIAL_STATE = {
    pin: ""
  };
  const [state, setState] = useState(INITIAL_STATE);
  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    if (e){
      e.preventDefault();
    }
    submitForm(state);
  }

  return (
    <form onSubmit={e => handleFormSubmit(e)} className={styles.onboarding__content__extra_margin}>
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
        <Button text="Cancel" onClick={() => history.push("/app")} form="outline" />
      </div>
    </form>
  );
};
