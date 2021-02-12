import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { DashboardLayout } from "../../components/layout";
// import { Edit } from "../../assets/svg";
import styles from "../styles.module.scss";

import { changePassword } from "../../redux/actions/Auths";
import { getBTCWalletDetails } from "../../redux/actions/btc";
import {
  getUserBankAccount,
  getUserDetailsById,
  addUserBankAccount,
  removeUserBankAccount,
} from "../../redux/actions/user";
import {
  getBankListByCountry,
  verifyBankAccountDetails,
  getBankBranchByID,
} from "../../redux/actions/bank";

const Profile = ({
  user,
  bankAccounts,
  bankName,
  verifyBankAccount,
  getCurrentUser,
  getUserBankDetails,
  getBankList,
  getBalance,
  submitBankDetails,
  removeUserBankDetails,
  bankList,
  changePassword,
  getBankBranchList,
  branchList,
}) => {
  useEffect(() => {
    getCurrentUser();
    getUserBankDetails();
    // getBankList();
    getBalance();
    // eslint-disable-next-line
  }, []);
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
  const [pass, setNewPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const handlePasswordChange = ({ target: { name, value } }) => {
    setNewPassword((pass) => ({ ...pass, [name]: value }));
  };

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
      console.log({
        bankBranchName: branchList && branchList[0].branch_name,
        bankBranchCode: branchList && branchList[0].branch_code,
      });
      setState((state) => ({
        ...state,
        bankBranchName: branchList && branchList[0].branch_name,
        bankBranchCode: branchList && branchList[0].branch_code,
      }));
    }
  }, [branchList]);
  useEffect(() => {
    console.log("vhjhk", bankName);
    if (bankName && bankName.accountName) {
      setState((state) => ({
        ...state,
        accountName: bankName && bankName.accountName,
      }));
    }
  }, [bankName]);

  const handleBankFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    submitBankDetails({
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
  const handleDelAccount = (id) => {
    removeUserBankDetails({ bankAccountId: id });
  };
  const handleChangePassword = (e) => {
    if (e) {
      e.preventDefault();
    }
    changePassword(pass);
  };
  return (
    <DashboardLayout bg="#fff">
      <div className={styles.profile} style={{ margin: 0 }}>
        <div className={styles.profilePersonal}>
          <div
            className={styles.profileSection}
            style={{ marginBottom: 20, paddingBottom: 0 }}
          >
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Basic Information</span>
            </div>
          </div>
          <div className={styles.profilePersonalEntry} style={{lineHeight: 18, wordWrap: "break-word"}}>
            <span>Email</span>
            <span>{user && user.email}</span>
          </div>
          <div className={styles.profilePersonalEntry} style={{lineHeight: 18, wordWrap: "break-word"}}>
            <span>Name</span>
            <span>{`${user && user.firstName} ${user && user.lastName}`}</span>
          </div>
          <div className={styles.profilePersonalEntry} style={{lineHeight: 18, wordWrap: "break-word"}}>
            <span>Password</span>
            <span>*********</span>
          </div>
          <div className={styles.profilePersonalEntry} style={{lineHeight: 18, wordWrap: "break-word"}}>
            <span>Referral Code</span>
            <span>{(user && user.referralCode) || "---"}</span>
          </div>
        </div>
        <div className={styles.profileBank}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Bank Accounts</span>
              <span className={styles.sub}>List of Bank Accounts </span>
            </div>
          </div>
          <div
            className={styles.profileBankContent}
            style={{ maxHeight: 500, overflowY: "auto" }}
          >
            {bankAccounts &&
              bankAccounts.map((item, index) => (
                <div
                  key={index}
                  className={styles.profilePersonalEntry}
                  style={{
                    padding: "15px 10px",
                    border: "1px solid #c4c4c4",
                    maxWidth: 300,
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <span
                    style={{ width: "100%" }}
                  >{`${item.accountNumber}`}</span>
                  <span style={{ width: "100%" }}>{`${item.accountName}`}</span>
                  <span style={{ width: "100%" }}>{`${item.bankName}`}</span>
                  <Button
                    className={styles.deleteButton}
                    onClick={() => handleDelAccount(item.id)}
                    style={{
                      marginTop: 20,
                      background: "#e82127",
                      color: "#fff",
                    }}
                    text="Delete Bank Account"
                  />
                </div>
              ))}
          </div>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.sub}>
                Add a primary bank account and trade easily{" "}
              </span>
            </div>
          </div>
          <form
            onSubmit={(e) => handleBankFormSubmit(e)}
            className={styles.profileBankContent}
          >
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
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
              value={state.bankCode}
              onSelect={(value) => handleBankCode(value)}
              label="Bank Name"
              placeholder="Select your bank"
              options={bankList?.map((i) => ({
                value: `${i.code},${i.name},${i.id}`,
                render: i.name,
              }))}
            />
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
            <Input
              name="accountNumber"
              value={state.accountNumber}
              onChange={handleChange}
              label="Account Number"
              placeholder="e.g 01236548"
              pattern="\d{10}$"
              maxLength="10"
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
            />
            <Input
              name="accountName"
              value={state.accountName}
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
              onChange={handleChange}
              label="Account Name"
              placeholder="Enter your account name"
              readOnly={true}
              disabled
            />
            {state.currency === "NG" && (
              <Input
                name="bvn"
                value={state.bvn}
                onChange={handleChange}
                label="BVN"
                type="number"
                maxLength="11"
                pattern="\d{11}$"
                placeholder="Enter 11 digit BVN"
                hint="We cannot gain entry into your account"
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
              />
            )}
            <div className={styles.btnPair}>
              <Button
                disabled={
                  !state.accountNumber || !state.accountName || !state.bankCode
                }
                text="Save"
                type="submit"
                form="full"
              />
            </div>
          </form>
        </div>
        <div className={styles.profileSecurity}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Security</span>
              <span className={styles.sub}>Change password</span>
            </div>
          </div>
          <form
            onSubmit={handleChangePassword}
            className={styles.profileSecurityContent}
          >
            <Input
              placeholder="e.g Access Bank"
              label="Current Password"
              name="currentPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.currentPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <Input
              placeholder="e.g Access Bank"
              label="New Password"
              name="newPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.newPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <div className={styles.btnPair} style={{ marginTop: 20 }}>
              <Button form="full" type="submit" text="Change Password" />
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  balance: state.btc.balance,
  branchList: state.bank.bankBranchList,
  bankList: state.bank.bankList,
  bankName: state.bank.bankDetails,
  bankAccounts: state.bank.bankAccounts,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => {
    dispatch(getUserDetailsById());
  },
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  getBankBranchList: (data) => {
    dispatch(getBankBranchByID(data));
  },
  getBankList: (data) => {
    dispatch(getBankListByCountry(data));
  },
  getBalance: () => {
    dispatch(getBTCWalletDetails());
  },
  verifyBankAccount: (data) => {
    dispatch(verifyBankAccountDetails(data));
  },
  submitBankDetails: (data) => {
    dispatch(addUserBankAccount(data));
  },
  removeUserBankDetails: (data) => {
    dispatch(removeUserBankAccount(data));
  },
  changePassword: (data) => {
    dispatch(changePassword(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
