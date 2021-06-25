import React, { useState } from "react";
import { Tabs, message } from "antd";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { Step1, Step2, Step3 } from "./components";
import styles from "../styles.module.scss";
import {
  addUserBankAccount,
  setTransactionPin,
  updateUserDetails,
} from "../../redux/actions/user";
import {
  changePassword,
  getFiatCurrencies,
  GetUserDetails,
} from "../../redux/actions/Auths";
import {
  getBankListByCountry,
  verifyBankAccountDetails,
  getBankBranchByID,
} from "../../redux/actions/bank";
import { history } from "../../redux/store";

const OnBoarding = (props) => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState("1");

  React.useEffect(() => {
    props.getMainFiatCurrency();

    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (props.updatedUser) {
      setActiveKey("2");
    }
  }, [props.updatedUser, setActiveKey]);
  React.useEffect(() => {
    if (props.addedBankDetails) {
      setActiveKey("3");
    }
  }, [props.addedBankDetails, setActiveKey]);
  React.useEffect(() => {
    props.getCurrentUser()
    // console.log(props.user);
    if (props.user && props.user.boarded && props.user.boarded) {
      history.push("/app");
    } else if (props.user && props.user.boarded && !props.user.boarded) {
      message
        .info({
          content: `Chief, You need to update your 
        Profile information to perform 
        transactions on Astro`,
          duration: 8,
        })
        .then(() => message.info("Add Bank details and transaction Pin", 5));
    }
    // eslint-disable-next-line
  }, [props.updatedTransactionPin, setActiveKey, props.user]);
  function callback(key) {
    setActiveKey(key);
  }

  return (
    <DashboardLayout>
      <div className={styles.onboarding}>
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={callback}>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>STEP 1 - Complete your profile</span>
              </div>
            }
            key="1"
          >
            <Step1
              user={props.user}
              submitForm={props.submitUserDetails}
              {...{ ...props }}
            />
          </TabPane>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>STEP2 - Add bank account</span>
              </div>
            }
            key="2"
          >
            <Step2
              user={props.user}
              bankList={props.bankLink}
              verifyBankAccount={props.verifyBankAccount}
              bankName={props.bankName}
              fiatCurrency={props.fiatCurrency}
              submitForm={props.submitBankDetails}
              {...{ ...props }}
            />
          </TabPane>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>STEP 3 - Security</span>
              </div>
            }
            key="3"
          >
            <Step3
              user={props.user}
              submitForm={props.submitPin}
              getUser={props.getCurrentUser}
              {...{ ...props }}
            />
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  fiatCurrency: state.user.fiatCurrency,
  updatedUser: state.user.updatedUser,
  bankLink: state.bank.bankList,
  branchList: state.bank.bankBranchList,
  bankName: state.bank.bankDetails,
  addedBankDetails: state.user.updatedUserBank,
  updatedTransactionPin: state.user.updatedTransactionPin,
});

const mapDispatchToProps = (dispatch) => ({
  submitUserDetails: (data) => {
    dispatch(updateUserDetails(data));
  },
  submitBankDetails: (data) => {
    dispatch(addUserBankAccount(data));
  },
  submitChangePassword: (data) => {
    dispatch(changePassword(data));
  },
  submitPin: (data) => {
    dispatch(setTransactionPin(data));
  },
  verifyBankAccount: (data) => {
    dispatch(verifyBankAccountDetails(data));
  },
  getBankBranchList: (data) => {
    dispatch(getBankBranchByID(data));
  },
  getBankList: (data) => {
    dispatch(getBankListByCountry(data));
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
  getCurrentUser: () => {
    dispatch(GetUserDetails());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
